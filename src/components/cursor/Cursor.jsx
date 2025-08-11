import React, { useEffect } from "react";
import { gsap, Power3 } from "gsap";
import './cursor.css';

const Cursor = () => {
    useEffect(() => {
        const cursor = document.getElementById("cursor");
        const amount = 20;
        const sineDots = Math.floor(amount * 0.3);
        const width = 26;
        const idleTimeout = 150;
        let lastFrame = 0;
        let mousePosition = { x: 0, y: 0 };
        let dots = [];
        let timeoutID;
        let idle = false;
        let hoverButton;

        // List elemen yang bikin cursor membesar pas hover
        // const hoverSelectors = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'button', '.card'];

        class HoverButton {
            constructor(id) {
                this.hovered = false;
                this.animatingHover = false;
                this.forceOut = false;
                this.timing = 0.65;
                this.el = document.getElementById(id);
                if (!this.el) return;
                this.bg = this.el.getElementsByClassName("bg")[0];
                this.el.addEventListener("mouseenter", this.onMouseEnter);
                this.el.addEventListener("mouseleave", this.onMouseLeave);
            }

            onMouseEnter = () => {
                this.hoverInAnim();
            };

            hoverInAnim = () => {
                if (!this.hovered) {
                    this.hovered = true;
                    this.animatingHover = true;
                    this.forceOut = false;
                    gsap.fromTo(
                        this.bg,
                        { x: "-112%" },
                        {
                            duration: this.timing,
                            x: "-12%",
                            ease: Power3.easeOut,
                            onComplete: () => {
                                this.animatingHover = false;
                                if (this.forceOut) {
                                    this.forceOut = false;
                                    this.hoverOutAnim();
                                }
                            },
                        }
                    );
                }
            };

            onMouseLeave = () => {
                if (!this.animatingHover) {
                    this.hoverOutAnim();
                } else {
                    this.forceOut = true;
                }
            };

            hoverOutAnim = () => {
                this.hovered = false;
                gsap.to(this.bg, {
                    duration: this.timing,
                    x: "100%",
                    ease: Power3.easeOut,
                });
            };
        }

        class Dot {
            constructor(index = 0) {
                this.index = index;
                this.anglespeed = 0.05;
                this.x = 0;
                this.y = 0;
                this.scale = 1 - 0.05 * index;
                this.range = width / 2 - (width / 2) * this.scale + 2;
                this.limit = width * 0.75 * this.scale;
                this.element = document.createElement("span");
                gsap.set(this.element, { scale: this.scale });
                cursor.appendChild(this.element);
            }

            lock() {
                this.lockX = this.x;
                this.lockY = this.y;
                this.angleX = Math.PI * 2 * Math.random();
                this.angleY = Math.PI * 2 * Math.random();
            }

            draw(delta) {
                if (!idle || this.index <= sineDots) {
                    gsap.set(this.element, { x: this.x, y: this.y });
                } else {
                    this.angleX += this.anglespeed;
                    this.angleY += this.anglespeed;
                    this.y = this.lockY + Math.sin(this.angleY) * this.range;
                    this.x = this.lockX + Math.sin(this.angleX) * this.range;
                    gsap.set(this.element, { x: this.x, y: this.y });
                }
            }
        }

        class Circle {
            constructor(id) {
                const el = document.getElementById(id);
                if (!el) return;
                const parent = el.parentElement;
                parent.removeChild(el);
                const chars = el.innerText.split("");
                chars.push(" ");
                for (let i = 0; i < chars.length; i++) {
                    const span = document.createElement("span");
                    span.innerText = chars[i];
                    span.className = `char${i + 1}`;
                    parent.appendChild(span);
                }
            }
        }

        function init() {
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("touchmove", onTouchMove);
            window.addEventListener("mouseover", onHover);
            window.addEventListener("mouseout", onHoverOut);
            hoverButton = new HoverButton("button");
            new Circle("circle-content");
            lastFrame += new Date();
            buildDots();
            render();
        }

        function startIdleTimer() {
            timeoutID = setTimeout(goInactive, idleTimeout);
            idle = false;
        }

        function resetIdleTimer() {
            clearTimeout(timeoutID);
            startIdleTimer();
        }

        function goInactive() {
            idle = true;
            for (let dot of dots) {
                dot.lock();
            }
        }

        function buildDots() {
            for (let i = 0; i < amount; i++) {
                let dot = new Dot(i);
                dots.push(dot);
            }
        }

        const onMouseMove = (event) => {
            mousePosition.x = event.clientX - width / 2;
            mousePosition.y = event.clientY - width / 2;
            resetIdleTimer();
        };

        const onTouchMove = (event) => {
            mousePosition.x = event.touches[0].clientX - width / 2;
            mousePosition.y = event.touches[0].clientY - width / 2;
            resetIdleTimer();
        };

        // Logic hover: cek target, kalo matches selector, scale up cursor
        const onHover = (e) => {
            for (const selector of hoverSelectors) {
                if (
                    selector.startsWith(".") &&
                    e.target.classList.contains(selector.substring(1))
                ) {
                    scaleCursorUp();
                    return;
                }
                if (e.target.tagName.toLowerCase() === selector.toLowerCase()) {
                    scaleCursorUp();
                    return;
                }
            }
        };

        const onHoverOut = (e) => {
            // Kalau hover hilang, kecilin lagi
            scaleCursorDown();
        };

        // Scale cursor up
        const scaleCursorUp = () => {
            gsap.to(cursor, {
                duration: 0.3,
                scale: 1.8,
                ease: Power3.easeOut,
            });
        };

        // Scale cursor down
        const scaleCursorDown = () => {
            gsap.to(cursor, {
                duration: 0.3,
                scale: 1,
                ease: Power3.easeOut,
            });
        };

        const render = (timestamp) => {
            const delta = timestamp - lastFrame;
            positionCursor(delta);
            lastFrame = timestamp;
            requestAnimationFrame(render);
        };

        const positionCursor = (delta) => {
            let x = mousePosition.x;
            let y = mousePosition.y;
            dots.forEach((dot, index, dots) => {
                let nextDot = dots[index + 1] || dots[0];
                dot.x = x;
                dot.y = y;
                dot.draw(delta);
                if (!idle || index <= sineDots) {
                    const dx = (nextDot.x - dot.x) * 0.35;
                    const dy = (nextDot.y - dot.y) * 0.35;
                    x += dx;
                    y += dy;
                }
            });
        };

        init();

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("mouseover", onHover);
            window.removeEventListener("mouseout", onHoverOut);
            dots = [];
            cursor.innerHTML = "";
        };
    }, []);

    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" style={{ display: 'none' }}>
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15"
                            result="goo"
                        />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>
            <div id="cursor" className="Cursor"></div>
        </>
    );
};

export default Cursor;