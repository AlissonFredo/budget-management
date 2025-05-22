import { Button } from "@/components/ui/button";
import { Globe, Home, Menu, Settings, Shield } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function Navbar() {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "pt", name: "Português" },
  ];

  const navItems = [
    {
      href: "/",
      label: t("navbar.home"),
      icon: <Home className="h-4 w-4 mr-2" />,
    },
    {
      href: "/dashboard",
      label: t("navbar.dashboard"),
      icon: <Settings className="h-4 w-4 mr-2" />,
    },
    {
      href: "/setup",
      label: t("navbar.setup"),
      icon: <Settings className="h-4 w-4 mr-2" />,
    },
  ];

  return (
    <header className="flex justify-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex container h-16 grid grid-cols-2 md:grid-cols-3">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold hidden sm:inline-block">
              BudgetManagement
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center justify-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-sm font-medium transition-colors hover:text-foreground/80 flex items-center text-foreground"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-4">
          <Select
            value={currentLanguage}
            onValueChange={(e) => i18n.changeLanguage(e)}
          >
            <SelectTrigger className="w-[133px]">
              <div className="flex items-center">
                <Globe className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select year" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.code} value={language.code}>
                  {language.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[260px] sm:w-[300px] p-4">
              <div className="flex flex-col gap-6 pt-6">
                <div className="flex items-center justify-between">
                  <Link
                    to="/"
                    className="flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Shield className="h-6 w-6 text-emerald-600" />
                    <span className="text-sm font-bold">BudgetManagement</span>
                  </Link>
                </div>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground/80 text-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
