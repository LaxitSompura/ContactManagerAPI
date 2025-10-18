// routes/contacts.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');// <-- keep require, not import

// GET /contacts  (optional filter: ?lastName=Smith)
router.get('/', async (req, res) => {
    try {
        const { lastName } = req.query;
        const filter = lastName ? { lastName } : {};
        const contacts = await Contact.find(filter).sort({ lastName: 1, firstName: 1 });
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch contacts', error: err.message });
    }
});

// POST /contacts
router.post('/', async (req, res) => {
    try {
        const saved = await new Contact(req.body).save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: 'Failed to create contact', error: err.message });
    }
});

// PUT /contacts/:_id
router.put('/:_id', async (req, res) => {
    try {
        const updated = await Contact.findByIdAndUpdate(req.params._id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updated) return res.status(404).json({ message: 'Contact not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: 'Failed to update contact', error: err.message });
    }
});

// DELETE /contacts/:_id
router.delete('/:_id', async (req, res) => {
    try {
        const deleted = await Contact.findByIdAndDelete(req.params._id);
        if (!deleted) return res.status(404).json({ message: 'Contact not found' });
        res.json({ message: 'Contact deleted', _id: req.params._id });
    } catch (err) {
        res.status(400).json({ message: 'Failed to delete contact', error: err.message });
    }
});

module.exports = router;
