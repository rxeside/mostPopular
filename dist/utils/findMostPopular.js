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
exports.findMostPopularByReposts = exports.findMostPopularByPosts = exports.findMostPopularByFriends = void 0;
var vkApi_1 = require("../api/vkApi");
// Функция для нахождения популярного пользователя по друзьям внутри группы
function findMostPopularByFriends(groupId) {
    return __awaiter(this, void 0, void 0, function () {
        var data, members_1, userFriendCounts, i, member, friendsData, friends, friendsInGroup, mostPopularUser, userId, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, (0, vkApi_1.fetchGroupUsers)(groupId)];
                case 1:
                    data = _a.sent();
                    if (!data.response) {
                        throw new Error('No response from VK API');
                    }
                    members_1 = data.response.items;
                    userFriendCounts = {};
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < members_1.length)) return [3 /*break*/, 5];
                    member = members_1[i];
                    console.log("Fetching friends for member ".concat(member, " (").concat(i + 1, "/").concat(members_1.length, ")"));
                    return [4 /*yield*/, (0, vkApi_1.fetchUserFriends)(member.toString())];
                case 3:
                    friendsData = _a.sent();
                    if (friendsData.response) {
                        friends = friendsData.response.items;
                        friendsInGroup = friends.filter(function (friend) { return members_1.includes(friend); }).length;
                        userFriendCounts[member] = friendsInGroup;
                        console.log("User ".concat(member, " has ").concat(friendsInGroup, " friends in the group."));
                    }
                    else {
                        userFriendCounts[member] = 0;
                        console.log("User ".concat(member, " has no friends in the group."));
                    }
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5:
                    mostPopularUser = null;
                    for (userId in userFriendCounts) {
                        if (!mostPopularUser || userFriendCounts[userId] > mostPopularUser.count) {
                            mostPopularUser = { id: userId, count: userFriendCounts[userId] };
                        }
                    }
                    return [2 /*return*/, mostPopularUser];
                case 6:
                    error_1 = _a.sent();
                    console.error('Error in findMostPopularByFriends:', error_1);
                    return [2 /*return*/, null];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.findMostPopularByFriends = findMostPopularByFriends;
// Функция для нахождения популярного пользователя по постам
function findMostPopularByPosts(groupId) {
    return __awaiter(this, void 0, void 0, function () {
        var data, members, userPostCounts, i, member, postsData, mostPopularUser, userId, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, (0, vkApi_1.fetchGroupUsers)(groupId)];
                case 1:
                    data = _a.sent();
                    if (!data.response) {
                        throw new Error('No response from VK API');
                    }
                    members = data.response.items;
                    userPostCounts = {};
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < members.length)) return [3 /*break*/, 5];
                    member = members[i];
                    console.log("Fetching posts for member ".concat(member, " (").concat(i + 1, "/").concat(members.length, ")"));
                    return [4 /*yield*/, (0, vkApi_1.fetchUserPosts)(member.toString())];
                case 3:
                    postsData = _a.sent();
                    if (postsData.response) {
                        userPostCounts[member] = postsData.response.items.length;
                        console.log("User ".concat(member, " has ").concat(postsData.response.items.length, " posts."));
                    }
                    else {
                        userPostCounts[member] = 0;
                        console.log("User ".concat(member, " has no posts."));
                    }
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5:
                    mostPopularUser = null;
                    for (userId in userPostCounts) {
                        if (!mostPopularUser || userPostCounts[userId] > mostPopularUser.count) {
                            mostPopularUser = { id: userId, count: userPostCounts[userId] };
                        }
                    }
                    return [2 /*return*/, mostPopularUser];
                case 6:
                    error_2 = _a.sent();
                    console.error('Error in findMostPopularByPosts:', error_2);
                    return [2 /*return*/, null];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.findMostPopularByPosts = findMostPopularByPosts;
// Функция для нахождения популярного пользователя по репостам
function findMostPopularByReposts(groupId) {
    return __awaiter(this, void 0, void 0, function () {
        var data, members, userRepostCounts, i, member, postsData, repostCount, _i, _a, post, mostPopularUser, userId, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, (0, vkApi_1.fetchGroupUsers)(groupId)];
                case 1:
                    data = _b.sent();
                    if (!data.response) {
                        throw new Error('No response from VK API');
                    }
                    members = data.response.items;
                    userRepostCounts = {};
                    i = 0;
                    _b.label = 2;
                case 2:
                    if (!(i < members.length)) return [3 /*break*/, 5];
                    member = members[i];
                    console.log("Fetching reposts for member ".concat(member, " (").concat(i + 1, "/").concat(members.length, ")"));
                    return [4 /*yield*/, (0, vkApi_1.fetchUserPosts)(member.toString())];
                case 3:
                    postsData = _b.sent();
                    if (postsData.response) {
                        repostCount = 0;
                        for (_i = 0, _a = postsData.response.items; _i < _a.length; _i++) {
                            post = _a[_i];
                            if (post.copy_history) {
                                repostCount += post.copy_history.length;
                            }
                        }
                        userRepostCounts[member] = repostCount;
                        console.log("User ".concat(member, " has ").concat(repostCount, " reposts."));
                    }
                    else {
                        userRepostCounts[member] = 0;
                        console.log("User ".concat(member, " has no reposts."));
                    }
                    _b.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5:
                    mostPopularUser = null;
                    for (userId in userRepostCounts) {
                        if (!mostPopularUser || userRepostCounts[userId] > mostPopularUser.count) {
                            mostPopularUser = { id: userId, count: userRepostCounts[userId] };
                        }
                    }
                    return [2 /*return*/, mostPopularUser];
                case 6:
                    error_3 = _b.sent();
                    console.error('Error in findMostPopularByReposts:', error_3);
                    return [2 /*return*/, null];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.findMostPopularByReposts = findMostPopularByReposts;
