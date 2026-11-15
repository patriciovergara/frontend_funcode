import { formatPrice } from "../utils/formatPrice";

function OriginalPrice({ price, priceType, originalPrice }) {
  if (
    !["fixed", "from"].includes(priceType) ||
    originalPrice == null ||
    !Number.isSafeInteger(Number(originalPrice)) ||
    !Number.isSafeInteger(Number(price)) ||
    Number(price) <= 0 ||
    Number(originalPrice) <= Number(price)
  ) {
    return null;
  }

  return (
    <p className="tw:mb-1 tw:text-sm tw:text-funcode-muted">
      Oferta · Precio anterior: <del>{formatPrice(originalPrice, priceType)}</del>
    </p>
  );
}

export default OriginalPrice;
