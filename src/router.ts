import { createRouter, createWebHistory } from "vue-router";
import  Home  from "./views/Home.vue";
import Edit from "./views/Edit.vue"
export const router = createRouter({
	history: createWebHistory(),
	routes:[
		{path: "/", component: Home},
		{path: "/edit", component: Edit}
	]
})