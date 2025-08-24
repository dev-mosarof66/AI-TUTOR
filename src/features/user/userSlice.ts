import { createSlice } from "@reduxjs/toolkit";

interface PlanProps {
    title: string;
}

interface UserProps {
    email: string;
    currentPlan: string | null;
    plans: PlanProps[];
}

interface UserState {
    user: UserProps | null;
    loading: boolean,
    isError: boolean,
    errorMessage: string | null
}

const initialState: UserState = {
    user: null,
    loading: false,
    isError: false,
    errorMessage: null
};


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isError = false;
            state.errorMessage = null;
            state.loading = false;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },

});

export default userSlice.reducer;
