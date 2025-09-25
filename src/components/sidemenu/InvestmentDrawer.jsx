import React, { useState } from 'react';

export default function InvestmentDrawer() {
  const step = 50000;
  const maxLimit = 500000000;

  const [minInvestment, setMinInvestment] = useState(0);
  const [maxInvestment, setMaxInvestment] = useState(step);

  const formatCurrency = (value) => {
    return `₹${value.toLocaleString('en-IN')}`;
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

  // Inline styles
  const styles = {
    drawer: {
      padding: '20px',
      background: '#fafafa',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      gap: '25px',
    },
    label: {
      fontWeight: 600,
      color: '#333',
      marginBottom: '8px',
      display: 'block',
      fontSize: '15px',
    },
    rangeWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '5px',
    },
    rangeInput: {
      flex: 1,
      height: '6px',
      background: '#ddd',
      borderRadius: '5px',
      outline: 'none',
      appearance: 'none',
      cursor: 'pointer',
    },
    numberInput: {
      width: '120px',
      padding: '6px 10px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      fontWeight: 500,
      fontSize: '14px',
      outline: 'none',
      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
    },
    rangeValue: {
      fontSize: '15px',
      fontWeight: 600,
      color: '#0069d9',
      marginTop: '5px',
    },
  };

  return (
    <div style={styles.drawer}>
      {/* Minimum Investment */}
      <div>
        <label style={styles.label} htmlFor="minRange">Minimum Investment</label>
        <div style={styles.rangeWrapper}>
          <input
            type="range"
            id="minRange"
            min={0}
            max={maxLimit - step}
            step={step}
            value={minInvestment}
            onChange={(e) => handleMinChange(e.target.value)}
            style={styles.rangeInput}
          />
          <input
            type="number"
            style={styles.numberInput}
            value={minInvestment}
            min={0}
            max={maxLimit - step}
            step={step}
            onChange={(e) => handleMinChange(e.target.value)}
          />
        </div>
        <div style={styles.rangeValue}>{formatCurrency(minInvestment)}</div>
      </div>

      {/* Maximum Investment */}
      <div>
        <label style={styles.label} htmlFor="maxRange">Maximum Investment</label>
        <div style={styles.rangeWrapper}>
          <input
            type="range"
            id="maxRange"
            min={minInvestment + step}
            max={maxLimit}
            step={step}
            value={maxInvestment}
            onChange={(e) => handleMaxChange(e.target.value)}
            style={styles.rangeInput}
          />
          <input
            type="number"
            style={styles.numberInput}
            value={maxInvestment}
            min={minInvestment + step}
            max={maxLimit}
            step={step}
            onChange={(e) => handleMaxChange(e.target.value)}
          />
        </div>
        <div style={styles.rangeValue}>{formatCurrency(maxInvestment)}</div>
      </div>
    </div>
  );
}
