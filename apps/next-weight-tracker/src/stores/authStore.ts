import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AuthState {
    accessToken: string | null;
    setAccessToken: (token: string) => void;
    clear: () => void;
}

export const useAuthStore = create<AuthState>()(
    devtools(
        (set) => ({
            accessToken: null,
            setAccessToken: (token) => set({ accessToken: token }),
            clear: () => set({ accessToken: null }),
        }),
        { name: "AuthStore" }
    )
);