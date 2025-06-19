// src/lib.rs

// Declare your existing modules as public modules of this library.
// 'pub' makes them accessible from outside this library crate (e.g., from your main binary).
// The module names here correspond directly to your .rs filenames in `src/`.
pub mod amadeus_auth;
pub mod amadeus_api;
pub mod models;
pub mod api_clients;
pub mod handlers;

// You can also put shared structs or traits that many modules might use directly here.
// For example, if you had a global `Error` enum or a common `Result` type, it could go here.

// No `main` function here! This file defines the *library*.