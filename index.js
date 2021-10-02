const electron = require('electron')
const { app, BrowserWindow } = require('electron')
const path = require('path')
const config = require(`./src/config.json`)

function createWindow() {
	const { width } = electron.screen.getPrimaryDisplay().workAreaSize
	const mainWindow = new BrowserWindow({
		width: 1000,
		height: 600,
		transparent: true,
		x: width - 750,
		y: 23,
		frame: false,
		icon: "./assets/blitzer-logo.ico",
		webPreferences: {
			preload: path.join(__dirname, '/src/preload.js'),
			nodeIntegration: true, 
			enableRemoteModule: true,
			contextIsolation: false
		}
	})

	mainWindow.loadFile('./src/html/overlay.html')
	// mainWindow.setBackgroundColor(config.background) // turns opaque brown
}

app.whenReady().then(() => {
	createWindow()

	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
})