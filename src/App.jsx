import { React, useState, useEffect, useRef } from "react";
import "./App.css";
import Typed from "typed.js";
import heroImg from './assets/images/me2.jpg'

export const App = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const navbarControl = () => {
      if (window.scrollY > 200) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
      window.addEventListener("scroll", navbarControl);
      return () => {
        window.removeEventListener("scroll", navbarControl);
      };
    };
    navbarControl();
  }, [isActive]);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      navLinks.classList.remove("active");
    } else {
      navLinks.classList.add("active");
    }
    setIsActive(!isActive);
    setIsChecked(!isChecked);
  }

  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["junior fullstack web developer", "ui/ux designer", "freelancer"],
      typeSpeed: 10,
      backSpeed: 20,
      backDelay: 1000,
      fadeOut: true,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      {/* navbar */}
      <div className={`navbar__container ${isActive ? "active" : ""}`}>
        <h1>
          port<span>folio</span>
        </h1>
        <nav className={`nav__links ${isChecked ? "active" : ""}`}>
          <a href="#hero" className="nav__link" style={{ "--i": 1 }}>home</a>
          <a href="#about" className="nav__link" style={{ "--i": 2 }}>about</a>
          <a href="#skills" className="nav__link" style={{ "--i": 3 }}>skills</a>
          <a href="#education" className="nav__link" style={{ "--i": 4 }}>education & experience</a>
          <a href="#projects" className="nav__link" style={{ "--i": 5 }}>projects</a>
          <a href="#contact" className="nav__link" style={{ "--i": 6 }}>contact</a>
        </nav>
        <label className="hamburger">
          <input type="checkbox" onChange={handleCheckbox} />
          <svg viewBox="0 0 32 32">
            <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22" />
            <path className="line" d="M7 16 27 16" />
          </svg>
        </label>
      </div>

      {/* hero section */}
      <div className="container">
        <section className="hero" id="hero">
          <div className="content">
            <h3>hello everyone, i'm</h3>
            <h1>
              elang atha <span>zahran</span> 👋
            </h1>
            <p>
              i'm a, <span ref={el}></span>
            </p>
            <button className="playful-btn">let's connect</button>
          </div>
          <div className="image__content hero">
            <img src={heroImg} alt="Profile Image" />
          </div>
        </section>
      </div>
    </>
  )
}

export default App