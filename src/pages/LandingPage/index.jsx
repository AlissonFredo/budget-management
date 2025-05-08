import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Lock, Shield, Table } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

function LandingPage() {
  const navigate = useNavigate();
  const sheet2apiLink = localStorage.getItem("sheet2apiLink");
  const { t } = useTranslation();

  const navigateTo = () => {
    if (sheet2apiLink == null) {
      navigate("/setup");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <section className="container mx-auto py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-4xl mx-auto">
          {t("landingpage.title1")}{" "}
          <span className="text-emerald-600">{t("landingpage.title2")}</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          {t("landingpage.description")}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="px-8" onClick={navigateTo}>
            {t("landingpage.button")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      <section className="container mx-auto py-20 px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xlfont-bold mb-4">
            {t("landingpage.title3")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("landingpage.description2")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <LandingFeatureCard
            icon={<Table className="h-10 w-10 text-emerald-600" />}
            title={t("landingpage.featurecard1_title")}
            description={t("landingpage.featurecard1_description")}
          />

          <LandingFeatureCard
            icon={<Lock className="h-10 w-10 text-emerald-600" />}
            title={t("landingpage.featurecard2_title")}
            description={t("landingpage.featurecard2_description")}
          />

          <LandingFeatureCard
            icon={<Shield className="h-10 w-10 text-emerald-600" />}
            title={t("landingpage.featurecard3_title")}
            description={t("landingpage.featurecard3_description")}
          />
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t("landingpage.title4")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("landingpage.description3")}
            </p>
          </div>

          <LandingHowItWorks />
        </div>
      </section>

      <section className="container mx-auto py-20 px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t("landingpage.title5")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("landingpage.description4")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            t("landingpage.reasons1"),
            t("landingpage.reasons2"),
            t("landingpage.reasons3"),
            t("landingpage.reasons4"),
            t("landingpage.reasons5"),
            t("landingpage.reasons6"),
          ].map((benefit, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="text-lg">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-emerald-50 dark:bg-emerald-950/20 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t("landingpage.title6")}
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            {t("landingpage.description5")}
          </p>
          <Button size="lg" className="px-8" onClick={navigateTo}>
            {t("landingpage.button")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

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
    </div>
  );
}

export default LandingPage;

function LandingFeatureCard({ icon, title, description }) {
  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function LandingHowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      number: "01",
      title: t("landingpage.howitworks1_title"),
      description: t("landingpage.howitworks1_description"),
    },
    {
      number: "02",
      title: t("landingpage.howitworks2_title"),
      description: t("landingpage.howitworks2_description"),
    },
    {
      number: "03",
      title: t("landingpage.howitworks3_title"),
      description: t("landingpage.howitworks3_description"),
    },
    {
      number: "04",
      title: t("landingpage.howitworks4_title"),
      description: t("landingpage.howitworks4_description"),
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {steps.map((step, index) => (
        <div key={index} className="relative">
          <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-lg p-6 h-full">
            <div className="text-4xl font-bold text-emerald-600 mb-4">
              {step.number}
            </div>
            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
          </div>

          {index < steps.length - 1 && (
            <div className="hidden lg:block absolute top-1/2 -right-8 transform -translate-y-1/2">
              <ArrowRight className="h-8 w-8 text-emerald-600" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
