const electron = require('electron')
const { app, BrowserWindow } = require('electron')
const { autoUpdater } = require('electron-updater')
const path = require('path')
const config = require(`./src/config.json`)

function createWindow() {
	const { width } = electron.screen.getPrimaryDisplay().workAreaSize
	const mainWindow = new BrowserWindow({
		width: 1000,
		height: 600,
		transparent: true,
		x: width - 1000,
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

	autoUpdater.checkForUpdatesAndNotify()

	mainWindow.loadFile('./src/html/overlay.html')

	if (process.os == "darwin") app.dock.hide()
	mainWindow.setAlwaysOnTop(true, 'floating')
	mainWindow.setVisibleOnAllWorkspaces(true)
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