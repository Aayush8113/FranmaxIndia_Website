import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaGoogle,
  FaYoutube,
  FaArrowUp,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import InquiryForm from "./Footer/InquiryForm";
import WhatsAppIcon from "./Footer/WhatsAppIcon";
import "./design/Footer.css";

function Footer() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Disclaimer Section */}
      <div className="premium-disclaimer">
        <div className="disclaimer-card">
          <h4>Disclaimer</h4>
          <p>
            The content on Franmax India is for general informational purposes
            only. We do not provide professional advice. Before making financial
            or business decisions, please consult a certified expert.
          </p>
          <p>
            <strong>Use of this website</strong> is at your own risk. All brand
            names, trademarks, and logos belong to their respective owners. Data
            shown here may be collected from public sources and might not always
            reflect the latest updates.
          </p>
          <p>
            Franmax India does not claim ownership of third-party listings. Use
            your discretion before engaging with businesses. If you believe any
            content needs correction, contact us at{" "}
            <a href="mailto:info@franmaxindia.com" className="highlight-text">
              info@franmaxindia.com
            </a>
            .
          </p>
          <p>
            Please also read our{" "}
            <Link to="/terms-of-use" className="highlight-text">
              Terms of Use
            </Link>{" "}
            for complete details.
          </p>
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="premium-inquiry">
        <InquiryForm />
      </div>

      {/* Footer Section */}
      <footer className="premium-footer">
        <div className="footer-container">
          {/* About Card */}
          <div className="footer-card">
            <h4>About Us</h4>
            <p>
              &copy; 2020–{new Date().getFullYear()} Franmax India (P) Ltd. All
              rights reserved.
            </p>
            <p>
              <FaEnvelope className="footer-icon" />{" "}
              <a
                href="mailto:info@franmaxindia.com"
                className="footer-link highlight-text"
              >
                info@franmaxindia.com
              </a>
            </p>
          </div>

          {/* Contact Card */}
          <div className="footer-card contact-card">
            <h4>Contact Us</h4>
            <p>
              <FaPhoneAlt className="footer-icon" />{" "}
              <a href="tel:+919403890794" className="footer-link">
                +91 94038 90794
              </a>
            </p>
            <div className="footer-address">
              <FaMapMarkerAlt className="location-icon" />
              <a
                href="https://goo.gl/maps/NHZdQo4QnKHzTgix8"
                target="_blank"
                rel="noopener noreferrer"
                className="address-text"
              >
                A-402, Titanium City Center, <br />
                100 Feet Anand Nagar Road, <br />
                Ahmedabad, Gujarat – 380015
              </a>
            </div>
          </div>

          {/* Social Media Card */}
          <div className="footer-card">
            <h4>Follow Us</h4>
            <div className="social-icons">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/franmax_india"
                target="_blank"
                rel="noopener noreferrer"
                className="social-instagram"
              >
                <FaInstagram />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/@franmaxindia"
                target="_blank"
                rel="noopener noreferrer"
                className="social-facebook"
              >
                <FaFacebookF />
              </a>

              {/* Google (Multicolor G SVG) */}
              <a
                href="https://g.co/kgs/zeVko4Q"
                target="_blank"
                rel="noopener noreferrer"
                className="social-google"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#4285F4"
                    d="M23.99 12.74c1.66 0 3.17.57 4.35 1.68l3.24-3.24C29.23 9.04 26.77 8 23.99 8 14.57 8 7.15 14.55 7.15 24s7.42 16 16.84 16c8.12 0 15-5.7 15-15.33 0-1.03-.11-1.8-.27-2.59H23.99v5.66h9.84c-.43 2.37-2.69 6.95-9.84 6.95-5.96 0-10.84-4.88-10.84-10.84s4.88-10.84 10.84-10.84z"
                  />
                  <path
                    fill="#34A853"
                    d="M6.9 14.6l5.7 4.17C13.2 16.8 18.2 12 24 12c3.23 0 6.1 1.1 8.35 2.9l3.24-3.24C32.97 8.57 28.18 7 23.99 7 17.83 7 12.18 10.58 9.17 15.87l-2.27-1.27z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M24 44c5.36 0 9.87-1.77 13.2-4.8l-6.14-5.03C28.78 36.1 26.1 37 23.99 37c-6.99 0-12.85-4.79-14.96-11.27l-5.7 4.17C9.17 39.33 15.88 44 24 44z"
                  />
                  <path
                    fill="#EA4335"
                    d="M42.84 24c0-1.35-.11-2.55-.27-3.67H23.99v7.05h11.75c-.5 2.3-2.13 5.36-5.65 7.01l6.14 5.03C40.35 34.85 42.84 29.95 42.84 24z"
                  />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/franmaxindia/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-linkedin"
              >
                <FaLinkedinIn />
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@Franmaxindia"
                target="_blank"
                rel="noopener noreferrer"
                className="social-youtube"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-quick-links-row">
          <Link to="/about" className="footer-link">
            About Us
          </Link>
          <Link to="/terms-of-use" className="footer-link">
            Terms of Use
          </Link>
          <Link to="/cookies-policy" className="footer-link">
            Cookies & Policy
          </Link>
          <Link to="/privacy-policy" className="footer-link">
            Privacy & Policy
          </Link>
          <Link to="/payment-terms" className="footer-link">
            Payment Terms
          </Link>
          <Link to="/our-team" className="footer-link">
            Team
          </Link>
          <Link to="/contact-us" className="footer-link">
            Contact
          </Link>
        </div>

        {/* WhatsApp Floating Icon */}
        <WhatsAppIcon />
      </footer>

      {/* Scroll-to-Top Button */}
      {showScrollButton && (
        <button onClick={scrollToTop} className="back-to-top-btn">
          <FaArrowUp /> Top
        </button>
      )}
    </>
  );
}

export default Footer;