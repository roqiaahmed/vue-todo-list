import { createRouter, createWebHistory } from "vue-router";
import signIn from "../components/signIn.vue";
import signUp from "../components/signUp.vue";
import lists from "../components/lists.vue";
const routes = [
    {
        path: "/signin",
        name: "signIn",
        component: signIn,
    },
    {
        path: "/signUp",
        name: "signUp",
        component: signUp,
    },
    {
        path: "/lists",
        name: "lists",
        component: lists,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
