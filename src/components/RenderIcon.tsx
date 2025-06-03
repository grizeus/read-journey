import sprite from "../assets/sprite.svg";

const RenderIcon = (isValid: boolean, hasError: boolean) => {
  if (isValid) {
    return (
      <svg className="pointer-events-none absolute top-1/2 right-4 size-4.5 -translate-y-1/2 transform">
        <use href={`${sprite}#icon-check`} />
      </svg>
    );
  }
  if (hasError) {
    return (
      <svg className="pointer-events-none absolute top-1/2 right-4 size-4.5 -translate-y-1/2 transform">
        <use href={`${sprite}#icon-error`} />
      </svg>
    );
  }
  return null;
};

export default RenderIcon;
