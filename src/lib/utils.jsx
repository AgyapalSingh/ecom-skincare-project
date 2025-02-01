/**
 * Currency Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help with currency formatting
 *
 * Current contents
 * - formatMoney - Takes an amount in cents and returns it as a formatted dollar value.
 *   - When theme.settings.superScriptPrice is enabled, format cents in <sup> tag
 * - getBaseUnit - Splits unit price apart to get value + unit
 *
 */

const moneyFormat = "${{amount}}";
const superScript = false; // Set this based on your settings

const defaultTo = (value, defaultValue) =>
  value == null ? defaultValue : value;

const formatWithDelimiters = (
  number,
  precision = 2,
  thousands = ",",
  decimal = "."
) => {
  if (isNaN(number) || number == null) {
    return "0";
  }

  number = (number / 100.0).toFixed(precision);
  const parts = number.split(".");
  const dollarsAmount = parts[0].replace(
    /(\d)(?=(\d\d\d)+(?!\d))/g,
    `$1${thousands}`
  );
  const centsAmount = parts[1] ? decimal + parts[1] : "";

  return dollarsAmount + centsAmount;
};

const formatMoney = (cents, format = moneyFormat) => {
  if (typeof cents === "string") {
    cents = cents.replace(".", "");
  }

  let value = "";
  const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  const formatString = format || moneyFormat;
  const match = formatString.match(placeholderRegex);

  if (!match) return formatString;

  switch (match[1]) {
    case "amount":
      value = formatWithDelimiters(cents, 2);
      if (superScript && value.includes(".")) {
        value = value.replace(".", "<sup>") + "</sup>";
      }
      break;
    case "amount_no_decimals":
      value = formatWithDelimiters(cents, 0);
      break;
    case "amount_with_comma_separator":
      value = formatWithDelimiters(cents, 2, ".", ",");
      if (superScript && value.includes(",")) {
        value = value.replace(",", "<sup>") + "</sup>";
      }
      break;
    case "amount_no_decimals_with_comma_separator":
      value = formatWithDelimiters(cents, 0, ".", ",");
      break;
    case "amount_no_decimals_with_space_separator":
      value = formatWithDelimiters(cents, 0, " ");
      break;
    default:
      value = formatString;
  }

  return formatString.replace(placeholderRegex, value);
};

const getBaseUnit = (variant) => {
  if (
    !variant ||
    !variant.unit_price_measurement ||
    !variant.unit_price_measurement.reference_value
  ) {
    return null;
  }

  return variant.unit_price_measurement.reference_value === 1
    ? variant.unit_price_measurement.reference_unit
    : `${variant.unit_price_measurement.reference_value}${variant.unit_price_measurement.reference_unit}`;
};

export { formatMoney, getBaseUnit };
