function Container({ children }) {
  return (
    <section
      className="
        min-h-screen 
        bg-slate-200
      "
    >
      {children}
    </section>
  );
}

export default Container;
