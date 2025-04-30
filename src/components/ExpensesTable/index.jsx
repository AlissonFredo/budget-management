import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

function ExpensesTable() {
  return (
    <Card className="md:col-span-4">
      <CardHeader className="border-b">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <CardTitle className="text-2xl">Expenses</CardTitle>
            <CardDescription>
              Expenses summary for the year, organized by category
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>-</TableHead>
              <TableHead>Jan</TableHead>
              <TableHead>Fev</TableHead>
              <TableHead>Mar</TableHead>
              <TableHead>Apr</TableHead>
              <TableHead>May</TableHead>
              <TableHead>Jun</TableHead>
              <TableHead>Jul</TableHead>
              <TableHead>Aug</TableHead>
              <TableHead>Sep</TableHead>
              <TableHead>Oct</TableHead>
              <TableHead>Nov</TableHead>
              <TableHead>Dec</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Average</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="group">
              <TableCell className="text-sm text-muted-foreground">
                Food
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                $900.00
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                $900.00
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                $900.00
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                $900.00
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                $900.00
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                $900.00
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                $900.00
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                $900.00
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                $900.00
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                $900.00
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                $900.00
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                $900.00
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                $10800.00
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                $900.00
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ExpensesTable;
