import { fetchGroupUsers, fetchUserFriends } from '../api/vkApi';

interface User {
    id: string;
    count: number;
}

async function findMostPopular(groupId: string): Promise<User | null> {
    try {
        const data = await fetchGroupUsers(groupId);
        if (!data.response) {
            throw new Error('No response from VK API');
        }

        const members = data.response.items;
        console.log('Group members:', members);

        const userFriendCounts: { [key: string]: number } = {};


        for (const member of members) {
            console.log('Fetching friends for member:', member);
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
        console.error('Error in findMostPopular:', error);
        return null;
    }
}

export {
    findMostPopular
};
