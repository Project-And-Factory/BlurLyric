module.exports = {
  packageConfig: {
      name: 'BlurlyricPC',
      icon: './src/assets/icon.ico',
      authors: "Gozaoo"
  },
  makers: [
      {
          name: "@electron-forge/maker-squirrel",
          config: {
              icon: '/src/assets/icon.png',
          }
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
