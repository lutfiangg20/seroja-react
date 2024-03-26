use mongodb::{bson::{doc,Document},
Client, Collection,options::ClientOptions
};

#[tauri::command(rename_all = "snake_case")]
pub async fn token(username: String)->String {
    let client_options  = ClientOptions::parse("mongodb://localhost:27017").await.expect("Failed to parse MongoDB URI");
    let client = Client::with_options(client_options).expect("Failed to connect to MongoDB"); 
    // Get a handle to the database
    let db = client.database("seroja");
    let collection:Collection<Document>  = db.collection("token");


    let user = doc!{
        "username": &username,
    };
    //cursor get password by username
    //string to json
    
    if let Some(_document) = collection.find_one(user, None).await.expect("Failed to find data") {
        // Jika dokumen ditemukan, kredensial cocok
        serde_json::to_string(&_document).expect("Failed to serialize data")
    } else {
        // Jika tidak ada dokumen yang cocok, kredensial tidak cocok
        println!("token not valid");
        "kosong".into()
    }
    

 }