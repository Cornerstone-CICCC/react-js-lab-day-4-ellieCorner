import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { persist } from "zustand/middleware";

export interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  isDeleted: boolean;
}

interface PostState {
  posts: Post[];
  addPost: (title: string, content: string) => void;
  updatePost: (id: string, title: string, content: string) => void;
  softDeletePost: (id: string) => void;
  recoverPost: (id: string) => void;
  deletePermanently: (id: string) => void;
  togglePublished: (id: string) => void;
  getPostById: (id: string) => Post | undefined;
}

export const usePostStore = create<PostState>()(
  persist(
    (set, get) => ({
      posts: [],

      addPost: (title, content) =>
        set((state) => ({
          posts: [
            ...state.posts,
            {
              id: uuid(),
              title,
              content,
              published: false,
              isDeleted: false,
            },
          ],
        })),

      updatePost: (id, title, content) =>
        set((state) => ({
          posts: state.posts.map((p) =>
            p.id === id ? { ...p, title, content } : p,
          ),
        })),

      softDeletePost: (id) =>
        set((state) => ({
          posts: state.posts.map((p) =>
            p.id === id ? { ...p, isDeleted: true } : p,
          ),
        })),

      recoverPost: (id) =>
        set((state) => ({
          posts: state.posts.map((p) =>
            p.id === id ? { ...p, isDeleted: false } : p,
          ),
        })),

      deletePermanently: (id) =>
        set((state) => ({
          posts: state.posts.filter((p) => p.id !== id),
        })),

      togglePublished: (id) =>
        set((state) => ({
          posts: state.posts.map((p) =>
            p.id === id ? { ...p, published: !p.published } : p,
          ),
        })),

      getPostById: (id) => get().posts.find((p) => p.id === id),
    }),
    {
      name: "post-storage",
    },
  ),
);
