import React, { useState } from 'react';
import { BottomNav } from '../components/BottomNav';

export const Profile = () => {
  const [isActive, setIsActive] = useState(true);
  const agentInfo = {
    name: 'John Agent',
    email: 'john.agent@example.com',
    totalVerifications: 45,
    joinDate: '2024-01-15',
  };

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      <div className="bg-blue-600 text-white p-6">
        <h1 className="text-2xl font-bold">Agent Profile</h1>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl text-blue-600 font-bold">
                {agentInfo.name.charAt(0)}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">{agentInfo.name}</h2>
            <p className="text-gray-600">{agentInfo.email}</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">Status</span>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={() => setIsActive(!isActive)}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${isActive ? 'bg-blue-600' : 'bg-gray-300'}`}></label>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded">
              <span className="font-medium">Total Verifications</span>
              <p className="text-2xl font-bold text-blue-600 mt-1">{agentInfo.totalVerifications}</p>
            </div>

            <div className="p-3 bg-gray-50 rounded">
              <span className="font-medium">Join Date</span>
              <p className="text-gray-700 mt-1">{agentInfo.joinDate}</p>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};