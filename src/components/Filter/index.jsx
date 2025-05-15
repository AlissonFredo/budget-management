import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

function Filter({
  totalTransactions,
  selectedMonth,
  onSelectMonth,
  selectedYears,
  onSelectedYears,
}) {
  const { t } = useTranslation();

  const months = [
    { value: "all", label: t("filter.month0") },
    { value: "january", label: t("filter.month1") },
    { value: "february", label: t("filter.month2") },
    { value: "march", label: t("filter.month3") },
    { value: "april", label: t("filter.month4") },
    { value: "may", label: t("filter.month5") },
    { value: "june", label: t("filter.month6") },
    { value: "july", label: t("filter.month7") },
    { value: "august", label: t("filter.month8") },
    { value: "september", label: t("filter.month9") },
    { value: "october", label: t("filter.month10") },
    { value: "november", label: t("filter.month11") },
    { value: "december", label: t("filter.month12") },
  ];

  const currentYear = new Date().getFullYear();
  const startYear = 2000;
  const endYear = currentYear + 10;

  const years = [
    { value: "all", label: t("filter.year0") },
    ...Array.from({ length: endYear - startYear + 1 }, (_, i) => {
      const year = startYear + i;
      return { value: year.toString(), label: year.toString() };
    }).reverse(),
  ];

  const currentMonth = new Date()
    .toLocaleString("en-US", { month: "long" })
    .toLowerCase();

  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle className="text-2xl"> {t("filter.title")}</CardTitle>
        <CardDescription>{t("filter.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select value={selectedMonth} onValueChange={onSelectMonth}>
            <SelectTrigger className="w-full">
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select month" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedYears.toString()}
            onValueChange={onSelectedYears}
          >
            <SelectTrigger className="w-full">
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select year" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year.value} value={year.value}>
                  {year.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="w-full cursor-pointer"
              onClick={() => onSelectMonth("all")}
            >
              {t("filter.button1")}
            </Button>
            <Button
              variant="outline"
              className="w-full cursor-pointer"
              onClick={() => onSelectMonth(currentMonth)}
            >
              {t("filter.button2")}
            </Button>
          </div>

          <Card className="bg-muted/50 border-dashed">
            <CardContent className="p-4">
              <div className="text-sm font-medium">{t("filter.label1")}</div>
              <div className="mt-2 text-xs text-muted-foreground">
                <div className="flex justify-between py-1">
                  <span>{t("filter.label2")}</span>
                  <span className="font-medium">{totalTransactions}</span>
                </div>
                {/* <div className="flex justify-between py-1 border-t">
                  <span>Time Period</span>
                  <span className="font-medium">Mar-Apr 2025</span>
                </div> */}
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}

export default Filter;
