import axios from 'axios';
//collect all api

// ทำ custom server path ให้กับ axios
const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
})

instance.interceptors.response.use(response => {
    return response;
}, async (error) => {
    if (error.response.status === 401) {
        alert(error.response.data + " โปรดเข้าสู่ระบบใหม่")
        await instance.post("/api/auth/logout")
        localStorage.removeItem("authen")
        location.replace("/")

        console.log("Auto logout")
    }

    throw error;
});

export const getPosts = async () => {
    instance.get("http://localhost:3001/api/summaries")
}

export const login = async (credential) => {
    const response = await instance.post("/api/auth/login", {
        credential: "Bearer " + credential,
    })

    return response
}

export const logout = async () => {
    const response = await instance.post("/api/auth/logout")
    // localStorage.removeItem("authen")
    return response
}

export const getPost = async (postId) => {
    const response = await instance.get(`/api/posts/${postId}`)
    return response
}

export const getSubjects = async () => {
    const data = await instance.get("/api/subjects")
    return data
}

export const createPost = async (payload) => {
    const response = await instance.post("/api/posts", payload)
    return response
}

export const editPost = async (payload, postId) => {
    const response = await instance.put(`/api/posts/${postId}`, payload)
    return response
}

export const deletePost = async (postId) => {

    const response = await instance.delete(`/api/posts/${postId}`)
    console.log(response)


    return response
}

export const createSubject = async (payload) => {
    const response = await instance.post("/api/subjects", payload)
    return response
}

export const getMyPosts = async () => {
    const response = await instance.get("/api/posts/myposts")
    return response
}

export const getMyPostsAmount = async () => {
    const response = await instance.get("/api/posts/myposts-amount")
    return response
}

export const getMyLessonsAmount = async () => {
    const response = await instance.get("/api/lessons/mylessons-amount")
    return response
}

export const getImageFile = async (fileName) => {
    const response = await instance.get("")
}