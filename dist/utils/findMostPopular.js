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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMostPopular = void 0;
var vkApi_1 = require("../api/vkApi");
function findMostPopular(groupId) {
    return __awaiter(this, void 0, void 0, function () {
        var data, members, userStats, _i, members_1, member, memberId, friendsData, postsData, friendCount, postCount, repostCount, _a, _b, post, mostPopularUser, userId, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, (0, vkApi_1.fetchGroupUsers)(groupId)];
                case 1:
                    data = _c.sent();
                    if (!data.response) {
                        throw new Error('No response from VK API');
                    }
                    members = data.response.items;
                    console.log('Group members:', members);
                    userStats = {};
                    _i = 0, members_1 = members;
                    _c.label = 2;
                case 2:
                    if (!(_i < members_1.length)) return [3 /*break*/, 6];
                    member = members_1[_i];
                    memberId = member.toString();
                    console.log('Fetching data for member:', memberId);
                    return [4 /*yield*/, (0, vkApi_1.fetchUserFriends)(memberId)];
                case 3:
                    friendsData = _c.sent();
                    return [4 /*yield*/, (0, vkApi_1.fetchUserPosts)(memberId)];
                case 4:
                    postsData = _c.sent();
                    friendCount = friendsData.response ? friendsData.response.count : 0;
                    postCount = postsData.response ? postsData.response.items.length : 0;
                    repostCount = 0;
                    if (postsData.response) {
                        for (_a = 0, _b = postsData.response.items; _a < _b.length; _a++) {
                            post = _b[_a];
                            if (post.copy_history) {
                                repostCount += post.copy_history.length;
                            }
                        }
                    }
                    userStats[memberId] = {
                        id: memberId,
                        friendCount: friendCount,
                        postCount: postCount,
                        repostCount: repostCount
                    };
                    console.log("User ".concat(memberId, " has ").concat(friendCount, " friends, ").concat(postCount, " posts, and ").concat(repostCount, " reposts."));
                    _c.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 2];
                case 6:
                    mostPopularUser = null;
                    for (userId in userStats) {
                        if (!mostPopularUser || userStats[userId].friendCount > mostPopularUser.friendCount ||
                            userStats[userId].postCount > mostPopularUser.postCount ||
                            userStats[userId].repostCount > mostPopularUser.repostCount) {
                            mostPopularUser = userStats[userId];
                        }
                    }
                    return [2 /*return*/, mostPopularUser];
                case 7:
                    error_1 = _c.sent();
                    console.error('Error in findMostPopular:', error_1);
                    return [2 /*return*/, null];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.findMostPopular = findMostPopular;
