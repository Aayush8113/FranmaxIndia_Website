import React, { useEffect, useState } from "react";
import "./design/Testimonial.css";

const testimonials = [
  {
    id: 1,
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png",
    brand: "Franmax India",
    feedback:
      "Franmax India has provided us with the right platform to expand our franchise network. Their support has been a game-changer for our growth journey.",
  },
  {
    id: 2,
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    brand: "Urban Café",
    feedback:
      "With Franmax India, we were able to open new outlets in multiple cities within a year. The guidance and network are truly unmatched.",
  },
  {
    id: 3,
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    brand: "FitZone Gym",
    feedback:
      "Our partnership with Franmax India has helped us connect with serious investors. Today, we are running 50+ successful branches.",
  },
  {
    id: 4,
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Google_Logo.svg",
    brand: "EduSmart Academy",
    feedback:
      "Franmax India has been instrumental in scaling our education business. Their expertise helped us establish presence in 15+ states.",
  },
  {
    id: 5,
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    brand: "GreenLeaf Organics",
    feedback:
      "Thanks to Franmax India, our organic brand reached new markets faster than expected. A reliable partner for any growing business.",
  },
];

function Testimonial() {
  const [index, setIndex] = useState(0);

  // Shuffle start index (so it changes on refresh)
  useEffect(() => {
    let savedIndex = parseInt(localStorage.getItem("testimonialIndex")) || 0;
    const nextIndex = (savedIndex + 1) % testimonials.length;
    setIndex(nextIndex);
    localStorage.setItem("testimonialIndex", nextIndex);
  }, []);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const item = testimonials[index];

  return (
    <div className="testimonial-wrapper">
      {/* Logo Overlap */}
      <div className="testimonial-logo-wrapper">
        <div className="logo-circle">
          <img src={item.logo} alt={item.brand} loading="lazy" />
        </div>
      </div>

      {/* Review Card */}
      <div className="testimonial-card">
        <div className="testimonial-content">
          <div className="open-quotes">❝</div>
          <p>{item.feedback}</p>
          <div className="testimonial-brand-name">{item.brand}</div>
          <div className="close-quotes">❞</div>
        </div>

        {/* Dots indicator inside card */}
        <div className="testimonial-dots">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={i === index ? "active" : ""}
              onClick={() => setIndex(i)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
