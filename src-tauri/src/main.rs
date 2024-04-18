// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


 //use trystream
 

/* #[tauri::command]
fn node_server(){
    let _ = Command::new("node")
  .arg("server")
  .current_dir("C:/server-seroja")
  .output();
  
  println!("nodemon running");
 } */

 //make function to run server.js

 
 
 
/* mod barang;
use barang::{get_barang,post_barang,delete_barang,update_barang};
mod auth;
use auth::{login,token};
mod kategori;
use kategori::{get_kategori,post_kategori,delete_kategori};
mod pelanggan;
use pelanggan::{get_pelanggan,post_pelanggan,delete_pelanggan};
mod laporan;
use laporan::{get_laporan,post_laporan}; */


fn main() { 
    /* let get_barang=get_barang::get_barang;
    let add_barang=post_barang::add_barang;
    let delete_barang=delete_barang::delete_barang;
    let update_barang=update_barang::update_barang;
    let login=login::login;
    let token=token::token;
    let get_kategori=get_kategori::get_kategori;
    let add_kategori=post_kategori::add_kategori;
    let delete_kategori=delete_kategori::delete_kategori;
    let get_pelanggan=get_pelanggan::get_pelanggan;
    let add_pelanggan=post_pelanggan::add_pelanggan;
    let delete_pelanggan=delete_pelanggan::delete_pelanggan;
    let get_laporan=get_laporan::get_laporan;
    let add_laporan=post_laporan::add_laporan; */

    tauri::Builder::default()
    // .setup(|app|{
    //     let _ = Command::new("node")
    //     .arg("server")
    //     .current_dir("C:/server-seroja")
    //     .spawn();
    // Ok(())
    // })
    .invoke_handler(tauri::generate_handler![
       /*  login,
        token,
        get_barang,
        get_kategori,
        add_barang,
        add_kategori,
        delete_kategori,
        delete_barang,
        update_barang,
        get_pelanggan,
        add_pelanggan,
        delete_pelanggan,
        get_laporan,
        add_laporan */
        ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

