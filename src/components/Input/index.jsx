function Input({ label, id, ...props }) {
  return (
    <div className="grid mb-2">
      <label className="mb-1 text-sm font-semibold text-gray-500" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="bg-gray-100 rounded-md p-2 text-sm font-semibold text-gray-500"
        {...props}
      />
    </div>
  );
}

export default Input;
