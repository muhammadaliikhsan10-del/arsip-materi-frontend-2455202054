export async function ambilMateri() {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
  let response;

  try {
    response = await fetch(`${baseUrl}/materi`);
  } catch {
    throw new Error('Tidak dapat terhubung ke server API. Periksa koneksi atau status server.');
  }

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const pesan = payload?.error || payload?.pesan || `Gagal memuat data materi (HTTP ${response.status})`;
    throw new Error(pesan);
  }

  if (Array.isArray(payload)) {
    return payload;
  }

  return Array.isArray(payload?.data) ? payload.data : [];
}