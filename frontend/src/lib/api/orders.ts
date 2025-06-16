import { Order } from "@/types/order";

export async function fetchOrders(): Promise<Order[]> {
    const res = await fetch('/api/orders');
    if (!res.ok) {
        throw new Error('Failed to fetch orders');
    }
    return res.json();
}
export async function fetchOrderById(id: string, token?: string): Promise<Order> {
    // Accept token as parameter instead of localStorage
    console.log('JWT Token:', token); 
    
    if (!token) {
        throw new Error('No authentication token provided');
    }
    
    const res = await fetch(`/api/orders/${id}`, {
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    console.log('Response status:', res.status);

    if (!res.ok) {
        throw new Error(`Failed to fetch order with id ${id}`);
    }
    return res.json();
}

