function checkInputValidation(a, callout) {
    if (a.target.validity) {
        let el = a.target;
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
                el.validity.valueMissing ? "value missing" : null
            ].filter(i => !!i);
            callout(errors, el.validity.valid != undefined ? el.validity.valid : true);
        }
    }
}
export const validate = {
    inserted: (el, bind) => {
        if (!el || !el.willValidate)
            return;
        switch (el.nodeName) {
            case "INPUT":
            case "TEXTAREA":
                el.onblur = (arg) => checkInputValidation(arg, bind.value);
                break;
            case "SELECT":
                el.onchange = (arg) => checkInputValidation(arg, bind.value);
                break;
        }
        el.oninvalid = (arg) => checkInputValidation(arg, bind.value);
        if (el.form)
            el.form.addEventListener('invalid', () => checkInputValidation({ target: el }, bind.value));
        if (bind.arg == "immediate")
            el.reportValidity();
        else
            checkInputValidation({ target: el }, bind.value);
    },
    unbind: (el) => {
        if (!el)
            return;
    },
};
