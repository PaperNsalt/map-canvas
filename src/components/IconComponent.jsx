const iconPaths = {
  home: (
    <>
      <path d="M3.75 10.5 12 3.75l8.25 6.75" />
      <path d="M5.25 9.75v9h13.5v-9" />
      <path d="M9.75 18.75v-5.25h4.5v5.25" />
    </>
  ),
  editor: (
    <>
      <path d="M4.5 5.25h10.5v13.5H4.5z" />
      <path d="m15 7.5 2.25-2.25a1.59 1.59 0 1 1 2.25 2.25L17.25 9.75" />
      <path d="m15 7.5 2.25 2.25" />
      <path d="M7.5 9h4.5" />
      <path d="M7.5 12h4.5" />
      <path d="M7.5 15h3" />
    </>
  ),
  gallery: (
    <>
      <rect x="3.75" y="5.25" width="16.5" height="13.5" rx="2.25" />
      <path d="m7.5 14.25 3-3 2.25 2.25 3.75-3.75 2.25 2.25" />
      <circle cx="8.625" cy="9" r="1.125" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.25" />
      <path d="M12 10.5v4.5" />
      <path d="M12 7.5h.008" />
    </>
  ),
  chevronDown: <path d="m6.75 9.75 5.25 5.25 5.25-5.25" />,
  menu: (
    <>
      <path d="M4.5 7.5h15" />
      <path d="M4.5 12h15" />
      <path d="M4.5 16.5h15" />
    </>
  ),
  close: (
    <>
      <path d="m6.75 6.75 10.5 10.5" />
      <path d="m17.25 6.75-10.5 10.5" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.3" />
      <path d="M12 19.2v2.3" />
      <path d="m4.93 4.93 1.63 1.63" />
      <path d="m17.44 17.44 1.63 1.63" />
      <path d="M2.5 12h2.3" />
      <path d="M19.2 12h2.3" />
      <path d="m4.93 19.07 1.63-1.63" />
      <path d="m17.44 6.56 1.63-1.63" />
    </>
  ),
  moon: <path d="M20.6 14.1A8.8 8.8 0 0 1 9.9 3.4a.55.55 0 0 0-.77-.63A10.1 10.1 0 1 0 21.23 14.9a.55.55 0 0 0-.63-.8Z" />,
  save: (
    <>
      <path d="M5.25 4.5h10.98L18.75 7v12.75H5.25z" />
      <path d="M8.25 4.5v4.5h6V4.5" />
      <path d="M8.25 18v-4.5h7.5V18" />
    </>
  ),
  download: (
    <>
      <path d="M12 4.5v9" />
      <path d="m8.25 10.5 3.75 3.75 3.75-3.75" />
      <path d="M4.5 18.75h15" />
    </>
  ),
  zoomIn: (
    <>
      <circle cx="10.5" cy="10.5" r="5.25" />
      <path d="M10.5 8.25v4.5" />
      <path d="M8.25 10.5h4.5" />
      <path d="m15 15 4.5 4.5" />
    </>
  ),
  zoomOut: (
    <>
      <circle cx="10.5" cy="10.5" r="5.25" />
      <path d="M8.25 10.5h4.5" />
      <path d="m15 15 4.5 4.5" />
    </>
  ),
  refresh: (
    <>
      <path d="M18 7.5V4.5h-3" />
      <path d="M18 4.5a7.5 7.5 0 1 0 1.62 8.1" />
    </>
  ),
  crosshair: (
    <>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 3.75v3" />
      <path d="M12 17.25v3" />
      <path d="M3.75 12h3" />
      <path d="M17.25 12h3" />
    </>
  ),
  type: (
    <>
      <path d="M5.25 6h13.5" />
      <path d="M12 6v12" />
      <path d="M8.25 18h7.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 20.25s5.25-4.5 5.25-9a5.25 5.25 0 1 0-10.5 0c0 4.5 5.25 9 5.25 9Z" />
      <circle cx="12" cy="11.25" r="1.5" />
    </>
  ),
  image: (
    <>
      <rect x="3.75" y="5.25" width="16.5" height="13.5" rx="2.25" />
      <path d="m7.5 14.25 3-3 2.25 2.25 2.25-2.25 3 3" />
      <circle cx="8.625" cy="9" r="1.125" />
    </>
  ),
  file: (
    <>
      <path d="M7.5 3.75h6.75l4.5 4.5v12H7.5z" />
      <path d="M14.25 3.75v4.5h4.5" />
      <path d="M9.75 12h4.5" />
      <path d="M9.75 15h4.5" />
    </>
  ),
  trash: (
    <>
      <path d="M5.25 6.75h13.5" />
      <path d="M9 6.75V5.25h6v1.5" />
      <path d="M7.5 6.75 8.25 18h7.5l.75-11.25" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M4.5 12h15" />
      <path d="m13.5 7.5 4.5 4.5-4.5 4.5" />
    </>
  ),
};

function IconComponent({
  name,
  className = "size-4",
  strokeWidth = 1.8,
  filled = false,
  title,
}) {
  const iconMarkup = iconPaths[name];

  if (!iconMarkup) {
    return null;
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : "true"}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      {iconMarkup}
    </svg>
  );
}

export default IconComponent;
