import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AuthState {
    accessToken: string | null;
    setAccessToken: (token: string) => void;
    clear: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
    setAuthenticated: (isAuthenticated: boolean) => void;
    setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    devtools(
        (set) => ({
            accessToken: null,
            isAuthenticated: false,
            isLoading: true,
            
            
            setAccessToken: (token) => {
                set({ accessToken: token });
                localStorage.setItem('access_token', token);
            },
            clear: () => {
                set({ accessToken: null });
                localStorage.removeItem('access_token');
                if (typeof window !== "undefined") {
                    window.location.href = "/public/login";
                }
            },
            setAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
            setLoading: (isLoading: boolean) => set({ isLoading }),
        }),
        { name: "AuthStore" }
    )
);