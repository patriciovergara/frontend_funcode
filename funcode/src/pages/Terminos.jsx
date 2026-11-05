import { Link } from "react-router-dom";
import LegalLayout, {
  LegalContact,
  LegalSection,
} from "../components/LegalLayout";

function Terminos() {
  return (
    <LegalLayout
      title="Términos y condiciones"
      introduction="Condiciones de uso del sitio y contratación de servicios digitales de Funcode."
    >
      <LegalSection id="proveedor" title="1. Identificación del proveedor">
        <p>
          Funcode es la marca utilizada para ofrecer los servicios
          descritos en este sitio. La persona natural o jurídica
          responsable de su prestación se identifica a continuación.
        </p>

        <LegalContact />
      </LegalSection>

      <LegalSection id="servicios" title="2. Servicios ofrecidos">
        <p>
          Ofrecemos desarrollo de páginas web, landing pages,
          catálogos digitales y sistemas de gestión, de acuerdo con
          el alcance informado en cada publicación y en la propuesta
          correspondiente.
        </p>

        <p>
          Cada servicio debe especificar sus funcionalidades,
          entregables, requisitos técnicos, plazos y exclusiones.
          Las imágenes de demostración no implican la inclusión de
          funcionalidades que no hayan sido ofrecidas.
        </p>
      </LegalSection>

      <LegalSection id="cotizacion" title="3. Solicitudes y contratación">
        <p>
          Enviar una solicitud de cotización no obliga al visitante
          a contratar ni autoriza cobros. Crear una cuenta tampoco
          constituye, por sí solo, la contratación de un servicio.
        </p>

        <p>
          Antes de contratar, entregaremos una propuesta que indique
          el alcance, el precio total, los impuestos aplicables, la
          forma de pago, los plazos y las condiciones relevantes.
        </p>

        <p>
          La contratación requiere la aceptación expresa de las
          condiciones informadas. Enviaremos una confirmación escrita
          con las condiciones acordadas y una copia que el cliente
          pueda conservar.
        </p>

        <p>
          Las condiciones particulares no podrán reducir derechos
          irrenunciables ni desconocer características o compromisos
          previamente ofrecidos.
        </p>
      </LegalSection>

      <LegalSection id="precios" title="4. Precios y pagos">
        <p>
          Los precios se expresan en pesos chilenos, salvo indicación
          expresa. Cuando una publicación indique “Desde”, ese valor
          corresponde al alcance base descrito y no al desarrollo
          ilimitado de funcionalidades.
        </p>

        <p>
          Antes de aceptar la contratación se informará el precio
          total a pagar, incluidos los impuestos y cargos que
          correspondan. No se cobrarán adicionales sin informar su
          alcance y obtener la aceptación del cliente.
        </p>

        <p>
          Si se acuerdan anticipos o pagos por etapas, sus montos y
          fechas quedarán establecidos en la propuesta. La existencia
          de un anticipo no elimina los derechos legales del cliente.
        </p>
      </LegalSection>

      <LegalSection id="alcance" title="5. Alcance y servicios adicionales">
        <p>
          Dominio, alojamiento, correo corporativo, mantenimiento,
          licencias, panel de administración, integraciones y
          funcionalidades adicionales solo estarán incluidos cuando
          así se indique expresamente en la oferta o propuesta.
        </p>

        <p>
          Las solicitudes que amplíen el alcance se evaluarán mediante
          una propuesta adicional, indicando su precio y su efecto
          en el calendario antes de ejecutarlas.
        </p>
      </LegalSection>

      <LegalSection id="entregas" title="6. Plazos y colaboración del cliente">
        <p>
          La propuesta indicará el plazo de entrega y los antecedentes
          necesarios para iniciar el trabajo, como textos, imágenes,
          accesos y aprobaciones.
        </p>

        <p>
          Si falta información necesaria o surge una situación que
          afecte el calendario, comunicaremos sus efectos y
          coordinaremos cualquier modificación. No se modificarán
          unilateralmente las condiciones ya acordadas.
        </p>

        <p>
          El cliente deberá contar con autorización para utilizar
          los materiales que entregue y evitar enviar contraseñas
          personales o información sensible por canales no adecuados.
        </p>
      </LegalSection>

      <LegalSection id="revision" title="7. Revisión, soporte e incumplimientos">
        <p>
          Los entregables se revisarán conforme al alcance contratado.
          Las rondas de cambios, el soporte y el mantenimiento
          adicional se describirán en la propuesta.
        </p>

        <p>
          Los errores atribuibles a Funcode que impidan cumplir las
          funcionalidades comprometidas deberán ser comunicados para
          su evaluación y solución, sin perjuicio de los derechos y
          acciones legales que correspondan.
        </p>

        <p>
          El término de un período de soporte comercial no extingue
          los derechos legales del cliente. Su silencio no se
          considerará, por sí solo, aceptación de nuevos cobros.
        </p>
      </LegalSection>

      <LegalSection id="retracto" title="8. Retracto, cancelaciones y devoluciones">
        <p>
          Para los servicios contratados a distancia, Funcode reconoce
          el derecho a retracto dentro de los diez días siguientes a
          la contratación y antes de la prestación del servicio,
          conforme a la normativa aplicable.
        </p>

        <p>
          Esta versión de los términos no establece una exclusión
          general del derecho a retracto. Cuando corresponda
          legalmente la ampliación del plazo por falta de confirmación
          escrita del contrato, se respetará dicho plazo.
        </p>

        <p>
          El cliente podrá comunicar el retracto al correo indicado
          en la identificación del proveedor, señalando los datos
          necesarios para identificar la contratación. No será
          obligatorio utilizar una frase o formulario específico.
        </p>

        <p>
          Las restituciones que correspondan se realizarán sin
          retenciones improcedentes y dentro de los plazos legales.
          Fuera del retracto, las cancelaciones y sus efectos se
          resolverán conforme al contrato y la ley, sin imponer la
          pérdida automática de todo anticipo.
        </p>
      </LegalSection>

      <LegalSection id="propiedad" title="9. Propiedad intelectual">
        <p>
          La propuesta especificará los derechos de uso o cesión
          sobre diseños, código fuente y otros entregables, así como
          las condiciones de entrega.
        </p>

        <p>
          Las herramientas, bibliotecas, tipografías y componentes de
          terceros mantendrán sus respectivas licencias. El cliente
          conservará los derechos que le correspondan sobre los
          materiales que proporcione.
        </p>

        <p>
          La publicación del proyecto, nombre o logotipo del cliente
          en un portafolio requerirá su autorización previa.
        </p>
      </LegalSection>

      <LegalSection id="cuentas" title="10. Uso del sitio y cuentas">
        <p>
          Las personas usuarias deben proporcionar información
          correcta y proteger sus credenciales. No se permite utilizar
          el sitio para fraudes, accesos no autorizados o actividades
          ilícitas.
        </p>

        <p>
          Las medidas de seguridad o restricciones de acceso deberán
          ser proporcionales y no impedirán ejercer derechos sobre
          datos personales o reclamar por servicios contratados.
        </p>
      </LegalSection>

      <LegalSection id="datos" title="11. Datos personales">
        <p>
          El tratamiento de los datos personales se describe en
          nuestra{" "}
          <Link to="/privacidad">Política de privacidad</Link>.
          La aceptación de estos términos no autoriza automáticamente
          el envío de publicidad.
        </p>
      </LegalSection>

      <LegalSection id="cambios" title="12. Cambios en estas condiciones">
        <p>
          Las nuevas versiones se publicarán con su fecha de
          actualización. No modificarán retroactivamente los contratos
          ya celebrados ni reducirán derechos adquiridos.
        </p>
      </LegalSection>

      <LegalSection id="ley" title="13. Legislación y consultas">
        <p>
          Estas condiciones se rigen por la legislación chilena,
          incluida la Ley N.º 19.496 cuando resulte aplicable.
          Ninguna disposición implica renunciar a derechos
          irrenunciables ni limita el acceso a SERNAC o a los
          tribunales competentes.
        </p>

        <p>
          Las consultas y reclamos pueden dirigirse al contacto del
          proveedor indicado al inicio de este documento.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

export default Terminos;