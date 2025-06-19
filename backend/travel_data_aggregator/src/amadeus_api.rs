// src/amadeus_api.rs

use crate::amadeus_auth::AmadeusAuthenticator;
use serde::Deserialize;
use reqwest::Error;
use std::sync::Arc;

// Example response struct for Flight Check-in Links API
#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")] // Use this if JSON keys are camelCase and Rust fields are snake_case
pub struct CheckinLink {
    #[serde(rename = "type")] // 'type' is a reserved keyword in Rust
    pub link_type: String,
    pub href: String,
    pub channel: String,
}

#[derive(Debug, Deserialize)]
pub struct CheckinLinksResponse {
    pub data: Vec<CheckinLink>,
}


// Amadeus API client struct
pub struct AmadeusApiClient {
    client: reqwest::Client,
    authenticator: Arc<AmadeusAuthenticator>,
    base_url: String,
}

impl AmadeusApiClient {
    pub fn new(authenticator: Arc<AmadeusAuthenticator>) -> Self {
        AmadeusApiClient {
            client: reqwest::Client::new(),
            authenticator,
            base_url: "https://test.api.amadeus.com".to_string(), // Use "https://api.amadeus.com" for production
        }
    }

    // Generic method to make authenticated GET requests
    async fn authenticated_get<T: for<'de> Deserialize<'de>>(
        &self,
        endpoint: &str,
        query_params: Option<&[(&str, &str)]>,
    ) -> Result<T, Box<dyn std::error::Error>> {
        let token = self.authenticator.get_access_token().await?;
        let url = format!("{}/{}", self.base_url, endpoint);

        let mut request_builder = self.client.get(&url).header("Authorization", format!("Bearer {}", token));

        if let Some(params) = query_params {
            request_builder = request_builder.query(params);
        }

        let res = request_builder.send().await?;

        res.error_for_status()?.json::<T>().await.map_err(|e| e.into())
    }

    // Example API method: Get Flight Check-in Links
    pub async fn get_checkin_links(&self, airline_code: &str) -> Result<CheckinLinksResponse, Box<dyn std::error::Error>> {
        let endpoint = "v2/reference-data/urls/checkin-links";
        let query_params = vec![("airline", airline_code)];
        self.authenticated_get(endpoint, Some(&query_params)).await
    }

    // Add more API methods here (e.g., flight search, hotel search)
    // For POST requests, you'd create an `authenticated_post` method.
}