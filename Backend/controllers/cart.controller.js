import cartModal from "../Modals/CartModal/cart.modal.js";

// =====================================================
// Add Product to Cart
// =====================================================
export const addProductToCart = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const body = req.body;

    const product = {
      productId: body._id,
      title: body.title,
      price: body.discountPrice,
      quantity: body.quantity || 1,
      image: body.mainImage,
    };

    const cart = await getUserCart(userId);

    const item = cart.items.find(
      (item) => item.productId.toString() === product.productId.toString(),
    );

    if (item) {
      item.quantity += product.quantity;
    } else {
      cart.items.push(product);
    }

    await cart.save();

    res.status(201).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Could not add item to cart",
    });
  }
};

// =====================================================
// Get or Create User Cart (Internal Helper)
// =====================================================
const getUserCart = async (userId) => {
  try {
    let cart = await cartModal.findOne({ user: userId });

    if (!cart) {
      try {
        cart = await cartModal.create({ user: userId, items: [] });
      } catch (err) {
        if (err.code === 11000) {
          cart = await cartModal.findOne({ user: userId });
        } else {
          throw err;
        }
      }
    }

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =====================================================
// Get All Cart Items By User
// =====================================================
export const getAllCartItemsByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const cart = await cartModal.findOne({ user: userId });

    res.status(200).json({
      success: true,
      data: cart?.items || [],
    });
  } catch (error) {
    res.json({
      success: false,
      message: error?.message || "cannot fetch from cart",
    });
  }
};

// =====================================================
// Get Cart By ID
// =====================================================
export const getSingleItemFromCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundedItem = await cartModal.findById(id);

    res.status(200).json({
      success: true,
      foundedItem,
    });
  } catch (error) {
    res.json({
      message: error?.message || "something went wrong to get item",
    });
  }
};

// =====================================================
// Increment Cart Product Quantity
// =====================================================
export const incrementCartProductQuntity = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;

    const cart = await getUserCart(userId);
    const item = cart.items.find((i) => i.productId.toString() === productId);

    if (item) {
      item.quantity += 1;
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =====================================================
// Decrement Cart Product Quantity
// =====================================================
export const decrementCartProductQuntity = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;

    const id = productId.productId;

    const cart = await getUserCart(userId);
    const item = cart.items.find((i) => i.productId.equals(id));

    if (item) {
      item.quantity -= 1;

      if (item.quantity === 0) {
        cart.items = cart.items.filter((i) => !i.productId.equals(id));
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      error: error?.message || "something went wrong",
    });
  }
};

// =====================================================
// Remove Item From Cart
// =====================================================
export const removeItemFromCart = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;

    const cart = await getUserCart(userId);

    if (!cart) {
      return res.status(404).json({
        message: "not founded , plaese add product",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId.toString(),
    );

    await cart.save();

    res.status(201).json({
      success: true,
      message: "item removed successfully",
      data: cart,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};

// =====================================================
// Clear Cart
// =====================================================
export const clearCart = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const cart = await getUserCart(userId);

    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: `cart item removed of user:${userId}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
    });
  }
};
