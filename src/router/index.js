import { createRouter, createWebHistory } from 'vue-router';
import PreviewDesktop from '../views/PreviewDesktop.vue';
import BookPreview from '../views/BookPreview.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import AuthorSignup from '../views/AuthorSignup.vue';
import AuthorSignupInfo from '../views/AuthorSignupInfo.vue';
import ReaderDesktop from '../views/ReaderDesktop.vue';
import AuthorDesktop from '../views/AuthorDesktop.vue';
import Daily from '../views/Daily.vue';

const routes = [
  { path: '/', component: PreviewDesktop },
  { path: '/book/:id', component: BookPreview },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/author-signup', component: AuthorSignup },
  { path: '/author-signup-info', component: AuthorSignupInfo },
  { path: '/author-desktop', component: AuthorDesktop },
  { path: '/reader-desktop', component: ReaderDesktop },
  { path: '/daily', name: 'Daily', component: Daily },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
