"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const API_BASE_URL = "http://localhost:8000";

export default function Page() {
  const params = useParams();
  const id = params?.id;
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/students/${id}/`);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        if (mounted) setStudent(data);
      } catch (err) {
        if (mounted) setError(String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (error) return <div style={{ padding: 20, color: 'red' }}>Error: {error}</div>;
  if (!student) return <div style={{ padding: 20 }}>Estudiante no encontrado</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Detalle de estudiante</h1>
      <div><strong>Full name:</strong> {student.full_name}</div>
      <div><strong>Code:</strong> {student.code}</div>
      <div><strong>Email:</strong> {student.email}</div>
      <div><strong>Group:</strong> {student.group ? student.group.name : "N/A"}</div>

      <div style={{ marginTop: 12 }}>
        <a href="/">Volver al listado</a>
      </div>
    </div>
  );
}
