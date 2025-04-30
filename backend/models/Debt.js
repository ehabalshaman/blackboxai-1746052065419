const mongoose = require('mongoose');

const DebtSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Beschrijving is verplicht'],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, 'Bedrag is verplicht'],
    min: [0, 'Bedrag moet positief zijn'],
  },
  debtor: {
    type: String,
    required: [true, 'Schuldenaar is verplicht'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['Melding', 'Betaald', 'Te laat'],
    default: 'Melding',
  },
  dueDate: {
    type: Date,
    required: [true, 'Vervaldatum is verplicht'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Debt', DebtSchema);
