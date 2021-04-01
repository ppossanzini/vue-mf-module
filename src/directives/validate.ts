function checkInputValidation(a: Event, callout: (errors: string[], valid: boolean) => void) {
  if ((a.target as HTMLInputElement).validity) {
    let el = (a.target as HTMLInputElement);

    if (el.validity) {
      let errors = [
        el.validity.badInput ? "bad input" : null,
        el.validity.customError ? "custom error" : null,
        el.validity.patternMismatch ? "pattern mismatch" : null,
        el.validity.rangeOverflow ? "range overflow" : null,
        el.validity.rangeUnderflow ? "range underflow" : null,
        el.validity.stepMismatch ? "step mismatch" : null,
        el.validity.tooLong ? "too long" : null,
        el.validity.tooShort ? "too short" : null,
        el.validity.typeMismatch ? "type mismatch" : null,
        el.validity.valueMissing ? "value missing" : null].filter(i => !!i)

      callout(errors as string[], el.validity.valid != undefined ? el.validity.valid : true);
    }
  }
}

export const validate = {
  inserted: (el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, bind: {
    value: (errors: string[], valid: boolean) => void,
    arg: "immediate"
  }) => {
    if (!el || !el.willValidate) return;
    switch (el.nodeName) {
      case "INPUT":
      case "TEXTAREA": el.onblur = (arg) => checkInputValidation(arg, bind.value); break;
      case "SELECT": el.onchange = (arg) => checkInputValidation(arg, bind.value); break;
    }

    el.oninvalid = (arg) => checkInputValidation(arg, bind.value);
    if (el.form) el.form.addEventListener('invalid', () => checkInputValidation({ target: el } as any, bind.value))

    if (bind.arg == "immediate") el.reportValidity();
    else checkInputValidation({ target: el } as any, bind.value)
  },
  unbind: (el: Element) => {
    if (!el) return;

  },
}
