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

import Cursor from "./components/cursor/Cursor"

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

  // description about
  const descAbout = [{
    desc1: "As a passionate Fullstack Web Developer, I specialize in building scalable, responsive, and user-friendly web applications. I work with a modern tech stack including HTML5, CSS3, Bootstrap 5, JavaScript, PHP, Laravel, and React.js. I take pride in writing clean, efficient code and creating seamless user experiences.",
    desc2: "I thrive in team environments where collaboration and continuous learning are key. Keeping up with the latest technologies and best practices is part of my daily routine, ensuring that the solutions I develop are not only functional but also future-ready. Whether it's front-end design or back-end logic, I enjoy bringing ideas to life through code and solving real-world problems with smart digital solutions. I'm always eager to learn new technologies and take on new challenges, and I'm committed to delivering high-quality results to my clients."
  }]

  // skill content
  const skillContent = [
    {
      id: 1,
      icon: "fa-brands fa-html5",
      name: "HTML5",
      desc: "The backbone of the web, crafting semantic and accessible markup."
    },
    {
      id: 2,
      icon: "fa-brands fa-css3-alt",
      name: "CSS3",
      desc: "Designing beautiful and responsive layouts with modern styling techniques."
    },
    {
      id: 3,
      icon: "fa-brands fa-js",
      name: "JavaScript",
      desc: "Adding interactivity and dynamic behavior to web applications."
    },
    {
      id: 4,
      icon: "fa-brands fa-bootstrap",
      name: "Bootstrap 5",
      desc: "Rapid UI development with a responsive, mobile-first framework."
    },
    {
      id: 5,
      icon: "/skills/tailwind.svg",
      name: "Tailwind CSS",
      desc: "Utility-first CSS framework for building modern, custom designs."
    },
    {
      id: 6,
      icon: "fa-brands fa-react",
      name: "React",
      desc: "Building reusable components and interactive UIs efficiently."
    },
    {
      id: 7,
      icon: "/skills/vite.svg",
      name: "Vite",
      desc: "Lightning-fast frontend tooling for modern web projects."
    },
    {
      id: 8,
      icon: "fa-brands fa-node-js",
      name: "Node.js",
      desc: "Server-side JavaScript runtime for scalable backend development."
    },
    {
      id: 9,
      icon: "/skills/express.svg",
      name: "Express",
      desc: "Minimal and flexible Node.js framework for building APIs."
    },
    {
      id: 10,
      icon: "fa-brands fa-php",
      name: "PHP",
      desc: "Server-side scripting language powering dynamic websites."
    },
    {
      id: 11,
      icon: "fa-brands fa-laravel",
      name: "Laravel",
      desc: "Elegant PHP framework for modern web application development."
    },
    {
      id: 12,
      icon: "fa-brands fa-python",
      name: "Python",
      desc: "Versatile programming language for everything from web to AI."
    },
    {
      id: 13,
      icon: "/skills/flask.svg",
      name: "Flask",
      desc: "Lightweight Python framework for rapid web app development."
    },
    {
      id: 14,
      icon: "/skills/mysql.svg",
      name: "MySQL",
      desc: "Reliable relational database for structured data management."
    },
    {
      id: 15,
      icon: "/skills/postgresql.svg",
      name: "PostgreSQL",
      desc: "Advanced open-source database with powerful features."
    },
    {
      id: 16,
      icon: "fa-brands fa-git",
      name: "Git",
      desc: "Version control system to track and manage code changes."
    },
    {
      id: 17,
      icon: "fa-brands fa-github",
      name: "GitHub",
      desc: "Collaboration platform for hosting and reviewing code."
    },
  ]


  // window scroll + parallax effects
  const starContainerRef = useRef(null);

  useEffect(() => {
    const sizes = [1.5, 2, 2.3, 2.8, 3];
    const starCount = 120;
    const container = starContainerRef.current;
    container.innerHTML = "";

    const starsData = [];
    const blackHoles = [];
    let latestScrollY = 0;

    // Spawn stars
    for (let i = 0; i < starCount; i++) {
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      container.appendChild(star);

      const sizeFactor = Math.pow((Math.max(...sizes) / size) / 0.2, 2);
      const speed = sizeFactor * 0.15;

      starsData.push({
        el: star,
        size,
        baseTop: parseFloat(star.style.top),
        baseLeft: parseFloat(star.style.left),
        speed,
        pullOffset: { x: 0, y: 0 },
        pulled: false
      });
    }

    // Spawn black hole function
    const spawnBlackHole = () => {
      // Kalau masih ada black hole aktif, skip
      if (blackHoles.length > 0) return;

      const blackHole = document.createElement("div");
      blackHole.classList.add("black-hole");

      const x = Math.random() * window.innerWidth;
      const y = Math.random() * document.body.scrollHeight;

      blackHole.style.left = `${x}px`;
      blackHole.style.top = `${y}px`;

      container.appendChild(blackHole);

      const bhData = {
        el: blackHole,
        baseTop: y / window.innerHeight * 100,
        baseLeft: x,
        speed: 15
      };
      blackHoles.push(bhData);

      // Tarikan bintang
      const pullRadius = 200;
      const pullDuration = 1500;

      starsData.forEach(star => {
        const starRect = star.el.getBoundingClientRect();
        const holeRect = blackHole.getBoundingClientRect();
        const dx = (holeRect.left + holeRect.width / 2) - (starRect.left + starRect.width / 2);
        const dy = (holeRect.top + holeRect.height / 2) - (starRect.top + starRect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < pullRadius && !star.pulled) {
          star.pulled = true;
          const pullStrength = 1 - distance / pullRadius;

          const startTime = performance.now();
          const animatePull = (time) => {
            const t = Math.min((time - startTime) / pullDuration, 1);
            star.pullOffset.x = dx * t * pullStrength * 2;
            star.pullOffset.y = dy * t * pullStrength * 2;
            star.el.style.opacity = `${1 - t}`;
            if (t < 1) requestAnimationFrame(animatePull);
            else {
              star.el.style.display = "none";
            }
          };
          requestAnimationFrame(animatePull);
        }
      });

      // Hilang setelah 8 detik
      setTimeout(() => {
        blackHole.remove();
        blackHoles.splice(0, 1);

        // Spawn lagi setelah delay random 7-10 detik
        setTimeout(spawnBlackHole, 7000 + Math.random() * 3000);
      }, 8000);
    };

    // Spawn pertama setelah 3 detik
    setTimeout(spawnBlackHole, 3000);

    // Scroll handler
    const handleScroll = () => {
      latestScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);

    // Animation loop
    const animate = () => {
      starsData.forEach(star => {
        if (!star.pulled) {
          star.el.style.transform = `translate(${star.pullOffset.x}px, ${-latestScrollY / star.speed + star.pullOffset.y}px)`;
        } else {
          star.el.style.transform = `translate(${star.pullOffset.x}px, ${star.pullOffset.y - latestScrollY / star.speed}px)`;
        }
      });

      blackHoles.forEach(bh => {
        bh.el.style.transform = `translateY(${-latestScrollY / bh.speed}px)`;
      });

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // shouting stars
  useEffect(() => {
    const container = starContainerRef.current;

    const createShootingStar = () => {
      const shootingStar = document.createElement("div");
      shootingStar.classList.add("shooting-star");

      const bodyHeight = document.body.scrollHeight;
      const startY = Math.random() * bodyHeight;
      const startX = Math.random() * window.innerWidth;

      const angleDeg = 15 + Math.random() * 30;
      const angleRad = angleDeg * (Math.PI / 180);

      const speed = 400 + Math.random() * 300;
      const distance = 1000;

      const endX = startX + Math.cos(angleRad) * distance;
      const endY = startY + Math.sin(angleRad) * distance;

      shootingStar.style.left = `${startX}px`;
      shootingStar.style.top = `${startY}px`;
      shootingStar.style.transform = `rotate(${angleDeg}deg)`;

      shootingStar.animate([
        { transform: `translate(0, 0) rotate(${angleDeg}deg)`, opacity: 1 },
        { transform: `translate(${endX - startX}px, ${endY - startY}px) rotate(${angleDeg}deg)`, opacity: 0 }
      ], {
        duration: (distance / speed) * 1000,
        easing: "linear"
      });

      container.appendChild(shootingStar);

      setTimeout(() => shootingStar.remove(), (distance / speed) * 1000);
    };

    const interval = setInterval(() => {
      if (Math.random() < 0.5) createShootingStar();
    }, 800);

    return () => clearInterval(interval);
  }, []);


  return (
    <>
      {/* stars */}
      <div className="stars-overlay" ref={starContainerRef}></div>

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