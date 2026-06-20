const db = require("../config/db");

const TABLE_NAME = "reservations";
const SQL_QUERIES = {
  GET_ALL: `SELECT * FROM ${TABLE_NAME}`,
  GET_BY_ID: `SELECT * FROM ${TABLE_NAME} WHERE id = $1`,
  CREATE: `INSERT INTO ${TABLE_NAME} (customer_id, room_id, check_in_date, check_out_date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
  UPDATE: `UPDATE ${TABLE_NAME} SET customer_id = $1, room_id = $2, check_in_date = $3, check_out_date = $4, status = $5 WHERE id = $6 RETURNING *`,
  DELETE: `DELETE FROM ${TABLE_NAME} WHERE id = $1`,
};

const findAll = async () => {
  const result = await db.query(SQL_QUERIES.GET_ALL);
  return result.rows;
};

const findById = async (id) => {
  const result = await db.query(SQL_QUERIES.GET_BY_ID, [id]);
  return result.rows;
};

const create = async (payload) => {
  const result = await db.query(SQL_QUERIES.CREATE, [
    payload.customerId,
    payload.roomId,
    payload.checkInDate,
    payload.checkOutDate,
    payload.status,
  ]);
  return result.rows;
};

const update = async (id, payload) => {
  const found = await db.query(SQL_QUERIES.GET_BY_ID, [id]);
  if (!found.rows.length) {
    throw new Error("Reservation not found");
  }

  const result = await db.query(SQL_QUERIES.UPDATE, [
    payload.customerId,
    payload.roomId,
    payload.checkInDate,
    payload.checkOutDate,
    payload.status,
  ]);
  return result.rows;
};

const remove = async (id) => {
  const result = await db.query(SQL_QUERIES.DELETE, [id]);
  return result.rows;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
