export default function Pagination({ hasPrevious, hasNext, onPrevious, onNext, info }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', background: '#0b1220', color: '#fff', padding: 10, borderRadius: 8 }}>
      <button
        onClick={() => hasPrevious && onPrevious && onPrevious()}
        disabled={!hasPrevious}
        style={{
          opacity: hasPrevious ? 1 : 0.4,
          cursor: hasPrevious ? 'pointer' : 'not-allowed',
          background: hasPrevious ? '#06b6d4' : '#22303a',
          color: hasPrevious ? '#042027' : '#88939a',
          border: 'none',
          padding: '6px 10px',
          borderRadius: 6,
        }}
      >
        Página anterior
      </button>

      <div style={{ flex: 1, textAlign: 'center' }}>{info}</div>

      <button
        onClick={() => hasNext && onNext && onNext()}
        disabled={!hasNext}
        style={{
          opacity: hasNext ? 1 : 0.4,
          cursor: hasNext ? 'pointer' : 'not-allowed',
          background: hasNext ? '#06b6d4' : '#22303a',
          color: hasNext ? '#042027' : '#88939a',
          border: 'none',
          padding: '6px 10px',
          borderRadius: 6,
        }}
      >
        Página siguiente
      </button>
    </div>
  );
}
