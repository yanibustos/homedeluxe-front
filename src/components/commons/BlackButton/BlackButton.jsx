import "./BlackButton.css";

function BlackButton({
  type,
  disabled = false,
  loading,
  className = "",
  name,
  handleOnClick = () => {},
  children,
  onClick,
}) {
  const handleClick = onClick || handleOnClick;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`blackButton ${className}`}
      onClick={() => handleClick()}
    >
      {loading ? (
        <>
          <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
          <span role="status"> Loading...</span>
        </>
      ) : (
        children || name
      )}
    </button>
  );
}

export default BlackButton;
