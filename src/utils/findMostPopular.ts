import { fetchGroupUsers, fetchUserFriends, fetchUserPosts } from '../api/vkApi';

interface User {
    id: string;
    friendCount: number;
    postCount: number;
    repostCount: number;
}

async function findMostPopular(groupId: string): Promise<User | null> {
    try {
        const data = await fetchGroupUsers(groupId);
        if (!data.response) {
            throw new Error('No response from VK API');
        }

        const members = data.response.items;
        console.log('Group members:', members);

        const userStats: { [key: string]: User } = {};

        for (const member of members) {
            const memberId = member.toString();
            console.log('Fetching data for member:', memberId);

            const friendsData = await fetchUserFriends(memberId);
            const postsData = await fetchUserPosts(memberId);

            const friendCount = friendsData.response ? friendsData.response.count : 0;
            const postCount = postsData.response ? postsData.response.items.length : 0;

            let repostCount = 0;
            if (postsData.response) {
                for (const post of postsData.response.items) {
                    if (post.copy_history) {
                        repostCount += post.copy_history.length;
                    }
                }
            }

            userStats[memberId] = {
                id: memberId,
                friendCount,
                postCount,
                repostCount
            };

            console.log(`User ${memberId} has ${friendCount} friends, ${postCount} posts, and ${repostCount} reposts.`);
        }

        let mostPopularUser: User | null = null;
        for (const userId in userStats) {
            if (!mostPopularUser || userStats[userId].friendCount > mostPopularUser.friendCount ||
                userStats[userId].postCount > mostPopularUser.postCount ||
                userStats[userId].repostCount > mostPopularUser.repostCount) {
                mostPopularUser = userStats[userId];
            }
        }

        return mostPopularUser;
    } catch (error) {
        console.error('Error in findMostPopular:', error);
        return null;
    }
}

export {
    findMostPopular
};
