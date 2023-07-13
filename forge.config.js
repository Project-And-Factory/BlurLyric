module.exports = {
  packageConfig: {
      name: 'Blurlyric',
      icon: 'src/assets/ico/icon',
      authors: "Gozaoo"
  },
  makers: [
      {
          name: "@electron-forge/maker-squirrel"
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
