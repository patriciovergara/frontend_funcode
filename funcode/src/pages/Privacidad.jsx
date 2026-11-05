import LegalLayout, {
  LegalContact,
  LegalSection,
} from "../components/LegalLayout";

function Privacidad() {
  return (
    <LegalLayout
      title="Política de privacidad"
      introduction="Información sobre el tratamiento de datos personales al utilizar Funcode y solicitar nuestros servicios."
    >
      <LegalSection
        id="responsable"
        title="1. Responsable del tratamiento"
      >
        <p>
          La persona natural o jurídica identificada a continuación
          es responsable de las decisiones sobre el tratamiento de
          datos personales realizado a través de Funcode.
        </p>

        <LegalContact />
      </LegalSection>

      <LegalSection id="ambito" title="2. Alcance de esta política">
        <p>
          Esta política comprende los datos tratados para administrar
          cuentas, atender solicitudes, preparar cotizaciones y
          gestionar la relación con clientes de Funcode.
        </p>

        <p>
          Si un proyecto requiere que Funcode acceda a bases de datos
          del cliente o de terceros, las instrucciones, medidas de
          seguridad y responsabilidades deberán establecerse
          adicionalmente por escrito.
        </p>
      </LegalSection>

      <LegalSection id="categorias" title="3. Datos que podemos tratar">
        <ul>
          <li>
            Identificación y contacto: nombre, correo electrónico y
            teléfono, cuando sean solicitados y proporcionados.
          </li>
          <li>
            Cuenta: identificador de usuario, credenciales de
            autenticación y antecedentes necesarios para administrar
            el acceso.
          </li>
          <li>
            Solicitudes: servicio de interés, descripción del
            proyecto y comunicaciones relacionadas.
          </li>
          <li>
            Contratación y facturación: datos necesarios para
            documentar el servicio y cumplir obligaciones legales,
            cuando corresponda.
          </li>
          <li>
            Datos técnicos: registros de acceso y errores que la
            infraestructura efectivamente genere para operar y
            proteger el sitio.
          </li>
        </ul>

        <p>
          Cada formulario deberá identificar los campos obligatorios.
          Si no se proporcionan los datos necesarios, podría no ser
          posible crear la cuenta o atender la solicitud.
        </p>

        <p>
          No envíes datos sensibles ni datos personales de terceros
          que no sean necesarios o para cuyo tratamiento no cuentes
          con autorización.
        </p>
      </LegalSection>

      <LegalSection id="finalidades" title="4. Finalidades">
        <ul>
          <li>Crear y administrar cuentas de usuario.</li>
          <li>Responder consultas y solicitudes de cotización.</li>
          <li>Preparar, coordinar y ejecutar servicios contratados.</li>
          <li>Gestionar soporte, reclamos y comunicaciones del servicio.</li>
          <li>Cumplir obligaciones legales y de documentación.</li>
          <li>Prevenir accesos indebidos y resolver fallos técnicos.</li>
        </ul>

        <p>
          No utilizaremos los datos para finalidades incompatibles
          con las informadas sin contar con la autorización o
          habilitación legal que corresponda.
        </p>
      </LegalSection>

      <LegalSection id="autorizacion" title="5. Autorización y comunicaciones">
        <p>
          El tratamiento se realizará cuando esté autorizado por la
          legislación aplicable o exista consentimiento expreso,
          informado y registrado por escrito, incluido el soporte
          electrónico cuando corresponda.
        </p>

        <p>
          Cuando solicitemos consentimiento, informaremos su
          finalidad. La navegación por el sitio, por sí sola, no
          constituye autorización general para tratar datos personales.
        </p>

        <p>
          El consentimiento podrá revocarse por escrito mediante el
          contacto indicado, sin efecto retroactivo y sin perjuicio
          de los tratamientos que deban mantenerse por obligación
          legal.
        </p>

        <p>
          La aceptación de una cotización o la creación de una cuenta
          no implica suscribirse a publicidad. Cualquier envío
          promocional deberá contar con la habilitación correspondiente
          y permitir solicitar su suspensión.
        </p>
      </LegalSection>

      <LegalSection id="destinatarios" title="6. Acceso y destinatarios">
        <p>
          El acceso a los datos deberá limitarse a quienes lo
          necesiten para las finalidades informadas y estén sujetos
          a obligaciones de confidencialidad.
        </p>

        <p>
          Cuando se utilicen proveedores de alojamiento, bases de
          datos, correo u otros servicios técnicos que traten datos
          por cuenta de Funcode, se deberán establecer por escrito
          las condiciones del encargo y restringir el uso a las
          instrucciones autorizadas.
        </p>

        <p>
          No se autoriza la venta de datos personales ni su entrega
          a terceros para publicidad propia de estos mediante esta
          política. Las comunicaciones exigidas por ley o por una
          autoridad competente se atenderán dentro de sus atribuciones.
        </p>

        <p>
          Antes de habilitar un proveedor que implique alojamiento o
          acceso desde el extranjero, se deberá informar su
          intervención y verificar las condiciones legales aplicables.
        </p>
      </LegalSection>

      <LegalSection id="conservacion" title="7. Conservación">
        <p>
          Los datos se conservarán mientras exista una finalidad
          informada y un fundamento legal para su tratamiento.
          Posteriormente deberán eliminarse o anonimizarse, salvo
          que corresponda conservarlos por una obligación legal o
          para atender responsabilidades pendientes.
        </p>

        <p>
          Los datos erróneos deberán corregirse y los datos caducos o
          sin fundamento de almacenamiento deberán eliminarse o
          bloquearse según corresponda.
        </p>

        <p>
          Solicitar el cierre de una cuenta no obliga a eliminar
          documentos que deban conservarse legalmente, pero tampoco
          autoriza mantener indefinidamente todos los datos.
        </p>
      </LegalSection>

      <LegalSection id="seguridad" title="8. Seguridad y confidencialidad">
        <p>
          Funcode debe proteger los datos con la debida diligencia y
          aplicar medidas técnicas y organizativas acordes con los
          riesgos del tratamiento, incluyendo el control de accesos
          y la confidencialidad.
        </p>

        <p>
          Ningún sistema puede garantizar riesgo cero. Esta
          circunstancia no excluye la responsabilidad que corresponda
          por incumplir las obligaciones de protección.
        </p>

        <p>
          No solicitaremos contraseñas personales por correo para
          atender solicitudes de privacidad.
        </p>
      </LegalSection>

      <LegalSection id="derechos" title="9. Derechos sobre tus datos">
        <p>
          Conforme a la normativa aplicable, puedes solicitar:
        </p>

        <ul>
          <li>
            Información sobre tus datos, su procedencia,
            destinatarios y propósito de almacenamiento.
          </li>
          <li>
            La modificación de datos erróneos, inexactos,
            equívocos o incompletos.
          </li>
          <li>
            La eliminación de datos caducos o cuyo almacenamiento
            carezca de fundamento legal, salvo excepciones legales.
          </li>
          <li>
            El bloqueo de datos en los casos que correspondan.
          </li>
          <li>
            La suspensión del uso de tus datos para comunicaciones
            comerciales y la revocación de autorizaciones.
          </li>
        </ul>

        <p>
          El ejercicio de estos derechos es gratuito en los términos
          legales y no queda condicionado a contratar servicios.
        </p>
      </LegalSection>

      <LegalSection id="solicitud" title="10. Cómo ejercer tus derechos">
        <p>
          Escribe al correo indicado en la identificación del
          responsable, describiendo tu solicitud y el correo asociado
          a tu cuenta, si corresponde.
        </p>

        <p>
          Podremos solicitar únicamente antecedentes proporcionales
          para verificar tu identidad o representación. No envíes
          contraseñas ni documentos de identidad completos sin que
          se haya justificado su necesidad y definido un canal seguro.
        </p>

        <p>
          Las solicitudes se atenderán dentro de los plazos legales.
          Si no obtienes respuesta o se rechaza improcedentemente tu
          solicitud, podrás ejercer las acciones previstas en la
          legislación vigente.
        </p>
      </LegalSection>

      <LegalSection
        id="almacenamiento"
        title="11. Cookies y almacenamiento del navegador"
      >
        <p>
          Las tecnologías de sesión o almacenamiento que utilice el
          sitio deberán limitarse a sus funciones informadas, como
          mantener la autenticación y permitir operaciones solicitadas
          por el usuario.
        </p>

        <p>
          Esta política no autoriza por sí sola el uso de tecnologías
          publicitarias o de seguimiento no necesarias. Antes de
          incorporarlas se deberá informar qué datos recogen, sus
          finalidades, proveedores y duración, y obtener la
          autorización que corresponda.
        </p>

        <p>
          Puedes gestionar el almacenamiento desde tu navegador.
          Eliminar los datos necesarios para la sesión puede cerrar
          tu acceso y requerir que vuelvas a identificarte.
        </p>
      </LegalSection>

      <LegalSection id="actualizaciones" title="12. Actualizaciones">
        <p>
          Las modificaciones se publicarán con su fecha y versión.
          Si cambia una finalidad o se requiere una nueva autorización,
          no bastará con modificar silenciosamente este documento.
        </p>

        <p>
          Esta versión está preparada conforme al régimen vigente
          al 4 de noviembre de 2026. La Ley N.º 21.719 entra en vigor
          el 1 de diciembre de 2026, por lo que el documento y los
          procesos de tratamiento deberán revisarse para esa fecha.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

export default Privacidad;