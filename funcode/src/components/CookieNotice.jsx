import { useState } from "react";
import { Link } from "react-router-dom";

const noticeKey = "funcode:cookie-notice:v1";

function wasNoticeDismissed() {
  try {
    return window.localStorage.getItem(noticeKey) === "read";
  } catch (error) {
    console.warn("No se pudo consultar el aviso de cookies:", error);
    return false;
  }
}

function CookieNotice() {
  const [dismissed, setDismissed] = useState(wasNoticeDismissed);

  function dismissNotice() {
    try {
      window.localStorage.setItem(noticeKey, "read");
    } catch (error) {
      console.warn("No se pudo guardar que se leyó el aviso de cookies:", error);
    }
    setDismissed(true);
  }

  if (dismissed) return null;

  return (
    <section
      aria-labelledby="cookie-notice-title"
      className="
        tw:fixed tw:inset-x-4 tw:bottom-4 tw:z-50 tw:mx-auto
        tw:max-h-[calc(100dvh-2rem)] tw:max-w-4xl tw:overflow-y-auto
        tw:rounded-2xl tw:border tw:border-solid tw:border-funcode-line
        tw:bg-funcode-surface tw:p-5 tw:font-sans tw:text-funcode-text
        tw:shadow-funcode-card tw:sm:p-6
      "
    >
      <div className="tw:flex tw:flex-col tw:gap-4 tw:sm:flex-row tw:sm:items-center tw:sm:justify-between">
        <div>
          <h2 id="cookie-notice-title" className="tw:mb-2 tw:text-base tw:font-semibold">
            Cookies y almacenamiento
          </h2>
          <p className="tw:m-0 tw:text-sm tw:leading-relaxed tw:text-funcode-muted">
            Usamos una cookie necesaria para mantener tu sesión cuando ingresas
            a tu cuenta. También guardamos en tu navegador que leíste este aviso.{" "}
            <Link
              to="/privacidad"
              className="tw:text-funcode-accent tw:underline tw:underline-offset-4 tw:hover:text-sky-200 tw:focus-visible:outline-2 tw:focus-visible:outline-offset-4 tw:focus-visible:outline-funcode-accent"
            >
              Política de privacidad
            </Link>
          </p>
        </div>
        <button
          type="button"
          onClick={dismissNotice}
          className="
            tw:min-h-11 tw:shrink-0 tw:cursor-pointer tw:rounded-xl tw:border-0
            tw:bg-funcode-accent tw:px-6 tw:py-3 tw:text-sm tw:font-semibold
            tw:text-funcode-bg tw:hover:bg-sky-200
            tw:focus-visible:outline-2 tw:focus-visible:outline-offset-4
            tw:focus-visible:outline-funcode-accent
          "
        >
          Entendido
        </button>
      </div>
    </section>
  );
}

export default CookieNotice;
