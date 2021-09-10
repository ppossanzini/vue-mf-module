import Vue from "vue";
import { IProjectableModel } from "../helpers/Projector";
export default class Screen extends Vue {
    name: string;
    currentView: any;
    model: IProjectableModel<any> | null;
    get isVisible(): boolean;
    mounted(): void;
}
