// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
// mod setup;

fn main() {
  tauri::Builder::default()
    // .setup(setup::init)
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
