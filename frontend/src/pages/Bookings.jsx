import React from 'react';

const Bookings = () => {
  return (
    <div className="container">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Bookings</h1>
      
      <div className="card">
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
          <p className="text-gray-500">Your event bookings will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
