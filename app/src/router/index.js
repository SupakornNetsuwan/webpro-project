import { createRouter, createWebHashHistory } from "vue-router"
import Home from "../pages/Home.vue"
import Landing from "../pages/Landing.vue"
import Suggest from "../pages/Suggest.vue"
import Summaries from "../pages/Summaries.vue"
import SummariesFollowing from "../pages/SummariesFollowing.vue"
import Notfound from "../pages/NotFound.vue"
import Post from "../pages/Post.vue"
import Lesson from "../pages/Lesson.vue"
import SummaryManage from "../pages/SummaryManage.vue"
import Profile from "../pages/Profile.vue"
import createPost from "../pages/createPost.vue"

// Layout
import SummariesLayout from "../layouts/SummariesLayout.vue"

const routes = [
    { path: '/', name: "landing", component: Landing },
    { path: '/home', name: "home", component: Home },
    { path: '/profile', name: "profile", component: Profile },
    {
        path: '/summary-manage', children: [{
            path: '',
            name: "summaryManage",
            component: SummaryManage
        }, {
            path: 'create-post',
            name: "createPost",
            component: createPost
        }]
    },
    { path: '/suggest', name: "suggest", component: Suggest },
    {
        path: '/summaries',
        name: "summaries",
        component: SummariesLayout,
        children: [{
            path: '',
            name: "summaries",
            components: {
                default: Summaries
            }
        }, {
            path: 'following',
            name: "summariesFollowing",
            components: {
                default: SummariesFollowing,
            }
        }]
    },
    // { path: "/posts", name: "posts" },
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