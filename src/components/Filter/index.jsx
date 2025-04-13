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

function Filter({ totalTransactions, selectedMonth, onSelectMonth }) {
  const months = [
    { value: "all", label: "All Months" },
    { value: "january", label: "January" },
    { value: "february", label: "February" },
    { value: "march", label: "March" },
    { value: "april", label: "April" },
    { value: "may", label: "May" },
    { value: "june", label: "June" },
    { value: "july", label: "July" },
    { value: "august", label: "August" },
    { value: "september", label: "September" },
    { value: "october", label: "October" },
    { value: "november", label: "November" },
    { value: "december", label: "December" },
  ];

  const currentMonth = new Date()
    .toLocaleString("en-US", { month: "long" })
    .toLowerCase();

  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle className="text-2xl">Filter</CardTitle>
        <CardDescription>View transactions by month</CardDescription>
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

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="w-full cursor-pointer"
              onClick={() => onSelectMonth("all")}
            >
              All Time
            </Button>
            <Button
              variant="outline"
              className="w-full cursor-pointer"
              onClick={() => onSelectMonth(currentMonth)}
            >
              This Month
            </Button>
          </div>

          <Card className="bg-muted/50 border-dashed">
            <CardContent className="p-4">
              <div className="text-sm font-medium">Quick Stats</div>
              <div className="mt-2 text-xs text-muted-foreground">
                <div className="flex justify-between py-1">
                  <span>Transactions</span>
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
