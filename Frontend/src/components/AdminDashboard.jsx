import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthProvider';

const AdminDashboard = () => {
    const { authState } = useAuth();
    const [users, setUsers] = useState([
        { _id: '1', username: 'Anil Joshi', email: 'Anil180726@example.com' },
        { _id: '2', username: 'Kundan Kumar', email: 'kundan234@example.com' }
    ]);
    const [courses, setCourses] = useState([
        { _id: '1', title: 'Introduction to Programming', description: 'Learn the basics of programming using Python.', videos: [] },
        { _id: '2', title: 'Advanced JavaScript', description: 'Deep dive into JavaScript and learn advanced concepts.', videos: [] },
        { _id: '3', title: 'Web Development Basics', description: 'Understand the fundamentals of web development.', videos: [] }
    ]);
    const [newCourseTitle, setNewCourseTitle] = useState('');
    const [newCourseDescription, setNewCourseDescription] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [newVideoTitle, setNewVideoTitle] = useState('');
    const [newVideoUrl, setNewVideoUrl] = useState('');
    const [editingCourse, setEditingCourse] = useState(null);
    const [editCourseTitle, setEditCourseTitle] = useState('');
    const [editCourseDescription, setEditCourseDescription] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/admin/users', {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const fetchCourses = async () => {
            try {
                const response = await axios.get('/api/admin/courses', {
                    headers: {
                        Authorization: `Bearer ${authState.accessToken}`
                    }
                });
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        // fetchUsers();
        // fetchCourses();
    }, [authState.accessToken]);

    const handleAddCourse = async () => {
        try {
            const response = await axios.post('/api/admin/courses', {
                title: newCourseTitle,
                description: newCourseDescription
            }, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            setCourses([...courses, response.data]);
            setNewCourseTitle('');
            setNewCourseDescription('');
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    const handleDeleteCourse = async (courseId) => {
        try {
            await axios.delete(`/api/admin/courses/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            setCourses(courses.filter(course => course._id !== courseId));
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    const handleEditCourse = (course) => {
        setEditingCourse(course);
        setEditCourseTitle(course.title);
        setEditCourseDescription(course.description);
    };

    const handleSaveCourse = async () => {
        try {
            const response = await axios.put(`/api/admin/courses/${editingCourse._id}`, {
                title: editCourseTitle,
                description: editCourseDescription
            }, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            setCourses(courses.map(course => course._id === editingCourse._id ? response.data : course));
            setEditingCourse(null);
            setEditCourseTitle('');
            setEditCourseDescription('');
        } catch (error) {
            console.error('Error editing course:', error);
        }
    };

    const handleAddVideoToCourse = async () => {
        try {
            const response = await axios.post(`/api/admin/courses/${selectedCourse}/videos`, {
                title: newVideoTitle,
                url: newVideoUrl
            }, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            const updatedCourses = courses.map(course => {
                if (course._id === selectedCourse) {
                    return {
                        ...course,
                        videos: [...course.videos, response.data]
                    };
                }
                return course;
            });
            setCourses(updatedCourses);
            setNewVideoTitle('');
            setNewVideoUrl('');
            setSelectedCourse(null);
        } catch (error) {
            console.error('Error adding video to course:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`/api/admin/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="admin-dashboard p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">Admin Dashboard</h1>
            <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Users</h2>
                <ul className="space-y-4">
                    {Array.isArray(users) && users.map(user => (
                        <li key={user._id} className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg">
                            <div className="text-gray-700">{user.username} - {user.email}</div>
                            <button onClick={() => handleDeleteUser(user._id)} className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">Delete</button>
                        </li>
                    ))}
                </ul>
            </section>
            <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Courses</h2>
                <ul className="space-y-4 mb-6">
                    {Array.isArray(courses) && courses.map(course => (
                        <li key={course._id} className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
                                <p className="text-gray-600">{course.description}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button onClick={() => handleDeleteCourse(course._id)} className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">Delete</button>
                                <button onClick={() => setSelectedCourse(course._id)} className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Add Video</button>
                                <button onClick={() => handleEditCourse(course)} className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700">Edit</button>
                            </div>
                        </li>
                    ))}
                </ul>
                {editingCourse ? (
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Edit Course</h3>
                        <input
                            type="text"
                            placeholder="Course Title"
                            value={editCourseTitle}
                            onChange={e => setEditCourseTitle(e.target.value)}
                            className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                        />
                        <textarea
                            placeholder="Course Description"
                            value={editCourseDescription}
                            onChange={e => setEditCourseDescription(e.target.value)}
                            className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                        ></textarea>
                        <div className="flex justify-center">
                            <button onClick={handleSaveCourse} className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">Save</button>
                        </div>
                    </div>
                ) : (
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Add New Course</h3>
                        <input
                            type="text"
                            placeholder="Course Title"
                            value={newCourseTitle}
                            onChange={e => setNewCourseTitle(e.target.value)}
                            className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                        />
                        <textarea
                            placeholder="Course Description"
                            value={newCourseDescription}
                            onChange={e => setNewCourseDescription(e.target.value)}
                            className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                        ></textarea>
                        <div className="flex justify-center">
                            <button onClick={handleAddCourse} className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">Add Course</button>
                        </div>
                    </div>
                )}
            </section>
            {selectedCourse && (
                <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add Video to Course</h2>
                    <input
                        type="text"
                        placeholder="Video Title"
                        value={newVideoTitle}
                        onChange={e => setNewVideoTitle(e.target.value)}
                        className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Video URL"
                        value={newVideoUrl}
                        onChange={e => setNewVideoUrl(e.target.value)}
                        className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                    />
                    <div className="flex justify-center">
                        <button onClick={handleAddVideoToCourse} className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Add Video</button>
                    </div>
                </section>
            )}
        </div>
    );
};

export default AdminDashboard;
