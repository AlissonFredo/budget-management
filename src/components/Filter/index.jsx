import { useState } from "react";

function Filter({ handleSelectedMonth }) {
  const monthName = new Date()
    .toLocaleString("en-US", { month: "long" })
    .toLowerCase();

  const [currentMonth, setCurrentMonth] = useState(monthName);

  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  return (
    <section className="mt-4 overflow-x-scroll ">
      <div className="flex py-4 justify-start">
        {months.map((month, key) => (
          <div
            key={key}
            className={`
            ${key == 0 ? "mr-2" : "mx-2"}
            lg:mx-auto 
            p-2 
            ${currentMonth == month ? "bg-blue-400" : "bg-blue-300"}
            text-white 
            text-sm 
            min-w-20 
            text-center
            capitalize
          `}
            onClick={() => {
              setCurrentMonth(month);
              handleSelectedMonth(month);
            }}
          >
            {month}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Filter;
