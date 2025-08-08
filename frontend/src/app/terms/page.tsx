import Link from "next/link";

const sections = [
  { id: "acceptance", title: "Aceptación de Términos" },
  { id: "eligibility", title: "Elegibilidad" },
  { id: "orders", title: "Productos y Pedidos" },
  { id: "pricing", title: "Precios y Pago" },
  { id: "shipping", title: "Envío y Entrega" },
  { id: "returns", title: "Devoluciones y Reembolsos" },
  { id: "accounts", title: "Cuentas y Seguridad" },
  { id: "ip", title: "Propiedad Intelectual" },
  { id: "conduct", title: "Conductas Prohibidas" },
  { id: "thirdparty", title: "Servicios de Terceros" },
  {
    id: "disclaimers",
    title: "Descargos de Responsabilidad y Limitación de Responsabilidad",
  },
  { id: "indemnification", title: "Indemnización" },
  { id: "law", title: "Ley Aplicable y Jurisdicción" },
  { id: "changes", title: "Cambios a Estos Términos" },
  { id: "contact", title: "Contáctanos" },
];

export default function TermsPageEs() {
  const lastUpdated = "7 de agosto de 2025";

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-tr from-[#FFFBF4] via-[#F8F4FF] to-[#E8E1FF] py-16 md:py-24 border-b border-[#DDC7FF]/40">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-bold text-[#6153E0] mb-4">
            Términos y Condiciones
          </h1>
          <p className="text-[#6153E0]/70">
            Última actualización: {lastUpdated}
          </p>
          <div className="mt-3">
            <Link
              href="/terms/en"
              aria-label="View Terms and Conditions in English"
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-[#6153E0] underline decoration-[#6153E0]/50 underline-offset-2 hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6153E0] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              View in English
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Tabla de contenido */}
          <nav aria-label="Tabla de contenido" className="mb-10">
            <div className="bg-[#F8F4FF] border border-[#DDC7FF]/60 rounded-2xl p-5">
              <h2 className="text-lg font-semibold text-[#6153E0] mb-3">
                Resumen
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#6153E0]">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a className="hover:underline" href={`#${s.id}`}>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="prose prose-neutral max-w-none">
            <section
              id="acceptance"
              aria-labelledby="acceptance-heading"
              className="scroll-mt-24"
            >
              <h2
                id="acceptance-heading"
                className="text-2xl font-bold text-[#6153E0]"
              >
                Aceptación de Términos
              </h2>
              <p>
                Al acceder o usar nuestro sitio web, realizar un pedido o
                interactuar de cualquier otra forma con Polenia
                (&quot;nosotros&quot;), aceptas quedar vinculado por estos
                Términos y Condiciones (los &quot;Términos&quot;). Si no estás
                de acuerdo, no debes usar nuestros servicios.
              </p>
            </section>

            <section
              id="eligibility"
              aria-labelledby="eligibility-heading"
              className="scroll-mt-24"
            >
              <h2
                id="eligibility-heading"
                className="text-2xl font-bold text-[#6153E0]"
              >
                Elegibilidad
              </h2>
              <p>
                Debes tener capacidad legal para celebrar contratos vinculantes
                en tu jurisdicción y cumplir con cualquier requisito de edad
                aplicable para comprar nuestros productos.
              </p>
            </section>

            <section
              id="orders"
              aria-labelledby="orders-heading"
              className="scroll-mt-24"
            >
              <h2
                id="orders-heading"
                className="text-2xl font-bold text-[#6153E0]"
              >
                Productos y Pedidos
              </h2>
              <ul className="list-disc pl-6">
                <li>
                  Podemos limitar o cancelar cantidades por pedido, por persona
                  o por dirección, a nuestra discreción.
                </li>
                <li>
                  Todos los pedidos están sujetos a disponibilidad y a nuestra
                  aceptación.
                </li>
                <li>
                  Nos esforzamos por mostrar la información de los productos con
                  precisión; sin embargo, pueden existir pequeñas variaciones en
                  el empaque o la apariencia.
                </li>
              </ul>
            </section>

            <section
              id="pricing"
              aria-labelledby="pricing-heading"
              className="scroll-mt-24"
            >
              <h2
                id="pricing-heading"
                className="text-2xl font-bold text-[#6153E0]"
              >
                Precios y Pago
              </h2>
              <ul className="list-disc pl-6">
                <li>
                  Los precios se muestran en moneda local y pueden cambiar sin
                  previo aviso.
                </li>
                <li>
                  Los impuestos, cargos y costos de envío aplicables se calculan
                  al finalizar la compra.
                </li>
                <li>
                  Al enviar los datos de pago, confirmas que estás autorizado a
                  usar el método de pago.
                </li>
              </ul>
            </section>

            <section
              id="shipping"
              aria-labelledby="shipping-heading"
              className="scroll-mt-24"
            >
              <h2
                id="shipping-heading"
                className="text-2xl font-bold text-[#6153E0]"
              >
                Envío y Entrega
              </h2>
              <p>
                Los plazos de entrega se proporcionan sólo como referencia y no
                constituyen garantías. El riesgo de pérdida se transfiere a ti
                al entregar el pedido al transportista, salvo que la ley
                aplicable disponga lo contrario. Para más información, consulta
                nuestra página de{" "}
                <Link href="/shipping" className="text-[#6153E0] underline">
                  Información de Envíos
                </Link>
                .
              </p>
            </section>

            <section
              id="returns"
              aria-labelledby="returns-heading"
              className="scroll-mt-24"
            >
              <h2
                id="returns-heading"
                className="text-2xl font-bold text-[#6153E0]"
              >
                Devoluciones y Reembolsos
              </h2>
              <p>
                Si no estás satisfecho con tu compra, revisa nuestra política de{" "}
                <Link href="/returns" className="text-[#6153E0] underline">
                  Devoluciones
                </Link>{" "}
                para conocer la elegibilidad, los plazos y las instrucciones.
              </p>
            </section>

            <section
              id="accounts"
              aria-labelledby="accounts-heading"
              className="scroll-mt-24"
            >
              <h2
                id="accounts-heading"
                className="text-2xl font-bold text-[#6153E0]"
              >
                Cuentas y Seguridad
              </h2>
              <ul className="list-disc pl-6">
                <li>
                  Eres responsable de mantener la confidencialidad de tus
                  credenciales.
                </li>
                <li>
                  Debes notificarnos de inmediato cualquier uso no autorizado de
                  tu cuenta.
                </li>
              </ul>
            </section>

            <section
              id="ip"
              aria-labelledby="ip-heading"
              className="scroll-mt-24"
            >
              <h2 id="ip-heading" className="text-2xl font-bold text-[#6153E0]">
                Propiedad Intelectual
              </h2>
              <p>
                Todo el contenido de este sitio, incluidas marcas, logotipos,
                gráficos y textos, es propiedad de Polenia o se utiliza bajo
                licencia y está protegido por las leyes aplicables. No puedes
                usar nuestra propiedad intelectual sin permiso previo por
                escrito.
              </p>
            </section>

            <section
              id="conduct"
              aria-labelledby="conduct-heading"
              className="scroll-mt-24"
            >
              <h2
                id="conduct-heading"
                className="text-2xl font-bold text-[#6153E0]"
              >
                Conductas Prohibidas
              </h2>
              <ul className="list-disc pl-6">
                <li>Violar cualquier ley o regulación aplicable.</li>
                <li>
                  Interferir con la seguridad, integridad o el rendimiento del
                  sitio.
                </li>
                <li>Falsificar tu identidad o afiliación.</li>
              </ul>
            </section>

            <section
              id="thirdparty"
              aria-labelledby="thirdparty-heading"
              className="scroll-mt-24"
            >
              <h2
                id="thirdparty-heading"
                className="text-2xl font-bold text-[#6153E0]"
              >
                Servicios de Terceros
              </h2>
              <p>
                Nuestros servicios pueden integrar plataformas de terceros (por
                ejemplo, pagos o envíos). Esos servicios se rigen por sus
                propios términos, y no somos responsables por su contenido ni
                sus prácticas.
              </p>
            </section>

            <section
              id="disclaimers"
              aria-labelledby="disclaimers-heading"
              className="scroll-mt-24"
            >
              <h2
                id="disclaimers-heading"
                className="text-2xl font-bold text-[#6153E0]"
              >
                Descargos de Responsabilidad y Limitación de Responsabilidad
              </h2>
              <p>
                EN LA MEDIDA MÁXIMA PERMITIDA POR LA LEY, NUESTRO SITIO WEB Y
                PRODUCTOS SE PROPORCIONAN &quot;TAL CUAL&quot; SIN GARANTÍAS DE
                NINGÚN TIPO. POLENIA NO SERÁ RESPONSABLE POR DAÑOS INDIRECTOS,
                INCIDENTALES, ESPECIALES, CONSECUENTES O PUNITIVOS DERIVADOS DE
                O RELACIONADOS CON EL USO DE LOS SERVICIOS O PRODUCTOS.
              </p>
            </section>

            <section
              id="indemnification"
              aria-labelledby="indemnification-heading"
              className="scroll-mt-24"
            >
              <h2
                id="indemnification-heading"
                className="text-2xl font-bold text-[#6153E0]"
              >
                Indemnización
              </h2>
              <p>
                Aceptas indemnizar y mantener indemne a Polenia y a nuestras
                afiliadas de cualquier reclamación, daño o gasto que surja de tu
                uso de los servicios, del incumplimiento de estos Términos o de
                la infracción de derechos de terceros.
              </p>
            </section>

            <section
              id="law"
              aria-labelledby="law-heading"
              className="scroll-mt-24"
            >
              <h2
                id="law-heading"
                className="text-2xl font-bold text-[#6153E0]"
              >
                Ley Aplicable y Jurisdicción
              </h2>
              <p>
                Estos Términos se rigen por las leyes de México, sin atender a
                sus principios sobre conflicto de leyes. Aceptas someterte a la
                jurisdicción exclusiva de los tribunales de Oaxaca, México, para
                resolver cualquier controversia.
              </p>
            </section>

            <section
              id="changes"
              aria-labelledby="changes-heading"
              className="scroll-mt-24"
            >
              <h2
                id="changes-heading"
                className="text-2xl font-bold text-[#6153E0]"
              >
                Cambios a Estos Términos
              </h2>
              <p>
                Podemos actualizar estos Términos periódicamente. Los cambios se
                publicarán en esta página con la fecha de &quot;Última
                actualización&quot; correspondiente. El uso continuado de
                nuestros servicios después de la entrada en vigor de los cambios
                implica la aceptación de los Términos revisados.
              </p>
            </section>

            <section
              id="contact"
              aria-labelledby="contact-heading"
              className="scroll-mt-24"
            >
              <h2
                id="contact-heading"
                className="text-2xl font-bold text-[#6153E0]"
              >
                Contáctanos
              </h2>
              <p>
                Si tienes preguntas sobre estos Términos, visita nuestras{" "}
                <Link href="/faq" className="text-[#6153E0] underline">
                  Preguntas Frecuentes
                </Link>{" "}
                o contáctanos a través de la página de{" "}
                <Link href="/contact" className="text-[#6153E0] underline">
                  Contacto
                </Link>
                .
              </p>
            </section>
          </div>

          <div className="mt-10">
            <Link href="#footer" className="text-[#6153E0] underline">
              Volver al pie
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
