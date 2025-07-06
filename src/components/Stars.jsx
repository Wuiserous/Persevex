"use client";
import { useEffect, useRef } from "react";

export default function Stars() {
  const canvasRef = useRef(null);
  const shootingStars = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let stars = [];
    const numStars = 150;
    let intervalId;

    function initStars() {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          alpha: Math.random(),
          dx: (Math.random() - 0.5) * 0.05,
          dy: (Math.random() - 0.5) * 0.05,
        });
      }
    }

    function randomAngleAvoidingVertical() {
      const ranges = [
        [(5 * Math.PI) / 6, (17 * Math.PI) / 12],     // 150° to 255°
        [(19 * Math.PI) / 12, (5 * Math.PI) / 3]      // 285° to 300°
      ];

      const chosenRange = ranges[Math.floor(Math.random() * ranges.length)];
      const angle = chosenRange[0] + Math.random() * (chosenRange[1] - chosenRange[0]);
      return angle;
    }

    function addShootingStar(x, y) {
      const angle = randomAngleAvoidingVertical();
      const speed = 4 + Math.random() * 4;
      const length = 50 + Math.random() * 50;

      shootingStars.current.push({
        x,
        y,
        dx: Math.cos(angle),
        dy: Math.sin(angle),
        speed,
        length,
        alpha: 1,
      });
    }

    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background stars
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 150, 255, ${star.alpha})`;
        ctx.fill();
        star.x += star.dx;
        star.y += star.dy;

        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        star.alpha += (Math.random() - 0.5) * 0.05;
        if (star.alpha < 0.1) star.alpha = 0.1;
        if (star.alpha > 1) star.alpha = 1;
      });

      // Draw shooting stars
      shootingStars.current.forEach((shootingStar, index) => {
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(
          shootingStar.x - shootingStar.length * shootingStar.dx,
          shootingStar.y - shootingStar.length * shootingStar.dy
        );
        ctx.strokeStyle = `rgba(0, 150, 255, ${shootingStar.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        shootingStar.x += shootingStar.dx * shootingStar.speed;
        shootingStar.y += shootingStar.dy * shootingStar.speed;
        shootingStar.alpha -= 0.02;

        if (
          shootingStar.alpha <= 0 ||
          shootingStar.x < 0 ||
          shootingStar.x > canvas.width ||
          shootingStar.y < 0 ||
          shootingStar.y > canvas.height
        ) {
          shootingStars.current.splice(index, 1);
        }
      });

      requestAnimationFrame(drawStars);
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
    drawStars();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    });

    canvas.addEventListener("click", (e) => {
      addShootingStar(e.clientX, e.clientY);
    });

    // Create occasional random shooting stars every few seconds
    intervalId = setInterval(() => {
      // e.g. ~20% chance every 2 seconds
      if (Math.random() < 0.5) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        addShootingStar(x, y);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-auto z-0"
    />
  );
}
