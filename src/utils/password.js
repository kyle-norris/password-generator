import zxcvbn from "zxcvbn"

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz"
const UPPERCASE = LOWERCASE.toUpperCase()
const NUMBERS = "1234567890"
const SYMBOLS = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"


export function generate(
    length=10,
    lowercase=true,
    uppercase=true,
    numbers=true,
    symbols=true
) {
    const charsToUse = (
        (lowercase ? LOWERCASE : "") + 
        (uppercase ? UPPERCASE : "") + 
        (numbers ? NUMBERS : "") + 
        (symbols ? SYMBOLS : "")
    );
    const charsLength = charsToUse.length;
    var password = "";

    for (let i = 0; i < length; i++) {
        var char = Math.floor(Math.random() * charsLength + 1);
        password += charsToUse.charAt(char)
    }

    return password;
}


export function calculateStrength(password) {
    const score = zxcvbn(password).score;

    // This score is on a scale of 0-4, but we want it to be 1-4
    return score > 0 ? score : 1;
  }