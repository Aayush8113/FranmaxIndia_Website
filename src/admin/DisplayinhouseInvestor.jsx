// import React, { useState, useEffect } from "react";
// import "./BrandInquiries.css";
// import Sidebar from "./Sidebar";
// import { getApiUrl } from "../utils/api";

// export default function InvestorInquiryTable() {
//   const [investors, setInvestors] = useState([]);
//   const [expandedId, setExpandedId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editedData, setEditedData] = useState({});
//   const [saving, setSaving] = useState(false);

//   // Assign feature
//   const [assigningId, setAssigningId] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState("");
//   const [assigning, setAssigning] = useState(false);

//   // Upload Excel
//   const [uploading, setUploading] = useState(false);

//   const stageOptions = [
//     "Contacted",
//     "Qualified",
//     "Disqualified",
//     "Working",
//     "Prospecting",
//     "Negotiation",
//     "Closed Won",
//     "Closed Lost",
//   ];

//   const toggleExpand = (id) => {
//     setExpandedId(expandedId === id ? null : id);
//     setAssigningId(null);
//   };

//   const handleInputChange = (id, field, value) => {
//     setEditedData((prev) => ({
//       ...prev,
//       [id]: { ...prev[id], [field]: value },
//     }));
//   };

//   const handleSave = async (id) => {
//     try {
//       setSaving(true);
//       const payload = { id, ...editedData[id] };
//       const res = await fetch(getApiUrl("update-inhouse-investor.php"), {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const result = await res.json();

//       if (res.ok && result.success) {
//         alert(result.message || "Saved successfully");
//         setInvestors(
//           investors.map((inv) =>
//             inv.id === id ? { ...inv, ...editedData[id] } : inv
//           )
//         );
//         setEditedData((prev) => {
//           const copy = { ...prev };
//           delete copy[id];
//           return copy;
//         });
//       } else {
//         alert(result.message || "Failed to save data");
//       }
//     } catch (err) {
//       console.error("Save error:", err);
//       alert("Something went wrong while saving.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const renderEditableField = (id, key, value) => {
//     const currentValue = editedData[id]?.[key] ?? value ?? "";

//     if (key === "stage") {
//       return (
//         <select
//           value={currentValue}
//           onChange={(e) => handleInputChange(id, key, e.target.value)}
//         >
//           <option value="">Select Stage</option>
//           {stageOptions.map((stage) => (
//             <option key={stage} value={stage}>
//               {stage}
//             </option>
//           ))}
//         </select>
//       );
//     }

//     if (key.toLowerCase().includes("date")) {
//       return (
//         <input
//           type="date"
//           value={currentValue}
//           onChange={(e) => handleInputChange(id, key, e.target.value)}
//         />
//       );
//     }

//     if (key.toLowerCase().includes("time")) {
//       return (
//         <input
//           type="time"
//           value={currentValue}
//           onChange={(e) => handleInputChange(id, key, e.target.value)}
//         />
//       );
//     }

//     return (
//       <input
//         type="text"
//         value={currentValue}
//         onChange={(e) => handleInputChange(id, key, e.target.value)}
//       />
//     );
//   };

//   const fetchUsers = async () => {
//     try {
//       const res = await fetch(getApiUrl("get-user-name.php"));
//       const json = await res.json();
//       setUsers(json.data || []);
//     } catch (err) {
//       console.error("Failed to fetch users", err);
//       setUsers([]);
//     }
//   };

//   const handleAssignClick = (id) => {
//     setAssigningId(id);
//     setSelectedUser("");
//     fetchUsers();
//   };

//   const handleConfirmAssign = async () => {
//     if (!selectedUser) {
//       alert("Please select a user first");
//       return;
//     }
//     try {
//       setAssigning(true);
//       const payload = { investor_id: assigningId, user_id: selectedUser };
//       const res = await fetch(getApiUrl("assign-inhouse-investor.php"), {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const result = await res.json();
//       if (res.ok && result.success) {
//         alert(result.message || "Assigned successfully");
//         setInvestors(
//           investors.map((inv) =>
//             inv.id === assigningId
//               ? { ...inv, assignedUserId: selectedUser }
//               : inv
//           )
//         );
//         setAssigningId(null);
//         setSelectedUser("");
//       } else {
//         alert(result.message || "Failed to assign");
//       }
//     } catch (err) {
//       console.error("Assign error:", err);
//       alert("Something went wrong while assigning.");
//     } finally {
//       setAssigning(false);
//     }
//   };

//   const fetchInvestors = async () => {
//     try {
//       const userId = localStorage.getItem("adminId") || 0;
//       const res = await fetch(
//         getApiUrl(`get-inhouse-investors.php?user_id=${userId}`)
//       );
//       const data = await res.json();
//       setInvestors(data);
//       setLoading(false);
//     } catch (err) {
//       setError("Failed to fetch investors.");
//       setLoading(false);
//     }
//   };

//   const handleExcelUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setUploading(true);
//       const res = await fetch(getApiUrl("upload-investors-excel.php"), {
//         method: "POST",
//         body: formData,
//       });
//       const result = await res.json();

//       if (res.ok && result.success) {
//         alert("Excel uploaded successfully!");
//         fetchInvestors();
//       } else {
//         alert(result.message || "Upload failed");
//       }
//     } catch (err) {
//       console.error("Excel upload error:", err);
//       alert("Something went wrong while uploading Excel.");
//     } finally {
//       setUploading(false);
//       e.target.value = "";
//     }
//   };

//   useEffect(() => {
//     fetchInvestors();
//   }, []);

//   return (
//     <div className="dashboard-container">
//       <Sidebar />
//       <div className="main-content">
//         <h2 className="table-title">Investor Inquiries</h2>

//         <div style={{ marginBottom: "15px" }}>
//           <label className="upload-label">
//             Upload Excel:
//             <input
//               type="file"
//               accept=".xlsx,.xls"
//               onChange={handleExcelUpload}
//               disabled={uploading}
//               style={{ marginLeft: "10px" }}
//             />
//           </label>
//           {uploading && <span style={{ marginLeft: "10px" }}>Uploading...</span>}
//         </div>

//         {loading && <div className="loading">Loading...</div>}
//         {error && <div className="error">{error}</div>}

//         {!loading && !error && (
//           <div className="table-wrapper">
//             <table className="inquiry-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Contact</th>
//                   <th>Email</th>
//                   <th>Investment Budget</th>
//                   <th>Stage</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {investors.map((inv) => (
//                   <React.Fragment key={inv.id}>
//                     <tr className="summary-row">
//                       <td>{inv.id}</td>
//                       <td>{inv.name}</td>
//                       <td>{inv.contact}</td>
//                       <td>{inv.email}</td>
//                       <td>{inv.investment_budget || "N/A"}</td>
//                       <td>{inv.stage || "N/A"}</td>
//                       <td>
//                         <button
//                           onClick={() => toggleExpand(inv.id)}
//                           className="expand-btn"
//                         >
//                           {expandedId === inv.id ? "Hide Details" : "View Details"}
//                         </button>
//                         {localStorage.getItem("adminId") === "1" && (
//                           <button
//                             onClick={() => handleAssignClick(inv.id)}
//                             className="assign-btn"
//                             style={{ marginLeft: "5px" }}
//                           >
//                             Assign
//                           </button>
//                         )}
//                       </td>
//                     </tr>

//                     {expandedId === inv.id && (
//                       <tr className="details-row">
//                         <td colSpan="7">
//                           <div className="details-box">
//                             {assigningId === inv.id && users.length > 0 && (
//                               <div className="assign-box">
//                                 <label>
//                                   Assign to:{" "}
//                                   <select
//                                     value={selectedUser}
//                                     onChange={(e) =>
//                                       setSelectedUser(e.target.value)
//                                     }
//                                   >
//                                     <option value="">Select User</option>
//                                     {users.map((user) => (
//                                       <option key={user.id} value={user.id}>
//                                         {user.name}
//                                       </option>
//                                     ))}
//                                   </select>
//                                 </label>
//                                 <button
//                                   onClick={handleConfirmAssign}
//                                   className="confirm-btn"
//                                   disabled={assigning}
//                                   style={{ marginLeft: "10px" }}
//                                 >
//                                   {assigning ? "Assigning..." : "Confirm"}
//                                 </button>
//                               </div>
//                             )}

//                             {/* Always editable fields */}
//                             <>
//                               {Object.keys(inv).map((key) => {
//                                 if (key === "id") return null;
//                                 const value = inv[key];
//                                 return (
//                                   <p key={key}>
//                                     <strong>{key}:</strong>{" "}
//                                     {renderEditableField(inv.id, key, value)}
//                                   </p>
//                                 );
//                               })}
//                               <button
//                                 onClick={() => handleSave(inv.id)}
//                                 className="save-btn"
//                                 disabled={saving}
//                               >
//                                 {saving ? "Saving..." : "Save"}
//                               </button>
//                             </>
//                           </div>
//                         </td>
//                       </tr>
//                     )}
//                   </React.Fragment>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


















import React, { useState, useEffect } from "react";
import "./BrandInquiries.css";
import Sidebar from "./Sidebar";
import { getApiUrl } from "../utils/api";

export default function InvestorInquiryTable() {
  const [investors, setInvestors] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [saving, setSaving] = useState(false);

  // Assign feature
  const [assigningId, setAssigningId] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [assigning, setAssigning] = useState(false);

  // Upload Excel
  const [uploading, setUploading] = useState(false);

  // 🔹 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const stageOptions = [
    "Contacted",
    "Qualified",
    "Disqualified",
    "Working",
    "Prospecting",
    "Negotiation",
    "Closed Won",
    "Closed Lost",
  ];

  /** Toggle expand row */
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
    setAssigningId(null);
  };

  /** Track input changes */
  const handleInputChange = (id, field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  /** Save updates */
  const handleSave = async (id) => {
    try {
      setSaving(true);
      const payload = { id, ...editedData[id] };

      const res = await fetch(getApiUrl("update-inhouse-investor.php"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        alert(result.message || "Saved successfully");
        setInvestors((prev) =>
          prev.map((inv) => (inv.id === id ? { ...inv, ...editedData[id] } : inv))
        );
        setEditedData((prev) => {
          const copy = { ...prev };
          delete copy[id];
          return copy;
        });
      } else {
        alert(result.message || "Failed to save data");
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Something went wrong while saving.");
    } finally {
      setSaving(false);
    }
  };

  /** Editable field renderer */
  const renderEditableField = (id, key, value) => {
    const currentValue = editedData[id]?.[key] ?? value ?? "";

    if (key === "stage") {
      return (
        <select
          value={currentValue}
          onChange={(e) => handleInputChange(id, key, e.target.value)}
        >
          <option value="">Select Stage</option>
          {stageOptions.map((stage) => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </select>
      );
    }

    if (key.toLowerCase().includes("date")) {
      return (
        <input
          type="date"
          value={currentValue}
          onChange={(e) => handleInputChange(id, key, e.target.value)}
        />
      );
    }

    if (key.toLowerCase().includes("time")) {
      return (
        <input
          type="time"
          value={currentValue}
          onChange={(e) => handleInputChange(id, key, e.target.value)}
        />
      );
    }

    return (
      <input
        type="text"
        value={currentValue}
        onChange={(e) => handleInputChange(id, key, e.target.value)}
      />
    );
  };

  /** Fetch users for assigning */
  const fetchUsers = async () => {
    try {
      const res = await fetch(getApiUrl("get-user-name.php"));
      const json = await res.json();
      setUsers(json?.data || []);
    } catch (err) {
      console.error("Failed to fetch users", err);
      setUsers([]);
    }
  };

  /** Assign click handler */
  const handleAssignClick = (id) => {
    setAssigningId(id);
    setSelectedUser("");
    fetchUsers();
  };

  /** Confirm assign */
  const handleConfirmAssign = async () => {
    if (!selectedUser) {
      alert("Please select a user first");
      return;
    }
    try {
      setAssigning(true);
      const payload = { investor_id: assigningId, user_id: selectedUser };

      const res = await fetch(getApiUrl("assign-inhouse-investor.php"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        alert(result.message || "Assigned successfully");
        setInvestors((prev) =>
          prev.map((inv) =>
            inv.id === assigningId ? { ...inv, assignedUserId: selectedUser } : inv
          )
        );
        setAssigningId(null);
        setSelectedUser("");
      } else {
        alert(result.message || "Failed to assign");
      }
    } catch (err) {
      console.error("Assign error:", err);
      alert("Something went wrong while assigning.");
    } finally {
      setAssigning(false);
    }
  };

  /** Fetch investors */
  const fetchInvestors = async () => {
    try {
      const userId = localStorage.getItem("adminId") || 0;
      const res = await fetch(
        getApiUrl(`get-inhouse-investors.php?user_id=${userId}`)
      );
      const data = await res.json();
      setInvestors(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error("Investor fetch error:", err);
      setError("Failed to fetch investors.");
      setLoading(false);
    }
  };

  /** Upload Excel */
  const handleExcelUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await fetch(getApiUrl("upload-investors-excel.php"), {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (res.ok && result.success) {
        alert("Excel uploaded successfully!");
        fetchInvestors();
      } else {
        alert(result.message || "Upload failed");
      }
    } catch (err) {
      console.error("Excel upload error:", err);
      alert("Something went wrong while uploading Excel.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  /** Initial load */
  useEffect(() => {
    fetchInvestors();
  }, []);

  // 🔹 Pagination slice
  const totalPages = Math.ceil(investors.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentInvestors = investors.slice(indexOfFirst, indexOfLast);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <h2 className="table-title">Investor Inquiries</h2>

        {/* Excel Upload */}
        {localStorage.getItem("adminId")=="1" && (
          <div className="upload-box">
            <label className="upload-label">
              Upload Excel:
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleExcelUpload}
                disabled={uploading}
              />
            </label>
            {uploading && <span className="uploading-text">Uploading...</span>}
          </div>
        )}

        {/* Loading / Error */}
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}

        {/* Table */}
        {!loading && !error && (
          <>
            <div className="table-wrapper">
              <table className="inquiry-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Investment Budget</th>
                    <th>Stage</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentInvestors.map((inv) => (
                    <React.Fragment key={inv.id}>
                      {/* Summary Row */}
                      <tr className="summary-row">
                        <td>{inv.id}</td>
                        <td>{inv.name}</td>
                        <td>{inv.contact}</td>
                        <td>{inv.email}</td>
                        <td>{inv.investment_budget || "N/A"}</td>
                        <td>{inv.stage || "N/A"}</td>
                        <td>
                          <button
                            onClick={() => toggleExpand(inv.id)}
                            className="expand-btn"
                          >
                            {expandedId === inv.id ? "Hide Details" : "View Details"}
                          </button>
                          {localStorage.getItem("adminId") === "1" && (
                            <button
                              onClick={() => handleAssignClick(inv.id)}
                              className="assign-btn"
                            >
                              Assign
                            </button>
                          )}
                        </td>
                      </tr>

                      {/* Expanded Details Row */}
                      {expandedId === inv.id && (
                        <tr className="details-row">
                          <td colSpan="7">
                            <div className="details-box">
                              {/* Assign User */}
                              {assigningId === inv.id && users.length > 0 && (
                                <div className="assign-box">
                                  <label>
                                    Assign to:
                                    <select
                                      value={selectedUser}
                                      onChange={(e) => setSelectedUser(e.target.value)}
                                    >
                                      <option value="">Select User</option>
                                      {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                          {user.name}
                                        </option>
                                      ))}
                                    </select>
                                  </label>
                                  <button
                                    onClick={handleConfirmAssign}
                                    className="confirm-btn"
                                    disabled={assigning}
                                  >
                                    {assigning ? "Assigning..." : "Confirm"}
                                  </button>
                                </div>
                              )}

                              {/* Editable Fields */}
                              {Object.keys(inv).map((key) => {
                                if (key === "id") return null;
                                return (
                                  <p key={key}>
                                    <strong>{key}:</strong>{" "}
                                    {renderEditableField(inv.id, key, inv[key])}
                                  </p>
                                );
                              })}

                              <button
                                onClick={() => handleSave(inv.id)}
                                className="save-btn"
                                disabled={saving}
                              >
                                {saving ? "Saving..." : "Save"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 🔹 Pagination Controls */}
            {totalPages > 1 && (
              <div className="pagination-wrapper">
                {/* Rows per page */}
                <div className="rows-per-page">
                  <label htmlFor="rows">Rows per page:</label>
                  <select
                    id="rows"
                    value={rowsPerPage}
                    onChange={(e) => {
                      setRowsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>

                {/* Pagination */}
                <div className="pagination">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>

                  {(() => {
                    const pageNumbers = [];
                    if (totalPages <= 10) {
                      for (let i = 1; i <= totalPages; i++) {
                        pageNumbers.push(i);
                      }
                    } else {
                      let startPage = Math.max(2, currentPage - 2);
                      let endPage = Math.min(totalPages - 3, currentPage + 2);

                      pageNumbers.push(1);
                      if (startPage > 2) pageNumbers.push("...");

                      for (let i = startPage; i <= endPage; i++) {
                        pageNumbers.push(i);
                      }

                      if (endPage < totalPages - 3) pageNumbers.push("...");
                      for (let i = totalPages - 2; i <= totalPages; i++) {
                        pageNumbers.push(i);
                      }
                    }

                    return pageNumbers.map((num, idx) =>
                      num === "..." ? (
                        <span key={idx} className="dots">...</span>
                      ) : (
                        <button
                          key={num}
                          className={currentPage === num ? "active" : ""}
                          onClick={() => setCurrentPage(num)}
                        >
                          {num}
                        </button>
                      )
                    );
                  })()}

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>

                {/* Page info */}
                <div className="page-info">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
