import React from 'react'
import { Link } from 'react-router-dom'

const headerStyle = {
  width: '100%',
  minHeight: 60,
  borderBottomWidth: 1,
  borderBottomColor: 'black',
  borderBottomStyle: 'solid',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'lightgray'
}

const aTagStyle = {
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  height: 60
}

const Header = () => (
  <div style={headerStyle}>
    <Link to="/" style={aTagStyle}>Home</Link>
    <Link to="/about" style={aTagStyle}>About</Link>
    <Link to="/subscribe" style={aTagStyle}>Subscibe</Link>
    <Link to="/login" style={aTagStyle}>Log in</Link>
  </div>
)

Header.displayName = 'Header'

export default Header
