"use client";

import { useState, useEffect } from "react";
import Dialog from "./shadcn/Dialog";

const API_BASE_URL = "http://localhost:8000";

export default function CreateStudentDialog({ open, onOpenChange, onCreated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [groupId, setGroupId] = useState("");
  const [groups, setGroups] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/students/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: name,
          email,
          code,
          group: groupId || null,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: 'Error' }));
        throw new Error(JSON.stringify(err));
      }

      const created = await res.json();
      onCreated && onCreated(created);
      onOpenChange(false);
    } catch (e) {
      setError(String(e));
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/student-groups/`);
        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.results ?? []);
        setGroups(list);
        if (list.length > 0 && !groupId) setGroupId(list[0].id);
      } catch (_) {
        // ignore
      }
    };
    fetchGroups();
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div style={{ background: '#0b1220', color: '#fff', padding: 20, borderRadius: 8 }}>
        <h2 style={{ color: '#fff', margin: 0 }}>Crear estudiante</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
          <input placeholder="Nombre completo" value={name} onChange={(e) => setName(e.target.value)} style={{ color: '#fff', background: '#08101a', border: '1px solid #22303a', padding: '8px' }} />
          <input placeholder="Correo" type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ color: '#fff', background: '#08101a', border: '1px solid #22303a', padding: '8px' }} />
          <input placeholder="Código" value={code} onChange={(e) => setCode(e.target.value)} style={{ color: '#fff', background: '#08101a', border: '1px solid #22303a', padding: '8px' }} />

          <select value={groupId} onChange={(e) => setGroupId(e.target.value)} style={{ color: '#fff', background: '#08101a', border: '1px solid #22303a', padding: '8px' }}>
            <option value="">(Sin grupo)</option>
            {groups.map((g) => (
              <option key={g.id} value={g.id} style={{ background: '#0b1220', color: '#fff' }}>
                {g.name}
              </option>
            ))}
          </select>

          {error && <div style={{ color: '#ff6b6b' }}>{error}</div>}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
            <button type="button" onClick={() => onOpenChange(false)} disabled={submitting} style={{ background: '#fff', color: '#0b1220', padding: '8px 12px', borderRadius: 6 }}>Cancelar</button>
            <button type="button" onClick={handleSubmit} disabled={submitting} style={{ background: '#06b6d4', color: '#042027', padding: '8px 12px', borderRadius: 6 }}>{submitting ? 'Creando...' : 'Crear'}</button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
