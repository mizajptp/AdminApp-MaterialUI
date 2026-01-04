const BASE_URL = "https://api.escuelajs.co/api/v1";

// CATEGORIES
export const CategoriesService = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/categories`,
        {cache: "no-store"}
    );
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  },

  create: async (data: any) => {
    const res = await fetch(`${BASE_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to create category");
    return res.json();
  },

  update: async (id: number, data: any) => {
    const res = await fetch(`${BASE_URL}/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to update category");
    return res.json();
  },

  delete: async (id: number) => {
    const res = await fetch(`${BASE_URL}/categories/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete category");
    return res.json();
  },
};
