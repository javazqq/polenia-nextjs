import { Request, Response } from "express";
import pool from "../config/db"; // Adjust the import to your DB config

// Create a new shipping record
export const createShipping = async (req: Request, res: Response) => {
  try {
    const {
      order_id,
      shipping_quotation_id,
      shipping_rate_id,
      address_from,
      address_to,
      parcels,
    } = req.body;

    console.log(
      "Creating shipping record with data:",
      JSON.stringify(
        {
          order_id,
          shipping_quotation_id,
          shipping_rate_id,
          address_from,
          address_to,
          parcels,
        },
        null,
        2
      )
    );

    const result = await pool.query(
      `INSERT INTO shipping
        (order_id, shipping_quotation_id, shipping_rate_id, address_from, address_to, parcels)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        order_id,
        shipping_quotation_id,
        shipping_rate_id,
        address_from,
        address_to,
        parcels,
      ]
    );

    console.log(
      "Shipping record created:",
      JSON.stringify(result.rows[0], null, 2)
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating shipping record:", error);
    res
      .status(500)
      .json({ error: "Error creating shipping record", details: error });
  }
};

// Get shipping info by order_id
export const getShippingByOrderId = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const result = await pool.query(
      "SELECT * FROM shipping WHERE order_id = $1",
      [orderId]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Shipping not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error fetching shipping", details: error });
  }
};

// Update shipping record (e.g., after creating Skydropx order)
export const updateShipping = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { skydropx_order_id, skydropx_tracking_number, status } = req.body;

    const result = await pool.query(
      `UPDATE shipping
       SET skydropx_order_id = $1,
           skydropx_tracking_number = $2,
           status = $3
       WHERE id = $4
       RETURNING *`,
      [skydropx_order_id, skydropx_tracking_number, status, id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Shipping not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error updating shipping", details: error });
  }
};
