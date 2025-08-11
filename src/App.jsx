import { React, useState, useEffect, useRef } from "react";
import "./App.css";
import Typed from "typed.js";
import heroImg from './assets/images/me2.jpg'
import aboutImg from './assets/images/me.jpg'
import AOS from 'aos';
import 'aos/dist/aos.css';

import Cursor from "./components/cursor/Cursor";

export const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

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

  // description about
  const descAbout = [{
    desc1: "As a passionate Fullstack Web Developer, I specialize in building scalable, responsive, and user-friendly web applications. I work with a modern tech stack including HTML5, CSS3, Bootstrap 5, JavaScript, PHP, Laravel, and React.js. I take pride in writing clean, efficient code and creating seamless user experiences.",
    desc2: "I thrive in team environments where collaboration and continuous learning are key. Keeping up with the latest technologies and best practices is part of my daily routine, ensuring that the solutions I develop are not only functional but also future-ready. Whether it's front-end design or back-end logic, I enjoy bringing ideas to life through code and solving real-world problems with smart digital solutions. I'm always eager to learn new technologies and take on new challenges, and I'm committed to delivering high-quality results to my clients."
  }]

  return (
    <>
      {/* costume cursor */}
      <Cursor />

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
        {/* hero */}
        <section className="hero" id="hero">
          <div className="content">
            <h3 data-aos="fade-up">hello everyone, i'm</h3>
            <h1 data-aos="fade-up" data-aos-delay="300">
              elang atha <span>zahran</span>
            </h1>
            <p data-aos="fade-up" data-aos-delay="500">
              i'm a, <span ref={el}></span>
            </p>
            <button className="playful-btn" data-aos="fade-up" data-aos-delay="700">let's connect</button>
          </div>
          <div className="image__content hero" data-aos="fade-left" data-aos-delay="500">
            <img src={heroImg} alt="Profile Image" />
          </div>
          <a href="#about" id="mouse__down">
            <div className="mousedown">
              <div className="mouse__scroller"></div>
            </div>
          </a>
        </section>

        {/* about */}
        <section className="about" id="about">
          <h1 class="section__title">
            About <span>Me</span>
          </h1>
          <div class="section__devider"></div>

          <div className="about__content">
            <div class="image__content about">
              <img src={aboutImg} alt="Elang Atha Zahran" />
            </div>
            <div class="desc__about">
              <h1>I'm a passionate web <span>developer</span></h1>
              <p class="desc__about subtitle">
                {descAbout[0].desc1}
              </p>
              <p class="desc__about subtitle">
                {descAbout[0].desc2}
              </p>
              <a href="#" class="playful-btn">Download Cv</a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default App