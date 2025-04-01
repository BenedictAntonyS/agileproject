"use strict";
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
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var cors_1 = require("cors");
var bcryptjs_1 = require("bcryptjs");
var body_parser_1 = require("body-parser");
var app = express_1["default"]();
var PORT = 5013;
app.use(cors_1["default"]());
app.use(body_parser_1["default"].json());
// MongoDB Connection
var MONGO_URI = "mongodb://127.0.0.1:27017/campus_connector";
mongoose_1["default"]
    .connect(MONGO_URI)
    .then(function () { return console.log("✅ MongoDB Connected"); })["catch"](function (err) { return console.error("❌ MongoDB Connection Error:", err); });
// User Model
var userSchema = new mongoose_1["default"].Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, "enum": ["user", "admin"], "default": "user" }
});
var User = mongoose_1["default"].model("User", userSchema);
// Login Route
app.post("/api/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, userType, user, isMatch, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password, userType = _a.userType;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User.findOne({ email: email })];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ message: "User not found" })];
                }
                isMatch = (password === user.password);
                if (!isMatch) {
                    return [2 /*return*/, res.status(401).json({ message: "Invalid credentials" })];
                }
                else {
                    console.log("nice");
                }
                if (user.userType !== userType) {
                    return [2 /*return*/, res.status(403).json({ message: "Unauthorized user type" })];
                }
                return [2 /*return*/, res.status(200).json({
                        message: "Login successful",
                        user: {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            userType: user.userType
                        }
                    })];
            case 3:
                error_1 = _b.sent();
                res.status(500).json({ message: "Server error", error: error_1 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Register Route
app.post("/api/register", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, existingUser, hashedPassword, newUser, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, User.findOne({ email: email })];
            case 2:
                existingUser = _b.sent();
                if (existingUser) {
                    return [2 /*return*/, res.status(400).json({ message: "Email already in use" })];
                }
                return [4 /*yield*/, bcryptjs_1["default"].hash(password, 10)];
            case 3:
                hashedPassword = _b.sent();
                newUser = new User({ name: name, email: email, password: hashedPassword });
                return [4 /*yield*/, newUser.save()];
            case 4:
                _b.sent();
                res.status(201).json({ message: "User registered successfully" });
                return [3 /*break*/, 6];
            case 5:
                error_2 = _b.sent();
                res.status(500).json({ message: "Server error", error: error_2 });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
// Get all users
app.get("/api/users", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User.find({}, "-password")];
            case 1:
                users = _a.sent();
                res.status(200).json(users);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(500).json({ message: "Server error", error: error_3 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Start the Server
app.listen(PORT, function () {
    return console.log("\uD83D\uDE80 Server running on http://localhost:" + PORT);
});
