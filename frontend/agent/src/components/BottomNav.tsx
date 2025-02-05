import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, UserCheck, Users, User } from 'lucide-react';

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        <button
          onClick={() => navigate('/dashboard')}
          className={`flex flex-col items-center ${
            isActive('/dashboard') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button
          onClick={() => navigate('/verify')}
          className={`flex flex-col items-center ${
            isActive('/verify') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <UserCheck size={24} />
          <span className="text-xs mt-1">Verify</span>
        </button>
        <button
          onClick={() => navigate('/clients')}
          className={`flex flex-col items-center ${
            isActive('/clients') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Users size={24} />
          <span className="text-xs mt-1">Clients</span>
        </button>
        <button
          onClick={() => navigate('/profile')}
          className={`flex flex-col items-center ${
            isActive('/profile') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </div>
    </div>
  );
};