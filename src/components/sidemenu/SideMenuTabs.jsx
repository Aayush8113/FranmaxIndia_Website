import React, { useState } from 'react';
import CategoryDrawer from './CategoryDrawer';
import StateCityDrawer from './StateList';
import InvestmentDrawer from './InvestmentDrawer';
import '../../components/design/sidemenu.css';
import { FaChevronDown, FaChevronUp, FaTimes, FaMapMarkerAlt, FaChartLine, FaThList } from 'react-icons/fa';

export default function SideMenu({ isOpen, onClose }) {
  const [showCategory, setShowCategory] = useState(true);
  const [showState, setShowState] = useState(true);
  const [showInvestment, setShowInvestment] = useState(true);

  if (!isOpen) return null;

  return (
    <>
      <div className="side-overlay" onClick={onClose}></div>
      <div className="side-menu open">
        <div className="side-content">
          <button className="close-side-menu" onClick={onClose}><FaTimes /></button>

          {/* Browse by Category */}
          <div className="side-section">
            <div className="section-header" onClick={() => setShowCategory(prev => !prev)}>
              <h3 className="section-title"><FaThList className="icon" /> Browse by Category</h3>
              <span className="toggle-section">{showCategory ? <FaChevronUp /> : <FaChevronDown />}</span>
            </div>
            <div className={`drawer-panel ${showCategory ? 'active' : ''}`}>
              <CategoryDrawer />
            </div>
          </div>

          {/* Browse by Location */}
          <div className="side-section">
            <div className="section-header" onClick={() => setShowState(prev => !prev)}>
              <h3 className="section-title"><FaMapMarkerAlt className="icon" /> Browse by Location</h3>
              <span className="toggle-section">{showState ? <FaChevronUp /> : <FaChevronDown />}</span>
            </div>
            <div className={`drawer-panel ${showState ? 'active' : ''}`}>
              <StateCityDrawer />
            </div>
          </div>

          {/* Browse by Investment */}
          <div className="side-section">
            <div className="section-header" onClick={() => setShowInvestment(prev => !prev)}>
              <h3 className="section-title"><FaChartLine className="icon" /> Browse by Investment</h3>
              <span className="toggle-section">{showInvestment ? <FaChevronUp /> : <FaChevronDown />}</span>
            </div>
            <div className={`drawer-panel ${showInvestment ? 'active' : ''}`}>
              <InvestmentDrawer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
