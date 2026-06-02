import Event from "../models/Event.js";

/* CREATE EVENT */
export const createEvent = async (req, res) => {
  try {
    const event = await Event.create({
      creator: req.user.id,
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      location: req.body.location,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      category: req.body.category,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/* GET EVENTS */
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("creator", "name avatar")
      .sort({ startDate: 1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/* GET EVENT */
export const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("creator", "name avatar");

    if (!event) {
      return res.status(404).json({
        error: "Événement introuvable",
      });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/* JOIN EVENT */
export const joinEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        error: "Événement introuvable",
      });
    }

    const alreadyJoined = event.attendees.some(
      (id) => id.toString() === req.user.id
    );

    if (!alreadyJoined) {
      event.attendees.push(req.user.id);
      await event.save();
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/* DELETE EVENT */
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        error: "Événement introuvable",
      });
    }

    if (event.creator.toString() !== req.user.id) {
      return res.status(403).json({
        error: "Accès refusé",
      });
    }

    await event.deleteOne();

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
