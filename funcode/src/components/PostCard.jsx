import { Link } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";

function PostCard({ post }) {
  return (
    <article className="card h-100 bg-light">
      {post.image_url ? (
        <img
          src={post.image_url}
          alt={post.title}
          className="card-img-top"
          style={{ height: "180px", objectFit: "cover" }}
        />
      ) : (
        <div
          className="bg-secondary-subtle d-flex align-items-center
            justify-content-center rounded-top"
          style={{ height: "180px" }}
        >
          <span className="text-secondary">Funcode · Soluciones digitales</span>
        </div>
      )}

      <div className="card-body d-flex flex-column">
        <h2 className="h5">{post.title}</h2>

        <p className="text-secondary mb-2">{post.category.name}</p>

        <p className="fw-bold">{formatPrice(post.price)}</p>

        <Link
          to={`/productos/${post.id}`}
          className="text-dark mt-auto"
        >
          Ver detalle →
        </Link>
      </div>
    </article>
  );
}

export default PostCard;