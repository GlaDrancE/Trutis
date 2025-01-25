import React, { useState, useEffect } from 'react';
import { QrCode, Plus } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { getQRCodes, generateQRCode } from '../services/api';
import toast from 'react-hot-toast';
import { QRCode } from '../types';

function QRCodes() {
  const [qrCodes, setQRCodes] = useState<QRCode[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    client_id: '',
    amount: 0,
  });

  useEffect(() => {
    loadQRCodes();
  }, []);

  const loadQRCodes = async () => {
    try {
      const response = await getQRCodes();
      setQRCodes(response.data);
    } catch (error) {
      toast.error('Failed to load QR codes');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await generateQRCode(formData);
      toast.success('QR code generated successfully');
      setIsModalOpen(false);
      loadQRCodes();
      setFormData({ client_id: '', amount: 0 });
    } catch (error) {
      toast.error('Failed to generate QR code');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">QR Codes</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Generate QR Code
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {qrCodes.map((qr) => (
          <div key={qr.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-center mb-4">
              <QRCodeCanvas value={qr.code} size={200} />
            </div>
            <div className="text-center">
              <p className="text-gray-600 mb-2">Client ID: {qr.client_id}</p>
              <p className="text-gray-600 mb-2">Amount: ${qr.amount}</p>
              <p className={`text-sm ${qr.status === 'active' ? 'text-green-600' : 'text-gray-600'
                }`}>
                Status: {qr.status}
              </p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Generate QR Code</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Client ID</label>
                <input
                  type="text"
                  value={formData.client_id}
                  onChange={(e) =>
                    setFormData({ ...formData, client_id: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: Number(e.target.value) })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Generate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default QRCodes;