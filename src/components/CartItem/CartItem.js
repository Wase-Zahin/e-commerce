import "./CartItem.css";
import { AiOutlineDelete } from 'react-icons/ai';
import { AiFillMinusCircle } from 'react-icons/ai';
import { FcPlus } from 'react-icons/fc';

const CartItem = ({ cart, setCart, cartItem, id }) => {

    const handleInputChange = (e, id) => {
        const { name, value } = e.target;
        const newCart = cart.map((cartItem) => {
            if (cartItem.id === id) {
                return { ...cartItem, [name]: value }
            } else return cartItem;
        })
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }

    const handleRemoveItem = (id) => {
        const newCart = cart.filter((cartItem) => cartItem.id !== id);
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }

    const incrementOnClick = (id) => {
        const newCart = cart.map((cartItem) => {
            if (cartItem.id === id) {
                return { ...cartItem, counter: cartItem.counter + 1 }
            } else return cartItem;
        })
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }

    const decrementOnClick = (id) => {
        const newCart = cart.map((cartItem) => {
            if (cartItem.id === id) {
                const newCounter = cartItem.counter > 0 ? cartItem.counter - 1 : 0;
                return { ...cartItem, counter: newCounter };
            } else return cartItem;
        });
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }


    return (
        <div className="cartItems">
            <img src={cartItem.image} alt={cartItem.title} className="pic"></img>
            <div className="itemDetailsDiv">
                <AiOutlineDelete onClick={() => handleRemoveItem(id)} className="removeIcon" />
                <h3 className="itemTitle">{cartItem.title}</h3>
                <div className="itemDetails">
                    <div>
                        <h4>Item Category</h4>
                        <p>{cartItem.category}</p>
                    </div>

                    <div className="cartPriceQntt">
                        <div>
                            <h4>Price</h4>
                            <p>{cartItem.price}</p>
                        </div>

                        <div className="quantityWrapper">
                            <div className="quantity">
                                <h4>Quantity:</h4>
                                <div className="iconInput">
                                    <AiFillMinusCircle onClick={() => decrementOnClick(id)} className="minusIcon" />
                                    <input
                                        type="text"
                                        name="counter"
                                        key={cartItem.counter}
                                        value={cartItem.counter}
                                        min="0"
                                        // not let user enter nonnumerical data
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/\D/g, ""); // Allow only digits
                                            if (e.target.value < 0) {
                                                e.target.value = 0; // Ensure value is not negative
                                            }
                                        }}
                                        onChange={(e) => handleInputChange(e, id)}
                                    ></input>
                                    <FcPlus onClick={() => incrementOnClick(id)} className="plusIcon" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem;