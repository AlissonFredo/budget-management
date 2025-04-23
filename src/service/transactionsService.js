const URL = "https://sheet2api.com/v1/rtjzbZKQ2CY1/budget-management/";

export async function transactionsSearch(month = "", year = "") {
  try {
    let query = {
      limit: 999,
      query_type: "and",
    };

    if (month != "") query = { ...query, month: month };
    if (year != "") query = { ...query, year: year };

    query = new URLSearchParams(query);

    const response = await fetch(`${URL}page1?${query}`);
    const data = await response.json();

    if (Array.isArray(data)) {
      return data;
    }

    return [];
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function transactionSubmit(values) {
  try {
    if (values.key == "") return;
    if (values.description == "") return;
    if (values.category == "") return;
    if (values.amount == "") return;
    if (values.month == "") return;
    if (values.year == "") return;
    if (values.type == "") return;

    const response = await fetch(`${URL}page1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: values.key,
        description: values.description,
        category: values.category,
        amount: parseInt(values.amount, 10),
        day: values.day,
        month: values.month,
        year: values.year,
        type: values.type,
      }),
    });

    const data = await response.json();

    if (data != 500) {
      return data;
    }

    return false;
  } catch (error) {
    console.error("Error:", error);
  }
}
