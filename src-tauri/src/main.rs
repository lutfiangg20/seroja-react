// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use serde_json::Value;
use std::fs::File;
use std::io::prelude::*;
use std::path::PathBuf;
use dirs;


use mongodb::{Client, options::ClientOptions, bson::{self, Document}};

use serde_json;

#[tauri::command]
async fn add_data(db: String, collection: String, data: String) -> Result<(), String> {
    // Setup MongoDB client
    let client_options = ClientOptions::parse("mongodb://localhost:27017").await.map_err(|err| format!("Failed to parse MongoDB URI: {}", err))?;
    let client = Client::with_options(client_options).map_err(|err| format!("Failed to connect to MongoDB: {}", err))?;
    let db = client.database(&db);
    let coll = db.collection(&collection);

    // Parse JSON data into BSON document
    let doc: Document = serde_json::from_str(&data).map_err(|err| format!("Failed to parse JSON data: {}", err))?;

    // Insert document into collection
    coll.insert_one(doc, None).await.map_err(|err| format!("Failed to insert document into MongoDB: {}", err))?;

    Ok(())
}



fn main() {
  
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![add_data,read_data])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

