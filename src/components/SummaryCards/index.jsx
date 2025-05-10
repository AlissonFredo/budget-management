import {
  ArrowDownCircle,
  ArrowUpCircle,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { useTranslation } from "react-i18next";

function SummaryCards({ incoming, outgoing }) {
  const { t } = useTranslation();

  const currentBalance = incoming - outgoing;

  const spendingPercentage =
    incoming > 0 ? Math.min(Math.round((outgoing / incoming) * 100), 100) : 0;

  const getIncomeBalanceMessage = () => {
    if (currentBalance >= 0) {
      const percentage =
        currentBalance != 0 ? Math.round((currentBalance / incoming) * 100) : 0;
      return `${t("dashboard.incomebalancemessage3")} ${percentage}% ${t(
        "dashboard.incomebalancemessage3_1"
      )}`;
    }

    if (incoming == 0) {
      return t("dashboard.incomebalancemessage1");
    }

    const percentage = Math.round((Math.abs(currentBalance) / incoming) * 100);
    return `${t("dashboard.incomebalancemessage2")} ${percentage}% ${t(
      "dashboard.incomebalancemessage2_1"
    )}`;
  };

  return (
    <section className="grid gap-6 md:grid-cols-3 mb-8">
      <Card className="overflow-hidden border-t-4 border-t-emerald-500">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">
              {t("dashboard.cardtitle1")}
            </CardTitle>
            <div className="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900/20">
              <ArrowUpCircle className="h-5 w-5 text-emerald-500" />
            </div>
          </div>
          <CardDescription className="flex items-center text-sm text-muted-foreground">
            <TrendingUp className="mr-1 h-3 w-3" />{" "}
            {t("dashboard.cardsubtitle1")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-emerald-600">
            ${incoming.toFixed(2)}
          </div>
          <div className="mt-4 h-1 w-full rounded-full bg-emerald-100 dark:bg-emerald-900/20">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: "100%" }}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-t-4 border-t-rose-500">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">
              {t("dashboard.cardtitle2")}
            </CardTitle>
            <div className="rounded-full bg-rose-100 p-2 dark:bg-rose-900/20">
              <ArrowDownCircle className="h-5 w-5 text-rose-500" />
            </div>
          </div>
          <CardDescription className="flex items-center text-sm text-muted-foreground">
            <TrendingDown className="mr-1 h-3 w-3" />{" "}
            {t("dashboard.cardsubtitle2")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-rose-600">
            ${outgoing.toFixed(2)}
          </div>
          <div className="mt-4 flex items-center">
            <Progress value={spendingPercentage} className="h-2" />
            <span className="ml-2 text-sm text-muted-foreground">
              {spendingPercentage}%
            </span>
          </div>
        </CardContent>
      </Card>

      <Card
        className={`overflow-hidden border-t-4 ${
          currentBalance >= 0 ? "border-t-sky-500" : "border-t-amber-500"
        }`}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">
              {t("dashboard.cardtitle3")}
            </CardTitle>
            <div
              className={`rounded-full p-2 ${
                currentBalance >= 0
                  ? "bg-sky-100 dark:bg-sky-900/20"
                  : "bg-amber-100 dark:bg-amber-900/20"
              }`}
            >
              <Wallet
                className={`h-5 w-5 ${
                  currentBalance >= 0 ? "text-sky-500" : "text-amber-500"
                }`}
              />
            </div>
          </div>
          <CardDescription className="flex items-center text-sm text-muted-foreground">
            {`${
              currentBalance >= 0
                ? t("dashboard.cardsubtitle3_1")
                : t("dashboard.cardsubtitle3_2")
            } ${t("dashboard.cardsubtitle3")}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`text-3xl font-bold ${
              currentBalance >= 0 ? "text-sky-600" : "text-amber-600"
            }`}
          >
            ${Math.abs(currentBalance).toFixed(2)}
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            {getIncomeBalanceMessage()}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default SummaryCards;
