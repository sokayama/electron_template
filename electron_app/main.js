/* buildのときにconsoleを開いておく */
const DEV_MODE = false;

const { app, BrowserWindow } = require('electron');

const path = require('path');

console.log('=========================');
console.log(`process.arch = ${process.arch}`);
console.log(`process.versions.electron = ${process.versions.electron}`);
console.log(`process.versions.node = ${process.versions.node}`);
console.log('=========================');

const addonPath = path.join(app.getAppPath(), 'native_modules', 'myaddon.node');
const addon = require(addonPath);
console.log(addon.hello());

// console.log(process.versions);

/* 全てのウィンドウが閉じたら終了 */
app.on('window-all-closed', ()=>{
    if (process.platform != 'darwin') {
        app.quit();
    }
});

/* Electronの初期化完了後に実行 */
app.whenReady().then(()=>{
    const mainWindow = new BrowserWindow({
        width : 800,
        height : 600,
        center : true,
        resizable : true,
        show : true,
        transparent : false,
        frame : true,
        // titleBarStyle: "hidden",

    });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    
    if(DEV_MODE){
        mainWindow.toggleDevTools(); //consoleを最初から開いておきたい
    }
    
});