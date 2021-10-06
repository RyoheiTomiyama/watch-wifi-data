#!/usr/bin/env zx

import dotenv from 'dotenv'
import { chromium } from 'playwright';

dotenv.config()

const config = {
  url: process.env.WIFI_URL,
  alertVolume: 7,
  limitVolume: 10,
  webhook: process.env.WEBHOOK,
  channel: '#notice-general',
  botName: 'WiFi Bot',
}

// Slackに通知
const postHook = async (text) => {
  const value = text?.match(/[\d\.]+/)?.[0]

  if (!value) {
    console.log('value not found', text)
    process.exit(1);
  }

  const volume = Number(value)
  if (!volume) {
    return
  }

  // data.logから前回の値を取得
  // 2021-10-06T08:13:48.185Z 2.72
  const prevData = (await $`cat data.log`)?.toString()?.split(' ')

  // 今回の値をdata.logに保存 
  await $`echo ${new Date().toISOString()} ${volume} > data.log`
  
  const payload = {
    channel: config.channel,
    username: config.botName,
    text: encodeURIComponent(`現在の通信量: ${text}`),
    icon_emoji: ':full_moon_with_face:',
  }

  const args = [
    `-X`,
    `POST`,
    '--data',
    `payload=${JSON.stringify(payload)}`,
    config.webhook,
  ]

  // 通信量によってメッセージを変更する
  if (volume >= config.limitVolume) {
    // Notification over limit
    payload.text = encodeURIComponent(`@channel 1日の通信量が上限に達しました： ${volume}GB`)
    payload.icon_emoji = ':new_moon_with_face:'
  } else if (volume >= config.alertVolume) {
    // Notification over alert
    // 前回もalertに引っかかっていたらデフォルトの通知にする
    if (Number(prevData[1]) < config.limitVolume) {
      payload.text = encodeURIComponent(`@channel 上限が近づいています。通信制限まであと${config.limitVolume - volume}GB`)
      payload.icon_emoji = ':first_quarter_moon_with_face:'
    }
  }
  
  await $`curl ${args} `
}

// 通信量のデータをサイトから取得
const getData = async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(config.url);
  
  const element = await page.$('#div_manage_my_device tr:nth-child(2)')

  const text = await element?.textContent()
  return text
}

const text = await getData();

// 値が見つけられなかった/小さいときは終了
if (!text || text?.includes('MB')) {
  console.log(text)
  process.exit(1);
}

await postHook(text)

process.exit();
