const { app, BrowserWindow,Menu } = require('electron')
  
  function createWindow () {   
    win = new BrowserWindow({ width: 800, height: 600})

    const template = [
      {
        label: 'Session',
        submenu: [
          {role: 'Login'},
          {type: 'separator'},
          {role: 'Close'},
        ]
      }
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    win.webContents.openDevTools()
    win.on('closed', () => {
      win = null
    })
    win.loadFile('index.html')
  }
  
  app.on('ready', createWindow)

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (win === null) {
      createWindow()
    }
  })