interface Token {
  idx: number;
  val: string;
}
function longestValidParentheses(s: string): number {
  let utilContainer: Token[] = [];
  for (let i = 0; i < s.length; i++) {
    if (utilContainer.length === 0) {
      utilContainer.push({
        idx: i,
        val: s[i],
      });
      continue;
    }
    if (utilContainer[utilContainer.length - 1].val === "(" && s[i] === ")") {
      utilContainer.pop();
    } else {
      utilContainer.push({
        idx: i,
        val: s[i],
      });
    }
  }
  if (utilContainer.length === 0) return s.length;
  let maxLength = 0;
  for (let i = 0; i < utilContainer.length; i++) {
    if (i === 0) {
      maxLength = Math.max(maxLength, utilContainer[i].idx);
    }
    if (i === utilContainer.length - 1) {
      maxLength = Math.max(
        maxLength,
        s.length - utilContainer[utilContainer.length - 1].idx - 1
      );
    }
    if (i !== 0) {
      maxLength = Math.max(
        maxLength,
        utilContainer[i].idx - utilContainer[i - 1].idx - 1
      );
    }
  }
  return maxLength;
}
