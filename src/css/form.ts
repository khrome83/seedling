import {
  indent as indentFormatter,
  newline as newlineFormatter,
} from "./format.ts";

const formTypes = new Map();

const formInput = (l: number, i: Function, nl: Function): string => {
  return i(l) + ".form-input {" + nl +
    i(l + 1) + "-webkit-appearance: none;" + nl +
    i(l + 1) + "-moz-appearance: none;" + nl +
    i(l + 1) + "appearance: none;" + nl +
    i(l + 1) + "background-color: #fff;" + nl +
    i(l + 1) + "border-color: #d2d6dc;" + nl +
    i(l + 1) + "border-width: 1px;" + nl +
    i(l + 1) + "border-radius: 0.375rem;" + nl +
    i(l + 1) + "padding-top: 0.5rem;" + nl +
    i(l + 1) + "padding-right: 0.75rem;" + nl +
    i(l + 1) + "padding-bottom: 0.5rem;" + nl +
    i(l + 1) + "padding-left: 0.75rem;" + nl +
    i(l + 1) + "font-size: 1rem;" + nl +
    i(l + 1) + "line-height: 1.5;" + nl +
    i(l) + "}" + nl +
    i(l) + ".form-input::-moz-placeholder {" + nl +
    i(l + 1) + "color: #9fa6b2;" + nl +
    i(l + 1) + "opacity: 1;" + nl +
    i(l) + "}" + nl +
    i(l) + ".form-input:-ms-input-placeholder {" + nl +
    i(l + 1) + "color: #9fa6b2;" + nl +
    i(l + 1) + "opacity: 1;" + nl +
    i(l) + "}" + nl +
    i(l) + ".form-input::-ms-input-placeholder {" + nl +
    i(l + 1) + "color: #9fa6b2;" + nl +
    i(l + 1) + "opacity: 1;" + nl +
    i(l) + "}" + nl +
    i(l) + ".form-input::placeholder {" + nl +
    i(l + 1) + "color: #9fa6b2;" + nl +
    i(l + 1) + "opacity: 1;" + nl +
    i(l) + "}" + nl +
    i(l) + ".form-input:focus {" + nl +
    i(l + 1) + "outline: 0;" + nl +
    i(l + 1) + "box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45);" + nl +
    i(l + 1) + "border-color: #a4cafe;" + nl +
    i(l) + "}" + nl;
};

formTypes.set("form-input", formInput);

const formTextarea = (l: number, i: Function, nl: Function): string => {
  return i(l) + ".form-textarea {" + nl +
    i(l + 1) + "-webkit-appearance: none;" + nl +
    i(l + 1) + "-moz-appearance: none;" + nl +
    i(l + 1) + "appearance: none;" + nl +
    i(l + 1) + "background-color: #fff;" + nl +
    i(l + 1) + "border-color: #d2d6dc;" + nl +
    i(l + 1) + "border-width: 1px;" + nl +
    i(l + 1) + "border-radius: 0.375rem;" + nl +
    i(l + 1) + "padding-top: 0.5rem;" + nl +
    i(l + 1) + "padding-right: 0.75rem;" + nl +
    i(l + 1) + "padding-bottom: 0.5rem;" + nl +
    i(l + 1) + "padding-left: 0.75rem;" + nl +
    i(l + 1) + "font-size: 1rem;" + nl +
    i(l + 1) + "line-height: 1.5;" + nl +
    i(l) + "}" + nl +
    i(l) + ".form-textarea::-moz-placeholder {" + nl +
    i(l + 1) + "color: #9fa6b2;" + nl +
    i(l + 1) + "opacity: 1;" + nl +
    i(l) + "}" + nl +
    i(l) + ".form-textarea:-ms-input-placeholder {" + nl +
    i(l + 1) + "color: #9fa6b2;" + nl +
    i(l + 1) + "opacity: 1;" + nl +
    i(l) + "}" + nl +
    i(l) + ".form-textarea::-ms-input-placeholder {" + nl +
    i(l + 1) + "color: #9fa6b2;" + nl +
    i(l + 1) + "opacity: 1;" + nl +
    i(l) + "}" + nl +
    i(l) + ".form-textarea::placeholder {" + nl +
    i(l + 1) + "color: #9fa6b2;" + nl +
    i(l + 1) + "opacity: 1;" + nl +
    i(l) + "}" + nl +
    i(l) + ".form-textarea:focus {" + nl +
    i(l + 1) + "outline: 0;" + nl +
    i(l + 1) + "box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45);" + nl +
    i(l + 1) + "border-color: #a4cafe;" + nl +
    i(l) + "}" + nl;
};

formTypes.set("form-textarea", formTextarea);

const formMultiselect = (l: number, i: Function, nl: Function): string => {
  return i(l) + ".form-multiselect {" + nl +
    i(l + 1) + "-webkit-appearance: none;" + nl +
    i(l + 1) + "-moz-appearance: none;" + nl +
    i(l + 1) + "appearance: none;" + nl +
    i(l + 1) + "background-color: #fff;" + nl +
    i(l + 1) + "border-color: #d2d6dc;" + nl +
    i(l + 1) + "border-width: 1px;" + nl +
    i(l + 1) + "border-radius: 0.375rem;" + nl +
    i(l + 1) + "padding-top: 0.5rem;" + nl +
    i(l + 1) + "padding-right: 0.75rem;" + nl +
    i(l + 1) + "padding-bottom: 0.5rem;" + nl +
    i(l + 1) + "padding-left: 0.75rem;" + nl +
    i(l + 1) + "font-size: 1rem;" + nl +
    i(l + 1) + "line-height: 1.5;" + nl +
    i(l) + "}" + nl +
    i(l) + ".form-multiselect:focus {" + nl +
    i(l + 1) + "outline: 0;" + nl +
    i(l + 1) + "box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45);" + nl +
    i(l + 1) + "border-color: #a4cafe;" + nl +
    i(l) + "}" + nl;
};

formTypes.set("form-multiselect", formMultiselect);

const formSelect = (l: number, i: Function, nl: Function): string => {
  return i(l) + ".form-select {" + nl +
    i(l + 1) +
    "background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3e%3cpath d='M7 7l3-3 3 3m0 6l-3 3-3-3' stroke='%239fa6b2' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e\");" +
    nl +
    i(l + 1) + "-webkit-appearance: none;" + nl +
    i(l + 1) + "-moz-appearance: none;" + nl +
    i(l + 1) + "appearance: none;" + nl +
    i(l + 1) + "-webkit-print-color-adjust: exact;" + nl +
    i(l + 1) + "color-adjust: exact;" + nl +
    i(l + 1) + "background-repeat: no-repeat;" + nl +
    i(l + 1) + "background-color: #fff;" + nl +
    i(l + 1) + "border-color: #d2d6dc;" + nl +
    i(l + 1) + "border-width: 1px;" + nl +
    i(l + 1) + "border-radius: 0.375rem;" + nl +
    i(l + 1) + "padding-top: 0.5rem;" + nl +
    i(l + 1) + "padding-right: 2.5rem;" + nl +
    i(l + 1) + "padding-bottom: 0.5rem;" + nl +
    i(l + 1) + "padding-left: 0.75rem;" + nl +
    i(l + 1) + "font-size: 1rem;" + nl +
    i(l + 1) + "line-height: 1.5;" + nl +
    i(l + 1) + "background-position: right 0.5rem center;" + nl +
    i(l + 1) + "background-size: 1.5em 1.5em;" + nl +
    i(l) + "}" + nl +
    i(l) + ".form-select::-ms-expand {" + nl +
    i(l + 1) + "color: #9fa6b2;" + nl +
    i(l + 1) + "border: none;" + nl +
    i(l) + "}" + nl +
    i(l) + "@media not print {" + nl +
    i(l + 1) + ".form-select::-ms-expand {" + nl +
    i(l + 2) + "display: none;" + nl +
    i(l + 1) + "}" + nl +
    i(l) + "}" + nl +
    i(l) + "@media print and (-ms-high-contrast: active)," + nl +
    i(l + 1) + "print and (-ms-high-contrast: none) {" + nl +
    i(l + 1) + ".form-select {" + nl +
    i(l + 2) + "padding-right: 0.75rem;" + nl +
    i(l + 1) + "}" + nl +
    i(l) + "}" + nl +
    i(l) + ".form-select:focus {" + nl +
    i(l + 1) + "outline: 0;" + nl +
    i(l + 1) + "box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45);" + nl +
    i(l + 1) + "border-color: #a4cafe;" + nl +
    i(l) + "}" + nl;
};

formTypes.set("form-select", formSelect);

const formCheckbox = (l: number, i: Function, nl: Function): string => {
  return i(l) + ".form-checkbox:checked {" + nl +
    i(l + 1) +
    "background-image: url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e\");" +
    nl +
    i(l + 1) + "border-color: transparent;" + nl +
    i(l + 1) + "background-color: currentColor;" + nl +
    i(l + 1) + "background-size: 100% 100%;" + nl +
    i(l + 1) + "background-position: center;" + nl +
    i(l + 1) + "background-repeat: no-repeat;" + nl +
    i(l) + "}" + nl +
    i(l) + "@media not print {" + nl +
    i(l + 1) + ".form-checkbox::-ms-check {" + nl +
    i(l + 2) + "border-width: 1px;" + nl +
    i(l + 2) + "color: transparent;" + nl +
    i(l + 2) + "background: inherit;" + nl +
    i(l + 2) + "border-color: inherit;" + nl +
    i(l + 2) + "border-radius: inherit;" + nl +
    i(l + 1) + "}" + nl +
    i(l) + "}" + nl +
    i(l) + ".form-checkbox {" + nl +
    i(l + 1) + "-webkit-appearance: none;" + nl +
    i(l + 1) + "-moz-appearance: none;" + nl +
    i(l + 1) + "appearance: none;" + nl +
    i(l + 1) + "-webkit-print-color-adjust: exact;" + nl +
    i(l + 1) + "color-adjust: exact;" + nl +
    i(l + 1) + "display: inline-block;" + nl +
    i(l + 1) + "vertical-align: middle;" + nl +
    i(l + 1) + "background-origin: border-box;" + nl +
    i(l + 1) + "-webkit-user-select: none;" + nl +
    i(l + 1) + "-moz-user-select: none;" + nl +
    i(l + 1) + "-ms-user-select: none;" + nl +
    i(l + 1) + "user-select: none;" + nl +
    i(l + 1) + "flex-shrink: 0;" + nl +
    i(l + 1) + "height: 1rem;" + nl +
    i(l + 1) + "width: 1rem;" + nl +
    i(l + 1) + "color: #3f83f8;" + nl +
    i(l + 1) + "background-color: #fff;" + nl +
    i(l + 1) + "border-color: #d2d6dc;" + nl +
    i(l + 1) + "border-width: 1px;" + nl +
    i(l + 1) + "border-radius: 0.25rem;" + nl +
    i(l) + "}" + nl +
    i(l) + ".form-checkbox:focus {" + nl +
    i(l + 1) + "outline: 0;" + nl +
    i(l + 1) + "box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45);" + nl +
    i(l + 1) + "border-color: #a4cafe;" + nl +
    i(l) + "}" + nl +
    i(l) + ".form-checkbox:checked:focus {" + nl +
    i(l + 1) + "border-color: transparent;" + nl +
    i(l) + "}" + nl;
};

formTypes.set("form-checkbox", formCheckbox);

const formRadio = (l: number, i: Function, nl: Function): string => {
  return i(l) + ".form-radio:checked {" + nl +
    i(l + 1) +
    "background-image: url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e\");" +
    nl +
    i(l + 1) + "border-color: transparent;" + nl +
    i(l + 1) + "background-color: currentColor;" + nl +
    i(l + 1) + "background-size: 100% 100%;" + nl +
    i(l + 1) + "background-position: center;" + nl +
    i(l + 1) + "background-repeat: no-repeat;" + nl +
    i(l) + "}" + nl +
    i(l) + "@media not print {" + nl +
    i(l + 1) + ".form-radio::-ms-check {" + nl +
    i(l + 2) + "border-width: 1px;" + nl +
    i(l + 2) + "color: transparent;" + nl +
    i(l + 2) + "background: inherit;" + nl +
    i(l + 2) + "border-color: inherit;" + nl +
    i(l + 2) + "border-radius: inherit;" + nl +
    i(l + 1) + "}" + nl +
    i(l) + "}" + nl +
    i(l) + ".form-radio {" + nl +
    i(l + 1) + "-webkit-appearance: none;" + nl +
    i(l + 1) + "-moz-appearance: none;" + nl +
    i(l + 1) + "appearance: none;" + nl +
    i(l + 1) + "-webkit-print-color-adjust: exact;" + nl +
    i(l + 1) + "color-adjust: exact;" + nl +
    i(l + 1) + "display: inline-block;" + nl +
    i(l + 1) + "vertical-align: middle;" + nl +
    i(l + 1) + "background-origin: border-box;" + nl +
    i(l + 1) + "-webkit-user-select: none;" + nl +
    i(l + 1) + "-moz-user-select: none;" + nl +
    i(l + 1) + "-ms-user-select: none;" + nl +
    i(l + 1) + "user-select: none;" + nl +
    i(l + 1) + "flex-shrink: 0;" + nl +
    i(l + 1) + "border-radius: 100%;" + nl +
    i(l + 1) + "height: 1rem;" + nl +
    i(l + 1) + "width: 1rem;" + nl +
    i(l + 1) + "color: #3f83f8;" + nl +
    i(l + 1) + "background-color: #fff;" + nl +
    i(l + 1) + "border-color: #d2d6dc;" + nl +
    i(l + 1) + "border-width: 1px;" + nl +
    i(l) + "}" + nl +
    i(l) + ".form-radio:focus {" + nl +
    i(l + 1) + "outline: 0;" + nl +
    i(l + 1) + "box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45);" + nl +
    i(l + 1) + "border-color: #a4cafe;" + nl +
    i(l) + "}" + nl +
    i(l) + ".form-radio:checked:focus {" + nl +
    i(l + 1) + "border-color: transparent;" + nl +
    i(l) + "}" + nl;
};

formTypes.set("form-radio", formRadio);

export default (identifier: string, level = 0, m = false) => {
  const i = indentFormatter(m);
  const nl = newlineFormatter(m)();

  if (formTypes.has(identifier)) {
    return formTypes.get(identifier)(level, i, nl);
  }

  return;
};
