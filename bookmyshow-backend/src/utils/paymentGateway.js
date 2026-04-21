const { v4: uuidv4 } = require("uuid");

// Fake payment gateway (Razorpay-like)
const createPayment = (amount) => {
  return {
    paymentId: uuidv4(),
    status: "PENDING",
    amount,
  };
};

// Simulate success/failure
const verifyPayment = (paymentId) => {
  const isSuccess = Math.random() > 0.2; // 80% success rate

  return {
    paymentId,
    status: isSuccess ? "SUCCESS" : "FAILED",
  };
};

module.exports = {
  createPayment,
  verifyPayment,
};