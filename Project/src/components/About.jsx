import './About.css';

export default function About() {
    return (
        <>
            <h1 className="titlePage">About</h1>
            <hr className="cardsHR" />
            <div className="about-container">
                <h1 className="about-title">About Our Business Cards Application</h1>
                <p className="about-description">
                    Welcome to our innovative business card application, a powerful tool designed to streamline how you view and interact with digital business cards. This platform leverages modern web technologies to deliver a fast, intuitive, and visually appealing experience for managing professional contacts.
                </p>

                ---

                <h2 className="about-subtitle">Core Functionality</h2>
                <p className="about-description">
                    At its heart, the application is built to retrieve and display a comprehensive collection of business cards with efficiency and clarity. Here’s a breakdown of its primary capabilities:
                </p>
                <ul>
                    <li>
                        <strong>Dynamic Data Fetching:</strong> The application connects to a robust external API endpoint (
                        <a href="https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards" target="_blank" rel="noopener noreferrer" className="about-link">
                            https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards
                        </a>
                        ) to fetch business card data in real-time. This ensures that you always have access to the most current information available, directly from the source.
                    </li>
                    <li>
                        <strong>Intuitive Display:</strong> Each retrieved business card is meticulously presented in a clear, organized format. You can effortlessly browse through cards, with each one showcasing essential details at a glance:
                        <ul>
                            <li><strong>Visual Representation:</strong> An image, often a company logo or a personal photo, provides immediate visual recognition.</li>
                            <li><strong>Key Identification:</strong> The cardholder's name (as the **title**) and their professional role or company (as the **subtitle**) are prominently displayed.</li>
                            <li><strong>Direct Contact Information:</strong> Essential contact details like phone numbers and physical addresses are readily accessible.</li>
                            <li><strong>Unique Identifier:</strong> A specific **business card number** provides a unique reference for each card, useful for internal tracking or quick recall.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Seamless User Experience:</strong> We've prioritized a smooth and responsive user experience. During data loading, a visual indicator (managed through a global loading state via React Context API) is activated. This keeps you informed that information is being retrieved, preventing uncertainty and providing clear feedback during network operations.
                    </li>
                </ul>

                ---

                <h2 className="about-subtitle">Technologies Under the Hood</h2>
                <p className="about-description">
                    Our application is built on a solid foundation of cutting-edge web development technologies, ensuring performance, maintainability, and scalability for future enhancements:
                </p>
                <ul>
                    <li>
                        <strong>React.js:</strong> The entire user interface is constructed using **React**, a leading JavaScript library for building dynamic and interactive web applications. React's powerful component-based architecture allows for modular, reusable code, making the application efficient, scalable, and easy to extend.
                    </li>
                    <li>
                        <strong>React Hooks:</strong> We extensively utilize React Hooks like `useState` for managing component-specific data (e.g., the array of business cards) and `useEffect` for handling side effects such as asynchronous data fetching when the component mounts. This approach simplifies state logic and lifecycle management.
                    </li>
                    <li>
                        <strong>Context API:</strong> For seamless state management across different parts of the application, especially for global concerns, we employ React's **Context API**. This is particularly useful for managing the application's loading state (`setIsLoader`), allowing disparate components to communicate and share data without the complexity of prop drilling.
                    </li>
                    <li>
                        <strong>Fetch API:</strong> Data communication with the external server is handled by the native **Fetch API**, providing a modern, promise-based, and efficient way to make asynchronous network requests and handle responses.
                    </li>
                    <li>
                        <strong>CSS Styling:</strong> The application's clean visual appeal and responsive design are achieved through dedicated CSS files. This modular approach to styling ensures a consistent, aesthetic, and user-friendly look across various devices and screen sizes.
                    </li>
                </ul>

                ---

                <h2 className="about-subtitle">Our Vision</h2>
                <p className="about-description">
                    Our primary goal is to provide a highly functional and reliable tool for anyone needing quick access to business contact information. Whether you're a professional looking to organize your contacts, a business owner seeking to share your details, or simply exploring various business profiles, our application is designed to meet your needs efficiently and effectively. We are committed to continuous improvement, constantly working to enhance existing features and introduce new functionalities to further enrich your experience.
                </p>

                ---

                <div className="about-contact">
                    <h2 className="about-subtitle">Connect With Us</h2>
                    <p className="about-description">
                        Have questions, feedback, or suggestions? We'd love to hear from you!
                    </p>
                    <ul>
                        <li>Email: <a href="mailto:gilad.davidian@gmail.com" className="about-link">gilad.davidian@gmail.com</a></li>
                        <li>Phone: <a href="tel:+972528961336">+972528961336</a></li>
                        <li>City: Jerusalem</li>
                    </ul>
                </div>
            </div>
        </>
    )
}
