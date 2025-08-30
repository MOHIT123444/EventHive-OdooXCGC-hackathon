// src/models/Role.js
// Optional: store role metadata/permissions (basic example)

const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., admin, manager
  permissions: [{ type: String }], // e.g., ['create:event','scan:ticket']
});

module.exports = mongoose.model('Role', roleSchema);
