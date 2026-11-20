import { useCallback, useEffect, useState } from 'react';
import { ambilMateri } from './api/materi';

export default function App() {
  const [daftarMateri, setDaftarMateri] = useState([]);
  const [memuat, setMemuat] = useState(true);
  const [galat, setGalat] = useState('');

  const muatData = useCallback(async () => {
    setMemuat(true);
    setGalat('');
    try {
      const data = await ambilMateri();
      setDaftarMateri(data);
    } catch (err) {
      setGalat(err?.message || 'Terjadi kesalahan saat memuat data materi.');
    } finally {
      setMemuat(false);
    }
  }, []);

  useEffect(() => {
    muatData();
  }, [muatData]);

  return (
    <main style={{ maxWidth: 820, margin: '2rem auto', padding: '0 1rem', fontFamily: 'sans-serif' }}>
      <h1>Arsip Materi</h1>

      {memuat && <p>Memuat…</p>}

      {!memuat && galat && (
        <div role="alert" style={{ padding: '1rem', border: '1px solid #dc2626', borderRadius: 6 }}>
          <p style={{ marginTop: 0 }}>{galat}</p>
          <button type="button" onClick={muatData}>
            Coba lagi
          </button>
        </div>
      )}

      {!memuat && !galat && daftarMateri.length === 0 && (
        <p>Belum ada materi</p>
      )}

      {!memuat && !galat && daftarMateri.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.75rem' }}>
          {daftarMateri.map((item) => (
            <li
              key={item.id}
              style={{ padding: '0.9rem 1rem', border: '1px solid #d1d5db', borderRadius: 6 }}
            >
              <strong>{item.judul}</strong> — {item.mataKuliah} (Pertemuan {item.pertemuan})
              {item.tautan && (
                <div>
                  <a href={item.tautan} target="_blank" rel="noreferrer">
                    Buka tautan materi
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}