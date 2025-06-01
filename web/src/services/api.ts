const envUrl = import.meta.env.VITE_API_URL;
export const API_BASE_URL = envUrl || 'http://localhost:3333';

export const fetcher = async (url: string) => {
  const res = await fetch(`${API_BASE_URL}${url}`);
  if (!res.ok) throw new Error('Erro ao buscar dados da API');
  return res.json();
};
