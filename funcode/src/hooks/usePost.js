import { useEffect, useState } from "react";

import usePosts from "./usePosts";
import { IS_DEMO_MODE } from "../services/apiConfig";
import { getPost } from "../services/postsApi";

export default function usePost(id) {
  const { posts } = usePosts();

  const [result, setResult] = useState({
    id: null,
    post: null,
    error: "",
    notFound: false,
  });

  useEffect(() => {
    if (IS_DEMO_MODE) {
      return;
    }

    const controller = new AbortController();

    async function loadPost() {
      try {
        const response = await getPost(id, {
          signal: controller.signal,
        });

        if (
          !response?.post ||
          String(response.post.id) !== String(id)
        ) {
          throw new Error(
            "El detalle recibido no tiene el formato esperado."
          );
        }

        if (!controller.signal.aborted) {
          setResult({
            id,
            post: response.post,
            error: "",
            notFound: false,
          });
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setResult({
            id,
            post: null,
            error:
              err.status === 404
                ? ""
                : err instanceof Error
                  ? err.message
                  : "No fue posible cargar la publicación.",
            notFound: err.status === 404,
          });
        }
      }
    }

    loadPost();

    return () => controller.abort();
  }, [id]);

  if (IS_DEMO_MODE) {
    const post = posts.find(
      (item) => String(item.id) === String(id)
    );

    return {
      post: post ?? null,
      isLoading: false,
      error: "",
      notFound: !post,
    };
  }

  const isLoading = result.id !== id;

  return {
    post: isLoading ? null : result.post,
    isLoading,
    error: isLoading ? "" : result.error,
    notFound: isLoading ? false : result.notFound,
  };
}