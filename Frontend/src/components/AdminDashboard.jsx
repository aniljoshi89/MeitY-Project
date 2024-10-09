import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthProvider';
import VideoForm from './VideoForm';

const AdminDashboard = () => {
    const { authState } = useAuth();
    const [users, setUsers] = useState([]);
    useEffect(() => {
      const getUser = async () => {
        try {
          const res = await axios.get("http://localhost:8000/api/v1/users/get-users");
          setUsers(res.data.data.user);
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
    }, []);

    const [courses, setCourse] = useState([]);
    useEffect(() => {
      const getCourse = async () => {
        try {
          const res = await axios.get("http://localhost:8000/api/v1/course");
          setCourse(res.data.data.course);
        } catch (error) {
          console.log(error);
        }
      };
      getCourse();
    }, []);
    
    const [newCourseTitle, setNewCourseTitle] = useState('');
    const [newCourseDescription, setNewCourseDescription] = useState('');
    const [newCourseDuration, setNewCourseDuration] = useState('');
    const [newCourseStartDate, setNewCourseStartDate] = useState('');
    const [newCourseEndDate, setNewCourseEndDate] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [editingCourse, setEditingCourse] = useState(null);
    const [editCourseTitle, setEditCourseTitle] = useState('');
    const [editCourseDescription, setEditCourseDescription] = useState('');
    const [editCourseDuration, setEditCourseDuration] = useState('');
    const [editCourseStartDate, setEditCourseStartDate] = useState('');
    const [editCourseEndDate, setEditCourseEndDate] = useState('');

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
                description: newCourseDescription,
                duration: newCourseDuration,
                startDate: newCourseStartDate,
                endDate: newCourseEndDate
            }, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            setCourses([...courses, response.data]);
            setNewCourseTitle('');
            setNewCourseDescription('');
            setNewCourseDuration('');
            setNewCourseStartDate('');
            setNewCourseEndDate('');
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
        setEditCourseDuration(course.courseDuration);
        setEditCourseStartDate(course.startDate);
        setEditCourseEndDate(course.endDate);
    };

    const handleSaveCourse = async () => {
        try {
            const response = await axios.put(`/api/admin/courses/${editingCourse._id}`, {
                title: editCourseTitle,
                description: editCourseDescription,
                duration: editCourseDuration,
                startDate: editCourseStartDate,
                endDate: editCourseEndDate
            }, {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            });
            setCourses(courses.map(course => course._id === editingCourse._id ? response.data : course));
            setEditingCourse(null);
            setEditCourseTitle('');
            setEditCourseDescription('');
            setEditCourseDuration('');
            setEditCourseStartDate('');
            setEditCourseEndDate('');
        } catch (error) {
            console.error('Error editing course:', error);
        }
    };

    const handleVideoAdded = (newVideo) => {
        const updatedCourses = courses.map(course => {
            if (course._id === selectedCourse) {
                return {
                    ...course,
                    videos: [...course.videos, newVideo]
                };
            }
            return course;
        });
        setCourses(updatedCourses);
        setSelectedCourse(null);
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
                                <p className="text-gray-500">Duration: {course.courseDuration}</p>
                                <p className="text-gray-500">Start Date: {course.startDate}</p>
                                <p className="text-gray-500">End Date: {course.endDate}</p>
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
                        <div className="mb-4">
                            <label htmlFor="editCourseTitle" className="block text-gray-700">Course Title</label>
                            <input
                                id="editCourseTitle"
                                type="text"
                                placeholder="Course Title"
                                value={editCourseTitle}
                                onChange={e => setEditCourseTitle(e.target.value)}
                                className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="editCourseDescription" className="block text-gray-700">Course Description</label>
                            <textarea
                                id="editCourseDescription"
                                placeholder="Course Description"
                                value={editCourseDescription}
                                onChange={e => setEditCourseDescription(e.target.value)}
                                className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="editCourseDuration" className="block text-gray-700">Course Duration</label>
                            <input
                                id="editCourseDuration"
                                type="text"
                                placeholder="Course Duration"
                                value={editCourseDuration}
                                onChange={e => setEditCourseDuration(e.target.value)}
                                className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="editCourseStartDate" className="block text-gray-700">Start Date</label>
                            <input
                                id="editCourseStartDate"
                                type="date"
                                value={editCourseStartDate}
                                onChange={e => setEditCourseStartDate(e.target.value)}
                                className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="editCourseEndDate" className="block text-gray-700">End Date</label>
                            <input
                                id="editCourseEndDate"
                                type="date"
                                value={editCourseEndDate}
                                onChange={e => setEditCourseEndDate(e.target.value)}
                                className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex justify-center">
                            <button onClick={handleSaveCourse} className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">Save</button>
                        </div>
                    </div>
                ) : (
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Add New Course</h3>
                        <div className="mb-4">
                            <label htmlFor="newCourseTitle" className="block text-gray-700">Course Title</label>
                            <input
                                id="newCourseTitle"
                                type="text"
                                placeholder="Course Title"
                                value={newCourseTitle}
                                onChange={e => setNewCourseTitle(e.target.value)}
                                className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="newCourseDescription" className="block text-gray-700">Course Description</label>
                            <textarea
                                id="newCourseDescription"
                                placeholder="Course Description"
                                value={newCourseDescription}
                                onChange={e => setNewCourseDescription(e.target.value)}
                                className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="newCourseDuration" className="block text-gray-700">Course Duration</label>
                            <input
                                id="newCourseDuration"
                                type="text"
                                placeholder="Course Duration"
                                value={newCourseDuration}
                                onChange={e => setNewCourseDuration(e.target.value)}
                                className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="newCourseStartDate" className="block text-gray-700">Start Date</label>
                            <input
                                id="newCourseStartDate"
                                type="date"
                                value={newCourseStartDate}
                                onChange={e => setNewCourseStartDate(e.target.value)}
                                className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="newCourseEndDate" className="block text-gray-700">End Date</label>
                            <input
                                id="newCourseEndDate"
                                type="date"
                                value={newCourseEndDate}
                                onChange={e => setNewCourseEndDate(e.target.value)}
                                className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex justify-center">
                            <button onClick={handleAddCourse} className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">Add Course</button>
                        </div>
                    </div>
                )}
            </section>
            {selectedCourse && (
                <VideoForm courseId={selectedCourse} onVideoAdded={handleVideoAdded} />
            )}
        </div>
    );
};

export default AdminDashboard;
