import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import { CalendarIcon, PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { transactionSubmit } from "@/service/transactionsService";
import { useTranslation } from "react-i18next";

function ModalAddTransaction({ handleNewTransaction }) {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [transaction, setTransaction] = useState({
    description: "",
    category: "",
    date: "",
    amount: "",
    type: "incoming",
  });

  const [errors, setErrors] = useState({
    description: false,
    category: false,
    date: false,
    amount: false,
    type: false,
  });

  const categories = [
    { value: "Salary", label: t("modal_add_transaction.category1") },
    { value: "Freelance", label: t("modal_add_transaction.category2") },
    { value: "Investment", label: t("modal_add_transaction.category3") },
    { value: "Housing", label: t("modal_add_transaction.category4") },
    { value: "Food", label: t("modal_add_transaction.category5") },
    { value: "Utilities", label: t("modal_add_transaction.category6") },
    { value: "Dining", label: t("modal_add_transaction.category7") },
    { value: "Transportation", label: t("modal_add_transaction.category8") },
    { value: "Entertainment", label: t("modal_add_transaction.category9") },
    { value: "Shopping", label: t("modal_add_transaction.category10") },
    { value: "Health", label: t("modal_add_transaction.category11") },
    { value: "Other", label: t("modal_add_transaction.category12") },
  ];

  const handleSubmitTransaction = (event) => {
    event.preventDefault();

    let tempo = {
      description: transaction.description == "",
      category: transaction.category == "",
      date: transaction.date == "",
      amount: transaction.amount == "",
      type: transaction.type == "",
    };

    setErrors(tempo);

    const hasEmptyFields = Object.values(tempo).some((value) => value === true);

    if (!hasEmptyFields) {
      submitTransaction();
    }
  };

  const submitTransaction = async () => {
    setIsLoading(true);

    let [year, month, day] = transaction.date.split("-");
    const date = new Date(year, month - 1, day);
    month = date.toLocaleString("en-US", { month: "long" }).toLowerCase();

    const value = await transactionSubmit({
      key: uuidv4(),
      description: transaction.description,
      category: transaction.category,
      amount: parseInt(transaction.amount, 10),
      day: day,
      month: month,
      year: year,
      type: transaction.type,
    });

    if (value) {
      handleNewTransaction(value);
    }

    setIsLoading(false);
    reset();
  };

  const reset = () => {
    setTransaction({
      description: "",
      category: "",
      date: "",
      amount: "",
      type: "incoming",
    });

    setErrors({
      description: false,
      category: false,
      date: false,
      amount: false,
      type: false,
    });
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <PlusCircle className="h-4 w-4" />
        {t("modal_add_transaction.button")}
      </Button>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsOpen(open);
          }
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <div>
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {t("modal_add_transaction.title")}
              </DialogTitle>
              <DialogDescription>
                {t("modal_add_transaction.description")}
              </DialogDescription>
            </DialogHeader>

            <form
              onSubmit={(event) => handleSubmitTransaction(event)}
              className="space-y-6 py-4"
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">
                      {t("modal_add_transaction.label1")}
                    </Label>
                    <Input
                      disabled={isLoading}
                      id="description"
                      placeholder={t("modal_add_transaction.placeholder1")}
                      value={transaction.description}
                      onChange={(e) =>
                        setTransaction({
                          ...transaction,
                          description: e.target.value,
                        })
                      }
                    />
                    {errors.description && (
                      <p className="text-rose-600 text-sm">
                        {t("modal_add_transaction.field_required")}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">
                      {t("modal_add_transaction.label2")}
                    </Label>
                    <Select
                      disabled={isLoading}
                      value={transaction.category}
                      onValueChange={(e) =>
                        setTransaction({
                          ...transaction,
                          category: e,
                        })
                      }
                    >
                      <SelectTrigger id="category" className="w-full">
                        <SelectValue
                          placeholder={t("modal_add_transaction.placeholder2")}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-rose-600 text-sm">
                        {t("modal_add_transaction.field_required")}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">
                      {t("modal_add_transaction.label3")}
                    </Label>
                    <Input
                      disabled={isLoading}
                      id="amount"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={transaction.amount}
                      onChange={(e) =>
                        setTransaction({
                          ...transaction,
                          amount: e.target.value,
                        })
                      }
                    />
                    {errors.amount && (
                      <p className="text-rose-600 text-sm">
                        {t("modal_add_transaction.field_required")}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>{t("modal_add_transaction.label4")}</Label>
                    <RadioGroup
                      value={transaction.type}
                      onValueChange={(e) =>
                        setTransaction({
                          ...transaction,
                          type: e,
                        })
                      }
                      className="flex space-x-4"
                      disabled={isLoading}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="incoming" id="incoming" />
                        <Label
                          htmlFor="incoming"
                          className="font-normal cursor-pointer"
                        >
                          {t("modal_add_transaction.type1")}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="outgoing" id="outgoing" />
                        <Label
                          htmlFor="outgoing"
                          className="font-normal cursor-pointer"
                        >
                          {t("modal_add_transaction.type2")}
                        </Label>
                      </div>
                    </RadioGroup>
                    {errors.type && (
                      <p className="text-rose-600 text-sm">
                        {t("modal_add_transaction.field_required")}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">
                      {t("modal_add_transaction.label5")}
                    </Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        disabled={isLoading}
                        type="date"
                        id="date"
                        value={transaction.date || ""}
                        onChange={(e) =>
                          setTransaction({
                            ...transaction,
                            date: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-3 py-2 border border-input bg-background rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                      />
                    </div>
                    {errors.date && (
                      <p className="text-rose-600 text-sm">
                        {t("modal_add_transaction.field_required")}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false);
                    reset();
                  }}
                >
                  {t("modal_add_transaction.button_cancel")}
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex justify-center items-center">
                      <div className="mr-2 w-4 h-4 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{t("modal_add_transaction.loading")}</span>
                    </div>
                  ) : (
                    <span>{t("modal_add_transaction.button")}</span>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalAddTransaction;
