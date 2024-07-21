import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Login from './components/Login';
import CourseDetail from './components/CourseDetails';
import VideoCard from './components/VideoCard';
import { AuthProvider } from './components/AuthProvider';
import Navbar from './components/Navbar';  // Import the Navbar component
import Profile from './components/Profile';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />  {/* Add Navbar component here */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/course/:courseId" element={<CourseDetail />} />
                    <Route path="/video/:videoId" element={<VideoCard />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
