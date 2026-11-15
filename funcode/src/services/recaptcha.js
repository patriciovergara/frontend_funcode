const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

let scriptPromise = null;

function loadScript() {
  if (scriptPromise) {
    return scriptPromise;
  }

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(SITE_KEY)}`;
    script.async = true;
    script.onload = () => resolve(window.grecaptcha);
    script.onerror = () => {
      scriptPromise = null;
      script.remove();
      reject(new Error("No se pudo cargar reCAPTCHA. Revisa tu conexión."));
    };
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export const IS_RECAPTCHA_ENABLED = Boolean(SITE_KEY);

// Devuelve null si reCAPTCHA no está configurado (VITE_RECAPTCHA_SITE_KEY vacío).
export async function getRecaptchaToken(action) {
  if (!IS_RECAPTCHA_ENABLED) {
    return null;
  }

  const grecaptcha = await loadScript();

  await new Promise((resolve) => grecaptcha.ready(resolve));

  try {
    return await grecaptcha.execute(SITE_KEY, { action });
  } catch {
    throw new Error("No se pudo verificar reCAPTCHA. Inténtalo nuevamente.");
  }
}
