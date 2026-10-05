/**
 * Custom Vector Database Icon Component
 * Visualizing high-dimensional embeddings & vector nodes in clean vector SVG.
 */
export default function VectorDbIcon({ size = 20, color = 'currentColor', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="3" fill={color} fillOpacity="0.3" />
      <circle cx="12" cy="4" r="2" />
      <circle cx="19" cy="9" r="2" />
      <circle cx="19" cy="16" r="2" />
      <circle cx="12" cy="20" r="2" />
      <circle cx="5" cy="16" r="2" />
      <circle cx="5" cy="9" r="2" />
      <line x1="12" y1="6" x2="12" y2="9" />
      <line x1="17.2" y1="9.8" x2="14.5" y2="11" />
      <line x1="17.2" y1="15.2" x2="14.5" y2="13" />
      <line x1="12" y1="18" x2="12" y2="15" />
      <line x1="6.8" y1="15.2" x2="9.5" y2="13" />
      <line x1="6.8" y1="9.8" x2="9.5" y2="11" />
    </svg>
  );
}
