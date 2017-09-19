'use strict';

/* buildのときにconsoleを開いておく */
const DEV_MODE = false;

/* Electronのモジュール */
const electron = require("electron");

/* アプリケーションをコントロールするモジュール */
const app = electron.app;

/* ウィンドウを作成するモジュール */
const BrowserWindow = electron.BrowserWindow;

/* メインウィンドウはGCされないようにグローバル宣言 */
let mainWindow;

/* 全てのウィンドウが閉じたら終了 */
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

/* Electronの初期化完了後に実行 */
app.on('ready', function() {
  /* メイン画面の表示。ウィンドウの幅、高さを指定できる */
  mainWindow = new BrowserWindow({
    width : 600,
    height : 400,
    center : true,
    resizable : false,
    show : true,
    transparent : true,
    frame : true
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  
  if(DEV_MODE){
    mainWindow.toggleDevTools(); //consoleを最初から開いておきたい
  }

  /* ウィンドウが閉じられたらアプリも終了 */
  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  
});