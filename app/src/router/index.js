import { createRouter, createWebHashHistory } from "vue-router"
import Landing from "../pages/Landing.vue"
import Suggest from "../pages/Suggest.vue"
import Summaries from "../pages/Summaries.vue"
import Notfound from "../pages/NotFound.vue"
import Post from "../pages/Post.vue"
import Lesson from "../pages/Lesson.vue"

const routes = [
    { path: '/', name: "landing", component: Landing },
    // { path: "/posts", name: "posts" },
    { path: '/suggest', name: "suggest", component: Suggest},
    { path: '/summaries', name: "summaries", component: Summaries },
    { path: '/posts/:id', name: "post", component: Post },
    { path: '/posts/:id/:lessonId', name: "lesson", component: Lesson },
    { path: '/:pathMatch(.*)*', name: 'not found', component: Notfound },
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

export default router