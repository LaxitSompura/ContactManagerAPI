// app.js
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const contactsRouter = require('./routes/contacts');

const app = express();

// Middlewares
app.use(logger('dev'));
app.use(cors()); // Allow all origins for simplicity (adjust for prod)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/contacts', contactsRouter);

// Health check
app.get('/', (req, res) => {
    res.json({ status: 'OK', service: 'Contact Manager API' });
});

// 404 handler
app.use(function (req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message || 'Server error',
        // stack is omitted by default for security; uncomment for debugging
        // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
});

module.exports = app;
