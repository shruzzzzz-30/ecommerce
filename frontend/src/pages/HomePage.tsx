import Grid from "@mui/material/Grid2";
import ProductCard from "../components/ProductCard";
import { useProduct } from "../context/product/ProductContext";

const HomePage = () => {
  const { products } = useProduct();

  return (
    <>
      <h2 style={{marginTop: 0}}>Products</h2>
      <Grid container spacing={2}>
        {products.map((prod) => (
          <Grid key={prod._id} size={{ xs: 6, md: 3 }}>
            <ProductCard product={prod} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default HomePage;