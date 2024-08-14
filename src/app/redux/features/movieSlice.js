import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react';

const initialState = {
  data:null,
}
export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers:{
     setSelectedMovie:(state,action)=>{
          console.log(action);
          state.data=action.payload;
          return;
     },
     removeMovie(state,action){
        console.log(action);
        state.data=null;

     }

  }
});


export const{removeMovie, setSelectedMovie}=movieSlice.actions;
export default movieSlice.reducer;

