export default function DaftarMateri({ materi }) {
  return (
    <div>
      {materi.map((item) => (
        <div key={item.id}>
          <h2>{item.judul}</h2>
          <p>{item.mataKuliah}</p>
          <p>Pertemuan {item.pertemuan}</p>
          {item.tautan !== null && (
            <a href={item.tautan} target="_blank" rel="noreferrer">
              Buka
            </a>
          )}
        </div>
      ))}
    </div>
  );
}