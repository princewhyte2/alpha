import axiosInstance from './instance'

const createPost = async (data:CreatePostData) => {
    const response = await axiosInstance.post('/posts',data)
    return response.data
}

const updatePost = async (postId:string) => {
    const response = await axiosInstance.patch(`/posts/${postId}`)
    return response.data
}

const deletePost = async (postId:string) => {
    const response = await axiosInstance.delete(`posts/${postId}`)
    return response.data
}

const getAllPost = async () => {
    const response = await axiosInstance.get('/posts')
    return response.data
}

const addComment = async (postId:string) => {
    const response = await axiosInstance.post(`/posts/${postId}/comments`)
    return response.data
}

const replyComment = async (postId: string,commentId:string) => {
    const response = await axiosInstance.post(`/posts/${postId}/comments/${commentId}`)
    return response.data
}

const getAllPostComments = async (postId: string) => {
    const response = await axiosInstance.get(`/posts/${postId}/comments`)
    return response.data
}

const likePost = async (postId: string) => {
    const response = await axiosInstance.get(`/posts/${postId}/likes`)
    return response.data
}

const unlikePost = async (postId: string) => {
     const response = await axiosInstance.get(`/posts/${postId}/unlikes`)
    return response.data
}

const postFetcher = () => getAllPost().then(res => res.result.data)
const postCommentFetcher = (url:string) => getAllPostComments(url).then(res => res.result)

const postService = {
    createPost,updatePost,deletePost,postFetcher,addComment,replyComment,postCommentFetcher,likePost,unlikePost
}

export default postService