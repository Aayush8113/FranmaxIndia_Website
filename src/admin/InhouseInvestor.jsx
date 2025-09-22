// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./DynamicForm.css";
// import Sidebar from "./Sidebar";
// import { getApiUrl } from "../utils/api";

// function InvestorForm() {
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [masterCategories, setMasterCategories] = useState([]);
//   const [formData, setFormData] = useState({
//     masterCategory: "",
//     name: "",
//     contact: "",
//     email: "",
//     state: "",
//     city: "",
//     investmentBudget: "",
//     callDate: "",
//     callTime: "",
//     callRemark: "",
//     meetingDate: "",
//     meetingTime: "",
//     meetingRemark: "",
//     finalRemark: "",
//     stage: "",
//   });

//   const investmentOptions = ["₹1L-5L", "₹5L-10L", "₹10L-50L", "₹50L-1Cr", "Above ₹1Cr"];
//   const stageOptions = ["Contacted", "Qualified", "Disqualified", "Working","Prospecting","Negotiation","Closed Won","Closed Lost"];
//   // Load master categories
//   useEffect(() => {
//     axios
//       .get(getApiUrl("get-master-category.php"))
//       .then(res => Array.isArray(res.data) && setMasterCategories(res.data.filter(mc => mc.is_deleted === "0")))
//       .catch(err => console.error("Error loading master categories:", err));
//   }, []);

//   // Load states
//   useEffect(() => {
//     axios
//       .get(getApiUrl("get-indian-states.php"))
//       .then(res => Array.isArray(res.data) && setStates(res.data))
//       .catch(err => console.error("Error loading states:", err));
//   }, []);

//   // Load cities when state changes
//   useEffect(() => {
//     if (formData.state) {
//       axios
//         .get(getApiUrl(`get-cities.php?state_id=${formData.state}`))
//         .then(res => Array.isArray(res.data) && setCities(res.data))
//         .catch(err => console.error("Error loading cities:", err));
//     } else {
//       setCities([]);
//     }
//     setFormData(prev => ({ ...prev, city: "" }));
//   }, [formData.state]);

//   const handleChange = e => {
//     const { name, value } = e.target;
//     if (name === "contact") {
//       setFormData({ ...formData, [name]: value.replace(/[^0-9]/g, "") });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     axios
//       .post("http://localhost/react-api/save-inhouse-investors.php", formData)
//       .then(res => {
//         alert(res.data.message || "Form submitted successfully!");
//         setFormData({
//           masterCategory: "",
//           name: "", contact: "", email: "", state: "", city: "",
//           investmentBudget: "", callDate: "", callTime: "", callRemark: "",
//           meetingDate: "", meetingTime: "", meetingRemark: "",
//           finalRemark: "", stage: "",
//         });
//       })
//       .catch(err => {
//         console.error("Error submitting form:", err);
//         alert("Failed to submit form, please try again.");
//       });
//   };

//   return (
//     <>
//       <Sidebar />
//       <div className="form-wrapper">
//         <h2>Investor Form</h2>
//         <form onSubmit={handleSubmit} className="form-grid">

//           {/* Master Category */}
//           <label>Master Category</label>
//           <select name="masterCategory" value={formData.masterCategory} onChange={handleChange} required>
//             <option value="">Select Master Category</option>
//             {masterCategories.map(mc => (
//               <option key={mc.mas_cat_id} value={mc.mas_cat_id}>{mc.mas_cat_name}</option>
//             ))}
//           </select>

//           <label>Name</label>
//           <input type="text" name="name" value={formData.name} onChange={handleChange} required />

//           <label>Contact</label>
//           <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />

//           <label>Email</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} required />

//           <label>State</label>
//           <select name="state" value={formData.state} onChange={handleChange} required>
//             <option value="">Select State</option>
//             {states.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
//           </select>

//           <label>City</label>
//           <select name="city" value={formData.city} onChange={handleChange} required>
//             <option value="">Select City</option>
//             {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
//           </select>

//           <label>Investment Budget</label>
//           <select name="investmentBudget" value={formData.investmentBudget} onChange={handleChange}>
//             <option value="">Select Budget</option>
//             {investmentOptions.map((b, i) => <option key={i} value={b}>{b}</option>)}
//           </select>

//           <label>Call Date</label>
//           <input type="date" name="callDate" value={formData.callDate} onChange={handleChange} />

//           <label>Call Time</label>
//           <input type="time" name="callTime" value={formData.callTime} onChange={handleChange} />

//           <label>Call Remark</label>
//           <textarea name="callRemark" value={formData.callRemark} onChange={handleChange}></textarea>

//           <label>Meeting Date</label>
//           <input type="date" name="meetingDate" value={formData.meetingDate} onChange={handleChange} />

//           <label>Meeting Time</label>
//           <input type="time" name="meetingTime" value={formData.meetingTime} onChange={handleChange} />

//           <label>Meeting Remark</label>
//           <textarea name="meetingRemark" value={formData.meetingRemark} onChange={handleChange}></textarea>

//           <label>Final Remark</label>
//           <textarea name="finalRemark" value={formData.finalRemark} onChange={handleChange}></textarea>

//           <label>Stage</label>
//           <select name="stage" value={formData.stage} onChange={handleChange} required>
//             <option value="">Select Stage</option>
//             {stageOptions.map((s, i) => <option key={i} value={s}>{s}</option>)}
//           </select>

//           <button type="submit" className="submit-btn">Submit</button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default InvestorForm;














import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DynamicForm.css";
import Sidebar from "./Sidebar";
import { getApiUrl } from "../utils/api";

function InvestorForm() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [masterCategories, setMasterCategories] = useState([]);
  const [formData, setFormData] = useState({
    masterCategory: "",
    name: "",
    contact: "",
    email: "",
    state: "",
    city: "",
    investmentBudget: "",
    callDate: "",
    callTime: "",
    callRemark: "",
    meetingDate: "",
    meetingTime: "",
    meetingRemark: "",
    finalRemark: "",
    stage: "",
  });

  const investmentOptions = [
    "₹1L-5L",
    "₹5L-10L",
    "₹10L-50L",
    "₹50L-1Cr",
    "Above ₹1Cr",
  ];
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

  // Load master categories
  useEffect(() => {
    axios
      .get(getApiUrl("get-master-category.php"))
      .then(
        (res) =>
          Array.isArray(res.data) &&
          setMasterCategories(res.data.filter((mc) => mc.is_deleted === "0"))
      )
      .catch((err) =>
        console.error("Error loading master categories:", err)
      );
  }, []);

  // Load states
  useEffect(() => {
    axios
      .get(getApiUrl("get-indian-states.php"))
      .then((res) => Array.isArray(res.data) && setStates(res.data))
      .catch((err) => console.error("Error loading states:", err));
  }, []);

  // Load cities when state changes
  useEffect(() => {
    if (formData.state) {
      axios
        .get(getApiUrl(`get-cities.php?state_id=${formData.state}`))
        .then((res) => Array.isArray(res.data) && setCities(res.data))
        .catch((err) => console.error("Error loading cities:", err));
    } else {
      setCities([]);
    }
    setFormData((prev) => ({ ...prev, city: "" }));
  }, [formData.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "contact") {
      setFormData({ ...formData, [name]: value.replace(/[^0-9]/g, "") });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(getApiUrl("save-inhouse-investors.php"), formData) // ✅ now using getApiUrl
      .then((res) => {
        alert(res.data.message || "Form submitted successfully!");
        setFormData({
          masterCategory: "",
          name: "",
          contact: "",
          email: "",
          state: "",
          city: "",
          investmentBudget: "",
          callDate: "",
          callTime: "",
          callRemark: "",
          meetingDate: "",
          meetingTime: "",
          meetingRemark: "",
          finalRemark: "",
          stage: "",
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
        <h2>Investor Form</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          {/* Master Category */}
          <label>Master Category</label>
          <select
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
          </select>

          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Contact</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>State</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          >
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <label>City</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">Select City</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <label>Investment Budget</label>
          <select
            name="investmentBudget"
            value={formData.investmentBudget}
            onChange={handleChange}
          >
            <option value="">Select Budget</option>
            {investmentOptions.map((b, i) => (
              <option key={i} value={b}>
                {b}
              </option>
            ))}
          </select>

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
            value={formData.callRemark}
            onChange={handleChange}
          ></textarea>

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
            value={formData.meetingRemark}
            onChange={handleChange}
          ></textarea>

          <label>Final Remark</label>
          <textarea
            name="finalRemark"
            value={formData.finalRemark}
            onChange={handleChange}
          ></textarea>

          <label>Stage</label>
          <select
            name="stage"
            value={formData.stage}
            onChange={handleChange}
            required
          >
            <option value="">Select Stage</option>
            {stageOptions.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default InvestorForm;
