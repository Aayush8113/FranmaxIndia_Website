// File: src/components/FranchiseListing.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './design/FranchiseListing.css';
import InquiryForm from './EnquiryForm';
import './design/ListingInquiry.css';
import { getImageUrl, getApiUrl } from '../utils/api';

// Utility: Convert number into Indian "lacs/crores" format
function formatIndianCurrency(number) {
  if (!number || isNaN(number)) return "—";

  if (number >= 10000000) {
    const crores = number / 10000000;
    return `${parseFloat(crores.toFixed(1)).toString().replace(/\.0$/, '')} cr`;
  } else {
    const lacs = number / 100000;
    return `${parseFloat(lacs.toFixed(0))} lacs`;
  }
}

const FranchiseListing = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = getApiUrl(`get-brands-by-category.php?category_id=${categoryId}`);

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error('Network response was not ok');

        const data = await res.json();
        if (data.success && Array.isArray(data.brands)) {
          setBrands(data.brands);
          setError(null);
        } else {
          setBrands([]);
          setError(data.message || 'No brands found for this category.');
        }
      } catch (err) {
        console.error("Error fetching brands:", err);
        setError("Failed to fetch brands. Please try again.");
        setBrands([]);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) fetchBrands();
  }, [categoryId, apiUrl]);

  const handleKnowMore = (register_id) => {
    navigate(`/brand/${register_id}`);
  };

  // Long-press logic
  const holdTimeout = useRef(null);
  const holdDuration = 1000; // ms to trigger hold (1s)

  const handleHoldStart = (register_id) => {
    holdTimeout.current = setTimeout(() => {
      handleKnowMore(register_id);
    }, holdDuration);
  };

  const handleHoldEnd = () => {
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
      holdTimeout.current = null;
    }
  };

  if (loading) return <div className="loading-message">Loading brands...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (brands.length === 0) return <div className="no-brands-message">No franchises found in this category.</div>;

  return (
    <div className="franchise-listing-container">
      <div className="franchise-listing-main">
        <div className="franchise-listing-header">
          <h2 className="syb-heading">All Franchises in Category</h2>
        </div>

        <div className="franchise-grid">
          {brands.map((brand, i) => (
            <div
              className="franchise-card"
              key={brand.id || i}
              // Long press handlers
              onMouseDown={() => handleHoldStart(brand.register_id)}
              onMouseUp={handleHoldEnd}
              onMouseLeave={handleHoldEnd}
              onTouchStart={() => handleHoldStart(brand.register_id)}
              onTouchEnd={handleHoldEnd}
            >
              <div className="franchise-img-wrap">
                <img
                  src={getImageUrl(brand.logo) || 'https://via.placeholder.com/200'}
                  alt={brand.name || 'Brand'}
                />
              </div>
              <div className="franchise-content">
                <h3>{brand.name || 'Unknown Brand'}</h3>
                <div className="franchise-detail">
                  <div className="biz-field">
                    <span className="label">Sector:</span>
                    <span className="value">{brand.sector || '—'}</span>
                  </div>
                  <div className="biz-field">
                    <span className="label">Investment:</span>
                    <span className="value">
                      ₹{formatIndianCurrency(brand.min_investment)} - {formatIndianCurrency(brand.max_investment)}
                    </span>
                  </div>
                  <div className="biz-field">
                    <span className="label">Area:</span>
                    <span className="value">{brand.min_area || 0} - {brand.max_area || 0} sq.ft</span>
                  </div>
                  <div className="biz-field">
                    <span className="label">Outlets:</span>
                    <span className="value">{brand.total_outlets || 0}</span>
                  </div>
                </div>

                {/* Click button for normal navigation */}
                <button
                  className="franchise-btn"
                  onClick={() => handleKnowMore(brand.register_id)}
                >
                  Know More (Hold)
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="franchise-listing-sidebar">
        <InquiryForm />
      </div>
    </div>
  );
};

export default FranchiseListing;
