import { call, put, takeLatest, all } from "redux-saga/effects";
import { Post } from "../interfaces";
import { api } from "./api";
import { getPostsSuccess, getPostsError } from "./postsSlice";
import { sagaActions } from "./sagaActions";

export function* getPosts() {
  try {
    const response: Post[] = yield call(api.fetchPosts);
    yield put(getPostsSuccess(response));
  } catch (error) {
    yield put(getPostsError(error));
  }
}

function* workGetsPostsFetch() {
  yield takeLatest(sagaActions.FETCH_POSTS, getPosts);
}

function* mySaga() {
  yield all([workGetsPostsFetch()]);
}

export default mySaga;
