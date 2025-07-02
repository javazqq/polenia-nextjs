"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { clearCartItems } from "@/slices/cartSlice";

export default function CobrosPage() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch = useDispatch();

  const calculateSubtotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Guest checkout state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Mexico",
  });
  const [isGuest, setIsGuest] = useState(false);
  const [guestToken, setGuestToken] = useState<string | null>(null);

  const [orderId, setOrderId] = useState<string | null>(null);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const brickController = useRef<any>(null);

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!);
  }, []);

  // Detecta si es guest checkout (puedes cambiar la lógica según tu app)
  useEffect(() => {
    setIsGuest(!user);
  }, [user]);

  // 1. Crear guestToken si es guest checkout
  const handleGuestToken = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/guest`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            address,
          }),
        }
      );
      const data = await res.json();
      setGuestToken(data.token);
      return data.token;
    } catch (err) {
      setError("Error al crear usuario invitado.");
      return null;
    }
  };

  // 2. Crear la orden cuando se presione el botón de continuar
  const handlePlaceOrder = async () => {
    setError("");
    if (isGuest && (!name || !email)) {
      setError("Por favor, completa nombre y correo electrónico.");
      return;
    }
    if (cartItems.length === 0) {
      setError("Tu carrito está vacío.");
      return;
    }
    setLoading(true);

    let token = guestToken;
    if (isGuest && !guestToken) {
      token = await handleGuestToken();
      if (!token) {
        setLoading(false);
        return;
      }
    }

    try {
      // Unificar nombres de campos
      console.log("Enviando orden:", {
        items: cartItems,
        total: calculateSubtotal(),
        guest_name: isGuest ? name : undefined,
        guest_email: isGuest ? email : undefined,
        guest_address: isGuest ? address : undefined,
        guestToken: isGuest ? token : undefined,
      });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems,
          total: calculateSubtotal(),
          guest_name: isGuest ? name : undefined,
          guest_email: isGuest ? email : undefined,
          guest_address: isGuest ? address : undefined,
          guestToken: isGuest ? token : undefined,
        }),
      });
      const data = await res.json();
      console.log("Respuesta de creación de orden:", data);
      setOrderId(data.orderId);
    } catch (err) {
      setError("Error al crear la orden.");
      console.error("Error al crear la orden:", err);
    } finally {
      setLoading(false);
    }
  };

  // 3. Crear la preferencia cuando ya tengas orderId
  useEffect(() => {
    if (!orderId) return;
    // Enviar datos correctos a create-preference
    const payload = {
      cartItems,
      userName: isGuest ? name : user?.name,
      userEmail: isGuest ? email : user?.email,
      orderId,
      guestToken: isGuest ? guestToken : undefined,
      shipping_price: 0, // O el valor real si tienes envío
    };
    console.log("Payload para create-preference:", payload);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-preference`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Respuesta de preferencia:", data);
        setPreferenceId(data.id);
      })
      .catch((err) => {
        console.error("Error al crear preferencia:", err);
      });
  }, [orderId, cartItems, isGuest, name, email, guestToken, user]);

  // 4. Renderizar el Payment Brick cuando tengas preferenceId
  useEffect(() => {
    if (!preferenceId) return;
    console.log("Renderizando Payment Brick con preferenceId:", preferenceId);
    const renderBrick = async () => {
      // @ts-ignore
      const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY, {
        locale: "es",
      });
      const bricksBuilder = mp.bricks();

      brickController.current = await bricksBuilder.create(
        "payment",
        "paymentBrick_container",
        {
          initialization: {
            amount: cartItems.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            ),
            preferenceId,
            payer: {
              firstName: isGuest
                ? name.split(" ")[0]
                : user?.name?.split(" ")[0] || "",
              lastName: isGuest
                ? name.split(" ").slice(1).join(" ")
                : user?.name?.split(" ").slice(1).join(" ") || "",
              email: isGuest ? email : user?.email || "",
            },
          },
          customization: {
            visual: {
              style: { theme: "default" },
            },
            paymentMethods: {
              creditCard: "all",
              debitCard: "all",
              bankTransfer: "all",
              atm: "all",
              wallet_purchase: "all",
              maxInstallments: 1,
            },
          },
          callbacks: {
            onReady: () => {
              console.log("Payment Brick listo");
            },
            onSubmit: ({ selectedPaymentMethod, formData }: any) => {
              console.log("Enviando pago:", { ...formData, orderId });
              return new Promise((resolve, reject) => {
                fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}/api/payment/process_payment`,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...formData, orderId }),
                  }
                )
                  .then((response) => {
                    console.log("Respuesta de /process_payment:", response);
                    return response.json();
                  })
                  .then((response) => {
                    // Limpiar carrito solo si el pago fue exitoso
                    if (response && !response.error) {
                      dispatch(clearCartItems());
                      sessionStorage.setItem(
                        "order",
                        JSON.stringify({
                          orderId,
                          preferenceId,
                          paymentResult: response,
                        })
                      );
                      setSuccess(true);
                      console.log("Pago exitoso:", response);
                    } else {
                      setError(response?.error || "Error al procesar el pago");
                      console.error("Error en pago:", response);
                    }
                    return response;
                  })
                  .catch((error) => {
                    console.error("Error en /process_payment:", error);
                    reject(error);
                  });
              });
            },
            onError: (error: any) => {
              console.error("Error en Payment Brick:", error);
            },
          },
        }
      );
    };

    renderBrick();

    return () => {
      // @ts-ignore
      if (window.paymentBrickController) {
        window.paymentBrickController.unmount();
      }
    };
  }, [preferenceId, cartItems, user, name, email, isGuest, orderId, dispatch]);

  // Mejorar diseño: resumen de compra
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFFBF4] via-[#DDC7FF] to-[#6153E0] relative overflow-hidden pt-20">
      <Script
        src="https://sdk.mercadopago.com/js/v2"
        strategy="afterInteractive"
      />
      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Resumen de compra
        </h2>
        <ul className="mb-4 divide-y">
          {cartItems.map((item, idx) => (
            <li key={idx} className="py-2 flex justify-between">
              <span>
                {item.name} x{item.quantity}
              </span>
              <span>${item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-semibold mb-4">
          <span>Total:</span>
          <span>${subtotal}</span>
        </div>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && (
          <div className="text-green-600 mb-2">¡Pago realizado con éxito!</div>
        )}
        {isGuest && (
          <form className="mb-4">
            <input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />
          </form>
        )}
        {!preferenceId && (
          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            {loading ? "Procesando..." : "Continuar con el pago"}
          </button>
        )}
        <div id="paymentBrick_container" />
      </div>
    </main>
  );
}
