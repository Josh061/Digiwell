export default function AdminDashboard() {
  const stats = [
    { label: 'Total Applications', value: '1,247', change: '+12.5%', color: 'text-[#00D4FF]' },
    { label: 'Approved Bids', value: '892', change: '+8.3%', color: 'text-green-400' },
    { label: 'Processing Fees', value: '$2.4M', change: '+15.7%', color: 'text-[#D4AF37]' },
    { label: 'Active Deliveries', value: '156', change: '+5.2%', color: 'text-yellow-400' }
  ];

  const recentApplications = [
    { id: 'APP-1001', company: 'Global Energy Ltd', product: 'Crude Oil', quantity: '50,000 barrels', status: 'Pending', amount: '$4,122,500' },
    { id: 'APP-1002', company: 'Petro Solutions Inc', product: 'Natural Gas', quantity: '100,000 MMBtu', status: 'Approved', amount: '$325,000' },
    { id: 'APP-1003', company: 'Aviation Fuel Co', product: 'Jet A1', quantity: '25,000 barrels', status: 'In Transit', amount: '$2,395,000' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700">
            <div className="text-slate-400 text-sm mb-2">{stat.label}</div>
            <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-green-400 text-sm">{stat.change}</div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-xl font-bold text-white">Recent Applications</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800">
              <tr>
                <th className="text-left text-slate-400 p-4 text-sm">Application ID</th>
                <th className="text-left text-slate-400 p-4 text-sm">Company</th>
                <th className="text-left text-slate-400 p-4 text-sm">Product</th>
                <th className="text-left text-slate-400 p-4 text-sm">Quantity</th>
                <th className="text-left text-slate-400 p-4 text-sm">Amount</th>
                <th className="text-left text-slate-400 p-4 text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentApplications.map((app, idx) => (
                <tr key={idx} className="border-t border-slate-700 hover:bg-slate-800/50">
                  <td className="p-4 text-[#00D4FF] font-mono">{app.id}</td>
                  <td className="p-4 text-white">{app.company}</td>
                  <td className="p-4 text-slate-300">{app.product}</td>
                  <td className="p-4 text-slate-300">{app.quantity}</td>
                  <td className="p-4 text-[#D4AF37] font-bold">{app.amount}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      app.status === 'Approved' ? 'bg-green-500/20 text-green-400' :
                      app.status === 'In Transit' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
