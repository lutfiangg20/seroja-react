use mongodb::{bson::{doc,Document},
Client, Collection,options::ClientOptions,
};

#[tauri::command(rename_all = "snake_case")]
pub async fn delete_pelanggan(nama: String){
   let client_options  = ClientOptions::parse("mongodb://localhost:27017").await.expect("Failed to parse MongoDB URI");
   let client = Client::with_options(client_options).expect("Failed to connect to MongoDB"); 
   // Get a handle to the database
   let db = client.database("seroja");
   println!("Pinged your deployment. You successfully connected to MongoDB!");
   let collection:Collection<Document>  = db.collection("pelanggan");
   let document = doc! {
       "nama": &nama,
   };

   collection.delete_one(document, None).await.expect("Failed to find data");
   
  //print data dari frontend
  println!("Success delete data");
}