var packager = require('electron-packager');
var config = require('./package.json');

packager({
    dir: '.',
    out: './production',
    name: "appname",
    platform: 'win32',
    arch: 'x64',
    version: '0.36.12',
    icon: './icon/icon.ico',
    "app-version" : config.version,
    overwrite: true,
    asar: true,
    prune: true,
    ignore: "node_modules/(electron-packager|electron-prebuilt|\.bin)|build.js",
    "version-string" : {
        CompanyName: "",
        FileDescription: "appDescription",
        OriginalFilename: "appFilename",
        FileVersion: config.version,
        ProductVersion: config.version,
        ProductName: "appProductName",
        InternalName: "appInternalName",
        LegalCopyright : ""
    }
}, function done (err, appPath) {
    if (err) {
        console.error(err);
    } else {
        console.log("build done!");
	}
});
