import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext'
const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    doorNo: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: cartItems[item._id],
        image: item.image,
      }));

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong");
    }
  };

  const navigate = useNavigate()

  useEffect(()=>{
    if (!token) {
      navigate('/cart')
    } else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])


  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='Enter First Name' required />
          <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Enter Last Name' required />
        </div>
        <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Enter Email address' required />
        <input name='doorNo' onChange={onChangeHandler} value={data.doorNo} type="text" placeholder='Enter Your Door-No:/' required />
        <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Enter Your Address/Street' required />
        <div className='multi-fields'>
          <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='Enter Your City' required />
          <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='Enter Your State' required />
        </div>
        <div className="multi-fields">
          <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="number" placeholder='Enter the ZipCode' required />
          <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Enter Your Country' required />
        </div>
        <input name='phone' onChange={onChangeHandler} value={data.phone} type="number" placeholder='Enter Your Phone Number' required />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit'>Proceed to Checkout...</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
