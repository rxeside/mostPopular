import { fetchGroupUsers, fetchUserFriends, fetchUserPosts } from '../api/vkApi';

interface User {
    id: string;
    count: number;
}

async function findMostPopularByFriends(groupId: string): Promise<User | null> {
    try {
        const data = await fetchGroupUsers(groupId);
        if (!data.response) {
            throw new Error('No response from VK API');
        }

        const members = data.response.items;
        const userFriendCounts: { [key: string]: number } = {};

        for (let i = 0; i < members.length; i++) {
            const member = members[i];
            console.log(`Fetching friends for member ${member} (${i + 1}/${members.length})`);
            const friendsData = await fetchUserFriends(member.toString());
            if (friendsData.response) {
                userFriendCounts[member] = friendsData.response.count;
                console.log(`User ${member} has ${friendsData.response.count} friends.`);
            } else {
                userFriendCounts[member] = 0;
                console.log(`User ${member} has no friends.`);
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

async function findMostPopularByPosts(groupId: string): Promise<User | null> {
    try {
        const data = await fetchGroupUsers(groupId);
        if (!data.response) {
            throw new Error('No response from VK API');
        }

        const members = data.response.items;
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

async function findMostPopularByReposts(groupId: string): Promise<User | null> {
    try {
        const data = await fetchGroupUsers(groupId);
        if (!data.response) {
            throw new Error('No response from VK API');
        }

        const members = data.response.items;
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
