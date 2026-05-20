export function Card({ children, className = '' }) {
  return <section className={`card ${className}`}>{children}</section>;
}

export function StatCard({ value, label }) {
  return (
    <div className="stat-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

export function PageHero({ kicker, title, text, icon, actions }) {
  return (
    <section className="page-hero">
      <div className="hero-kicker">{kicker}</div>
      <h1>{title}</h1>
      <p>{text}</p>
      {actions && <div className="hero-actions">{actions}</div>}
    </section>
  );
}
