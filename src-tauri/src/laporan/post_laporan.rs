use mongodb::{bson::{doc,Document},
Client, Collection,options::ClientOptions,
};

use serde::Deserialize;


#[derive(Deserialize)]
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
pub async fn add_laporan(pelanggan: String, cart: String, total_harga: String) {
    let client_options  = ClientOptions::parse("mongodb://localhost:27017").await.expect("Failed to parse MongoDB URI");
    let client = Client::with_options(client_options).expect("Failed to connect to MongoDB"); 
    // Get a handle to the database
    let db = client.database("seroja");
    let collection:Collection<Document>  = db.collection("laporan");
    
   

    let document = doc! {
        "pelanggan": &pelanggan,
        "cart": &cart,
        "total_harga": &total_harga,
    };

   /*  collection.insert_one(document, None).await.expect("Failed to find data"); */
    println!("Success add data");
    
   //print data dari frontend
 }