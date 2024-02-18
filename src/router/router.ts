import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import GameView from "../views/GameView.vue";
import { useGameStore } from "../stores/GameStore";

const base = '/coin-perdus-wow';
const routes:  RouteRecordRaw[] = [
  {
    path: '/',
    redirect: base + '/',
  },
  {
    name: 'Home',
    path: base + '/',
    component: HomeView,
  },
  {
    path: '/game',
    redirect: base + '/game',
  },
  {
    name: 'Game',
    path: base + '/game',
    component: GameView
  }
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  const gameStore = useGameStore();
  if(to.path !==  '/game' && to.path !== base + '/game') {
    gameStore.setSelected(null);
    next();
  } else if((to.path === '/game' || to.path === base + '/game') && gameStore.selected === null) {
    next({ name: 'Home'});
  } else {
    next();
  }
});

export default router;