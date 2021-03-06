const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  billDate: {
    type: String,
    required: true
  },
  clientName: {
    type: String,
    required: true
  },
  billNum: {
    type: String,
    required: true
  },
  agency: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  ORNumber: {
    type: String,
    required: false
  },
  paymentDate: {
    type: String,
    required: false
  },
  collected: {
    type: String,
    required: false
  },
  uncollected: {
    type: String,
    required: false
  },
});

const Bill = mongoose.model('Bill', BillSchema);

module.exports = Bill;
