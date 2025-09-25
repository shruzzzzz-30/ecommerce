import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import AuthProvider from "./context/auth/AuthProvider";
import LoginPage from "./pages/LoginPage";
import LoadingProvider from "./context/loading/LoadingProvider";
import Layout from "./layout/Layout";
import CartPage from "./pages/CartPage";
import CartProvider from "./context/cart/CartProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import ProductProvider from "./context/product/ProductProvider";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";
import UpdateProductPage from "./pages/UpdateProductPage";

function App() {
  return (
    <>

      <LoadingProvider>
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <BrowserRouter>//client side routing    

                <Routes>///all routes of app    
                  <Route path="/" element={<Layout />}>//each path and components to render 
                    <Route index element={<HomePage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route element={<ProtectedRoute />}>
                      <Route path="cart" element={<CartPage />} />
                      <Route path="checkout" element={<CheckoutPage />} />
                      <Route path="orders" element={<OrdersPage />} />
                      <Route path="products" element={<ProductsPage />} />
                      <Route path="add-product" element={<AddProductPage />} />
                      <Route path="update-product/:id" element={<UpdateProductPage />} />
                    </Route>
                  </Route>
                </Routes>

              </BrowserRouter>
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </LoadingProvider>
    </>
  );
}

export default App;
