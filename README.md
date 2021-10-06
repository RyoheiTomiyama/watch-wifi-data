## 💁‍♂️ Description

WiFi監視＆通知

1日10GB制限をポケットWiFiを使っていて、いつ上限に達するかがわからなかったので、定期的に通知するシステム


## Requirement

* node 16.8.0
* yarn 1.22.11

## 🚀 Quick start

```bash
yarn
```

環境変数を設定する

通知先のSlackのWebhookURLとWiFiの情報取得先のURL

```bash
vim .env

WEBHOOK='https://hooks.slack.com/services/YOUR_WEBHOOK'
WIFI_URL='http://YOUR_ROUTER_IP/status_info_iframe.html'
```

### テスト実行

```bash
yarn start
```

### 定期実行設定

```bash
chmod 755 exec.sh 
```

```bash
crontab -e

# WiFi監視
0/10 * * * * sh /YOUR_DIRECTORYs/watch-wifi-data/exec.sh 2>/YOUR_DIRECTORYs/watch-wifi-data/error.log
```

## Note

どうせなら新しい技術をと、

JavaScript内でシェルコマンドを叩ける[zx](https://github.com/google/zx)と
スクレイピングに[playwright](https://github.com/microsoft/playwright)を使いました。

zxはGoogle発のツールでJSでシェル叩けるのに興味を惹かれて、無駄にWebhookのPOSTはcurlコマンドを使いました。  
変数をコマンド内に埋め込むのにクセがありました。

playwrightはPuppeteerの代替ツールでMicrosoftが開発している。  
E2Eとかで使うわけではないので、特に踏み込むこともなく。Puppeteerとあんまり変わらず使えました。
