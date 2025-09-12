import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create mailto link as fallback
      const subject = encodeURIComponent(`Message from ${formData.name}`)
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
      const mailtoLink = `mailto:alexapperwelt@mail.com?subject=${subject}&body=${body}`
      
      window.open(mailtoLink, '_blank')
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactLinks = [
    {
      icon: <Send size={24} />,
      label: 'Telegram',
      value: 'AlexApperwelt',
      href: 'https://t.me/AlexApperwelt',
      color: '#0088cc'
    },
    {
      icon: <Mail size={24} />,
      label: 'Email',
      value: 'alexapperwelt@mail.com',
      href: 'mailto:alexapperwelt@mail.com',
      color: '#ea4335'
    }
  ]

  return (
    <div className="contact">
      <div className="container">
        <motion.div
          className="contact__header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="contact__title">Contact</h1>
          <p className="contact__subtitle">Let's connect and get acquainted!</p>
        </motion.div>

        <div className="contact__content">
          <motion.div
            className="contact__links"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="contact__links-title">Get in Touch</h2>
            {contactLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="contact__link"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div 
                  className="contact__link-icon"
                  style={{ backgroundColor: link.color }}
                >
                  {link.icon}
                </div>
                <div className="contact__link-content">
                  <span className="contact__link-label">{link.label}</span>
                  <span className="contact__link-value">{link.value}</span>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="contact__form-container"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <form className="contact__form" onSubmit={handleSubmit}>
              <h2 className="contact__form-title">Send a Message</h2>
              
              {submitStatus === 'success' && (
                <motion.div
                  className="contact__status contact__status--success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle size={20} />
                  <span>Your email client should open with the message ready to send!</span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  className="contact__status contact__status--error"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <AlertCircle size={20} />
                  <span>Something went wrong. Please try again or contact me directly.</span>
                </motion.div>
              )}

              <div className="contact__form-group">
                <label htmlFor="name" className="contact__form-label">
                  <User size={18} />
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="contact__form-input"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="contact__form-group">
                <label htmlFor="email" className="contact__form-label">
                  <Mail size={18} />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="contact__form-input"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="contact__form-group">
                <label htmlFor="message" className="contact__form-label">
                  <MessageSquare size={18} />
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="contact__form-textarea"
                  rows={5}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <motion.button
                type="submit"
                className="contact__form-submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="contact__form-spinner" />
                    Preparing...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contact
