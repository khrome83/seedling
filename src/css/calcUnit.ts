export default (token: string, split?: boolean): string => {
  let pos;
  let amount;
  if (split) {
    const splitPos = token.indexOf("-");
    if (splitPos !== -1) {
      amount = token.substring(splitPos + 1);
    }
  }

  if (amount === undefined) {
    amount = token;
  }

  if (amount === "0") {
    return "0";
  } else if (amount === "px") {
    return "1px";
  } else if (amount === "full") {
    return "100%";
  } else if ((pos = amount.indexOf("/")) !== -1) {
    const n = +amount.substring(0, pos);
    const d = +amount.substring(pos + 1);
    return ((n / d) * 100) + "%";
  }

  return (+amount * 0.25) + "rem";
};
