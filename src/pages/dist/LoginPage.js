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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var axios_1 = require("axios");
var lucide_react_1 = require("lucide-react");
var UserContext_1 = require("../context/UserContext");
var LoginPage = function () {
    var _a = UserContext_1.useUser(), isAuthenticated = _a.isAuthenticated, userType = _a.userType, login = _a.login, setUserType = _a.setUserType;
    var username = UserContext_1.useUser1().username;
    var _b = react_1.useState("login"), authMode = _b[0], setAuthMode = _b[1];
    var _c = react_1.useState({
        email: "",
        password: "",
        name: ""
    }), formData = _c[0], setFormData = _c[1];
    var _d = react_1.useState(false), loading = _d[0], setLoading = _d[1];
    var _e = react_1.useState(""), error = _e[0], setError = _e[1];
    var navigate = react_router_dom_1.useNavigate();
    // Redirect if already authenticated
    if (isAuthenticated) {
        return react_1["default"].createElement(react_router_dom_1.Navigate, { to: userType === "admin" ? "/admin" : "/user" });
    }
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var response, userData, response, err_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    e.preventDefault();
                    setLoading(true);
                    setError("");
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, 7, 8]);
                    if (!(authMode === "login")) return [3 /*break*/, 3];
                    return [4 /*yield*/, axios_1["default"].post("http://localhost:5013/api/login", {
                            email: formData.email,
                            password: formData.password,
                            userType: userType
                        })];
                case 2:
                    response = _c.sent();
                    if (response.status === 200) {
                        userData = response.data.user;
                        login(userData);
                        navigate(userData.userType === "admin" ? "/admin" : "/user");
                    }
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, axios_1["default"].post("http://localhost:5013/api/register", {
                        name: formData.name,
                        email: formData.email,
                        password: formData.password
                    })];
                case 4:
                    response = _c.sent();
                    if (response.status === 201) {
                        alert("Registration Successful! Please log in.");
                        setAuthMode("login");
                    }
                    _c.label = 5;
                case 5: return [3 /*break*/, 8];
                case 6:
                    err_1 = _c.sent();
                    setError(((_b = (_a = err_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || "An error occurred");
                    return [3 /*break*/, 8];
                case 7:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    var handleInputChange = function (e) {
        var _a;
        setFormData(__assign(__assign({}, formData), (_a = {}, _a[e.target.name] = e.target.value, _a)));
    };
    return (react_1["default"].createElement("div", { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4" },
        react_1["default"].createElement("div", { className: "max-w-4xl w-full bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden" },
            react_1["default"].createElement("div", { className: "md:w-1/2 bg-indigo-600 p-8 text-white flex flex-col justify-center" },
                react_1["default"].createElement("h1", { className: "text-4xl font-bold mb-6" }, "Campus Connector"),
                react_1["default"].createElement("p", { className: "text-lg mb-6" }, "Connect, Network, and Participate in Campus Events"),
                react_1["default"].createElement("div", { className: "space-y-4" },
                    react_1["default"].createElement("div", { className: "flex items-center" },
                        react_1["default"].createElement(lucide_react_1.Users, { className: "w-6 h-6 mr-3" }),
                        react_1["default"].createElement("span", null, "Connect with fellow students")),
                    react_1["default"].createElement("div", { className: "flex items-center" },
                        react_1["default"].createElement(lucide_react_1.ShieldCheck, { className: "w-6 h-6 mr-3" }),
                        react_1["default"].createElement("span", null, "Secure event management")))),
            react_1["default"].createElement("div", { className: "md:w-1/2 p-8" },
                authMode === "login" && (react_1["default"].createElement("div", { className: "flex justify-center mb-6" },
                    react_1["default"].createElement("div", { className: "bg-gray-100 p-1 rounded-lg inline-flex" },
                        react_1["default"].createElement("button", { className: "px-4 py-2 rounded-md " + (userType === "user"
                                ? "bg-white shadow-sm text-indigo-600"
                                : "text-gray-500"), onClick: function () { return setUserType("user"); } }, "User"),
                        react_1["default"].createElement("button", { className: "px-4 py-2 rounded-md " + (userType === "admin"
                                ? "bg-white shadow-sm text-indigo-600"
                                : "text-gray-500"), onClick: function () { return setUserType("admin"); } }, "Admin")))),
                react_1["default"].createElement("h2", { className: "text-2xl font-bold text-center mb-6" }, authMode === "login"
                    ? userType === "admin"
                        ? "Admin Login"
                        : "User Login"
                    : "Create Account"),
                error && (react_1["default"].createElement("div", { className: "mb-4 p-3 bg-red-100 text-red-700 rounded-lg" }, error)),
                react_1["default"].createElement("form", { onSubmit: handleSubmit, className: "space-y-4" },
                    authMode === "register" && (react_1["default"].createElement("div", null,
                        react_1["default"].createElement("label", { className: "block text-sm font-medium text-gray-700 mb-1" }, "Full Name"),
                        react_1["default"].createElement("input", { type: "text", name: "name", value: formData.name, onChange: handleInputChange, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent", required: true }))),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("label", { className: "block text-sm font-medium text-gray-700 mb-1" }, "Email Address"),
                        react_1["default"].createElement("input", { type: "email", name: "email", value: formData.email, onChange: handleInputChange, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent", required: true })),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("label", { className: "block text-sm font-medium text-gray-700 mb-1" }, "Password"),
                        react_1["default"].createElement("input", { type: "password", name: "password", value: formData.password, onChange: handleInputChange, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent", required: true })),
                    react_1["default"].createElement("button", { type: "submit", disabled: loading, className: "w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 " + (loading ? "opacity-70 cursor-not-allowed" : "") }, loading ? ("Processing...") : authMode === "login" ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement(lucide_react_1.LogIn, { className: "w-5 h-5" }),
                        react_1["default"].createElement("span", null, "Login"))) : (react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement(lucide_react_1.UserPlus, { className: "w-5 h-5" }),
                        react_1["default"].createElement("span", null, "Register")))),
                    userType === "user" && (react_1["default"].createElement("p", { className: "text-center text-sm text-gray-600" },
                        authMode === "login"
                            ? "Don't have an account? "
                            : "Already have an account? ",
                        react_1["default"].createElement("button", { type: "button", onClick: function () {
                                return setAuthMode(authMode === "login" ? "register" : "login");
                            }, className: "text-indigo-600 hover:text-indigo-800 font-medium" }, authMode === "login" ? "Register here" : "Login here"))))))));
};
exports["default"] = LoginPage;
