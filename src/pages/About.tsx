import { motion } from 'framer-motion'
import './About.css'

const About = () => {
  return (
    <div className="about">
      <div className="container">
        <motion.div
          className="about__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="about__grid">
            <motion.div
              className="about__image-section"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="about__image-container">
                <img
                  src="/AZ_files/badge.jpg"
                  alt="Alex Zvonarev"
                  className="about__image"
                />
              </div>
            </motion.div>

            <motion.div
              className="about__text-section"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h1 className="about__title">About</h1>
              
              <div className="about__description">
                <p className="about__role">
                  Senior Software Development Engineer at{' '}
                  <a
                    href="https://www.autodesk.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about__link"
                  >
                    Autodesk
                  </a>
                </p>
                
                <p className="about__passion">
                  I have a passion for responsive design, technology, and computer science, 
                  which has led me to stay involved in sustainability and technology 
                  initiatives at Autodesk.
                </p>

                <div className="about__skills">
                  <h2 className="about__skills-title">Expertise</h2>
                  <div className="about__skills-grid">
                    <div className="about__skill-category">
                      <h3>BIM & CAD</h3>
                      <ul>
                        <li>Autodesk Revit API</li>
                        <li>AutoCAD .NET API</li>
                        <li>Inventor API</li>
                        <li>BIM 360 Integration</li>
                      </ul>
                    </div>
                    <div className="about__skill-category">
                      <h3>Development</h3>
                      <ul>
                        <li>C# / .NET</li>
                        <li>ASP.NET Core</li>
                        <li>TypeScript / React</li>
                        <li>Unity / Unreal Engine</li>
                      </ul>
                    </div>
                    <div className="about__skill-category">
                      <h3>Platforms</h3>
                      <ul>
                        <li>Desktop Applications</li>
                        <li>Web Applications</li>
                        <li>Mobile (Android)</li>
                        <li>Cloud Solutions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About
