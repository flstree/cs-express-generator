function caesarCipherEncrypt(text, shift) {
  const normalizedShift = shift % 26; // Normalize shift to handle large numbers
  return text
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      // Check if character is uppercase
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + normalizedShift) % 26) + 65);
      }
      // Check if character is lowercase
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + normalizedShift) % 26) + 97);
      }
      // Return the character as is (non-alphabetical characters)
      return char;
    })
    .join("");
}

function caesarCipherDecrypt(text, shift) {
  const normalizedShift = shift % 26; // Normalize shift
  return text
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      // Check if character is uppercase
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(
          ((code - 65 - normalizedShift + 26) % 26) + 65
        );
      }
      // Check if character is lowercase
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(
          ((code - 97 - normalizedShift + 26) % 26) + 97
        );
      }
      // Return the character as is (non-alphabetical characters)
      return char;
    })
    .join("");
}

module.exports = { caesarCipherEncrypt, caesarCipherDecrypt };
