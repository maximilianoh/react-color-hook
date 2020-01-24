import React, { useState } from 'react';
import DesktopLayout from './DesktopLayout';
import MobileLayout from './MobileLayout';

const Layout = () => {
  const [color, setColor] = useState({
    r: 25,
    g: 77,
    b: 51,
    a: 1,
  });
  const handleChangeComplete = (c) => {
    setColor(c.rgb);
  };
  const titleAlpha = color.a > 0.7 ? 'white' : 'black';
  return (
    <>
      <section
        className="hero is-medium is-bold"
        style={{
          backgroundColor: `rgb(${color.r},${color.g},${color.b},${color.a})`,
        }}
      >
        <div className="hero-head" />
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title" style={{ color: titleAlpha }}>
              Color Picker
            </h1>
          </div>
        </div>
      </section>
      <div className="box cta">
        <p className="has-text-centered">
        React-Hook Color Picker
        </p>
      </div>
      <section className="container">
        <div className="is-hidden-touch">
          <DesktopLayout color={color} handleChangeComplete={handleChangeComplete} />
        </div>
        <div className="is-hidden-desktop">
          <MobileLayout color={color} handleChangeComplete={handleChangeComplete} />
        </div>
      </section>
      <footer className="footer" style={{ marginTop: '2%' }}>
        <div className="container">
          <nav className="level is-mobile">
            <div className="level-item has-text-centered">
              <a href="https://bulmatemplates.github.io/bulma-templates/templates/hero.html">
                <div className="tags has-addons">
                  <span className="tag is-dark">Template Based on</span>
                  <span className="tag is-info">Bulma</span>
                </div>
              </a>
            </div>
            <div className="level-item has-text-centered">
              <a href="https://github.com/casesandberg/react-color">
                <div className="tags has-addons">
                  <span className="tag is-dark">Source code Based on</span>
                  <span className="tag is-info">React-Color</span>
                </div>
              </a>
            </div>
          </nav>
        </div>
      </footer>
    </>
  );
};

export default Layout;
