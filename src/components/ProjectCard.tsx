import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ExternalLink, Play } from 'lucide-react'
import { useState } from 'react'
import VideoPlayer from './VideoPlayer'
import './ProjectCard.css'

export interface ProjectCardProps {
  title: string
  image: string
  slug: string
  description?: string
  external?: boolean
  index?: number
  videos?: string[]
}

const ProjectCard = ({ title, image, slug, description, external = false, index = 0, videos = [] }: ProjectCardProps) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  const handleImageError = () => {
    console.error(`Failed to load image: ${image} for project: ${title}`)
    setImageError(true)
  }

  const handleImageLoad = () => {
    console.log(`Successfully loaded image: ${image} for project: ${title}`)
    setImageLoaded(true)
  }

  const CardContent = () => (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => videos.length > 0 && setShowVideo(true)}
      onHoverEnd={() => setShowVideo(false)}
    >
      <div className="project-card__image-container">
        {showVideo && videos.length > 0 ? (
          <div className="project-card__video-container">
            <VideoPlayer
              src={`/Video_Source/${videos[0]}`}
              title={videos[0].replace('.mp4', '').replace(/([A-Z])/g, ' $1').trim()}
              autoPlay={true}
              muted={true}
              width="100%"
              height="100%"
              className="project-card__video"
            />
          </div>
        ) : imageError ? (
          <div className="project-card__image-placeholder">
            <div className="project-card__image-error">
              <span>Image not found</span>
              <small>{image}</small>
            </div>
          </div>
        ) : (
          <img
            src={image}
            alt={title}
            className={`project-card__image ${!imageLoaded ? 'project-card__image--loading' : ''}`}
            loading="lazy"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        )}
        <div className="project-card__overlay">
          {videos.length > 0 && !showVideo && (
            <div className="project-card__video-indicator">
              <Play size={24} />
              <span>{videos.length} video{videos.length > 1 ? 's' : ''}</span>
            </div>
          )}
          {external && <ExternalLink className="project-card__external-icon" size={20} />}
        </div>
      </div>
      
      {description && (
        <div className="project-card__content">
          <h3 className="project-card__title">{title}</h3>
          <p className="project-card__description">{description}</p>
        </div>
      )}
    </motion.div>
  )

  if (external) {
    return (
      <a
        href={slug}
        target="_blank"
        rel="noopener noreferrer"
        className="project-card__link project-card__link--external"
        aria-label={`Open ${title} in new tab`}
      >
        <CardContent />
      </a>
    )
  }

  return (
    <Link
      to={`/project/${slug}`}
      className="project-card__link"
      aria-label={`View ${title} project details`}
    >
      <CardContent />
    </Link>
  )
}

export default ProjectCard
