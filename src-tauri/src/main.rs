// 防止在 Windows release 构建时弹出命令行黑窗口
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    pieckywd_lib::run();
}
