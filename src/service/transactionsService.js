// import { useTranslation } from "react-i18next";

export async function transactionsSearch(month = "", year = "", type = "") {
  try {
    const URL = localStorage.getItem("sheet2apiLink");

    if (URL == null) return [];

    let query = {
      limit: 999,
      query_type: "and",
    };

    if (month != "") query = { ...query, month: month };
    if (year != "") query = { ...query, year: year };
    if (type != "") query = { ...query, type: type };

    query = new URLSearchParams(query);

    let error = null;

    const response = await fetch(`${URL}/page1?${query}`);

    if (response.status == 400) {
      error = "alert1";
    } else if (response.status == 402) {
      error = "alert2";
    } else if (response.status == 404) {
      error = "alert3";
    } else if (response.status == 429) {
      error = "alert4";
    } else if (response.status == 200) {
      const transactions = await response.json();

      return { transactions: transactions, error: error };
    }

    return { transactions: [], error: error };
  } catch (error) {
    console.error("Error Transactions Search:", error);
  }
}

export async function transactionSubmit(values) {
  try {
    const URL = localStorage.getItem("sheet2apiLink");
    let error = null;

    if (URL == null) return { transaction: {}, error: error };

    if (values.key == "") return;
    if (values.description == "") return;
    if (values.category == "") return;
    if (values.amount == "") return;
    if (values.month == "") return;
    if (values.year == "") return;
    if (values.type == "") return;

    const response = await fetch(`${URL}/page1`, {
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

    if (response.status == 400) {
      error = "alert1";
    } else if (response.status == 402) {
      error = "alert2";
    } else if (response.status == 404) {
      error = "alert3";
    } else if (response.status == 429) {
      error = "alert4";
    } else if (response.status == 201) {
      const data = await response.json();

      return { data: data, error: error };
    }

    return { transaction: {}, error: error };
  } catch (error) {
    console.error("Error Transaction Submit:", error);
  }
}
