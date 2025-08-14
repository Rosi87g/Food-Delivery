import userModel from "../models/Usermodel.js";

// add to cart

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ Use decoded token
    const { itemId } = req.body;

    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "Missing userId or itemId" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartCount = userData.cartCount || {};
    cartCount[itemId] = (cartCount[itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartCount });

    res.json({ success: true, message: "Item added to cart", cartCount });
  } catch (error) {
    console.error("Add to Cart Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


// Remove from Cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ Use decoded token
    const { itemId } = req.body;

    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "Missing userId or itemId" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartCount = userData.cartCount || {};

    if (cartCount[itemId] && cartCount[itemId] > 0) {
      cartCount[itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartCount });

    res.json({ success: true, message: "Item removed from cart", cartCount });
  } catch (error) {
    console.error("Remove From Cart Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get Cart
const getCart = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ Use decoded token
    const { itemId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "Missing userId" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartCount = userData.cartCount || {};

    res.json({ success: true, cartCount });
  } catch (error) {
    console.error("Get Cart Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export { addToCart, removeFromCart, getCart };
