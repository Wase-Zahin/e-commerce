import "./CartItem.css";
import { MdOutlineRemoveCircle } from 'react-icons/md';

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

    return (
        <div className="cartItems">
            <img src={cartItem.image} alt={cartItem.title} className="pic"></img>
            <div className="itemDetailsDiv">
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
                                <h4>Quantity</h4>
                                <input
                                    type="number"
                                    name="counter"
                                    key={cartItem.counter}
                                    value={cartItem.counter}
                                    min="0"
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                    onChange={(e) => handleInputChange(e, id)}
                                ></input>
                            </div>
                            <MdOutlineRemoveCircle className="removeIcon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem;