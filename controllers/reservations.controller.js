const {
  findAll,
  findById,
  create,
  update,
  remove,
} = require("../models/reservations.model");

const getReservations = async (req, res) => {
  const reservations = await findAll();
  res.status(200).json({ success: true, data: reservations });
};

const getReservationById = async (req, res) => {
  const { id } = req.params;
  const reservation = await findById(id);
  res.status(200).json({ success: true, data: reservation });
};

const createReservation = async (req, res) => {
  const { customerId, roomId, checkInDate, checkOutDate, status } = req.body;
  const reservation = await create({
    customerId,
    roomId,
    checkInDate,
    checkOutDate,
    status,
  });
  res.status(201).json({ success: true, data: reservation });
};

const updateReservation = async (req, res) => {
  const { id } = req.params;
  const { customerId, roomId, checkInDate, checkOutDate, status } = req.body;
  const reservation = await update(id, {
    customerId,
    roomId,
    checkInDate,
    checkOutDate,
    status,
  });
  res.status(200).json({ success: true, data: reservation });
};

const deleteReservation = async (req, res) => {
  const { id } = req.params;
  const reservation = await remove(id);
  res.status(200).json({
    success: true,
    message: "Reservation deleted successfully",
    data: reservation,
  });
};

module.exports = {
  getReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
};
