import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Lock, Shield, Table } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";

function LandingPage() {
  const navigate = useNavigate();
  const sheet2apiLink = localStorage.getItem("sheet2apiLink");

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
          Manage Your Budget with{" "}
          <span className="text-emerald-600">Complete Data Ownership</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Your financial data stays in your Google Sheets. We never store your
          sensitive information.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="px-8" onClick={navigateTo}>
            Get Started Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      <section className="container mx-auto py-20 px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xlfont-bold mb-4">Your Data, Your Control</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            BudgetManagement is designed with your privacy and data ownership as
            the top priority.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <LandingFeatureCard
            icon={<Table className="h-10 w-10 text-emerald-600" />}
            title="Google Sheets Integration"
            description="All your financial data is stored directly in your own Google Sheets. No middleman, no hidden databases."
          />

          <LandingFeatureCard
            icon={<Lock className="h-10 w-10 text-emerald-600" />}
            title="100% Data Ownership"
            description="You own your data completely. We never store your sensitive financial information on our servers."
          />

          <LandingFeatureCard
            icon={<Shield className="h-10 w-10 text-emerald-600" />}
            title="Privacy by Design"
            description="Our system is built from the ground up to respect your privacy and keep your financial data secure."
          />
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, secure, and transparent. Here's how BudgetManagement keeps
              your data in your control.
            </p>
          </div>

          <LandingHowItWorks />
        </div>
      </section>

      <section className="container mx-auto py-20 px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Why Choose BudgetManagement
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A budget management system that puts you first.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            "Your data stays in your Google Sheets, not our servers",
            "Easy to export or backup your financial information",
            "No risk of data breaches affecting your sensitive financial data",
            "Access your budget from anywhere with Google Sheets integration",
            "Full transparency on how your data is handled",
            "No hidden fees or subscription traps",
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
            Ready to take control of your finances?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Start managing your budget today with complete data ownership and
            privacy.
          </p>
          <Button size="lg" className="px-8" onClick={navigateTo}>
            Get Started Now
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
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Terms of Service
              </Link>
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} BudgetManagement. All rights reserved.
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
  const steps = [
    {
      number: "01",
      title: "Connect Your Google Sheet",
      description:
        "Link your Google Sheet to BudgetManagement with a simple authorization process.",
    },
    {
      number: "02",
      title: "Set Up Your Budget Categories",
      description:
        "Customize your income and expense categories to match your financial needs.",
    },
    {
      number: "03",
      title: "Add Your Transactions",
      description:
        "Record your financial transactions directly through our intuitive interface.",
    },
    {
      number: "04",
      title: "Data Stored in Your Sheet",
      description:
        "All your data is written directly to your Google Sheet, not our servers.",
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
