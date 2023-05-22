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
    const { config } = error;

    // อันอื่นๆ ignore ไป
    if (error.response.status !== 401) {
        throw error;
    }

    /**
     *  ลองส่ง Reqeust ใหม่เผื่อว่าเคสที่ Token หมดอายุต้องมีการสร้าง Request token ใหม่
     *  แต่เราส่ง Request ไปหลายๆ Request ทีเดียวทำให้ใน Request แรกมีการเปลี่ยน
     *  1. Refresh token
     *  2. Access token
     *  ทีนี้ Request อื่นๆ ที่ตามมาแบบ Asynchronous จะไม่ได้จะพยายามสร้าง Access token ใหม่
     *  แต่เมื่อเทียบ refresh token มันไม่ตรงเลยถูก Reject ด้วย status code 401
     */

    const delayRetryRequest = new Promise((resolve) => {
        setTimeout(() => {
            console.log("พยายามส่ง Request ใหม่ :", config.url);
            resolve();
        }, 100);
    });

    return delayRetryRequest.then(() => axios(config)).catch(async error => {
    
        if (error.response.status === 401) {
            console.log(error, ": ปัญหาที่ Axios instance ทำการออกจากระบบ");
            alert(error.response.data + " : โปรดเข้าสู่ระบบใหม่")
            // await instance.post("/api/auth/logout")
            localStorage.removeItem("authen")
            location.replace("/")
        }
        
        throw error;
    });

});

export const getPosts = async (query = null) => {
    let response
    if (!query) {
        console.log(query)
        response = instance.get("http://localhost:3001/api/posts")
    }
    else {
        response = instance.get(`http://localhost:3001/api/posts?search=${query}`)
    }
    return response
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

export const followPost = async (postId) => {
    const response = await instance.post(`/api/posts/follow/${postId}`)
    return response
}

export const unFollowPost = async (postId) => {
    const response = await instance.delete(`/api/posts/follow/${postId}`)
    return response
}

export const getFollowingPost = async () => {
    const response = await instance.get("/api/posts/following")
    return response
}

export const getFollowersAmount = async () => {
    const response = await instance.get("/api/posts/followers-amount")
    return response
}

export const getFollowersStatistic = async () => {
    const response = await instance.get("/api/posts/followers-statistic")
    return response
}

export const getMyPosts = async () => {
    const response = await instance.get("/api/posts/myposts")
    return response
}

export const getSuggestPosts = async (take) => {
    const response = await instance.get(`/api/posts/suggest-posts?take=${take}`)
    return response
}

export const createSubject = async (payload) => {
    const response = await instance.post("/api/subjects", payload)
    return response
}

export const getLesson = async (postId, lessonId) => {
    const response = await instance.get(`/api/lessons/${postId}/${lessonId}`)
    return response
}

export const createLesson = async (payload, postId) => {
    const response = await instance.post("/api/lessons/" + postId, payload)
    return response
}

export const editLesson = async (payload, postId, lessonId) => {
    const response = await instance.put(`/api/lessons/${postId}/${lessonId}`, payload)
    return response
}

export const deleteLesson = async (postId, lessonId) => {
    const response = await instance.delete(`/api/lessons/${postId}/${lessonId}`)
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

export const getLearningDocument = async (lessonId) => {
    const response = await instance.get(`/api/lessons/${lessonId}/learning-document`)
    return response
}