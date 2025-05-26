import { Calendar } from "lucide-react";

function NotFaund({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground text-center mt-1">
        {description}
      </p>
    </div>
  );
}

export default NotFaund;
