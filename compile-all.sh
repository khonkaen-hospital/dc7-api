rm -rf dc7-api-win-win32-ia32
rm -rf dc7-api-darwin-x64
#rm -rf dc7-api-linux-linux-x64

ng build --base-href=./

scp src/entry.js dist/
scp src/entry.live.js dist/
scp src/package.json.txt dist/package.json

#mkdir dist/images
#scp -r images/* dist/images

#mkdir dist/assets/data
#mkdir dist/assets/data/files

#electron-packager ./dist dc7-api --platform=darwin --arch=x64 --icon=./dist/assets/moph.ico --asar --electron-version=1.6.10
#electron-packager ./dist dc7-api-win --platform=win32 --arch=ia32 --icon=./assets/moph.ico --asar --electron-version=1.6.10
#electron-packager ./dist dc7-api-linux --platform=linux --arch=x64 --icon=./assets/moph.ico --asar --electron-version=1.6.10

electron-packager ./dist dc7-api --platform=darwin --arch=x64  --asar --electron-version=1.6.10
electron-packager ./dist dc7-api-win --platform=win32 --arch=ia32 --asar --electron-version=1.6.10

open dc7-api-darwin-x64/.
