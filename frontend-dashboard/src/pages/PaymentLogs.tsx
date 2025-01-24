import React, { useState, useEffect } from 'react';
import { getPaymentLogs } from '../services/api';
import toast from 'react-hot-toast';

function PaymentLogs() {
  const [logs, setLogs] = useState<PaymentLog[]>([]);

  useEffect(() => {
    loadPaymentLogs();
  }, []);

  const loadPaymentLogs = async () => {
    try {
      const response = await getPaymentLogs();
      setLogs(response.data);
    } catch (error) {
      toast.error('Failed to load payment logs');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Payment Logs</h1>
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left">QR Code ID</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{log.qr_code_id}</td>
                <td className="px-6 py-4">${log.amount}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      log.status === 'success'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {log.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {new Date(log.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentLogs;