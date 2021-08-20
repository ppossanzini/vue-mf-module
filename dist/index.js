import { MenuHelper, menuType } from "./helpers/MenuHelper";
import { CommonRegistry } from "./helpers/CommonRegistry";
import { MessageService } from "./helpers/MessageService";
import Inject from "./components/inject";
import Screen from "./components/screen";
import { Projector } from "./helpers/Projector";
import directives, { ScreensManager } from "./directives/screen";
import { validate as ValidateDirective } from "./directives/validate";
export { MenuHelper, menuType, CommonRegistry, MessageService, Inject, Screen, ValidateDirective };
function install(Vue) {
    Vue.component("screen", Screen);
    Vue.component("inject", Inject);
    Vue.directive("screen", directives.screenDirective);
    Vue.directive("projectTo", directives.projectToDirective);
    Vue.directive("validate", ValidateDirective);
}
export default { install };
export function ModuleInitializer(opts) {
    return {
        init(menu, store, configuration, options) {
            if (options.registry)
                CommonRegistry.Instance = options.registry;
            if (options.messageService)
                MessageService.Instance = options.messageService;
            if (options.projector)
                Projector.Instance = options.projector;
            if (options.screens)
                ScreensManager.Instance = options.screens;
            opts.init(menu, store, configuration);
        },
        routes: opts.routes
    };
}
export function InitModule(module, store, configuration) {
    var initobj = (module.default.default || module.default);
    initobj.init(MenuHelper.Instance, store, configuration || {}, {
        registry: CommonRegistry.Instance,
        messageService: MessageService.Instance,
        projector: Projector.Instance,
        screens: ScreensManager.Instance
    });
    return initobj;
}
