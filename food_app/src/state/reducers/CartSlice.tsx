import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store';
import { v4 as uuid } from "uuid";


interface CartItem {
    isveg: boolean;
    id: string;
    name: string;
    price: number;
    quantity: number;
    cartPrice?: number;
    isCustomizable?: boolean;
    customizations?: any[];
}


interface RestauranDetails {
    id: string;
    name: string;
    discount: string;
    discountAmount: string;
    time: string;
    distance: string;
    rating: number;
    imageUrl: string
}

interface RestauranCart {
    restaurant: RestauranDetails;
    items: CartItem[];
}

interface CartState {
    carts: RestauranCart[];
}

const initialState: CartState = {
    carts: [],
};

export const cartSLice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (
            state,
            action: PayloadAction<
                {
                    restaurant: RestauranDetails;
                    item: CartItem
                }
            >
        ) => {
            const { restaurant, item } = action.payload;
            const existingrestaurantCart = state.carts.find(cart => cart?.restaurant?.id === restaurant?.id);
            if (existingrestaurantCart) {
                const existingItem = existingrestaurantCart?.items?.find(cartItem => cartItem?.id === item?.id);

                if (existingItem) {
                    existingItem.quantity += 1;
                    existingItem.cartPrice = (existingItem.cartPrice || 0) + existingItem?.price
                } else {
                    existingrestaurantCart?.items?.push({
                        ...item,
                        quantity: 1,
                        cartPrice: item?.price
                    })
                }
            }
            else {
                state.carts.push({
                    restaurant,
                    items: [{ ...item, quantity: 1, cartPrice: item?.price }]
                })
            }
        },

        removeItemFromCart: (
            state,
            action: PayloadAction<
                {
                    restaurant_id: string;
                    itemId: string
                }
            >
        ) => {
            const {itemId,restaurant_id} = action?.payload;
            const restaurantCart = state?.carts?.find(
                cart=> cart?.restaurant?.id === restaurant_id,
            );
            if(!restaurantCart) return;
            const itemIndex = restaurantCart.items?.findIndex(item => item?.id === itemId)
            if(itemIndex !== -1){
                const item = restaurantCart?.items[itemIndex]
                if(item.quantity > 1){
                    item.quantity -= 1;
                    item.cartPrice = (item.cartPrice || 0) - item?.price
                }else{
                    restaurantCart.items.splice(itemIndex, 1);
                }
            }

            if(restaurantCart.items.length === 0){
                state.carts = state.carts.filter(cart => cart.restaurant.id != restaurant_id,);
            }
         },


        clearAllCarts: (state) => {
            state.carts = []
        },
        clearAllRestaurantCart: (state, action: PayloadAction<{ restaurant_id: string }>) => {
            const { restaurant_id } = action.payload
            state.carts = state.carts.filter(cart => cart?.restaurant?.id !== restaurant_id)
        }
    }
});


export const { addItemToCart, removeItemFromCart, clearAllCarts, clearAllRestaurantCart } = cartSLice.actions;

export const selectCart = (state: RootState) => state.cart

export const selectRestaurantCart = (restaurantId: string) =>
    createSelector(
        (state: RootState) =>
            state.cart.carts.find(cart => cart.restaurant.id === restaurantId),
        restaurantCart => (restaurantCart ? [...restaurantCart.items] : [])
    );

export const selectRestaurantCartItem = (
    restaurantId: string,
    itemId: string
) => createSelector(
    (state: RootState) =>
        state.cart.carts.find(cart => cart.restaurant.id === restaurantId)?.items,
    items => items?.find(item => item?.id === itemId) || null,
);

export default cartSLice.reducer;