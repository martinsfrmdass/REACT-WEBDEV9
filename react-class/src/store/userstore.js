
import { create } from "zustand"
import {persist} from "zustand/middleware"
import { axiosInstace, getErrorMessage } from "../api/axios"

export const useUserStore = create(persist(
    
    (set) => ({
    user: null,
    isLoggedIn: false,

    signup: async (formData) => {
        try {
            const response = await axiosInstace.post("/signup", formData)
            set({user: response.data.data, isLoggedIn: true})

            return response.data
        } catch (error) {
            throw new Error(getErrorMessage(error))
        }
    },

     login: async (formData) => {
        try {
            const response = await axiosInstace.post("/login", formData)
            set({user: response.data.data, isLoggedIn: true})

            return response.data
        } catch (error) {
            throw new Error(getErrorMessage(error))
        }
    },

    logOut: () => set({user: null, isLoggedIn: false})
}), 

  {
    name: "user-storage",
    partialize: (state) => ({user: state.user, isLoggedIn: state.isLoggedIn})
  }
))

