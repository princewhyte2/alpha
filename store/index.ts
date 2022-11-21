import create from 'zustand'

export const useAuth = create((set) => ({
    user: null,
    initializing:true,
    setUser: (user: any) => set((state: any) => ({...state, user })),
    removeUser: () => set((state: any) => ({ ...state, user: null })),
    setInitializing: (bool:boolean) => set((state:any) => ({...state,initializing:bool}))
}))