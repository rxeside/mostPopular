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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUserFriends = exports.fetchGroupInfo = exports.fetchGroupUsers = exports.fetchUserGroups = void 0;
var axios_1 = __importDefault(require("axios"));
var token = 'vk1.a.7SgNwStbScck4Bccsx1Smaz5xX66FJORBBSfFlk3qe6WkpJLgYGuczJk-rPKwi4OhjNj6H_TlThVGEPJhofJA67zU_orWjgRuqY7zyz5EEpbbiXA8AB6u3fhCc8BFJDHKjp31Zd-4rNmDXKyLg7m2dq5rWIjt0-jBUnWNaT9EBbZmCjosP8kTVvUnzwBDpUga1w3mVsgp_XXpPWPcQpQaw';
var apiVersion = '5.199';
function fetchUserGroups(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get("https://api.vk.com/method/groups.get", {
                            params: {
                                user_id: userId,
                                access_token: token,
                                v: apiVersion
                            }
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.fetchUserGroups = fetchUserGroups;
function fetchGroupUsers(groupId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get("https://api.vk.com/method/groups.getMembers", {
                            params: {
                                group_id: groupId,
                                access_token: token,
                                v: apiVersion
                            }
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
                case 2:
                    error_2 = _a.sent();
                    console.error(error_2);
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.fetchGroupUsers = fetchGroupUsers;
function fetchGroupInfo(groupIds) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get("https://api.vk.com/method/groups.getById", {
                            params: {
                                group_ids: groupIds.join(','),
                                access_token: token,
                                v: apiVersion
                            }
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
                case 2:
                    error_3 = _a.sent();
                    console.error(error_3);
                    throw error_3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.fetchGroupInfo = fetchGroupInfo;
function fetchUserFriends(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get('https://api.vk.com/method/friends.get', {
                            params: {
                                user_id: userId,
                                access_token: token,
                                v: apiVersion
                            }
                        })];
                case 1:
                    response = _a.sent();
                    //console.log('fetchUserFriends response:', response.data);
                    return [2 /*return*/, response.data];
                case 2:
                    error_4 = _a.sent();
                    console.error('Error in fetchUserFriends:', error_4);
                    throw error_4;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.fetchUserFriends = fetchUserFriends;
