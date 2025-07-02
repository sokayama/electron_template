/* buildのときにconsoleを開いておく */
const DEV_MODE = false;

const { app, BrowserWindow } = require('electron');

const addon = require('./native_modules/myaddon.node');
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