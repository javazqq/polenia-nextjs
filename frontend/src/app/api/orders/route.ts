import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
    try{
        const result = await pool.query('SELECT * FROM orders');

        const orders = result.rows.map((order) => ({
            id: order.id,
            userId: order.user_id,
            totalPrice: Number(order.total),
            status: order.status,
            createdAt: order.created_at,
            guestName: order.guest_name || null,
            guestEmail: order.guest_email || null,
            guestAddress: order.guest_address || null,
        }));

        return NextResponse.json(orders);
    } catch (err) {
        console.error('❌ Failed to fetch orders:', err);
        return NextResponse.json({ message: 'Failed to fetch orders' }, { status: 500 });
    }
}