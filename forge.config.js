module.exports = {
    packageConfig: {
        name: 'BlurLyric',
        icon: './icon.ico',
        setupIcon: "./icon.ico",
        authors: "Gozaoo"
    },
    makers: [
        {
            name: "@electron-forge/maker-squirrel",
        },{
            name: "@electron-forge/maker-deb",
        },{
            "name": "@electron-forge/maker-zip",
            "platforms": [
              "darwin"
            ]
          }
    ],
    readPackageJson: {
      main: 'build.js'
    }
  }
