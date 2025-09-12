import { useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Code, Wrench, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import VideoPlayer from '../components/VideoPlayer'
import './ProjectDetail.css'

interface ProjectData {
  title: string
  image: string
  description: string
  longDescription: string
  technologies: string[]
  features: string[]
  category: string
  year: string
  status: string
  videos?: string[]
}

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>()

  // Project data mapping
  const projectsData: Record<string, ProjectData> = {
    'revit': {
      title: 'Revit Applications',
      image: '/Images/rvt.png',
      description: 'Advanced Revit plugins and applications for BIM workflows',
      longDescription: 'Comprehensive suite of Revit applications designed to streamline BIM workflows and enhance productivity. These applications cover various aspects of building design, from structural elements to MEP systems, providing automated solutions for complex design challenges.',
      technologies: ['C#', '.NET Framework', 'Revit API', 'WPF', 'MVVM'],
      features: [
        'Generative design algorithms',
        'Automated grid alignment',
        'MEP system organization',
        'Schedule management tools',
        'Mass creation from rooms',
        'Collision detection systems'
      ],
      category: 'BIM/CAD',
      year: '2020-2021',
      status: 'Active Development',
      videos: ['AlignGrids.mp4', 'ChangeGridModes.mp4', 'MEPSchedules.mp4', 'GenericDesign.mp4']
    },
    'autocad': {
      title: 'AutoCAD Development',
      image: '/Images/autocad.png',
      description: 'Custom AutoCAD applications and automation tools',
      longDescription: 'Specialized AutoCAD applications that automate repetitive tasks and enhance drafting efficiency. These tools focus on sheet management, layout automation, and drawing standardization.',
      technologies: ['C#', '.NET', 'AutoCAD API', 'ObjectARX', 'LISP'],
      features: [
        'SheetSet management',
        'Layout automation',
        'Attribute synchronization',
        'Drawing standardization',
        'Batch processing tools'
      ],
      category: 'CAD',
      year: '2021',
      status: 'Completed',
      videos: ['CreateDWGProject.mp4', 'ExternalLinkPlot.mp4']
    },
    'bim360': {
      title: 'BIM 360 Solutions',
      image: '/Images/bim360.png',
      description: 'Cloud-based BIM collaboration and project management',
      longDescription: 'Integrated solutions for BIM 360 platform that enable seamless collaboration, file management, and project coordination in cloud-based environments.',
      technologies: ['C#', 'REST API', 'OAuth 2.0', 'JSON', 'HTTP Client'],
      features: [
        'File upload/download automation',
        'User management',
        'Project coordination',
        'Version control',
        'Access permissions'
      ],
      category: 'Cloud/BIM',
      year: '2020',
      status: 'Maintained',
      videos: ['AddUsersToBIM360Projects.mp4', 'DownloadFilesBIM60.mp4', 'UploadFilesBIM60.mp4', 'ExportBIM360FileList.mp4', 'TemplatesForBIM360.mp4']
    },
    'unity': {
      title: 'Unity Development',
      image: '/Images/unity.png',
      description: 'Game development and interactive 3D applications',
      longDescription: 'Interactive 3D applications and games built with Unity engine, focusing on visualization, simulation, and user engagement.',
      technologies: ['C#', 'Unity Engine', 'Shader Programming', '3D Graphics', 'Physics'],
      features: [
        '3D visualization',
        'Interactive simulations',
        'Custom shaders',
        'Physics simulations',
        'User interface design'
      ],
      category: 'Game Development',
      year: '2021',
      status: 'Active',
      videos: ['ThirdPerson.mp4', 'Breakout.mp4']
    },
    'unreal': {
      title: 'Unreal Engine',
      image: '/Images/unreal.png',
      description: 'High-end 3D visualization and game development',
      longDescription: 'Advanced 3D applications built with Unreal Engine, focusing on high-quality visualization, architectural rendering, and interactive experiences.',
      technologies: ['C++', 'Blueprint', 'Unreal Engine', 'Materials', 'Lighting'],
      features: [
        'Photorealistic rendering',
        'Real-time visualization',
        'Interactive walkthroughs',
        'Advanced lighting systems',
        'Material creation'
      ],
      category: 'Game Development',
      year: '2021',
      status: 'Active',
      videos: ['TableChairUnrealEngine.mp4']
    },
    'inventor': {
      title: 'Inventor Applications',
      image: '/Images/inventor.png',
      description: 'Mechanical design automation and manufacturing solutions',
      longDescription: 'Specialized Inventor applications for mechanical design automation, manufacturing optimization, and CAD workflow enhancement.',
      technologies: ['C#', '.NET', 'Inventor API', 'COM', 'Windows Forms'],
      features: [
        'Design automation',
        'Part arrangement optimization',
        'Manufacturing workflows',
        'JSON data export',
        'Assembly management'
      ],
      category: 'CAD/Manufacturing',
      year: '2020-2021',
      status: 'Active',
      videos: ['JSONExportFromInventor.mp4', 'ArrangementCuttingParts.mp4', 'AxlePulling.mp4']
    },
    'desktop-apps': {
      title: 'Desktop Applications',
      image: '/Images/DesktopApp.png',
      description: 'Custom desktop software solutions',
      longDescription: 'Suite of desktop applications built for various business needs, including calculators, productivity tools, and utility applications.',
      technologies: ['C#', 'WPF', '.NET Framework', 'MVVM', 'SQLite'],
      features: [
        'User-friendly interfaces',
        'Data persistence',
        'Cross-platform compatibility',
        'Automated workflows',
        'Business logic implementation'
      ],
      category: 'Desktop Development',
      year: '2020-2022',
      status: 'Maintained',
      videos: ['Calculator_Android.mp4', 'AgeInMinutesApplication.mp4', 'TodoList.mp4', 'Budget.mp4']
    },
    'google-drive': {
      title: 'Google Drive Integration',
      image: '/Images/googleDrive.png',
      description: 'Cloud storage integration and automation',
      longDescription: 'Applications that integrate with Google Drive API for automated file management, synchronization, and cloud-based workflows.',
      technologies: ['C#', 'Google Drive API', 'OAuth 2.0', 'REST', 'JSON'],
      features: [
        'File synchronization',
        'Automated backups',
        'Batch operations',
        'Access management',
        'Cloud integration'
      ],
      category: 'Cloud Integration',
      year: '2021',
      status: 'Active',
      videos: ['ExportFileListFromGoogleDrive.mp4']
    },
    'word': {
      title: 'Word Automation',
      image: '/Images/word.png',
      description: 'Document processing and automation tools',
      longDescription: 'Microsoft Word automation tools for document processing, template management, and text manipulation workflows.',
      technologies: ['C#', 'Office Interop', 'VSTO', 'COM', '.NET'],
      features: [
        'Document automation',
        'Template processing',
        'Style management',
        'Batch operations',
        'Text manipulation'
      ],
      category: 'Office Automation',
      year: '2021',
      status: 'Completed',
      videos: ['PurgeTextStylesWord.mp4']
    },
    'pdf': {
      title: 'PDF Processing',
      image: '/Images/pdf.png',
      description: 'PDF manipulation and processing applications',
      longDescription: 'Comprehensive PDF processing tools for document manipulation, stamp management, and automated PDF workflows.',
      technologies: ['C#', 'iTextSharp', 'PDFSharp', '.NET', 'File I/O'],
      features: [
        'PDF manipulation',
        'Stamp management',
        'Document merging',
        'Text extraction',
        'Automated processing'
      ],
      category: 'Document Processing',
      year: '2020-2021',
      status: 'Active',
      videos: ['ChangePDFStamps.mp4', 'ExportPDF.mp4', 'PDFOperations.mp4']
    },
    'uwp': {
      title: 'UWP Applications',
      image: '/Images/UWP.png',
      description: 'Universal Windows Platform applications',
      longDescription: 'Modern Windows applications built with Universal Windows Platform, focusing on cross-device compatibility and modern UI design.',
      technologies: ['C#', 'XAML', 'UWP', 'Windows 10', 'MVVM'],
      features: [
        'Cross-device compatibility',
        'Modern UI design',
        'Touch optimization',
        'Live tiles',
        'Windows Store deployment'
      ],
      category: 'Windows Development',
      year: '2021',
      status: 'Completed',
      videos: ['UWPConverter.mp4']
    },
    'android': {
      title: 'Android Development',
      image: '/Images/Android.png',
      description: 'Mobile applications for Android platform',
      longDescription: 'Native Android applications focusing on productivity, education, and utility tools for mobile users.',
      technologies: ['Java', 'Android SDK', 'XML', 'SQLite', 'Material Design'],
      features: [
        'Native performance',
        'Material Design UI',
        'Offline functionality',
        'Data persistence',
        'User-friendly interfaces'
      ],
      category: 'Mobile Development',
      year: '2021-2022',
      status: 'Active',
      videos: ['Calculator_Android.mp4', 'QuizApp_Android.mp4']
    },
    'aspnet-core': {
      title: 'ASP.NET Core',
      image: '/Images/AspNetCore.png',
      description: 'Web applications and APIs with ASP.NET Core',
      longDescription: 'Modern web applications and RESTful APIs built with ASP.NET Core, focusing on performance, scalability, and cross-platform deployment.',
      technologies: ['C#', 'ASP.NET Core', 'Entity Framework', 'SQL Server', 'REST API'],
      features: [
        'RESTful API design',
        'Database integration',
        'Authentication & authorization',
        'Cross-platform deployment',
        'Scalable architecture'
      ],
      category: 'Web Development',
      year: '2021-2022',
      status: 'Active',
      videos: ['AspNETCore_Application.mp4']
    }
  }

  const project = slug ? projectsData[slug] : null

  if (!project) {
    return <Navigate to="/" replace />
  }

  const getCategoryIcon = (category: string) => {
    if (category.includes('BIM') || category.includes('CAD')) {
      return <Wrench size={20} />
    }
    return <Code size={20} />
  }

  return (
    <div className="project-detail">
      <div className="container">
        <motion.div
          className="project-detail__header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="project-detail__back-link">
            <ArrowLeft size={20} />
            Back to Projects
          </Link>
          
          <div className="project-detail__hero">
            <div className="project-detail__hero-content">
              <motion.h1
                className="project-detail__title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {project.title}
              </motion.h1>
              
              <motion.p
                className="project-detail__description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {project.description}
              </motion.p>

              <motion.div
                className="project-detail__meta"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="project-detail__meta-item">
                  {getCategoryIcon(project.category)}
                  <span>{project.category}</span>
                </div>
                <div className="project-detail__meta-item">
                  <Calendar size={20} />
                  <span>{project.year}</span>
                </div>
                <div className="project-detail__meta-item project-detail__meta-item--status">
                  <span className="project-detail__status">{project.status}</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="project-detail__hero-image"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="project-detail__image"
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="project-detail__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="project-detail__grid">
            <div className="project-detail__main">
              <section className="project-detail__section">
                <h2 className="project-detail__section-title">About This Project</h2>
                <p className="project-detail__long-description">
                  {project.longDescription}
                </p>
              </section>

              <section className="project-detail__section">
                <h2 className="project-detail__section-title">Key Features</h2>
                <ul className="project-detail__features">
                  {project.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className="project-detail__feature"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                    >
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </section>

              {project.videos && project.videos.length > 0 && (
                <section className="project-detail__section">
                  <h2 className="project-detail__section-title">
                    <Play size={24} />
                    Video Demonstrations
                  </h2>
                  <div className="project-detail__videos">
                    {project.videos.map((video, index) => (
                      <motion.div
                        key={video}
                        className="project-detail__video"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 + index * 0.2, duration: 0.4 }}
                      >
                        <VideoPlayer
                          src={`/Video_Source/${video}`}
                          title={video.replace('.mp4', '').replace(/([A-Z])/g, ' $1').trim()}
                          width="100%"
                          height="300px"
                        />
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div className="project-detail__sidebar">
              <section className="project-detail__section">
                <h2 className="project-detail__section-title">Technologies</h2>
                <div className="project-detail__technologies">
                  {project.technologies.map((tech, index) => (
                    <motion.span
                      key={index}
                      className="project-detail__tech"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + index * 0.1, duration: 0.3 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </section>

              <section className="project-detail__section">
                <h2 className="project-detail__section-title">Project Info</h2>
                <div className="project-detail__info">
                  <div className="project-detail__info-item">
                    <strong>Category:</strong>
                    <span>{project.category}</span>
                  </div>
                  <div className="project-detail__info-item">
                    <strong>Year:</strong>
                    <span>{project.year}</span>
                  </div>
                  <div className="project-detail__info-item">
                    <strong>Status:</strong>
                    <span className="project-detail__status">{project.status}</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProjectDetail
