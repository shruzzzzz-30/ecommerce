import { TextField, Button, Box, Typography } from "@mui/material";
import { useRef } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/cart/CartContext";//hook for cart operations including checkout

const CheckoutPage = () => {
  const { cart, checkout } = useCart();
  const addressRef = useRef<HTMLInputElement>(null);
  
  if(!cart || cart.items.length === 0) {
    return <Navigate to="/" replace />
  }
  
  const handleSubmit = async () => {
    if(!addressRef?.current?.value) {
      toast("Address is required!", {icon: 'ℹ️'})
      return;
    }
    const address = addressRef.current.value;

    await checkout(address);
  }

  return ( <>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
        border: "1px solid #ccc",
        borderRadius: "8px",
        maxWidth: "600px",
        margin: "auto"
      }}
    >
      <Typography variant="h5" gutterBottom className="head-title">Checkout</Typography>
      <TextField inputRef={addressRef} label="Address" name="address" fullWidth sx={{mt: 2}} />
      <Box sx={{ display:'flex', flexWrap:'wrap', gap:5, justifyContent:'center', alignItems:'center', mt:3, mx: 'auto' }} >
        <Typography variant='h5'>
          Total: <span className='total' style={{fontSize: '1.75rem'}}>RS.{ cart.totalAmount }</span>
        </Typography>
        <Button onClick={handleSubmit} variant='contained' color='success' size='large'>Order Now</Button>
      </Box>
    </Box>
  </> );
}

export default CheckoutPage;