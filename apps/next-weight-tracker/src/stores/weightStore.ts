import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Weight } from "@/utils/interfaces";

interface WeightState {
    userWeight: Weight[];
    setUserWeight: (weights: Weight[]) => void;
    clear: () => void;
}

export const useWeightStore = create<WeightState>()(
    devtools(
        persist(
            (set) => ({
                userWeight: [],
                setUserWeight: (weights) => set({ userWeight: weights }),
                clear: () => set({ userWeight: [] }),
            }),
            {
                name: "user-weight-storage",
            }
        ),
        { name: "WeightStore" }
    )
);