var decodeString = function (s: string): string {
  let stack = [];
  let i = 0;
  while (i < s.length) {
    if (isDigit(s[i])) {
      let n = "";
      while (isDigit(s[i])) n += s[i++];
      stack.push(+n);
    } else if (s[i] === "[" || isAlpha(s[i]))
      while (i < s.length && (s[i] === "[" || isAlpha(s[i])))
        stack.push(s[i++]);
    else {
      i++;
      let c,
        str = "";
      while ((c = stack.pop()) !== "[") str = c + str;
      let num = stack.pop() as number;
      stack.push(str.repeat(num));
    }
  }
  return stack.join("");
};

function isDigit(n: string): boolean {
  return /\d/.test(n);
}
function isAlpha(c: string): boolean {
  return /[a-zA-Z]/.test(c);
}
