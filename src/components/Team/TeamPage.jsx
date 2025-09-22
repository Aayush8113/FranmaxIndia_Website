// import React, { useEffect } from 'react';
// import '../design/TeamPage.css';
// import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
// import VipulImage from '../../assets/logo/vipul.jpg';
// import PriyaImage from '../../assets/logo/priya.jpg';

// const team = [
//   {
//     name: 'Vipul Panchal',
//     role: 'Founder & CEO',
//     image: VipulImage,
//     description: 'Leading the vision of Franmax India with innovation and commitment.',
//     linkedin: 'https://www.linkedin.com/in/vipulpanchalfranmaxindia/',
//     email: 'cmd@franmaxindia.com',
//   },
//   {
//     name: 'Priya Panchal',
//     role: 'Co-Founder',
//     image: PriyaImage,
//     description: 'Transforming technology into value for franchising growth.',
//     linkedin: 'https://www.linkedin.com/in/priyanka-panchal-3a9b94232/',
//   }
// ];

// const TeamSplit = () => {

//   // Floating parallax + subtle card float
//   useEffect(() => {
//     const handleScroll = () => {
//       const rows = document.querySelectorAll('.team-split-row');
//       rows.forEach(row => {
//         const speed = parseFloat(row.getAttribute('data-speed')) || 0.25;
//         const offset = window.scrollY * speed;
//         row.style.transform = `translateY(${offset}px)`;
//       });
//     };
//     window.addEventListener('scroll', handleScroll);

//     // Generate dynamic particles
//     const particleContainer = document.querySelector('.team-bg-particles');
//     const particles = [];
//     for(let i=0; i<20; i++){
//       const particle = document.createElement('span');
//       particle.style.left = Math.random() * 100 + '%';
//       particle.style.top = Math.random() * 100 + '%';
//       particle.style.width = 4 + Math.random() * 6 + 'px';
//       particle.style.height = particle.style.width;
//       particle.style.opacity = 0.1 + Math.random() * 0.2;
//       particle.style.animationDuration = 15 + Math.random() * 15 + 's';
//       particleContainer.appendChild(particle);
//       particles.push(particle);
//     }

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       particles.forEach(p => p.remove());
//     };
//   }, []);

//   return (
//     <div className="team-split-section">
//       <div className="team-bg-particles"></div> {/* floating particles */}
//       <h2 className="team-split-heading">Our Core Team</h2>
//       {team.map((member, idx) => (
//         <div 
//           className={`team-split-row ${idx % 2 !== 0 ? 'reverse' : ''}`} 
//           key={idx}
//           data-speed={idx % 2 === 0 ? "0.25" : "0.5"}
//         >
//           <img src={member.image} alt={member.name} className="team-split-img" />
//           <div className="team-split-content">
//             <h3>{member.name}</h3>
//             <p className="role">{member.role}</p>
//             <p className="desc">{member.description}</p>
//             <div className="social">
//               <a href={member.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
//               {member.email && <a href={`mailto:${member.email}`}><FaEnvelope /></a>}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TeamSplit;













import React from "react";
import "../design/TeamPage.css";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import VipulImage from "../../assets/logo/vipul.jpg";
import PriyaImage from "../../assets/logo/priya.jpg";

const team = [
  {
    name: "Vipul Panchal",
    role: "Founder & CEO",
    image: VipulImage,
    description:
      "Leading the vision of Franmax India with innovation and commitment.",
    linkedin: "https://www.linkedin.com/in/vipulpanchalfranmaxindia/",
    email: "cmd@franmaxindia.com",
  },
  {
    name: "Priya Panchal",
    role: "Co-Founder",
    
    image: PriyaImage,
    description:
      "Empowering franchisees with strong support and strategic guidance for sustainable growth.",
    linkedin: "https://www.linkedin.com/in/priyanka-panchal-3a9b94232/",
  },
];

const TeamSplit = () => {
  return (
    <div className="team-split-section">
      <h2 className="team-split-heading">✨ Our Core Team</h2>
      {team.map((member, idx) => (
        <div
          className={`team-split-row ${idx % 2 !== 0 ? "reverse" : ""}`}
          key={idx}
        >
          <div className="team-image-wrapper">
            <img src={member.image} alt={member.name} className="team-split-img" />
          </div>
          <div className="team-split-content">
            <h3>{member.name}</h3>
            <p className="role">{member.role}</p>
            <p className="desc">{member.description}</p>
            <div className="social">
              {member.linkedin && (
                <a href={member.linkedin} target="_blank" rel="noreferrer">
                  <FaLinkedin />
                </a>
              )}
              {member.email && (
                <a href={`mailto:${member.email}`}>
                  <FaEnvelope />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamSplit;
