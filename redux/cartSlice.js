import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		products: [],
		qty: 0,
		total: 0,
	},

	reducers: {
		addProduct: (state, action) => {
				state.products.push(action.payload);
				state.qty++;
				state.total += action.payload.price * action.payload.qty;
		},
		reset: state => {
			console.log(state)
			state.products = [];
			state.qty = 0;
			state.total = 0;
		},
		removeItem: (state, action) => {
			console.log(action.payload)
			state.products = state.products.filter(product => product._id !== action.payload._id);
			state.qty--;
			state.total -= action.payload.price * action.payload.qty;
		}
	}
})

export const {addProduct, reset, removeItem} = cartSlice.actions;
export default cartSlice.reducer;