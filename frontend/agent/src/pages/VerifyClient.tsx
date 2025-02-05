import React, { useState } from 'react';
import { UserCheck } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';
import { verifyClient } from '../../../services/api'
import axios from 'axios';

export const VerifyClient = () => {
  const [clientId, setClientId] = useState('');
  const [clientDetails, setClientDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    // Simulated API call - replace with actual endpoint
    try {
      const response = await verifyClient(clientId);
      setClientDetails(response.data);
    } catch (error) {
      console.error('Error fetching client details:', error);
    }
    setLoading(false);
  };

  const handleVerify = async () => {
    try {
      // const response = await verifyClient();
      // console.log(response)
      // Handle success
    } catch (error) {
      console.error('Error verifying client:', error);
    }
  };

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      <div className="bg-blue-600 text-white p-6">
        <h1 className="text-2xl font-bold">Verify Client</h1>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Client ID
            </label>
            <input
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter client ID"
            />
          </div>
          <button
            onClick={handleSearch}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 mb-4"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search Client'}
          </button>

          {clientDetails && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Client Details</h3>
              <div className="space-y-3">
                <p><span className="font-medium">Shop Name:</span> {clientDetails.shop_name}</p>
                <p><span className="font-medium">Owner Name:</span> {clientDetails.owner_name}</p>
                <p><span className="font-medium">Email:</span> {clientDetails.email}</p>
                <p><span className="font-medium">Address:</span> {clientDetails.address}</p>
                <p><span className="font-medium">Phone:</span> {clientDetails.phone}</p>
                <p><span className="font-medium">Image:</span> <img src={clientDetails.logo} alt="" /></p>
                <p><span className="font-medium">Google API:</span> {clientDetails.googleAPI}</p>
                <button
                  onClick={handleVerify}
                  className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2"
                >
                  <UserCheck size={20} />
                  Verify Client
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};