// src/utils/otpService.js
// Very simple OTP generator + in-memory store (replace with Redis in prod)

const otps = new Map(); // key -> { otp, expiresAt }

function generateOTP(key, ttlSeconds = 300) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otps.set(key, { otp, expiresAt: Date.now() + ttlSeconds * 1000 });
  return otp;
}

function verifyOTP(key, otp) {
  const entry = otps.get(key);
  if (!entry) return false;
  if (Date.now() > entry.expiresAt) {
    otps.delete(key);
    return false;
  }
  const ok = entry.otp === otp;
  if (ok) otps.delete(key);
  return ok;
}

module.exports = { generateOTP, verifyOTP };
