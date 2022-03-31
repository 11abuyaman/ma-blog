import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_BASE_URL } from '../../../commons/functions/commons';
import { loadPosts } from '../actions.recipes';

const apiCall = async () => {
    let result = await axios.get(`${API_BASE_URL}/posts/`);
    let { data } = result;
    if (result.status === 200)
        return data;
}

function* fetchPosts(action) {
    console.log('fetchPosts',action);
    try {
        const recipes = yield call(apiCall);
        yield put(loadPosts.succeeded({ recipes }))
    }
    catch (error) {
        yield put(loadPosts.failed({ error: { code: error.response.status, message: error.response.data.message } }))
    }
}

function* postsSaga() {
    yield takeEvery(loadPosts.started, fetchPosts);
}

export default postsSaga;