use mongodb::{bson::{doc,Document},
Client, Collection,options::ClientOptions,
};

use serde::{Deserialize,Serialize};
use serde_json::Value;
use bson::Array;


#[derive(Deserialize,Serialize)]
struct Cart{
    id: String,
    nama_barang: String,
    harga: String,
    stok: String,
    total_harga: String,
    created_at: String,
    pelanggan: String,
}



#[tauri::command(rename_all = "snake_case")]
pub async fn add_laporan(pelanggan: String, cart: Array, total_harga: i32,created_at: String)->Result<String,String> {
    let client_options  = ClientOptions::parse("mongodb://localhost:27017").await.expect("Failed to parse MongoDB URI");
    let client = Client::with_options(client_options).expect("Failed to connect to MongoDB"); 
    // Get a handle to the database
    let db = client.database("seroja");
    let collection:Collection<Document>  = db.collection("laporan");
    
    /* let new_cart:Value=serde_json::from_str(&cart).unwrap(); */
    

    let document = doc! {
        "pelanggan": &pelanggan,
        "cart": &cart,
        "total_harga": &total_harga,
        "created_at": &created_at
    };

    collection.insert_one(document, None).await.expect("Failed to find data");
    println!("Success add data ");

    Ok("Success".into())
    
   //print data dari frontend
 }