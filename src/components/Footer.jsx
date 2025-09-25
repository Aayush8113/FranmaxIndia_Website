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
  FaUtensils,
  FaShoppingBag,
  FaStore,
  FaBuilding,
  FaHospital,
  FaCarAlt,
  FaSpa,
  FaBriefcase,
  FaGraduationCap,
  FaHome,
  FaHotel,
  FaRunning,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import InquiryForm from "./Footer/InquiryForm";
import WhatsAppIcon from "./Footer/WhatsAppIcon";
import "./design/Footer.css";
import { getApiUrl } from "../utils/api";

function Footer() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [masterCategories, setMasterCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => setShowScrollButton(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(getApiUrl("get-master-category.php"));
        const json = await res.json();
        const items = Array.isArray(json) ? json : json.data || [];
        const formatted = items.map((item) => ({
          value: item.mas_cat_id,
          label: item.mas_cat_name,
          slug: (item.mas_cat_slug || item.mas_cat_name || "")
            .toLowerCase()
            .replace(/[\s&]+/g, ""), // slugify to match icons
        }));
        setMasterCategories(formatted);
      } catch (err) {
        console.error("Error loading master categories:", err);
      } finally {
        setLoadingCategories(false);
      }
    }
    fetchCategories();
  }, []);

  // Map categories (slug) to icons
  const categoryIcons = {
    automobile: <FaCarAlt />,
    beautyhealth: <FaSpa />,
    businessservices: <FaBriefcase />,
    education: <FaGraduationCap />,
    fashion: <FaShoppingBag />,
    foodbeverage: <FaUtensils />,
    homebasedbusiness: <FaHome />,
    hoteltraveltourism: <FaHotel />,
    retail: <FaStore />,
    sportsfitness: <FaRunning />,
    healthcare: <FaHospital />,
    demo: <FaStar />,
  };

  return (
    <>
      {/* Master Categories Section */}
      <div className="premium-categories">
        <h4 className="categories-title">Master Categories</h4>
        <div className="categories-grid">
          {loadingCategories ? (
            <p>Loading categories...</p>
          ) : masterCategories.length === 0 ? (
            <p>No categories found.</p>
          ) : (
            masterCategories.map((cat) => (
              <Link
                key={cat.value}
                to={`/category?mas_cat=${cat.value}`}
                className="category-card"
              >
                <span className="category-icon">
                  {categoryIcons[cat.slug] || <FaStore />}
                </span>
                <span className="category-name">{cat.label}</span>
              </Link>
            ))
          )}
        </div>
      </div>

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
              <a
                href="https://www.instagram.com/franmax_india"
                target="_blank"
                rel="noopener noreferrer"
                className="social-instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/@franmaxindia"
                target="_blank"
                rel="noopener noreferrer"
                className="social-facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://g.co/kgs/zeVko4Q"
                target="_blank"
                rel="noopener noreferrer"
                className="social-google"
              >
                <FaGoogle />
              </a>
              <a
                href="https://www.linkedin.com/company/franmaxindia/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-linkedin"
              >
                <FaLinkedinIn />
              </a>
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
