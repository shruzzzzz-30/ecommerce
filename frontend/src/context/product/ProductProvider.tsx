import { useCallback, useEffect, useState, type PropsWithChildren } from "react";
import { ProductContext } from "./ProductContext";
import type { IProduct } from "../../types/Product";
import { useAuth } from "../auth/AuthContext";
import { BASE_URL } from "../../constants/baseUrl";
import toast from "react-hot-toast";
import { useLoading } from "../loading/LoadingContext";


const ProductProvider = (props: PropsWithChildren) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { token } = useAuth();
  const { setIsLoading } = useLoading();

  const addProduct = async (data: Partial<IProduct>) => {
    setIsLoading(true);  //add product
    try {
      const res = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const result = await res.json();

      if(res.ok) {
        toast.success('Product successfully added!');
        getProducts();
        setIsLoading(false);
        return true;
      }
      
      toast.error(result.message);
      setIsLoading(false);
      return false;
    } catch(error) {
      console.error(error);
      toast.error("Something wrong in the server! Please try again later");
      setIsLoading(false);
      return false;
    }
  }

  const updateProduct = async (id: string, data: Partial<IProduct>) => {    //update product
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const result = await res.json();

      if(res.ok) {
        toast.success('Product successfully updated!');
        getProducts();
        setIsLoading(false);
        return true;
      }
      
      toast.error(result.message);
      setIsLoading(false);
      return false;
    } catch(error) {
      console.error(error);
      toast.error("Something wrong in the server! Please try again later");
      setIsLoading(false);
      return false;
    }
  }

  const deleteProduct = async (id: string) => {    //delete product
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const result = await res.json();

      if(res.ok) {
        toast.success('Product successfully deleted!');
        getProducts();
        setIsLoading(false);
        return true;
      }
      
      toast.error(result.message);
      setIsLoading(false);
      return false;
    } catch(error) {
      console.error(error);
      toast.error("Something wrong in the server! Please try again later");
      setIsLoading(false);
      return false;
    }
  }

  const getProducts = useCallback(async () => {      //get all products 
    try {
      const res = await fetch(`${BASE_URL}/products`);
      const data = await res.json();

      console.log(data);

      if(res.ok) {
        setProducts([...data]);
        return;
      }

      console.error(data);
      toast.error("Something wrong in the server!");
    } catch (error) {
      console.error(error);
      toast.error("Something wrong in the server!");
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts])

  return <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
    {props.children}
  </ProductContext.Provider>
}

export default ProductProvider;