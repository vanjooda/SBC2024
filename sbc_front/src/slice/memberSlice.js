import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    member : null,
};

const memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
        setMember: (state, action) => {
            state.member = action.payload;
            console.log('memberSlice data : ', state.member);
        },
        clearMember: (state) => {
            state.member = null;
        }
    }
});

export const { setMember, clearMember } = memberSlice.actions;
export default memberSlice.reducer;