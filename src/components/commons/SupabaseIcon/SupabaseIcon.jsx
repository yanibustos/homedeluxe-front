function SupabaseIcon({ size = "3rem" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: "drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.1))",
        color: "rgb(233, 233, 233)",
      }}
    >
      <path
        fill="currentColor"
        d="M67.5 20C60.5 20 55 26.2 55 34.1V134.7C55 138.3 57.4 140.5 61 140.5H106.1L72.3 202.4C68.4 209.4 73.3 216 81.1 216H188.5C195.5 216 201 209.8 201 201.9V101.3C201 97.7 198.6 95.5 195 95.5H149.9L183.7 33.6C187.6 26.6 182.7 20 174.9 20H67.5Z"
      />
    </svg>
  );
}

export default SupabaseIcon;
