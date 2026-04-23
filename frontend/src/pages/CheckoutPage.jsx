import React, { useState, useEffect } from "react";
import { CreditCard, Smartphone, Landmark, Wallet, Ticket } from "lucide-react";
import { useParams } from "react-router-dom";

export default function CheckoutPage() {
  const { id } = useParams();

  const [timeLeft, setTimeLeft] = useState(600);
  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // TIMER
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // FETCH DATA
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/bookings/summary/${id}`
        );

        const data = await res.json();
        console.log("API RESPONSE 👉", data);

        setOrder(data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };

    if (id) fetchOrder();
  }, [id]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  if (!order) {
    return <h2 style={{ textAlign: "center" }}>No Order Found</h2>;
  }

  // ✅ SAFE VALUES (FIXED CRASHES)
  const seats = order.seats || [];
  const ticketPrice = order.ticketPrice || 0;
  const convenienceFee = order.convenienceFee || 0;
  const totalAmount = ticketPrice + convenienceFee;

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between bg-white p-4 rounded shadow">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Ticket /> BookMyShow
        </h1>
        <span className="text-red-600 font-bold">{formatTime(timeLeft)}</span>
      </div>

      <div className="flex gap-6 mt-6">

        {/* LEFT */}
        <div className="flex-1 bg-white p-6 rounded shadow">

          <h2 className="font-bold mb-4">Payment</h2>

          <div className="grid grid-cols-4 border">
            <PaymentTab active={selectedMethod==="upi"} onClick={()=>setSelectedMethod("upi")} icon={<Smartphone/>} label="UPI"/>
            <PaymentTab active={selectedMethod==="card"} onClick={()=>setSelectedMethod("card")} icon={<CreditCard/>} label="Card"/>
            <PaymentTab active={selectedMethod==="net"} onClick={()=>setSelectedMethod("net")} icon={<Landmark/>} label="Net"/>
            <PaymentTab active={selectedMethod==="wallet"} onClick={()=>setSelectedMethod("wallet")} icon={<Wallet/>} label="Wallet"/>
          </div>

          <div className="mt-4">
            {selectedMethod === "upi" && (
              <input
                placeholder="Enter UPI ID"
                className="border p-2 w-full"
              />
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-[300px] bg-white p-6 rounded shadow">

          <h2 className="font-bold text-red-500 mb-3">Order Summary</h2>

          <h3 className="font-bold">{order.movie}</h3>
          <p>{order.theatre}</p>
          <p>{order.screen}</p>

          {/* ✅ SAFE JOIN */}
          <p>{seats.length > 0 ? seats.join(", ") : "No seats"}</p>

          <div className="mt-4 space-y-2">

            <div className="flex justify-between">
              <span>Ticket Price</span>
              <span>₹{ticketPrice}</span>
            </div>

            <div className="flex justify-between">
              <span>Convenience Fee</span>
              <span>₹{convenienceFee}</span>
            </div>

            <div className="flex justify-between font-bold border-t pt-2">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>

          </div>

          <button className="w-full bg-red-500 text-white mt-4 py-2 rounded">
            Pay Now
          </button>

        </div>
      </div>
    </div>
  );
}

function PaymentTab({ active, icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`p-3 ${active ? "bg-red-200" : ""}`}
    >
      {icon}
      <p className="text-xs">{label}</p>
    </button>
  );
}