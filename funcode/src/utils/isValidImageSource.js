const LOCAL_IMAGE_PATTERN =
  /^\/assets\/servicios\/[a-z0-9][a-z0-9_-]*\.(?:webp|png|jpe?g)$/;

export function isValidImageSource(value) {
  if (typeof value !== "string") {
    return false;
  }

  const source = value.trim();

  if (!source || source.includes("\u0000")) {
    return false;
  }

  if (LOCAL_IMAGE_PATTERN.test(source)) {
    return true;
  }

  try {
    const url = new URL(source);

    return (
      ["http:", "https:"].includes(url.protocol) &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}