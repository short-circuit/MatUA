"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var EncryptionMethod;
(function (EncryptionMethod) {
    EncryptionMethod[EncryptionMethod["None"] = 0] = "None";
    EncryptionMethod[EncryptionMethod["AES128"] = 1] = "AES128";
    EncryptionMethod[EncryptionMethod["AES256"] = 2] = "AES256";
})(EncryptionMethod = exports.EncryptionMethod || (exports.EncryptionMethod = {}));
var GraphType;
(function (GraphType) {
    GraphType[GraphType["Gauge"] = 0] = "Gauge";
    GraphType[GraphType["LinearGauge"] = 1] = "LinearGauge";
    GraphType[GraphType["VerticalBar"] = 2] = "VerticalBar";
    GraphType[GraphType["HorizontalBar"] = 3] = "HorizontalBar";
    GraphType[GraphType["Pie"] = 4] = "Pie";
    GraphType[GraphType["Line"] = 5] = "Line";
    GraphType[GraphType["Radar"] = 6] = "Radar";
})(GraphType = exports.GraphType || (exports.GraphType = {}));
var GuiObject = /** @class */ (function () {
    function GuiObject() {
        this.data = [];
    }
    return GuiObject;
}());
exports.GuiObject = GuiObject;
var GraphObject = /** @class */ (function (_super) {
    __extends(GraphObject, _super);
    function GraphObject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GraphObject;
}(GuiObject));
exports.GraphObject = GraphObject;
var SettingsClass = /** @class */ (function () {
    function SettingsClass() {
        this.windowsize = { x: 0, y: 0 };
        // this.windowsize.x = 1024;
        // this.windowsize.y = 600;
        // this.connectionspath = './connections/';
        // this.logpath = './logs/';
    }
    return SettingsClass;
}());
exports.SettingsClass = SettingsClass;
var ConnectionConfiguration = /** @class */ (function () {
    function ConnectionConfiguration(name, ip, port, encryption, username, password) {
        // const ipaddress = IPAddress(ip);
        // if (ipaddress.isValid()) {
        this.name = name;
        this.ip = ip;
        this.port = port;
        this.encryption = encryption;
        this.username = username;
        this.password = password;
        // }
    }
    return ConnectionConfiguration;
}());
exports.ConnectionConfiguration = ConnectionConfiguration;
