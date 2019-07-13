import React from './node_modules/react';
import './new.css';

import Section from './Section';
import Footer from './Footer';

export default function New() {
  return (
    <div className="container">
      <header className="header">
        <h1 className="header__title">todos</h1>
      </header>
      <Section />
      <Footer />
    </div>
  )
}
