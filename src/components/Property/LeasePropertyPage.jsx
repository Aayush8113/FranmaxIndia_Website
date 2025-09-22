import React from 'react';
import LeasePropertyForm from './LeasePropertyForm';
import './LeasePropertyPage.css';

const LeasePropertyPage = () => {
  return (
    <div className="lease-page-container">
      {/* Hero Section */}
      <header className="lease-page-hero">
        <div className="hero-overlay">
          <h1>Lease Your Property with <span>Franmax India</span></h1>
          <p>Professional • Reliable • Transparent Leasing Experience</p>
        </div>
      </header>

      {/* Intro Section */}
      <section className="lease-page-intro">
        <h2>Why Property Owners Trust Us</h2>
        <p>
          Franmax India provides a seamless leasing experience for commercial property owners. 
          From warehouses to showrooms, we connect you with verified leads, manage leasing formalities, 
          and ensure you lease your property with confidence and peace of mind.
        </p>
      </section>

      {/* Form Section */}
      <section className="lease-form-section">
        <div className="lease-form-card">
          <h3 className="lease-form-title">Submit Your Property Details</h3>
          <p className="lease-form-subtitle">
            Fill in the details below and let us help you connect with the right tenants.
          </p>
          <LeasePropertyForm />
        </div>
      </section>
    </div>
  );
};

export default LeasePropertyPage;
