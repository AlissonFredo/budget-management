function Container({ children }) {
  return (
    <section
      className="
        min-h-screen 
        bg-violet-500
      "
    >
      {children}
    </section>
  );
}

export default Container;
