import { motion } from 'framer-motion'
import { Mail, Send, ExternalLink } from 'lucide-react'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const links = [
    {
      href: 'https://kesaudf.github.io/',
      label: 'kesaudf.github.io',
      icon: <ExternalLink size={16} />,
    },
    {
      href: 'mailto:alexapperwelt@mail.com',
      label: 'e-mail',
      icon: <Mail size={16} />,
    },
    {
      href: 'https://t.me/AlexApperwelt',
      label: 'telegram',
      icon: <Send size={16} />,
    },
  ]

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="container">
        <div className="footer__content">
          <p className="footer__copyright">
            <span className="footer__name">AZ</span>
            <span className="footer__separator">•</span>
            <span className="footer__year">2021 - {currentYear}</span>
          </p>
          
          <div className="footer__links">
            {links.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="footer__link"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.icon}
                <span>{link.label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
