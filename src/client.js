import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'

const app = document.getElementById('app')
// Use hydrate instead of render to attach event listeners to existing markup
hydrate(<BrowserRouter><App /></BrowserRouter>, app)
