import ReactDOM from 'react-dom/client';
import App from './App';
import { CustomThemeProvider } from './ThemeContext';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CustomThemeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CustomThemeProvider>
);