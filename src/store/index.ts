import { createPinia } from 'pinia';
import { useUserStore } from './modules/user';
import { usePlayerStore } from './modules/player'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export { useUserStore, usePlayerStore };
export default pinia;
