// travel_data_aggregator/src/models.rs

// Import serde for serialization and deserialization.
use serde::{Serialize, Deserialize};

// --- Data Structures for Aggregated Output ---

// Represents a single flight option from a simulated provider.
// 'pub' makes the struct and its fields publicly accessible.
// #[derive(...)] automatically implements traits for convenience.
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Flight {
    pub id: String,
    pub airline: String,
    pub flight_number: String,
    pub origin: String,
    pub destination: String,
    pub departure_date: String,
    pub arrival_date: String,
    pub departure_time: String,
    pub arrival_time: String,
    pub price: f64,
    pub provider: String, // e.g., "Skyscanner", "Amadeus", "Expedia"
}

// Represents a single hotel option from a simulated provider.
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Hotel {
    pub id: String,
    pub name: String,
    pub location: String,
    pub check_in_date: String,
    pub check_out_date: String,
    pub price_per_night: f64,
    pub rating: f32, // e.g., 4.5
    pub amenities: Vec<String>,
    pub provider: String, // e.g., "Hotelbeds", "Booking.com", "Expedia"
}

// Represents a single activity/experience option from a simulated provider.
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Activity {
    pub id: String,
    pub name: String,
    pub location: String,
    pub date: String,
    pub price_per_person: f64,
    pub description: String,
    pub provider: String, // e.g., "Viator", "GetYourGuide", "LocalExperiences"
}

// The unified response structure that the Rust service will return.
#[derive(Serialize, Debug)]
pub struct AggregatedTravelData {
    pub flights: Vec<Flight>,
    pub hotels: Vec<Hotel>,
    pub activities: Vec<Activity>,
    // Potentially add more fields like suggested budget, analysis summary here later
}

// --- Request Query Parameters ---

// Struct to capture a generic search query from the URL.
// #[serde(rename_all = "camelCase")] maps camelCase query params (like 'startDate')
// to Rust's idiomatic snake_case fields (like 'start_date').
#[derive(Deserialize, Debug, Clone)] // Added Clone here too as it's passed around
#[serde(rename_all = "camelCase")]
pub struct TravelSearchQuery {
    pub location: String, // Main search parameter for demonstration (required)
    pub start_date: Option<String>, // Optional fields use Option<T>
    pub end_date: Option<String>,
    pub budget: Option<f64>,
    pub keywords: Option<String>,
}
