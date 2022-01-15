import axios from 'axios';
import {API_URL} from '../Constants';
import File from '../Files/File';

const Products = {
  addProduct: async (product, token) => {
    const promises = product.images.map(async (image, index) => {
      const remoteUri = File.uploadFiles(image);
      return remoteUri;
    });
    const URIs = await Promise.all(promises);
    let data = {
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      price: product.price,
      promotion: product.promotion,
      discount: product.discount,
      images: URIs,
      colors: product.colors,
      sizes: product.sizes,
    };
    return axios.post(`${API_URL}/products`, data, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
  editProduct: async (newImages, product, token) => {
    console.log(product.id);
    const promises = newImages.map(async (image, index) => {
      const remoteUri = File.uploadFiles(image);
      return remoteUri;
    });
    const URIs = await Promise.all(promises);
    let data = {
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      price: product.price,
      promotion: product.promotion,
      discount: product.discount,
      images: [...product.images, ...URIs],
      colors: product.colors,
      sizes: product.sizes,
    };
    return axios.put(`${API_URL}/products/${product.id}`, data, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
  getProducts: (token) => {
    return axios.get(`${API_URL}/products/myProducts`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
  deleteProduct: (productId, token) => {
    return axios.delete(`${API_URL}/products/${productId}`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
};
export default Products;
