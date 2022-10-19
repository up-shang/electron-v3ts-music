import { createPinia } from 'pinia';
import { useUserStore } from './modules/user';

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export { useUserStore };
export default pinia;
