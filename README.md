# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

מבנה האפליקציה:

 Business Card Management Application
This is a React-based web application designed for managing business cards. It allows users to view, search, favorite, and manage their own business cards, with support for different user roles.

Features
User Authentication: Secure login and registration functionalities.

Card Viewing & Search: Browse through a collection of business cards and use a search bar to filter them.

Favorite Cards: Logged-in users can mark cards as favorites for easy access.

Card Management (Business Users): Users with a business account can add new business cards and update their existing ones.

My Cards (Business/Admin Users): Business users can view and manage only their own cards. Admin users have access to manage all cards.

Responsive Navigation: Intuitive header and footer navigation for easy access to different sections.

Loading & Notifications: Includes a loading spinner for data fetching and snackbar notifications for user feedback.

Role-Based Access: Features are dynamically displayed and accessible based on the user's role (regular, business, or admin).

Technologies Used
React.js: A JavaScript library for building user interfaces.

React Router DOM: For declarative routing in React applications.

jwt-decode: A utility for decoding JWTs (JSON Web Tokens).

React Icons: A library providing popular icon packs as React components (react-icons/fa, react-icons/bs).

CSS: For styling the application's appearance.

Installation and Setup
To get this project up and running locally, follow these steps:

Clone the repository:

git clone <repository-url>
cd <repository-directory>

Install dependencies:

npm install

Run the application:

npm start

The application will typically open in your browser at http://localhost:3000.

Note: This application relies on an external backend API, assumed to be running at https://monkfish-app-z9uza.ondigitalocean.app/bcard2 for data operations.

Usage
Register or Log In: Create an account or log in to access the full range of features.

Browse Cards: The homepage displays all available business cards.

Search: Use the search bar in the header to find specific cards.

Favorite Cards: If logged in, click the heart icon on a card to add it to your favorites. Access your favorite cards via the "My Favorites" link in the footer.

Manage Your Cards: If you have a business account, you can add new cards and manage your existing ones through the "My Cards" section.

Admin Access: If you are an administrator, you will have extended privileges to manage all cards in the system.
