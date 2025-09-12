import { motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import './Home.css'

const Home = () => {
  const projects = [
    {
      title: 'Revit Applications',
      image: '/Images/rvt.png',
      slug: 'revit'
    },
    {
      title: 'AutoCAD Development',
      image: '/Images/autocad.png',
      slug: 'autocad'
    },
    {
      title: 'BIM 360 Solutions',
      image: '/Images/bim360.png',
      slug: 'bim360'
    },
    {
      title: 'Inventor Applications',
      image: '/Images/inventor.png',
      slug: 'inventor'
    },
    {
      title: 'Unity Development',
      image: '/Images/unity.png',
      slug: 'unity'
    },
    {
      title: 'Unreal Engine',
      image: '/Images/unreal.png',
      slug: 'unreal'
    },
    {
      title: 'Desktop Applications',
      image: '/Images/DesktopApp.png',
      slug: 'desktop-apps'
    },
    {
      title: 'Google Drive Integration',
      image: '/Images/googleDrive.png',
      slug: 'google-drive'
    },
    {
      title: 'Word Automation',
      image: '/Images/word.png',
      slug: 'word'
    },
    {
      title: 'PDF Processing',
      image: '/Images/pdf.png',
      slug: 'pdf'
    },
    {
      title: 'UWP Applications',
      image: '/Images/UWP.png',
      slug: 'uwp'
    },
    {
      title: 'Android Development',
      image: '/Images/Android.png',
      slug: 'android'
    },
    {
      title: 'ASP.NET Core',
      image: '/Images/AspNetCore.png',
      slug: 'aspnet-core'
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  return (
    <div className="home">
      <section className="home__projects">
        <div className="container">
          <motion.div
            className="home__projects-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                image={project.image}
                slug={project.slug}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
