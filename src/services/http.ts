const TOKEN = 'public_RiNvjTVVzKLhFNWyzR5fNY68u1GMHLEs';

export const fetchJson = async <T>(url: string): Promise<T> => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errorText}`);
  }

  return res.json() as Promise<T>;
};
