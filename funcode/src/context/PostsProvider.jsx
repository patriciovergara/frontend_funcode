import { useState } from "react";

import PostsContext from "./PostsContext";
import useAuth from "../hooks/useAuth";

import {
  categories,
  posts as initialPosts,
} from "../data/mockData";

import { IS_DEMO_MODE } from "../services/apiConfig";
import * as postsApi from "../services/postsApi";

function PostsProvider({ children }) {
  const { session } = useAuth();

  const [posts, setPosts] = useState(
    IS_DEMO_MODE ? initialPosts : []
  );

  function requireSession() {
    if (!session.user) {
      throw new Error("Debes iniciar sesión para realizar esta operación.");
    }
  }

  function getDemoCategory(categoryId) {
    const category = categories.find(
      (item) => item.id === Number(categoryId)
    );

    if (!category) {
      throw new Error("La categoría seleccionada no existe.");
    }

    return category;
  }

  function getOwnDemoPost(id) {
    const post = posts.find(
      (item) => String(item.id) === String(id)
    );

    if (!post) {
      throw new Error("La publicación no existe.");
    }

    if (post.user.id !== session.user.id) {
      throw new Error("No tienes permiso para modificar esta publicación.");
    }

    return post;
  }

  async function createPublication(data) {
    requireSession();

    let createdPost;

    if (IS_DEMO_MODE) {
      const timestamp = new Date().toISOString();

      createdPost = {
        id: Date.now(),
        title: data.title,
        description: data.description,
        price: Number(data.price),
        image_url: data.image_url,
        category: getDemoCategory(data.category_id),
        user: {
          id: session.user.id,
          name: session.user.name,
        },
        created_at: timestamp,
        updated_at: timestamp,
      };
    } else {
      const response = await postsApi.createPost(
        data,
        session.token
      );

      createdPost = response.post;
    }

    setPosts((currentPosts) => [createdPost, ...currentPosts]);

    return createdPost;
  }

  async function updatePublication(id, data) {
    requireSession();

    let updatedPost;

    if (IS_DEMO_MODE) {
      const currentPost = getOwnDemoPost(id);

      updatedPost = {
        ...currentPost,
        title: data.title,
        description: data.description,
        price: Number(data.price),
        image_url: data.image_url,
        category: getDemoCategory(data.category_id),
        updated_at: new Date().toISOString(),
      };
    } else {
      const response = await postsApi.updatePost(
        id,
        data,
        session.token
      );

      updatedPost = response.post;
    }

    setPosts((currentPosts) =>
      currentPosts.map((item) =>
        String(item.id) === String(id) ? updatedPost : item
      )
    );

    return updatedPost;
  }

  async function deletePublication(id) {
    requireSession();

    if (IS_DEMO_MODE) {
      getOwnDemoPost(id);
    } else {
      await postsApi.deletePost(id, session.token);
    }

    setPosts((currentPosts) =>
      currentPosts.filter(
        (item) => String(item.id) !== String(id)
      )
    );
  }

  return (
    <PostsContext.Provider
      value={{
        posts,
        createPublication,
        updatePublication,
        deletePublication,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export default PostsProvider;