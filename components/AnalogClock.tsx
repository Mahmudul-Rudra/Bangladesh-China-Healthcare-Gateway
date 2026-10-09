/** A small analog clock face. `hours` is a decimal hour, e.g. 13.5 = 1:30. */
export default function AnalogClock({ hours, label, digital }: { hours: number; label: React.ReactNode; digital: string }) {
  const h = ((hours % 12) + 12) % 12;
  const m = (hours % 1) * 60;
  return (
    <div className="aclock">
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="46" className="ac-face" />
        {Array.from({ length: 12 }, (_, i) => (
          <line key={i} x1="50" y1={i % 3 ? 9 : 7} x2="50" y2={i % 3 ? 13 : 16} className="ac-tick" transform={`rotate(${i * 30} 50 50)`} />
        ))}
        <line x1="50" y1="50" x2="50" y2="27" className="ac-hour" transform={`rotate(${h * 30 + m * 0.5} 50 50)`} />
        <line x1="50" y1="54" x2="50" y2="15" className="ac-min" transform={`rotate(${m * 6} 50 50)`} />
        <circle cx="50" cy="50" r="3.2" className="ac-pin" />
      </svg>
      <div className="ac-text">
        <small>{label}</small>
        <b>{digital}</b>
      </div>
    </div>
  );
}
