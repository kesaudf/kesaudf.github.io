import { motion } from 'framer-motion'
import { Calendar, Code, Wrench } from 'lucide-react'
import './News.css'

interface NewsItem {
  date: string
  title: string
  description: string
  category: 'revit' | 'autocad' | 'desktop' | 'web' | 'mobile' | 'other'
}

const News = () => {
  const newsItems: NewsItem[] = [
    {
      date: "27 December - 30 December, 2021",
      title: "Generative Design Application",
      description: "Created an application: generative design.",
      category: "revit"
    },
    {
      date: "6 September - 9 September, 2021",
      title: "Create Hole Files",
      description: "Created an application: Create hole files.",
      category: "revit"
    },
    {
      date: "24 August - 25 August, 2021",
      title: "Align Selected Grids",
      description: "Created an application: Align selected grids by crop views.",
      category: "revit"
    },
    {
      date: "14 August - 20 August, 2021",
      title: "Prefab Layout Complect",
      description: "Created an application: Prefab complect of layouts.",
      category: "revit"
    },
    {
      date: "10 August - 13 August, 2021",
      title: "Schedule Copy Tool",
      description: "Created an application: Copy selected schedule by selected sections and levels.",
      category: "revit"
    },
    {
      date: "2 August - 5 August, 2021",
      title: "Masses from Rooms",
      description: "Created an application: Create masses from rooms.",
      category: "revit"
    },
    {
      date: "28 July - 29 July, 2021",
      title: "MEP Elements Sorting",
      description: "Created an application: Sort MEP elements by systems.",
      category: "revit"
    },
    {
      date: "19 July - 20 July, 2021",
      title: "Duplicate Loads Checker",
      description: "Created an application: Check and find duplicate loads.",
      category: "revit"
    },
    {
      date: "4 July - 5 July, 2021",
      title: "Change Grid Marks",
      description: "Created an application: Change grid marks.",
      category: "revit"
    },
    {
      date: "1 July - 2 July, 2021",
      title: "Grid Dimensions",
      description: "Created an application: Grid dimensions.",
      category: "revit"
    },
    {
      date: "3 June - 22 June, 2021",
      title: "MEP Schedules",
      description: "Created an application: MEP Schedules.",
      category: "revit"
    },
    {
      date: "27 May - 2 June, 2021",
      title: "Project Structure Creator",
      description: "Created an application: Create a projects with given structure.",
      category: "autocad"
    },
    {
      date: "13 May - 19 May, 2021",
      title: "Prefab Elements Replacement",
      description: "Created an application: Replace prefab-elements with walls and slabs in model.",
      category: "revit"
    },
    {
      date: "6 May - 12 May, 2021",
      title: "Opening Instances Converter",
      description: "Created an application: Change instances of opening in walls and floors to special family instances for schedules.",
      category: "revit"
    },
    {
      date: "3 May - 5 May, 2021",
      title: "Group Viewer",
      description: "Created an application: Group viewer.",
      category: "revit"
    },
    {
      date: "27 April - 29 April, 2021",
      title: "Cutting Parts Arrangement",
      description: "Created an application: Arrangement of cutting parts.",
      category: "autocad"
    },
    {
      date: "16 April - 27 April, 2021",
      title: "PDF Editor",
      description: "Created an application: PDF Editor.",
      category: "desktop"
    },
    {
      date: "8 April - 9 April, 2021",
      title: "Cutting Sheets Articles",
      description: "Created an application: Articles for cutting sheets.",
      category: "autocad"
    },
    {
      date: "29 March - 8 April, 2021",
      title: "Project Data Manager",
      description: "Created an application: Project data.",
      category: "revit"
    },
    {
      date: "24 March - 26 March, 2021",
      title: "UWP Converter",
      description: "Created an application: Converter in UWP.",
      category: "mobile"
    },
    {
      date: "22 March - 24 March, 2021",
      title: "OBJ to STL Converter",
      description: "Created an application: Obj->Stl converter.",
      category: "desktop"
    },
    {
      date: "17 March - 19 March, 2021",
      title: "SheetSet Management",
      description: "Created an application: Change numbers, names of layouts and files from selected sheetset.",
      category: "autocad"
    },
    {
      date: "16 March - 17 March, 2021",
      title: "SheetSet Attributes Transfer",
      description: "Created an application: Change main attributes values from one SheetSet to another.",
      category: "autocad"
    },
    {
      date: "12 March - 15 March, 2021",
      title: "Image Cropping Tool",
      description: "Created an application: Crop images.",
      category: "revit"
    },
    {
      date: "3 March - 4 March, 2021",
      title: "MEP Elements Distribution",
      description: "Created an application: Step-by-step distribution of MEP elements.",
      category: "revit"
    },
    {
      date: "3 March, 2021",
      title: "3D Face Hatches",
      description: "Created a program: Create hatches in 3DFaces.",
      category: "autocad"
    },
    {
      date: "26 February - 2 March, 2021",
      title: "Engineering Calculations",
      description: "Finished 2 desktop applications: Heat engineering calculation and Noise calculation",
      category: "desktop"
    },
    {
      date: "24-25 February, 2021",
      title: "Door Intersection Checker",
      description: "Created an application: Check intersection panels with doors from selected link file.",
      category: "revit"
    },
    {
      date: "20 February, 2021",
      title: "Parameter Deletion Tool",
      description: "Created an application: Delete selected list of parameters in FamilyManager.",
      category: "revit"
    },
    {
      date: "17-19 February, 2021",
      title: "Window Intersection Checker",
      description: "Created an application: Check intersection windows with panels from selected link file.",
      category: "revit"
    },
    {
      date: "15-16 February, 2021",
      title: "Column Splitter by Levels",
      description: "Created an application: Split columns by levels.",
      category: "revit"
    },
    {
      date: "9-11 February, 2021",
      title: "Identical Apartments Finder",
      description: "Created an application: Search of identical apartments.",
      category: "revit"
    },
    {
      date: "18-20 January, 2021",
      title: "Facades Creator",
      description: "Created an application: Creation of facades.",
      category: "revit"
    },
    {
      date: "14-16 January, 2021",
      title: "Massive Family Loading",
      description: "Created an application: Massive library families loading.",
      category: "revit"
    },
    {
      date: "13 January, 2021",
      title: "Parameter Values Filler",
      description: "Created an application: filled parameter values by special rules.",
      category: "revit"
    },
    {
      date: "10-12 January, 2021",
      title: "Conduit Family Replacer",
      description: "Created an application: replace of families of ConduitFitting category for families of ElectricalEquipment category with savings connectors in it.",
      category: "revit"
    },
    {
      date: "30 December, 2020",
      title: "Worksets Assignment",
      description: "Created an application: Belongs to worksets.",
      category: "revit"
    },
    {
      date: "25-29 December, 2020",
      title: "Wall Checker",
      description: "Created an application: check walls.",
      category: "revit"
    },
    {
      date: "21-24 December, 2020",
      title: "Camera Image Views",
      description: "Created an application: create an image Views from videocameras.",
      category: "revit"
    },
    {
      date: "11-12 December, 2020",
      title: "Grid Checker",
      description: "Created an application: check grids.",
      category: "revit"
    },
    {
      date: "7-10 December, 2020",
      title: "Stepwise Element Splitting",
      description: "Created an application: stepwise splitting of elements.",
      category: "revit"
    },
    {
      date: "9-21 November, 2020",
      title: "Multi-Category Element Splitter",
      description: "Created an application: split elements from following categories - Floor, Structural Foundation and Wall.",
      category: "revit"
    },
    {
      date: "5-10 October, 2020",
      title: "ViewSections by Walls",
      description: "Created an application: creates a ViewSections by selected Walls and fill information about nearest grids.",
      category: "revit"
    },
    {
      date: "9-13 October, 2020",
      title: "Inventor JSON Exporter",
      description: "Created an application: export JSON-file from Bills of Materials in Inventor.",
      category: "other"
    },
    {
      date: "2-5 October, 2020",
      title: "Grid Renamer",
      description: "Created an application: rename grids by selecting it.",
      category: "revit"
    },
    {
      date: "17-21 August, 2020",
      title: "File Validation Tool",
      description: "Created an application: check files for deviated walls and mirrored windows and doors in it.",
      category: "revit"
    },
    {
      date: "11-16 August, 2020",
      title: "BIM360 Template Importer",
      description: "Created an application: import a selected templates in default 3D views in selected files for BIM360 publication.",
      category: "revit"
    },
    {
      date: "31 August-3 September, 2020",
      title: "Collision Detection & 3D Views",
      description: "Created an application: creates a collision lists and creates a 3Dviews based on these intersection elements.",
      category: "revit"
    },
    {
      date: "26-28 August, 2020",
      title: "BIM360 File Downloader",
      description: "Created an application: download files in BIM360.",
      category: "other"
    },
    {
      date: "5-12 August, 2020",
      title: "Budget Calculator",
      description: "Created an application: fullfill family types parameters to calculate a budget.",
      category: "revit"
    },
    {
      date: "31 June-3 August, 2020",
      title: "Rebar Shape Display",
      description: "Created an application: display Rebar shape when user click on a FamilyInstance.",
      category: "revit"
    },
    {
      date: "27-30 July, 2020",
      title: "Room Finishes Manager",
      description: "Created an application: rooms finishes by list.",
      category: "revit"
    },
    {
      date: "20-24 July, 2020",
      title: "Intersection Family Parameters",
      description: "Created an application: Copy parameter values of intersection families from list of selected family categories.",
      category: "revit"
    },
    {
      date: "15-21 July, 2020",
      title: "BIM360 File Uploader",
      description: "Created an application: upload files in BIM360.",
      category: "other"
    },
    {
      date: "9-10 July, 2020",
      title: "View Synchronization",
      description: "Created an application: synchonization position, rotation angle of all views in active file relatively active view.",
      category: "revit"
    },
    {
      date: "6-8 July, 2020",
      title: "Model Information & Reports",
      description: "Created an application: get information from model and create a reports.",
      category: "revit"
    },
    {
      date: "30 June-3 July, 2020",
      title: "BIM360 File List Exporter",
      description: "Created an application: export csv-files which consists of information about BIM-files from selected projects.",
      category: "other"
    },
    {
      date: "8 June-2 July, 2020",
      title: "Wind Loads Generator",
      description: "Created an application: generation a wind loads.",
      category: "revit"
    },
    {
      date: "24-29 June, 2020",
      title: "BIM360 User Manager",
      description: "Created an application: add selected users in BIM360 projects.",
      category: "other"
    },
    {
      date: "18-19 June, 2020",
      title: "Rebar Constraints Controller",
      description: "Created an application: switch on/off rebar constraints.",
      category: "revit"
    },
    {
      date: "17-18 June, 2020",
      title: "Word Text Styles Purger",
      description: "Created an application: purge unused text styles in MS Word files.",
      category: "desktop"
    },
    {
      date: "15-16 June, 2020",
      title: "Schedule Copier & Modifier",
      description: "Created plugin which allow to copy a selected schedule and change certain parameters in headers,titles and filters in this copies.",
      category: "revit"
    },
    {
      date: "6-7 June, 2020",
      title: "Reinforcement Parameter Filler",
      description: "Created an application which fills a reinforcement parameter values by values from base elements.",
      category: "revit"
    },
    {
      date: "5 June, 2020",
      title: "Central File Detacher",
      description: "Created an application for detach Central files with discard worksets.",
      category: "revit"
    },
    {
      date: "2-4 June, 2020",
      title: "Family Updater & Copier",
      description: "Created an application for update and copy families from selected files.",
      category: "revit"
    },
    {
      date: "29 May-1 June, 2020",
      title: "Room Schedules by Sections",
      description: "Created an application to create a room schedules which divided into model sections and levels.",
      category: "revit"
    },
    {
      date: "28 May, 2020",
      title: "Google Drive File Lister",
      description: "Created application for creating a list of files(folder name, name and DriveId) from GoogleDrive. It search by ID folder and export list to Excel-format file",
      category: "other"
    },
    {
      date: "11-24 May, 2020",
      title: "Element Copier & Key Schedule Importer",
      description: "Created 2 applications in Autodesk Revit: 1. copy elements from files(includes link files); 2. import strings into key schedules",
      category: "revit"
    },
    {
      date: "7-8 May, 2020",
      title: "Schedule Excel Exporter",
      description: "Created application in Autodesk Revit: export schedules from Revit files in XLSX-format",
      category: "revit"
    }
  ]

  const getCategoryIcon = (category: NewsItem['category']) => {
    switch (category) {
      case 'revit':
      case 'autocad':
        return <Wrench size={20} />
      case 'desktop':
      case 'mobile':
        return <Code size={20} />
      default:
        return <Calendar size={20} />
    }
  }

  const getCategoryColor = (category: NewsItem['category']) => {
    switch (category) {
      case 'revit':
        return '#e74c3c'
      case 'autocad':
        return '#f39c12'
      case 'desktop':
        return '#3498db'
      case 'mobile':
        return '#9b59b6'
      case 'web':
        return '#2ecc71'
      default:
        return '#95a5a6'
    }
  }

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    },
  }

  return (
    <div className="news">
      <div className="container">
        <motion.div
          className="news__header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="news__title">News & Updates</h1>
          <p className="news__subtitle">
            Latest developments and project releases
          </p>
        </motion.div>

        <motion.div
          className="news__timeline"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {newsItems.map((item, index) => (
            <motion.article
              key={index}
              className="news__item"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="news__item-content">
                <div className="news__item-header">
                  <div 
                    className="news__item-icon"
                    style={{ backgroundColor: getCategoryColor(item.category) }}
                  >
                    {getCategoryIcon(item.category)}
                  </div>
                  <div className="news__item-meta">
                    <time className="news__item-date">{item.date}</time>
                    <span 
                      className="news__item-category"
                      style={{ color: getCategoryColor(item.category) }}
                    >
                      {item.category.toUpperCase()}
                    </span>
                  </div>
                </div>
                <h2 className="news__item-title">{item.title}</h2>
                <p className="news__item-description">{item.description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default News
