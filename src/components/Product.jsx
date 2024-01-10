import React, { useState } from 'react';

const Product = ({product,addToCart,selectedProducts,cart,setCart}) => {
    return (
        <>
            <div className="rounded text-center flex flex-col items-center mb-5 md:mb-2">
                <img src={"http://127.0.0.1:8000/storage/"+product.image} className='w-[300px] h-[300px] md:h-[220px] md:w-[220px]' alt="" />
                <h3 className="my-1 text-2xl">{product.name}</h3>
                <p className="text-blue-500 text-center">{product.category}</p>
                <div className="flex justify-center gap-10 my-2 items-center">
                    <span className="text-gray-400">${product.price}</span>
                    {
                        product.stock_quantity==0?
                        <span className="text-gray-400">Out of stock</span>
                        :
                        <span className="text-gray-400">{product.stock_quantity} left</span>
                    }
                </div>
                {
                    product.status =='active'?
                    <button disabled={selectedProducts.includes(product)} onClick={() => addToCart(product.id)} className={`select-none w-full px-3 py-2 rounded rounded-full ${selectedProducts.includes(product) ?  'bg-gray-500 text-white':'bg-yellow-500 hover:bg-yellow-400 text-black'}`}>{selectedProducts.includes(product) ? 'Selected': 'Select Card'}</button>
                    :
                        <button disabled className='select-none w-full px-3 py-2 rounded rounded-full bg-red-500 text-white'>Inactive</button>
                }
            </div>
        </>
    )
}

export default Product;