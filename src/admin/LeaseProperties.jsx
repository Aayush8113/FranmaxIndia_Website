// import React, { useEffect, useState } from 'react';
// import './LeaseProperties.css';
// import Sidebar from './Sidebar';
// import { getApiUrl } from '../utils/api';

// const LeaseProperties = () => {
//     // State to hold the fetched data
//     const [properties, setProperties] = useState([]);
//     // State to manage which row's details are expanded
//     const [expandedRowId, setExpandedRowId] = useState(null);
//     // State to handle loading and errors
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Fetch data from the API on component mount
//     useEffect(() => {
//         const apiUrl = getApiUrl('get-lease-properties.php');

//         fetch(apiUrl)
//             .then(res => {
//                 if (!res.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return res.json();
//             })
//             .then(data => {
//                 if (data.status === "success" && Array.isArray(data.data)) {
//                     setProperties(data.data);
//                 } else {
//                     setProperties([]);
//                 }
//             })
//             .catch(err => {
//                 console.error("Error fetching lease properties:", err);
//                 setError(err.message);
//             })
//             .finally(() => {
//                 setIsLoading(false);
//             });
//     }, []);

//     // Function to toggle the expanded details of a row
//     const toggleDetails = (propertyKey) => {
//         setExpandedRowId(expandedRowId === propertyKey ? null : propertyKey);
//     };

//     return (
//         <div className="lease-properties-page">
//             <Sidebar />
//             <div className="lease-properties-content">
//                 <h2 className="lease-properties-title">Lease Property Inquiries</h2>
                
//                 {isLoading ? (
//                     <div className="text-center text-lg text-gray-500">Loading...</div>
//                 ) : error ? (
//                     <div className="text-center text-lg text-red-500">Error: {error}</div>
//                 ) : (
//                     <div className="lease-properties-table-wrapper">
//                         <table className="lease-properties-table">
//                             <thead>
//                                 <tr>
//                                     <th>#</th>
//                                     <th>Owner Name</th>
//                                     <th>Contact</th>
//                                     <th>Expected Rent</th>
//                                     <th>Property Type</th>
//                                     <th>View Details</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {properties.length > 0 ? (
//                                     properties.map((prop, idx) => (
//                                         <React.Fragment key={prop.property_key}>
//                                             <tr className="hover:bg-gray-100 transition-colors duration-200">
//                                                 <td>{idx + 1}</td>
//                                                 <td>{prop.owner_name}</td>
//                                                 <td>{prop.contact}</td>
//                                                 <td>₹{prop.expected_rent}</td>
//                                                 <td>{prop.property_type}</td>
//                                                 <td>
//                                                     <button 
//                                                         onClick={() => toggleDetails(prop.property_key)}
//                                                         className="details-toggle-button"
//                                                     >
//                                                         {expandedRowId === prop.property_key ? 'Hide Details' : 'View Details'}
//                                                     </button>
//                                                 </td>
//                                             </tr>
//                                             {expandedRowId === prop.property_key && (
//                                                 <tr className="detailed-row">
//                                                     <td colSpan="6" className="p-4">
//                                                         <div className="detailed-content">
//                                                             <p><strong>Email:</strong> {prop.email}</p>
//                                                             <p><strong>Address:</strong> {prop.address}</p>
//                                                             <p><strong>SQFT:</strong> {prop.sqft}</p>
//                                                             <p><strong>Floor Type:</strong> {prop.floor_type}</p>
//                                                             <p><strong>State:</strong> {prop.state_name}</p>
//                                                             <p><strong>City:</strong> {prop.city_name}</p>
//                                                             <p><strong>Message:</strong> {prop.message}</p>
//                                                             <p><strong>Created At:</strong> {prop.created_at}</p>
//                                                         </div>
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </React.Fragment>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="6" className="text-center py-4 text-gray-500">No lease properties found.</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default LeaseProperties;











import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FaPlusCircle, FaUserTie } from 'react-icons/fa'; // Added FaUserTie
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from './Sidebar';
import AssignModal from './AssignModal';
import './InvestorPage.css';
import './DashboardLayout.css';
// import './InvestorTable.css'; // Ensure correct CSS file

import { getApiUrl } from '../utils/api';

export default function InvestorTable() {
    const [investors, setInvestors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedInvestor, setSelectedInvestor] = useState(null);

    const fetchInvestors = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(getApiUrl('get-generic-inquiries.php'));
            const result = await response.json();
            if (result.success) {
                setInvestors(result.data);
                setError(null);
            } else {
                toast.error(result.message || 'Failed to fetch inquiries.');
                setError(result.message);
            }
        } catch (e) {
            toast.error('Network error. Please check your server connection.');
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchInvestors();
    }, [fetchInvestors]);

    const openAssignModal = (investor) => {
        setSelectedInvestor(investor);
        setShowAssignModal(true);
    };

    const closeAssignModal = () => {
        setSelectedInvestor(null);
        setShowAssignModal(false);
    };

    const handleAssignmentSuccess = () => {
        toast.success("Investor Assigned Successfully!");
        fetchInvestors();
        closeAssignModal();
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <ToastContainer position="top-right" autoClose={3000} />
                <div className="investor-table-container">
                    <div className="table-header">
                        <h2 className="table-title">All Inquiries</h2>
                    </div>
                    {loading ? (
                        <div className="loading">Loading inquiries...</div>
                    ) : error ? (
                        <div className="error">Error: {error}</div>
                    ) : investors.length === 0 ? (
                        <div className="no-data">No Inquiries found.</div>
                    ) : (
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Person Name</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>State</th>
                                        <th>City</th>
                                        <th>Message</th>
                                        <th>Assign</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {investors.map((inv) => (
                                        <tr key={inv.id}>
                                            <td data-label="Person Name">{inv.name}</td>
                                            <td data-label="Phone">{inv.phone}</td>
                                            <td data-label="Email">{inv.email}</td>
                                            <td data-label="State">{inv.state_name}</td>
                                            <td data-label="City">{inv.city_name}</td>
                                            <td data-label="Message">{inv.message}</td>
                                            <td data-label="Assign">
                                                <button
                                                    className="assign-btn"
                                                    onClick={() => openAssignModal(inv)}
                                                >
                                                    <FaUserTie className="assign-icon" />
                                                    <span className="assign-text">Assign</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                {showAssignModal && (
                    <AssignModal
                        investor={selectedInvestor}
                        onClose={closeAssignModal}
                        onAssign={handleAssignmentSuccess}
                    />
                )}
            </div>
        </div>
    );
}
