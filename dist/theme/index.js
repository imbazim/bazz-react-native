"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBazzTheme = useBazzTheme;
exports.BazzProvider = BazzProvider;
exports.useBazzStyles = useBazzStyles;
exports.withBazz = withBazz;
var react_1 = __importStar(require("react"));
var colors_1 = __importDefault(require("./colors"));
var sizes_1 = __importDefault(require("./sizes"));
var DEFAULT_THEME = {
    COLORS: colors_1.default,
    SIZES: sizes_1.default,
};
var BazzContext = (0, react_1.createContext)(DEFAULT_THEME);
function useBazzTheme() {
    var theme = (0, react_1.useContext)(BazzContext);
    if (!theme) {
        throw new Error('useBazzTheme must be used within a BazzProvider');
    }
    return theme;
}
function BazzProvider(_a) {
    var _b = _a.theme, theme = _b === void 0 ? {} : _b, children = _a.children;
    var providerTheme = (0, react_1.useMemo)(function () { return (__assign({ COLORS: __assign(__assign({}, DEFAULT_THEME.COLORS), theme === null || theme === void 0 ? void 0 : theme.COLORS), SIZES: __assign(__assign({}, DEFAULT_THEME.SIZES), theme === null || theme === void 0 ? void 0 : theme.SIZES) }, theme === null || theme === void 0 ? void 0 : theme.customTheme)); }, [theme]);
    return (<BazzContext.Provider value={providerTheme}>
            {children}
        </BazzContext.Provider>);
}
function useBazzStyles(styles) {
    var theme = useBazzTheme();
    return styles ? styles(theme) : undefined;
}
function withBazz(Component, styles) {
    return Component;
}
exports.default = DEFAULT_THEME;
//# sourceMappingURL=index.js.map