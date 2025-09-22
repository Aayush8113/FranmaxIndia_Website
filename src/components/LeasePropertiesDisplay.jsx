// import React, { useEffect, useState, useRef } from 'react';
// import './design/LeasePropertiesDisplay.css';
// import { getImageUrl , getApiUrl } from '../utils/api';

// const LeasePropertiesDisplay = () => {
//   const [properties, setProperties] = useState([]);
//   const [visibleCards, setVisibleCards] = useState([]);
//   const currentIndexRef = useRef(0);
//   const intervalRef = useRef(null);

//   useEffect(() => {
//     fetch(getApiUrl('get-lease-properties.php'))
//       .then(res => res.json())
//       .then(data => {
//         if (data.status === 'success' && Array.isArray(data.data) && data.data.length > 0) {
//           const uniqueProps = data.data.filter(
//             (prop, index, self) =>
//               prop &&
//               prop.image_path &&
//               index === self.findIndex(p => p.image_path === prop.image_path)
//           );
//           const shuffled = uniqueProps.sort(() => Math.random() - 0.5);
//           setProperties(shuffled);

//           // Set initial 3 cards
//           setVisibleCards(shuffled.slice(0, 3));
//           currentIndexRef.current = 3;
//         }
//       })
//       .catch(err => console.error("Failed to load lease properties", err));
//   }, []);

//   useEffect(() => {
//     if (properties.length > 3) {
//       intervalRef.current = setInterval(() => {
//         setVisibleCards(prev => {
//           const nextIndex = currentIndexRef.current % properties.length;
//           const nextCard = properties[nextIndex];
//           currentIndexRef.current += 1;

//           const updated = [...prev.slice(1), nextCard];
//           return updated;
//         });
//       }, 4000);
//     }

//     return () => clearInterval(intervalRef.current);
//   }, [properties]);

//   // If no properties, render nothing
//   if (properties.length === 0) return null;

//   return (
//     <div className="lease-wrapper">
//       <div className="lease-header">
//         <h2 className="lease-heading">Exploring Properties</h2>
//         <a href="/all-lease-properties" className="view-all-link">View All</a>
//       </div>

//       <div className="lease-card-grid">
//         {visibleCards.map((prop, i) => (
//           <div className="lease-card" key={i}>
//             <div className="lease-img-wrap">
//               <img
//                 src={getImageUrl(prop.image_path)}
//                 alt="Property"
//               />
//             </div>

//             <div className="lease-info">
//               <h3 className="biz-title">{prop.property_type}</h3>
//               <div className="lease-meta">
//                 <p><span className="label">Expected Rent:</span> <span>₹{prop.expected_rent}</span></p>
//                 <p><span className="label">Area:</span> <span>{prop.sqft}</span></p>
//                 <p><span className="label">Floor:</span> <span>{prop.floor_type}</span></p>
//                 <p><span className="label">City:</span> <span>{prop.city_name}</span></p>
//               </div>
//               <button className="lease-btn">Know More</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LeasePropertiesDisplay;





// import React, { useEffect, useState, useRef } from 'react';
// import './design/LeasePropertiesDisplay.css';
// import { getImageUrl , getApiUrl } from '../utils/api';
// import { Link } from 'react-router-dom';

// // ✅ Utility: Convert number into Indian "lacs/crores" format
// function formatIndianCurrency(number) {
//   if (!number || isNaN(number)) return "—";

//   if (number >= 10000000) {
//     // 1 crore = 1,00,00,000
//     const crores = number / 10000000;
//     return `${parseFloat(crores.toFixed(1)).toString().replace(/\.0$/, '')} cr`;
//   } else {
//     const lacs = number / 100000;
//     return `${parseFloat(lacs.toFixed(0))} lacs`;
//   }
// }

// const LeasePropertiesDisplay = () => {
//   const [properties, setProperties] = useState([]);
//   const [visibleCards, setVisibleCards] = useState([]);
//   const currentIndexRef = useRef(0);
//   const intervalRef = useRef(null);

//   useEffect(() => {
//     fetch(getApiUrl('get-lease-properties.php'))
//       .then(res => res.json())
//       .then(data => {
//         if (data.status === 'success' && Array.isArray(data.data) && data.data.length > 0) {
//           const uniqueProps = data.data.filter(
//             (prop, index, self) =>
//               prop &&
//               prop.image_path &&
//               index === self.findIndex(p => p.image_path === prop.image_path)
//           );
//           const shuffled = uniqueProps.sort(() => Math.random() - 0.5);
//           setProperties(shuffled);

//           // Set initial 3 cards
//           setVisibleCards(shuffled.slice(0, 3));
//           currentIndexRef.current = 3;
//         }
//       })
//       .catch(err => console.error("Failed to load lease properties", err));
//   }, []);

//   useEffect(() => {
//     if (properties.length > 3) {
//       intervalRef.current = setInterval(() => {
//         setVisibleCards(prev => {
//           const nextIndex = currentIndexRef.current % properties.length;
//           const nextCard = properties[nextIndex];
//           currentIndexRef.current += 1;

//           const updated = [...prev.slice(1), nextCard];
//           return updated;
//         });
//       }, 4000);
//     }

//     return () => clearInterval(intervalRef.current);
//   }, [properties]);

//   if (properties.length === 0) return null;

//   return (
//     <div className="lease-wrapper">
//       <div className="lease-header">
//         <h2 className="lease-heading">Exploring Properties</h2>
//         <a href="/all-lease-properties" className="view-all-link">View All</a>
//       </div>

//       <div className="lease-card-grid">
//         {visibleCards.map((prop, i) => (
//           <div className="lease-card" key={i}>
//             <div className="lease-img-wrap">
//               <img
//                 src={getImageUrl(prop.image_path)}
//                 alt="Property"
//               />
//             </div>

//             <div className="lease-info">
//               <h3 className="biz-title">{prop.property_type}</h3>
//               <div className="lease-meta">
//                 <p>
//                   <span className="label">Expected Rent:</span>{" "}
//                   <span>₹{formatIndianCurrency(prop.expected_rent)}</span>
//                 </p>
//                 <p><span className="label">Area:</span> <span>{prop.sqft}</span></p>
//                 <p><span className="label">Floor:</span> <span>{prop.floor_type}</span></p>
//                 <p><span className="label">City:</span> <span>{prop.city_name}</span></p>
//               </div>

//               <Link to={`/property/${prop.property_key}`}>
//                 <button className="lease-btn">Know More</button>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LeasePropertiesDisplay;




















import React, { useEffect, useState, useRef } from 'react';
import './design/LeasePropertiesDisplay.css';
import { getImageUrl, getApiUrl } from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';

// ✅ Utility: Convert number into Indian "lacs/crores" format
function formatIndianCurrency(number) {
  if (!number || isNaN(number)) return "—";

  if (number >= 10000000) {
    // 1 crore = 1,00,00,000
    const crores = number / 10000000;
    return `${parseFloat(crores.toFixed(1)).toString().replace(/\.0$/, '')} cr`;
  } else {
    const lacs = number / 100000;
    return `${parseFloat(lacs.toFixed(0))} lacs`;
  }
}

const LeasePropertiesDisplay = () => {
  const [properties, setProperties] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const currentIndexRef = useRef(0);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  // Hold refs
  const holdTimeout = useRef(null);
  const holdDuration = 1000; // 1s

  useEffect(() => {
    fetch(getApiUrl('get-lease-properties.php'))
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success' && Array.isArray(data.data) && data.data.length > 0) {
          const uniqueProps = data.data.filter(
            (prop, index, self) =>
              prop &&
              prop.image_path &&
              index === self.findIndex(p => p.image_path === prop.image_path)
          );
          const shuffled = uniqueProps.sort(() => Math.random() - 0.5);
          setProperties(shuffled);

          // Set initial 3 cards
          setVisibleCards(shuffled.slice(0, 3));
          currentIndexRef.current = 3;
        }
      })
      .catch(err => console.error("Failed to load lease properties", err));
  }, []);

  useEffect(() => {
    if (properties.length > 3) {
      intervalRef.current = setInterval(() => {
        setVisibleCards(prev => {
          const nextIndex = currentIndexRef.current % properties.length;
          const nextCard = properties[nextIndex];
          currentIndexRef.current += 1;

          const updated = [...prev.slice(1), nextCard];
          return updated;
        });
      }, 4000);
    }

    return () => clearInterval(intervalRef.current);
  }, [properties]);

  // ✅ Long press handlers
  const handleHoldStart = (propertyKey) => {
    holdTimeout.current = setTimeout(() => {
      navigate(`/property/${propertyKey}`);
    }, holdDuration);
  };

  const handleHoldEnd = () => {
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
      holdTimeout.current = null;
    }
  };

  if (properties.length === 0) return null;

  return (
    <div className="lease-wrapper">
      <div className="lease-header">
        <h2 className="lease-heading">Exploring Properties</h2>
        <a href="/all-lease-properties" className="view-all-link">View All</a>
      </div>

      <div className="lease-card-grid">
        {visibleCards.map((prop, i) => (
          <div
            className="lease-card"
            key={i}
            // ✅ Hold events
            onMouseDown={() => handleHoldStart(prop.property_key)}
            onMouseUp={handleHoldEnd}
            onMouseLeave={handleHoldEnd}
            onTouchStart={() => handleHoldStart(prop.property_key)}
            onTouchEnd={handleHoldEnd}
          >
            <div className="lease-img-wrap">
              <img
                src={getImageUrl(prop.image_path)}
                alt="Property"
              />
            </div>

            <div className="lease-info">
              <h3 className="biz-title">{prop.property_type}</h3>
              <div className="lease-meta">
                <p>
                  <span className="label">Expected Rent:</span>{" "}
                  <span>₹{formatIndianCurrency(prop.expected_rent)}</span>
                </p>
                <p><span className="label">Area:</span> <span>{prop.sqft}</span></p>
                <p><span className="label">Floor:</span> <span>{prop.floor_type}</span></p>
                <p><span className="label">City:</span> <span>{prop.city_name}</span></p>
              </div>

              <Link to={`/property/${prop.property_key}`}>
                <button className="lease-btn">Know More (Hold)</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeasePropertiesDisplay;
