import { Button, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useProduct } from "../context/product/ProductContext";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProductPage = () => {
  const { id } = useParams();
  const { products, updateProduct} = useProduct();
  
  const titleRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const stockRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if(!titleRef.current || !priceRef.current || !descriptionRef.current
      || !categoryRef.current || !imageRef.current || !stockRef.current
    ) return;

    const product = products.find(p => p._id === id);

    titleRef.current.value = product?.title || '';
    priceRef.current.value = product?.price.toString() || '';
    descriptionRef.current.value = product?.description || '';
    categoryRef.current.value = product?.category || '';
    imageRef.current.value = product?.image || '';
    stockRef.current.value = product?.stock.toString()  || '';
  }, [products, id])
  
  const handleSubmit = async () => {
    if(!titleRef?.current?.value) {
      toast("Title is required!", {icon: 'ℹ️'})
      return;
    }

    if(!priceRef?.current?.value) {
      toast("Price is required!", {icon: 'ℹ️'})
      return;
    }

    const product = {
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
      category: categoryRef.current?.value,
      image: imageRef.current?.value,
      price: Number(priceRef.current?.value),
      stock: Number(stockRef.current?.value),
    }

    if(!id) {
      toast.error("Product not found");
      return;
    } 

    const success = await updateProduct(id, product);
    if(success) navigate("/products");
  }

  return <>
    <div className="update-product-box">
      <Typography variant="h5" gutterBottom className="head-title">Update Product</Typography>
      <label htmlFor="title">Title</label>
      <input ref={titleRef} name="title" id="title" />

      <label htmlFor="description">Description</label>
      <input ref={descriptionRef} name="description" id="description" />

      <label htmlFor="category">Category</label>
      <input ref={categoryRef} name="category" id="category" />

      <label htmlFor="image">Image</label>
      <input ref={imageRef} name="image" id="image" />

      <label htmlFor="price">Price</label>
      <input ref={priceRef} type="number" name="price" id="price" />

      <label htmlFor="stock">Stock</label>
      <input ref={stockRef} type="number" name="stock" id="stock" />

      <Button onClick={handleSubmit} variant='contained' color='success' fullWidth sx={{mt: 2}}>Update</Button>
    </div>
  </>
}

export default UpdateProductPage;