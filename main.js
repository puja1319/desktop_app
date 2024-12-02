const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            //   preload: path.join(__dirname, 'preload.js'),
            //   nodeIntegration: true,
            nodeIntegration: false, // Disable node integration for security
            contextIsolation: true,
        },
    });

    // mainWindow.loadURL(`file://${path.join(__dirname, 'build', 'index.html')}`);
    // Load the React build's index.html
    mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
    // mainWindow.loadFile(path.join(__dirname, 'index.html'));

    // Disable DevTools if not needed
    mainWindow.webContents.on('devtools-opened', () => {
        mainWindow.webContents.closeDevTools();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
