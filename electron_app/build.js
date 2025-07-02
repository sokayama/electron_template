const { build, Platform } = require('electron-builder');
const { Arch } = require('builder-util');
const fs = require('fs');
const os = require('os');

const packagejson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const currentOS = os.platform();

let targets;

if (currentOS === 'win32') {
  targets = Platform.WINDOWS.createTarget('zip', Arch.x64);
} else if (currentOS === 'darwin') {
  targets = Platform.MAC.createTarget('dmg', Arch.x64);
} else {
  console.error('Unsupported OS:', currentOS);
  process.exit(1);
}

const config = {
  appId: `com.example.${packagejson.name}`,
  productName: packagejson.name,
  directories: {
    output: 'dist',
  },
  win: {
    target: ['zip'],
    signAndEditExecutable: false,
  },
  mac: {
    target: ['dmg'],
  },
};

const main = async () => {
  try {
    await build({ targets, config });
    console.log('Build completed successfully');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
};

main();
