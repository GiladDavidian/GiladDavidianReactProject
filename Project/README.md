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

יישום לניהול כרטיסי ביקור
זהו יישום ווב מבוסס React שתוכנן לניהול כרטיסי ביקור. הוא מאפשר למשתמשים לצפות, לחפש, לסמן כמועדפים ולנהל כרטיסי ביקור משלהם, עם תמיכה בתפקידי משתמשים שונים.

תכונות
אימות משתמשים: פונקציונליות מאובטחת של התחברות והרשמה.

צפייה וחיפוש כרטיסים: עיין באוסף כרטיסי ביקור והשתמש בסרגל חיפוש כדי לסנן אותם.

כרטיסים מועדפים: משתמשים מחוברים יכולים לסמן כרטיסים כמועדפים לגישה קלה.

ניהול כרטיסים (משתמשי עסקים): משתמשים בעלי חשבון עסקי יכולים להוסיף כרטיסי ביקור חדשים ולעדכן את הקיימים.

הכרטיסים שלי (משתמשי עסקים/מנהלים): משתמשי עסקים יכולים לצפות ולנהל רק את הכרטיסים שלהם. למשתמשי מנהל יש גישה לניהול כל הכרטיסים.

ניווט רספונסיבי: ניווט אינטואיטיבי בכותרת העליונה ובתחתונה לגישה קלה לחלקים שונים.

טעינה והתראות: כולל סמן טעינה עבור שליפת נתונים והודעות סנאקבר למשוב למשתמש.

גישה מבוססת תפקידים: תכונות מוצגות ונגישות באופן דינמי בהתבסס על תפקיד המשתמש (רגיל, עסקי או מנהל).

טכנולוגיות בשימוש
React.js: ספריית JavaScript לבניית ממשקי משתמש.

React Router DOM: לניתוב דקלרטיבי ביישומי React.

jwt-decode: כלי לפענוח JWTs (JSON Web Tokens).

React Icons: ספרייה המספקת חבילות אייקונים פופולריות כרכיבי React (react-icons/fa, react-icons/bs).

CSS: לעיצוב מראה היישום.

התקנה והגדרה
כדי להפעיל את הפרויקט הזה באופן מקומי, בצע את השלבים הבאים:

שכפל את המאגר (repository):

git clone <repository-url>
cd <repository-directory>

התקן תלויות:

npm install

הפעל את היישום:

npm start

היישום ייפתח בדרך כלל בדפדפן שלך בכתובת http://localhost:3000.

הערה: יישום זה מסתמך על API חיצוני בקצה השרת, אשר אמור לפעול בכתובת https://monkfish-app-z9uza.ondigitalocean.app/bcard2 עבור פעולות נתונים.

שימוש
הירשם או התחבר: צור חשבון או התחבר כדי לגשת למגוון התכונות המלא.

עיין בכרטיסים: דף הבית מציג את כל כרטיסי הביקור הזמינים.

חיפוש: השתמש בסרגל החיפוש בכותרת העליונה כדי למצוא כרטיסים ספציפיים.

כרטיסים מועדפים: אם אתה מחובר, לחץ על אייקון הלב בכרטיס כדי להוסיף אותו למועדפים שלך. גש לכרטיסים המועדפים שלך דרך הקישור "המועדפים שלי" בכותרת התחתונה.

נהל את הכרטיסים שלך: אם יש לך חשבון עסקי, תוכל להוסיף כרטיסים חדשים ולנהל את הקיימים דרך מדור "הכרטיסים שלי".

גישה למנהל: אם אתה מנהל מערכת, תהיה לך הרשאות מורחבות לנהל את כל הכרטיסים במערכת.