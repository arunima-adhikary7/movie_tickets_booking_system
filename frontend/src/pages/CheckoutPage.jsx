import React, { useState, useEffect } from "react";
import { CreditCard, Smartphone, Landmark, Wallet, Ticket, Info, ChevronDown } from "lucide-react";

export default function CheckoutPage() {
  const [timeLeft, setTimeLeft] = useState(600); // 10-minute countdown
  const [selectedMethod, setSelectedMethod] = useState("upi");

  // Format time (MM:SS)
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen bg-[#F2F5F9] font-sans text-[#333]">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 p-1 rounded">
              <Ticket className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-[#333545] tracking-tighter">bookmyshow</h1>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Time Left</p>
            <p className="text-lg font-mono font-bold text-red-600 leading-none">{formatTime(timeLeft)}</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Side: Payment Selection */}
          <div className="flex-1 space-y-6">
            <section className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-yellow-50 p-3 flex items-center gap-3 border-b border-yellow-100">
                <Info className="w-4 h-4 text-yellow-700" />
                <p className="text-xs text-yellow-800">
                  Tickets once booked <b>cannot be cancelled</b> or exchanged.
                </p>
              </div>

              <div className="p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                  Unlock Offers or Apply Promocodes
                </h2>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 flex justify-between items-center hover:border-red-400 cursor-pointer transition-colors">
                  <p className="text-sm text-gray-500 italic">Select an offer to save more</p>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                Payment Options
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 border rounded-lg">
                <PaymentTab 
                  active={selectedMethod === 'upi'} 
                  onClick={() => setSelectedMethod('upi')}
                  icon={<Smartphone className="w-5 h-5" />} 
                  label="UPI" 
                />
                <PaymentTab 
                  active={selectedMethod === 'card'} 
                  onClick={() => setSelectedMethod('card')}
                  icon={<CreditCard className="w-5 h-5" />} 
                  label="Card" 
                />
                <PaymentTab 
                  active={selectedMethod === 'net'} 
                  onClick={() => setSelectedMethod('net')}
                  icon={<Landmark className="w-5 h-5" />} 
                  label="Net Banking" 
                />
                <PaymentTab 
                  active={selectedMethod === 'wallet'} 
                  onClick={() => setSelectedMethod('wallet')}
                  icon={<Wallet className="w-5 h-5" />} 
                  label="Wallets" 
                />
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                {selectedMethod === 'upi' && (
                  <div className="space-y-4">
                    <p className="text-sm font-semibold">Pay via UPI ID</p>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="username@bank" 
                        className="flex-1 border rounded px-3 py-2 focus:ring-1 focus:ring-red-500 outline-none"
                      />
                      <button className="bg-red-500 text-white px-6 py-2 rounded font-medium text-sm">Verify</button>
                    </div>
                  </div>
                )}
                {selectedMethod === 'card' && <p className="text-sm text-gray-500">Card details input would go here...</p>}
              </div>
            </section>
          </div>

          {/* Right Side: Order Summary */}
          <aside className="w-full lg:w-[380px]">
            <div className="bg-white rounded-lg shadow-sm sticky top-24">
              <div className="p-5 border-b border-dashed">
                <h2 className="uppercase text-xs font-bold text-red-600 tracking-widest mb-3">Order Summary</h2>
                <div className="flex gap-4">
                  <div className="relative">
                    <img 
                      src="https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg" 
                      alt="movie" 
                      className="w-16 h-24 object-cover rounded shadow-md"
                    />
                    <span className="absolute bottom-1 right-1 bg-black/60 text-[10px] text-white px-1 rounded">UA</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg leading-tight">Avengers: Endgame</h3>
                    <p className="text-xs text-gray-500 mt-1">Hindi, 2D</p>
                    <p className="text-xs text-gray-600">PVR: City Mall, Mumbai</p>
                    <p className="text-xs font-semibold mt-1">SCREEN 3 | Gold - A1, A2</p>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ticket Price (2 Tickets)</span>
                  <span className="font-medium">₹400.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-1">
                    Convenience Fees <Info className="w-3 h-3 cursor-help" />
                  </span>
                  <span className="font-medium">₹56.40</span>
                </div>
                <div className="pt-3 border-t border-dashed mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-700">Amount Payable</span>
                    <span className="font-black text-xl">₹456.40</span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-blue-50 rounded-b-lg">
                <button className="w-full bg-[#F84464] text-white py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-[#d63955] transition-transform active:scale-[0.98]">
                  Proceed to Pay
                </button>
                <p className="text-[10px] text-center mt-3 text-gray-400 leading-tight">
                  By clicking "Proceed to Pay", you agree to the Terms & Conditions.
                </p>
              </div>
            </div>
          </aside>

        </div>
      </main>

      <footer className="mt-12 py-8 bg-white border-t text-center">
        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">100% SECURE PAYMENT</p>
      </footer>
    </div>
  );
}

// Sub-component for Payment Tabs
function PaymentTab({ active, icon, label, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 gap-2 border-r last:border-r-0 transition-all
      ${active ? 'bg-red-50 text-red-600 border-b-2 border-b-red-600' : 'text-gray-500 hover:bg-gray-50'}`}
    >
      {icon}
      <span className="text-[10px] font-bold uppercase">{label}</span>
    </button>
  );
}