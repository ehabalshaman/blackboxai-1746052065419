const express = require('express');
const router = express.Router();
const Debt = require('../models/Debt');

// Validation middleware
function validateDebt(req, res, next) {
  const { description, amount, debtor, status, dueDate } = req.body;
  if (!description || !amount || !debtor || !dueDate) {
    return res.status(400).json({ error: 'Alle velden behalve status zijn verplicht' });
  }
  if (amount < 0) {
    return res.status(400).json({ error: 'Bedrag moet positief zijn' });
  }
  if (status && !['Melding', 'Betaald', 'Te laat'].includes(status)) {
    return res.status(400).json({ error: 'Ongeldige status' });
  }
  next();
}

// Get all debts with optional filtering and search
router.get('/', async (req, res) => {
  try {
    const { status, search } = req.query;
    let filter = {};
    if (status) {
      filter.status = status;
    }
    if (search) {
      filter.$or = [
        { description: { $regex: search, $options: 'i' } },
        { debtor: { $regex: search, $options: 'i' } },
      ];
    }
    const debts = await Debt.find(filter).sort({ dueDate: 1 });
    res.json(debts);
  } catch (err) {
    res.status(500).json({ error: 'Serverfout' });
  }
});

// Get a single debt by ID
router.get('/:id', async (req, res) => {
  try {
    const debt = await Debt.findById(req.params.id);
    if (!debt) {
      return res.status(404).json({ error: 'Schuld niet gevonden' });
    }
    res.json(debt);
  } catch (err) {
    res.status(500).json({ error: 'Serverfout' });
  }
});

// Create a new debt
router.post('/', validateDebt, async (req, res) => {
  try {
    const newDebt = new Debt(req.body);
    const savedDebt = await newDebt.save();
    res.status(201).json(savedDebt);
  } catch (err) {
    res.status(500).json({ error: 'Serverfout' });
  }
});

// Update a debt by ID
router.put('/:id', validateDebt, async (req, res) => {
  try {
    const updatedDebt = await Debt.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedDebt) {
      return res.status(404).json({ error: 'Schuld niet gevonden' });
    }
    res.json(updatedDebt);
  } catch (err) {
    res.status(500).json({ error: 'Serverfout' });
  }
});

// Delete a debt by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedDebt = await Debt.findByIdAndDelete(req.params.id);
    if (!deletedDebt) {
      return res.status(404).json({ error: 'Schuld niet gevonden' });
    }
    res.json({ message: 'Schuld verwijderd' });
  } catch (err) {
    res.status(500).json({ error: 'Serverfout' });
  }
});

module.exports = router;
