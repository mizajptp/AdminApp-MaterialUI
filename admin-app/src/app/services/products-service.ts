// import { ServiceBase } from "./service-base";

// export class ProductsService extends ServiceBase {
//   static getProducts = async () => {
//     var productsResp = await fetch(this.getUrl("/products"), {
//       cache: "no-store",
//     });
//     var products = await productsResp.json();
//     return products;
//   };
// }

const BASE_URL = "https://api.escuelajs.co/api/v1";

// PRODUCTS
export const ProductsService = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/products`,
      {cache: "no-store"}
    );
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  },

  getPaginated: async (offset: number, limit: number) => {
    const res = await fetch(
      `${BASE_URL}/products?offset=${offset}&limit=${limit}`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch paginated products");
    return res.json();
  },

  getTotal: async () => {
    const res = await fetch(`${BASE_URL}/products`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch total products");

    const data = await res.json();
    return data.length;
  },
  
  getById: async (id: number) => {
    const res = await fetch(`${BASE_URL}/products/${id}`,
      {cache: "no-store"}
    );
    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
  },

  create: async (data: any) => {
    const res = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to create product");
    return res.json();
  },

  update: async (id: number, data: any) => {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to update product");
    return res.json();
  },

  delete: async (id: number) => {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete product");
    return res.json();
  },
};
