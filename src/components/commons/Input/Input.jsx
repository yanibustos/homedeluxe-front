import "./Input.css";

function Input({
  type,
  id,
  name,
  label,
  register,
  errors,
  classNameContainer = "",
  classNameLabel = "",
}) {
  return (
    <div className={`input-container ${classNameContainer}`}>
      <label htmlFor={id} className={`form-label input-text ${classNameLabel}`}>
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
