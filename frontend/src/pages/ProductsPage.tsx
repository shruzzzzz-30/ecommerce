import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { useProduct } from '../context/product/ProductContext';

const ProductsPage = () => {
  const { products, deleteProduct } = useProduct();

  return <>
    <Container fixed style={{overflowX: 'auto'}}>
      <h2 className="head-title">All Products</h2>
      <Link to="/add-product">
        <Button variant='contained' color='secondary' sx={{mb: 1}}>Add Product</Button>
      </Link>
      <table className="cart">
        <thead>
          <tr>
            <th></th>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item._id}>
              <td width={1}> 
                <IconButton onClick={() => deleteProduct(item._id)} color='error'><DeleteIcon /></IconButton>
              </td>
              <td><img src={item.image} /></td>
              <td>{item.title}</td>
              <td>{item.category}</td>
              <td className="price">RS.{item.price}</td>
              <td>{item.stock}</td>
              <td><Link to={`/update-product/${item._id}`}><Button variant='outlined' >Update</Button></Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  </>
}

export default ProductsPage;