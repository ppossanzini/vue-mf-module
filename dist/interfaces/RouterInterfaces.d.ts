interface _RouteConfigBase {
    path: string;
    name?: string;
    children?: IRouteConfig[];
    redirect?: any;
    alias?: string | string[];
    meta?: any;
    caseSensitive?: boolean;
}
interface RouteConfigSingleView extends _RouteConfigBase {
    component?: any;
    props?: boolean | Object | RoutePropsFunction;
}
interface RouteConfigMultipleViews extends _RouteConfigBase {
    components?: Dictionary<any>;
    props?: Dictionary<boolean | Object | RoutePropsFunction>;
}
declare type RoutePropsFunction = (route: any) => Object;
declare type Dictionary<T> = {
    [key: string]: T;
};
export declare type IRouteConfig = RouteConfigSingleView | RouteConfigMultipleViews;
export {};
