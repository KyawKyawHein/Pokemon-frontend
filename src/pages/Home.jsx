import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import { useStateContext } from '../context/StateContext';
import Product from '../components/Product';
import api from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faX } from '@fortawesome/free-solid-svg-icons'
import CartProduct from '../components/CartProduct';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import Payment from "../assets/img/payment.jpg"
import Loading from '../components/Loading';
import SearchNav from '../components/SearchNav';

const Home = () => {
    const {currentUser} = useStateContext();
    const [products,setProducts] = useState(null);
    const [showBtn,setShowBtn] = useState(false);
    const [selectedProducts,setSelectedProducts] = useState([]);
    const [orderStatus,setOrderStatus] = useState(false);
    const [cart, setCart] = useState([]);
    const [totalPrice,setTotalPrice] = useState(0);
    const [paymentSuccess,setPaymentSuccess] = useState(false)
    const [loading,setLoading] = useState(false)
    const [search,setSearch] = useState('')
    const [status, setStatus] = useState(null)
    
    useEffect(()=>{
        setLoading(true)
        api.get('/products').then(({ data }) => {
            setProducts(data)
            setLoading(false)
            if (data.links.next) {
                setShowBtn(true)
            }
        });
    },[])

    useEffect(()=>{
        selectedProducts.map((selectedProduct)=>{
            const product = products.data.filter((p) => p.id == selectedProduct.id);
            setTotalPrice(totalPrice+product[0].price);
        })
    },[selectedProducts])

    const showMore = ()=>{
        if(products.links.next){
            console.log(products.links.next);
            api.get(products.links.next).then(({data})=>{
                setProducts({...data,data:[...products.data,...data.data]})
                setShowBtn(false)
            })
        }else{
            setShowBtn(false)
        }
    }
    const addToCart = (id)=>{
        const selected = products.data.filter((product)=>product.id==id);
        if(!selectedProducts.includes(selected[0])){
            setSelectedProducts([...selectedProducts, selected[0]]);
        }
        setCart([...cart,{
            user_id : currentUser.id,
            product_id : selected[0].id,
            quantity : 1
        }])
    }

    const clearCart = ()=>{
        setSelectedProducts([])
        setCart([])
        setOrderStatus(false)
        setTotalPrice(0)
    }
    const viewCart = ()=>{
        if(!orderStatus){
            if(selectedProducts.length>0){
                setOrderStatus(true);
            }else{
                Toastify({
                    text: "Please choose a product",
                    duration: 3000,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "red",
                    },
                }).showToast();
            }
        }
    }
    const payment = ()=>{
        setPaymentSuccess(true)
        cart.map((data)=>{
            api.post('/payment',data)
            .then(({data})=>{
                api.get('/products').then(({ data }) => {
                    setProducts(data)
                    setStatus(null)
                    setSearch((''))
                    if (!data.links.next) {
                        setShowBtn(false)
                    } else {
                        setShowBtn(true)
                    }
                });
                clearCart();
                setPaymentSuccess(false)
            })
        })
    }
    //search text
    const searchText = (e)=>{
        setLoading(true)
        e.preventDefault()
        const searchText = search.toLowerCase()
        api.post(`/filter?status=${status}&search=${searchText}`)
        .then(({data})=>{
            setLoading(false)
            setProducts(data)
            setShowBtn(false)
        })
    }

    return (
        <>
            <SearchNav search={search} setSearch={setSearch} searchText={searchText} status={status} setStatus={setStatus} />
        {
            loading?
                <Loading/>
            :
            <>
                <div className="flex justify-center">
                    <div className="w-full md:w-[900px] relative">
                        <div className='md:flex flex-wrap justify-center gap-10 mt-4'>
                            {
                                products? products.data.length>0?  products.data?.map((product) => {
                                    return (
                                        <Product key={product.id} product={product} selectedProducts={selectedProducts} addToCart={addToCart} />
                                    )
                                }) : <h1 className='text-center text-red-500 font-bold text-3xl'>Not found</h1>
                                :''
                            }
                        </div>
                        {
                            showBtn &&
                            <div className="text-end my-4">
                                <button onClick={showMore} className='border border-red-500 p-2 md:px-20 rounded rounded-full'>Show more</button>
                            </div>
                        }
                
                        {/* order cart  */}
                        {
                            orderStatus && selectedProducts.length > 0 ?
                                <>
                                    <div className="fixed w-100 border border-yellow-500 bottom-20 text-center left-5 w-100 m-auto md:left-[37%] p-3 bg-white rounded rounded-2xl border shadow shadow-2xl">
                                        {
                                            paymentSuccess ?
                                                <div className=''>
                                                    <img src={Payment} className='h-64' alt="" />
                                                    <p className="font-bold text-center">Payment Success!</p>
                                                </div>
                                                :
                                                <>
                                                    <div className="overflow-y-scroll h-64 ">
                                                        {
                                                            selectedProducts.map((p) => {
                                                                return (
                                                                    <CartProduct key={p.id} product={p} cart={cart} setCart={setCart} setTotalPrice={setTotalPrice} />
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div className="">
                                                        <small onClick={clearCart} className="text-center cursor-pointer">Clear all</small>
                                                        <div className="">
                                                            <div className="flex justify-around gap-0 md:gap-[110px] items-center">
                                                                <h4 className="">Total cards</h4>
                                                                <h4 className='text-red-500 text-end'>
                                                                    {
                                                                        cart ?
                                                                            cart.reduce((prev, cur) => prev + cur.quantity, 0)
                                                                            : 0
                                                                    }
                                                                </h4>
                                                            </div>
                                                            <div className="flex gap-3 text-2xl justify-around items-center">
                                                                <h3 className="font-bold">Total price</h3>
                                                                <h3 className='text-red-500 font-bold'>${totalPrice}</h3>
                                                            </div>
                                                            <button onClick={payment} className='bg-blue-500 rounded rounded-full text-white p-2 px-10 md:px-20 my-2'>Pay Now</button>
                                                        </div>
                                                    </div>
                                                </>
                                        }
                                    </div>
                                    <button onClick={() => setOrderStatus(!orderStatus)} className="flex justify-center items-center fixed bottom-5 left-[40%] md:left-[50%] bg-red-500 text-white p-2 rounded rounded-lg md:px-4 select-none">
                                        <p className=""><FontAwesomeIcon icon={faX} /></p>
                                    </button>
                                </>
                                :
                                <button onClick={viewCart} className="fixed bottom-5 left-[35%] md:left-[48%] bg-blue-500 text-white p-2 rounded rounded-lg md:px-4 select-none">
                                    <p className=""><FontAwesomeIcon className='mr-2' icon={faCartShopping} /> View Cart</p>
                                    <span className="absolute left-[-10px] top-[-10px] bg-red-500 text-white px-2 rounded-full top-0">{selectedProducts.length}</span>
                                </button>
                        }
                    </div>
                </div>
            </>
        }
        </>
    );
}

export default Home;