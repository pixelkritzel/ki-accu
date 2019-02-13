import React, { Component } from 'react';

import CSS from './Navbar.module.css';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className={CSS.navbar}>
        <button onClick={() => this.props.setView('characterForm')}>Form</button>
        <button onClick={() => this.props.setView('game')}>Game</button>
      </nav>
    );
  }
}
