## ðââï¸ Description

WiFiç£è¦ï¼éç¥

1æ¥10GBå¶éããã±ããWiFiãä½¿ã£ã¦ãã¦ããã¤ä¸éã«éããããããããªãã£ãã®ã§ãå®æçã«éç¥ããã·ã¹ãã 


## Requirement

* node 16.8.0
* yarn 1.22.11

## ð Quick start

```bash
yarn
```

ç°å¢å¤æ°ãè¨­å®ãã

éç¥åã®Slackã®WebhookURLã¨WiFiã®æå ±åå¾åã®URL

```bash
vim .env

WEBHOOK='https://hooks.slack.com/services/YOUR_WEBHOOK'
WIFI_URL='http://YOUR_ROUTER_IP/status_info_iframe.html'
```

### ãã¹ãå®è¡

```bash
yarn start
```

### å®æå®è¡è¨­å®

```bash
chmod 755 exec.sh 
```

```bash
crontab -e

# WiFiç£è¦
0/10 * * * * export PATH=$PATH:/YARN_PATH/.anyenv/envs/nodenv/shims && /YOUR_DIRECTORY/watch-wifi-data/exec.sh 2>/YOUR_DIRECTORY/watch-wifi-data/error.log
```

## Note

ã©ãããªãæ°ããæè¡ãã¨ã

JavaScriptåã§ã·ã§ã«ã³ãã³ããå©ãã[zx](https://github.com/google/zx)ã¨
ã¹ã¯ã¬ã¤ãã³ã°ã«[playwright](https://github.com/microsoft/playwright)ãä½¿ãã¾ããã

zxã¯Googleçºã®ãã¼ã«ã§JSã§ã·ã§ã«å©ããã®ã«èå³ãæ¹ããã¦ãç¡é§ã«Webhookã®POSTã¯curlã³ãã³ããä½¿ãã¾ããã  
å¤æ°ãã³ãã³ãåã«åãè¾¼ãã®ã«ã¯ã»ãããã¾ããã

playwrightã¯Puppeteerã®ä»£æ¿ãã¼ã«ã§Microsoftãéçºãã¦ããã  
E2Eã¨ãã§ä½¿ãããã§ã¯ãªãã®ã§ãç¹ã«è¸ã¿è¾¼ããã¨ããªããPuppeteerã¨ããã¾ãå¤ãããä½¿ãã¾ããã
