// travel_data_aggregator/src/api_clients.rs

// Import necessary data structures from the parent module (crate).
// 'crate::models::*' imports all public items from 'src/models.rs'.
use crate::models::{Flight, Hotel, Activity, TravelSearchQuery};

// Import utilities for asynchronous operations, specifically for simulating delays.
use tokio::time::{sleep, Duration}; // For simulating network latency

// --- Simulated "External API Calls" (Async Functions with Delays) ---

// Simulates calling a Flight API (e.g., Skyscanner).
// This function is 'pub async' to be publicly accessible and asynchronous.
pub async fn simulated_skyscanner_api_call(query: TravelSearchQuery) -> Vec<Flight> {
    println!("Simulating Skyscanner API call for: {:?}", query.location);
    // Simulate network latency or processing time.
    sleep(Duration::from_millis(500)).await;

    // Generate mock flight data based on the query location.
    let mut flights = vec![];
    if query.location.eq_ignore_ascii_case("London") {
        flights.push(Flight {
            id: "SKY001".to_string(), airline: "British Airways".to_string(), flight_number: "BA286".to_string(),
            origin: "NYC".to_string(), destination: "London".to_string(),
            departure_date: "2025-07-20".to_string(), arrival_date: "2025-07-21".to_string(),
            departure_time: "19:00".to_string(), arrival_time: "07:00".to_string(),
            price: 650.00, provider: "Skyscanner".to_string(),
        });
        flights.push(Flight {
            id: "SKY002".to_string(), airline: "Virgin Atlantic".to_string(), flight_number: "VS001".to_string(),
            origin: "LAX".to_string(), destination: "London".to_string(),
            departure_date: "2025-07-22".to_string(), arrival_date: "2025-07-23".to_string(),
            departure_time: "17:00".to_string(), arrival_time: "10:00".to_string(),
            price: 720.50, provider: "Skyscanner".to_string(),
        });
    } else if query.location.eq_ignore_ascii_case("Paris") {
         flights.push(Flight {
            id: "SKY003".to_string(), airline: "Air France".to_string(), flight_number: "AF100".to_string(),
            origin: "NYC".to_string(), destination: "Paris".to_string(),
            departure_date: "2025-08-01".to_string(), arrival_date: "2025-08-02".to_string(),
            departure_time: "20:00".to_string(), arrival_time: "08:00".to_string(),
            price: 580.00, provider: "Skyscanner".to_string(),
        });
    }
    // Simple mock filtering by budget if provided.
    if let Some(budget) = query.budget {
        flights.retain(|f| f.price <= budget);
    }
    flights
}

// Simulates calling a Hotel API (e.g., Hotelbeds).
pub async fn simulated_hotelbeds_api_call(query: TravelSearchQuery) -> Vec<Hotel> {
    println!("Simulating Hotelbeds API call for: {:?}", query.location);
    sleep(Duration::from_millis(700)).await; // Simulate network latency

    let mut hotels = vec![];
    if query.location.eq_ignore_ascii_case("London") {
        hotels.push(Hotel {
            id: "HBD001".to_string(), name: "The Grand London".to_string(), location: "London".to_string(),
            check_in_date: "2025-07-20".to_string(), check_out_date: "2025-07-25".to_string(),
            price_per_night: 250.00, rating: 4.7, amenities: vec!["WiFi".to_string(), "Spa".to_string()],
            provider: "Hotelbeds".to_string(),
        });
        hotels.push(Hotel {
            id: "HBD002".to_string(), name: "Cozy Inn London".to_string(), location: "London".to_string(),
            check_in_date: "2025-07-21".to_string(), check_out_date: "2025-07-24".to_string(),
            price_per_night: 120.00, rating: 3.9, amenities: vec!["Breakfast".to_string()],
            provider: "Hotelbeds".to_string(),
        });
    } else if query.location.eq_ignore_ascii_case("Paris") {
         hotels.push(Hotel {
            id: "HBD003".to_string(), name: "Hotel Belle Vue".to_string(), location: "Paris".to_string(),
            check_in_date: "2025-08-01".to_string(), check_out_date: "2025-08-05".to_string(),
            price_per_night: 300.00, rating: 4.9, amenities: vec!["Restaurant".to_string(), "Balcony".to_string()],
            provider: "Hotelbeds".to_string(),
        });
    }
    // Simple mock filtering by budget if provided.
    if let Some(budget) = query.budget {
        hotels.retain(|h| h.price_per_night * 5.0 <= budget); // Assuming 5 nights for hotel budget approximation
    }
    hotels
}

// Simulates calling an Activities API (e.g., Viator).
pub async fn simulated_viator_api_call(query: TravelSearchQuery) -> Vec<Activity> {
    println!("Simulating Viator API call for: {:?}", query.location);
    sleep(Duration::from_millis(300)).await; // Simulate network latency

    let mut activities = vec![];
    if query.location.eq_ignore_ascii_case("London") {
        activities.push(Activity {
            id: "VTR001".to_string(), name: "London Eye Ticket".to_string(), location: "London".to_string(),
            date: "2025-07-22".to_string(), price_per_person: 35.00,
            description: "Panoramic views of London from the iconic Ferris wheel.".to_string(),
            provider: "Viator".to_string(),
        });
        activities.push(Activity {
            id: "VTR002".to_string(), name: "Tower of London Tour".to_string(), location: "London".to_string(),
            date: "2025-07-23".to_string(), price_per_person: 30.00,
            description: "Explore the historic Tower of London and Crown Jewels.".to_string(),
            provider: "Viator".to_string(),
        });
    } else if query.location.eq_ignore_ascii_case("Paris") {
         activities.push(Activity {
            id: "VTR003".to_string(), name: "Louvre Museum Skip-the-Line".to_string(), location: "Paris".to_string(),
            date: "2025-08-03".to_string(), price_per_person: 60.00,
            description: "Visit the world-famous Louvre Museum with priority access.".to_string(),
            provider: "Viator".to_string(),
        });
    }
    // Simple mock filtering by keywords.
    if let Some(keywords) = query.keywords {
        let lower_keywords = keywords.to_lowercase();
        activities.retain(|a| a.name.to_lowercase().contains(&lower_keywords) || a.description.to_lowercase().contains(&lower_keywords));
    }
    // Simple mock filtering by budget.
    if let Some(budget) = query.budget {
        activities.retain(|a| a.price_per_person <= budget / 2.0); // Assuming budget is for full trip, activity is a small part
    }
    activities
}

