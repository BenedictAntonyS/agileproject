import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Event } from '../../types';

interface EventListProps {
  events: Event[];
  onRegister: (event: Event) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onRegister }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <div key={event.id} className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
          <div 
            className="h-48 bg-cover bg-center" 
            style={{ backgroundImage: `url(${event.image})` }}
          ></div>
          <div className="p-4 flex-1 flex flex-col">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                {event.category}
              </span>
            </div>
            
            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                <span>{event.location}</span>
              </div>
            </div>
            
            <p className="mt-3 text-gray-600 text-sm line-clamp-2">{event.description}</p>
            
            <div className="mt-4 pt-3 border-t flex justify-between items-center">
              <div>
                <span className="text-xs text-gray-500">Registration Fee</span>
                <p className="font-medium">{event.registrationFee}</p>
              </div>
              <button
                onClick={() => onRegister(event)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;