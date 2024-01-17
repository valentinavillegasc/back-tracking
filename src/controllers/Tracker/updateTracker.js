const { Tracker } = require("../../db");

const updateTrack = async (id, endPage) => {
  try {
    const track = await Tracker.findOne({ where: { id } });

    if (!track) {
      throw new Error("Track not found");
    }
    track.endPage = endPage || track.endPage;
    // Actualizar el total de páginas
    track.totalPagesRead = endPage - track.startPage + 1;

    await track.save();

    return track;
  } catch (error) {
    throw error;
  }
};

module.exports = updateTrack;
