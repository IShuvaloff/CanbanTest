import axios from 'axios';
import { Product } from './interfaces';

axios.defaults.baseURL = 'https://fakestoreapi.com';
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
