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
import mixitup from 'mixitup'
import VanillaTilt from "vanilla-tilt"

// components
import Cursor from "./components/cursor/Cursor"
import StarField from "./components/starfield/StarField"

// data
import descAbout from './assets/datas/descAbout'
import skillContent from './assets/datas/Skills'
import educationAndExperience from './assets/datas/educationAndExperience'
import projects from './assets/datas/projects'

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

  // mixitup
  useEffect(() => {
    const mixer = mixitup('.projects__content', {
      animation: {
        duration: 300,
      },
    });

    return () => {
      mixer.destroy();
    };
  }, []);

  // tilt
  useEffect(() => {
    if (window.innerWidth > 768) {
      const tiltElements = document.querySelectorAll(".project__card");
      VanillaTilt.init(tiltElements, {
        max: 15,
        speed: 200,
        glare: true,
        "max-glare": 0.1,
      });
    }

    return () => {
      const tiltElements = document.querySelectorAll(".project__card");
      tiltElements.forEach(el => {
        el.vanillaTilt?.destroy();
      });
    };
  }, []);

  return (
    <>
      {/* stars */}
      <StarField />

      {/* costume cursor */}
      <Cursor />

      {/* overlay */}
      <div className="overlay overlay-1"></div>
      {/* <div className="overlay overlay-2"></div> */}

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

      {/* content section */}
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
          <div className="title">
            <h1 className="section__title">
              My <span>Skills</span>
            </h1>
            <div className="section__devider"></div>
          </div>
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

        {/* education & experience */}
        <section id="education" className="experience section">
          <h1 className="section__title">
            Education & <span>Experience</span>
          </h1>
          <div className="section__devider"></div>
          <div className="timeline">
            {educationAndExperience.map((data) => {
              const isMobile = typeof window !== "undefined" && window.innerWidth <= 768
              const aosDirection = isMobile
                ? "fade-left"
                : `fade-${data.id % 2 === 0 ? 'left' : 'right'}`
              return (
                <div className="timeline-item" key={data.id}>
                  <div className="timeline-date" data-aos={aosDirection}>{data.date}</div>
                  <div className={`dot ${data.id % 2 === 0 ? 'left' : 'right'}`}></div>
                  <div className="timeline-content" data-aos={aosDirection} data-aos-delay="300">
                    <h3>{data.title}</h3>
                    <h4>{data.subTitle}</h4>
                    <p>
                      {data.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* projects */}
        <section className="projects" id="projects">
          <h1 className="section__title">
            My <span>Projects</span>
          </h1>
          <div className="section__devider"></div>
          <div className="btn__group filter-controls">
            <button className="playful-btn" data-filter="all">All Projects</button>
            <button className="playful-btn" data-filter=".web">Web Development</button>
            <button className="playful-btn" data-filter=".cert">Certifications</button>
          </div>

          <div className="projects__content mix-container">
            {projects.map((project) => {
              return (
                <div className={`project__card mix ${project.category}`} key={project.id}>
                  <div className="image__project">
                    <img src={project.image} alt={project.title} />
                  </div>
                  <div className="card__content">
                    <h1 className="title__card-project">{project.title}</h1>
                    <p className="card__content-desc">
                      {project.desc}
                    </p>
                    <div className="btn__group">
                      <a href={project.link} className="btn__link-card">
                        <i className="fas fa-link"></i>
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* banner */}
          <div className="banner" data-aos="fade-up">
            <div className="glare"></div>
            <h1>I Am Available For <span>Freelance</span></h1>
            <p>
              Have a project in mind? Let's work together to
              bring your ideas to life.
            </p>
            <a href="#contact" className="playful-btn">
              Contact Me
              <span></span>
            </a>
          </div>
        </section>

        {/* contact */}
        <section className="contact" id="contact">
          <h1 className="section__title">
            Get In <span>Touch</span>
          </h1>
          <div className="section__devider"></div>
          <div className="content__contact">
            <div className="contact__container">
              <div className="contact__info" data-aos="fade-up">
                <h3 className="info__title">Let's Talk About Your Project</h3>
                <p className="info__text">Feel free to reach out through any of these channels</p>

                <div className="info__items">
                  {/* email */}
                  <div className="info__item">
                    <div className="info__icon">
                      <i class="fa-solid fa-envelope"></i>
                    </div>
                    <div className="info__content">
                      <h4>Email</h4>
                      <a href="mailto:your@email.com">zaayeennn@gmail.com</a>
                    </div>
                  </div>

                  {/* phone */}
                  <div className="info__item">
                    <div className="info__icon">
                      <i class="fa-solid fa-phone"></i>
                    </div>
                    <div className="info__content">
                      <h4>Phone</h4>
                      <a href="tel:+1234567890">+62 8778 8612 930</a>
                    </div>
                  </div>

                  {/* location */}
                  <div className="info__item">
                    <div className="info__icon">
                      <i class="fa-solid fa-location-dot"></i>
                    </div>
                    <div className="info__content">
                      <h4>Location</h4>
                      <p>West Java, Indonesia</p>
                    </div>
                  </div>
                </div>

                {/* social media */}
                <div className="hero__socials">
                  <a href="https://github.com/zayennn" className="github">
                    <i className="fab fa-github"></i>
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="https://www.instagram.com/zaayeenn_/" className="instagram">
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/elang-atha-zahran-100459220/" className="linkedin">
                    <i className="fab fa-linkedin"></i>
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>

              <div className="contact__form" data-aos="fade-up" data-aos-delay="300">
                <form action="#" method="POST">
                  <div className="form__group">
                    <input type="text" name="name" id="name" required />
                    <label htmlFor="name">Your Name</label>
                  </div>
                  <div className="form__group">
                    <input type="email" name="email" id="email" required />
                    <label htmlFor="email">Your Email</label>
                  </div>
                  <div className="form__group">
                    <input type="text" name="subject" id="subject" required />
                    <label htmlFor="subject">Subject</label>
                  </div>
                  <div className="form__group">
                    <textarea name="message" id="message" rows="5" required></textarea>
                    <label htmlFor="message">Your Message</label>
                  </div>
                  <button type="submit" className="playful-btn">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* footer */}
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__top">
            <div className="footer__brand">
              <a href="#" className="footer__logo">Port<span>folio</span></a>
              <p className="footer__tagline">
                I'm always open to discussing new projects, collaborations, or just a friendly chat about web
                development. Whether you have a question, an idea, or simply want to say hello — feel free to
                reach out. Let's build something great together!
              </p>

              <div className="hero__socials">
                <a href="https://github.com/zayennn" className="github">
                  <i className="fab fa-github"></i>
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://www.instagram.com/zaayeenn_/" className="instagram">
                  <i className="fab fa-instagram"></i>
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/in/elang-atha-zahran-100459220/" className="linkedin">
                  <i className="fab fa-linkedin"></i>
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>

            <div className="footer__links">
              <div className="links__group">
                <h3 className="links__title">Quick Links</h3>
                <ul className="links__list">
                  <li><a href="#">Home</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#skills">Skills</a></li>
                  <li><a href="#education-experience">Education & Experience</a></li>
                  <li><a href="#projects">Projects</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>

              <div className="links__group">
                <h3 className="links__title">Services</h3>
                <ul className="links__list">
                  <li><a href="#">Web Development</a></li>
                </ul>
              </div>

              <div className="links__group">
                <h3 className="links__title">Contact</h3>
                <ul className="links__list">
                  <li><a href="mailto:your@email.com">zaayeenn@gmail.com</a></li>
                  <li><a href="tel:+1234567890">+62 8778 8612 930</a></li>
                  <li>
                    <address>West Java, Indonesia</address>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer__bottom">
            <p className="copyright">&copy; <span id="year"></span> Elang Atha Zahran. All rights reserved.</p>

            <div className="legal__links">
              <a href="#">Privacy Policy</a>
              <span>|</span>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App