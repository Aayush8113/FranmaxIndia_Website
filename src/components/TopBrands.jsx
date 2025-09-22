import React, { useEffect, useState, useRef } from "react";
import "./design/TopBrands.css";
import { getImageUrl, getApiUrl } from "../utils/api";
import { useNavigate } from "react-router-dom";

const TopBrands = ({
  apiUrl = getApiUrl("get-premium-brands.php"),
  sectionTitle = "Top Franchising Opportunities",
  viewAllLink = "/franchises",
}) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const cardGridRef = useRef(null);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  // Currency formatter
  const formatIndianCurrency = (number) => {
    if (!number || isNaN(number)) return "—";
    if (number >= 10000000) return `${(number / 10000000).toFixed(1)} cr`;
    if (number >= 100000) return `${Math.round(number / 100000)} lacs`;
    return number.toLocaleString("en-IN");
  };

  // Fetch brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const res = await fetch(apiUrl);
        const data = await res.json();
        if (data.success && Array.isArray(data.brands)) {
          const unique = data.brands.filter(
            (b, i, arr) => arr.findIndex((x) => x.id === b.id) === i
          );
          setBrands(unique);
        } else setBrands([]);
      } catch (err) {
        console.error(err);
        setBrands([]);
      } finally {
        setLoading(false);
      }
    };
    if (apiUrl) fetchBrands();
    return () => clearInterval(intervalRef.current);
  }, [apiUrl]);

  const handleKnowMore = (id) => navigate(`/brand/${id}`);

  // Infinite auto-scroll
  useEffect(() => {
    if (!cardGridRef.current || brands.length === 0 || loading) return;
    const grid = cardGridRef.current;
    const cards = grid.querySelectorAll(".syb-card");
    if (!cards.length) return;
    const cardWidth = cards[0].offsetWidth + 15;

    // Duplicate first and last for infinite loop
    const totalCards = brands.length;

    // Start at first real card
    grid.scrollLeft = cardWidth;

    const handleScroll = () => {
      if (grid.scrollLeft <= 0) {
        grid.scrollLeft = totalCards * cardWidth;
      } else if (grid.scrollLeft >= cardWidth * (totalCards + 1)) {
        grid.scrollLeft = cardWidth;
      }
    };

    grid.addEventListener("scroll", handleScroll);

    intervalRef.current = setInterval(() => {
      grid.scrollBy({ left: cardWidth, behavior: "smooth" });
    }, 4000);

    return () => {
      clearInterval(intervalRef.current);
      grid.removeEventListener("scroll", handleScroll);
    };
  }, [brands, loading]);

  // Render single card
  const renderCard = (brand, i) => (
    <div
      className="syb-card"
      key={`${brand.id}-${i}`}
      onClick={() => handleKnowMore(brand.id)}
      style={{ cursor: "pointer" }}
    >
      <div className="syb-img-wrap">
        <img src={getImageUrl(brand.logo)} alt={brand.name} />
      </div>
      <div className="syb-content">
        <h3>{brand.name}</h3>
        <div className="syb-detail">
          <div className="biz-field">
            <span className="label">Sector:</span>
            <span className="value">{brand.sector || "—"}</span>
          </div>
          <div className="biz-field">
            <span className="label">Investment:</span>
            <span className="value">
              ₹{formatIndianCurrency(brand.min_investment)} –{" "}
              {formatIndianCurrency(brand.max_investment)}
            </span>
          </div>
          <div className="biz-field">
            <span className="label">Area:</span>
            <span className="value">
              {brand.min_area} – {brand.max_area} sq.ft
            </span>
          </div>
          <div className="biz-field">
            <span className="label">Outlets:</span>
            <span className="value">{brand.total_outlets}</span>
          </div>
        </div>
        <button
          className="syb-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleKnowMore(brand.id);
          }}
        >
          Know More
        </button>
      </div>
    </div>
  );

  // Render infinite cards: clone last at start and first at end
  const renderBrands = () => {
    if (!brands.length) return null;
    const first = brands[0];
    const last = brands[brands.length - 1];
    const looped = [last, ...brands, first];
    return looped.map((brand, i) => renderCard(brand, i));
  };

  return (
    <div className="syb-wrapper">
      <div className="syb-heading-row">
        {brands.length >= 1 && <h2 className="syb-heading">{sectionTitle}</h2>}
        {brands.length >= 1 && (
          <a href={viewAllLink} className="syb-view-all">
            View All
          </a>
        )}
      </div>

      {loading ? (
        <div className="syb-loading">Loading opportunities...</div>
      ) : (
        <div className="syb-carousel-container">
          <div className="syb-grid" ref={cardGridRef}>
            {renderBrands()}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBrands;
