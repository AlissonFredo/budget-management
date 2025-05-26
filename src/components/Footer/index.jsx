import { useTranslation } from "react-i18next";
import { Shield } from "lucide-react";
import { Link } from "react-router";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white dark:bg-slate-900 py-12 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Shield className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold">BudgetManagement</span>
          </div>
          <div className="flex space-x-6">
            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {t("landingpage.privacypolicy")}
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {t("landingpage.termsofservice")}
            </Link>
            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {t("landingpage.contact")}
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {t("landingpage.rights")}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
