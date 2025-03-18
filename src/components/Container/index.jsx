function Container({ children }) {
  return (
    <section
      className="
        min-h-screen 
        bg-violet-500
        p-5
      "
    >
      {children}
    </section>
  );
}

export default Container;
