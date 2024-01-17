const trackerRouter = require("express").Router();
const createTrack = require("../controllers/Tracker/createTracker");
const deleteTracker = require("../controllers/Tracker/deleteTracker");
const updateTrack = require("../controllers/Tracker/updateTracker");

//!Create track
trackerRouter.post("/", async (req, res) => {
  const { startPage, endPage, date, UserId } = req.body;

  try {
    const newTrack = await createTrack(startPage, endPage, date, UserId);

    res.status(200).json({ message: "created", data: newTrack });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//!Delete track
trackerRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const track = await deleteTracker(id);

    res.status(200).json({ message: "Deleted", data: track });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//!Update end page
trackerRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { endPage } = req.body;
  try {
    const newPage = await updateTrack(id, endPage);

    res.status(200).json({ message: "Updated", data: newPage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = trackerRouter;
