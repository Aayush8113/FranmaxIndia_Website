// import React, { useEffect, useState, useRef } from "react";
// import { FaPhoneAlt } from "react-icons/fa";
// import { getImageUrl, getApiUrl } from "../utils/api";
// import { useNavigate } from "react-router-dom";
// import "./design/TopBrands.css";

// const TopBrands = ({
//   apiUrl = getApiUrl("get-premium-brands.php"),
//   sectionTitle = "Top Franchising Opportunities",
//   viewAllLink = "/franchises",
// }) => {
//   const [brands, setBrands] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeImages, setActiveImages] = useState({});
//   const cardGridRef = useRef(null);
//   const intervalRef = useRef(null);
//   const navigate = useNavigate();

//   const formatIndianCurrency = (number) => {
//     if (!number || isNaN(number)) return "—";
//     if (number >= 10000000) return `${(number / 10000000).toFixed(1)} cr`;
//     if (number >= 100000) return `${Math.round(number / 100000)} lacs`;
//     return number.toLocaleString("en-IN");
//   };

//   useEffect(() => {
//     const fetchBrands = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(apiUrl);
//         const data = await res.json();
//         if (data.success && Array.isArray(data.brands)) {
//           const unique = data.brands.filter(
//             (b, i, arr) => arr.findIndex((x) => x.id === b.id) === i
//           );
//           setBrands([...unique, ...unique, ...unique]);
//         } else setBrands([]);
//       } catch {
//         setBrands([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (apiUrl) fetchBrands();
//     return () => clearInterval(intervalRef.current);
//   }, [apiUrl]);

//   useEffect(() => {
//     const grid = cardGridRef.current;
//     if (!grid || brands.length === 0) return;

//     const gapPx = parseInt(getComputedStyle(grid).gap) || 20;

//     const setCardWidth = () => {
//       const containerWidth = grid.clientWidth;
//       let visible = 1;
//       if (containerWidth >= 1200) visible = 4;
//       else if (containerWidth >= 992) visible = 3;
//       else if (containerWidth >= 768) visible = 2;

//       const cardWidth = Math.floor((containerWidth - gapPx * (visible - 1)) / visible);

//       grid.querySelectorAll(".syb-card").forEach((card) => {
//         card.style.flex = `0 0 ${cardWidth}px`;
//         card.style.width = `${cardWidth}px`;
//       });

//       return { cardWidth, gapPx, step: cardWidth + gapPx };
//     };

//     setCardWidth();
//     const ro = new ResizeObserver(setCardWidth);
//     ro.observe(grid);
//     return () => ro.disconnect();
//   }, [brands]);

//   useEffect(() => {
//     const grid = cardGridRef.current;
//     if (!grid || brands.length === 0 || loading) return;

//     const cards = grid.querySelectorAll(".syb-card");
//     if (!cards.length) return;

//     const gapPx = parseInt(getComputedStyle(grid).gap) || 20;
//     const cardWidth = parseInt(cards[0].style.width || getComputedStyle(cards[0]).width);
//     const step = cardWidth + gapPx;
//     const realCount = brands.length / 3;
//     const middleStart = realCount * step;

//     grid.scrollLeft = middleStart;

//     let isUserScrolling = false;
//     let scrollTimeout;

//     const onScroll = () => {
//       if (grid.scrollLeft <= 0) grid.scrollLeft = middleStart;
//       else if (grid.scrollLeft >= step * (brands.length - realCount)) grid.scrollLeft = middleStart;

//       isUserScrolling = true;
//       clearTimeout(scrollTimeout);
//       scrollTimeout = setTimeout(() => {
//         isUserScrolling = false;
//       }, 600);
//     };

//     grid.addEventListener("scroll", onScroll);

//     intervalRef.current = setInterval(() => {
//       if (!isUserScrolling) grid.scrollBy({ left: step, behavior: "smooth" });
//     }, 3500);

//     return () => {
//       clearInterval(intervalRef.current);
//       grid.removeEventListener("scroll", onScroll);
//     };
//   }, [brands, loading]);

//   const handleKnowMore = (id) => navigate(`/brand/${id}`);

//   const renderBrands = () =>
//     brands.map((brand, i) => {
//       const images = brand.images && brand.images.length > 0 ? brand.images : [brand.logo];
//       const activeImage = activeImages[brand.id] || 0;

//       return (
//         <div
//           key={`${brand.id}-${i}`}
//           className="syb-card"
//           style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.1)", transition: "box-shadow 0.3s" }}
//         >
//           <div
//             className="syb-img-wrap"
//             onMouseMove={(e) => {
//               const card = e.currentTarget.parentElement; // .syb-card
//               const rect = card.getBoundingClientRect();
//               const x = e.clientX - rect.left;
//               const y = e.clientY - rect.top;
//               const centerX = rect.width / 2;
//               const centerY = rect.height / 2;
//               const rotateX = ((y - centerY) / centerY) * 10;
//               const rotateY = ((x - centerX) / centerX) * 10;
//               card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
//               card.style.transition = "transform 0.1s";
//               card.style.boxShadow = `${-rotateY}px ${rotateX}px 20px rgba(0,0,0,0.2)`;
//             }}
//             onMouseLeave={(e) => {
//               const card = e.currentTarget.parentElement;
//               card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
//               card.style.transition = "transform 0.3s";
//               card.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
//             }}
//             onClick={() => handleKnowMore(brand.id)}
//           >
//             {images.map((img, idx) => (
//               <img
//                 key={idx}
//                 src={getImageUrl(img)}
//                 alt={brand.name}
//                 className={idx === activeImage ? "show-image" : "hide-image"}
//               />
//             ))}

//             {images.length > 1 && (
//               <div className="reveal-buttons">
//                 {images.map((_, idx) => (
//                   <button
//                     key={idx}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setActiveImages((prev) => ({ ...prev, [brand.id]: idx }));
//                     }}
//                     className={idx === activeImage ? "active-btn" : ""}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="syb-content">
//             <h3>{brand.name}</h3>
//             <div className="syb-detail">
//               <div className="biz-field">
//                 <span className="label">Sector:</span>
//                 <span className="value">{brand.sector || "—"}</span>
//               </div>
//               <div className="biz-field">
//                 <span className="label">Investment:</span>
//                 <span className="value">
//                   ₹{formatIndianCurrency(brand.min_investment)} – {formatIndianCurrency(brand.max_investment)}
//                 </span>
//               </div>
//               <div className="biz-field">
//                 <span className="label">Area:</span>
//                 <span className="value">
//                   {brand.min_area} - {brand.max_area} sq.ft
//                 </span>
//               </div>
//               <div className="biz-field">
//                 <span className="label">Outlets:</span>
//                 <span className="value">{brand.total_outlets}</span>
//               </div>
//             </div>

//             <div className="syb-buttons-row">
//               <button
//                 className="syb-btn"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleKnowMore(brand.id);
//                 }}
//               >
//                 Know More
//               </button>
//               <a
//                 href="tel:+919403890794"
//                 className="syb-call-btn"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <FaPhoneAlt style={{ marginRight: "6px" }} />
//                 Confused? Call Us
//               </a>
//             </div>
//           </div>
//         </div>
//       );
//     });

//   return (
//     <div className="syb-wrapper">
//       <div className="syb-heading-row">
//         {brands.length > 0 && <h2 className="syb-heading">{sectionTitle}</h2>}
//         {brands.length > 0 && (
//           <a href={viewAllLink} className="syb-view-all">
//             View All
//           </a>
//         )}
//       </div>

//       {loading ? (
//         <div className="syb-loading">Loading opportunities...</div>
//       ) : (
//         <div className="syb-carousel-container">
//           <div className="syb-grid" ref={cardGridRef}>
//             {renderBrands()}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TopBrands;


















import React, { useEffect, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { getImageUrl, getApiUrl } from "../utils/api";
import { useNavigate } from "react-router-dom";
import "./design/TopBrands.css";

const TopBrands = ({
  apiUrl = getApiUrl("get-premium-brands.php"),
  sectionTitle = "Top Franchising Opportunities",
  viewAllLink = "/franchises",
}) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImages, setActiveImages] = useState({});
  const [page, setPage] = useState(1);
  const [shuffledBrands, setShuffledBrands] = useState([]);
  const navigate = useNavigate();

  const formatIndianCurrency = (number) => {
    if (!number || isNaN(number)) return "—";
    if (number >= 10000000) return `${(number / 10000000).toFixed(1)} cr`;
    if (number >= 100000) return `${Math.round(number / 100000)} lacs`;
    return number.toLocaleString("en-IN");
  };

  // Shuffle utility
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

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
          setShuffledBrands(shuffleArray(unique));
        } else setBrands([]);
      } catch {
        setBrands([]);
      } finally {
        setLoading(false);
      }
    };
    if (apiUrl) fetchBrands();
  }, [apiUrl]);

  const cardsPerPage = 6; // 3 cards per row × 2 rows per page
  const totalPages = Math.ceil(shuffledBrands.length / cardsPerPage);

  const currentPageBrands = shuffledBrands.slice(
    (page - 1) * cardsPerPage,
    page * cardsPerPage
  );

  const handleKnowMore = (id) => navigate(`/brand/${id}`);

  const renderBrands = () =>
    currentPageBrands.map((brand, i) => {
      const images = brand.images && brand.images.length > 0 ? brand.images : [brand.logo];
      const activeImage = activeImages[brand.id] || 0;

      return (
        <div
          key={`${brand.id}-${i}`}
          className="syb-card"
          style={{
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            transition: "box-shadow 0.3s",
          }}
        >
          <div
            className="syb-img-wrap"
            onClick={() => handleKnowMore(brand.id)}
          >
            {images.map((img, idx) => (
              <img
                key={idx}
                src={getImageUrl(img)}
                alt={brand.name}
                className={idx === activeImage ? "show-image" : "hide-image"}
              />
            ))}

            {images.length > 1 && (
              <div className="reveal-buttons">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImages((prev) => ({ ...prev, [brand.id]: idx }));
                    }}
                    className={idx === activeImage ? "active-btn" : ""}
                  />
                ))}
              </div>
            )}
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
                  {brand.min_area} - {brand.max_area} sq.ft
                </span>
              </div>
              <div className="biz-field">
                <span className="label">Outlets:</span>
                <span className="value">{brand.total_outlets}</span>
              </div>
            </div>

            <div className="syb-buttons-row">
              <button
                className="syb-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleKnowMore(brand.id);
                }}
              >
                Know More
              </button>
              <a
                href="tel:+919403890794"
                className="syb-call-btn"
                onClick={(e) => e.stopPropagation()}
              >
                <FaPhoneAlt style={{ marginRight: "6px" }} />
                Confused? Call Us
              </a>
            </div>
          </div>
        </div>
      );
    });

  return (
    <div className="syb-wrapper">
      <div className="syb-heading-row">
        {brands.length > 0 && <h2 className="syb-heading">{sectionTitle}</h2>}
        {brands.length > 0 && (
          <a href={viewAllLink} className="syb-view-all">
            View All
          </a>
        )}
      </div>

      {loading ? (
        <div className="syb-loading">Loading opportunities...</div>
      ) : (
        <>
          <div className="syb-grid-paged">{renderBrands()}</div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination-controls">
              <button
                disabled={page === 1}
                onClick={() => {
                  setPage(page - 1);
                  setShuffledBrands(shuffleArray(brands));
                }}
              >
                Prev
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => {
                  setPage(page + 1);
                  setShuffledBrands(shuffleArray(brands));
                }}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TopBrands;
