function Select({ label, id, values = [], ...props }) {
  return (
    <div className="grid mb-2">
      <label
        className="mb-1 text-sm font-semibold text-gray-500"
        htmlFor="type"
      >
        {label}
      </label>
      <select
        className="bg-gray-100 rounded-md p-2 text-sm font-semibold text-gray-500"
        id={id}
        {...props}
      >
        {values.map((value, key) => (
          <option key={key} value={value.value}>
            {value.description}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
