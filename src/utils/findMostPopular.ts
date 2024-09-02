import { fetchGroupUsers, fetchUserFriends, fetchUserPosts } from '../api/vkApi';

interface User {
    id: string;
    count: number;
}

async function fetchAllGroupUsers(groupId: string): Promise<number[]> {
    const members: number[] = [];
    let offset = 0;
    const count = 1000;
    while (true) {
        const data = await fetchGroupUsers(groupId, offset, count);
        if (data.response) {
            members.push(...data.response.items);
            if (data.response.items.length < count) {
                break;
            }
            offset += count;
        } else {
            break;
        }
    }
    return members;
}



// Функция для нахождения популярного пользователя по друзьям внутри группы
async function findMostPopularByFriends(groupId: string): Promise<User | null> {
    try {
        const members = await fetchAllGroupUsers(groupId);
        if (!members.length) {
            throw new Error('No members found in the group');
        }

        const userFriendCounts: { [key: string]: number } = {};

        for (let i = 0; i < members.length; i++) {
            const member = members[i];
            console.log(`Fetching friends for member ${member} (${i + 1}/${members.length})`);
            const friendsData = await fetchUserFriends(member.toString());
            if (friendsData.response) {
                const friends = friendsData.response.items;
                const friendsInGroup = friends.filter((friend: number) => members.includes(friend)).length;
                userFriendCounts[member] = friendsInGroup;
                console.log(`User ${member} has ${friendsInGroup} friends in the group.`);
            } else {
                userFriendCounts[member] = 0;
                console.log(`User ${member} has no friends in the group.`);
            }
        }

        let mostPopularUser: User | null = null;
        for (const userId in userFriendCounts) {
            if (!mostPopularUser || userFriendCounts[userId] > mostPopularUser.count) {
                mostPopularUser = { id: userId, count: userFriendCounts[userId] };
            }
        }

        return mostPopularUser;
    } catch (error) {
        console.error('Error in findMostPopularByFriends:', error);
        return null;
    }
}

// Функция для нахождения популярного пользователя по постам
async function findMostPopularByPosts(groupId: string): Promise<User | null> {
    try {
        const members = await fetchAllGroupUsers(groupId);
        if (!members.length) {
            throw new Error('No members found in the group');
        }

        const userPostCounts: { [key: string]: number } = {};

        for (let i = 0; i < members.length; i++) {
            const member = members[i];
            console.log(`Fetching posts for member ${member} (${i + 1}/${members.length})`);
            const postsData = await fetchUserPosts(member.toString());
            if (postsData.response) {
                userPostCounts[member] = postsData.response.items.length;
                console.log(`User ${member} has ${postsData.response.items.length} posts.`);
            } else {
                userPostCounts[member] = 0;
                console.log(`User ${member} has no posts.`);
            }
        }

        let mostPopularUser: User | null = null;
        for (const userId in userPostCounts) {
            if (!mostPopularUser || userPostCounts[userId] > mostPopularUser.count) {
                mostPopularUser = { id: userId, count: userPostCounts[userId] };
            }
        }

        return mostPopularUser;
    } catch (error) {
        console.error('Error in findMostPopularByPosts:', error);
        return null;
    }
}

// Функция для нахождения популярного пользователя по репостам
async function findMostPopularByReposts(groupId: string): Promise<User | null> {
    try {
        const members = await fetchAllGroupUsers(groupId);
        if (!members.length) {
            throw new Error('No members found in the group');
        }

        const userRepostCounts: { [key: string]: number } = {};

        for (let i = 0; i < members.length; i++) {
            const member = members[i];
            console.log(`Fetching reposts for member ${member} (${i + 1}/${members.length})`);
            const postsData = await fetchUserPosts(member.toString());
            if (postsData.response) {
                let repostCount = 0;
                for (const post of postsData.response.items) {
                    if (post.copy_history) {
                        repostCount += post.copy_history.length;
                    }
                }
                userRepostCounts[member] = repostCount;
                console.log(`User ${member} has ${repostCount} reposts.`);
            } else {
                userRepostCounts[member] = 0;
                console.log(`User ${member} has no reposts.`);
            }
        }

        let mostPopularUser: User | null = null;
        for (const userId in userRepostCounts) {
            if (!mostPopularUser || userRepostCounts[userId] > mostPopularUser.count) {
                mostPopularUser = { id: userId, count: userRepostCounts[userId] };
            }
        }

        return mostPopularUser;
    } catch (error) {
        console.error('Error in findMostPopularByReposts:', error);
        return null;
    }
}

export {
    findMostPopularByFriends,
    findMostPopularByPosts,
    findMostPopularByReposts
};
