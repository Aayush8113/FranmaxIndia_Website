import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { FaUser, FaEnvelope, FaPhone, FaRegCommentDots, FaStore, FaHandHoldingUsd } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getApiUrl } from '../../utils/api';
import './InquiryForm.css';

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    inquiry_type: '',
    footer_name: '',
    footer_email: '',
    footer_contact: '',
    footer_state: '',
    footer_city: '',
    footer_message: '',
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoadingStates(true);
        const res = await fetch(getApiUrl('get-indian-states.php'));
        const data = await res.json();
        if (Array.isArray(data)) {
          setStates(data.map(s => ({ label: s.name, value: s.id })));
        }
      } catch {
        toast.error('Failed to load states');
      } finally {
        setLoadingStates(false);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (!formData.footer_state) return setCities([]);
      try {
        setLoadingCities(true);
        const res = await fetch(getApiUrl(`get-cities.php?state_id=${formData.footer_state}`));
        const data = await res.json();
        if (Array.isArray(data)) {
          setCities(data.map(c => ({ label: c.name, value: c.id })));
        }
      } catch {
        toast.error('Failed to load cities');
      } finally {
        setLoadingCities(false);
      }
    };
    fetchCities();
  }, [formData.footer_state]);

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleStateChange = (option) => {
    setFormData(prev => ({ ...prev, footer_state: option?.value || '', footer_city: '' }));
  };
  const handleCityChange = (option) => {
    setFormData(prev => ({ ...prev, footer_city: option?.value || '' }));
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.inquiry_type) errors.push('Inquiry type is required');
    if (!formData.footer_name.trim() || !/^[A-Za-z\s]+$/.test(formData.footer_name.trim()))
      errors.push('Name must contain only letters and spaces');
    if (!formData.footer_email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.footer_email.trim()))
      errors.push('Invalid email address');
    if (!/^[6-9]\d{9}$/.test(formData.footer_contact))
      errors.push('Invalid phone number');
    if (!formData.footer_state) errors.push('Valid state is required');
    if (!formData.footer_city) errors.push('Valid city is required');
    if (!formData.footer_message.trim()) errors.push('Message is required');
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (errors.length) return errors.forEach(err => toast.error(err));

    const payload = {
      inquiry_type: formData.inquiry_type,
      name: formData.footer_name.trim(),
      email: formData.footer_email.trim(),
      contact: formData.footer_contact.trim(),
      state_id: formData.footer_state,
      city_id: formData.footer_city,
      message: formData.footer_message.trim(),
    };

    try {
      const res = await fetch(getApiUrl('submit-footer-inquiry.php'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('✅ Inquiry submitted successfully!');
        setSubmitted(true);

        // Auto close thank you after 5 seconds and reset form
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            inquiry_type: '',
            footer_name: '',
            footer_email: '',
            footer_contact: '',
            footer_state: '',
            footer_city: '',
            footer_message: '',
          });
        }, 5000);
      } else {
        toast.error(data.error || '❌ Failed to submit inquiry');
      }
    } catch {
      toast.error('❌ Something went wrong!');
    }
  };

  // React-Select Styles
  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: '18px',
      border: state.isFocused ? '1px solid #25d366' : '1px solid #ddd',
      boxShadow: state.isFocused ? '0 6px 18px rgba(37, 211, 102, 0.25)' : 'none',
      paddingLeft: '10px',
      minHeight: '48px',
      fontSize: '15px',
      background: '#fefefe',
    }),
    singleValue: (provided) => ({ ...provided, color: '#222', fontSize: '15px' }),
    placeholder: (provided) => ({ ...provided, color: '#888', fontSize: '15px' }),
    menu: (provided) => ({ ...provided, borderRadius: '18px', overflow: 'hidden', fontSize: '15px' }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#e8fdf2' : '#fff',
      color: '#222',
      cursor: 'pointer',
    }),
  };

  return (
    <div className="inquiry-main">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="inquiry-row">
        {/* LEFT COLUMN */}
        <div className="inquiry-left">
          <div className="advice-card">
            <div className="advice-icon"><FaStore size={40} color="#25d366" /></div>
            <div className="inquiry-left">
              <h3 className="inquiry-title">Connect with Franmax India</h3>

              {/* Franchise Opportunities */}
              <div className="advice-card">
                <div className="advice-icon"><FaStore size={40} color="#25d366" /></div>
                <div className="advice-info">
                  <h4>Franchise Opportunities</h4>
                  <p>Franmax India provides complete support for franchisees to scale quickly and profitably. Join our trusted network and grow with proven systems.</p>
                  <ul className="advice-list">
                    <li>Extensive Brand Portfolio: Access over 500 franchise opportunities.</li>
                    <li>Tailored Franchise Matching: Match franchises based on investment, location, and interests.</li>
                    <li>Comprehensive Support: From site selection to marketing and operations.</li>

                  </ul>
                </div>
              </div>

              {/* Investor Relations */}
              <div className="advice-card">
                <div className="advice-icon"><FaHandHoldingUsd size={40} color="#25d366" /></div>
                <div className="advice-info">
                  <h4>Investor Relations</h4>
                  <p>Invest with Franmax India for strong ROI, structured support, and transparency.</p>
                  <ul className="advice-list">
                    <li>Diverse Investment Opportunities across sectors.</li>
                    <li>Expert Market Insights to make informed decisions.</li>
                    <li>Dedicated Support from our investor relations team.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="inquiry-right">
          {submitted ? (
            <div className="thank-you-box fade-in">
              <h2>🎉 Thank You!</h2>
              <p>Your inquiry has been submitted successfully. Our team will contact you shortly.</p>
            </div>
          ) : (
            <>
              <h3 className="form-title">Submit Your Inquiry</h3>
              <p className="form-subtitle">Choose your type and fill the details</p>

              {/* Inquiry Type */}
              <div className="form-row full-width">
                <div className="form-field full-width">
                  <select
                    name="inquiry_type"
                    value={formData.inquiry_type}
                    onChange={(e) => setFormData(prev => ({ ...prev, inquiry_type: e.target.value }))}
                    required
                    className="inquiry-select"
                  >
                    <option value="">Select Inquiry Type *</option>
                    <option value="expand">Expand Your Brand</option>
                    <option value="franchise">Franchise Inquiry</option>
                  </select>
                </div>
              </div>

              <form className="inquiry-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-field full-width">
                    <FaUser className="form-icon" />
                    <input type="text" name="footer_name" placeholder="Full Name *" value={formData.footer_name} onChange={handleInputChange} required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field half-width">
                    <FaEnvelope className="form-icon" />
                    <input type="email" name="footer_email" placeholder="Email *" value={formData.footer_email} onChange={handleInputChange} required />
                  </div>
                  <div className="form-field half-width">
                    <FaPhone className="form-icon" />
                    <input type="tel" name="footer_contact" placeholder="Mobile Number *" value={formData.footer_contact} onChange={handleInputChange} required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field half-width">
                    <Select
                      options={states}
                      value={states.find(s => s.value === formData.footer_state) || null}
                      onChange={handleStateChange}
                      placeholder={loadingStates ? 'Loading states...' : 'Select State *'}
                      isSearchable
                      styles={selectStyles}
                    />
                  </div>
                  <div className="form-field half-width">
                    <Select
                      options={cities}
                      value={cities.find(c => c.value === formData.footer_city) || null}
                      onChange={handleCityChange}
                      placeholder={loadingCities ? 'Loading cities...' : 'Select City *'}
                      isSearchable
                      isDisabled={!formData.footer_state}
                      styles={selectStyles}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field full-width textarea-field">
                    <FaRegCommentDots className="form-icon" />
                    <textarea name="footer_message" placeholder="Type your requirement *" value={formData.footer_message} onChange={handleInputChange} required />
                  </div>
                </div>

                <div className="form-row">
                  <button type="submit" className="submit-btn">Submit</button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InquiryForm;
