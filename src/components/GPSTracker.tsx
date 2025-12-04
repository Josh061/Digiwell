import { useState, useEffect } from 'react';

interface GPSTrackerProps {
  orderId: string;
  onClose: () => void;
}

export default function GPSTracker({ orderId, onClose }: GPSTrackerProps) {
  const [progress, setProgress] = useState(45);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + 1, 100));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const milestones = [
    { label: 'Order Confirmed', time: '10:30 AM', status: 'completed' },
    { label: 'Departed Depot', time: '11:45 AM', status: 'completed' },
    { label: 'In Transit', time: '2:15 PM', status: 'active' },
    { label: 'Arriving Soon', time: 'Est. 4:30 PM', status: 'pending' },
    { label: 'Delivered', time: 'Pending', status: 'pending' }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl max-w-4xl w-full border border-[#D4AF37]">
        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Live GPS Tracking</h2>
            <p className="text-slate-400 text-sm">Order #{orderId}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl">&times;</button>
        </div>
        <div className="p-6">
          <div className="bg-slate-800 rounded-xl p-6 mb-6 relative overflow-hidden">
            <img 
              src="https://d64gsuwffb70l.cloudfront.net/69138b477443873c621b20e5_1762888626258_ba8612e7.webp" 
              alt="GPS Map" 
              className="w-full h-64 object-cover rounded-lg opacity-80"
            />
            <div className="absolute top-10 left-10 bg-[#00D4FF] text-white px-4 py-2 rounded-full font-bold shadow-lg">
              Origin
            </div>
            <div className="absolute bottom-10 right-10 bg-[#D4AF37] text-slate-900 px-4 py-2 rounded-full font-bold shadow-lg animate-pulse">
              Destination
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-800 p-4 rounded-lg">
              <div className="text-slate-400 text-sm mb-1">Distance Remaining</div>
              <div className="text-2xl font-bold text-white">{(450 * (1 - progress/100)).toFixed(0)} km</div>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg">
              <div className="text-slate-400 text-sm mb-1">ETA</div>
              <div className="text-2xl font-bold text-[#D4AF37]">4:30 PM</div>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg">
              <div className="text-slate-400 text-sm mb-1">Progress</div>
              <div className="text-2xl font-bold text-[#00D4FF]">{progress}%</div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-semibold">Delivery Progress</span>
              <span className="text-[#00D4FF]">{progress}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-[#00D4FF] to-[#D4AF37] h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-3">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className={`w-4 h-4 rounded-full ${
                  milestone.status === 'completed' ? 'bg-green-500' :
                  milestone.status === 'active' ? 'bg-[#00D4FF] animate-pulse' :
                  'bg-slate-600'
                }`}></div>
                <div className="flex-1">
                  <div className="text-white font-semibold">{milestone.label}</div>
                  <div className="text-slate-400 text-sm">{milestone.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-slate-800 p-4 rounded-lg">
            <div className="text-white font-semibold mb-2">Driver Contact</div>
            <div className="text-slate-300">John Mensah - +234 801 234 5678</div>
            <button className="mt-3 w-full bg-[#00D4FF] text-slate-900 font-bold py-2 rounded-lg hover:bg-[#00B8E6] transition-all">
              Contact Driver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
