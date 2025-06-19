// src/amadeus_auth.rs

use serde::Deserialize;
use std::env;
use std::time::{SystemTime, UNIX_EPOCH};
use tokio::sync::Mutex;
use std::sync::Arc;
use reqwest::{Client, Error};
// Don't forget to add this to Cargo.toml if you haven't:
// url_encoded_data = "0.5"
 // Make sure this is imported

#[derive(Debug, Deserialize, Clone)]
pub struct AccessTokenResponse {
    // Note: The JSON response has "access_token", so we rename it
    #[serde(rename = "access_token")]
    pub access_token: String,
    pub token_type: String, // Should be "Bearer"
    pub expires_in: u64,    // Seconds until expiration
    // Add other fields from the response if you need them, e.g.:
    // pub username: Option<String>,
    // pub application_name: Option<String>,
    // pub client_id: Option<String>,
    // pub state: Option<String>,
    // pub scope: Option<String>,
}

// A simple struct to manage the token and its expiration
#[derive(Debug, Clone)]
pub struct AmadeusToken {
    token: String,
    expires_at: u64, // Unix timestamp when the token expires
}

impl AmadeusToken {
    pub fn new(access_token: String, expires_in: u64) -> Self {
        let now = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .expect("Time went backwards - this should not happen in a correctly configured system.");
        // Set expiration a bit before the actual expiry to be safe
        let expires_at = now.as_secs() + expires_in - 60; // 60 seconds buffer
        AmadeusToken {
            token: access_token,
            expires_at,
        }
    }

    pub fn is_expired(&self) -> bool { // `&self` not `&Self`
        let now = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .expect("Time went backward - this should not happen in a correctly configured system.");
        now.as_secs() >= self.expires_at
    }

    pub fn get_token(&self) -> &str {
        &self.token
    }
}

pub struct AmadeusAuthenticator {
    client: Client,
    api_key: String,
    api_secret: String,
    current_token: Arc<Mutex<Option<AmadeusToken>>>,
    // Store the base URL for the auth server, making it configurable for tests
    auth_base_url: String,
}

impl AmadeusAuthenticator {
    pub fn new() -> Result<Self, Box<dyn std::error::Error>> {
        dotenv::dotenv().ok(); // Load .env file

        let api_key = env::var("AMADEUS_API_KEY")
            .map_err(|_| "AMADEUS_API_KEY not set in .env or environment")?;
        let api_secret = env::var("AMADEUS_API_SECRET")
            .map_err(|_| "AMADEUS_API_SECRET not set in .env or environment")?;

        let client = Client::new();

        Ok(AmadeusAuthenticator {
            client,
            api_key,
            api_secret,
            current_token: Arc::new(Mutex::new(None)),
            auth_base_url: "https://test.api.amadeus.com".to_string(), // Default to test URL
        })
    }

    // Constructor for testing, allowing a mock client and URL
    #[cfg(test)] // This function will only be compiled during tests
    fn new_for_test(
        client: Client,
        api_key: String,
        api_secret: String,
        auth_base_url: String,
    ) -> Self {
        AmadeusAuthenticator {
            client,
            api_key,
            api_secret,
            current_token: Arc::new(Mutex::new(None)),
            auth_base_url,
        }
    }

    // Requests a new access token from Amadeus
    async fn request_new_token(&self) -> Result<AccessTokenResponse, Error> {
        let url = format!("{}/v1/security/oauth2/token", self.auth_base_url);

        // Build the x-www-form-urlencoded body
        let mut params = std::collections::HashMap::new();
        params.insert("grant_type", "client_credentials");
        params.insert("client_id", &self.api_key);
        params.insert("client_secret", &self.api_secret);

        // Use serde_urlencoded to serialize the HashMap into x-www-form-urlencoded format
        let form_body = serde_urlencoded::to_string(&params)
            .expect("Failed to serialize form parameters"); // This should not fail with simple strings


        let res = self.client
            .post(url)
            .header("Content-Type", "application/x-www-form-urlencoded")
            .body(form_body) // <-- Pass the serialized string here
            .send()
            .await?;

        res.error_for_status()?.json::<AccessTokenResponse>().await
    }

    // Gets a valid access token, requesting a new one if expired or not present
    pub async fn get_access_token(&self) -> Result<String, Box<dyn std::error::Error>> {
        let mut token_guard = self.current_token.lock().await;

        if token_guard.is_none() || token_guard.as_ref().unwrap().is_expired() {
            // In a real application, you might want to log this at info/debug level
            // For tests, we'll keep the print for demonstration
            println!("Access token is expired or not present. Requesting a new one...");
            let new_token_resp = self.request_new_token().await?;
            *token_guard = Some(AmadeusToken::new(
                new_token_resp.access_token,
                new_token_resp.expires_in,
            ));
            println!("New access token obtained.");
        }

        Ok(token_guard.as_ref().unwrap().get_token().to_string())
    }
}

// --- Test Module ---
#[cfg(test)] // This module is only compiled when running tests
mod tests {
    use super::*; // Import everything from the parent module
    use httpmock::{MockServer, Mock};
    use tokio; // For async tests

    // Test for AmadeusToken::new and is_expired
    #[test]
    fn test_amadeus_token_creation_and_expiration() {
        // Create a token that expires in 100 seconds
        let token_value = "test_token_123".to_string();
        let expires_in_secs = 100;
        let token = AmadeusToken::new(token_value.clone(), expires_in_secs);

        // It should not be expired immediately (due to 60s buffer)
        assert!(!token.is_expired(), "Token should not be expired immediately.");

        // Simulate time passing (careful with real time in tests, but for `is_expired` it's okay)
        // For more robust time manipulation in async tests, you'd use tokio::time::pause/advance
        // But for a sync method, a direct `sleep` is problematic in tests.
        // Let's test the expiration logic directly without sleeping by setting `expires_in` low.

        // Test with a token that expires in 5 seconds (well within the 60s buffer)
        let token_soon_expired = AmadeusToken::new("soon_expired".to_string(), 5);
        assert!(token_soon_expired.is_expired(), "Token with small expires_in should be expired immediately due to buffer.");

        // Ensure get_token returns the correct value
        assert_eq!(token.get_token(), token_value);
    }

    // Test for AccessTokenResponse deserialization
    #[test]
    fn test_access_token_response_deserialization() {
        let json_data = r#"{
            "type": "amadeusOAuth2Token",
            "username": "foo@bar.com",
            "application_name": "BetaTest_foobar",
            "client_id": "3sY9VNvXIjyJYd5mmOtOzJLuL1BzJBBp",
            "token_type": "Bearer",
            "access_token": "CpjU0sEenniHCgPDrndzOSWFk5mN",
            "expires_in": 1799,
            "state": "approved",
            "scope": ""
        }"#;

        let response: AccessTokenResponse = serde_json::from_str(json_data)
            .expect("Failed to deserialize AccessTokenResponse");

        assert_eq!(response.access_token, "CpjU0sEenniHCgPDrndzOSWFk5mN");
        assert_eq!(response.token_type, "Bearer");
        assert_eq!(response.expires_in, 1799);
    }

    // Test for AmadeusAuthenticator's request_new_token using httpmock
    #[tokio::test] // Use tokio::test for async functions
    async fn test_request_new_token_success() {
        // 1. Arrange: Set up the mock HTTP server
        let mock_server = MockServer::start();
        let mock_url = mock_server.url(""); // Get the base URL of the mock server

        // Configure the mock response for the token endpoint
        mock_server.mock(|when, then| {
            when.method(POST)
                .path("/v1/security/oauth2/token")
                .header("Content-Type", "application/x-www-form-urlencoded")
                .body_contains("grant_type=client_credentials")
                .body_contains("client_id=test_key")
                .body_contains("client_secret=test_secret");
            then.status(200)
                .header("Content-Type", "application/json")
                .body(r#"{
                    "access_token": "mock_test_token",
                    "token_type": "Bearer",
                    "expires_in": 3599
                }"#);
        });

        // Create an authenticator instance with the mock server's URL
        let authenticator = AmadeusAuthenticator::new_for_test(
            reqwest::Client::new(), // Use a real reqwest client, it will hit our mock server
            "test_key".to_string(),
            "test_secret".to_string(),
            mock_url,
        );

        // 2. Act: Call the method under test
        let result = authenticator.request_new_token().await;

        // 3. Assert: Check the result
        assert!(result.is_ok(), "request_new_token should succeed");
        let token_resp = result.unwrap();
        assert_eq!(token_resp.access_token, "mock_test_token");
        assert_eq!(token_resp.expires_in, 3599);
        assert_eq!(token_resp.token_type, "Bearer");
    }

    #[tokio::test]
    async fn test_request_new_token_failure() {
        let mock_server = MockServer::start();
        let mock_url = mock_server.url("");

        // Configure the mock response for a failed token request (e.g., 400 Bad Request)
        mock_server.mock(|when, then| {
            when.method(POST)
                .path("/v1/security/oauth2/token");
            then.status(400) // Simulate an invalid grant or credentials error
                .header("Content-Type", "application/json")
                .body(r#"{
                    "error": "invalid_client",
                    "error_description": "Invalid client credentials"
                }"#);
        });

        let authenticator = AmadeusAuthenticator::new_for_test(
            reqwest::Client::new(),
            "wrong_key".to_string(),
            "wrong_secret".to_string(),
            mock_url,
        );

        let result = authenticator.request_new_token().await;

        assert!(result.is_err(), "request_new_token should return an error on bad response");
        let err = result.unwrap_err();
        // Check for reqwest's status error, not a deserialization error here
        assert!(err.is_status(), "Error should be a HTTP status error");
        assert_eq!(err.status().unwrap(), 400);
    }

    #[tokio::test]
    async fn test_get_access_token_caches_and_refreshes() {
        let mock_server = MockServer::start();
        let mock_url = mock_server.url("");

        // Mock 1: Initial token request
        let mock_1 = mock_server.mock(|when, then| {
            when.method(POST)
                .path("/v1/security/oauth2/token");
            then.status(200)
                .header("Content-Type", "application/json")
                .body(r#"{
                    "access_token": "initial_token",
                    "token_type": "Bearer",
                    "expires_in": 10 // Short expiry for testing refresh
                }"#)
                .times(1); // Expect this mock to be called only once
        });

        let authenticator = AmadeusAuthenticator::new_for_test(
            reqwest::Client::new(),
            "test_key".to_string(),
            "test_secret".to_string(),
            mock_url.clone(), // Clone mock_url for authenticator
        );

        // First call: Should request a new token
        let token1 = authenticator.get_access_token().await.unwrap();
        assert_eq!(token1, "initial_token");
        mock_1.assert(); // Assert that the first mock was called

        // Second call: Should return the cached token if not expired
        // Since expires_in is 10, and buffer is 60, it will be marked expired immediately.
        // So we expect a refresh. Let's adjust mock_1's expires_in for the first test,
        // or ensure enough time passes for the second.
        // For accurate expiration testing, we often need `tokio::time::advance`
        // or a mock for `SystemTime::now()`. For simplicity here, let's just make
        // the expiry very short so it's guaranteed to expire.

        // Re-mock for the second call, because the first token is already expired
        let mock_2 = mock_server.mock(|when, then| {
            when.method(POST)
                .path("/v1/security/oauth2/token");
            then.status(200)
                .header("Content-Type", "application/json")
                .body(r#"{
                    "access_token": "refreshed_token",
                    "token_type": "Bearer",
                    "expires_in": 3600 // Longer expiry for the refreshed token
                }"#)
                .times(1); // Expect this mock to be called only once
        });

        let token2 = authenticator.get_access_token().await.unwrap();
        assert_eq!(token2, "refreshed_token");
        mock_2.assert(); // Assert that the second mock was called

        // Subsequent calls should use the cached refreshed token
        // without hitting the mock server again (as its expiry is long)
        let token3 = authenticator.get_access_token().await.unwrap();
        assert_eq!(token3, "refreshed_token");
        // No new mock was set up, so if this were to fail, mock_2.assert() would panic if `times` was higher.
        // We can verify `mock_2` was called only once.
        mock_2.assert_hits(1); // Ensure it was called only once after the initial request.

        // Pytest reference: Similar to how you'd use `mocker` fixture to mock `requests.post`
        // and then assert `mock_post_call.call_count == 1`.
    }
}