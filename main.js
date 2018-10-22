const { app, BrowserWindow,Menu } = require('electron')
  
  function createWindow () {   

    win = new BrowserWindow({ 
      width: 1080, 
      height: 600,
      frame:false
  })

    // const template = [
    //   {
    //     label: 'Session',
    //     submenu: [
    //       { id: '1', label: 'connect' },
    //       {type: 'separator'},
    //       { id: '2', label: 'disconnect' },
    //     ]
    //   }
    // ]

    // const menu = Menu.buildFromTemplate(template)
    // Menu.setApplicationMenu(menu)

    // win.webContents.openDevTools()
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