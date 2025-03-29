import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@/styles/form.module.css';
import { FaAngleRight } from "react-icons/fa";
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    number: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        'service_is73nbr',
        'template_faxqlfg',
        {
          from_name: form.name,
          to_name: "Pushkar",
          from_email: form.email,
          to_email: "pushkarsharma2699@gmail.com",
          message: form.message,
        },
        'lV5F3onBxFxqPEnCl'
      )
      .then(
        () => {
          setLoading(false);
          showNotification("Thank you. I will get back to you as soon as possible.");
          setForm({
            name: "",
            number: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          showNotification("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <>
      <div 
        className={styles.container}
      >
        <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
          <h2 className={styles.heading}>Contact</h2>
          <div className={styles.flex1}>
            <input 
              type="text" 
              name="name" 
              placeholder="Name" 
              value={form.name} 
              onChange={handleChange} 
              className={styles.input} 
              required 
            />
            <input 
              type="tel" 
              name="number" 
              placeholder="Number" 
              value={form.number} 
              onChange={handleChange} 
              className={styles.input} 
              required 
            />
          </div>
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={form.email} 
            onChange={handleChange} 
            className={styles.input} 
            required 
          />
          <div className={styles.flex2}>
            <textarea 
              name="message" 
              placeholder="Message" 
              value={form.message} 
              onChange={handleChange} 
              className={styles.textarea} 
              required 
            />
            <button type="submit" className={styles.button}>
              <FaAngleRight />
            </button>
          </div>
        </form>
      </div>

      {/* Notification Modal */}
      <AnimatePresence>
        {notification && (
          <motion.div
            className={styles.notification}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ContactForm;
