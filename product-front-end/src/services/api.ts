import axios from "axios";
import type { IProducts } from "../types/IProducts";
import { data } from "react-router-dom";
import { id } from "zod/v4/locales";


const API = import.meta.env.VITE_URL_API_PRODUCTS

const axiosConnect = axios.create({
    baseURL: API,
})

export const createProduct = async(data: IProducts) => {
  const response = await axiosConnect.post('/products',data);;
  return response;
}



export const getProducts = async (search?: string, page: string = 1) => {
  const response = await axiosConnect.get(`/products`, {
    params: {
      name: search,
      page: page,
      limit: "16"
    }
  });
  return response.data; 
}
export const getOneProduct = async(param?: string) => {
    const response =  await axiosConnect.get(`/products/${param}`);
     return response;
}


export const deleteProducts = async(id: number) => {
    const response =  await axiosConnect.delete(`/products/${id}`);
     return response;
}

export const editProduct = async(id: number,data: IProducts) => {
    const response =  await axiosConnect.patch(`/products/${id}`,data);
     return response;
}


export const getCategory = async() => {
    const response =  await axiosConnect.get(`/category`);
     return response;
}




