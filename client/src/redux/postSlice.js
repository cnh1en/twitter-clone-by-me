import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDataAPI, postDataAPI } from "../utils/fetchData";

const postSlice = createSlice({
  name: "post",
  initialState: { posts: [], page: 1 },
  reducers: {
    likePost: (state, action) => {
      const { id, like, socket } = action.payload;

      state.posts = state.posts.map((post) =>
        post._id === id ? { ...post, likes: [...post.likes, like] } : post
      );
      // socket.socketClient.emit("likePost", like);
    },
    unlikePost: (state, action) => {
      const { id, like } = action.payload;
      state.posts = state.posts.map((post) =>
        post._id === id
          ? { ...post, likes: post.likes.filter((item) => item !== like) }
          : post
      );
    },
    retweetPost: (state, action) => {
      const { id, retweet } = action.payload;

      state.posts = state.posts.map((post) =>
        post._id === id
          ? { ...post, retweet: [...post.retweet, retweet] }
          : post
      );
    },
    unretweetPost: (state, action) => {
      const { id, retweet } = action.payload;

      state.posts = state.posts.map((post) =>
        post._id === id
          ? {
              ...post,
              retweet: post.retweet.filter((item) => item !== retweet),
            }
          : post
      );
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    updatePost: (state, action) => {
      const { id, newPost } = action.payload;
      state.posts = state.posts.map((item) =>
        item._id === id ? newPost : item
      );
    },
    updatePostP2: (state, action) => {
      const { id, parentId } = action.payload;
      state.posts = state.posts.map((item) =>
        item._id === parentId
          ? {
              ...item,
              comments: item.comments.filter((comment) => comment !== id),
            }
          : item
      );
    },
    reply: (state, action) => {
      const { id, comment } = action.payload;
      state.posts = state.posts.map((item) =>
        item._id === id
          ? { ...item, comments: [comment, ...item.comments] }
          : item
      );
    },
    createComment: (state, action) => {
      const { id, newPost } = action.payload;
      state.posts = state.posts.map((item) =>
        item._id === id
          ? { ...item, comments: [newPost._id, ...item.comments] }
          : item
      );
    },
    createPost2: (state, action) => {
      state.posts = [action.payload, ...state.posts];
    },
    updatePage: (state, action) => {
      state.page += 1;
    },
    updateResult: (state, action) => {
      state.result += action.payload;
    },
    loadMorePosts: (state, action) => {
      state.posts = [...state.posts, ...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
      })
      .addCase(getPosts.rejected, (state) => {
        state.error = "error";
      })
      .addCase(createPost.pending, (state, action) => {
        state.loading = false;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts = [action.payload.newPost, ...state.posts];
      })
      .addCase(addPosts.fulfilled, (state, action) => {
        state.posts = [...state.posts, ...action.payload.posts];
      });
  },
});

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async ({ token, limit, page }) => {
    const res = await getDataAPI(`/posts?limit=${limit}&page=${page}`, token);
    return res.data;
  }
);
export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ token, post, socket }) => {
    const res = await postDataAPI("posts", post, token);
    return res.data;
  }
);
export const addPosts = createAsyncThunk(
  "post/addPosts",
  async ({ page, limit, token }) => {
    const res = await getDataAPI(`/posts?page=${page}&limit=${limit}`, token);
    return res.data;
  }
);

export const {
  likePost,
  unlikePost,
  retweetPost,
  unretweetPost,
  deletePost,
  updatePost,
  updatePostP2,
  reply,
  createPost2,
  createComment,
  updatePage,
  updateResult,
  loadMorePosts,
} = postSlice.actions;
export default postSlice.reducer;
