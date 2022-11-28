import { createSlice } from "@reduxjs/toolkit";

createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        totalAmount: 0,
    },
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id)
            //this adds a new item to our existing items array
            if (!existingItem) {
                state.items.push({
                    itemId: newItem.id,
                    price: newItem.price, 
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.name,
                });
                
            } else {        //this will update amount of an existing item
                existingItem.quantity = existingItem.quantity + 1;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        removeItemFromCart() {},
    },
});