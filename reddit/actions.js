import fetch from 'isomorphic-fetch'

/*
 * action 类型
 */
// 是为了后面在 reducer 中可以匹配到对应到 type
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

/*
 * action 创建函数
 */

// 接收到添加的请求，去找 reducers 实现
export function selectSubreddit(subreddit) {
    return {
        type: SELECT_SUBREDDIT, // 'SELECT_SUBREDDIT'
        subreddit
    }
}

export function invalidateSubreddit(subreddit) {
    return {
        type: INVALIDATE_SUBREDDIT,
        subreddit
    }
}

function requestPosts(subreddit) {
    return {
        type: REQUEST_POSTS,
        subreddit
    }
}

function receivePosts(subreddit, json) {
    return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

// fetchPostsIfNeeded 需要用的函数

function fetchPosts(subreddit) {
    return dispatch => {
        dispatch(requestPosts(subreddit)) // 请求数据，寻找 reducer 处理 type: REQUEST_POSTS

        return fetch(`https://www.reddit.com/r/${subreddit}.json`)
            .then(response => response.json())
            // We can dispatch many times!
            // 可以多次 dispatch
            // Here, we update the app state with the results of the API call.
            // 这里，使用 API 请求结果来更新应用的 state。
            .then(json => dispatch(receivePosts(subreddit, json))) // 接收数据
    }
}

function shouldFetchPosts(state, subreddit) {
    const posts = state.postsBySubreddit[subreddit]

    console.log('shouldFetchPosts=开始');
    console.log(posts);
    console.log(subreddit);
    console.log(state);
    console.log('shouldFetchPosts=结束');

    if (!posts) {
        return true
    } else if (posts.isFetching) {
        return false
    } else {
        return posts.didInvalidate
    }
}

export function fetchPostsIfNeeded(subreddit) {
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), subreddit)) {
            return dispatch(fetchPosts(subreddit))
        }
    }
}
