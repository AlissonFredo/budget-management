import { useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation();

  return (
    <header className="text-center mb-8">
      <h1 className="text-4xl font-bold tracking-tight mb-2">
        {t("dashboard.title")}
      </h1>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        {t("dashboard.subtitle")}
      </p>
    </header>
  );
}

export default Header;
