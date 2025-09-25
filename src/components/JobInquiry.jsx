import React, { useState } from "react";
import { getApiUrl } from "../utils/api";
import "./design/JobInquiry.css";

export default function JobInquiry() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    resume: null,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.contact || !formData.resume) {
      alert("Please fill all fields!");
      return;
    }

    const apiUrl = getApiUrl("submit-jobInquiry");
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("contact", formData.contact);
    data.append("resume", formData.resume);

    try {
      setLoading(true);
      const response = await fetch(apiUrl, {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", contact: "", resume: null });
      } else {
        alert(result.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-inquiry-page">
      {/* Career Section with Two Images */}
      <div className="career-section">
        <h2>Why Choose Franmax India for Your Career?</h2>
        <p>
          At Franmax India, we foster a dynamic and supportive work environment that encourages professional growth and development. Here are a few reasons why you should join us:
        </p>
        <ul>
          <li><strong>Innovative Work Culture</strong>: Creativity and innovation are highly encouraged, allowing you to contribute to impactful projects.</li>
          <li><strong>Growth Opportunities</strong>: We focus on skill development and internal promotions for career advancement.</li>
          <li><strong>Collaborative Environment</strong>: Teamwork and support create a community-driven workplace.</li>
          <li><strong>Employee Benefits</strong>: Competitive salaries, flexible hours, and perks ensure well-being and job satisfaction.</li>
        </ul>

        <div className="career-images">
          <img src="https://lh3.googleusercontent.com/p/AF1QipMixpVSjYtsbn6XnDPiI_MD8-z-VL_9oXWMU1Xc=w243-h304-n-k-no-nu" alt="Franmax Office 1" />
          <img src="https://lh3.googleusercontent.com/p/AF1QipNNxf9MD5mq-q8letrqWEVtl5fuyn2Rl-JW4Uct=w243-h406-n-k-no-nu" alt="Franmax Office 2" />
        </div>
      </div>

      {/* Job Inquiry Form */}
      <div className="job-inquiry-container">
        <h2>Job Inquiry Form</h2>
        <form className="job-inquiry-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            required
          />

          <input
            type="file"
            name="resume"
            accept=".pdf,.jpg,.jpeg"
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </button>

          {success && (
            <div className="success-message">
              Your application has been submitted successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
