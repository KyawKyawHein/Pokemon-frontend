import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useStateContext } from '../context/StateContext';

const CartProduct = (props) => {
    const {currentUser} = useStateContext()
    const { product,cart,setCart,setTotalPrice } = props
    const [remainQuantity,setRemainQuantity] = useState(product.stock_quantity-1)
    const [quantityCount,setQuantityCount] = useState(1)
    const reduceQuantity = ()=>{
        if(quantityCount>1){
            setQuantityCount(quantityCount-1)
            setRemainQuantity(remainQuantity+1)
            setTotalPrice((prev) => prev - product.price)
            
            const cartItemIndex = cart.findIndex(c => c.product_id == product.id);
            if (cartItemIndex != -1) {
                const updateItems = cart.slice();
                updateItems[cartItemIndex] = { ...cart[cartItemIndex], quantity: cart[cartItemIndex].quantity - 1 };
                setCart(updateItems);
            }
        }
        console.log(cart);
    }
    const addQuantity = () => {
        if(product.stock_quantity>quantityCount){
            setQuantityCount(quantityCount + 1)
            setRemainQuantity(remainQuantity-1)
            setTotalPrice((prev)=>prev+product.price)
            
            const cartItemIndex = cart.findIndex(c=>c.product_id==product.id);
            if(cartItemIndex != -1){
                const updateItems =  cart.slice();
                updateItems[cartItemIndex] = {...cart[cartItemIndex],quantity:cart[cartItemIndex].quantity+1};
                setCart(updateItems);
            }
        }
    }
    return (
        <div className='flex gap-3 select-none p-3 justify-between border'>
            <img src={"http://127.0.0.1:8000/storage/" + product.image} className='w-[100px] rounded' alt="image" />
            <div className="flex flex-col justify-between gap-3">
                <div className="">
                    <h4 className="font-bold text-2xl">{product.name}</h4>
                    <p className="font-mono">${product.price} <small>per card</small></p>
                </div>
                <p><span className="text-red-500 font-bold">{remainQuantity}</span> <span className="text-gray-400">card{remainQuantity > 1 ? 's' : ''} left</span></p>
            </div>
            <div className="flex flex-col justify-between">
                <div className="flex gap-2 text-blue-500 items-center">
                    <b>{quantityCount}</b>
                    <div className="flex flex-col">
                        <FontAwesomeIcon onClick={addQuantity} icon={faAngleUp} />
                        <FontAwesomeIcon onClick={reduceQuantity} icon={faAngleDown} />
                    </div>
                </div>
                <div className="flex flex-col">
                    <small>price</small>
                    <b>${product.price*quantityCount}</b>
                </div>
            </div>
        </div>
    );
}

export default CartProduct;