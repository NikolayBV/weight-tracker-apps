import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "@/utils/interfaces";

interface UserState {
    userId: string | null;
    userEmail: string | null;
    userBirthday: string | null;
    userGender: string | null;
    userHeight: number | null;
    setUserId: (id: string) => void;
    setUserData: (data: {
        id: string | null;
        email: string | null;
        birthdayDate: string | null;
        gender: string | null;
        height: number | null;
    }) => void;
    getUserData: () => User;
    clear: () => void;
}

export const useUserStore = create<UserState>()(
    devtools(
        (set, get) => ({
            userId: null,
            userEmail: null,
            userBirthday: null,
            userGender: null,
            userHeight: null,

            setUserId: (id) => set({ userId: id }),

            setUserData: (data) =>
                set({
                    userId: data.id,
                    userEmail: data.email,
                    userBirthday: data.birthdayDate,
                    userGender: data.gender,
                    userHeight: data.height,
                }),

            getUserData: () => {
                const { userId, userEmail, userBirthday, userGender, userHeight } = get();
                return { userId, userEmail, userBirthday, userGender, userHeight };
            },

            clear: () =>
                set({
                    userId: null,
                    userEmail: null,
                    userBirthday: null,
                    userGender: null,
                    userHeight: null,
                }),
        }),
        { name: "UserStore" }
    )
);