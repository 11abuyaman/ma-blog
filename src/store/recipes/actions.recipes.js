import { createAction } from "@reduxjs/toolkit";
import { createAsyncActions } from "../utls";

// Random recipes actions
export const loadPosts = createAsyncActions("posts/GET_POSTS");

// Healthy recipes actions
export const loadHealthyRecipes = createAsyncActions("posts/GET_HEALTHY_RECIPES");

// Search recipes actions
export const updateSearchTerm = createAction("posts/UPDATE_SEARCH_TERM");
export const loadSearchResults = createAsyncActions("posts/GET_SEARCH_RESULTS");
