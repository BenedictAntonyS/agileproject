import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Bell, User, LogOut, Home, MessageSquare, Settings } from 'lucide-react';
import { useUser } from '../context/UserContext';
import EventCalendar from '../components/user/EventCalendar';
import EventList from '../components/user/EventList';
import Banner from '../components/user/Banner';
import UserProfile from '../components/user/UserProfile';
import UserSettings from '../components/user/UserSettings';
import { Event } from '../types';

const sampleEvents: Event[] = [
  {
    id: 1,
    title: "Tech Innovation Summit",
    description: "Join us for a day of cutting-edge technology discussions and networking.",
    date: "2024-03-20",
    time: "09:00",
    location: "Main Auditorium",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000",
    category: "Technology",
    bannerImage: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=2000",
    registrationFee: "Free",
    organizer: "Computer Science Department"
  },
  {
    id: 2,
    title: "Spring Cultural Fest",
    description: "Annual cultural celebration featuring performances, art, and food.",
    date: "2024-03-25",
    time: "14:00",
    location: "Campus Square",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000",
    category: "Cultural",
    bannerImage: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=2000",
    registrationFee: "$10",
    organizer: "Student Cultural Committee"
  },
  {
    id: 3,
    title: "Career Fair 2024",
    description: "Meet top employers and explore internship opportunities.",
    date: "2024-03-28",
    time: "10:00",
    location: "Student Center",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1000",
    category: "Career",
    bannerImage: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=2000",
    registrationFee: "Free",
    organizer: "Career Development Center"
  }
];

const UserDashboard: React.FC = () => {
  const { isAuthenticated, userData, logout } = useUser();
  const [view, setView] = useState<'calendar' | 'list'>('list');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [showRegistration, setShowRegistration] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState('events');
  const navigate = useNavigate();

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-600 text-white min-h-screen p-4 hidden md:block">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Campus Connect</h1>
          <p className="text-indigo-200 text-sm">Student Dashboard</p>
        </div>
        
        <nav className="space-y-1">
          <button 
            onClick={() => setActiveTab('events')}
            className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'events' ? 'bg-indigo-700' : 'hover:bg-indigo-700/50'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Events</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'calendar' ? 'bg-indigo-700' : 'hover:bg-indigo-700/50'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Calendar</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('myEvents')}
            className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'myEvents' ? 'bg-indigo-700' : 'hover:bg-indigo-700/50'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span>My Events</span>
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
            onClick={() => setActiveTab('feedback')}
            className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'feedback' ? 'bg-indigo-700' : 'hover:bg-indigo-700/50'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>My Feedback</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'profile' ? 'bg-indigo-700' : 'hover:bg-indigo-700/50'
            }`}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
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
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="bg-indigo-600 text-white md:hidden">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-6 w-6" />
                <h1 className="text-xl font-bold">Campus Connect</h1>
              </div>
              <button onClick={() => setActiveTab('profile')}>
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Desktop Header */}
        <header className="bg-white shadow-sm p-4 hidden md:flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {activeTab === 'events' && 'Upcoming Events'}
            {activeTab === 'calendar' && 'Event Calendar'}
            {activeTab === 'myEvents' && 'My Registered Events'}
            {activeTab === 'notifications' && 'Notifications'}
            {activeTab === 'feedback' && 'My Feedback'}
            {activeTab === 'profile' && 'My Profile'}
            {activeTab === 'settings' && 'Account Settings'}
          </h2>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="bg-indigo-100 rounded-full p-2">
                <User className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-sm font-medium">{userData?.name }</span>
            </div>
          </div>
        </header>

        {/* Mobile Navigation */}
        <div className="bg-white shadow-sm p-2 flex justify-between md:hidden">
          <button 
            onClick={() => setActiveTab('events')}
            className={`flex flex-col items-center p-2 ${activeTab === 'events' ? 'text-indigo-600' : 'text-gray-500'}`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">Events</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('calendar')}
            className={`flex flex-col items-center p-2 ${activeTab === 'calendar' ? 'text-indigo-600' : 'text-gray-500'}`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs mt-1">Calendar</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('myEvents')}
            className={`flex flex-col items-center p-2 ${activeTab === 'myEvents' ? 'text-indigo-600' : 'text-gray-500'}`}
          >
            <Clock className="w-5 h-5" />
            <span className="text-xs mt-1">My Events</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`flex flex-col items-center p-2 ${activeTab === 'notifications' ? 'text-indigo-600' : 'text-gray-500'}`}
          >
            <Bell className="w-5 h-5" />
            <span className="text-xs mt-1">Alerts</span>
          </button>
          
          <button 
            onClick={handleLogout}
            className="flex flex-col items-center p-2 text-gray-500"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-xs mt-1">Logout</span>
          </button>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4">
          {activeTab === 'events' && (
            <>
              {/* Banner Section */}
              <Banner events={sampleEvents} />
              
              {/* Events List */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">Upcoming Events</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setView('list')}
                      className={`p-2 rounded-lg ${
                        view === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500'
                      }`}
                    >
                      List View
                    </button>
                    <button
                      onClick={() => setView('calendar')}
                      className={`p-2 rounded-lg ${
                        view === 'calendar' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500'
                      }`}
                    >
                      Calendar View
                    </button>
                  </div>
                </div>
                
                {view === 'calendar' ? (
                  <EventCalendar 
                    events={sampleEvents} 
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                  />
                ) : (
                  <EventList 
                    events={sampleEvents}
                    onRegister={(event) => {
                      setSelectedEvent(event);
                      setShowRegistration(true);
                    }}
                  />
                )}
              </div>
            </>
          )}
          
          {activeTab === 'calendar' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Event Calendar</h2>
              <EventCalendar 
                events={sampleEvents} 
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
              />
            </div>
          )}
          
          {activeTab === 'myEvents' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">My Registered Events</h2>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">Tech Innovation Summit</h3>
                      <p className="text-gray-500">March 20, 2024 • 09:00</p>
                      <p className="text-gray-500">Main Auditorium</p>
                    </div>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium h-fit">
                      Registered
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>2 days from now</span>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">Spring Cultural Fest</h3>
                      <p className="text-gray-500">March 25, 2024 • 14:00</p>
                      <p className="text-gray-500">Campus Square</p>
                    </div>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium h-fit">
                      Registered
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>7 days from now</span>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-lg">
                  <p className="font-medium">Event Reminder</p>
                  <p className="text-sm text-gray-600">Tech Innovation Summit is tomorrow at 09:00</p>
                  <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded-r-lg">
                  <p className="font-medium">Registration Confirmed</p>
                  <p className="text-sm text-gray-600">Your registration for Spring Cultural Fest has been confirmed</p>
                  <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                </div>
                
                <div className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50 rounded-r-lg">
                  <p className="font-medium">New Event Added</p>
                  <p className="text-sm text-gray-600">Career Fair 2024 has been added to the calendar</p>
                  <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'feedback' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">My Feedback</h2>
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">Tech Workshop: Web Development</h3>
                      <p className="text-sm text-gray-500">Submitted on January 15, 2024</p>
                    </div>
                    <div className="flex items-center bg-yellow-100 px-2 py-1 rounded text-sm">
                      <span className="text-yellow-700 font-medium">4.5</span>
                      <span className="text-yellow-500 ml-1">★</span>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600">Great workshop! Learned a lot about web development.</p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">Annual Cultural Fest</h3>
                      <p className="text-sm text-gray-500">Submitted on February 10, 2024</p>
                    </div>
                    <div className="flex items-center bg-yellow-100 px-2 py-1 rounded text-sm">
                      <span className="text-yellow-700 font-medium">5.0</span>
                      <span className="text-yellow-500 ml-1">★</span>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600">The cultural fest was amazing! Loved the performances.</p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'profile' && (
            <UserProfile userData={userData} />
          )}
          
          {activeTab === 'settings' && (
            <UserSettings />
          )}
        </main>
      </div>

      {/* Registration Modal */}
      {showRegistration && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Register for {selectedEvent.title}</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input type="tel" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Department/Year</label>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
              </div>
              <div className="flex items-center mt-4">
                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" id="reminder" />
                <label htmlFor="reminder" className="ml-2 text-sm text-gray-600">Send me event reminders</label>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowRegistration(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
