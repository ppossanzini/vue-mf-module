import Vue from "vue";
export default class Inject extends Vue {
    id: string | number | null;
    type: string | null;
    value: any;
    name: string | null;
    names: string[] | null;
    group?: string;
    metadata?: {
        [id: string]: any;
    };
    disabled: boolean;
    readonly: boolean;
    get Value(): any;
    set Value(v: any);
    get Components(): any[];
    click(...args: any[]): void;
    save(...args: any[]): void;
}
