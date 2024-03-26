use mongodb::{bson::{doc,Document},
Client, Collection,options::ClientOptions,
};

use futures::TryStreamExt;

#[tauri::command]
pub async fn get_pelanggan()-> String {
    let client_options  = ClientOptions::parse("mongodb://localhost:27017").await.expect("Failed to parse MongoDB URI");
    let client = Client::with_options(client_options).expect("Failed to connect to MongoDB"); 
    // Get a handle to the database
    let db = client.database("seroja");
    println!("Pinged your deployment. You successfully connected to MongoDB!");
    let collection:Collection<Document>  = db.collection("pelanggan");
    let cursor = collection.find(None, None).await.expect("Failed to find data");
   
    let serial: Vec<Document> = cursor.try_collect().await.expect("Failed to deserialize data");
    serde_json::to_string(&serial).expect("Failed to serialize data")
    
 }