/**
 *
 * @param {*} input Defines any input string to be validated against unacceptable characters.
 * Accepted characters include [QWERTYUIOPASDFGHJKLZXCVBNM_-0123456789]
 * @returns Character caught or "". Use "" to determine validity as not character is returned.
 */
export const getInvalidChar = (
  input: string,
  valid = "QWERTYUIOPASDFGHJKLZXCVBNM_-0123456789"
): string => {
  for (const char of input) {
    if (!valid.includes(char.toUpperCase())) return char; 
  }
  return "";
};
 