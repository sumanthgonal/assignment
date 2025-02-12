# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

 Interview Scheduler

A React-based interview scheduling application that allows users to manage and schedule interviews efficiently.

## Features

- Schedule new interviews
- View interviews in calendar or list format
- Edit existing interviews
- Delete interviews
- Filter interviews by date, interviewer, and type
- Time slot management to prevent conflicts

## Technologies Used

- React
- Zustand (State Management)
- React Router
- React Calendar
- Vite
- CSS3

## Getting Started

1. Clone the repository: git clone https://github.com/YOUR_USERNAME/interview-scheduler.git
2. Install dependencies: npm install
3. Start the development server: npm run dev
4. Open your browser and navigate to http://localhost:5173

## Usage

4. Open http://localhost:5173 in your browser

## Usage

1. Navigate to the dashboard to view all scheduled interviews
2. Click "Schedule Interview" to create a new interview
3. Fill in the required details:
   - Candidate name
   - Select interviewer
   - Choose interview type
   - Select date and time slot
4. View, edit, or delete interviews from the dashboard

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)


# Modern Calendar Application

A responsive and user-friendly calendar application built with modern web technologies.

## Design Decisions

### 1. Visual Design
- Used a clean, minimalist design approach for better readability
- Implemented a consistent color scheme using CSS variables for easy theming
- Added subtle shadows and rounded corners for depth and modern feel
- Designed with both light and dark mode support

### 2. Responsive Design
- Mobile-first approach ensuring compatibility across devices
- Flexible grid system for calendar layout
- Adaptive font sizes and spacing for different screen sizes
- Touch-friendly interface with appropriate hit areas

### 3. Accessibility
- High contrast color combinations
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly markup

## Technical Implementation

### CSS Architecture
- Used CSS variables for maintainable theming
- Implemented modular CSS classes for reusability
- Followed BEM naming convention for clear component structure
- Optimized performance with minimal nesting

### Components
1. Calendar Container
   - Centralized layout
   - Card-like appearance with shadow
   - Responsive padding and margins

2. Calendar Grid
   - CSS Grid for consistent layout
   - Equal aspect ratio cells
   - Flexible spacing between dates

3. Interactive Elements
   - Hover and active states
   - Smooth transitions
   - Clear visual feedback

## Assumptions

1. Browser Support
   - Modern browser compatibility (Chrome, Firefox, Safari, Edge)
   - CSS Grid support
   - CSS Variables support

2. User Preferences
   - Users may switch between light/dark modes
   - Touch and mouse input support needed
   - Basic accessibility requirements

## Challenges Faced

1. Cross-browser Compatibility
   - Solution: Used standardized CSS properties
   - Implemented fallbacks where necessary

2. Responsive Layout
   - Challenge: Maintaining calendar grid proportions
   - Solution: Used aspect-ratio and CSS Grid

3. Dark Mode Implementation
   - Challenge: Ensuring proper contrast
   - Solution: Carefully selected color palette with CSS variables

## Future Improvements

1. Enhanced Features
   - Event management system
   - Multiple view options (week, month, year)
   - Drag and drop support

2. Performance
   - CSS optimization
   - Lazy loading for extended calendar views
   - Reduced bundle size

3. Accessibility
   - Enhanced keyboard navigation
   - ARIA labels implementation
   - More comprehensive screen reader support

## Getting Started

1. Clone the repository
2. Include the CSS file in your project
3. Add the necessary HTML structure
4. Customize variables as needed

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
