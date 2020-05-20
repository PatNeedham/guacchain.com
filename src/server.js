import express from 'express'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './components/App'
import webpackAssets from './webpackAssets.json'

const app = express()
app.use(express.static(path.resolve(__dirname, '../public')))

export const mainHandler = (req, res) => {
  const jsx = <StaticRouter location={req.url}><App /></StaticRouter>
  const reactDom = renderToString(jsx)
  res.writeHead(200, { 'Content-Type': 'text/html' })
  const responseStr = htmlTemplate(reactDom)
  res.end(responseStr)
}

const assetsArray = Object.keys(webpackAssets).map(key => webpackAssets[key].js).filter(asset => asset)

export const htmlTemplate = (reactDom) => {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Guacchain</title>
        </head>

        <body>
            <div id="app">${reactDom}</div>
            ${assetsArray.map(filePath => `<script src="${filePath}"></script>`).join('')}
        </body>
        </html>
    `
}

export default app
