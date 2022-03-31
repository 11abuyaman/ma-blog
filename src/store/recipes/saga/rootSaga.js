import { all } from "redux-saga/effects";
import healthyRecipesSaga from "./healthySaga.recipes";
import postsSaga from "./postsSaga.posts";
import searchResultsSaga from "./searchSaga.recipes";

export default function* rootSaga() {
    yield all([
        postsSaga(),
        healthyRecipesSaga(),
        searchResultsSaga()
    ])
}