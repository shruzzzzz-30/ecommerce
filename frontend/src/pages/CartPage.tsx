import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from "../context/cart/CartContext";
import Box from '@mui/material/Box';
import { Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cart, updateCartItem, removeCartItem, clearCart } = useCart();

  const updateQuantity = (productId: string, quantity: number) => {
    if(quantity < 1) removeCartItem(productId);
    else updateCartItem({ productId, quantity });
  }

  return (
    <>
      {!cart || cart.items.length === 0 ? (
        <>
          <img src="emptyCart.png" className="empty-cart" alt="Empty cart" />
          <h2 className="head-title">Your cart is empty</h2>
        </>
      ) : (
        <Container fixed style={{overflowX: 'auto'}}>
          <h2 className="head-title">Your Cart</h2>
          <Button onClick={clearCart} variant='contained' color='error' size='large' sx={{ml: 'auto', display: 'block', mb: 1}}>
            Clear Cart
          </Button>
          <table className="cart">
            <thead>
              <tr>
                <th></th>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((item) => (
                <tr key={item._id}>
                  <td width={1}> 
                    <IconButton onClick={() => removeCartItem(item.productId._id)} color='error'><DeleteIcon /></IconButton>
                  </td>
                  <td><img src={item.productId.image} /></td>
                  <td>{item.productId.title}</td>
                  <td className="price">RS.{item.productId.price}</td>
                  <td style={{width: '11rem'}}>
                    <IconButton 
                      onClick={() => updateQuantity(item.productId._id, item.quantity - 1)} 
                    ><RemoveIcon /></IconButton>
                    <span className='quantity'>{item.quantity}</span>
                    <IconButton 
                      onClick={() => updateQuantity(item.productId._id, item.quantity + 1)} 
                    ><AddIcon /></IconButton>
                  </td>
                  <td className='total'>RS.{ item.productId.price * item.quantity }</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Box sx={{ display:'flex', flexWrap:'wrap', gap:5, justifyContent:'center', alignItems:'center', mt:3, mx: 'auto' }} >
            <Typography variant='h5'>
              Total: <span className='total' style={{fontSize: '1.75rem'}}>RS.{ cart.totalAmount }</span>
            </Typography>
            <Link to="/checkout">
              <Button variant='contained' color='success' size='large'>Checkout</Button>
            </Link>
          </Box>
        </Container>
      )}
    </>
  );
};

export default CartPage;
