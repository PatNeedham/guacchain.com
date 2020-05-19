import React from 'react'
import { Route } from 'react-router-dom'
import Header from './Header';
import Home from './pages/Home'
import About from './pages/About'
import Subscribe from './pages/Subscribe'

const App = () => (
  <div>
    <Header />
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/subscribe" component={Subscribe} />
    </div>
  </div>
)

App.displayName = 'App'

export default App
