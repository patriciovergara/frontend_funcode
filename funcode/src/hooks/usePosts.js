import { useContext } from "react";
import PostsContext from "../context/PostsContext";

function usePosts() {
  const context = useContext(PostsContext);

  if (context === null) {
    throw new Error("usePosts debe utilizarse dentro de PostsProvider");
  }

  return context;
}

export default usePosts;