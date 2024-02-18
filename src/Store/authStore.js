import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAuth = create(
  persist(
    (set) => ({
      auth: {
        isAuth: false,
        token: null,
        user: null
        
      },
      refresh_token: null,

      storeRefreshToken: (refreshToken) => set({ refresh_token: refreshToken }),

      getRefreshToken: () => state.refresh_token,

      connexion: (token, user) => set({ auth: {isAuth: true, token: token, user: user} }),
      logout: () => set({auth: {isAuth: false, token: null, user: null}}),
   
    refreshAccessToken: async () => {
      try {
          const refreshToken = state.refresh_token;

          const res = await axios.post('http://localhost:4000/auth/refresh-token', {
              refreshToken,
          });

          if (res.data.token) {
              set({ token: res.data.token });
          } else {
              throw new Error('Failed to refresh access token');
          }
      } catch (error) {
          console.log(error);
         
      }
  }, }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage), 
    },
  ),
  
)