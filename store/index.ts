import create from 'zustand'

export const useAuth = create((set) => ({
    user: null,
    initializing:true,
    setUser: (user: any) => set((state: any) => ({...state, user })),
    removeUser: () => set((state: any) => ({ ...state, user: null })),
    setInitializing: (bool:boolean) => set((state:any) => ({...state,initializing:bool}))
}))

export const useReset = create((set) => ({
    reset: {
        email: null,
        token: null,
    },
    setReset: (obj: {email:string,token:string}) => set((state: any) => ({
        ...state, reset:obj
    }))
}))

export const useArtisanSearch = create((set) => ({
    searchTerm:'',
    setSearchTerm: (term: string) => set((state: any) => ({
        ...state,searchTerm:term
    }))
}))