const form = document.getElementById("converter-form");
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const result = document.getElementById("result");
const fromFlag = document.getElementById("from-flag");
const toFlag = document.getElementById("to-flag");

function updateFlag(selectElement, flagElement) {
  const countryCode = selectElement.value.slice(0, 2);
  flagElement.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

fromCurrency.addEventListener("change", () => updateFlag(fromCurrency, fromFlag));
toCurrency.addEventListener("change", () => updateFlag(toCurrency, toFlag));

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const amount = amountInput.value || 1;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  const url = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.result) {
      result.innerText = `${amount} ${from} = ${data.result.toFixed(2)} ${to}`;
    } else {
      result.innerText = "Could not fetch exchange rate.";
    }
  } catch (error) {
    result.innerText = "Error fetching data.";
  }
});
