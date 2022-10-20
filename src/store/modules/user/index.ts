import { defineStore } from 'pinia';
import { getUserAccount } from '../../../api/user/index';
// import { setToken, clearToken } from '../../../utils/auth';
import { UserState } from './types';

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: undefined,
    realName: undefined,
    userName: undefined,
    avatar: undefined
  }),
  getters: {
    userProfile(state: UserState): UserState {
      return { ...state };
    },
  },
  actions: {
    // 获取用户信息
    async getUserAccountInfo(cookie: any) {
      const result = await getUserAccount(cookie)
      this.$patch({ id: result.profile.userId, userName: result.profile.userName, avatar: result.profile.avatarUrl })
    }
  }
})
