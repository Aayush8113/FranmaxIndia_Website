import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { toast } from 'react-toastify';
import {
  FaUser, FaPhone, FaEnvelope, FaCommentDots
} from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { getApiUrl } from '../utils/api';

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: '',
    state: null,
    city: null,
  });

  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios.get(getApiUrl('get-indian-states.php'))
      .then(res => {
        const options = res.data.map((state) => ({
          value: state.id,
          label: state.name
        }));
        setStates(options);
      })
      .catch(() => toast.error("Failed to load states"));
  }, []);

  useEffect(() => {
    if (formData.state) {
      axios.get(getApiUrl(`get-cities.php?state_id=${formData.state.value}`))
        .then(res => {
          const options = res.data.map((city) => ({
            value: city.id,
            label: city.name
          }));
          setCities(options);
        })
        .catch(() => toast.error("Failed to load cities"));
    } else {
      setCities([]);
    }
  }, [formData.state]);

  const validateForm = () => {
    const { fullName, phone, email, state, city } = formData;
    if (!fullName || !phone || !email || !state || !city) {
      toast.error('Please fill all required fields');
      return false;
    }
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(fullName)) {
      toast.error('Name must contain only letters and spaces');
      return false;
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      toast.error('Invalid phone number. It must start with 6, 7, 8, or 9 and be 10 digits long.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Invalid email format');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        full_name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        state_id: formData.state.value,
        city_id: formData.city.value,
      };

      const response = await axios.post(
        getApiUrl('enquiry-submit.php'),
        payload
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          message: '',
          state: null,
          city: null,
        });
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      toast.error('Server error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // ===================== INLINE STYLES =====================
  const styles = {
    formContainer: {
      background: '#fff',
      padding: '25px 20px',
      borderRadius: '12px',
      boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
      maxWidth: '380px',
      width: '100%',
      fontFamily: "'Segoe UI', Arial, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    heading: {
      fontSize: '1.8rem',
      fontWeight: 600,
      color: '#1f2937',
      marginBottom: '20px',
      textAlign: 'center',
    },
    inputIcon: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      position: 'absolute',
      left: '12px',
      color: '#6b7280',
      fontSize: '1.1rem',
    },
    input: {
      width: '100%',
      padding: '10px 12px 10px 36px',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      fontSize: '0.95rem',
      outline: 'none',
      transition: 'all 0.3s ease',
    },
    textarea: {
      width: '100%',
      padding: '10px 12px 10px 36px',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      fontSize: '0.95rem',
      outline: 'none',
      transition: 'all 0.3s ease',
      minHeight: '70px',
      resize: 'none',
    },
    button: {
      background: 'linear-gradient(90deg, #2563eb, #3b82f6)',
      color: '#fff',
      padding: '10px 15px',
      fontSize: '1rem',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 500,
      transition: 'all 0.3s ease',
    }
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.heading}>Insta Apply</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={styles.inputIcon}>
          <FaUser style={styles.icon} />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.inputIcon}>
          <FaPhone style={styles.icon} />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            maxLength={10}
            style={styles.input}
          />
        </div>

        <div style={styles.inputIcon}>
          <FaEnvelope style={styles.icon} />
          <input
            type="text"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.inputIcon}>
          <Select
            options={states}
            value={formData.state}
            onChange={(selected) => setFormData({ ...formData, state: selected, city: null })}
            placeholder="Select State"
            isSearchable
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: '8px',
                borderColor: '#d1d5db',
                minHeight: '40px',
                paddingLeft: '2px',
              }),
              menu: (base) => ({ ...base, zIndex: 9999 }),
            }}
          />
        </div>

        <div style={styles.inputIcon}>
          <Select
            options={cities}
            value={formData.city}
            onChange={(selected) => setFormData({ ...formData, city: selected })}
            placeholder="Select City"
            isSearchable
            isDisabled={!formData.state}
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: '8px',
                borderColor: '#d1d5db',
                minHeight: '40px',
                paddingLeft: '2px',
              }),
              menu: (base) => ({ ...base, zIndex: 9999 }),
            }}
          />
        </div>

        <div style={styles.inputIcon}>
          <FaCommentDots style={styles.icon} />
          <textarea
            name="message"
            placeholder="Your Message (Optional)"
            rows="3"
            value={formData.message}
            onChange={handleChange}
            style={styles.textarea}
          />
        </div>

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default EnquiryForm;
  