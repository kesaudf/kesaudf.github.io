# Site Components

This directory contains reusable HTML components for the website.

## Components

### header.html

Contains the complete HTML head section and navigation bar structure. This is a template with placeholders that can be used as a reference for creating new pages.

**Placeholders:**

- `{FAVICON_PATH}` - Path to favicon
- `{PAGE_TITLE}` - Page title
- `{PAGE_AUTHOR}` - Page author
- `{ANALYTICS_PATH}` - Path to analytics script
- `{PERSONAL_JS_PATH}` - Path to personal JS script
- `{ADDITIONAL_HEAD_CONTENT}` - Any additional head content (e.g., Video.js for project pages)
- `{CSS_*_PATH}` - Various CSS file paths
- `{*_LINK}` - Navigation links
- `{AVATAR_PATH}` - Path to avatar image
- `{HEADER_CLASSES}` - Additional header CSS classes
- `{HEADER_CONTENT}` - Header content (page title, etc.)

### footer.html

Contains the standardized footer structure with scripts. This is also a template with placeholders.

**Placeholders:**

- `{MODERN_APP_PATH}` - Path to modern App.js module
- `{ADDITIONAL_SCRIPTS}` - Any additional scripts

## Current Implementation

All pages in the site currently use standardized header and footer structures with the following characteristics:

### Navigation Structure

- **Root pages** (index.html, News.html): Direct links to assets and pages
- **About pages** (pages/about/): Relative paths with `../../` prefix
- **Project pages** (pages/projects/): Relative paths with `../../` prefix

### Footer Links

- All footer links now point to the correct external URLs
- Consistent formatting and styling across all pages

## Adding New Pages

When creating new pages:

1. Copy the header structure from an existing page in the same directory level
2. Ensure all asset paths are correct for the page location
3. Use the standardized footer structure
4. Test navigation links work correctly

## Maintenance

To update navigation or footer content:

1. Update the template files in this directory
2. Apply changes to all pages using the same structure
3. Test all navigation links and asset loading
