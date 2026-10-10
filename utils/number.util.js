export function isValidNumber (number) {
  if (!parseInt(number)) {
    return false;
  }

  if (number <= 0) {
    return false;
  }

  return true;
}
