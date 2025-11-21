"use client";

import { useState, useEffect } from "react";
import CreateStudentDialog from "./components/CreateStudentDialog";
import Pagination from "./components/ui/Pagination";

const API_BASE_URL = "http://localhost:8000";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState({
    next: null,
    previous: null,
    count: 0,
  });
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchStudents = async (url = `${API_BASE_URL}/students/?page_size=10`) => {
    setLoading(true);
    const ensurePageSize = (u) => {
      try {
        const parsed = new URL(u);
        if (!parsed.searchParams.has('page_size')) parsed.searchParams.set('page_size', '10');
        return parsed.toString();
      } catch (e) {
        const parsed = new URL(u, window.location.origin);
        if (!parsed.searchParams.has('page_size')) parsed.searchParams.set('page_size', '10');
        return parsed.toString();
      }
    };

    const target = ensurePageSize(url);
    const res = await fetch(target);
    const data = await res.json();

    setStudents(data.results ?? data);
    setPagination({
      next: data.next ?? null,
      previous: data.previous ?? null,
      count: data.count ?? 0,
    });

    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Students</h1>

      <button onClick={() => setOpenDialog(true)}>Crear estudiante</button>

      <CreateStudentDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onCreated={() => fetchStudents()}
      />

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 20 }}>
          <thead>
            <tr>
              <th>Code</th>
              <th>Full name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>{s.code}</td>
                <td>{s.full_name}</td>
                <td>
                  <a href={`/students/${s.id}`}>Ver detalles</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: 20 }}>
        <Pagination
          hasPrevious={!!pagination.previous}
          hasNext={!!pagination.next}
          onPrevious={() => pagination.previous && fetchStudents(pagination.previous)}
          onNext={() => pagination.next && fetchStudents(pagination.next)}
          info={`Mostrando ${students.length} de ${pagination.count}`}
        />
      </div>
    </div>
  );
}
