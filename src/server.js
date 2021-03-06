import express from 'express'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheet } from 'styled-components';
import App from './components/App'
import webpackAssets from './webpackAssets.json'

const app = express()
app.use(express.static(path.resolve(__dirname, '../public')))

export const mainHandler = (req, res) => {
  const sheet = new ServerStyleSheet()
  const jsx = sheet.collectStyles(<StaticRouter location={req.url}><App /></StaticRouter>)
  const reactDom = renderToString(jsx)
  const styles = sheet.getStyleTags()
  res.writeHead(200, { 'Content-Type': 'text/html' })
  const responseStr = htmlTemplate(reactDom, styles)
  res.end(responseStr)
}

const assetsArray = Object.keys(webpackAssets).map(key => webpackAssets[key].js).filter(asset => asset)

export const htmlTemplate = (reactDom, styles) => {
  return `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Guacchain</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="icon" type="image/x-icon" href="/assets/favicon.ico">
          ${styles}
        </head>

        <body>
            <div id="app">${reactDom}</div>
            ${assetsArray.map(filePath => `<script src="${filePath}"></script>`).join('')}
        </body>
        </html>
    `
}

export default app
