import { useTranslation } from "react-i18next";

function Loading() {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center py-12 px-4 text-muted-foreground">
      <div className="text-lg font-medium mr-2 w-4 h-4 border-4 border-muted-foreground border-t-transparent rounded-full animate-spin"></div>
      <span>{t("modal_add_transaction.loading")}</span>
    </div>
  );
}

export default Loading;
