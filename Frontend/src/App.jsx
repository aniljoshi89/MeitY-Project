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
import EnrolledCourses from './components/EnrolledCourses';
import ChangePassword from './components/ChangePassword';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import AllCourses from './components/AllCourses';
import VideoForm from './components/VideoForm';

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
                    <Route path="/enrolled-courses" element={<EnrolledCourses />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/all-courses" element={<AllCourses />} />
                    <Route path="/video-edit" element={<VideoForm />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
