export const dynamic = "error";
import Link from "next/link";

export default function PrivacyEsPage() {
  const lastUpdated = "7 de agosto de 2025";
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-tr from-[#FFFBF4] via-[#F8F4FF] to-[#E8E1FF] py-16 md:py-24 border-b border-[#DDC7FF]/40">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-bold text-[#6153E0] mb-4">
            Aviso de Privacidad
          </h1>
          <p className="text-[#6153E0]/70">
            Última actualización: {lastUpdated}
          </p>
          <div className="mt-3">
            <Link
              href="/privacy/en"
              aria-label="View Privacy Policy in English"
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-[#6153E0] underline decoration-[#6153E0]/50 underline-offset-2 hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6153E0] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              View in English
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 prose prose-neutral">
          <p>
            En Polenia, respetamos tu privacidad y nos comprometemos a proteger
            tus datos personales. Este Aviso describe qué información
            recopilamos, cómo la usamos, y tus derechos.
          </p>

          <h2>Información que recopilamos</h2>
          <ul>
            <li>
              Datos de contacto (nombre, correo electrónico, teléfono,
              dirección).
            </li>
            <li>Información de pedidos y facturación.</li>
            <li>
              Datos técnicos (IP, tipo de dispositivo, navegador) para mejorar
              el sitio.
            </li>
          </ul>

          <h2>Cómo usamos tu información</h2>
          <ul>
            <li>Procesar pedidos y pagos.</li>
            <li>Gestionar envíos, devoluciones y soporte.</li>
            <li>Mejorar nuestros productos y la experiencia del sitio.</li>
            <li>Comunicaciones relacionadas con tu cuenta y tus compras.</li>
          </ul>

          <h2>Base legal</h2>
          <p>
            Tratamos tus datos con base en el cumplimiento del contrato,
            intereses legítimos o tu consentimiento, según corresponda.
          </p>

          <h2>Compartición de datos</h2>
          <p>
            Podemos compartir datos con proveedores que nos ayudan a operar el
            sitio (por ejemplo, pagos y envíos). Estos terceros procesan datos
            siguiendo nuestras instrucciones y con garantías adecuadas.
          </p>

          <h2>Conservación</h2>
          <p>
            Conservamos los datos solo el tiempo necesario para cumplir los
            fines descritos y obligaciones legales.
          </p>

          <h2>Tus derechos</h2>
          <ul>
            <li>Acceso, rectificación y eliminación de tus datos.</li>
            <li>Oposición o limitación del tratamiento en ciertos casos.</li>
            <li>Portabilidad de los datos cuando aplique.</li>
            <li>
              Retirar tu consentimiento cuando sea la base del tratamiento.
            </li>
          </ul>

          <h2>Seguridad</h2>
          <p>
            Implementamos medidas técnicas y organizativas razonables para
            proteger tus datos contra accesos no autorizados, pérdida o
            alteración.
          </p>

          <h2>Transferencias internacionales</h2>
          <p>
            Si transferimos datos fuera de tu país, nos aseguramos de contar con
            salvaguardas adecuadas conforme a la ley aplicable.
          </p>

          <h2>Cambios a este Aviso</h2>
          <p>
            Podemos actualizar este Aviso ocasionalmente. Publicaremos cualquier
            cambio en esta página con la fecha de actualización.
          </p>

          <h2>Contacto</h2>
          <p>
            Si tienes preguntas sobre privacidad, contáctanos mediante la página
            de Contacto o a través del correo indicado en el sitio.
          </p>
        </div>
      </section>
    </main>
  );
}
