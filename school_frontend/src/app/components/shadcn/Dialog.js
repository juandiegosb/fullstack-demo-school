"use client";
import React from "react";

export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
      }}
      onClick={() => onOpenChange && onOpenChange(false)}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ borderRadius: 8, padding: 0, minWidth: 360 }}>
        {children}
      </div>
    </div>
  );
}

export function DialogTrigger({ children, onClick }) {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export function DialogHeader({ children }) {
  return <div style={{ marginBottom: 12 }}>{children}</div>;
}

export function DialogFooter({ children }) {
  return <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>{children}</div>;
}

export default Dialog;
