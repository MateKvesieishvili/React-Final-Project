import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState:{
        loading: false,
        error: null,
        cartItems: [],
    },
    reducers:{
        clearCart:(state)=>{
            state.cartItems = []
        },
        addToCart: (state, action)=>{
            const productId = action.payload._id

            const productInCart = state.cartItems.find((item)=>item.product._id === productId)

            if(productInCart){
                const updatedCart = state.cartItems.map((cartElement)=>{
                    return cartElement.product._id === productId? {
                        ...cartElement, 
                        quantity: cartElement.quantity + 1
                    } : { ...cartElement}
                })
                state.cartItems = updatedCart
            }else{
                state.cartItems.push({product: action.payload, quantity: 1})
            }
        },
        removeFromCart: (state, action)=>{
            const productId = action.payload

            const productInCart = state.cartItems.find((item)=>item.product._id === productId)

            if(productInCart.quantity > 1){
                const updatedCart = state.cartItems.map((cartElement)=>{
                    return cartElement.product._id === productId? {
                        ...cartElement, 
                        quantity: cartElement.quantity - 1
                    } : { ...cartElement}
                })
                state.cartItems = updatedCart
            }else{
                state.cartItems = state.cartItems.filter(
                    (item)=> item.product._id !== productId
                )
            }
        },
    }
})

export const cartReducer = cartSlice.reducer
export const {addToCart, removeFromCart, clearCart} = cartSlice.actions