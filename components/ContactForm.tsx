'use client';

import { useState, useRef } from 'react';
import { Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Check if EmailJS is configured
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey || 
        serviceId.includes('your_') || templateId.includes('your_') || publicKey.includes('your_')) {
      console.error('EmailJS is not configured properly. Please set up your EmailJS credentials in .env.local');
      setSubmitStatus('error');
      setErrorMessage('EmailJS is not configured properly. Please set up your credentials.');
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
      return;
    }

    try {
      // Send email using EmailJS
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current!,
        publicKey
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        
        // Reset status after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setErrorMessage('Failed to send message. Please try again.');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error: any) {
      // Check for specific configuration errors
      if (error?.status === 422 && error?.text?.includes('recipients address is empty')) {
        console.error('🚨 CONFIGURATION ERROR: Your EmailJS template is missing the "To Email" field.');
        const msg = 'Configuration Error: EmailJS template is missing "To Email" field.';
        setErrorMessage(msg);
      } else {
        console.error('EmailJS error:', error);
        setErrorMessage('Failed to send message. Please try again.');
      }

      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="glass rounded-xl p-8 space-y-6">
      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg bg-dark-700/50 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-primary-cyan transition-colors"
          placeholder="Your name"
        />
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg bg-dark-700/50 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-primary-cyan transition-colors"
          placeholder="your@email.com"
        />
      </div>

      {/* Message Textarea */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 rounded-lg bg-dark-700/50 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-primary-cyan transition-colors resize-none"
          placeholder="Your message..."
        />
      </div>

      {/* Submit Button */}
      <div className=" w-full flex items-center justify-center" >
        <button
          type="submit"
          disabled={isSubmitting}
          className="glass-btn glass-btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="justify-center">
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                SEND MESSAGE
                <Send size={18} />
              </>
            )}
          </span>
        </button>
      </div>

      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/50 text-green-400 text-center">
          Message sent successfully! 🎉
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-center">
          {errorMessage || 'Failed to send message. Please try again.'}
        </div>
      )}
    </form>
  );
}
