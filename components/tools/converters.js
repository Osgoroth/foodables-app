export function celsiusToFahrenheit(celsius) {
  return Number(celsius * 1.8 + 32).toFixed(1);
}

export function fahrenheitToCelsius(fahrenheit) {
  return Number((fahrenheit - 32) / 1.8).toFixed(1);
}

export function poundsToKilograms(pounds) {
  return Number(pounds / 2.2).toFixed(2);
}

export function kilogramsToPounds(kilograms) {
  return Number(kilograms * 2.2).toFixed(2);
}
