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

    console.log("Response to fetch transactions", data);

    if (Array.isArray(data)) {
      return data;
    }

    return [];
  } catch (error) {
    console.error("Error:", error);
  }
}
