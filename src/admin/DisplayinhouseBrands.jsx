import React, { useState, useEffect } from "react";
import "./BrandInquiries.css";
import Sidebar from "./Sidebar";
import { getApiUrl } from "../utils/api";

export default function InquiryTable() {
  const [inquiries, setInquiries] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [saving, setSaving] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Upload Excel
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Assign feature
  const [assigningId, setAssigningId] = useState(null);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [assigning, setAssigning] = useState(false);

  // Master/Category/Subcategory states
  const [masterCategories, setMasterCategories] = useState([]);
  const [categories, setCategories] = useState({});
  const [subCategories, setSubCategories] = useState({});

  const stageOptions = ["Prospecting", "Negotiation", "Closed Won", "Closed Lost"];
  const statusOptions = ["New", "Contacted", "Qualified", "Disqualified", "Working"];
  const productOptions = [
    { id: 1, name: "Sponsorship" },
    { id: 2, name: "Co Sponsorship" },
    { id: 3, name: "Title Sponsor" },
    { id: 4, name: "Premium Stall" },
    { id: 5, name: "General Stall" },
    { id: 6, name: "Onboarding" },
    { id: 7, name: "FDP" },
    { id: 8, name: "MNR" },
    { id: 9, name: "Recruitment" },
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
    setAssigningId(null);
  };

  const handleInputChange = (id, field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleSave = async (id) => {
    try {
      setSaving(true);
      const payload = { id, ...editedData[id] };
      const res = await fetch(getApiUrl("update-inhouse-brand.php"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (res.ok && result.success) {
        alert(result.message || "Saved successfully");
        setInquiries(
          inquiries.map((inq) =>
            inq.id === id ? { ...inq, ...editedData[id] } : inq
          )
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

  // ===== Dropdown Fetchers =====
  useEffect(() => {
    const fetchMasterCategories = async () => {
      try {
        const res = await fetch(getApiUrl("get-master-category.php"));
        const data = await res.json();
        if (Array.isArray(data)) {
          setMasterCategories(data.filter((cat) => cat.is_deleted === "0"));
        }
      } catch (err) {
        console.error("Error fetching master categories:", err);
      }
    };
    fetchMasterCategories();
  }, []);

  const fetchCategories = async (masCatId) => {
    if (!masCatId || categories[masCatId]) return categories[masCatId] || [];
    try {
      const res = await fetch(getApiUrl(
        `get-category.php?mas_cat_id=${masCatId}`
      ));
      const data = await res.json();
      setCategories((prev) => ({ ...prev, [masCatId]: data }));
      return data;
    } catch (err) {
      console.error("Error fetching categories:", err);
      return [];
    }
  };

  const fetchSubCategories = async (catId) => {
    if (!catId || subCategories[catId]) return;
    try {
      const res = await fetch(getApiUrl(
        `get-sub-category.php?cat_id=${catId}`
      ));
      const data = await res.json();
      setSubCategories((prev) => ({ ...prev, [catId]: data }));
    } catch (err) {
      console.error("Error fetching subcategories:", err);
    }
  };

  useEffect(() => {
    const fetchAllDropdownData = async () => {
      if (expandedId) {
        const currentInquiry = inquiries.find((inq) => inq.id === expandedId);
        if (currentInquiry && currentInquiry.masterCategory) {
          const master = masterCategories.find(
            (m) => m.mas_cat_name === currentInquiry.masterCategory
          );
          if (master) {
            const fetchedCategories = await fetchCategories(master.mas_cat_id);
            if (currentInquiry.category) {
              const category = fetchedCategories.find(
                (c) => c.cat_name === currentInquiry.category
              );
              if (category) await fetchSubCategories(category.cat_id);
            }
          }
        }
      }
    };
    fetchAllDropdownData();
  }, [expandedId, inquiries, masterCategories]);

  const renderEditableField = (id, key, value) => {
    const currentValue = editedData[id]?.[key] ?? value ?? "";

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
    if (key === "product") {
      return (
        <select
          value={currentValue}
          onChange={(e) => handleInputChange(id, key, e.target.value)}
        >
          <option value="">Select Product</option>
          {productOptions.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      );
    }
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
    if (key === "status") {
      return (
        <select
          value={currentValue}
          onChange={(e) => handleInputChange(id, key, e.target.value)}
        >
          <option value="">Select Status</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      );
    }

    if (key === "masterCategory") {
      return (
        <select
          value={currentValue}
          onChange={(e) => {
            const selectedName = e.target.value;
            const selected = masterCategories.find(
              (cat) => cat.mas_cat_name === selectedName
            );
            handleInputChange(id, key, selectedName);
            handleInputChange(id, "category", "");
            handleInputChange(id, "subCategory", "");
            if (selected) fetchCategories(selected.mas_cat_id);
          }}
        >
          <option value="">Select Master Category</option>
          {masterCategories.map((cat) => (
            <option key={cat.mas_cat_id} value={cat.mas_cat_name}>
              {cat.mas_cat_name}
            </option>
          ))}
        </select>
      );
    }

    if (key === "category") {
      const masterName =
        editedData[id]?.masterCategory ||
        inquiries.find((inq) => inq.id === id)?.masterCategory ||
        "";
      const master = masterCategories.find((m) => m.mas_cat_name === masterName);
      const categoryList = master ? categories[master.mas_cat_id] || [] : [];

      return (
        <select
          value={currentValue}
          onChange={(e) => {
            const selectedName = e.target.value;
            const selected = categoryList.find(
              (cat) => cat.cat_name === selectedName
            );
            handleInputChange(id, key, selectedName);
            handleInputChange(id, "subCategory", "");
            if (selected) fetchSubCategories(selected.cat_id);
          }}
          disabled={!master}
        >
          <option value="">Select Category</option>
          {categoryList.map((cat) => (
            <option key={cat.cat_id} value={cat.cat_name}>
              {cat.cat_name}
            </option>
          ))}
        </select>
      );
    }

    if (key === "subCategory") {
      const categoryName =
        editedData[id]?.category ||
        inquiries.find((inq) => inq.id === id)?.category ||
        "";
      const masterName =
        editedData[id]?.masterCategory ||
        inquiries.find((inq) => inq.id === id)?.masterCategory ||
        "";

      const master = masterCategories.find((m) => m.mas_cat_name === masterName);
      const categoryList = master ? categories[master.mas_cat_id] || [] : [];
      const category = categoryList.find((c) => c.cat_name === categoryName);
      const subCatList = category ? subCategories[category.cat_id] || [] : [];

      return (
        <select
          value={currentValue}
          onChange={(e) => handleInputChange(id, key, e.target.value)}
          disabled={!category}
        >
          <option value="">Select Subcategory</option>
          {subCatList.map((sub) => (
            <option key={sub.subcat_id} value={sub.subcat_name}>
              {sub.subcat_name}
            </option>
          ))}
        </select>
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

  // ===== Assign Feature =====
  const handleAssignClick = async (id) => {
    setAssigningId(id);
    setSelectedUser("");
    try {
      const res = await fetch(getApiUrl("get-user-name.php"));
      const result = await res.json();
      if (result.success) {
        setUserList(result.data);
      } else {
        alert("Failed to fetch users");
      }
    } catch (err) {
      console.error("Assign fetch error:", err);
      alert("Error fetching users");
    }
  };

  const handleConfirmAssign = async () => {
    if (!selectedUser) return alert("Please select a user first");
    try {
      setAssigning(true);
      const payload = { inquiry_id: assigningId, user_id: selectedUser };
      const res = await fetch(getApiUrl("assign-inquiry.php"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (res.ok && result.success) {
        alert(result.message || "Assigned successfully");
        setInquiries(
          inquiries.map((inq) =>
            inq.id === assigningId ? { ...inq, assignedUserId: selectedUser } : inq
          )
        );
        setAssigningId(null);
        setSelectedUser("");
      } else alert(result.message || "Failed to assign");
    } catch (err) {
      console.error("Assign error:", err);
      alert("Something went wrong while assigning.");
    } finally {
      setAssigning(false);
    }
  };

  // ===== File Upload =====
  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleUpload = async () => {
    if (!file) return alert("Please select an Excel file first.");
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(getApiUrl("upload-inhouse-brands.php"), {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      alert(result.message);

      if (result.success) {
        const userId = localStorage.getItem("adminId");
        const res2 = await fetch(getApiUrl(`get-inhouse-brands.php?user_id=${userId}`));
        const data = await res2.json();
        setInquiries(data);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading file.");
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  // ===== Initial Fetch Inquiries =====
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const userId = localStorage.getItem("adminId");
        const res = await fetch(getApiUrl(`get-inhouse-brands.php?user_id=${userId}`));
        const data = await res.json();
        setInquiries(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch inquiries.");
        setLoading(false);
      }
    };
    fetchInquiries();
  }, []);

  // ===== Pagination Logic (Simplified) =====
  const totalPages = Math.ceil(inquiries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = inquiries.slice(startIndex, startIndex + itemsPerPage);

  // New, simple function to generate page numbers
  const getPaginationNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };
  
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <h2 className="table-title">Inhouse Brands</h2>

        {localStorage.getItem("adminId") === "1" && (
          <div className="upload-box">
            <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading} className="upload-btn">
              {uploading ? "Uploading..." : "Upload Excel"}
            </button>
          </div>
        )}

        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}

        {!loading && !error && (
          <div className="table-wrapper">
            <table className="inquiry-table">
              <thead>
                <tr>
                  <th className="id-col">ID</th>
                  <th>Brand Name</th>
                  <th>Owner Name</th>
                  <th>Contact Person</th>
                  <th className="phone-col">Contact Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((inquiry) => (
                  <React.Fragment key={inquiry.id}>
                    <tr className={`summary-row ${expandedId === inquiry.id ? "expanded-row" : ""}`}>
                      <td className="id-col">{inquiry.id}</td>
                      <td>{inquiry.brandName}</td>
                      <td>{inquiry.ownerName}</td>
                      {/* FIX: Use the correct keys from the API */}
                      <td>{inquiry.contactPersonName}</td>
                      <td className="phone-col">{inquiry.contactPersonNumber}</td>
                      <td>
                        <button onClick={() => toggleExpand(inquiry.id)} className="expand-btn">
                          {expandedId === inquiry.id ? "Hide Details" : "View Details"}
                        </button>
                        {localStorage.getItem("adminId") === "1" && (
                          <button onClick={() => handleAssignClick(inquiry.id)} className="assign-btn">
                            Assign
                          </button>
                        )}
                      </td>
                    </tr>

                    {expandedId === inquiry.id && (
                      <tr className="details-row">
                        <td colSpan="6">
                          <div className="details-box">
                            {assigningId === inquiry.id && userList.length > 0 && (
                              <div className="assign-box">
                                <label>
                                  Assign to:
                                  <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                                    <option value="">Select User</option>
                                    {userList.map((user) => (
                                      <option key={user.id} value={user.id}>
                                        {user.name}
                                      </option>
                                    ))}
                                  </select>
                                </label>
                                <button onClick={handleConfirmAssign} className="confirm-btn" disabled={assigning}>
                                  {assigning ? "Assigning..." : "Confirm"}
                                </button>
                              </div>
                            )}

                            <div className="details-grid">
                              {Object.keys(inquiry).map((key) => {
                                // FIX: Exclude the correct keys from the expanded view
                                if (["id", "brandName", "ownerName", "contactPerson", "contactNumber"].includes(key)) return null;
                                return (
                                  <div className="detail-item" key={key}>
                                    <label>{key}:</label>
                                    {renderEditableField(inquiry.id, key, inquiry[key])}
                                  </div>
                                );
                              })}
                            </div>

                            <button className="save-btn" onClick={() => handleSave(inquiry.id)} disabled={saving}>
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

            {/* ===== Pagination ===== */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                {/* Use the new, simple getPaginationNumbers function */}
                {getPaginationNumbers().map((page) => (
                  <button
                    key={page}
                    className={currentPage === page ? "active" : ""}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


// import React, { useState, useEffect } from "react";
// import "./BrandInquiries.css";
// import Sidebar from "./Sidebar";
// import { getApiUrl } from "../utils/api";

// export default function InvestorInquiryTable() {
//   const [investors, setInvestors] = useState([]);
//   const [expandedId, setExpandedId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editId, setEditId] = useState(null);
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
//     setEditId(null);
//     setEditedData({});
//     setAssigningId(null);
//   };

//   const handleEditClick = (investor) => {
//     setEditId(investor.id);
//     setEditedData({});
//   };

//   const handleInputChange = (field, value) => {
//     setEditedData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSave = async (id) => {
//     try {
//       setSaving(true);
//       const payload = { id, ...editedData };
//       const res = await fetch(getApiUrl("update-inhouse-investor.php"), {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const result = await res.json();

//       if (res.ok && result.success) {
//         alert(result.message || "Saved successfully");
//         setInvestors(
//           investors.map((inv) => (inv.id === id ? { ...inv, ...editedData } : inv))
//         );
//         setEditId(null);
//         setEditedData({});
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

//   const isEditable = (value) => {
//     return value === null || value === "" || value === "0" || value === 0;
//   };

//   const renderEditableField = (key, value) => {
//     if (!isEditable(value) && key !== "stage") return value || "N/A";

//     if (key === "stage") {
//       return (
//         <select
//           value={editedData[key] ?? value ?? ""}
//           onChange={(e) => handleInputChange(key, e.target.value)}
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
//           value={editedData[key] ?? ""}
//           onChange={(e) => handleInputChange(key, e.target.value)}
//         />
//       );
//     }

//     if (key.toLowerCase().includes("time")) {
//       return (
//         <input
//           type="time"
//           value={editedData[key] ?? ""}
//           onChange={(e) => handleInputChange(key, e.target.value)}
//         />
//       );
//     }

//     return (
//       <input
//         type="text"
//         value={editedData[key] ?? ""}
//         onChange={(e) => handleInputChange(key, e.target.value)}
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
//             inv.id === assigningId ? { ...inv, assignedUserId: selectedUser } : inv
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
//       const res = await fetch(getApiUrl(`get-inhouse-brands.php?user_id=${userId}`));
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
//         fetchInvestors(); // Refresh table
//       } else {
//         alert(result.message || "Upload failed");
//       }
//     } catch (err) {
//       console.error("Excel upload error:", err);
//       alert("Something went wrong while uploading Excel.");
//     } finally {
//       setUploading(false);
//       e.target.value = ""; // reset file input
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
//                         <button
//                           onClick={() => handleEditClick(inv)}
//                           className="edit-btn"
//                           style={{ marginLeft: "5px" }}
//                         >
//                           Edit
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
//                               <div className="assign-box field">
//                                 <label>
//                                   Assign to:
//                                   <select
//                                     value={selectedUser}
//                                     onChange={(e) => setSelectedUser(e.target.value)}
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
//                                   style={{ marginTop: "10px" }}
//                                 >
//                                   {assigning ? "Assigning..." : "Confirm"}
//                                 </button>
//                               </div>
//                             )}

//                             {editId === inv.id ? (
//                               <>
//                                 {Object.keys(inv).map((key) => {
//                                   if (key === "id") return null;
//                                   const value = inv[key];
//                                   return (
//                                     <div key={key} className="field">
//                                       <strong>{key}:</strong>
//                                       {renderEditableField(key, value)}
//                                     </div>
//                                   );
//                                 })}
//                                 <div className="field full-width">
//                                   <button
//                                     onClick={() => handleSave(inv.id)}
//                                     className="save-btn"
//                                     disabled={saving}
//                                   >
//                                     {saving ? "Saving..." : "Save"}
//                                   </button>
//                                 </div>
//                               </>
//                             ) : (
//                               <>
//                                 <div className="field">
//                                   <strong>Master Category:</strong>
//                                   {inv.masterCategoryName || "N/A"}
//                                 </div>
//                                 <div className="field">
//                                   <strong>State / City:</strong>
//                                   {inv.stateName}, {inv.cityName}
//                                 </div>
//                                 <div className="field">
//                                   <strong>Call Date & Time:</strong>
//                                   {inv.call_date || "N/A"} {inv.call_time || ""}
//                                 </div>
//                                 <div className="field">
//                                   <strong>Call Remark:</strong>
//                                   {inv.call_remark || "N/A"}
//                                 </div>
//                                 <div className="field">
//                                   <strong>Meeting Date & Time:</strong>
//                                   {inv.meeting_date || "N/A"} {inv.meeting_time || ""}
//                                 </div>
//                                 <div className="field">
//                                   <strong>Meeting Remark:</strong>
//                                   {inv.meeting_remark || "N/A"}
//                                 </div>
//                                 <div className="field">
//                                   <strong>Final Remark:</strong>
//                                   {inv.final_remark || "N/A"}
//                                 </div>
//                               </>
//                             )}
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
