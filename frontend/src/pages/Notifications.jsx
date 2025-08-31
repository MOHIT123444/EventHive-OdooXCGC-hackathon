import React from 'react';

const Notifications = () => {
  return (
    <div className="container">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Notifications</h1>
      
      <div className="card">
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6zM4 5h6V4a1 1 0 00-1-1H5a1 1 0 00-1 1v1zm0 6h6V9H4v2zm0 4h6v-2H4v2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications yet</h3>
          <p className="text-gray-500">Your notifications will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
