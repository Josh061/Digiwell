import { Flame, TrendingUp, FileCheck, Truck, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Applications', value: '1,247', change: '+12.5%', icon: FileCheck, gradient: 'from-flame-core to-flame-hot' },
    { label: 'Approved Bids', value: '892', change: '+8.3%', icon: TrendingUp, gradient: 'from-green-500 to-emerald-500' },
    { label: 'Processing Fees', value: '$2.4M', change: '+15.7%', icon: DollarSign, gradient: 'from-flame-hot to-orange-500' },
    { label: 'Active Deliveries', value: '156', change: '+5.2%', icon: Truck, gradient: 'from-amber-500 to-yellow-500' }
  ];

  const recentApplications = [
    { id: 'APP-1001', company: 'Global Energy Ltd', product: 'Crude Oil', quantity: '50,000 barrels', status: 'Pending', amount: '$4,122,500' },
    { id: 'APP-1002', company: 'Petro Solutions Inc', product: 'Natural Gas', quantity: '100,000 MMBtu', status: 'Approved', amount: '$325,000' },
    { id: 'APP-1003', company: 'Aviation Fuel Co', product: 'Jet A1', quantity: '25,000 barrels', status: 'In Transit', amount: '$2,395,000' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-flame-core/20 rounded-xl">
          <Flame className="h-6 w-6 text-flame-hot" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-flame-light">Admin Dashboard</h2>
          <p className="text-flame-light/60 text-sm">Monitor platform activity and transactions</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-gradient-to-br from-flame-dark to-flame-dark/80 p-6 rounded-2xl border border-flame-core/20 hover:border-flame-core/40 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-green-400 text-sm font-semibold bg-green-500/10 px-2 py-1 rounded-full">{stat.change}</span>
            </div>
            <div className="text-flame-light/60 text-sm mb-1">{stat.label}</div>
            <div className="text-3xl font-bold text-flame-light group-hover:text-flame-hot transition-colors">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Recent Applications Table */}
      <div className="bg-gradient-to-br from-flame-dark to-flame-dark/80 rounded-2xl border border-flame-core/20 overflow-hidden">
        <div className="p-6 border-b border-flame-core/20 bg-gradient-to-r from-flame-core/10 to-transparent">
          <h3 className="text-xl font-bold text-flame-light flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-flame-hot" />
            Recent Applications
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-flame-dark/50">
              <tr>
                <th className="text-left text-flame-light/60 p-4 text-sm font-medium">Application ID</th>
                <th className="text-left text-flame-light/60 p-4 text-sm font-medium">Company</th>
                <th className="text-left text-flame-light/60 p-4 text-sm font-medium">Product</th>
                <th className="text-left text-flame-light/60 p-4 text-sm font-medium">Quantity</th>
                <th className="text-left text-flame-light/60 p-4 text-sm font-medium">Amount</th>
                <th className="text-left text-flame-light/60 p-4 text-sm font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentApplications.map((app, idx) => (
                <tr key={idx} className="border-t border-flame-core/10 hover:bg-flame-core/5 transition-colors">
                  <td className="p-4 text-flame-hot font-mono font-semibold">{app.id}</td>
                  <td className="p-4 text-flame-light">{app.company}</td>
                  <td className="p-4 text-flame-light/70">{app.product}</td>
                  <td className="p-4 text-flame-light/70">{app.quantity}</td>
                  <td className="p-4 text-flame-core font-bold">{app.amount}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      app.status === 'Approved' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      app.status === 'In Transit' ? 'bg-flame-core/20 text-flame-hot border border-flame-core/30' :
                      'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
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
