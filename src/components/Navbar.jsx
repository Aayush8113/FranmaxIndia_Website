// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import TabFilters from "./TabFilters";
// import SideMenu from "./sidemenu/SideMenuTabs";
// import "./design/Header.css";

// const servicesSubmenu = [
//   { name: "Sell Business", path: "/sell-business" },
//   { name: "Lease Property", path: "/lease-property" },
//   { name: "Business Exchange", path: "/business-exchange" },
//   { name: "Real Estate", path: "/real-estate" },
//   { name: "Marketing", path: "/marketing" },
// ];

// // Add all pages for search suggestions
// const allPages = [
//   { name: "Start a Business", path: "/consulting" },
//   { name: "Franchise Opportunities", path: "/franchise" },
//   { name: "Become Partner", path: "/partner" },
//   { name: "FAQ", path: "/faqs" },
//   { name: "Events", path: "/events" },
//   ...servicesSubmenu, // Include services in search
// ];

// function Navbar() {
//   const [showModal, setShowModal] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [showLiveSearch, setShowLiveSearch] = useState(false);

//   const dropdownRef = useRef(null);
//   const searchRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setActiveDropdown(null);
//       }
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowLiveSearch(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const toggleServicesDropdown = useCallback(() => {
//     setActiveDropdown((prev) => (prev === "services" ? null : "services"));
//   }, []);

//   const handleCloseSideMenu = useCallback(() => setShowMenu(false), []);
//   const handleOpenModal = useCallback(() => setShowModal(true), []);
//   const handleCloseModal = useCallback(() => setShowModal(false), []);

//   // Live search handler
//   const handleSearchChange = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     if (!query) {
//       setSearchResults([]);
//       setShowLiveSearch(false);
//       return;
//     }

//     const filtered = allPages.filter((item) =>
//       item.name.toLowerCase().includes(query)
//     );

//     setSearchResults(filtered);
//     setShowLiveSearch(filtered.length > 0);
//   };

//   const handleSearchItemClick = (item) => {
//     setSearchQuery(item.name);
//     setShowLiveSearch(false);
//     navigate(item.path);
//   };

//   return (
//     <>
//       <nav className="navbar">
//         <div className="nav-left">
//           <div
//             className="hamburger-icon"
//             onClick={() => setShowMenu(true)}
//             role="button"
//             aria-label="Open menu"
//           >
//             ☰
//           </div>

//           <Link to="/" className="nav-icon">🏠</Link>
//           <Link to="/consulting">Start a Bussniess</Link>
//           <Link to="/franchise">Franchise Opportunities</Link>
//           <Link to="/partner">Become Partner</Link>
//           <Link to="/faqs">FAQ</Link>
//           <a href="https://www.franxpo.com" target="_blank" rel="noopener noreferrer">Events</a>

//           {/* Services Dropdown */}
//           <div className="services-dropdown-wrapper" ref={dropdownRef}>
//             <span
//               className="dropdown-trigger"
//               onClick={toggleServicesDropdown}
//               role="button"
//             >
//               Services ▾
//             </span>
//             {activeDropdown !== null && (
//               <div className="dropdown-menu">
//                 {servicesSubmenu.map((item, index) => (
//                   <div key={index} className="dropdown-item-has-submenu">
//                     <Link
//                       to={item.path}
//                       className="dropdown-item"
//                       onClick={() => setActiveDropdown(null)}
//                     >
//                       {item.name}
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="nav-right" ref={searchRef}>
//           <div className="nav-search-box">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="google-style-search"
//               value={searchQuery}
//               onChange={handleSearchChange}
//               onFocus={() => searchQuery && setShowLiveSearch(true)}
//             />
//             <span className="search-icon" onClick={handleOpenModal}>
//               🔍
//             </span>

//             {/* Live Search Dropdown */}
//             {showLiveSearch && searchResults.length > 0 && (
//               <div className="live-search-dropdown">
//                 {searchResults.map((item, idx) => (
//                   <div
//                     key={idx}
//                     className="live-search-item"
//                     onClick={() => handleSearchItemClick(item)}
//                   >
//                     {item.name}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* Search Modal Popup */}
//       {showModal && (
//         <div className="search-modal-overlay">
//           <div className="search-modal">
//             <button className="close-modal" onClick={handleCloseModal}>
//               ✖
//             </button>
//             <TabFilters />
//           </div>
//         </div>
//       )}

//       {/* Side Menu */}
//       <SideMenu isOpen={showMenu} onClose={handleCloseSideMenu} />
//     </>
//   );
// }

// export default Navbar;









// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import SideMenu from "./sidemenu/SideMenuTabs";
// import CategoriesTab from "./tabs/CategoriesTab";
// import "./design/Header.css";
// import { getApiUrl } from "../utils/api";

// const servicesSubmenu = [
//   { name: "Sell Business", path: "/sell-business" },
//   { name: "Lease Property", path: "/lease-property" },
//   { name: "Business Exchange", path: "/business-exchange" },
//   { name: "Real Estate", path: "/real-estate" },
//   { name: "Marketing", path: "/marketing" },
// ];

// const staticPages = [
//   { name: "Consulting", path: "/consulting" },
//   { name: "Franchise Opportunities", path: "/franchise" },
//   { name: "Start a Business", path: "/start-business" },
//   { name: "Become Partner", path: "/partner" },
//   { name: "Events", path: "/events" },
//   { name: "FAQ", path: "/faqs" },
// ];

// export default function Navbar() {
//   const [showModal, setShowModal] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [showLiveSearch, setShowLiveSearch] = useState(false);

//   const [masterCategories, setMasterCategories] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);

//   const dropdownRef = useRef(null);
//   const searchRef = useRef(null);
//   const navigate = useNavigate();

//   // Fetch category data once
//   useEffect(() => {
//     fetch(getApiUrl("get-master-category.php"))
//       .then((res) => res.json())
//       .then((data) => setMasterCategories(Array.isArray(data) ? data : []))
//       .catch(console.error);

//     fetch(getApiUrl("get-category.php"))
//       .then((res) => res.json())
//       .then((data) => setCategories(Array.isArray(data) ? data : []))
//       .catch(console.error);

//     fetch(getApiUrl("get-sub-category.php"))
//       .then((res) => res.json())
//       .then((data) => setSubCategories(Array.isArray(data) ? data : []))
//       .catch(console.error);
//   }, []);

//   // Close dropdowns/search if click outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setActiveDropdown(null);
//       }
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowLiveSearch(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const toggleServicesDropdown = useCallback(() => {
//     setActiveDropdown((prev) => (prev === "services" ? null : "services"));
//   }, []);

//   const handleCloseSideMenu = useCallback(() => setShowMenu(false), []);
//   const handleOpenModal = useCallback(() => setShowModal(true), []);
//   const handleCloseModal = useCallback(() => setShowModal(false), []);

//   // Live search handler
//   const handleSearchChange = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     if (!query) {
//       setSearchResults([]);
//       setShowLiveSearch(false);
//       return;
//     }

//     const masterResults = Array.isArray(masterCategories)
//       ? masterCategories
//           .filter((m) => m.mas_cat_name.toLowerCase().includes(query))
//           .map((m) => ({
//             name: m.mas_cat_name,
//             path: `/master-category/${m.mas_cat_id}`,
//           }))
//       : [];

//     const categoryResults = Array.isArray(categories)
//       ? categories
//           .filter((c) => c.cat_name.toLowerCase().includes(query))
//           .map((c) => ({ name: c.cat_name, path: `/category/${c.cat_id}` }))
//       : [];

//     const subCategoryResults = Array.isArray(subCategories)
//       ? subCategories
//           .filter((s) => s.subcat_name.toLowerCase().includes(query))
//           .map((s) => ({
//             name: s.subcat_name,
//             path: `/subcategory/${s.subcat_id}`,
//           }))
//       : [];

//     const staticResults = staticPages.filter((p) =>
//       p.name.toLowerCase().includes(query)
//     );

//     const results = [
//       ...staticResults,
//       ...masterResults,
//       ...categoryResults,
//       ...subCategoryResults,
//     ];

//     setSearchResults(results);
//     setShowLiveSearch(results.length > 0);
//   };

//   const handleSearchItemClick = (item) => {
//     setSearchQuery(item.name);
//     setShowLiveSearch(false);
//     navigate(item.path);
//   };

//   return (
//     <>
//       <nav className="navbar">
//         <div className="nav-left">
//           <div
//             className="hamburger-icon"
//             onClick={() => setShowMenu(true)}
//             role="button"
//             aria-label="Open menu"
//           >
//             ☰
//           </div>

//           <Link to="/" className="nav-icon">
//             🏠
//           </Link>
//           <Link to="/consulting">Start a Business</Link>
//           <Link to="/franchise">Franchise Opportunities</Link>
//           <Link to="/partner">Become Partner</Link>
//           <Link to="/faqs">FAQ</Link>
//           <a
//             href="https://www.franxpo.com"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Events
//           </a>

//           <div className="services-dropdown-wrapper" ref={dropdownRef}>
//             <span className="dropdown-trigger" onClick={toggleServicesDropdown}>
//               Services ▾
//             </span>
//             {activeDropdown && (
//               <div className="dropdown-menu">
//                 {servicesSubmenu.map((item, i) => (
//                   <Link key={i} to={item.path} className="dropdown-item">
//                     {item.name}
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right Section: Search */}
//         <div className="nav-right" ref={searchRef}>
//           <div className="nav-search-box">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="google-style-search"
//               value={searchQuery}
//               onChange={handleSearchChange}
//               onFocus={() => searchQuery && setShowLiveSearch(true)}
//             />
//             <span
//               className="search-icon"
//               onClick={handleOpenModal}
//               style={{ cursor: "pointer" }}
//             >
//               🔍
//             </span>

//             {showLiveSearch && searchResults.length > 0 && (
//               <div className="live-search-dropdown">
//                 {searchResults.map((item, idx) => (
//                   <div
//                     key={idx}
//                     className="live-search-item"
//                     onClick={() => handleSearchItemClick(item)}
//                   >
//                     {item.name}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* Search Modal with CategoriesTab */}
//       {showModal && (
//         <div className="search-modal-overlay">
//           <div className="search-modal">
//             <button className="close-modal" onClick={handleCloseModal}>
//               ✖
//             </button>
//             <CategoriesTab />
//           </div>
//         </div>
//       )}

//       {/* Side Menu */}
//       <SideMenu isOpen={showMenu} onClose={handleCloseSideMenu} />
//     </>
//   );
// }















import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import SideMenu from "./sidemenu/SideMenuTabs";
import "./design/Header.css";
import { getApiUrl } from "../utils/api";

const servicesSubmenu = [
  { name: "Sell Business", path: "/sell-business" },
  { name: "Lease Property", path: "/lease-property" },
  { name: "Business Exchange", path: "/business-exchange" },
  { name: "Real Estate", path: "/real-estate" },
  { name: "Marketing", path: "/marketing" },
];

const staticPages = [
  { name: "Consulting", path: "/consulting" },
  { name: "Franchise Opportunities", path: "/franchise" },
  { name: "Start a Business", path: "/start-business" },
  { name: "Become Partner", path: "/partner" },
  { name: "Events", path: "/events" },
  { name: "FAQ", path: "/faqs" },
  { name: "Career", path: "/career" }, // Career page added
];

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showLiveSearch, setShowLiveSearch] = useState(false);

  const [masterCategories, setMasterCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Fetch category data once
  useEffect(() => {
    fetch(getApiUrl("get-master-category.php"))
      .then((res) => res.json())
      .then((data) => setMasterCategories(Array.isArray(data) ? data : []))
      .catch(console.error);

    fetch(getApiUrl("get-category.php"))
      .then((res) => res.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(console.error);

    fetch(getApiUrl("get-sub-category.php"))
      .then((res) => res.json())
      .then((data) => setSubCategories(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  // Close dropdowns/search if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowLiveSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleServicesDropdown = useCallback(() => {
    setActiveDropdown((prev) => (prev === "services" ? null : "services"));
  }, []);

  const handleCloseSideMenu = useCallback(() => setShowMenu(false), []);

  // Live search handler
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setSearchResults([]);
      setShowLiveSearch(false);
      return;
    }

    const masterResults = Array.isArray(masterCategories)
      ? masterCategories
          .filter((m) => m.mas_cat_name.toLowerCase().includes(query))
          .map((m) => ({
            name: m.mas_cat_name,
            path: `/master-category/${m.mas_cat_id}`,
          }))
      : [];

    const categoryResults = Array.isArray(categories)
      ? categories
          .filter((c) => c.cat_name.toLowerCase().includes(query))
          .map((c) => ({ name: c.cat_name, path: `/category/${c.cat_id}` }))
      : [];

    const subCategoryResults = Array.isArray(subCategories)
      ? subCategories
          .filter((s) => s.subcat_name.toLowerCase().includes(query))
          .map((s) => ({
            name: s.subcat_name,
            path: `/subcategory/${s.subcat_id}`,
          }))
      : [];

    const staticResults = staticPages.filter((p) =>
      p.name.toLowerCase().includes(query)
    );

    const results = [
      ...staticResults,
      ...masterResults,
      ...categoryResults,
      ...subCategoryResults,
    ];

    setSearchResults(results);
    setShowLiveSearch(results.length > 0);
  };

  const handleSearchItemClick = (item) => {
    setSearchQuery("");
    setShowLiveSearch(false);
    navigate(item.path); // direct redirect
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <div
            className="hamburger-icon"
            onClick={() => setShowMenu(true)}
            role="button"
            aria-label="Open menu"
          >
            ☰
          </div>

          <Link to="/" className="nav-icon">
            🏠
          </Link>
          <Link to="/consulting">Start a Business</Link>
          <Link to="/franchise">Franchise Opportunities</Link>
          <Link to="/partner">Become Partner</Link>
          <Link to="/faqs">FAQ</Link>
          <a
            href="https://www.franxpo.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Events
          </a>
          {/* Career link added */}
          <Link to="/career">Career</Link>

          <div className="services-dropdown-wrapper" ref={dropdownRef}>
            <span className="dropdown-trigger" onClick={toggleServicesDropdown}>
              Services ▾
            </span>
            {activeDropdown && (
              <div className="dropdown-menu">
                {servicesSubmenu.map((item, i) => (
                  <Link key={i} to={item.path} className="dropdown-item">
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Section: Search */}
        <div className="nav-right" ref={searchRef}>
          <div className="nav-search-box">
            <input
              type="text"
              placeholder="Search..."
              className="google-style-search"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery && setShowLiveSearch(true)}
            />
            <span className="search-icon" style={{ cursor: "pointer" }}>
              🔍
            </span>

            {showLiveSearch && searchResults.length > 0 && (
              <div className="live-search-dropdown">
                {searchResults.map((item, idx) => (
                  <div
                    key={idx}
                    className="live-search-item"
                    onClick={() => handleSearchItemClick(item)}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Side Menu */}
      <SideMenu isOpen={showMenu} onClose={handleCloseSideMenu} />
    </>
  );
}
