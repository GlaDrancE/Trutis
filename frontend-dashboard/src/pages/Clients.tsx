import React, { useState, useEffect, useMemo } from 'react';
import { UserPlus, Edit2, Trash2, Camera, Plus } from 'lucide-react';
import { getClients, createClient, updateClient, deleteClient, getPlans } from '../services/api';
import toast from 'react-hot-toast';
import { Client, Plans } from '../types';

function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [plans, setPlans] = useState<Plans[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<Client>({
    shop_name: '',
    owner_name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    plan_id: '',
    googleAPI: '',
    logo: null,
  });
  const [editingId, setEditingId] = useState<string | null | undefined>(null);

  useEffect(() => {
    if (clients.length > 0 && plans.length <= 0) {
      loadPlans();
    }
  }, [clients, plans])
  useEffect(() => {
    loadClients();
  }, []);
  const loadPlans = async () => {
    try {
      const response = await getPlans();
      setPlans(response.data)
      // setClients()
      const cl = clients.map(client => {
        const activePlan = response.data.filter((plan: any) =>
          client.activePlan && plan.id === client.activePlan[0].plan_id
        )
        return { ...client, plan_title: activePlan ? activePlan[0].title : null }
      })
      setClients(cl)

    } catch (error) {
      toast.error('Failed to load subscription plans');
    }
  }

  const loadClients = async () => {
    try {
      const response = await getClients();
      setClients(response.data);
    } catch (error) {
      toast.error('Failed to load clients');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0]
      const reader = new FileReader();
      reader.readAsDataURL(img)
      setFormData(prev => ({ ...prev, logo: img }))
      reader.onloadend = () => {
        setProfile(reader.result as string)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData)
    try {
      if (editingId) {
        await updateClient(editingId, formData);
        toast.success('Client updated successfully');
      } else {
        await createClient(formData);
        toast.success('Client created successfully');
      }
      setIsModalOpen(false);
      loadClients();
      resetForm();
    } catch (error) {
      toast.error(editingId ? 'Failed to update client' : 'Failed to create client');
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        if (id) {
          await deleteClient(id);
          toast.success('Client deleted successfully');
          loadClients();
        }
      } catch (error) {
        toast.error('Failed to delete client');
      }
    }
  };

  const resetForm = () => {
    setFormData({ shop_name: '', owner_name: '', email: '', phone: '', password: '', logo: '', plan_id: '', googleAPI: '', address: '' });
    setEditingId(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clients</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add Client
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full max-w-full ">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left text-nowrap">Shop Name</th>
              <th className="px-6 py-3 text-left text-nowrap">Owner Name</th>
              <th className="px-6 py-3 text-left text-nowrap">Email</th>
              <th className="px-6 py-3 text-left text-nowrap">Phone</th>
              <th className="px-6 py-3 text-left text-nowrap min-w-96">Address</th>
              <th className="px-6 py-3 text-left text-nowrap">Logo</th>
              <th className="px-6 py-3 text-left text-nowrap">Selected Plan</th>
              <th className="px-6 py-3 text-left text-nowrap">Google API</th>

              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans && clients.map((client) => (
              <tr key={client.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{client.shop_name}</td>
                <td className="px-6 py-4">{client.owner_name}</td>
                <td className="px-6 py-4">{client.email}</td>
                <td className="px-6 py-4">{client.phone}</td>
                <td className="px-6 py-4">{client.address}</td>
                <td className="">
                  <div className='w-[3rem] h-[3rem] overflow-hidden rounded-full'><img src={client.logo} alt="" className='w-full h-full object-cover' /></div></td>
                <td className="px-6 py-4">{client.plan_title}</td>
                <td className="px-6 py-4">{client.googleAPI}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setFormData({
                        shop_name: client.shop_name,
                        owner_name: client.owner_name,
                        email: client.email,
                        phone: client.phone,
                        address: client.address,
                        googleAPI: client.googleAPI,
                        logo: client.logo,
                      });
                      setEditingId(client.id);
                      setIsModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? 'Edit Client' : 'Add Client'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label className='relative w-32 h-32 bg-gray-300 flex items-center justify-center rounded-full mx-auto cursor-pointer' htmlFor='logo'>
                  {formData.logo != '' ? <img src={profile} className='w-full h-full object-cover rounded-full' /> : <><Plus />
                    <span className='absolute -bottom-0 -right-0 rounded-full bg-black text-white p-2'>
                      <Camera className='w-4 h-4' />
                    </span></>}

                </label>
                <input type="file" name="logo" id="logo" onChange={(e) => handleFileChange(e)} className='hidden' accept='image/*' />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Shop Name</label>
                <input
                  type="text"
                  value={formData.shop_name}
                  onChange={(e) =>
                    setFormData({ ...formData, shop_name: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Owner Name</label>
                <input
                  type="text"
                  value={formData.owner_name}
                  onChange={(e) =>
                    setFormData({ ...formData, owner_name: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full p-2 border rounded pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Google API</label>
                <input
                  type="text"
                  value={formData.googleAPI}
                  onChange={(e) =>
                    setFormData({ ...formData, googleAPI: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Subscription</label>
                <select
                  value={formData.plan_id}
                  onChange={(e) =>
                    setFormData({ ...formData, plan_id: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Employment Type</option>
                  {plans.map(plan => (
                    <option value={plan.id}>{plan.title}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clients;