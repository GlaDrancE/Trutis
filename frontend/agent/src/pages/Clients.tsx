import React from 'react';
import { BottomNav } from '../components/BottomNav';

export const Clients = () => {
  const completedClients = [
    { id: 1, name: 'John Doe', date: '2024-03-15' },
    { id: 2, name: 'Jane Smith', date: '2024-03-14' },
  ];

  const milestone = {
    current: 15,
    target: 20,
  };

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      <div className="bg-blue-600 text-white p-6">
        <h1 className="text-2xl font-bold">Clients & Milestones</h1>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Current Milestone</h2>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block text-blue-600">
                  {(milestone.current / milestone.target * 100).toFixed(0)}%
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  {milestone.current}/{milestone.target} Clients
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div
                style={{ width: `${(milestone.current / milestone.target * 100)}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Completed Clients</h2>
          <div className="space-y-4">
            {completedClients.map((client) => (
              <div key={client.id} className="border-b pb-3">
                <p className="font-medium text-gray-800">{client.name}</p>
                <p className="text-sm text-gray-500">Verified on {client.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};