const { User, Tracker } = require("../../db");
const moment = require("moment");

const createTrack = async (startPage, endPage, date, UserId) => {
  try {
    // Verifica si hay información faltante
    if (!startPage || !endPage || !date || !UserId) {
      throw new Error("Missing information");
    }
    const formattedDate = moment(date, "YYYY-MM-DD", true);
    if (!formattedDate.isValid()) {
      throw new Error("Invalid date format");
    }

    // Verifica que endPage no sea menor que startPage
    if (endPage < startPage) {
      throw new Error("Invalid page range");
    }

    const user = await User.findByPk(UserId);

    if (!user) {
      throw new Error("User not found");
    }

    // Calcula el total de páginas leídas
    const totalPagesRead = endPage - startPage + 1;

    // Crea la entrada de seguimiento de lectura en la base de datos
    const newReadingEntry = await Tracker.create({
      startPage,
      endPage,
      date,
      UserId,
      totalPagesRead,
    });

    await user.addTracker(newReadingEntry);

    return newReadingEntry;
  } catch (error) {
    throw error;
  }
};

module.exports = createTrack;
