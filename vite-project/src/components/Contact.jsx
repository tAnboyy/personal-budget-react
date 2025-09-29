import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
  };

  return (
    <main id="main">
      <div className="page-area">
        <h1>Contact Us</h1>
        <article>
          <h2>Get in Touch</h2>
          <p>Have questions about Personal Budget? We'd love to hear from you!</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div>
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows="5"
                required
              />
            </div>
            <button type="submit">Send Message</button>
          </form>
        </article>
      </div>
    </main>
  );
};

export default Contact;