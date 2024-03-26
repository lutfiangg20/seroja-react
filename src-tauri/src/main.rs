// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
/* use serde_json::Value;
use std::fs::File;
use std::io::prelude::*;
use std::path::PathBuf;
use dirs;
use std::env; */



/* use mongodb::{Client,Database, options::ClientOptions, bson::{self, Document}};

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
 */
/* async fn read_data<E: std::convert::From<mongodb::error::Error>>() -> Result<Vec<Document>, Error> {
    let uri = env::var("mongodb://localhost:27017").expect("MONGODB_URI not set");
    let client = Client::with_uri_str(&uri).await?;
    let db_name = env::var("seroja").expect("MONGODB_DB not set");
    let db: Database = client.database(&db_name);
    let collection_name = env::var("kategori").expect("MONGODB_COLLECTION not set");
    let collection = db.collection(&collection_name);
    let mut cursor = collection.find(None, None).await?;


    let mut documents = Vec::new();
    while cursor.advance().await? {
        documents.push(cursor.deserialize_current()?);
    }

    Ok::<Vec<()>, E>(documents)
}
 */
 use std::process::Command;
 use mongodb::{bson::{doc,Document},
 error::Error,Client, Collection,options::ClientOptions,
 Database,};
 //use trystream
 use futures::TryStreamExt;
 
 

/* #[tauri::command]
fn node_server(){
    let _ = Command::new("node")
  .arg("server")
  .current_dir("C:/server-seroja")
  .output();
  
  println!("nodemon running");
 } */

 //make function to run server.js

 #[tokio::main]
 async fn get_connection(col:&str)-> Collection<Document> {
    let client_options  = ClientOptions::parse("mongodb://localhost:27017").await.expect("Failed to parse MongoDB URI");
    let client = Client::with_options(client_options).expect("Failed to connect to MongoDB"); 
    // Get a handle to the database
    let db = client.database("seroja");
    println!("Pinged your deployment. You successfully connected to MongoDB!");
    let collection:Collection<Document>  = db.collection(col);
    return collection;
 }
 
 #[tauri::command]
 async fn get_barang()-> String {

    // Create a Client using the ClientOptions
    let col:&str = "barang";
    let collection =get_connection(col);
    let cursor = collection.find(None, None).await.expect("Failed to find data");

    let serial: Vec<Document> = cursor.try_collect().await.expect("Failed to deserialize data");
    serde_json::to_string(&serial).expect("Failed to serialize data")
 }

 


fn main() { 
    tauri::Builder::default()
    .setup(|app|{
        let _ = Command::new("node")
        .arg("server")
        .current_dir("C:/server-seroja")
        .spawn();
    Ok(())
    })
    .invoke_handler(tauri::generate_handler![get_barang])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

