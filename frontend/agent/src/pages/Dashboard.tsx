import React from 'react';
import { BottomNav } from '../components/BottomNav';

export const Dashboard = () => {
  const payments = [
    { id: 1, client: 'John Doe', amount: 1000, date: '2024-03-15' },
    { id: 2, client: 'Jane Smith', amount: 1500, date: '2024-03-14' },
    { id: 3, client: 'Mike Johnson', amount: 800, date: '2024-03-13' },
  ];

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      <div className="bg-blue-600 text-white p-6">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-blue-100">Your Payment Records</p>
      </div>
      
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Payments</h2>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{payment.client}</p>
                    <p className="text-sm text-gray-500">{payment.date}</p>
                  </div>
                  <p className="text-blue-600 font-semibold">₹{payment.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};