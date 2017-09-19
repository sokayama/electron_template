# ビルド方法

## 前準備
```
npm install electron-prebuilt -g
npm install asar -g
```

## ビルド
1. node_modulesをインストール
```
npm install
```

2. asar作る
```
asar pack ./ ./appname.asar
```

3. exe作る
```
mkdir output
cd output
electron-packager .. --platform=win32 --arch=x64 --electron-version=1.4.13
```

# 各ファイル
* main.js
    - サーバ側。websocketでコマンドの文字列を受け取って実行する

* index.html
    - アプリの見た目。app.jsを呼んでる

* app.js
    - クライアント側。websocketでコマンドの文字列を送る