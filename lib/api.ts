const API = process.env.NEXT_PUBLIC_API_URL;

export async function api<T = any>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...options,
    credentials: "include", // cookie-ს გაგზავნა/მიღება
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const msg = Array.isArray(data?.message)
      ? data.message.join(", ")
      : data?.message;
    throw new Error(msg || "დაფიქსირდა შეცდომა");
  }
  return data as T;
}
