// lib/api.ts
export async function loginReqres(email: string, password: string) {
  const res = await fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "reqres-free-v1",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "unknown" }));
    throw new Error(err.error || "Login failed");
  }
  return res.json();
}

export async function registerReqres(email: string, password: string) {
  const res = await fetch("https://reqres.in/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "reqres-free-v1",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Register failed");
  return res.json();
}

export async function fetchProtectedData() {
  const res = await fetch(
    `https://reqres.in/api/users/${Math.floor(Math.random() * 10 )+ 1}`,
    {
      headers: { "x-api-key": "reqres-free-v1" },
    }
  );
  if (!res.ok) throw new Error("Not authorized");
  return res.json();
}

export async function fetchUsers(page = 1) {
  const res = await fetch(`https://reqres.in/api/users?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "reqres-free-v1",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json(); // { page, per_page, total, data: [...] }
}

export async function fetchProducts() {
  const res = await fetch("https://dummyjson.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
