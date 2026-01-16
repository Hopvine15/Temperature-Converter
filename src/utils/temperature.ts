export const roundToTwoDecimals = (value: number): number =>
  Number(value.toFixed(2));

export const celsiusToFahrenheit = (celsius: number): number =>
  roundToTwoDecimals((celsius * 9) / 5 + 32);

export const fahrenheitToCelsius = (fahrenheit: number): number =>
  roundToTwoDecimals(((fahrenheit - 32) * 5) / 9);

export const temperatureTestCases = [
  { celsius: 0, fahrenheit: 32 },
  { celsius: 100, fahrenheit: 212 },
  { celsius: -40, fahrenheit: -40 },
  { celsius: 37, fahrenheit: 98.6 },
  { celsius: 21.11, fahrenheit: 70 },
];

export const validateTemperatureConversions = () =>
  temperatureTestCases.every(({ celsius, fahrenheit }) => {
    const toF = celsiusToFahrenheit(celsius);
    const toC = fahrenheitToCelsius(fahrenheit);
    return (
      roundToTwoDecimals(toF) === roundToTwoDecimals(fahrenheit) &&
      roundToTwoDecimals(toC) === roundToTwoDecimals(celsius)
    );
  });
