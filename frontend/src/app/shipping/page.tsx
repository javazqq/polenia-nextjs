"use client";

import { useState } from "react";

export default function ShippingPage() {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "MX",
  });
  const [loading, setLoading] = useState(false);
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [shippingDetails, setShippingDetails] = useState<any | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShippingCost(null);

    try {
      // Ajusta los datos del paquete según tus productos reales
      const quoteData = {
        quotation: {
          order_id: "test-123", // Puedes poner un ID real si lo tienes
          address_from: {
            country_code: "MX",
            postal_code: "68258",
            area_level1: "Oaxaca",
            area_level2: "San Pablo Etla",
            area_level3: "Centro", // Ajusta la colonia real
          },
          address_to: {
            country_code: "MX",
            postal_code: address.zipCode,
            area_level1: address.state,
            area_level2: address.city,
            area_level3: "Centro", // Ajusta la colonia real
          },
          parcels: [
            {
              length: 10,
              width: 10,
              height: 10,
              weight: 1,
            },
          ],
          requested_carriers: ["fedex"], // O la paquetería que prefieras
        },
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/shipping/quote`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(quoteData),
        }
      );
      const data = await res.json();
      console.log("Respuesta completa de Skydropx:", data); // <-- LOG

      // Busca la tarifa exitosa de Fedex en rates
      const preferred = data.rates?.find(
        (q: any) => q.success && q.provider_name === "fedex"
      );
      console.log("Cotización seleccionada:", preferred); // <-- LOG
      if (preferred) {
        setShippingCost(Number(preferred.total));
        setShippingDetails({
          provider: preferred.provider_name, // <-- This is the provider (e.g., 'fedex')
          service: preferred.provider_service_name,
          days: preferred.days,
          currency: preferred.currency_code,
          cost: preferred.cost,
          total: preferred.total,
          plan_type: preferred.plan_type,
        });
      } else {
        setError("No se encontró cotización para la paquetería preferida.");
        setShippingDetails(null);
      }
    } catch (err) {
      setError("Error al cotizar el envío.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto py-10 pt-30">
      <h1 className="text-2xl font-bold mb-4">Dirección de Envío</h1>
      <form onSubmit={handleQuote} className="space-y-4">
        <input
          name="street"
          placeholder="Calle"
          value={address.street}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          name="city"
          placeholder="Ciudad"
          value={address.city}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          name="state"
          placeholder="Estado"
          value={address.state}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          name="zipCode"
          placeholder="Código Postal"
          value={address.zipCode}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Cotizando..." : "Cotizar Envío"}
        </button>
      </form>
      {shippingCost !== null && (
        <div className="mt-4 text-lg">
          <strong>Costo de envío:</strong> ${shippingCost.toFixed(2)} MXN
        </div>
      )}
      {shippingDetails && (
        <div className="mt-2 text-base bg-gray-100 p-3 rounded">
          <h2 className="text-lg font-semibold mb-2">Detalles del Envío</h2>
          <div>
            <strong>Provider:</strong> {shippingDetails.provider}
          </div>
          <div>
            <strong>Servicio:</strong> {shippingDetails.service}
          </div>
          <div>
            <strong>Días estimados:</strong> {shippingDetails.days}
          </div>
          <div>
            <strong>Moneda:</strong> {shippingDetails.currency}
          </div>
          <div>
            <strong>Costo base:</strong> $
            {Number(shippingDetails.cost).toFixed(2)}
          </div>
          <div>
            <strong>Total:</strong> ${Number(shippingDetails.total).toFixed(2)}
          </div>
        </div>
      )}
      {error && <div className="mt-4 text-red-600">{error}</div>}
    </main>
  );
}
