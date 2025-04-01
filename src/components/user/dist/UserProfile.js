"use strict";
exports.__esModule = true;
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var UserProfile = function (_a) {
    var userData = _a.userData;
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("h1", null, userData.name),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement(lucide_react_1.Mail, null),
            " ",
            userData.email),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement(lucide_react_1.Calendar, null),
            " ",
            userData.dateOfBirth),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement(lucide_react_1.BookOpen, null),
            " ",
            userData.bio)));
};
exports["default"] = UserProfile;
// Ensure correct relative path
var App = function () {
    var _a = react_1.useState("Connecting to MongoDB..."), message = _a[0], setMessage = _a[1];
    //useEffect(() => {
    //  setTimeout(() => {
    //    setMessage("✅ Connected to MongoDB Atlas!");
    //  }, 2000);
    //}, []);
    return (react_1["default"].createElement("div", { style: { textAlign: "center", marginTop: "50px" } },
        react_1["default"].createElement("h1", null, "Welcome to My mongo db"),
        react_1["default"].createElement("p", null, message)));
};
react_dom_1["default"].render(react_1["default"].createElement(App, null), document.getElementById("root"));
