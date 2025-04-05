function Container({ children }) {
  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {children}
    </section>
  );
}

export default Container;
