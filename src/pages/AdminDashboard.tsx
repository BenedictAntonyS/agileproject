import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Users, 
  MessageSquare, 
  Bell, 
  Settings, 
  LogOut, 
  User, 
  PieChart 
} from 'lucide-react';
import { useUser } from '../context/UserContext';

// Mock data for events
const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Tech Workshop: Web Development',
    date: '2025-06-15',
    time: '10:00 AM - 2:00 PM',
    venue: 'Engineering Building, Room 302',
    category: 'Workshop',
    registrations: 45,
    description: 'Learn the fundamentals of web development with HTML, CSS, and JavaScript.'
  },
  {
    id: '2',
    title: 'Annual Cultural Fest',
    date: '2025-07-20',
    time: '5:00 PM - 10:00 PM',
    venue: 'University Auditorium',
    category: 'Cultural',
    registrations: 120,
    description: 'Join us for a night of music, dance, and cultural performances.'
  },
  {
    id: '3',
    title: 'Career Fair 2025',
    date: '2025-08-05',
    time: '9:00 AM - 4:00 PM',
    venue: 'Student Center',
    category: 'Career',
    registrations: 78,
    description: 'Connect with top employers and explore career opportunities.'
  }
];

// Mock data for users
const MOCK_USERS = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@university.edu',
    registeredEvents: 2,
    joinDate: '2025-01-15'
  },
  {
    id: '2',
    name: 'Emily Johnson',
    email: 'emily.j@university.edu',
    registeredEvents: 3,
    joinDate: '2025-02-03'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.b@university.edu',
    registeredEvents: 1,
    joinDate: '2025-03-10'
  }
];

// Mock data for feedback
const MOCK_FEEDBACK = [
  {
    id: '1',
    eventId: '1',
    userName: 'John Smith',
    rating: 4.5,
    comment: 'Great workshop! Learned a lot about web development.',
    date: '2025-06-15'
  },
  {
    id: '2',
    eventId: '2',
    userName: 'Emily Johnson',
    rating: 5,
    comment: 'The cultural fest was amazing! Loved the performances.',
    date: '2025-07-21'
  },
  {
    id: '3',
    eventId: '1',
    userName: 'Michael Brown',
    rating: 3.5,
    comment: 'Good content but could use more hands-on exercises.',
    date: '2025-06-16'
  }
];

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, userData, logout } = useUser();
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  
  // Event management state
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [users, setUsers] = useState(MOCK_USERS);
  const [feedback, setFeedback] = useState(MOCK_FEEDBACK);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isEditingEvent, setIsEditingEvent] = useState(false);
  
  // Event form state
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    category: 'Workshop',
    description: ''
  });

  // Redirect if not authenticated or not admin
  if (!isAuthenticated || userData?.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEventFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setEventForm({
      ...eventForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditingEvent && selectedEvent) {
      // Update existing event
      const updatedEvents = events.map(event => 
        event.id === selectedEvent.id ? { ...event, ...eventForm } : event
      );
      setEvents(updatedEvents);
    } else {
      // Add new event
      const newEvent = {
        id: (events.length + 1).toString(),
        ...eventForm,
        registrations: 0
      };
      setEvents([...events, newEvent]);
    }
    
    // Reset form
    setEventForm({
      title: '',
      date: '',
      time: '',
      venue: '',
      category: 'Workshop',
      description: ''
    });
    setSelectedEvent(null);
    setIsEditingEvent(false);
    setActiveTab('events');
  };

  const handleEditEvent = (event: any) => {
    setSelectedEvent(event);
    setEventForm({
      title: event.title,
      date: event.date,
      time: event.time,
      venue: event.venue,
      category: event.category,
      description: event.description
    });
    setIsEditingEvent(true);
    setActiveTab('createEvent');
  };

  const handleDeleteEvent = (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== eventId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white min-h-screen p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Campus Connector</h1>
          <p className="text-indigo-200 text-sm">Admin Dashboard</p>
        </div>
        
        <nav className="space-y-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'dashboard' ? 'bg-indigo-700' : 'hover:bg-indigo-700/50'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('events')}
            className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'events' ? 'bg-indigo-700' : 'hover:bg-indigo-700/50'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Events</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('createEvent')}
            className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'createEvent' ? 'bg-indigo-700' : 'hover:bg-indigo-700/50'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>{isEditingEvent ? 'Edit Event' : 'Create Event'}</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('users')}
            className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'users' ? 'bg-indigo-700' : 'hover:bg-indigo-700/50'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Users</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('feedback')}
            className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'feedback' ? 'bg-indigo-700' : 'hover:bg-indigo-700/50'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Feedback</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'notifications' ? 'bg-indigo-700' : 'hover:bg-indigo-700/50'
            }`}
          >
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'settings' ? 'bg-indigo-700' : 'hover:bg-indigo-700/50'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </nav>
        
        <div className="mt-auto pt-6">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg hover:bg-indigo-700/50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'events' && 'Event Management'}
            {activeTab === 'createEvent' && (isEditingEvent ? 'Edit Event' : 'Create New Event')}
            {activeTab === 'users' && 'User Management'}
            {activeTab === 'feedback' && 'Event Feedback'}
            {activeTab === 'notifications' && 'Notifications'}
            {activeTab === 'settings' && 'System Settings'}
          </h2>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="bg-indigo-100 rounded-full p-2">
                <User className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-sm font-medium">{userData?.name || 'Admin'}</span>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <main className="p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Events</p>
                      <p className="text-2xl font-bold">{events.length}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <p className="text-xs text-green-600 mt-2">+2 new this month</p>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Users</p>
                      <p className="text-2xl font-bold">{users.length}</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <p className="text-xs text-green-600 mt-2">+5 new this month</p>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Registrations</p>
                      <p className="text-2xl font-bold">243</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <PieChart className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <p className="text-xs text-green-600 mt-2">+18 new this week</p>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Feedback Received</p>
                      <p className="text-2xl font-bold">{feedback.length}</p>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <MessageSquare className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                  <p className="text-xs text-green-600 mt-2">+3 new this week</p>
                </div>
              </div>
              
              {/* Recent Events */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold">Upcoming Events</h3>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registrations</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {events.slice(0, 3).map((event) => (
                          <tr key={event.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{event.title}</div>
                              <div className="text-sm text-gray-500">{event.category}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{event.date}</div>
                              <div className="text-sm text-gray-500">{event.time}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {event.venue}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {event.registrations}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              {/* Recent Feedback */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold">Recent Feedback</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {feedback.slice(0, 3).map((item) => (
                      <div key={item.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{item.userName}</p>
                            <p className="text-sm text-gray-500">
                              {events.find(e => e.id === item.eventId)?.title || 'Unknown Event'}
                            </p>
                          </div>
                          <div className="flex items-center bg-yellow-100 px-2 py-1 rounded text-sm">
                            <span className="text-yellow-700 font-medium">{item.rating}</span>
                            <span className="text-yellow-500 ml-1">★</span>
                          </div>
                        </div>
                        <p className="mt-2 text-gray-600">{item.comment}</p>
                        <p className="mt-2 text-xs text-gray-400">{item.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Events Management */}
          {activeTab === 'events' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b flex justify-between items-center">
                <h3 className="text-lg font-semibold">All Events</h3>
                <button 
                  onClick={() => {
                    setSelectedEvent(null);
                    setIsEditingEvent(false);
                    setEventForm({
                      title: '',
                      date: '',
                      time: '',
                      venue: '',
                      category: 'Workshop',
                      description: ''
                    });
                    setActiveTab('createEvent');
                  }}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Create New Event
                </button>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registrations</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {events.map((event) => (
                        <tr key={event.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{event.title}</div>
                            <div className="text-sm text-gray-500">{event.category}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{event.date}</div>
                            <div className="text-sm text-gray-500">{event.time}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {event.venue}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {event.registrations}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button 
                              onClick={() => handleEditEvent(event)}
                              className="text-indigo-600 hover:text-indigo-900 mr-3"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteEvent(event.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* Create/Edit Event Form */}
          {activeTab === 'createEvent' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-6">{isEditingEvent ? 'Edit Event' : 'Create New Event'}</h3>
              
              <form onSubmit={handleEventSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={eventForm.title}
                      onChange={handleEventFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={eventForm.category}
                      onChange={handleEventFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="Workshop">Workshop</option>
                      <option value="Seminar">Seminar</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Career">Career</option>
                      <option value="Sports">Sports</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={eventForm.date}
                      onChange={handleEventFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time
                    </label>
                    <input
                      type="text"
                      name="time"
                      value={eventForm.time}
                      onChange={handleEventFormChange}
                      placeholder="e.g., 10:00 AM - 2:00 PM"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Venue
                    </label>
                    <input
                      type="text"
                      name="venue"
                      value={eventForm.venue}
                      onChange={handleEventFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={eventForm.description}
                      onChange={handleEventFormChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    ></textarea>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('events');
                      setIsEditingEvent(false);
                      setSelectedEvent(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {isEditingEvent ? 'Update Event' : 'Create Event'}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* User Management */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">User Management</h3>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered Events</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                <User className="h-6 w-6 text-indigo-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {user.registeredEvents}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.joinDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                              View
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              Disable
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* Feedback Management */}
          {activeTab === 'feedback' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">Event Feedback</h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {feedback.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{item.userName}</p>
                          <p className="text-sm text-gray-500">
                            {events.find(e => e.id === item.eventId)?.title || 'Unknown Event'}
                          </p>
                        </div>
                        <div className="flex items-center bg-yellow-100 px-2 py-1 rounded text-sm">
                          <span className="text-yellow-700 font-medium">{item.rating}</span>
                          <span className="text-yellow-500 ml-1">★</span>
                        </div>
                      </div>
                      <p className="mt-2 text-gray-600">{item.comment}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <p className="text-xs text-gray-400">{item.date}</p>
                        <div>
                          <button className="text-gray-500 hover:text-gray-700 text-sm mr-3">
                            Reply
                          </button>
                          <button className="text-red-500 hover:text-red-700 text-sm">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b flex justify-between items-center">
                <h3 className="text-lg font-semibold">Notifications</h3>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Send New Notification
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-lg">
                    <p className="font-medium">New Event Registration</p>
                    <p className="text-sm text-gray-600">John Smith registered for Tech Workshop: Web Development</p>
                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded-r-lg">
                    <p className="font-medium">New Feedback Received</p>
                    <p className="text-sm text-gray-600">Emily Johnson left feedback for Annual Cultural Fest</p>
                    <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                  </div>
                  
                  <div className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50 rounded-r-lg">
                    <p className="font-medium">Event Reminder</p>
                    <p className="text-sm text-gray-600">Career Fair 2025 is scheduled for tomorrow</p>
                    <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Settings */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">System Settings</h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-md font-medium mb-4">Email Notifications</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">New event registrations</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">New feedback submissions</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Event reminders</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="text-md font-medium mb-4">System Preferences</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Default Event Registration Limit
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          defaultValue="100"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Feedback Moderation
                        </label>
                        <select
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          defaultValue="auto"
                        >
                          <option value="auto">Automatic (No moderation)</option>
                          <option value="manual">Manual approval required</option>
                          <option value="filter">Filter inappropriate content</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="text-md font-medium mb-4">Admin Account</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          defaultValue="admin@campusconnector.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Change Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Enter new password"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;