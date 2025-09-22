import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DynamicForm.css";
import Sidebar from "./Sidebar";

function DynamicForm() {
  const [masterCategories, setMasterCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [products, setProducts] = useState([]);
    const stageOptions = ["Contacted", "Qualified", "Disqualified", "Working","Prospecting","Negotiation","Closed Won","Closed Lost"];

  const [formData, setFormData] = useState({
    masterCategory: "",
    category: "",
    subCategory: "",
    state: "",
    city: "",
    brandName: "",
    brandContact: "",
    ownerName: "",
    ownerContact: "",
    contactPersonName: "",
    contactPersonNumber: "",
    callDate: "",
    callTime: "",
    callRemark: "",
    meetingDate: "",
    meetingTime: "",
    meetingRemark: "",
    product: "",
    offerPrice: "",
    counterPrice: "",
    remark: "",
  });

  // Load master categories
  useEffect(() => {
    axios
      .get("http://localhost/react-api/get-master-category.php")
      .then((res) => {
        if (Array.isArray(res.data)) setMasterCategories(res.data);
      })
      .catch((err) => console.error("Error loading master categories:", err));
  }, []);

  // Load categories when masterCategory changes
  useEffect(() => {
    if (formData.masterCategory) {
      axios
        .get(
          `http://localhost/react-api/get-category.php/?mas_cat_id=${formData.masterCategory}`
        )
        .then((res) => {
          if (Array.isArray(res.data)) setCategories(res.data);
        })
        .catch((err) => console.error("Error loading categories:", err));
    } else {
      setCategories([]);
    }
    setFormData((prev) => ({ ...prev, category: "", subCategory: "" }));
  }, [formData.masterCategory]);

  // Load subcategories when category changes
  useEffect(() => {
    if (formData.category) {
      axios
        .get(
          `http://localhost/react-api/get-sub-category.php?cat_id=${formData.category}`
        )
        .then((res) => {
          if (Array.isArray(res.data)) setSubCategories(res.data);
        })
        .catch((err) => console.error("Error loading subcategories:", err));
    } else {
      setSubCategories([]);
    }
    setFormData((prev) => ({ ...prev, subCategory: "" }));
  }, [formData.category]);

  // Load states from API
  useEffect(() => {
    axios
      .get("http://localhost/react-api/get-indian-states.php")
      .then((res) => {
        if (Array.isArray(res.data)) setStates(res.data);
      })
      .catch((err) => console.error("Error loading states:", err));
  }, []);

  // Load cities when state changes
  useEffect(() => {
    if (formData.state) {
      axios
        .get(
          `http://localhost/react-api/get-cities.php/?state_id=${formData.state}`
        )
        .then((res) => {
          if (Array.isArray(res.data)) setCities(res.data);
        })
        .catch((err) => console.error("Error loading cities:", err));
    } else {
      setCities([]);
    }
    setFormData((prev) => ({ ...prev, city: "" }));
  }, [formData.state]);

  // Load products (static for now)
  useEffect(() => {
    setProducts([
      { id: 1, name: "Sponsorship" },
      { id: 2, name: "Co Sponsorship" },
      { id: 3, name: "Title Sponsor" },
      { id: 4, name: "Premium Stall" },
      { id: 5, name: "General Stall" },
      { id: 6, name: "Onboarding" },
      { id: 7, name: "FDP" },
      { id: 8, name: "MNR" },
      { id: 9, name: "Recruitment" },
    ]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Only allow numeric input for specified fields
    if (name === "ownerContact" || name === "contactPersonNumber") {
      const sanitizedValue = value.replace(/[^0-9]/g, "");
      setFormData({ ...formData, [name]: sanitizedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log the form data to the console
    console.log("Form Data Submitted:", formData);

    axios
      .post("http://localhost/react-api/save-inhouse-brands.php", formData)
      .then((res) => {
        alert("Form submitted successfully!");
        console.log("Server Response:", res.data);
        setFormData({
          masterCategory: "",
          category: "",
          subCategory: "",
          state: "",
          city: "",
          brandName: "",
          brandContact: "",
          ownerName: "",
          ownerContact: "",
          contactPersonName: "",
          contactPersonNumber: "",
          callDate: "",
          callTime: "",
          callRemark: "",
          meetingDate: "",
          meetingTime: "",
          meetingRemark: "",
          product: "",
          offerPrice: "",
          counterPrice: "",
          remark: "",
        });
      })
      .catch((err) => {
        console.error("Error submitting form:", err);
        alert("Failed to submit form, please try again.");
      });
  };

  return (
    <>
      <Sidebar />
      <div className="form-wrapper">
        <h2>Inhouse Brand</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          {/* Master Category */}
          <label>Master Category</label>
          {/* <select
            name="masterCategory"
            value={formData.masterCategory}
            onChange={handleChange}
            required
          >
            <option value="">Select Master Category</option>
            {masterCategories.map((mc) => (
              <option key={mc.mas_cat_id} value={mc.mas_cat_id}>
                {mc.mas_cat_name}
              </option>
            ))}
          </select> */}
           <input
            type="text"
            name="masterCategory"
            value={formData.masterCategory}
            onChange={handleChange}
            required
          />

          {/* Category */}
          <label>Category</label>
           <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />

          {/* Sub Category */}
          <label>Sub Category</label>
          <input
            type="text"
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            required
          />

          {/* State */}
          <label>State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />

          {/* City */}
          <label>City</label>
           <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />

          {/* Brand Details */}
          <label>Brand Name</label>
          <input
            type="text"
            name="brandName"
            value={formData.brandName}
            onChange={handleChange}
            required
          />

          <label>Brand Contact</label>
          <input
            type="text"
            name="brandContact"
            value={formData.brandContact}
            onChange={handleChange}
            required
            pattern="[0-9]*" // This provides a visual cue and helps on mobile
            title="Please enter a valid number"
          />

          <label>Owner Name</label>
          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            required
          />

          <label>Owner Contact</label>
          <input
            type="text"
            name="ownerContact"
            value={formData.ownerContact}
            onChange={handleChange}
            required
            pattern="[0-9]*"
            title="Please enter a valid number"
          />

          <label>Contact Person Name</label>
          <input
            type="text"
            name="contactPersonName"
            value={formData.contactPersonName}
            onChange={handleChange}
            required
          />

          <label>Contact Person Number</label>
          <input
            type="text"
            name="contactPersonNumber"
            value={formData.contactPersonNumber}
            onChange={handleChange}
            required
            pattern="[0-9]*"
            title="Please enter a valid number"
          />

          {/* Call Details */}
          <label>Call Date</label>
          <input
            type="date"
            name="callDate"
            value={formData.callDate}
            onChange={handleChange}
          />

          <label>Call Time</label>
          <input
            type="time"
            name="callTime"
            value={formData.callTime}
            onChange={handleChange}
          />

          <label>Call Remark</label>
          <textarea
            name="callRemark"
            rows="2"
            value={formData.callRemark}
            onChange={handleChange}
          ></textarea>

          {/* Meeting Details */}
          <label>Meeting Date</label>
          <input
            type="date"
            name="meetingDate"
            value={formData.meetingDate}
            onChange={handleChange}
          />

          <label>Meeting Time</label>
          <input
            type="time"
            name="meetingTime"
            value={formData.meetingTime}
            onChange={handleChange}
          />

          <label>Meeting Remark</label>
          <textarea
            name="meetingRemark"
            rows="2"
            value={formData.meetingRemark}
            onChange={handleChange}
          ></textarea>

          {/* Product */}
          <label>Product</label>
          <select
            name="product"
            value={formData.product}
            onChange={handleChange}
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>

          <label>Offer Price</label>
          <input
            type="number"
            name="offerPrice"
            value={formData.offerPrice}
            onChange={handleChange}
          />

          <label>Counter Price</label>
          <input
            type="number"
            name="counterPrice"
            value={formData.counterPrice}
            onChange={handleChange}
          />

          <label>Final Remark</label>
          <textarea
            name="remark"
            rows="3"
            value={formData.remark}
            onChange={handleChange}
          ></textarea>
           <label>Stage</label>
          <select name="stage" value={formData.stage} onChange={handleChange} required>
            <option value="">Select Stage</option>
            {stageOptions.map((s, i) => <option key={i} value={s}>{s}</option>)}
          </select>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default DynamicForm;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./DynamicForm.css";
// import Sidebar from "./Sidebar";
// import { getApiUrl } from "../utils/api";



// function DynamicForm() {
//   const [masterCategories, setMasterCategories] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [products, setProducts] = useState([]);
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

//   const [formData, setFormData] = useState({
//     masterCategory: "",
//     category: "",
//     subCategory: "",
//     state: "",
//     city: "",
//     brandName: "",
//     brandContact: "",
//     ownerName: "",
//     ownerContact: "",
//     contactPersonName: "",
//     contactPersonNumber: "",
//     callDate: "",
//     callTime: "",
//     callRemark: "",
//     meetingDate: "",
//     meetingTime: "",
//     meetingRemark: "",
//     product: "",
//     offerPrice: "",
//     counterPrice: "",
//     remark: "",
//     stage: "",
//   });

//   // Load master categories
//   useEffect(() => {
//     axios
//       .get(getApiUrl("get-master-category.php"))
//       .then((res) => {
//         if (Array.isArray(res.data)) setMasterCategories(res.data);
//       })
//       .catch((err) => console.error("Error loading master categories:", err));
//   }, []);

//   // Load categories when masterCategory changes
//   useEffect(() => {
//     if (formData.masterCategory) {
//       axios
//         .get(getApiUrl(
//           `get-category.php/?mas_cat_id=${formData.masterCategory}`
//         ))
//         .then((res) => {
//           if (Array.isArray(res.data)) setCategories(res.data);
//         })
//         .catch((err) => console.error("Error loading categories:", err));
//     } else {
//       setCategories([]);
//     }
//     setFormData((prev) => ({ ...prev, category: "", subCategory: "" }));
//   }, [formData.masterCategory]);

//   // Load subcategories when category changes
//   useEffect(() => {
//     if (formData.category) {
//       axios
//         .get(getApiUrl(
//           `get-sub-category.php?cat_id=${formData.category}`
//         ))
//         .then((res) => {
//           if (Array.isArray(res.data)) setSubCategories(res.data);
//         })
//         .catch((err) => console.error("Error loading subcategories:", err));
//     } else {
//       setSubCategories([]);
//     }
//     setFormData((prev) => ({ ...prev, subCategory: "" }));
//   }, [formData.category]);

//   // Load states
//   useEffect(() => {
//     axios
//       .get(getApiUrl("get-indian-states.php"))
//       .then((res) => {
//         if (Array.isArray(res.data)) setStates(res.data);
//       })
//       .catch((err) => console.error("Error loading states:", err));
//   }, []);

//   // Load cities when state changes
//   useEffect(() => {
//     if (formData.state) {
//       axios
//         .get(getApiUrl(`get-cities.php/?state_id=${formData.state}`))
//         .then((res) => {
//           if (Array.isArray(res.data)) setCities(res.data);
//         })
//         .catch((err) => console.error("Error loading cities:", err));
//     } else {
//       setCities([]);
//     }
//     setFormData((prev) => ({ ...prev, city: "" }));
//   }, [formData.state]);

//   // Load products (static for now)
//   useEffect(() => {
//     setProducts([
//       { id: 1, name: "Sponsorship" },
//       { id: 2, name: "Co Sponsorship" },
//       { id: 3, name: "Title Sponsor" },
//       { id: 4, name: "Premium Stall" },
//       { id: 5, name: "General Stall" },
//       { id: 6, name: "Onboarding" },
//       { id: 7, name: "FDP" },
//       { id: 8, name: "MNR" },
//       { id: 9, name: "Recruitment" },
//     ]);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "ownerContact" || name === "contactPersonNumber") {
//       const sanitizedValue = value.replace(/[^0-9]/g, "");
//       setFormData({ ...formData, [name]: sanitizedValue });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Data Submitted:", formData);

//     axios
//       .post(getApiUrl("save-inhouse-brands.php", formData))
//       .then((res) => {
//         alert("Form submitted successfully!");
//         console.log("Server Response:", res.data);
//         setFormData({
//           masterCategory: "",
//           category: "",
//           subCategory: "",
//           state: "",
//           city: "",
//           brandName: "",
//           brandContact: "",
//           ownerName: "",
//           ownerContact: "",
//           contactPersonName: "",
//           contactPersonNumber: "",
//           callDate: "",
//           callTime: "",
//           callRemark: "",
//           meetingDate: "",
//           meetingTime: "",
//           meetingRemark: "",
//           product: "",
//           offerPrice: "",
//           counterPrice: "",
//           remark: "",
//           stage: "",
//         });
//       })
//       .catch((err) => {
//         console.error("Error submitting form:", err);
//         alert("Failed to submit form, please try again.");
//       });
//   };

//   return (
//     <>
//       <Sidebar />
//       {/* ✅ Removed snbs-content wrapper */}
//       <div className="form-wrapper">
//         <h2>Inhouse Brand</h2>
//         <form onSubmit={handleSubmit} className="form-grid">
//           {/* Master Category */}
//           <label>Master Category</label>
//           <select
//             name="masterCategory"
//             value={formData.masterCategory}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Master Category</option>
//             {masterCategories.map((mc) => (
//               <option key={mc.mas_cat_id} value={mc.mas_cat_id}>
//                 {mc.mas_cat_name}
//               </option>
//             ))}
//           </select>

//           {/* Category */}
//           <label>Category</label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Category</option>
//             {categories.map((c) => (
//               <option key={c.cat_id} value={c.cat_id}>
//                 {c.cat_name}
//               </option>
//             ))}
//           </select>

//           {/* Sub Category */}
//           <label>Sub Category</label>
//           <select
//             name="subCategory"
//             value={formData.subCategory}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Sub Category</option>
//             {subCategories.map((sc) => (
//               <option key={sc.subcat_id} value={sc.subcat_id}>
//                 {sc.subcat_name}
//               </option>
//             ))}
//           </select>

//           {/* State */}
//           <label>State</label>
//           <select name="state" value={formData.state} onChange={handleChange} required>
//             <option value="">Select State</option>
//             {states.map((s) => (
//               <option key={s.id} value={s.id}>
//                 {s.name}
//               </option>
//             ))}
//           </select>

//           {/* City */}
//           <label>City</label>
//           <select name="city" value={formData.city} onChange={handleChange} required>
//             <option value="">Select City</option>
//             {cities.map((c) => (
//               <option key={c.id} value={c.id}>
//                 {c.name}
//               </option>
//             ))}
//           </select>

//           {/* Brand Details */}
//           <label>Brand Name</label>
//           <input
//             type="text"
//             name="brandName"
//             value={formData.brandName}
//             onChange={handleChange}
//             required
//           />

//           <label>Brand Contact</label>
//           <input
//             type="text"
//             name="brandContact"
//             value={formData.brandContact}
//             onChange={handleChange}
//             required
//             pattern="[0-9]*"
//             title="Please enter a valid number"
//           />

//           <label>Owner Name</label>
//           <input
//             type="text"
//             name="ownerName"
//             value={formData.ownerName}
//             onChange={handleChange}
//             required
//           />

//           <label>Owner Contact</label>
//           <input
//             type="text"
//             name="ownerContact"
//             value={formData.ownerContact}
//             onChange={handleChange}
//             required
//             pattern="[0-9]*"
//             title="Please enter a valid number"
//           />

//           <label>Contact Person Name</label>
//           <input
//             type="text"
//             name="contactPersonName"
//             value={formData.contactPersonName}
//             onChange={handleChange}
//             required
//           />

//           <label>Contact Person Number</label>
//           <input
//             type="text"
//             name="contactPersonNumber"
//             value={formData.contactPersonNumber}
//             onChange={handleChange}
//             required
//             pattern="[0-9]*"
//             title="Please enter a valid number"
//           />

//           {/* Call Details */}
//           <label>Call Date</label>
//           <input
//             type="date"
//             name="callDate"
//             value={formData.callDate}
//             onChange={handleChange}
//           />

//           <label>Call Time</label>
//           <input
//             type="time"
//             name="callTime"
//             value={formData.callTime}
//             onChange={handleChange}
//           />

//           <label>Call Remark</label>
//           <textarea
//             name="callRemark"
//             rows="2"
//             value={formData.callRemark}
//             onChange={handleChange}
//           ></textarea>

//           {/* Meeting Details */}
//           <label>Meeting Date</label>
//           <input
//             type="date"
//             name="meetingDate"
//             value={formData.meetingDate}
//             onChange={handleChange}
//           />

//           <label>Meeting Time</label>
//           <input
//             type="time"
//             name="meetingTime"
//             value={formData.meetingTime}
//             onChange={handleChange}
//           />

//           <label>Meeting Remark</label>
//           <textarea
//             name="meetingRemark"
//             rows="2"
//             value={formData.meetingRemark}
//             onChange={handleChange}
//           ></textarea>

//           {/* Product */}
//           <label>Product</label>
//           <select
//             name="product"
//             value={formData.product}
//             onChange={handleChange}
//           >
//             <option value="">Select Product</option>
//             {products.map((p) => (
//               <option key={p.id} value={p.name}>
//                 {p.name}
//               </option>
//             ))}
//           </select>

//           <label>Offer Price</label>
//           <input
//             type="number"
//             name="offerPrice"
//             value={formData.offerPrice}
//             onChange={handleChange}
//           />

//           <label>Counter Price</label>
//           <input
//             type="number"
//             name="counterPrice"
//             value={formData.counterPrice}
//             onChange={handleChange}
//           />

//           <label>Final Remark</label>
//           <textarea
//             name="remark"
//             rows="3"
//             value={formData.remark}
//             onChange={handleChange}
//           ></textarea>

//           <label>Stage</label>
//           <select name="stage" value={formData.stage} onChange={handleChange} required>
//             <option value="">Select Stage</option>
//             {stageOptions.map((s, i) => (
//               <option key={i} value={s}>
//                 {s}
//               </option>
//             ))}
//           </select>

//           <button type="submit" className="submit-btn">
//             Submit
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default DynamicForm;
