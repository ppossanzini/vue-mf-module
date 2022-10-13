"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleRoutes = exports.RunModule = exports.ConfigModule = exports.InitModule = exports.ModuleInitializer = exports.ValidateDirective = exports.Screen = exports.Inject = exports.MessageService = exports.CommonRegistry = exports.menuType = exports.MenuHelper = void 0;
const MenuHelper_1 = require("./helpers/MenuHelper");
Object.defineProperty(exports, "MenuHelper", { enumerable: true, get: function () { return MenuHelper_1.MenuHelper; } });
Object.defineProperty(exports, "menuType", { enumerable: true, get: function () { return MenuHelper_1.menuType; } });
const CommonRegistry_1 = require("./helpers/CommonRegistry");
Object.defineProperty(exports, "CommonRegistry", { enumerable: true, get: function () { return CommonRegistry_1.CommonRegistry; } });
const MessageService_1 = require("./helpers/MessageService");
Object.defineProperty(exports, "MessageService", { enumerable: true, get: function () { return MessageService_1.MessageService; } });
const inject_1 = __importDefault(require("./components/inject"));
exports.Inject = inject_1.default;
const screen_1 = __importDefault(require("./components/screen"));
exports.Screen = screen_1.default;
const Projector_1 = require("./helpers/Projector");
const screen_2 = __importStar(require("./directives/screen"));
const validate_1 = require("./directives/validate");
Object.defineProperty(exports, "ValidateDirective", { enumerable: true, get: function () { return validate_1.validate; } });
function install(Vue) {
    Vue.component("screen", screen_1.default);
    Vue.component("inject", inject_1.default);
    Vue.directive("screen", screen_2.default.screenDirective);
    Vue.directive("projectTo", screen_2.default.projectToDirective);
    Vue.directive("validate", validate_1.validate);
}
exports.default = { install };
function ModuleInitializer(opts) {
    let moduleConfig = {};
    return {
        init(menu, store, configuration, options) {
            if (options.registry)
                CommonRegistry_1.CommonRegistry.Instance = options.registry;
            if (options.messageService)
                MessageService_1.MessageService.Instance = options.messageService;
            if (options.projector)
                Projector_1.Projector.Instance = options.projector;
            if (options.screens)
                screen_2.ScreensManager.Instance = options.screens;
            moduleConfig = configuration;
            return opts.init(menu, store, configuration);
        },
        config(menu, store) {
            return opts.config ? opts.config(menu, store, moduleConfig) : null;
        },
        run(menu, store) {
            return opts.run ? opts.run(menu, store, moduleConfig) : null;
        },
        routes: opts.routes
    };
}
exports.ModuleInitializer = ModuleInitializer;
function InitModule(module, store, configuration) {
    const initobj = (module.default.default || module.default);
    return initobj.init(MenuHelper_1.MenuHelper.Instance, store, configuration || {}, {
        registry: CommonRegistry_1.CommonRegistry.Instance,
        messageService: MessageService_1.MessageService.Instance,
        projector: Projector_1.Projector.Instance,
        screens: screen_2.ScreensManager.Instance
    }).then(() => {
        return initobj;
    });
}
exports.InitModule = InitModule;
function ConfigModule(module, store) {
    const initobj = (module.default.default || module.default);
    return initobj.config(MenuHelper_1.MenuHelper.Instance, store);
}
exports.ConfigModule = ConfigModule;
function RunModule(module, store) {
    const initobj = (module.default.default || module.default);
    return initobj.run(MenuHelper_1.MenuHelper.Instance, store);
}
exports.RunModule = RunModule;
function ModuleRoutes(module) {
    const initobj = (module.default.default || module.default);
    return initobj.routes;
}
exports.ModuleRoutes = ModuleRoutes;
