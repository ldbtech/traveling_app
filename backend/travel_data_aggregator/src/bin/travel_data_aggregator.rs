// src/bin/travel_data_aggregator.rs

// Import modules needed for the main application setup from actix_web.
// 'web' is probably needed for route definitions like `web::get().to(...)`
use actix_web::{web, App, HttpServer};

// Now, import your custom modules from your *library crate*.
// The name 'amadeus_travel_app' should match the 'name' field in your Cargo.toml
// under the `[package]` section.
use travel_data_aggregator::handlers;
// If your handlers (or other parts of main) directly use types like
// AmadeusAuthenticator, AmadeusApiClient, or TravelSearchQuery, you'd import them like this:
// use amadeus_travel_app::amadeus_auth::AmadeusAuthenticator;
// use amadeus_travel_app::amadeus_api::AmadeusApiClient;
// use amadeus_travel_app::models::TravelSearchQuery;
// And if you use shared AppState, it might be defined in lib.rs or a shared module:
// use amadeus_travel_app::AppState; // If AppState is in lib.rs

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Rust Travel Data Aggregation Service running on http://0.0.0.0:8001");

    HttpServer::new(|| {
        App::new()
            .service(handlers::health) // handlers::health is now imported from your library
            .service(handlers::aggregate_travel_data) // Same for aggregate_travel_data
            // If you had shared application state (like the Amadeus API client),
            // you would instantiate it here and pass it using .app_data().
            // For example:
            // .app_data(web::Data::new(amadeus_travel_app::AppState::new(...)))
    })
    .bind(("0.0.0.0", 8001))?
    .run()
    .await
}