const express = require('express');
const { createEvent, getAllEvents, updateEvent, deleteEvent, registerForEvent } = require('../controllers/eventController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, createEvent);
router.get('/', getAllEvents);
router.put('/:id', verifyToken, updateEvent);
router.delete('/:id', verifyToken, deleteEvent);

router.post('/:id/register', verifyToken, registerForEvent);   // ✅ New route

module.exports = router;

