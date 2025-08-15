import { useEffect, useRef } from "react";

export default function StarField() {
    const starContainerRef = useRef(null);

    useEffect(() => {
        const sizes = [1.5, 2, 2.3, 2.8, 3];
        const starCount = 500;
        const container = starContainerRef.current;
        container.innerHTML = "";

        const starsData = [];
        let isBlackHoleActive = false;

        // bikin bintang
        for (let i = 0; i < starCount; i++) {
            const size = sizes[Math.floor(Math.random() * sizes.length)];
            const star = document.createElement("div");
            star.classList.add("star");
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            container.appendChild(star);

            const maxSize = Math.max(...sizes);
            const sizeFactor = maxSize / size / 0.2;
            const extraSlow = Math.pow(sizeFactor, 2);
            const speed = extraSlow * 0.15;

            starsData.push({
                el: star,
                speed,
            });
        }

        // parallax scroll
        const handleScroll = () => {
            const scrollY = window.scrollY;
            starsData.forEach(({ el, speed }) => {
                el.style.transform = `translateY(${-scrollY / speed}px)`;
            });
        };
        window.addEventListener("scroll", handleScroll);

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

    return <div ref={starContainerRef} className="star-container"></div>;
}