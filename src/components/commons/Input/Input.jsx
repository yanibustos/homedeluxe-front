import "./Input.css";

function Input({ type, id, name, label, register, errors }) {
  return (
    <div className="input-container">
      <label htmlFor={id} className="form-label fw-bold input-text">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        {...register}
        className={`${errors?.[name] ? "is-invalid" : ""}`}
      />
      {errors?.[name] && <span className="text-danger input-text">{errors[name].message}</span>}
    </div>
  );
}

export default Input;
