import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UserState {
    userId: string | null;
    userEmail: string | null;
    userBirthday: string | null;
    userGender: string | null;
    userHeight: number | null;
    setUserId: (id: string) => void;
    setUserEmail: (email: string) => void;
    setUserBirthday: (birthday: string) => void;
    setUserGender: (gender: string) => void;
    getUserData: () => { userId: string | null, userEmail: string | null, userBirthday: string | null, userGender: string | null, height: number | null };
    setUserData: (data: { id: string | null, email: string | null, birthdayDate: string | null, gender: string | null, height: number | null }) => void;
    clearId: () => void;
    clear: () => void;
    clearEmail: () => void;
}

export const useUserStore = create<UserState>()(
    devtools(
        (set, get) => ({
            userId: null,
            userEmail: null,
            userBirthday: null,
            userGender: null,
            setUserId: (id) => set({ userId: id }),
            setUserEmail: (email) => set({ userEmail: email }),
            setUserBirthday: (birthday: string) => set({ userBirthday: birthday }),
            setUserGender: (gender: string) => set({ userGender: gender }),
            clear: () => set({ userId: null, userEmail: null, userBirthday: null, userGender: null }),
            setUserData: (data) => set({ userId: data.id, userEmail: data.email, userBirthday: data.birthdayDate, userGender: data.gender, userHeight: data.height }),
            getUserData: () => {
                const { userId, userEmail, userBirthday, userGender, userHeight } = get();
                return { userId, userEmail, userBirthday, userGender, userHeight };
            },
        }),
        { name: "UserStore" }
    )
);