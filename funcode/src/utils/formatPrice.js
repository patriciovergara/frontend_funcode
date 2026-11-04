const clpFormatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export function formatPrice(price, priceType = "fixed") {
  if (priceType === "quote") {
    return "Cotiza con nosotros";
  }

  if (
    price === null ||
    price === undefined ||
    price === ""
  ) {
    return "Precio no disponible";
  }

  const amount = Number(price);

  if (!Number.isFinite(amount) || amount <= 0) {
    return "Precio no disponible";
  }

  const formattedPrice = `${clpFormatter.format(amount)} CLP`;

  return priceType === "from"
    ? `Desde ${formattedPrice}`
    : formattedPrice;
}