// // File: src/pages/ContactUs.jsx
// import React, { useState } from 'react';
// import '../components/design/ContactUs.css';
// import {
//   MdLocationOn,
//   MdEmail,
//   MdCall,
//   MdPerson,
//   MdMessage,
//   MdSend
// } from 'react-icons/md';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { getApiUrl } from '../utils/api';

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     contact: '',
//     message: ''
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     const { name, email, contact, message } = formData;

//     if (!name.trim()) {
//       toast.error("Name is required");
//       return false;
//     }
//     if (!email.trim()) {
//       toast.error("Email is required");
//       return false;
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       toast.error("Enter a valid email address");
//       return false;
//     }
//     if (!contact.trim()) {
//       toast.error("Phone number is required");
//       return false;
//     }
//     if (!/^\d{10}$/.test(contact)) {
//       toast.error("Phone must be a 10-digit number");
//       return false;
//     }
//     if (!message.trim()) {
//       toast.error("Message is required");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       const res = await fetch(getApiUrl('contact-submit.php'), {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       const data = await res.json();

//       if (data.success) {
//         toast.success(data.message || "Message sent successfully");
//         setFormData({ name: '', email: '', contact: '', message: '' });
//       } else {
//         toast.error(data.error || "Failed to send message");
//       }
//     } catch (error) {
//       toast.error("Server error, try again later");
//     }
//   };

//   return (
//     <div className="contactus-wrapper">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <div className="contactus-container">

//         {/* Left Column: Contact Info */}
//         <div className="contactus-info">
//           <h2>Why Franmax India?</h2>
//           <p className="desc">
//             We are India’s fastest-growing franchise and brand consulting platform.
//             Whether you're an investor or a business looking to expand, Franmax India is your one-stop solution for trusted connections, market insights, and expert guidance.
//           </p>

//           <div
//             className="info-card clickable"
//             onClick={() =>
//               window.open(
//                 "https://maps.google.com/?q=A-402, Titanium City Center, 100 Feet Anand Nagar Road, Ahmedabad, Gujarat – 380015",
//                 "_blank"
//               )
//             }
//           >
//             <MdLocationOn className="info-icon" />
//             <div>
//               <h4>Our Address</h4>
//               <p>
//                 A-402, Titanium City Center,<br />
//                 100 Feet Anand Nagar Road,<br />
//                 Ahmedabad, Gujarat – 380015
//               </p>
//             </div>
//           </div>

//           <div
//             className="info-card clickable"
//             onClick={() => (window.location.href = "tel:+919403890794")}
//           >
//             <MdCall className="info-icon" />
//             <div>
//               <h4>Call Us</h4>
//               <p>+91 94038 90794</p>
//             </div>
//           </div>

//           <div
//             className="info-card clickable"
//             onClick={() => (window.location.href = "mailto:info@franmaxindia.com")}
//           >
//             <MdEmail className="info-icon" />
//             <div>
//               <h4>Email</h4>
//               <p>info@franmaxindia.com</p>
//             </div>
//           </div>

//           <iframe
//             title="Franmax India Location"
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.1880109050266!2d72.52257781538692!3d23.089107521238923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e85d93eb2cde7%3A0xb1ac718f3f430761!2sTitanium%20City%20Centre%2C%20A-402%2C%20100%20Feet%20Anand%20Nagar%20Rd%2C%20Satellite%2C%20Ahmedabad%2C%20Gujarat%20380015!5e0!3m2!1sen!2sin!4v1721027830000!5m2!1sen!2sin"
//             allowFullScreen
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//           />
//         </div>

//         {/* Right Column: Contact Form */}
//         <div className="contactus-form">
//           <h3>Send Us a Message</h3>
//           <form onSubmit={handleSubmit}>
//             <div className="form-row">
//               <div className="form-field">
//                 <MdPerson className="icon" />
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Your Name *"
//                   value={formData.name}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-field">
//                 <MdEmail className="icon" />
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email Address *"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-field">
//                 <MdCall className="icon" />
//                 <input
//                   type="tel"
//                   name="contact"
//                   placeholder="Phone Number *"
//                   value={formData.contact}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-field full-width">
//                 <MdMessage className="icon" />
//                 <textarea
//                   name="message"
//                   placeholder="Your Message *"
//                   rows="4"
//                   value={formData.message}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <button type="submit">
//               <MdSend className="btn-icon" /> Send Message
//             </button>
//           </form>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ContactUs;













import React, { useState } from 'react';
import '../components/design/ContactUs.css';
import {
  MdLocationOn,
  MdEmail,
  MdCall,
  MdPerson,
  MdMessage,
  MdSend
} from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getApiUrl } from '../utils/api';
import logo from '../assets/logo/Franmaxindia logo@4x.png'; // Import your logo image

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { name, email, contact, message } = formData;

    if (!name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address");
      return false;
    }
    if (!contact.trim()) {
      toast.error("Phone number is required");
      return false;
    }
    if (!/^\d{10}$/.test(contact)) {
      toast.error("Phone must be a 10-digit number");
      return false;
    }
    if (!message.trim()) {
      toast.error("Message is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch(getApiUrl('contact-submit.php'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message || "Message sent successfully");
        setFormData({ name: '', email: '', contact: '', message: '' });
      } else {
        toast.error(data.error || "Failed to send message");
      }
    } catch (error) {
      toast.error("Server error, try again later");
    }
  };

  return (
    <div className="contactus-wrapper">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="contactus-container">
        
        {/* Left Column: Contact Info Card */}
        <div className="contactus-info-card">
          <div
            className="info-card clickable"
            onClick={() =>
              window.open(
                "https://maps.google.com/?q=A-402, Titanium City Center, 100 Feet Anand Nagar Road, Ahmedabad, Gujarat – 380015",
                "_blank"
              )
            }
          >
            <MdLocationOn className="info-icon" />
            <div>
              <h4>Our Address</h4>
              <p>
                A-402, Titanium City Center,<br />
                100 Feet Anand Nagar Road,<br />
                Ahmedabad, Gujarat – 380015
              </p>
            </div>
          </div>

          <div
            className="info-card clickable"
            onClick={() => (window.location.href = "tel:+919403890794")}
          >
            <MdCall className="info-icon" />
            <div>
              <h4>Call Us</h4>
              <p>+91 94038 90794</p>
            </div>
          </div>

          <div
            className="info-card clickable"
            onClick={() => (window.location.href = "mailto:info@franmaxindia.com")}
          >
            <MdEmail className="info-icon" />
            <div>
              <h4>Email</h4>
              <p>info@franmaxindia.com</p>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form with Image */}
        <div className="contactus-main">
          <div className="contactus-main-image">
            <div className="image-overlay"></div>
          </div>
          <div className="contactus-form">
            <h3>Send Us a Message</h3>
            <form onSubmit={handleSubmit}>
              {/* New wrapper for form fields and logo */}
              <div className="form-field-wrapper">
                <div className="form-fields-container">
                  <div className="form-row">
                    <div className="form-field">
                      <MdPerson className="icon" />
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <MdEmail className="icon" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <MdCall className="icon" />
                      <input
                        type="tel"
                        name="contact"
                        placeholder="Phone Number *"
                        value={formData.contact}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                {/* Your logo placed inside the new wrapper */}
                <div className="logo-container">
                    <img src= {logo} alt="Company Logo" className="company-logo" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field full-width">
                  <MdMessage className="icon" />
                  <textarea
                    name="message"
                    placeholder="Your Message *"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit">
                <MdSend className="btn-icon" /> Send Message
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;
