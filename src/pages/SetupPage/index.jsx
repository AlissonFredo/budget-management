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
import { Link } from "react-router";
import Image1 from "../../assets/image1.png";
import Image2 from "../../assets/image2.png";
import { useState } from "react";

function SetupPage() {
  const [apiLink, setApiLink] = useState("");

  console.log(apiLink);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (apiLink == "") return;

    console.log("handleSubmit");
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
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold mb-2">
              Connect Your Google Sheet
            </h1>
            <p className="text-muted-foreground">
              Follow these steps to connect your Google Sheet to BudgetSafe.
              This ensures your data stays in your control.
            </p>
          </div>

          <div className="space-y-6 mb-10">
            <StepCard
              number={1}
              title="Create a Google Sheet"
              icon={<FileSpreadsheet className="h-10 w-10 text-emerald-600" />}
            >
              <p className="mb-4">
                Create a new Google Sheet and name it "Budget Management" or any
                name you prefer.
              </p>
              <div className="bg-muted p-4 rounded-md">
                <p className="text-sm font-medium mb-2">
                  Recommended Sheet Structure:
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>
                    • Create a sheet named "Budget Management" with columns:
                    key, description, category, amount, day, month, year, type
                  </li>
                </ul>
              </div>
              <Button variant="outline" className="mt-4" asChild>
                <a
                  href="https://docs.google.com/spreadsheets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  Open Google Sheets
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </StepCard>

            <StepCard
              number={2}
              title="Create a sheet2api Account"
              icon={<User className="h-10 w-10 text-emerald-600" />}
            >
              <p className="mb-4">
                Sign up for a free account on sheet2api. This service will help
                us connect to your Google Sheet securely.
              </p>
              <Button variant="outline" asChild>
                <a
                  href="https://sheet2api.com/sign-up/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  Sign up on sheet2api
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </StepCard>

            <StepCard
              number={3}
              title="Share Your Google Sheet"
              icon={<Share2 className="h-10 w-10 text-emerald-600" />}
            >
              <p className="mb-4">
                Share your Google Sheet with the email address provided by
                sheet2api during setup.
              </p>
              <div className="bg-muted p-4 rounded-md mb-4">
                <p className="text-sm">
                  In your Google Sheet, click the "Share" button in the top
                  right corner, then add the sheet2api email address
                  (google@sheet2api.com) and give it "Editor" access.
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
              title="Connect in sheet2api"
              icon={<Link2 className="h-10 w-10 text-emerald-600" />}
            >
              <p className="mb-4">
                In sheet2api, create a new API and paste your Google Sheet
                sharing link.
              </p>
              <div className="bg-muted p-4 rounded-md mb-4">
                <p className="text-sm">
                  Follow the sheet2api wizard to connect your Google Sheet. Make
                  sure to select all the sheets you want to access through the
                  API.
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
              title="Copy Your API Link"
              icon={<Copy className="h-10 w-10 text-emerald-600" />}
            >
              <p className="mb-4">
                Once your API is created, sheet2api will provide you with an API
                link. Copy this link and paste it below.
              </p>
              <div className="bg-muted p-4 rounded-md">
                <p className="text-sm font-medium mb-2">
                  Your API link should look something like:
                </p>
                <code className="text-xs bg-background p-2 rounded block overflow-x-auto">
                  https://sheet2api.com/v1/FgXSaM7ZJQgM/budget-management
                </code>
              </div>
            </StepCard>
          </div>

          <Card className="border-2 border-emerald-200 dark:border-emerald-900">
            <CardContent className="pt-6">
              <form>
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Check className="mr-2 h-5 w-5 text-emerald-600" />
                  Final Step: Enter Your API Link
                </h3>
                <p className="mb-4 text-muted-foreground">
                  Paste the API link from sheet2api below to connect your Google
                  Sheet to BudgetSafe.
                </p>
                <div className="space-y-4">
                  <Input
                    placeholder="https://sheet2api.com/v1/YOUR_API_KEY/YOUR_SHEET_NAME"
                    className="w-full"
                    onChange={(e) => setApiLink(e.target.value)}
                  />
                  <Button className="w-full" onClick={(e) => handleSubmit(e)}>
                    {false ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Connecting...
                      </>
                    ) : (
                      <>
                        Continue to Dashboard
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
