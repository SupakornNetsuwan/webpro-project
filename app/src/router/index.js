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
import CreatePost from "../pages/CreatePost.vue"
import CreateLesson from "../pages/CreateLesson.vue"
import EditPost from "../pages/EditPost.vue"
import EditLesson from "../pages/EditLesson.vue"
import MyPost from "../pages/MyPost.vue"
import AddSubject from "../pages/AddSubject.vue"

// Layout
import SummariesLayout from "../layouts/SummariesLayout.vue"

// Vuex
import { store } from "../main"


const routes = [
    {
        path: '/', name: "landing",
        component: Landing
    },
    {
        path: '/home', name: "home",
        meta: {
            requiresAuth: true
        },
        component: Home
    },
    {
        path: '/profile', name: "profile",
        meta: {
            requiresAuth: true
        }, component: Profile
    },
    {
        path: '/summary-manage',
        meta: {
            requiresAuth: true
        },
        children: [{
            path: '',
            name: "summaryManage",
            component: SummaryManage,
        }, {
            path: 'create-post',
            name: "createPost",
            component: CreatePost
        }, {
            path: 'my-posts',
            name: "myposts",
            component: MyPost
        }, {
            path: 'edit-post/:id',
            name: "editPost",
            component: EditPost
        }, {
            path: ':id/create-lesson',
            name: "createLesson",
            component: CreateLesson
        }, {
            path: 'edit-post/:id/:lessonId',
            name: "editLesson",
            component: EditLesson
        }, {
            path: 'add-subject',
            name: "addSubject",
            component: AddSubject
        },]
    },
    {
        path: '/suggest', name: "suggest", component: Suggest, props: {
            xxxx: "EARTH"
        }
    },
    {
        path: '/summaries',
        name: "summaries",
        meta: {
            requiresAuth: true
        },
        component: SummariesLayout,
        children: [{
            path: '',
            name: "summaries",
            components: {
                default: Summaries,
            }
        }, {
            path: 'following',
            name: "summariesFollowing",
            components: {
                default: SummariesFollowing,
            }
        }]
    },
    {
        path: '/posts/:id', name: "post",
        meta: {
            requiresAuth: true
        }, component: Post
    },
    {
        path: '/posts/:id/:lessonId', name: "lesson",
        meta: {
            requiresAuth: true
        }, component: Lesson
    },
    {
        path: '/:pathMatch(.*)*', name: 'not found',
        meta: {
            requiresAuth: true
        }, component: Notfound
    },

]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (store.state.authen) {
            next() // go to wherever I'm going
            return
        }

        next({ name: 'landing' })

    } else {
        next() // does not require auth, make sure to always call next()!
    }
})

export default router