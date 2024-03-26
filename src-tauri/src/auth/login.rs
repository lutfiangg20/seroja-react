use bson::document;
use mongodb::{bson::{doc,Document},
Client, Collection,options::ClientOptions
};


#[tauri::command(rename_all = "snake_case")]
pub async fn login(username: String, password: String) {
    let client_options  = ClientOptions::parse("mongodb://localhost:27017").await.expect("Failed to parse MongoDB URI");
    let client = Client::with_options(client_options).expect("Failed to connect to MongoDB"); 
    // Get a handle to the database
    let db = client.database("seroja");
    let collection:Collection<Document>  = db.collection("user");


    let user = doc!{
        "username": &username,
        "password": &password
    };
    //cursor get password by username
    //string to json
    
    if let Some(_document) = collection.find_one(user, None).await.expect("Failed to find data") {
        // Jika dokumen ditemukan, kredensial cocok
        println!("login success");
        let token:Collection<Document>= db.collection("token");
        let token_doc = doc! {
            "username": &username,
            "token":"logged_in"
        };
        let filter = doc! {
            "username": &username
        };
    
        let update = doc! {
            "$set": token_doc
        };
    
        token.update_one(filter,update, None).await.expect("Failed to find data");

    } else {
        // Jika tidak ada dokumen yang cocok, kredensial tidak cocok
        println!("login failed");
    }
    

 }