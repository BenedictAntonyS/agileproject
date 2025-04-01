import React from 'react';
import { Event } from '../../types';
import { Calendar } from 'lucide-react';

interface EventCalendarProps {
  events: Event[];
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

const EventCalendar: React.FC<EventCalendarProps> = ({ events, selectedDate, onDateSelect }) => {
  // Get current month and year
  const currentDate = new Date();
  const [month, setMonth] = React.useState(currentDate.getMonth());
  const [year, setYear] = React.useState(currentDate.getFullYear());

  // Get days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Create calendar days array
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Function to check if a date has events
  const hasEvents = (day: number) => {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.some(event => event.date === dateString);
  };

  // Function to get events for a specific date
  const getEventsForDate = (dateString: string) => {
    return events.filter(event => event.date === dateString);
  };

  // Function to handle month navigation
  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (month === 0) {
        setMonth(11);
        setYear(year - 1);
      } else {
        setMonth(month - 1);
      }
    } else {
      if (month === 11) {
        setMonth(0);
        setYear(year + 1);
      } else {
        setMonth(month + 1);
      }
    }
  };

  // Get month name
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Get events for selected date
  const selectedEvents = getEventsForDate(selectedDate);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
            Event Calendar
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              &lt;
            </button>
            <span className="font-medium">
              {monthNames[month]} {year}
            </span>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={index} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="h-12 bg-gray-50"></div>;
            }
            
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isSelected = dateString === selectedDate;
            const hasEventsToday = hasEvents(day);
            
            return (
              <div
                key={`day-${day}`}
                onClick={() => onDateSelect(dateString)}
                className={`h-12 flex flex-col items-center justify-center cursor-pointer border rounded-lg ${
                  isSelected
                    ? 'bg-indigo-100 border-indigo-300'
                    : hasEventsToday
                    ? 'bg-indigo-50 border-indigo-200'
                    : 'hover:bg-gray-50 border-transparent'
                }`}
              >
                <span className={`text-sm ${isSelected ? 'font-bold text-indigo-700' : ''}`}>
                  {day}
                </span>
                {hasEventsToday && (
                  <div className={`w-1.5 h-1.5 rounded-full mt-0.5 ${isSelected ? 'bg-indigo-600' : 'bg-indigo-400'}`}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Events for selected date */}
      <div className="p-4 border-t">
        <h4 className="font-medium mb-2">
          Events on {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </h4>
        
        {selectedEvents.length > 0 ? (
          <div className="space-y-2">
            {selectedEvents.map((event) => (
              <div key={event.id} className="p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex justify-between">
                  <h5 className="font-medium">{event.title}</h5>
                  <span className="text-sm text-gray-500">{event.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{event.location}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No events scheduled for this date.</p>
        )}
      </div>
    </div>
  );
};

export default EventCalendar;