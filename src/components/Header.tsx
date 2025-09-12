import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navigation = [
    { name: 'Works', href: '/' },
    { name: 'Videos', href: '/videos' },
    { name: 'News', href: '/news' },
    { name: 'About Me', href: '/about' },
    { name: 'Contacts', href: '/contact' },
  ]

  return (
    <motion.header
      className={`header ${isScrolled ? 'header--scrolled' : ''} ${
        isMenuOpen ? 'header--menu-open' : ''
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container">
        <div className="header__content">
          {/* Mobile Menu Button */}
          <button
            className="header__menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Navigation */}
          <nav className="header__nav">
            <ul className="header__nav-list">
              {navigation.map((item) => (
                <li key={item.name} className="header__nav-item">
                  <Link
                    to={item.href}
                    className={`header__nav-link ${
                      location.pathname === item.href ? 'header__nav-link--active' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Avatar */}
          <motion.div
            className="header__avatar"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <div className="header__avatar-border">
              <img
                src="/AZ_files/badge.jpg"
                alt="AZ Avatar"
                className="header__avatar-img"
                width="50"
                height="50"
              />
            </div>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="header__mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <nav className="header__mobile-nav">
                <ul className="header__mobile-nav-list">
                  {navigation.map((item, index) => (
                    <motion.li
                      key={item.name}
                      className="header__mobile-nav-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.href}
                        className={`header__mobile-nav-link ${
                          location.pathname === item.href ? 'header__mobile-nav-link--active' : ''
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Header
