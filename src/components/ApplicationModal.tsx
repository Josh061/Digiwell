import { useState } from 'react';
import { Product } from '@/data/products';

interface ApplicationModalProps {
  product: Product;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function ApplicationModal({ product, onClose, onSubmit }: ApplicationModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    quantity: product.minOrder,
    company: '',
    email: '',
    phone: '',
    deliveryAddress: '',
    paymentMethod: 'card'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      onSubmit({ ...formData, product });
    }
  };

  const totalAmount = product.price * formData.quantity;
  const processingFee = formData.paymentMethod === 'digicoin' ? totalAmount * 0.015 : totalAmount * 0.025;
  const finalAmount = totalAmount + processingFee;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl max-w-3xl w-full border border-[#D4AF37] my-8">
        <div className="p-6 border-b border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Application for {product.name}</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl">&times;</button>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map(s => (
              <div key={s} className={`flex-1 h-2 rounded ${s <= step ? 'bg-[#D4AF37]' : 'bg-slate-700'}`}></div>
            ))}
          </div>
          <div className="text-slate-400 text-sm mt-2">
            Step {step}: {step === 1 ? 'Expression of Interest' : step === 2 ? 'Bid Details' : 'Payment Method'}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-white block mb-2">Company Name *</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={e => setFormData({...formData, company: e.target.value})}
                  className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-[#D4AF37] outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white block mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-[#D4AF37] outline-none"
                  />
                </div>
                <div>
                  <label className="text-white block mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-[#D4AF37] outline-none"
                  />
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-white block mb-2">Quantity ({product.unit}s) *</label>
                <input
                  type="number"
                  required
                  min={product.minOrder}
                  value={formData.quantity}
                  onChange={e => setFormData({...formData, quantity: parseInt(e.target.value)})}
                  className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-[#D4AF37] outline-none"
                />
                <p className="text-slate-400 text-sm mt-1">Min: {product.minOrder.toLocaleString()}</p>
              </div>
              <div>
                <label className="text-white block mb-2">Delivery Address *</label>
                <textarea
                  required
                  value={formData.deliveryAddress}
                  onChange={e => setFormData({...formData, deliveryAddress: e.target.value})}
                  className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-[#D4AF37] outline-none h-24"
                />
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-slate-800 p-4 rounded-lg mb-4">
                <div className="flex justify-between text-white mb-2">
                  <span>Subtotal:</span>
                  <span className="font-mono">${totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400 mb-2">
                  <span>Processing Fee ({formData.paymentMethod === 'digicoin' ? '1.5%' : '2.5%'}):</span>
                  <span className="font-mono">${processingFee.toLocaleString()}</span>
                </div>
                <div className="border-t border-slate-700 pt-2 flex justify-between text-[#D4AF37] text-xl font-bold">
                  <span>Total:</span>
                  <span className="font-mono">${finalAmount.toLocaleString()}</span>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { value: 'card', label: 'Card Payment', fee: '2.5%' },
                  { value: 'bank', label: 'Bank Transfer', fee: '2.5%' },
                  { value: 'loc', label: 'Letter of Credit', fee: '2.5%' },
                  { value: 'digicoin', label: 'DigiCoin (Save 1%!)', fee: '1.5%' }
                ].map(method => (
                  <label key={method.value} className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.paymentMethod === method.value ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-slate-700'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value={method.value}
                      checked={formData.paymentMethod === method.value}
                      onChange={e => setFormData({...formData, paymentMethod: e.target.value})}
                      className="mr-3"
                    />
                    <span className="text-white flex-1">{method.label}</span>
                    <span className="text-[#00D4FF] text-sm">{method.fee} fee</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-slate-900 font-bold py-3 rounded-lg hover:shadow-lg transition-all"
            >
              {step === 3 ? 'Submit Application' : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
