import { useEffect, useState } from "react";

import usePosts from "./usePosts";
import { IS_DEMO_MODE } from "../services/apiConfig";
import { listPosts } from "../services/postsApi";

export default function useCatalog({ category, search, page }) {
  const { posts } = usePosts();

  const [result, setResult] = useState({
    key: null,
    posts: [],
    pagination: null,
    error: "",
  });

  const queryKey = JSON.stringify([category, search, page]);

  useEffect(() => {
    if (IS_DEMO_MODE) {
      return;
    }

    const controller = new AbortController();

    async function loadCatalog() {
      try {
        const response = await listPosts(
          { category, search, page },
          { signal: controller.signal }
        );

        if (
          !Array.isArray(response?.posts) ||
          !Number.isInteger(response?.pagination?.limit) ||
          response.pagination.limit <= 0 ||
          !Number.isInteger(response.pagination.total) ||
          response.pagination.total < 0
        ) {
          throw new Error("El listado recibido no tiene el formato esperado.");
        }

        if (!controller.signal.aborted) {
          setResult({
            key: queryKey,
            posts: response.posts,
            pagination: response.pagination,
            error: "",
          });
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setResult({
            key: queryKey,
            posts: [],
            pagination: null,
            error:
              err instanceof Error
                ? err.message
                : "No fue posible cargar las publicaciones.",
          });
        }
      }
    }

    loadCatalog();

    return () => controller.abort();
  }, [category, search, page, queryKey]);

  if (IS_DEMO_MODE) {
    const filteredPosts = posts.filter((post) => {
      const matchesTitle = post.title
        .toLocaleLowerCase("es")
        .includes(search.trim().toLocaleLowerCase("es"));

      const matchesCategory =
        category === "" || String(post.category.id) === category;

      return matchesTitle && matchesCategory;
    });

    const limit = 12;
    const start = (page - 1) * limit;

    return {
      posts: filteredPosts.slice(start, start + limit),
      pagination: {
        page,
        limit,
        total: filteredPosts.length,
      },
      isLoading: false,
      error: "",
    };
  }

  const isLoading = result.key !== queryKey;

  return {
    posts: isLoading ? [] : result.posts,
    pagination: isLoading ? null : result.pagination,
    isLoading,
    error: isLoading ? "" : result.error,
  };
}