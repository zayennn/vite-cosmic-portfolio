import { useEffect, useRef } from "react";

export default function StarField() {
    const starContainerRef = useRef(null);

    useEffect(() => {
        const starCount = 500;
        const starLevels = [
            { size: 3, speed: 0.1, brightness: 180 },
            { size: 2, speed: 0.3, brightness: 150 },
            { size: 1, speed: 0.5, brightness: 100 },
            { size: 0.7, speed: 0.8, brightness: 70 },
        ];

        const container = starContainerRef.current;

        function getDocumentHeight() {
            return Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight
            );
        }

        function updateStarsWrapperHeight() {
            const documentHeight = getDocumentHeight();
            container.style.height = `${documentHeight}px`;
        }

        updateStarsWrapperHeight();
        window.addEventListener("resize", updateStarsWrapperHeight);

        container.innerHTML = "";

        // simpan data bintang buat parallax
        const starsData = [];

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement("div");
            star.classList.add("star");

            const level = starLevels[Math.floor(Math.random() * starLevels.length)];
            star.style.width = `${level.size}px`;
            star.style.height = `${level.size}px`;
            star.style.backgroundColor = `rgb(${level.brightness}, ${level.brightness}, ${level.brightness})`;
            star.style.left = `${Math.random() * window.innerWidth}px`;
            star.style.top = `${Math.random() * getDocumentHeight()}px`;

            container.appendChild(star);
            starsData.push({ el: star, speed: level.speed });
        }

        const handleScroll = () => {
            const scrollY = window.scrollY;
            starsData.forEach(({ el, speed }) => {
                el.style.transform = `translateY(${scrollY * speed}px)`;
            });
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("resize", updateStarsWrapperHeight);
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

    return <div ref={starContainerRef} className="stars-overlay"></div>;
}