const { Tracker } = require("../../db");

const deleteTracker = async (id) => {
  try {
    const track = await Tracker.destroy({ where: { id } });

    if (!track) throw new Error("Track not found");

    return track;
  } catch (error) {
    throw error;
  }
};

module.exports = deleteTracker;
