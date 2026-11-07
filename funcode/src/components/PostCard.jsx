import { useState } from "react";
import { Link } from "react-router-dom";

import { formatPrice } from "../utils/formatPrice";

function ServiceImage({ src, title }) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className="
          tw:relative tw:flex tw:aspect-video
          tw:items-center tw:justify-center tw:overflow-hidden
          tw:bg-funcode-surface-raised
        "
      >
        <div
          aria-hidden="true"
          className="
            tw:absolute tw:h-36 tw:w-36
            tw:rounded-full tw:bg-funcode-accent/10 tw:blur-2xl
          "
        />

        <div className="tw:relative tw:px-6 tw:text-center">
          <span
            aria-hidden="true"
            className="
              tw:mb-3 tw:block tw:font-mono
              tw:text-3xl tw:text-funcode-accent
            "
          >
            {"</>"}
          </span>

          <p className="tw:m-0 tw:text-xs tw:tracking-wide tw:text-funcode-muted">
            Funcode · Soluciones digitales
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={title}
      loading="lazy"
      decoding="async"
      onError={() => setHasError(true)}
      className="
        tw:block tw:aspect-video tw:w-full tw:object-cover
        tw:transition-transform tw:duration-500
        tw:motion-safe:group-hover:scale-105
        tw:motion-reduce:transition-none
      "
    />
  );
}

function PostCard({ post }) {
  return (
    <article
      className="
        tw:group tw:flex tw:h-full tw:min-w-0 tw:flex-col
        tw:overflow-hidden tw:rounded-2xl
        tw:border tw:border-solid tw:border-funcode-line
        tw:bg-funcode-surface
        tw:transition tw:duration-300
        tw:hover:border-funcode-accent/50
        tw:hover:shadow-funcode-card
        tw:motion-safe:hover:-translate-y-1
        tw:motion-reduce:transition-none
      "
    >
      <div
        className="
          tw:overflow-hidden
          tw:border-0 tw:border-b tw:border-solid tw:border-funcode-line
        "
      >
        <ServiceImage
          key={post.image_url || "no-image"}
          src={post.image_url}
          title={post.title}
        />
      </div>

      <div className="tw:flex tw:flex-1 tw:flex-col tw:p-6">
        <p
          className="
            tw:mb-4 tw:self-start
            tw:rounded-full
            tw:border tw:border-solid tw:border-funcode-accent/20
            tw:bg-funcode-accent/5 tw:px-3 tw:py-1.5
            tw:text-[11px] tw:font-medium tw:text-funcode-accent
          "
        >
          {post.category?.name || "Soluciones digitales"}
        </p>

        <h2
          className="
            tw:mb-5 tw:text-xl tw:leading-snug
            tw:font-semibold tw:tracking-tight tw:text-funcode-text
          "
        >
          {post.title}
        </h2>

        <div className="tw:mt-auto">
          <p
            className="
              tw:mb-5 tw:text-xl tw:leading-snug
              tw:font-semibold tw:tracking-tight tw:text-funcode-text
            "
          >
            {formatPrice(post.price, post.price_type)}
          </p>

          <Link
            to={`/productos/${post.id}`}
            aria-label={`Ver detalle de ${post.title}`}
            className="
              tw:flex tw:min-h-12
              tw:items-center tw:justify-between tw:gap-3
              tw:rounded-xl
              tw:border tw:border-solid tw:border-funcode-line
              tw:bg-white/5 tw:px-4 tw:py-3
              tw:text-sm tw:font-medium
              tw:text-funcode-text! tw:no-underline!
              tw:transition-colors
              tw:hover:border-funcode-accent/50
              tw:hover:bg-funcode-accent/10
              tw:focus-visible:outline-2
              tw:focus-visible:outline-offset-4
              tw:focus-visible:outline-funcode-accent
              tw:motion-reduce:transition-none
            "
          >
            Ver solución

            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default PostCard;