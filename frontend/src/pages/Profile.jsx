import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <div className="container">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>
        
        <div className="card">
          <div className="space-y-6">
            <div>
              <label className="form-label">Name</label>
              <p className="text-gray-900 font-medium">{user?.name || 'N/A'}</p>
            </div>
            
            <div>
              <label className="form-label">Email</label>
              <p className="text-gray-900 font-medium">{user?.email || 'N/A'}</p>
            </div>
            
            <div>
              <label className="form-label">Role</label>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {user?.role || 'N/A'}
              </span>
            </div>
            
            <div>
              <label className="form-label">Member Since</label>
              <p className="text-gray-900 font-medium">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
