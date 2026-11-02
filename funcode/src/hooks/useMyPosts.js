import { useEffect, useState } from "react";

import useAuth from "./useAuth";
import usePosts from "./usePosts";
import { IS_DEMO_MODE } from "../services/apiConfig";
import { listMyPosts } from "../services/postsApi";

export default function useMyPosts(page) {
  const { session } = useAuth();
  const { posts } = usePosts();

  const userId = session.user?.id;
  const token = session.token;

  const [result, setResult] = useState({
    key: null,
    sourcePosts: null,
    posts: [],
    pagination: null,
    error: "",
  });

  const queryKey = JSON.stringify([userId, token, page]);

  useEffect(() => {
    if (IS_DEMO_MODE || !token || !userId) {
      return;
    }

    const controller = new AbortController();

    async function loadMyPosts() {
      try {
        const response = await listMyPosts(
          token,
          { page },
          { signal: controller.signal }
        );

        if (
          !Array.isArray(response?.posts) ||
          !Number.isInteger(response?.pagination?.limit) ||
          response.pagination.limit <= 0 ||
          !Number.isInteger(response.pagination.total) ||
          response.pagination.total < 0
        ) {
          throw new Error(
            "La lista de publicaciones propias tiene un formato inesperado."
          );
        }

        if (!controller.signal.aborted) {
          setResult({
            key: queryKey,
            sourcePosts: posts,
            posts: response.posts,
            pagination: response.pagination,
            error: "",
          });
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setResult({
            key: queryKey,
            sourcePosts: posts,
            posts: [],
            pagination: null,
            error:
              err instanceof Error
                ? err.message
                : "No fue posible cargar tus publicaciones.",
          });
        }
      }
    }

    loadMyPosts();

    return () => controller.abort();
  }, [page, token, userId, queryKey, posts]);

  if (IS_DEMO_MODE) {
    const ownPosts = posts
      .filter((post) => post.user.id === userId)
      .sort(
        (a, b) =>
          new Date(b.created_at) - new Date(a.created_at) ||
          b.id - a.id
      );

    const limit = 12;
    const start = (page - 1) * limit;

    return {
      posts: ownPosts.slice(start, start + limit),
      pagination: {
        page,
        limit,
        total: ownPosts.length,
      },
      isLoading: false,
      error: "",
    };
  }

  if (!token || !userId) {
    return {
      posts: [],
      pagination: null,
      isLoading: false,
      error: "Debes iniciar sesión para consultar tus publicaciones.",
    };
  }

  const isLoading =
    result.key !== queryKey || result.sourcePosts !== posts;

  return {
    posts: isLoading ? [] : result.posts,
    pagination: isLoading ? null : result.pagination,
    isLoading,
    error: isLoading ? "" : result.error,
  };
}