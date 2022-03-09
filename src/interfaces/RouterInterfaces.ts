interface _RouteConfigBase {
  path: string
  name?: unknown
  children?: IRouteConfig[]
  redirect?: any
  alias?: string | string[]
  meta?: any
  caseSensitive?: boolean
}

interface RouteConfigSingleView extends _RouteConfigBase {
  component?: any
  props?: boolean | Object | RoutePropsFunction
}

interface RouteConfigMultipleViews extends _RouteConfigBase {
  components?: Dictionary<any>
  props?: Dictionary<boolean | Object | RoutePropsFunction>
}

type RoutePropsFunction = (route: any) => Object
type Dictionary<T> = { [key: string]: T }

export type IRouteConfig = RouteConfigSingleView | RouteConfigMultipleViews