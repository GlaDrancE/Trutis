import React from 'react';
import { Users, UserCircle, QrCode, Receipt } from 'lucide-react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const stats = [
    {
      title: 'Total Agents',
      value: '25',
      icon: Users,
      link: '/agents',
      color: 'bg-blue-500',
    },
    {
      title: 'Total Clients',
      value: '150',
      icon: UserCircle,
      link: '/clients',
      color: 'bg-green-500',
    },
    {
      title: 'Active QR Codes',
      value: '75',
      icon: QrCode,
      link: '/qr-codes',
      color: 'bg-purple-500',
    },
    {
      title: 'Total Payments',
      value: '$12,450',
      icon: Receipt,
      link: '/payment-logs',
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.title}
            to={stat.link}
            className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
              <h3 className="text-gray-600">{stat.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">New Client Registration</p>
                <p className="text-sm text-gray-600">John Doe</p>
              </div>
              <span className="text-sm text-gray-600">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">QR Code Generated</p>
                <p className="text-sm text-gray-600">For Client #123</p>
              </div>
              <span className="text-sm text-gray-600">5 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Payment Received</p>
                <p className="text-sm text-gray-600">$500.00</p>
              </div>
              <span className="text-sm text-gray-600">1 day ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/agents/new"
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 text-center"
            >
              <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <span className="text-sm font-medium">Add Agent</span>
            </Link>
            <Link
              to="/clients/new"
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 text-center"
            >
              <UserCircle className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <span className="text-sm font-medium">Add Client</span>
            </Link>
            <Link
              to="/qr-codes/new"
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 text-center"
            >
              <QrCode className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <span className="text-sm font-medium">Generate QR</span>
            </Link>
            <Link
              to="/payment-logs"
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 text-center"
            >
              <Receipt className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
              <span className="text-sm font-medium">View Payments</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;