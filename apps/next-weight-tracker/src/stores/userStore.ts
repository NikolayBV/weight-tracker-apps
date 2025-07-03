import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "@/utils/interfaces";

interface UserState {
    id: string | null;
    email: string | null;
    birthdayDate: string | null;
    gender: string | null;
    height: number | null;
    setUserId: (id: string) => void;
    setUserData: (data: User) => void;
    getUserData: () => User;
    clear: () => void;
}

export const useUserStore = create<UserState>()(
    devtools(
        (set, get) => ({
            id: null,
            email: null,
            birthdayDate: null,
            gender: null,
            height: null,

            setUserId: (id) => set({ id: id }),

            setUserData: (data) =>
                set({
                    id: data.id,
                    email: data.email,
                    birthdayDate: data.birthdayDate,
                    gender: data.gender,
                    height: data.height,
                }),

            getUserData: () => {
                const { id, height, gender, email } = get();
                return { id, height, gender, email };
            },

            clear: () =>
                set({
                    id: null,
                    email: null,
                    birthdayDate: null,
                    gender: null,
                    height: null,
                }),
        }),
        { name: "UserStore" }
    )
);