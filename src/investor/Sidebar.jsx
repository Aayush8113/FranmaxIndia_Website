// import React from 'react';
// import { motion } from 'framer-motion';
// import { Briefcase, DollarSign, BarChart2, Users, Settings, LogOut, Home, CircleUser } from 'lucide-react';
// import './Sidebar.css';
//  const sessionData = localStorage.getItem('investor_session');
//   const userData = JSON.parse(sessionData);
//   if(!userData) {
//     window.location.href = '/';
//   }

// const navItems = [
//     { name: 'Dashboard', icon: <Home />, href: '/investor-dashboard' },
//     { name: 'Franchisees', icon: <Users />, href: '#franchisees' },
//     { name: 'Pricing', icon: <DollarSign />, href: '/investor-pricing' },
//     { name: 'Brands', icon: <BarChart2 />, href: '/investor-brands' },
//     { name: 'Profile', icon: <CircleUser />, href: '/investor-profile' },
// ];

// const Sidebar = ({ onLogout }) => {
//     const handleLogout = (e) => {
//         e.preventDefault();
//         // Remove the specific investor session key from local storage
//         localStorage.removeItem('investor_session');
//          window.location.href = '/'; // redirect
//         // Call the parent's logout function
//         onLogout();
//             window.location.href = '/'; // redirect
//     };

//     return (
//         <motion.aside 
//             className="sidebar"
//             initial={{ x: -200 }}
//             animate={{ x: 0 }}
//             transition={{ type: "spring", stiffness: 100 }}
//         >
//             <div className="sidebar-header">
//                 <Briefcase size={32} className="logo-icon" />
//                 <h1 className="logo-title">Welcome,{userData.name}</h1>
//             </div>
//             <nav className="sidebar-nav">
//                 <ul>
//                     {navItems.map((item, index) => (
//                         <li key={index}>
//                             <a href={item.href} className="nav-link">
//                                 {item.icon}
//                                 <span className="nav-link-text">{item.name}</span>
//                             </a>
//                         </li>
//                     ))}
//                 </ul>
//             </nav>
//             <div className="sidebar-footer">
//                 <a href="#settings" className="nav-link">
//                     <Settings />
//                     <span className="nav-link-text">Settings</span>
//                 </a>
//                 <a href="#" className="nav-link logout-link" onClick={handleLogout}>
//                     <LogOut />
//                     <span className="nav-link-text">Logout</span>
//                 </a>
//             </div>
//         </motion.aside>
//     );
// };

// export default Sidebar;









import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, DollarSign, BarChart2, Users, Settings, LogOut, Home, CircleUser, Menu, X } from 'lucide-react';
import './Sidebar.css';

const sessionData = localStorage.getItem('investor_session');
const userData = JSON.parse(sessionData);
if(!userData) {
    window.location.href = '/';
}

const navItems = [
    { name: 'Dashboard', icon: <Home />, href: '/investor-dashboard' },
    { name: 'Franchisees', icon: <Users />, href: '#franchisees' },
    { name: 'Pricing', icon: <DollarSign />, href: '/investor-pricing' },
    { name: 'Brands', icon: <BarChart2 />, href: '/investor-brands' },
    { name: 'Profile', icon: <CircleUser />, href: '/investor-profile' },
];

const Sidebar = ({ onLogout }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);
    const handleMobileToggle = () => setIsMobileOpen(!isMobileOpen);

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('investor_session');
        onLogout();
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if(window.innerWidth > 768) setIsMobileOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
        {/* Hamburger for mobile */}
        {isMobile && (
            <button className="mobile-hamburger" onClick={handleMobileToggle}>
                {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        )}

        <motion.aside 
            className={`sidebar ${isOpen ? 'open' : 'closed'} ${isMobile && isMobileOpen ? 'mobile-open' : ''}`}
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
        >
            {/* Sidebar Header */}
            <div className="sidebar-header">
                <Briefcase size={32} className="logo-icon" />
                {isOpen && <h1 className="logo-title">Welcome, {userData.name}</h1>}
            </div>

            {/* Toggle Button inside sidebar */}
            {!isMobile && (
            <button className="sidebar-toggle-btn" onClick={handleToggle}>
                <Menu size={20} />
                {isOpen && <span className="toggle-text">{isOpen ? 'Collapse' : 'Expand'}</span>}
            </button>
            )}

            {/* Navigation */}
            <nav className="sidebar-nav">
                <ul>
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <a href={item.href} className="nav-link">
                                {item.icon}
                                {isOpen && <span className="nav-link-text">{item.name}</span>}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer */}
            <div className="sidebar-footer">
                <a href="#settings" className="nav-link">
                    <Settings />
                    {isOpen && <span className="nav-link-text">Settings</span>}
                </a>
                <a href="#" className="nav-link logout-link" onClick={handleLogout}>
                    <LogOut />
                    {isOpen && <span className="nav-link-text">Logout</span>}
                </a>
            </div>
        </motion.aside>

        {/* Floating Logout Button for Mobile */}
        {isMobile && (
            <button 
                className="mobile-logout-btn"
                onClick={handleLogout}
            >
                <LogOut />
            </button>
        )}
        </>
    );
};

export default Sidebar;
