import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  FileSpreadsheet,
  Link2,
  Share2,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import Image1 from "../../assets/image1.png";
import Image2 from "../../assets/image2.png";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function SetupPage() {
  const [apiLink, setApiLink] = useState("");
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sheet2apiLink = localStorage.getItem("sheet2apiLink");
  const { t } = useTranslation();

  useEffect(() => {
    if (sheet2apiLink != null) {
      setApiLink(sheet2apiLink);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    if (apiLink == "") return;

    setTimeout(() => {
      localStorage.setItem("sheet2apiLink", apiLink);

      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link
              to="/"
              className="flex items-center text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("setuppage.backtohome")}
            </Link>
            <h1 className="text-3xl font-bold mb-2">{t("setuppage.title")}</h1>
            <p className="text-muted-foreground">
              {t("setuppage.description")}
            </p>
          </div>

          <div className="space-y-6 mb-10">
            <StepCard
              number={1}
              title={t("setuppage.setup_title1")}
              icon={<FileSpreadsheet className="h-10 w-10 text-emerald-600" />}
            >
              <p className="mb-4">{t("setuppage.setup_description1")}</p>
              <div className="bg-muted p-4 rounded-md">
                <p className="text-sm font-medium mb-2">
                  {t("setuppage.setup_subtitle1")}
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• {t("setuppage.setup_subtitle_description1")}</li>
                </ul>
              </div>
              <Button variant="outline" className="mt-4" asChild>
                <a
                  href="https://docs.google.com/spreadsheets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  {t("setuppage.setup_button1")}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </StepCard>

            <StepCard
              number={2}
              title={t("setuppage.setup_title2")}
              icon={<User className="h-10 w-10 text-emerald-600" />}
            >
              <p className="mb-4">{t("setuppage.setup_description2")}</p>
              <Button variant="outline" asChild>
                <a
                  href="https://sheet2api.com/sign-up/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  {t("setuppage.setup_button2")}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </StepCard>

            <StepCard
              number={3}
              title={t("setuppage.setup_title3")}
              icon={<Share2 className="h-10 w-10 text-emerald-600" />}
            >
              <p className="mb-4">{t("setuppage.setup_description3")}</p>
              <div className="bg-muted p-4 rounded-md mb-4">
                <p className="text-sm">
                  {t("setuppage.setup_subtitle_description2")}
                </p>
              </div>
              <div className="rounded-md overflow-hidden border border-border">
                <img
                  src={Image1}
                  alt="Google Sheets sharing screenshot"
                  className="w-full"
                />
              </div>
            </StepCard>

            <StepCard
              number={4}
              title={t("setuppage.setup_title4")}
              icon={<Link2 className="h-10 w-10 text-emerald-600" />}
            >
              <p className="mb-4">{t("setuppage.setup_description4")}</p>
              <div className="bg-muted p-4 rounded-md mb-4">
                <p className="text-sm">
                  {t("setuppage.setup_subtitle_description3")}
                </p>
              </div>
              <div className="rounded-md overflow-hidden border border-border">
                <img
                  src={Image2}
                  alt="sheet2api configuration screenshot"
                  className="w-full"
                />
              </div>
            </StepCard>

            <StepCard
              number={5}
              title={t("setuppage.setup_title5")}
              icon={<Copy className="h-10 w-10 text-emerald-600" />}
            >
              <p className="mb-4">{t("setuppage.setup_description5")}</p>
              <div className="bg-muted p-4 rounded-md">
                <p className="text-sm font-medium mb-2">
                  {t("setuppage.setup_subtitle2")}
                </p>
                <p className="text-xs bg-background p-2 rounded">
                  https://sheet2api.com/v1/ FgXSaM7ZJQgM/ budget-management
                </p>
              </div>
            </StepCard>
          </div>

          <Card className="border-2 border-emerald-200 dark:border-emerald-900">
            <CardContent className="pt-6">
              <form>
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Check className="mr-2 h-5 w-5 text-emerald-600" />
                  {t("setuppage.setup_title6")}
                </h3>
                <p className="mb-4 text-muted-foreground">
                  {t("setuppage.setup_description6")}
                </p>
                <div className="space-y-4">
                  <Input
                    placeholder="https://sheet2api.com/v1/YOUR_API_KEY/YOUR_SHEET_NAME"
                    className="w-full"
                    value={apiLink}
                    onChange={(e) => setApiLink(e.target.value)}
                  />
                  <Button className="w-full" onClick={(e) => handleSubmit(e)}>
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        {t("setuppage.setup_button4")}
                      </>
                    ) : (
                      <>
                        {t("setuppage.setup_button3")}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SetupPage;

function StepCard({ number, title, icon, children }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 font-bold text-xl">
              {number}
            </div>
          </div>
          <div className="flex-grow">
            <div className="flex items-center mb-4">
              <div className="mr-3">{icon}</div>
              <h3 className="text-xl font-bold">{title}</h3>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
