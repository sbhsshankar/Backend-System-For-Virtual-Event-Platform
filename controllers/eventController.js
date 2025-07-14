const sendEmail = require('../utils/sendEmail');

let events = [];
let eventId = 1;

const createEvent = (req, res) => {
  if (req.user.role !== 'organizer') {
    return res.status(403).json({ message: 'Only organizers can create events' });
  }

  const { name, date, time, description } = req.body;

  const event = {
    id: eventId++,
    name,
    date,
    time,
    description,
    organizerId: req.user.id,
    participants: []
  };

  events.push(event);

  res.status(201).json({ message: 'Event created', event });
};

const getAllEvents = (req, res) => {
  res.json(events);
};

const updateEvent = (req, res) => {
  const event = events.find(e => e.id == req.params.id);

  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  if (event.organizerId !== req.user.id) {
    return res.status(403).json({ message: 'You can only update your events' });
  }

  const { name, date, time, description } = req.body;

  event.name = name || event.name;
  event.date = date || event.date;
  event.time = time || event.time;
  event.description = description || event.description;

  res.json({ message: 'Event updated', event });
};

const deleteEvent = (req, res) => {
  const eventIndex = events.findIndex(e => e.id == req.params.id);

  if (eventIndex === -1) {
    return res.status(404).json({ message: 'Event not found' });
  }

  if (events[eventIndex].organizerId !== req.user.id) {
    return res.status(403).json({ message: 'You can only delete your events' });
  }

  events.splice(eventIndex, 1);

  res.json({ message: 'Event deleted' });
};

// ✅ Final version of registerForEvent with email
const registerForEvent = async (req, res) => {
    const event = events.find(e => e.id == req.params.id);

    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }

    if (event.participants.includes(req.user.id)) {
        return res.status(400).json({ message: 'Already registered for this event' });
    }

    event.participants.push(req.user.id);

    // Send confirmation email
    try {
        await sendEmail(
            req.user.email,
            `Registration Confirmed: ${event.name}`,
            `Hi ${req.user.username},\n\nYou have successfully registered for ${event.name} on ${event.date} at ${event.time}.\n\nThank you!`
        );
    } catch (err) {
        console.error('Email sending failed:', err.message);
    }

    res.json({ message: 'Registered successfully. Confirmation email sent.', event });
};

module.exports = { createEvent, getAllEvents, updateEvent, deleteEvent, registerForEvent };
