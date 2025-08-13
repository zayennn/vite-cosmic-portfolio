import { useState, useEffect, useRef } from "react"
import "./App.css"
import Typed from "typed.js"
import heroImg from './assets/images/me2.jpg'
import aboutImg from './assets/images/me.jpg'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/autoplay'
import { FreeMode, Autoplay } from 'swiper/modules'

// components
import Cursor from "./components/cursor/Cursor"
import StarField from "./components/starfield/StarField"

// data
import descAbout from './assets/datas/descAbout'
import skillContent from './assets/datas/Skills'

export const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    })
  }, [])

  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const navbarControl = () => {
      if (window.scrollY > 200) {
        setIsActive(true)
      } else {
        setIsActive(false)
      }
      window.addEventListener("scroll", navbarControl)
      return () => {
        window.removeEventListener("scroll", navbarControl)
      }
    }
    navbarControl()
  }, [isActive])

  const [isChecked, setIsChecked] = useState(false)

  const handleCheckbox = () => {
    setIsChecked(!isChecked)
    if (isChecked) {
      navLinks.classList.remove("active")
    } else {
      navLinks.classList.add("active")
    }
    setIsActive(!isActive)
    setIsChecked(!isChecked)
  }

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const el = useRef(null)

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["junior fullstack web developer", "ui/ux designer", "freelancer"],
      typeSpeed: 10,
      backSpeed: 20,
      backDelay: 1000,
      fadeOut: true,
      loop: true,
    })

    return () => {
      typed.destroy()
    }
  }, [])

  return (
    <>
      {/* stars */}
      <StarField />

      {/* costume cursor */}
      <Cursor />
      <div className="overlay overlay-1"></div>

      {/* navbar */}
      <div className={`navbar__container ${isActive ? "active" : ""}`}>
        <h1>
          port<span>folio</span>
        </h1>
        <nav className={`nav__links ${isChecked ? "active" : ""}`}>
          <a href="#hero" className={`nav__link ${activeSection === "hero" ? "active" : ""}`} style={{ "--i": 1 }}>home</a>
          <a href="#about" className={`nav__link ${activeSection === "about" ? "active" : ""}`} style={{ "--i": 2 }}>about</a>
          <a href="#skills" className={`nav__link ${activeSection === "skills" ? "active" : ""}`} style={{ "--i": 3 }}>skills</a>
          <a href="#education" className={`nav__link ${activeSection === "education" ? "active" : ""}`} style={{ "--i": 4 }}>education & experience</a>
          <a href="#projects" className={`nav__link ${activeSection === "projects" ? "active" : ""}`} style={{ "--i": 5 }}>projects</a>
          <a href="#contact" className={`nav__link ${activeSection === "contact" ? "active" : ""}`} style={{ "--i": 6 }}>contact</a>
        </nav>
        <label className="ham__container">
          <input type="checkbox" onChange={handleCheckbox} />
          <div class="checkmark">
            <span></span>
            <span></span>
            <span></span>
          </div>
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
              {descAbout.map((desc) => {
                return (
                  <>
                    <p class="desc__about subtitle">
                      {desc.desc1}
                    </p>
                    <p class="desc__about subtitle">
                      {desc.desc2}
                    </p>
                  </>
                )
              })}
              <a href="#" class="playful-btn">Download Cv</a>
            </div>
          </div>
        </section>

        {/* skills */}
        <section className="skills" id="skills">
          <h1 className="section__title">
            My <span>Skills</span>
          </h1>
          <div className="section__devider"></div>

          <Swiper
            modules={[FreeMode, Autoplay]}
            freeMode={true}
            loop={true}
            grabCursor={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false
            }}
            speed={3000}
            spaceBetween={20}
            slidesPerView="auto"
          >
            {skillContent.map((item) => (
              <SwiperSlide key={item.id} style={{ width: '300px' }}>
                <div className="skill__card">
                  <div className="logo">
                    {item.icon.startsWith('/') ? (
                      <img src={item.icon} alt={item.name} style={{ width: '24px', height: '24px' }} />
                    ) : (
                      <i className={item.icon}></i>
                    )}
                  </div>
                  <h1>{item.name}</h1>
                  <p>{item.desc}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

      </div>
    </>
  )
}

export default App