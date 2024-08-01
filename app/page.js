// app/page.js

import React from 'react';

export const metadata = {
  title: 'Inventory Dashboard',
  description: 'Manage your inventory with this dashboard',
};

const DashboardPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl text-sky-400 font-semibold">Total Products</h2>
          <p className="text-4xl text-sky-400 font-bold mt-2">1,234</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl text-sky-400 font-semibold">Orders This Month</h2>
          <p className="text-4xl text-sky-400 font-bold mt-2">567</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl text-sky-400 font-semibold">Pending Shipments</h2>
          <p className="text-4xl text-sky-400 font-bold mt-2">89</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
