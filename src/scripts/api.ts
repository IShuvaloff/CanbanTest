import axios from 'axios';
import { Product } from './interfaces';

axios.defaults.baseURL = 'http://localhost/canban-server'; //'https://fakestoreapi.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN'; ??? `Bearer ${this.token}`

export async function loadProducts() {
  return axios
    .get(`/products`)
    .then((res) => {
      return res.data as [Product];
    })
    .catch((err) => {
      throw err;
    });
}

export async function DBProductAdd(product: Product) {
  return axios
    .post(`/products`, product)
    .then((res) => {
      console.log(res.data);
      return res.data[0].result;
    })
    .catch((err) => {
      console.log(err.message);
      return false;
    });
}

export async function DBProductEdit(product: Product) {
  return axios
    .put(`/products`, product)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.message);
      return false;
    });
}
