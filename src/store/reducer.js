import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDrinks } from '../service/Service';

export const fetchDrinks = createAsyncThunk(
    'drinkControl/fetchDrinks',
    async (_, { rejectWithValue }) => {
        const request = await getDrinks('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail', rejectWithValue);

        return request;
    }
)

const drinkControlReducer = createSlice({
    name: 'drinkControl',
    initialState: {
        drinkList: [],
        status: null,
        error: null,
        showLikesDrinkStatus: false,
        likeDrinkList: []
    },

    reducers: {
        likeDrinks(state, action) {
            const {drinkList,likeDrinkList} = state;
            const index = drinkList.findIndex(drink => drink.id == action.payload);
            const newDrink = { ...drinkList[index], isLiked: !drinkList[index].isLiked };
            state.drinkList =  [...drinkList.slice(0, index), newDrink, ...drinkList.slice(index + 1)];
            state.likeDrinkList =  [...likeDrinkList.slice(0, index), ...likeDrinkList.slice(index + 1)];
        },
        removeDrink(state, action) {
            state.drinkList = state.drinkList.filter(drink => drink.id !== action.payload)
            state.likeDrinkList = state.likeDrinkList.filter(drink => drink.id !== action.payload)
        },
        toggleShowLikesDrinks(state, action) {
            if(action.payload) {
                state.likeDrinkList = state.drinkList.filter(drink => drink.isLiked == action.payload)
            } 
            state.showLikesDrinkStatus = !state.showLikesDrinkStatus
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchDrinks.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(fetchDrinks.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.drinkList = action.payload;
        });
        builder.addCase(fetchDrinks.rejected, (state, action) => {
            state.error = action.payload;
            state.status = "rejected"
        });
    },
});
export const { likeDrinks, removeDrink, toggleShowLikesDrinks } = drinkControlReducer.actions;

export default drinkControlReducer.reducer;
