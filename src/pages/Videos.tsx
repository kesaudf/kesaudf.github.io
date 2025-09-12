import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Play, Grid, List } from 'lucide-react'
import VideoPlayer from '../components/VideoPlayer'
import './Videos.css'

interface VideoData {
  id: string
  title: string
  filename: string
  category: string
  description: string
  tags: string[]
}

const Videos = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Video data with proper titles and categories
  const videos: VideoData[] = [
    // BIM360 Videos
    {
      id: 'add-users-bim360',
      title: 'Add Users to BIM360 Projects',
      filename: 'AddUsersToBIM360Projects.mp4',
      category: 'BIM360',
      description: 'Automate user management in BIM360 projects',
      tags: ['bim360', 'users', 'automation', 'cloud']
    },
    {
      id: 'export-bim360-filelist',
      title: 'Export BIM360 File List',
      filename: 'ExportBIM360FileList.mp4',
      category: 'BIM360',
      description: 'Export CSV files with information about BIM files from selected projects',
      tags: ['bim360', 'export', 'csv', 'files']
    },
    {
      id: 'upload-files-bim360',
      title: 'Upload Files to BIM360',
      filename: 'UploadFilesBIM60.mp4',
      category: 'BIM360',
      description: 'Upload files to BIM360 cloud platform',
      tags: ['bim360', 'upload', 'files', 'cloud']
    },
    {
      id: 'download-files-bim360',
      title: 'Download Files from BIM360',
      filename: 'DownloadFilesBIM60.mp4',
      category: 'BIM360',
      description: 'Download files from BIM360 cloud platform',
      tags: ['bim360', 'download', 'files', 'cloud']
    },

    // Android Apps
    {
      id: 'age-in-minutes',
      title: 'Age in Minutes Calculator',
      filename: 'AgeInMinutesApplication.mp4',
      category: 'Mobile Apps',
      description: 'Calculate age in minutes from selected date',
      tags: ['android', 'calculator', 'age', 'mobile']
    },
    {
      id: 'android-calculator',
      title: 'Calculator Android App',
      filename: 'Calculator_Android.mp4',
      category: 'Mobile Apps',
      description: 'Feature-rich calculator application for Android',
      tags: ['android', 'calculator', 'mobile', 'app']
    },
    {
      id: 'quiz-app-android',
      title: 'Quiz App Android',
      filename: 'QuizApp_Android.mp4',
      category: 'Mobile Apps',
      description: 'Country quiz game for Android platform',
      tags: ['android', 'quiz', 'game', 'mobile']
    },
    {
      id: 'todo-list-android',
      title: 'Todo List Android',
      filename: 'TodoList.mp4',
      category: 'Mobile Apps',
      description: 'Task management app with completed task deletion',
      tags: ['android', 'todo', 'tasks', 'mobile']
    },

    // AutoCAD Videos
    {
      id: 'copy-dim-table',
      title: 'Copy Dimensions to Table',
      filename: 'CopyDimTable.mp4',
      category: 'AutoCAD',
      description: 'Copy selected dimensions into selected table',
      tags: ['autocad', 'dimensions', 'table', 'copy']
    },
    {
      id: 'create-dwg-project',
      title: 'Create DWG Project Structure',
      filename: 'CreateDWGProject.mp4',
      category: 'AutoCAD',
      description: 'Create projects with DWG files and predefined structure',
      tags: ['autocad', 'dwg', 'project', 'structure']
    },
    {
      id: 'copy-sheetset-parameters',
      title: 'Copy SheetSet Parameters',
      filename: 'CopyParametersMainSheetSetToSel.mp4',
      category: 'AutoCAD',
      description: 'Copy main parameters from one sheetset to selected sheetsets',
      tags: ['autocad', 'sheetset', 'parameters', 'copy']
    },
    {
      id: 'change-layout-names',
      title: 'Change Layout Names and Numbers',
      filename: 'ChangeNumbersNamesLayoutsSheetsSets.mp4',
      category: 'AutoCAD',
      description: 'Change numbers and names of layouts and files from selected sheetset',
      tags: ['autocad', 'layouts', 'names', 'sheetset']
    },
    {
      id: 'articles-cut-sheets',
      title: 'Articles for Cutting Sheets',
      filename: 'ArcticlesCutSheets.mp4',
      category: 'AutoCAD',
      description: 'Create text in selected solid3d with geometrical values',
      tags: ['autocad', 'solid3d', 'cutting', 'geometry']
    },
    {
      id: 'arrangement-cutting-parts',
      title: 'Arrangement of Cutting Parts',
      filename: 'ArrangementCuttingParts.mp4',
      category: 'AutoCAD',
      description: 'Uniform distribution of selected Solid3d with given columns and step',
      tags: ['autocad', 'solid3d', 'arrangement', 'distribution']
    },
    {
      id: 'face-hatches',
      title: 'Create Hatches in 3D Faces',
      filename: 'FaceHatches.mp4',
      category: 'AutoCAD',
      description: 'Create hatches in 3D-faces with assigned 3D-face color',
      tags: ['autocad', 'hatches', '3d', 'faces']
    },

    // Desktop Apps
    {
      id: 'heat-engineer-calc',
      title: 'Heat Engineering Calculation',
      filename: 'HeatEngineerCalc.mp4',
      category: 'Desktop Apps',
      description: 'Make heat engineer calculations and generate reports',
      tags: ['desktop', 'calculation', 'heat', 'engineering']
    },
    {
      id: 'noise-calc',
      title: 'Noise Calculation',
      filename: 'NoiseCalc.mp4',
      category: 'Desktop Apps',
      description: 'Make noise calculations in different construction types',
      tags: ['desktop', 'calculation', 'noise', 'construction']
    },
    {
      id: 'obj-stl-converter',
      title: 'Obj to STL Converter',
      filename: 'ObjStlConverter.mp4',
      category: 'Desktop Apps',
      description: 'Convert OBJ files to STL format with transformation operations',
      tags: ['desktop', 'converter', 'obj', 'stl']
    },
    {
      id: 'purge-text-styles-word',
      title: 'Purge Text Styles in Word',
      filename: 'PurgeTextStylesWord.mp4',
      category: 'Desktop Apps',
      description: 'Clean up and remove unused text styles from Word documents',
      tags: ['desktop', 'word', 'styles', 'cleanup']
    },

    // Game Development
    {
      id: 'breakout-unity',
      title: 'Breakout Game - Unity',
      filename: 'Breakout.mp4',
      category: 'Game Development',
      description: 'Classic Breakout game implementation in Unity',
      tags: ['unity', 'game', 'breakout', '2d']
    },
    {
      id: 'table-chair-unreal',
      title: 'Table & Chair - Unreal Engine',
      filename: 'TableChairUnrealEngine.mp4',
      category: 'Game Development',
      description: 'Procedural table and chairs generation with resizing functionality',
      tags: ['unreal', 'engine', '3d', 'procedural']
    },
    {
      id: 'third-person-unreal',
      title: 'Third Person and Platforms - Unreal',
      filename: 'ThirdPerson.mp4',
      category: 'Game Development',
      description: 'Third person character with platforms created in C++',
      tags: ['unreal', 'engine', 'third-person', 'cpp']
    },

    // Google Drive
    {
      id: 'export-googledrive-filelist',
      title: 'Export Google Drive File List',
      filename: 'ExportFileListFromGoogleDrive.mp4',
      category: 'Cloud Integration',
      description: 'Create list of files from Google Drive and export to Excel',
      tags: ['google', 'drive', 'export', 'excel']
    },

    // Inventor
    {
      id: 'json-export-inventor',
      title: 'JSON Export from Inventor BOM',
      filename: 'JSONExportFromInventor.mp4',
      category: 'Inventor',
      description: 'Export JSON file from Bills of Materials in Inventor',
      tags: ['inventor', 'json', 'bom', 'export']
    },

    // PDF Processing
    {
      id: 'change-pdf-stamps',
      title: 'Change PDF Stamps',
      filename: 'ChangePDFStamps.mp4',
      category: 'Document Processing',
      description: 'Change stamps in PDF files',
      tags: ['pdf', 'stamps', 'processing', 'documents']
    },
    {
      id: 'pdf-operations',
      title: 'PDF Editor Operations',
      filename: 'PDFOperations.mp4',
      category: 'Document Processing',
      description: 'Add, remove, rotate pages and change page order in PDF files',
      tags: ['pdf', 'editor', 'pages', 'operations']
    },

    // UWP
    {
      id: 'uwp-converter',
      title: 'UWP Converter Demo',
      filename: 'UWPConverter.mp4',
      category: 'UWP',
      description: 'Demo version of format converter for Universal Windows Platform',
      tags: ['uwp', 'converter', 'windows', 'universal']
    },

    // Web Development
    {
      id: 'aspnet-core-app',
      title: 'ASP.NET Core CRUD Application',
      filename: 'AspNETCore_Application.mp4',
      category: 'Web Development',
      description: 'CRUD operations application with PostgreSQL database',
      tags: ['aspnet', 'core', 'crud', 'postgresql']
    },

    // Revit Videos (Major category with many videos)
    {
      id: 'import-strings-keyschedule',
      title: 'Import Strings into Key Schedule',
      filename: 'ImportStringsIntoKeySchedule.mp4',
      category: 'Revit',
      description: 'Insert selecting strings into key schedules from other files',
      tags: ['revit', 'schedule', 'import', 'key']
    },
    {
      id: 'copy-any-schedules',
      title: 'Copy Any Schedules',
      filename: 'CopyAnySchedules.mp4',
      category: 'Revit',
      description: 'Copy schedules between Revit projects',
      tags: ['revit', 'schedule', 'copy', 'project']
    },
    {
      id: 'divide-seq-numbering-sheets',
      title: 'Divide and Sequential Numbering Sheets',
      filename: 'DivideAndSeqNumberingSheets.mp4',
      category: 'Revit',
      description: 'Divide and sequentially number sheets in Revit',
      tags: ['revit', 'sheets', 'numbering', 'sequential']
    },
    {
      id: 'export-schedules-excel',
      title: 'Export Schedules to Excel',
      filename: 'ExportSchedulesIntoExcel.mp4',
      category: 'Revit',
      description: 'Export Revit schedules to Excel format',
      tags: ['revit', 'schedule', 'export', 'excel']
    },
    {
      id: 'copy-selected-schedule',
      title: 'Copy Selected Schedules by Sections and Levels',
      filename: 'CopySelectedSchedule.mp4',
      category: 'Revit',
      description: 'Copy selected schedules filtered by sections and levels',
      tags: ['revit', 'schedule', 'copy', 'sections']
    },
    {
      id: 'switch-rebar-constraints',
      title: 'Switch Rebar Constraints',
      filename: 'SwitchOnOffRebarConstraints.mp4',
      category: 'Revit',
      description: 'Switch on/off constraints in rebar elements',
      tags: ['revit', 'rebar', 'constraints', 'structural']
    },
    {
      id: 'fill-reinforcement-parameters',
      title: 'Fill Reinforcement Parameter Values',
      filename: 'FillReinforcementParameterValues.mp4',
      category: 'Revit',
      description: 'Automatically fill reinforcement parameter values',
      tags: ['revit', 'reinforcement', 'parameters', 'structural']
    },
    {
      id: 'check-rebar-host',
      title: 'Check Rebar Host',
      filename: 'CheckRebarHost.mp4',
      category: 'Revit',
      description: 'Check and validate rebar host elements',
      tags: ['revit', 'rebar', 'host', 'validation']
    },
    {
      id: 'pylon-reinforcement',
      title: 'Pylon Reinforcement',
      filename: 'PylonReinforcement.mp4',
      category: 'Revit',
      description: 'Specialized reinforcement for pylon structures',
      tags: ['revit', 'pylon', 'reinforcement', 'structural']
    },
    {
      id: 'reinforcement-walls-by-area',
      title: 'Reinforcement Walls by Area',
      filename: 'ReinforcementWallsByArea.mp4',
      category: 'Revit',
      description: 'Create wall reinforcement based on area calculations',
      tags: ['revit', 'walls', 'reinforcement', 'area']
    },
    {
      id: 'rebar-shape-display',
      title: 'Rebar Shape Display',
      filename: 'RebarShapeDisplay.mp4',
      category: 'Revit',
      description: 'Display and manage rebar shapes in Revit',
      tags: ['revit', 'rebar', 'shape', 'display']
    },
    {
      id: 'copy-elems-from-files',
      title: 'Copy Elements from Files',
      filename: 'CopyElemsFromFiles.mp4',
      category: 'Revit',
      description: 'Copy various element types from other Revit files',
      tags: ['revit', 'copy', 'elements', 'files']
    },
    {
      id: 'updates-copy-fams-sel-files',
      title: 'Copy Families from Selected Files',
      filename: 'Updates_CopyFamsInSelFiles.mp4',
      category: 'Revit',
      description: 'Updated tool for copying families from selected files',
      tags: ['revit', 'families', 'copy', 'update']
    },
    {
      id: 'copy-families-plans-family-editor',
      title: 'Copy Families from Plans to Family Editor',
      filename: 'CopyFamiliesFromPlansToFamilyEditor.mp4',
      category: 'Revit',
      description: 'Transfer families from project plans to family editor',
      tags: ['revit', 'families', 'editor', 'plans']
    },
    {
      id: 'replace-conduits',
      title: 'Replace Conduits with Electrical Equipment',
      filename: 'ReplaceCounduits.mp4',
      category: 'Revit',
      description: 'Replace ConduitFitting families with ElectricalEquipment families',
      tags: ['revit', 'conduits', 'electrical', 'replace']
    },
    {
      id: 'view-intersection-elements',
      title: '3D Views Based on Intersection Elements',
      filename: 'ViewIntersectionElements.mp4',
      category: 'Revit',
      description: 'Create collision lists and 3D views based on intersection elements',
      tags: ['revit', '3d', 'intersection', 'collision']
    },
    {
      id: 'copy-values-intersection-families',
      title: 'Copy Values of Intersection Families',
      filename: 'CopyValuesIntersectionFamilies.mp4',
      category: 'Revit',
      description: 'Copy parameter values of intersection families from selected categories',
      tags: ['revit', 'intersection', 'families', 'parameters']
    },
    {
      id: 'circuit-display',
      title: 'Circuit Display',
      filename: 'CircuitDisplay.mp4',
      category: 'Revit',
      description: 'Display electrical circuits in Revit',
      tags: ['revit', 'electrical', 'circuit', 'display']
    },
    {
      id: 'budget-calculator',
      title: 'Budget Calculator',
      filename: 'Budget.mp4',
      category: 'Revit',
      description: 'Fill family type parameters to calculate project budget',
      tags: ['revit', 'budget', 'calculator', 'parameters']
    },
    {
      id: 'marks-elements',
      title: 'Mark Elements',
      filename: 'MarksElems.mp4',
      category: 'Revit',
      description: 'Add marks and annotations to Revit elements',
      tags: ['revit', 'marks', 'elements', 'annotation']
    },
    {
      id: 'delete-parameters',
      title: 'Delete Parameters',
      filename: 'DeleteParameters.mp4',
      category: 'Revit',
      description: 'Delete selected list of parameters in Family Manager',
      tags: ['revit', 'parameters', 'delete', 'family']
    },
    {
      id: 'export-pdf-revit',
      title: 'Export PDF from Revit',
      filename: 'ExportPDF.mp4',
      category: 'Revit',
      description: 'Export sheets and views to PDF format',
      tags: ['revit', 'export', 'pdf', 'sheets']
    },
    {
      id: 'external-link-plot',
      title: 'External Link Plot',
      filename: 'ExternalLinkPlot.mp4',
      category: 'Revit',
      description: 'Plot and manage external links in Revit',
      tags: ['revit', 'external', 'link', 'plot']
    },
    {
      id: 'renumber-sheets',
      title: 'Renumber Sheets',
      filename: 'RenumberSheets.mp4',
      category: 'Revit',
      description: 'Renumber sheets in Revit projects',
      tags: ['revit', 'sheets', 'renumber', 'organization']
    },
    {
      id: 'copy-sheets',
      title: 'Copy Sheets',
      filename: 'CopySheets.mp4',
      category: 'Revit',
      description: 'Copy sheets between Revit projects',
      tags: ['revit', 'sheets', 'copy', 'project']
    },
    {
      id: 'filters-family-selection',
      title: 'Filters for Family Selection',
      filename: 'FiltersFamilySelection.mp4',
      category: 'Revit',
      description: 'Advanced filters for family selection in Revit',
      tags: ['revit', 'filters', 'family', 'selection']
    },
    {
      id: 'check-windows-prefab',
      title: 'Check Windows in Prefab',
      filename: 'CheckWindowsInPrefab.mp4',
      category: 'Revit',
      description: 'Validate windows in prefabricated elements',
      tags: ['revit', 'windows', 'prefab', 'validation']
    },
    {
      id: 'check-doors-prefab',
      title: 'Check Doors in Prefab',
      filename: 'CheckDoorsInPrefab.mp4',
      category: 'Revit',
      description: 'Validate doors in prefabricated elements',
      tags: ['revit', 'doors', 'prefab', 'validation']
    },
    {
      id: 'change-prefab-elements',
      title: 'Change Prefab Elements',
      filename: 'ChangePREFABElems.mp4',
      category: 'Revit',
      description: 'Modify prefabricated elements in Revit',
      tags: ['revit', 'prefab', 'elements', 'modify']
    },
    {
      id: 'prefab-complect',
      title: 'Prefab Complect',
      filename: 'PrefabComplect.mp4',
      category: 'Revit',
      description: 'Complete prefab assembly and management',
      tags: ['revit', 'prefab', 'assembly', 'management']
    },
    {
      id: 'massive-family-loading',
      title: 'Massive Family Loading',
      filename: 'MassiveFamilyLoading.mp4',
      category: 'Revit',
      description: 'Load multiple families efficiently in Revit',
      tags: ['revit', 'families', 'loading', 'massive']
    },
    {
      id: 'validation-company-standard',
      title: 'Validation by Company Standard',
      filename: 'ValidationByCompanyStandard.mp4',
      category: 'Revit',
      description: 'Validate projects against company standards',
      tags: ['revit', 'validation', 'standards', 'company']
    },
    {
      id: 'generic-design',
      title: 'Generic Design',
      filename: 'GenericDesign.mp4',
      category: 'Revit',
      description: 'Generic design tools and workflows',
      tags: ['revit', 'design', 'generic', 'workflow']
    },
    {
      id: 'workset-belongs',
      title: 'Workset Assignment',
      filename: 'WorksetBelongs.mp4',
      category: 'Revit',
      description: 'Manage workset assignments in Revit',
      tags: ['revit', 'workset', 'assignment', 'collaboration']
    },
    {
      id: 'risers-creation',
      title: 'Creation of Risers',
      filename: 'RisersCreation.mp4',
      category: 'Revit',
      description: 'Create MEP risers in Revit',
      tags: ['revit', 'mep', 'risers', 'creation']
    },
    {
      id: 'cut-openings',
      title: 'Cut Openings',
      filename: 'CutOpenings.mp4',
      category: 'Revit',
      description: 'Create holes in walls and slabs at MEP intersections',
      tags: ['revit', 'openings', 'mep', 'holes']
    },
    {
      id: 'stepwise-split-elements',
      title: 'Stepwise Split Elements',
      filename: 'StepwiseSplitElements.mp4',
      category: 'Revit',
      description: 'Split selected ducts or pipes with given step',
      tags: ['revit', 'mep', 'split', 'stepwise']
    },
    {
      id: 'distribution-mep',
      title: 'Distribution MEP',
      filename: 'DistributionMEP.mp4',
      category: 'Revit',
      description: 'MEP distribution systems management',
      tags: ['revit', 'mep', 'distribution', 'systems']
    },
    {
      id: 'mep-schedules',
      title: 'MEP Schedules',
      filename: 'MEPSchedules.mp4',
      category: 'Revit',
      description: 'Create and manage MEP schedules',
      tags: ['revit', 'mep', 'schedules', 'management']
    },
    {
      id: 'sort-mep',
      title: 'Sort MEP Elements',
      filename: 'SortMEP.mp4',
      category: 'Revit',
      description: 'Sort and organize MEP elements',
      tags: ['revit', 'mep', 'sort', 'organize']
    },
    {
      id: 'change-openings-to-family',
      title: 'Change Openings to Family',
      filename: 'ChangeOpeningsToFamily.mp4',
      category: 'Revit',
      description: 'Change opening instances to special family instances',
      tags: ['revit', 'openings', 'family', 'conversion']
    },
    {
      id: 'hole-tasks',
      title: 'Hole Tasks',
      filename: 'HoleTasks.mp4',
      category: 'Revit',
      description: 'Manage hole creation and coordination tasks',
      tags: ['revit', 'holes', 'tasks', 'coordination']
    },
    {
      id: 'create-analytics',
      title: 'Create Analytics',
      filename: 'CreateAnalytics.mp4',
      category: 'Revit',
      description: 'Create analytical models and reports',
      tags: ['revit', 'analytics', 'models', 'reports']
    },
    {
      id: 'wind-loads-generator',
      title: 'Wind Loads Generator',
      filename: 'WindLoadsGenerator.mp4',
      category: 'Revit',
      description: 'Generate wind load calculations for structures',
      tags: ['revit', 'wind', 'loads', 'structural']
    },
    {
      id: 'check-loads',
      title: 'Check Loads',
      filename: 'CheckLoads.mp4',
      category: 'Revit',
      description: 'Validate and check structural loads',
      tags: ['revit', 'loads', 'structural', 'validation']
    },
    {
      id: 'purge-files',
      title: 'Purge Files',
      filename: 'PurgeFiles.mp4',
      category: 'Revit',
      description: 'Clean up and purge unused elements from files',
      tags: ['revit', 'purge', 'cleanup', 'optimization']
    },
    {
      id: 'detach-central-files',
      title: 'Detach Central Files',
      filename: 'detachCentralFiles.mp4',
      category: 'Revit',
      description: 'Detach files from central model',
      tags: ['revit', 'central', 'detach', 'collaboration']
    },
    {
      id: 'get-info-make-reports',
      title: 'Get Info and Make Reports',
      filename: 'GetInfoAndMakeReports.mp4',
      category: 'Revit',
      description: 'Extract information and generate reports',
      tags: ['revit', 'reports', 'information', 'extraction']
    },
    {
      id: 'check-files',
      title: 'Check Files',
      filename: 'CheckFiles.mp4',
      category: 'Revit',
      description: 'Validate and check Revit files',
      tags: ['revit', 'validation', 'files', 'check']
    },
    {
      id: 'image-cameras',
      title: 'Image Cameras',
      filename: 'ImageCameras.mp4',
      category: 'Revit',
      description: 'Manage cameras and image generation',
      tags: ['revit', 'cameras', 'images', 'visualization']
    },
    {
      id: 'clip-views',
      title: 'Clip Views',
      filename: 'ClipViews.mp4',
      category: 'Revit',
      description: 'Create and manage clipped views',
      tags: ['revit', 'views', 'clip', 'visualization']
    },
    {
      id: 'create-3d-views-by-parameters',
      title: 'Create 3D Views by Parameters',
      filename: 'Create3DViewsByParameters.mp4',
      category: 'Revit',
      description: 'Generate 3D views based on element parameters',
      tags: ['revit', '3d', 'views', 'parameters']
    },
    {
      id: 'view-sync',
      title: 'View Sync',
      filename: 'ViewSync.mp4',
      category: 'Revit',
      description: 'Synchronize views across projects',
      tags: ['revit', 'views', 'sync', 'collaboration']
    },
    {
      id: 'templates-bim360',
      title: 'Templates for BIM360',
      filename: 'TemplatesForBIM360.mp4',
      category: 'Revit',
      description: 'Create and manage templates for BIM360',
      tags: ['revit', 'templates', 'bim360', 'cloud']
    },
    {
      id: 'view-sections',
      title: 'View Sections',
      filename: 'ViewSections.mp4',
      category: 'Revit',
      description: 'Create and manage section views',
      tags: ['revit', 'sections', 'views', 'documentation']
    },
    {
      id: 'insolation',
      title: 'Insolation Analysis',
      filename: 'Insolation.mp4',
      category: 'Revit',
      description: 'Perform insolation and solar analysis',
      tags: ['revit', 'insolation', 'solar', 'analysis']
    },
    {
      id: 'reverse-mirroring',
      title: 'Reverse Mirroring',
      filename: 'ReverseMirroring.mp4',
      category: 'Revit',
      description: 'Reverse mirrored elements and families',
      tags: ['revit', 'mirror', 'reverse', 'geometry']
    },
    {
      id: 'facade-collection',
      title: 'Facade Collection',
      filename: 'FacadeCollection.mp4',
      category: 'Revit',
      description: 'Collect and manage facade elements',
      tags: ['revit', 'facade', 'collection', 'architecture']
    },
    {
      id: 'identical-apartments',
      title: 'Identical Apartments',
      filename: 'IdenticalApartments.mp4',
      category: 'Revit',
      description: 'Manage identical apartment layouts',
      tags: ['revit', 'apartments', 'identical', 'residential']
    },
    {
      id: 'change-grid-modes',
      title: 'Change Grid Modes',
      filename: 'ChangeGridModes.mp4',
      category: 'Revit',
      description: 'Modify grid display modes and properties',
      tags: ['revit', 'grids', 'modes', 'display']
    },
    {
      id: 'axle-pulling',
      title: 'Axle Pulling',
      filename: 'AxlePulling.mp4',
      category: 'Revit',
      description: 'Pull and extend grid axes',
      tags: ['revit', 'grids', 'axle', 'extension']
    },
    {
      id: 'rename-grids',
      title: 'Rename Grids',
      filename: 'RenameGrids.mp4',
      category: 'Revit',
      description: 'Rename grid elements systematically',
      tags: ['revit', 'grids', 'rename', 'organization']
    },
    {
      id: 'check-grids',
      title: 'Check Grids',
      filename: 'CheckGrids.mp4',
      category: 'Revit',
      description: 'Validate and check grid elements',
      tags: ['revit', 'grids', 'validation', 'check']
    },
    {
      id: 'grid-dimension',
      title: 'Grid Dimension',
      filename: 'GridDimension.mp4',
      category: 'Revit',
      description: 'Create dimensions between grids',
      tags: ['revit', 'grids', 'dimension', 'annotation']
    },
    {
      id: 'display-grid-marks',
      title: 'Display Grid Marks',
      filename: 'DisplayGridMarks.mp4',
      category: 'Revit',
      description: 'Control grid mark visibility and display',
      tags: ['revit', 'grids', 'marks', 'display']
    },
    {
      id: 'align-grids',
      title: 'Align Grids',
      filename: 'AlignGrids.mp4',
      category: 'Revit',
      description: 'Align selected grids by crop views',
      tags: ['revit', 'grids', 'alignment', 'layout']
    },
    {
      id: 'check-by-parameters-values',
      title: 'Check by Parameter Values',
      filename: 'CheckByParametersValues.mp4',
      category: 'Revit',
      description: 'Validate elements by parameter values',
      tags: ['revit', 'parameters', 'validation', 'check']
    },
    {
      id: 'check-walls',
      title: 'Check Walls',
      filename: 'CheckWalls.mp4',
      category: 'Revit',
      description: 'Validate wall elements and properties',
      tags: ['revit', 'walls', 'validation', 'check']
    },
    {
      id: 'room-schedule-sections-levels',
      title: 'Room Schedule by Sections and Levels',
      filename: 'RoomScheduleBySectionsLevels.mp4',
      category: 'Revit',
      description: 'Create room schedules filtered by sections and levels',
      tags: ['revit', 'rooms', 'schedule', 'sections']
    },
    {
      id: 'room-finishes',
      title: 'Room Finishes',
      filename: 'RoomFinishes.mp4',
      category: 'Revit',
      description: 'Manage room finish materials and schedules',
      tags: ['revit', 'rooms', 'finishes', 'materials']
    },
    {
      id: 'room-masses',
      title: 'Room Masses',
      filename: 'RoomMasses.mp4',
      category: 'Revit',
      description: 'Create masses from room boundaries',
      tags: ['revit', 'rooms', 'masses', 'geometry']
    },
    {
      id: 'split-elements',
      title: 'Split Elements',
      filename: 'SplitElements.mp4',
      category: 'Revit',
      description: 'Split various elements in Revit',
      tags: ['revit', 'split', 'elements', 'modification']
    },
    {
      id: 'split-columns',
      title: 'Split Columns',
      filename: 'SplitColumns.mp4',
      category: 'Revit',
      description: 'Split column elements at specified points',
      tags: ['revit', 'columns', 'split', 'structural']
    },
    {
      id: 'project-data',
      title: 'Project Data',
      filename: 'Project data.mp4',
      category: 'Revit',
      description: 'Manage project information and data',
      tags: ['revit', 'project', 'data', 'information']
    },
    {
      id: 'group-viewer',
      title: 'Group Viewer',
      filename: 'GroupViewer.mp4',
      category: 'Revit',
      description: 'View and manage groups in Revit',
      tags: ['revit', 'groups', 'viewer', 'management']
    },
    {
      id: 'topo-surfaces-wells',
      title: 'Topographic Surfaces with Wells',
      filename: 'TopoSurfacesWithWells.mp4',
      category: 'Revit',
      description: 'Create topographic surfaces with well features',
      tags: ['revit', 'topography', 'surfaces', 'wells']
    },
    {
      id: 'creating-slopes',
      title: 'Creating Slopes',
      filename: 'CreatingSlopes.mp4',
      category: 'Revit',
      description: 'Create and modify slopes in Revit',
      tags: ['revit', 'slopes', 'topography', 'grading']
    },
    {
      id: 'lookup-editor',
      title: 'Lookup Editor',
      filename: 'LookupEditor.mp4',
      category: 'Revit',
      description: 'Edit lookup tables and parameters',
      tags: ['revit', 'lookup', 'editor', 'parameters']
    },
    {
      id: 'open-folder-copy-path',
      title: 'Open Folder and Copy Path',
      filename: 'OpenFolderAndCopyPath.mp4',
      category: 'Revit',
      description: 'Open file folders and copy paths',
      tags: ['revit', 'folder', 'path', 'utility']
    },
    {
      id: 'background-color-inversion',
      title: 'Background Color Inversion',
      filename: 'BackgroundColorInvertion.mp4',
      category: 'Revit',
      description: 'Invert background colors in views',
      tags: ['revit', 'background', 'color', 'inversion']
    },
    {
      id: 'crop-images',
      title: 'Crop Images',
      filename: 'CropImages.mp4',
      category: 'Revit',
      description: 'Crop and adjust images in Revit',
      tags: ['revit', 'images', 'crop', 'adjustment']
    }
  ]

  const categories = ['all', ...Array.from(new Set(videos.map(video => video.category)))]

  const filteredVideos = useMemo(() => {
    return videos.filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

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
    <div className="videos">
      <div className="container">
        <motion.div
          className="videos__header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="videos__title">Project Demonstrations</h1>
          <p className="videos__subtitle">
            Video showcases of applications and tools I've developed
          </p>
        </motion.div>

        <motion.div
          className="videos__controls"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="videos__search">
            <Search className="videos__search-icon" size={20} />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="videos__search-input"
            />
          </div>

          <div className="videos__filter">
            <Filter className="videos__filter-icon" size={20} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="videos__filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          <div className="videos__view-toggle">
            <button
              onClick={() => setViewMode('grid')}
              className={`videos__view-button ${viewMode === 'grid' ? 'videos__view-button--active' : ''}`}
              aria-label="Grid view"
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`videos__view-button ${viewMode === 'list' ? 'videos__view-button--active' : ''}`}
              aria-label="List view"
            >
              <List size={20} />
            </button>
          </div>
        </motion.div>

        <motion.div
          className="videos__stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <span className="videos__count">
            {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''} found
          </span>
        </motion.div>

        <motion.div
          className={`videos__grid videos__grid--${viewMode}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredVideos.map((video) => (
            <motion.div
              key={video.id}
              className="videos__item"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <VideoPlayer
                src={`/Video_Source/${video.filename}`}
                title={video.title}
                className="videos__player"
                width="100%"
                height={viewMode === 'grid' ? '250px' : '200px'}
              />
              
              <div className="videos__item-content">
                <h3 className="videos__item-title">{video.title}</h3>
                <p className="videos__item-description">{video.description}</p>
                
                <div className="videos__item-meta">
                  <span className="videos__item-category">{video.category}</span>
                  <div className="videos__item-tags">
                    {video.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="videos__item-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredVideos.length === 0 && (
          <motion.div
            className="videos__empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Play size={48} />
            <h3>No videos found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Videos
