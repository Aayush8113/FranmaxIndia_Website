// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import './sidebar.css';
// import {
//   FaChevronRight, FaBuilding, FaUserTie,
//   FaBullhorn, FaCity, FaUsers, FaThLarge, FaBars, FaTimes
// } from 'react-icons/fa';

// const Sidebar = () => {
//   const [sectionCollapsed, setSectionCollapsed] = useState({
//     franchising: false,
//     marketing: false,
//     leasing: false,
//     admin: false,
//   });

//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [adminName, setAdminName] = useState('Guest');
//   const [adminEmail, setAdminEmail] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedAdminName = localStorage.getItem('adminName');
//     const storedAdminEmail = localStorage.getItem('adminEmail');
//     if (storedAdminName) setAdminName(storedAdminName);
//     if (storedAdminEmail) setAdminEmail(storedAdminEmail);
//   }, []);

//   const toggleSection = (section) => {
//     setSectionCollapsed((prev) => ({
//       ...prev,
//       [section]: !prev[section],
//     }));
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('adminId');
//     localStorage.removeItem('adminName');
//     localStorage.removeItem('adminEmail');
//     toast.info('You have been logged out.');
//     navigate('/admin/login');
//   };

//   return (
//     <>
//       {/* Sidebar Toggle Button */}
//       <button
//         className="snbs-mobile-toggle"
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//       >
//         {sidebarOpen ? <FaTimes /> : <FaBars />}
//       </button>

//       {/* Sidebar */}
//       <aside className={`snbs-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
//         <div className="snbs-sidebar-header">
//           <div className="snbs-logo">
//             <h2>FRANMAX INDIA</h2>
//             <p className="snbs-role">Welcome, {adminName}</p>
//             {adminEmail && <p className="snbs-email">{adminEmail}</p>}
//           </div>
//         </div>

//         <nav className="snbs-menu">

//           {/* Franchising */}
//           <div className="snbs-section">
//             <div
//               className="snbs-section-header"
//               onClick={() => toggleSection('franchising')}
//               role="button"
//               aria-expanded={sectionCollapsed.franchising}
//             >
//               <span>FRANCHISING</span>
//               <span className={`snbs-chevron ${sectionCollapsed.franchising ? 'open' : ''}`}>
//                 <FaChevronRight />
//               </span>
//             </div>
//             {sectionCollapsed.franchising && (
//               <>
//                 <Link to="/admin/brand-list" className="snbs-link"><FaBuilding /> <span>Brand</span></Link>
//                 <Link to="/admin/investors" className="snbs-link"><FaUserTie /> <span>Investor</span></Link>
//                 <Link to="/admin/leads" className="snbs-link"><FaUserTie /> <span>Generic Inquiries</span></Link>
//                 <Link to="/admin/brand-inquiries" className="snbs-link"><FaUserTie /> <span>Brand Specific Inquiries</span></Link>
//                 <Link to="/admin/partner-inquiries" className="snbs-link"><FaUserTie /> <span>Partner Inquiries</span></Link>
//                 <Link to="/admin/newsletter" className="snbs-link"><FaUserTie /> <span>Newsletter</span></Link>
//                 <Link to="/admin/faq" className="snbs-link"><FaUserTie /> <span>FAQ</span></Link>
//                 <Link to="/admin/event" className="snbs-link"><FaUserTie /> <span>Event</span></Link>
//               </>
//             )}
//           </div>

//           {/* Marketing */}
//           <div className="snbs-section">
//             <div
//               className="snbs-section-header"
//               onClick={() => toggleSection('marketing')}
//               role="button"
//               aria-expanded={sectionCollapsed.marketing}
//             >
//               <span>MARKETING</span>
//               <span className={`snbs-chevron ${sectionCollapsed.marketing ? 'open' : ''}`}>
//                 <FaChevronRight />
//               </span>
//             </div>
//             {sectionCollapsed.marketing && (
//               <Link to="/admin/marketing-inquiries" className="snbs-link"><FaBullhorn /> <span>Marketing</span></Link>
//             )}
//           </div>

//           {/* Leasing */}
//           <div className="snbs-section">
//             <div
//               className="snbs-section-header"
//               onClick={() => toggleSection('leasing')}
//               role="button"
//               aria-expanded={sectionCollapsed.leasing}
//             >
//               <span>LEASING</span>
//               <span className={`snbs-chevron ${sectionCollapsed.leasing ? 'open' : ''}`}>
//                 <FaChevronRight />
//               </span>
//             </div>
//             {sectionCollapsed.leasing && (
//               <>
//                 {/* <Link to="#" className="snbs-link"><FaCity /> <span>Buy Lease Property inquiries</span></Link> */}
//                 <Link to="/admin/lease-properties" className="snbs-link"><FaCity /> <span>Lease Property inquiries</span></Link>
//                 {/* <Link to="#" className="snbs-link"><FaCity /> <span>Sell Property</span></Link> */}
//                 <Link to="/admin/buy-business-inquiries" className="snbs-link"><FaCity /> <span>Buy Business Inquiry</span></Link>
//                 <Link to="/admin/sell-business-inquiries" className="snbs-link"><FaCity /> <span>Sell Business</span></Link>
//               </>
//             )}
//           </div>

//           {/* Admin */}
//           <div className="snbs-section">
//             <div
//               className="snbs-section-header"
//               onClick={() => toggleSection('admin')}
//               role="button"
//               aria-expanded={sectionCollapsed.admin}
//             >
//               <span>ADMIN</span>
//               <span className={`snbs-chevron ${sectionCollapsed.admin ? 'open' : ''}`}>
//                 <FaChevronRight />
//               </span>
//             </div>
//             {sectionCollapsed.admin && (
//               <>
//                 <Link to="/user-list" className="snbs-link"><FaUsers /> <span>Users</span></Link>
//                 <button onClick={handleLogout} className="snbs-link"><FaThLarge /> <span>Logout</span></button>
//               </>
//             )}
//           </div>

//         </nav>
//       </aside>

//       {/* Main content wrapper */}
//       <div className={`snbs-content-wrapper ${sidebarOpen ? 'with-sidebar' : ''}`}>
//         <div className="snbs-content">
//           {/* Place your page content here */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;










import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './sidebar.css';
import {
  FaChevronRight, FaBuilding, FaUserTie,
  FaBullhorn, FaCity, FaUsers, FaThLarge, FaBars, FaTimes
} from 'react-icons/fa';

const Sidebar = () => {
  const [sectionCollapsed, setSectionCollapsed] = useState({
    franchising: false,
    marketing: false,
    leasing: false,
    admin: false,
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminName, setAdminName] = useState('Guest');
  const [adminEmail, setAdminEmail] = useState('');
  const navigate = useNavigate();

  // Load admin info from localStorage
  useEffect(() => {
    const storedAdminName = localStorage.getItem('adminName');
    const storedAdminEmail = localStorage.getItem('adminEmail');
    if (storedAdminName) setAdminName(storedAdminName);
    if (storedAdminEmail) setAdminEmail(storedAdminEmail);
  }, []);

  // Load sidebar state from localStorage (optional)
  useEffect(() => {
    const savedSidebar = localStorage.getItem('sidebarOpen');
    if (savedSidebar) setSidebarOpen(JSON.parse(savedSidebar));
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));

    // Collapse all sections when sidebar closes
    if (!sidebarOpen) {
      setSectionCollapsed({
        franchising: false,
        marketing: false,
        leasing: false,
        admin: false,
      });
    }
  }, [sidebarOpen]);

  const toggleSection = (section) => {
    setSectionCollapsed((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminEmail');
    toast.info('You have been logged out.');
    navigate('/admin/login');
  };

  // Close sidebar on link click for mobile
  const handleLinkClick = () => {
    if (window.innerWidth <= 991) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        className="snbs-mobile-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside className={`snbs-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="snbs-sidebar-header">
          <div className="snbs-logo">
            <h2>FRANMAX INDIA</h2>
            <p className="snbs-role">Welcome, {adminName}</p>
            {adminEmail && <p className="snbs-email">{adminEmail}</p>}
          </div>
        </div>

        <nav className="snbs-menu">

          {/* Franchising */}
          <div className="snbs-section">
            <div
              className="snbs-section-header"
              onClick={() => toggleSection('franchising')}
              role="button"
              aria-expanded={sectionCollapsed.franchising}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && toggleSection('franchising')}
            >
              <span>FRANCHISING</span>
              <span className={`snbs-chevron ${sectionCollapsed.franchising ? 'open' : ''}`}>
                <FaChevronRight />
              </span>
            </div>
            {sectionCollapsed.franchising && (
              <>
                <Link to="/admin/brand-list" className="snbs-link" onClick={handleLinkClick}><FaBuilding /> <span>Brand</span></Link>
                <Link to="/admin/investors" className="snbs-link" onClick={handleLinkClick}><FaUserTie /> <span>Investor</span></Link>
                <Link to="/admin/leads" className="snbs-link" onClick={handleLinkClick}><FaUserTie /> <span>Generic Inquiries</span></Link>
                <Link to="/admin/brand-inquiries" className="snbs-link" onClick={handleLinkClick}><FaUserTie /> <span>Brand Specific Inquiries</span></Link>
                <Link to="/admin/partner-inquiries" className="snbs-link" onClick={handleLinkClick}><FaUserTie /> <span>Partner Inquiries</span></Link>
                <Link to="/admin/newsletter" className="snbs-link" onClick={handleLinkClick}><FaUserTie /> <span>Newsletter</span></Link>
                <Link to="/admin/faq" className="snbs-link" onClick={handleLinkClick}><FaUserTie /> <span>FAQ</span></Link>
                <Link to="/admin/event" className="snbs-link" onClick={handleLinkClick}><FaUserTie /> <span>Event</span></Link>
              </>
            )}
          </div>

          {/* Marketing */}
          <div className="snbs-section">
            <div
              className="snbs-section-header"
              onClick={() => toggleSection('marketing')}
              role="button"
              aria-expanded={sectionCollapsed.marketing}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && toggleSection('marketing')}
            >
              <span>MARKETING</span>
              <span className={`snbs-chevron ${sectionCollapsed.marketing ? 'open' : ''}`}>
                <FaChevronRight />
              </span>
            </div>
            {sectionCollapsed.marketing && (
              <Link to="/admin/marketing-inquiries" className="snbs-link" onClick={handleLinkClick}><FaBullhorn /> <span>Marketing</span></Link>
            )}
          </div>

          {/* Leasing */}
          <div className="snbs-section">
            <div
              className="snbs-section-header"
              onClick={() => toggleSection('leasing')}
              role="button"
              aria-expanded={sectionCollapsed.leasing}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && toggleSection('leasing')}
            >
              <span>LEASING</span>
              <span className={`snbs-chevron ${sectionCollapsed.leasing ? 'open' : ''}`}>
                <FaChevronRight />
              </span>
            </div>
            {sectionCollapsed.leasing && (
              <>
                <Link to="/admin/lease-properties" className="snbs-link" onClick={handleLinkClick}><FaCity /> <span>Lease Property inquiries</span></Link>
                <Link to="/admin/buy-business-inquiries" className="snbs-link" onClick={handleLinkClick}><FaCity /> <span>Buy Business Inquiry</span></Link>
                <Link to="/admin/sell-business-inquiries" className="snbs-link" onClick={handleLinkClick}><FaCity /> <span>Sell Business</span></Link>
              </>
            )}
          </div>

          {/* Admin */}
          <div className="snbs-section">
            <div
              className="snbs-section-header"
              onClick={() => toggleSection('admin')}
              role="button"
              aria-expanded={sectionCollapsed.admin}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && toggleSection('admin')}
            >
              <span>ADMIN</span>
              <span className={`snbs-chevron ${sectionCollapsed.admin ? 'open' : ''}`}>
                <FaChevronRight />
              </span>
            </div>
            {sectionCollapsed.admin && (
              <>
                <Link to="/user-list" className="snbs-link" onClick={handleLinkClick}><FaUsers /> <span>Users</span></Link>
                <button onClick={handleLogout} className="snbs-link"> <FaThLarge /> <span>Logout</span> </button>
              </>
            )}
          </div>

        </nav>
      </aside>

      {/* Main content wrapper */}
      <div className={`snbs-content-wrapper ${sidebarOpen ? 'with-sidebar' : ''}`}>
        <div className="snbs-content">
          {/* Place your page content here */}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
