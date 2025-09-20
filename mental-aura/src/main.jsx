// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Your main landing page component
//  // Import your new chatbot component
import ChatPage from './components/ChatbotApp.jsx';
import AuthForm from './components/AuthForm.jsx';
import SignUpForm from './components/SignUpForm.jsx';
import './index.css';
import MoodChart from './Dashboardcomponents/MoodChart.jsx';
import Dashboardpage from './DashboardPage.jsx';
import Sidebar from './Dashboardcomponents/Sidebar.jsx';

// Import routing tools
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DashboardPage from './DashboardPage.jsx';

// Define your app's pages (routes)
const router = createBrowserRouter([
  {
    path: "/", // The root URL (e.g., www.yoursite.com)
    element: <App />, // Shows your main App component
  },
  {
    path: "/DashboardPage", // The root URL (e.g., www.yoursite.com)
    element: <DashboardPage />, // Shows your main App component
  },
  {
    path: "/Sidebar", // The root URL (e.g., www.yoursite.com)
    element: <Sidebar />, // Shows your main App component
  },
  {
    path: "/MoodChart", // The root URL (e.g., www.yoursite.com)
    element: <MoodChart/>, // Shows your main App component
  },
  {
    path: "/ChatPage", // The chatbot URL (e.g., www.yoursite.com/chatbot)
    element: <ChatPage />, // Shows your Chatbot component
  },
  {
    path: "/AuthForm", // The chatbot URL (e.g., www.yoursite.com/chatbot)
    element: <AuthForm />, // Shows your Chatbot component
  },
  {
    path: "/SignUpForm", // The chatbot URL (e.g., www.yoursite.com/chatbot)
    element: <SignUpForm />, // Shows your Chatbot component
  },
  {
    path: "/Dashboardpage", // The chatbot URL (e.g., www.yoursite.com/chatbot)
    element: <Dashboardpage />, // Shows your Chatbot component
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Tell your app to use the router */}
    <RouterProvider router={router} />
  </React.StrictMode>,
);