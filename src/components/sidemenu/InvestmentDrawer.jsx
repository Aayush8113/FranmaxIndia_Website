// // src/components/InvestmentDrawer.jsx
// import React, { useState } from 'react';
// // import '../../components/design/investmentDrawer.css';

// export default function InvestmentDrawer() {
//   const step = 50000;
//   const maxLimit = 500000000;

//   const [minInvestment, setMinInvestment] = useState(0);
//   const [maxInvestment, setMaxInvestment] = useState(step);

//   const formatCurrency = (value) => {
//     return `₹${value.toLocaleString('en-IN')}`;
//   };

//   const handleMinChange = (value) => {
//     const val = parseInt(value);
//     if (!isNaN(val) && val >= 0 && val <= maxLimit - step) {
//       setMinInvestment(val);
//       if (val >= maxInvestment) {
//         setMaxInvestment(val + step);
//       }
//     }
//   };

//   const handleMaxChange = (value) => {
//     const val = parseInt(value);
//     if (!isNaN(val) && val > minInvestment && val <= maxLimit) {
//       setMaxInvestment(val);
//     }
//   };

//   return (
//     <div className="investment-drawer">
//       {/* Minimum Investment */}
//       <div className="investment-range">
//         <label htmlFor="minRange">Minimum Investment</label>
//         <div className="range-wrapper">
//           <input
//             type="range"
//             id="minRange"
//             min={0}
//             max={maxLimit - step}
//             step={step}
//             value={minInvestment}
//             onChange={(e) => handleMinChange(e.target.value)}
//           />
//           <input
//             type="number"
//             className="range-number"
//             value={minInvestment}
//             min={0}
//             max={maxLimit - step}
//             step={step}
//             onChange={(e) => handleMinChange(e.target.value)}
//           />
//         </div>
//         <div className="range-value">{formatCurrency(minInvestment)}</div>
//       </div>

//       {/* Maximum Investment */}
//       <div className="investment-range">
//         <label htmlFor="maxRange">Maximum Investment</label>
//         <div className="range-wrapper">
//           <input
//             type="range"
//             id="maxRange"
//             min={minInvestment + step}
//             max={maxLimit}
//             step={step}
//             value={maxInvestment}
//             onChange={(e) => handleMaxChange(e.target.value)}
//           />
//           <input
//             type="number"
//             className="range-number"
//             value={maxInvestment}
//             min={minInvestment + step}
//             max={maxLimit}
//             step={step}
//             onChange={(e) => handleMaxChange(e.target.value)}
//           />
//         </div>
//         <div className="range-value">{formatCurrency(maxInvestment)}</div>
//       </div>
//     </div>
//   );
// }












// src/components/InvestmentDrawer.jsx
import React, { useState } from 'react';
// import '../../components/design/investmentDrawer.css';

export default function InvestmentDrawer() {
  const step = 50000;
  const maxLimit = 500000000;

  const [minInvestment, setMinInvestment] = useState(0);
  const [maxInvestment, setMaxInvestment] = useState(step);

  // ✅ Utility: Format into Indian "lakh/crore"
  const formatIndianCurrencyShort = (number) => {
    if (!number || isNaN(number)) return "—";

    if (number >= 10000000) {
      // 1 crore = 1,00,00,000
      const crores = number / 10000000;
      return `${parseFloat(crores.toFixed(1)).toString().replace(/\.0$/, '')} cr`;
    } else {
      const lacs = number / 100000;
      return `${parseFloat(lacs.toFixed(1)).toString().replace(/\.0$/, '')} lakh`;
    }
  };

  const handleMinChange = (value) => {
    const val = parseInt(value);
    if (!isNaN(val) && val >= 0 && val <= maxLimit - step) {
      setMinInvestment(val);
      if (val >= maxInvestment) {
        setMaxInvestment(val + step);
      }
    }
  };

  const handleMaxChange = (value) => {
    const val = parseInt(value);
    if (!isNaN(val) && val > minInvestment && val <= maxLimit) {
      setMaxInvestment(val);
    }
  };

  return (
    <div className="investment-drawer">
      {/* Minimum Investment */}
      <div className="investment-range">
        <label htmlFor="minRange">Minimum Investment</label>
        <div className="range-wrapper">
          <input
            type="range"
            id="minRange"
            min={0}
            max={maxLimit - step}
            step={step}
            value={minInvestment}
            onChange={(e) => handleMinChange(e.target.value)}
          />
          <input
            type="number"
            className="range-number"
            value={minInvestment}
            min={0}
            max={maxLimit - step}
            step={step}
            onChange={(e) => handleMinChange(e.target.value)}
          />
        </div>
        {/* ✅ Preview in lakh/cr */}
        <div className="range-value">{formatIndianCurrencyShort(minInvestment)}</div>
      </div>

      {/* Maximum Investment */}
      <div className="investment-range">
        <label htmlFor="maxRange">Maximum Investment</label>
        <div className="range-wrapper">
          <input
            type="range"
            id="maxRange"
            min={minInvestment + step}
            max={maxLimit}
            step={step}
            value={maxInvestment}
            onChange={(e) => handleMaxChange(e.target.value)}
          />
          <input
            type="number"
            className="range-number"
            value={maxInvestment}
            min={minInvestment + step}
            max={maxLimit}
            step={step}
            onChange={(e) => handleMaxChange(e.target.value)}
          />
        </div>
        {/* ✅ Preview in lakh/cr */}
        <div className="range-value">{formatIndianCurrencyShort(maxInvestment)}</div>
      </div>
    </div>
  );
}
