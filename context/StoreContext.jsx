import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:5000";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // ✅ Added

    const addToCart = async (itemId) => {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.warn("Please login to proceed");
            return;
        }

        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

        try {
            const response = await axios.post(
                `${url}/api/cart/add`,
                { itemId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                toast.success(response.data.message);
            }
        } catch (error) {
            console.error("Failed to sync cart with backend:", error.response?.data || error.message);
            toast.error("Failed to add item to cart");
        }

        console.log("Attempting to add item to cart:", itemId);
    };

    const removeFromCart = async (itemId) => {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.warn("Please login to proceed");
            return;
        }

        if (cartItems[itemId] > 0) {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        }

        try {
            const response = await axios.post(
                `${url}/api/cart/remove`,
                { itemId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                toast.info(response.data.message);
            }
        } catch (error) {
            console.error("Failed to sync cart removal with backend:", error.response?.data || error.message);
            toast.error("Failed to remove item from cart");
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItems += cartItems[item];
            }
        }
        return totalItems;
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Failed to fetch food list:", error.message);
            toast.error("Failed to fetch food list");
        }
    };

    const loadCartData = async (token) => {
        const userId = localStorage.getItem("userId");

        try {
            const response = await axios.post(
                `${url}/api/cart/get`,
                { userId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success && response.data.cartCount) {
                setCartItems(response.data.cartCount);
            }
        } catch (error) {
            console.error("Failed to load cart data:", error.response?.data || error.message);
            toast.error("Failed to load cart");
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartItems,
        getTotalCartAmount,
        url,
        token,
        setToken,
        searchQuery,       // ✅ Added
        setSearchQuery     // ✅ Added
    };

    return (
        <StoreContext.Provider value={contextValue}>
            <ToastContainer position="top-right"
                autoClose={1500}
                hideProgressBar={true}
                closeOnClick
                pauseOnHover={false}
                draggable={false}
                theme="dark" />
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
