import { IS_DEMO_MODE } from "./apiConfig";

const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
let loading;

function loadRecaptcha() {
  if (window.grecaptcha?.execute) return Promise.resolve(window.grecaptcha);
  if (loading) return loading;

  loading = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const timer = window.setTimeout(() => {
      script.remove();
      reject(new Error("La verificación de seguridad tardó demasiado. Inténtalo nuevamente."));
    }, 10000);
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.onerror = () => {
      window.clearTimeout(timer);
      script.remove();
      reject(new Error("No se pudo cargar la verificación de seguridad. Inténtalo nuevamente."));
    };
    script.onload = () => {
      if (!window.grecaptcha?.ready) {
        window.clearTimeout(timer);
        script.remove();
        reject(new Error("No se pudo iniciar la verificación de seguridad."));
        return;
      }
      window.grecaptcha.ready(() => {
        window.clearTimeout(timer);
        resolve(window.grecaptcha);
      });
    };
    document.head.appendChild(script);
  }).catch((error) => {
    loading = undefined;
    throw error;
  });
  return loading;
}

export async function getRecaptchaToken(action) {
  if (IS_DEMO_MODE || (import.meta.env.DEV && !siteKey)) return undefined;
  if (!siteKey) {
    throw new Error("La verificación de seguridad no está configurada.");
  }
  const recaptcha = await loadRecaptcha();
  let timer;
  try {
    const token = await Promise.race([
      recaptcha.execute(siteKey, { action }),
      new Promise((_, reject) => {
        timer = window.setTimeout(() => reject(new Error("timeout")), 10000);
      }),
    ]);
    if (typeof token !== "string" || !token) throw new Error("empty token");
    return token;
  } catch {
    throw new Error("No se pudo verificar la seguridad. Inténtalo nuevamente.");
  } finally {
    window.clearTimeout(timer);
  }
}
