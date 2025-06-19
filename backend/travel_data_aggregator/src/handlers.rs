// travel_data_aggregator/src/handlers.rs

// Import necessary data structures and API client functions from the current crate.
use crate::models::{AggregatedTravelData, TravelSearchQuery};
use crate::api_clients::{simulated_skyscanner_api_call, simulated_hotelbeds_api_call, simulated_viator_api_call};

// Import Actix Web components for defining handler functions and responses.
use actix_web::{get, web, Responder, HttpResponse};
use serde_json::json; // For easily creating JSON literals
// FIX: Using futures::join! macro for explicit concurrent awaiting,
// which is more ergonomic for a fixed number of futures than join_all.
use futures::join; 
use tokio::spawn; // For spawning async tasks onto the Tokio runtime

// --- Handler Functions ---

// Health check endpoint. Accessible at /health.
#[get("/health")]
// 'impl Responder' means the function returns any type that implements the Responder trait.
pub async fn health() -> impl Responder {
    HttpResponse::Ok().json(json!({"status": "Rust Data Aggregation Service is healthy"}))
}

// Main aggregation endpoint. Accessible at /aggregate-travel-data.
// It extracts search query parameters from the URL using 'web::Query'.
#[get("/aggregate-travel-data")]
pub async fn aggregate_travel_data(query: web::Query<TravelSearchQuery>) -> impl Responder {
    println!("Received aggregation request: {:?}", query);

    // Clone the 'TravelSearchQuery' for each concurrent task.
    // Each asynchronous task spawned by 'tokio::spawn' needs its own owned copy of data.
    let query_clone_flights = query.0.clone();
    let query_clone_hotels = query.0.clone();
    let query_clone_activities = query.0.clone();

    // Spawn concurrent asynchronous tasks.
    // Each 'tokio::spawn' call creates a new task that runs independently and concurrently.
    let flights_task = spawn(simulated_skyscanner_api_call(query_clone_flights));
    let hotels_task = spawn(simulated_hotelbeds_api_call(query_clone_hotels));
    let activities_task = spawn(simulated_viator_api_call(query_clone_activities));

    // Await the completion of all concurrent tasks simultaneously.
    // 'futures::join!' is a macro that concurrently polls multiple futures and
    // returns their results as a tuple once all of them have completed.
    // '.unwrap()' is used here for simplicity in this prototyping phase.
    // In a production system, you would handle potential errors from these tasks.
    let (flights, hotels, activities) = join!(
        flights_task,
        hotels_task,
        activities_task
    );

    // Unwrap the results from the spawned tasks.
    // If a spawned task panics, this unwrap will also panic.
    let flights = flights.unwrap();
    let hotels = hotels.unwrap();
    let activities = activities.unwrap();

    println!("Aggregated {} flights, {} hotels, {} activities.", flights.len(), hotels.len(), activities.len());

    // Combine all collected data into a single 'AggregatedTravelData' struct.
    let aggregated_data = AggregatedTravelData {
        flights,
        hotels,
        activities,
    };

    // Return the aggregated data as a JSON HTTP response with a 200 OK status.
    HttpResponse::Ok().json(aggregated_data)
}
