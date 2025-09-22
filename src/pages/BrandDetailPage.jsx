import React, { useState, useEffect } from "react";
import "./BrandDetailPage.css";
import "leaflet/dist/leaflet.css";
// import L from "leaflet";
import ConnectMeModal from "./ConnectMePage.jsx";
import { getApiUrl, getImageUrl } from "../utils/api.js";
import { useParams } from 'react-router-dom';

function formatIndianCurrency(number) {
  if (!number || isNaN(number)) return "—";

  if (number >= 10000000) {
    // 1 crore = 1,00,00,000
    const crores = number / 10000000;
    // Remove trailing .0 (e.g. show 1 cr instead of 1.0 cr)
    return `${parseFloat(crores.toFixed(1)).toString().replace(/\.0$/, '')} cr`;
  } else {
    const lacs = number / 100000;
    return `${parseFloat(lacs.toFixed(0))} lacs`;
  }
}
// Base URL for images
const IMAGE_BASE_URL = getImageUrl("");

const BrandDetailPage = () => {
  const { id } = useParams();
  const [brandData, setBrandData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [mainImage, setMainImage] = useState(null);

  // Fetch brand data from your API
  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        if (!id) {
          setLoading(false);
          return;
        }

        const response = await fetch(
          getApiUrl(`get_brand_details.php?product_id=${id}`)
        );
        const apiResponse = await response.json();

        if (apiResponse.success && apiResponse.brands?.length > 0) {
          setBrandData(apiResponse.brands[0]);
        } else {
          setBrandData(null);
        }
      } catch (err) {
        console.error("Failed to fetch brand data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBrandData();
  }, [id]);

  // Set the initial main image once data is loaded
  useEffect(() => {
    if (brandData) {
      const primaryImage = brandData.images?.find(
        (img) => img.photo_type === "primaryImage"
      );
      const firstAvailableImage = primaryImage || brandData.images?.[0];

      if (firstAvailableImage) {
        setMainImage(`${IMAGE_BASE_URL}${firstAvailableImage.photo_url}`);
      }
    }
  }, [brandData]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showConnectModal ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [showConnectModal]);

  // Gallery images for the thumbnails
  const imageGallery =
    brandData?.images?.filter((img) =>
      ["primaryImage", "listingImage", "detailImage1", "detailImage2", "logo"].includes(img.photo_type)
    ) || [];

  // Loading / Error / No Data states
  if (loading)
    return <div className="loading-state">Loading brand details...</div>;
  if (error) return <div className="error-state">Error: {error}</div>;
  if (!brandData)
    return <div className="no-data-state">No brand data found.</div>;

  // Similar Brands (from API or mock)
  // const similarBrands = brandData.similar_brands || [
  //   {
  //     name: "Brand A",
  //     img: "https://placehold.co/150x150/ff6666/ffffff",
  //     desc: "Similar brand description.",
  //   },
  //   {
  //     name: "Brand B",
  //     img: "https://placehold.co/150x150/66cc66/ffffff",
  //     desc: "Similar brand description.",
  //   },
  //   {
  //     name: "Brand C",
  //     img: "https://placehold.co/150x150/6699ff/ffffff",
  //     desc: "Similar brand description.",
  //   },
  // ];

  // ------------------------------------------
  // Data Transformation for Expansion Map
  // ------------------------------------------
  const transformedExpansions = brandData.expansions && brandData.expansions.length > 0
    ? brandData.expansions[0].state_names.map(stateName => ({
      state: stateName,
      cities: brandData.expansions[0].city_names,
    }))
    : [];


  return (
    <div className="brand-detail-page">
      {/* Connect Me Button */}
      <button
        className="detail-page-connect-btn"
        onClick={() => setShowConnectModal(true)}
      >
        Get Call From {brandData.name}
      </button>

      {/* Main Section */}
      <section className="main-section">
        {/* Left: Image Gallery */}
        <div className="image-gallery-container">
          <div className="main-image">
            <img src={mainImage} alt="Brand Main" />
          </div>
          <div className="thumbnail-gallery">
            {imageGallery.map((img, index) => (
              <img
                key={index}
                src={`${IMAGE_BASE_URL}${img.photo_url}`}
                alt={`Thumbnail ${index}`}
                className={
                  mainImage === `${IMAGE_BASE_URL}${img.photo_url}` ? "active" : ""
                }
                onClick={() => setMainImage(`${IMAGE_BASE_URL}${img.photo_url}`)}
              />
            ))}
          </div>
        </div>

        {/* Right: Brand Details */}
        <div className="main-details">
          <h1 className="brand-title">{brandData.name}</h1>
          <p className="short-desc">
            {brandData.sector}, {brandData.category_name?.trim()},{" "}
            {brandData.subcategory_name?.trim()}
          </p>

          <div className="key-stats">
            <div className="stat-card">
              <span className="stat-label">📐 Area</span>
              <p>
                {brandData.min_area}–{brandData.max_area} sq.ft
              </p>
            </div>
            <div className="stat-card">
              <span className="stat-label">💰 Investment</span>
              <p>
                ₹{formatIndianCurrency(brandData.min_investment)} –{" "}
                {formatIndianCurrency(brandData.max_investment)}
              </p>
            </div>
            <div className="stat-card">
              <span className="stat-label">🏬 Outlets</span>
              <p>{brandData.total_outlets}</p>
            </div>
          </div>
        </div>
      </section>


      {/* Category Section */}
      <section className="category-section">
        <div className="category-card">
          <span className="category-icon">🏢</span>
          <h2>Sector</h2>
          <p>{brandData.sector || "N/A"}</p>
        </div>
        <div className="category-card">
          <span className="category-icon">📂</span>
          <h2>Category</h2>
          <p>{brandData.category_name?.trim() || "N/A"}</p>
        </div>
        <div className="category-card">
          <span className="category-icon">🔖</span>
          <h2>Sub-category</h2>
          <p>{brandData.subcategory_name?.trim() || "N/A"}</p>
        </div>
      </section>


      {/* Brand Details */}
      <section className="brand-details">
        {/* ===== About Section ===== */}
        <section className="about-section">
          <h2>About {brandData.company_name || brandData.name}</h2>

          <p className="about-description">
            {brandData.description ||
              "We are a growing brand committed to delivering quality and support to our franchise partners."}
          </p>

          <p className="about-intro">
            Established in <span>{brandData.commenced_operations || "recent years"}</span>,
            with <span>{brandData.total_outlets || "multiple"}</span> outlets across India.
          </p>

          <div className="about-grid">
            <div className="about-card">
              <h3 className="about-card-title">Business Information</h3>
              <ul className="about-card-list">
                <li>
                  <span className="label">🏢 Head Office:</span>
                  <span className="value">{brandData.address || "Information not available"}</span>
                </li>
                <li>
                  <span className="label">🏪 Franchise-owned outlets:</span>
                  <span className="value">{brandData.franchise_owned_outlets || "N/A"}</span>
                </li>
                <li>
                  <span className="label">🏬 Company-owned outlets:</span>
                  <span className="value">{brandData.company_owned_outlets || "N/A"}</span>
                </li>
                <li>
                  <span className="label">📄 Agreement Tenure:</span>
                  <span className="value">{brandData.franchise_years || "N/A"} years</span>
                </li>
                <li>
                  <span className="label">🔄 Term renewable:</span>
                  <span className="value">
                    {brandData.is_term_renewable === "Yes" ? "Yes" : "No"}
                  </span>
                </li>
              </ul>
            </div>


            <div className="about-card">
              <h3 className="about-card-title">Support & Resources</h3>
              <ul className="about-card-list">
                <li>
                  <span className="label">🎓 Training provided:</span>
                  <span className="value">
                    {brandData.training_provided === "Yes" ? "Available" : "Not Available"}
                  </span>
                </li>
                <li>
                  <span className="label">📢 Marketing materials:</span>
                  <span className="value">
                    {brandData.marketing_materials_available === "Yes" ? "Provided" : "Not Provided"}
                  </span>
                </li>
                <li>
                  <span className="label">👨‍💼 Field assistance:</span>
                  <span className="value">
                    {brandData.field_assistance_available === "Yes" ? "Available" : "Not Available"}
                  </span>
                </li>
                <li>
                  <span className="label">🏢 Head office assistance:</span>
                  <span className="value">
                    {brandData.head_office_assistance === "Yes" ? "Available" : "Not Available"}
                  </span>
                </li>
                <li>
                  <span className="label">📘 Operating manuals:</span>
                  <span className="value">
                    {brandData.has_operating_manuals === "Yes" ? "Available" : "Not Available"}
                  </span>
                </li>
                <li>
                  <span className="label">💻 IT systems included:</span>
                  <span className="value">
                    {brandData.it_systems_included === "Yes" ? "Included" : "Not Included"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ===== Unit Details Section ===== */}
        <section className="unit-details-section">
          <div className="unit-details">
            <h3 className="section-title">Franchise Details</h3>

            {/* Single Unit */}
            {brandData.single_unit_details && (
              <div className="unit-card single-unit">
                <h4 className="unit-title">🏢 Single Unit</h4>
                <div className="unit-info">
                  <div><span>📐 Area Required</span><p>{brandData.single_unit_details.area_req}</p></div>
                  <div><span>💰 Investment</span><p>₹{formatIndianCurrency(brandData.min_investment)} - {formatIndianCurrency(brandData.max_investment)}</p></div>
                  <div><span>📈 ROI</span><p className="badge success">{brandData.single_unit_details.roi}%</p></div>
                  <div><span>⏳ Payback</span><p className="badge info">{brandData.single_unit_details.payback} years</p></div>
                </div>
              </div>
            )}

            {/* Master Unit Details */}
            {brandData.master_unit_details && brandData.master_unit_details.length > 0 && (
              <div className="master-unit-section">
                <h3 className="sub-section-title">Master Unit Details</h3>

                <div className="master-unit-cards">
                  {brandData.master_unit_details.map((unit) => (
                    <div className="unit-card" key={unit.id}>
                      <h4 className="unit-title">
                        {unit.type === "city_wise" && "🌆 City-wise Unit"}
                        {unit.type === "state_wise" && "🏙️ State-wise Unit"}
                        {unit.type === "country_wise" && "🌍 Country-wise Unit"}
                      </h4>
                      <div className="unit-info">
                        <div><span>📐 Area Required</span><p>{unit.area_req}</p></div>
                        <div><span>💰 Investment</span><p>₹{unit.investment}</p></div>
                        <div><span>📈 ROI</span><p className="badge success">{unit.roi}%</p></div>
                        <div><span>⏳ Payback</span><p className="badge info">{unit.payback} years</p></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!brandData.single_unit_details && !brandData.master_unit_details && (
              <p className="no-data">⚠️ Unit details not provided.</p>
            )}
          </div>
        </section>


      </section>

      {/* ===== Expansion Map ===== */}
      {/* ===== Expansion Map ===== */}
      <section className="expansion-map">
        <h2 className="title">🌍 Expansion Map</h2>
        <p className="subtitle">Our outlets are expanding across these states and cities:</p>

        {transformedExpansions && transformedExpansions.length > 0 ? (
          <div className="states-list">
            {transformedExpansions.map((item, index) => (
              <div key={index} className="state-card">
                <div className="state-header">
                  <span className="state-icon">📍</span>
                  <h3 className="state-name">{item.state || "Unnamed State"}</h3>
                </div>

                {item.cities && item.cities.length > 0 ? (
                  <div className="city-list">
                    {item.cities.map((city, idx) => (
                      <span key={idx} className="city-chip">{city}</span>
                    ))}
                  </div>
                ) : (
                  <p className="no-city">No cities listed</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="no-data-message">
            <p>No expansion map data available for this brand.</p>
          </div>
        )}
      </section>

      {/* --- */}
      {/* Features Section */}
      <section className="features-section">
        {/* Outlet View */}
        <div className="feature-row image-right">
          <div className="feature-image">
            <img
              src={
                brandData.images?.find((img) => img.photo_type === "detailImage1")
                  ? `${IMAGE_BASE_URL}${brandData.images.find(
                    (img) => img.photo_type === "detailImage1"
                  ).photo_url}`
                  : ""
              }
              alt="Outlet View"
            />
          </div>
          <div className="feature-desc">
            <h3>🏬 Outlet View</h3>
            <p>
              Experience the full potential of your franchise outlet with a detailed
              visual overview. Each location reflects the brand’s identity and
              operational excellence.
            </p>
          </div>
        </div>

        {/* Signature Products Showcase */}
        <div className="feature-row image-left">
          <div className="feature-image">
            <img
              src={
                brandData.images?.find((img) => img.photo_type === "detailImage2")
                  ? `${IMAGE_BASE_URL}${brandData.images.find(
                    (img) => img.photo_type === "detailImage2"
                  ).photo_url}`
                  : ""
              }
              alt="Signature Products"
            />
          </div>
          <div className="feature-desc">
            <h3>⭐ Signature Products Showcase</h3>
            <p>
              Highlight the best-selling products that drive customer demand and brand
              loyalty. Discover what keeps your franchise outlets thriving and unique.
            </p>
          </div>
        </div>
      </section>

      {/* --- */}
      {/* Why Choose */}
      <section className="why-choose">
        <h2 className="why-title">✨ Why Choose {brandData.name}?</h2>
        <ul className="why-list">
          <li>
            <span className="why-icon">📊</span>
            Proven business model with a payback period of{" "}
            <strong>{brandData.single_unit_details?.payback}</strong> years.
          </li>
          <li>
            <span className="why-icon">🤝</span>
            Support in marketing, training, and operations.
          </li>
          <li>
            <span className="why-icon">🚀</span>
            Continuous innovation and business growth.
          </li>
        </ul>
      </section>


      {/* --- */}
      {/* Similar Brands */}
      {/* <section className="similar-brands">
        <h2>Similar Brands</h2>
        <div className="slider-wrapper">
          <div className="brand-slider">
            {[...similarBrands, ...similarBrands].map((brand, index) => (
              <div className="brand-card" key={index}>
                <img src={brand.img} alt={brand.name} />
                <h3>{brand.name}</h3>
                <p>{brand.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Connect Modal */}
      {showConnectModal && (
        <ConnectMeModal
          show={showConnectModal}
          onClose={() => setShowConnectModal(false)}
          brandId={brandData.register_id}
          productId={id}
          BrandName={brandData.name} // Pass the ID from the URL to the modal
        />
      )}
    </div>
  );
};

export default BrandDetailPage;