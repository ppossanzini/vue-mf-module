export declare const validate: {
    inserted: (el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, bind: {
        value: (errors: string[], valid: boolean) => void;
        arg: "immediate";
    }) => void;
    unbind: (el: Element) => void;
};
