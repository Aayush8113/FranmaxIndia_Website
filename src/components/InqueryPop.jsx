import React, { useState, useEffect } from "react";
import "./design/InqueryPop.css";
import { getApiUrl } from "../utils/api";
import { FaStore, FaChartLine } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function InqueryPop() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    state_id: "",
    city_id: "",
    inquiry_type: "",
    message: "",
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Show popup after 1 minute if not submitted
  useEffect(() => {
    const isSubmitted = sessionStorage.getItem("inquirySubmitted");
    if (!isSubmitted) {
      const timer = setTimeout(() => setIsOpen(true), 60000); // 1 min
      return () => clearTimeout(timer);
    }
  }, []);

  // Fetch states
  useEffect(() => {
    fetch(getApiUrl("get-indian-states.php"))
      .then(res => res.json())
      .then(data => setStates(data || []))
      .catch(err => console.error(err));
  }, []);

  // Fetch cities when state changes
  useEffect(() => {
    if (!form.state_id) return;
    setLoadingCities(true);
    fetch(getApiUrl(`get-cities.php?state_id=${form.state_id}`))
      .then(res => res.json())
      .then(data => setCities(data || []))
      .catch(err => console.error(err))
      .finally(() => setLoadingCities(false));
  }, [form.state_id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (name === "state_id") {
      setForm(prev => ({ ...prev, city_id: "" }));
      setCities([]);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(getApiUrl("submit-footer-inquiry.php"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success("Inquiry submitted successfully!");
        sessionStorage.setItem("inquirySubmitted", "true");

        setForm({
          name: "",
          email: "",
          contact: "",
          state_id: "",
          city_id: "",
          inquiry_type: "",
          message: "",
        });

        // Auto-close popup after 5 seconds
        setTimeout(() => setIsOpen(false), 5000);
      } else {
        toast.error(result.error || "Submission failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="popup-overlay">
        <div className="inquery-pop">
          <form className="inquery-form" onSubmit={handleSubmit}>
            <h2><FaStore className="header-icon" /> Start Your Journey</h2>
            <h4>Choose an option below to proceed</h4>

            <div className="options-grid">
              <label className={`option-card ${form.inquiry_type === "franchise" ? "selected" : ""}`}>
                <input type="radio" name="inquiry_type" value="franchise" checked={form.inquiry_type === "franchise"} onChange={handleChange} />
                <FaStore className="option-icon" />
                <span>Franchise Inquiry</span>
              </label>

              <label className={`option-card ${form.inquiry_type === "expand" ? "selected" : ""}`}>
                <input type="radio" name="inquiry_type" value="expand" checked={form.inquiry_type === "expand"} onChange={handleChange} />
                <FaChartLine className="option-icon" />
                <span>Expand Your Brand</span>
              </label>
            </div>

            <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
            <div className="input-row">
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
              <input type="tel" name="contact" placeholder="Contact Number" value={form.contact} onChange={handleChange} required />
            </div>
            <div className="input-row">
              <select name="state_id" value={form.state_id} onChange={handleChange} required>
                <option value="">Select State</option>
                {states.map(state => <option key={state.id} value={state.id}>{state.name}</option>)}
              </select>
              <select name="city_id" value={form.city_id} onChange={handleChange} required disabled={!form.state_id || loadingCities}>
                <option value="">{loadingCities ? "Loading..." : "Select City"}</option>
                {cities.map(city => <option key={city.id} value={city.id}>{city.name}</option>)}
              </select>
            </div>

            <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} />

            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Inquiry"}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={true} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover
      />
    </>
  );
}

export default InqueryPop;
