import { createReducer } from "@reduxjs/toolkit";
import { loadHealthyRecipes, loadPosts, loadSearchResults, updateSearchTerm } from "./actions.recipes"

// Store initial state
const initialState = {
    recipes: {
        searchResults: {
            recipes: [],
            loading: false,
            error: null
        },
        posts: {
            recipes: [],
            loading: false,
            error: null
        },
        healthyRecipes: {
            recipes: [],
            loading: false,
            error: null
        },
    },
    ui: {
        searchTerm: "",
    }
}

export const recipesReducer = createReducer(initialState, {

    // Posts cases:
    [loadPosts.started.type]: (state) => {
        state.recipes.posts.loading = true;
    },
    [loadPosts.succeeded.type]: (state, action) => {
        state.recipes.posts.loading = false;
        state.recipes.posts.recipes = action.payload.recipes;
    },
    [loadPosts.failed.type]: (state, action) => {
        state.recipes.posts.loading = false;
        state.recipes.posts.error = action.payload.error;
    },

    // Search recipes cases:
    [updateSearchTerm.type]: (state, action) => {
        state.ui.searchTerm = action.payload.term;
        state.recipes.searchResults.loading = true;
    },
    [loadSearchResults.succeeded.type]: (state, action) => {
        state.recipes.searchResults.loading = false;
        state.recipes.searchResults.recipes = action.payload.recipes;
    },
    [loadSearchResults.failed.type]: (state, action) => {
        state.recipes.searchResults.loading = false;
        state.recipes.searchResults.error = action.payload.error;
    },
});

export default recipesReducer;