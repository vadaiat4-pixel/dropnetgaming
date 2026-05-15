export function Button({ children, onClick, href, variant = 'primary', className = '', type = 'button' }) {
  const classes = `btn btn-${variant} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
