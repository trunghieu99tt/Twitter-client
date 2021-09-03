const prefix = '/comment'

export const COMMENT_ENDPOINTS = {
    BASE: prefix,
    GET_USER_COMMENTS: `${prefix}/user`,
}

export const COMMENT_QUERY = {
    DELETE_COMMENT: 'DELETE_COMMENT',
    GET_MY_COMMENTS: 'GET_MY_COMMENTS',
    CREATE_NEW_COMMENT: 'CREATE_NEW_COMMENT',
    GET_TWEET_COMMENTS: 'GET_TWEET_COMMENTS',
}