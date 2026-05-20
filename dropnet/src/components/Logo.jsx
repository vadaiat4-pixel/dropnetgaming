export default function Logo({ compact = false }) {
  const logoSrc = `${import.meta.env.BASE_URL}logo-dng-final.png`;

  if (compact) {
    return (
      <div className="logo-text-only" aria-label="Dropnetgaming home">
        <strong>DNG</strong>
        <span>CS2</span>
      </div>
    );
  }

  return (
    <div className="brand-logo-wrap">
      <img src={logoSrc} alt="DNG logo" className="brand-logo" />
    </div>
  );
}
