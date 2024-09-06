import { fetchGroupUsers, fetchUserFriends, fetchUserPosts } from '../api/vkApi';

interface User {
    id: string;
    count: number;
}

// Helper function to fetch friends or posts and calculate the count for each user
async function calculateUserCounts<T>(
    members: number[],
    fetchFunction: (userId: string) => Promise<T>,
    processFunction: (data: T, members: number[]) => number
): Promise<{ [p: string]: number }> {
    const userCounts: { [key: string]: number } = {};

    for (let i = 0; i < members.length; i++) {
        const member = members[i];
        console.log(`Fetching data for member ${member} (${i + 1}/${members.length})`);
        const data = await fetchFunction(member.toString());

        const count = processFunction(data, members);
        userCounts[member] = count;

        console.log(`User ${member} has ${count} items.`);
    }

    return userCounts;
}

// Find the user with the highest count
function findUserWithMostCounts(userCounts: { [key: string]: number }): User | null {
    let mostPopularUser: User | null = null;

    for (const userId in userCounts) {
        if (!mostPopularUser || userCounts[userId] > mostPopularUser.count) {
            mostPopularUser = { id: userId, count: userCounts[userId] };
        }
    }

    return mostPopularUser;
}

// Main function to find the most popular user by friends
async function findMostPopularByFriends(groupId: string): Promise<User | null> {
    try {
        const members = await checkGroupForUsers(groupId);

        const userFriendCounts = await calculateUserCounts(members, fetchUserFriends, (data, members) => {
            const friends = data.response?.items || [];
            return friends?.filter((friend: number) => members.includes(Number(String(friend)))).length;
        });

        return findUserWithMostCounts(userFriendCounts);
    } catch (error) {
        console.error('Error in findMostPopularByFriends:', error);
        return null;
    }
}

// Main function to find the most popular user by posts
async function findMostPopularByPosts(groupId: string): Promise<User | null> {
    try {
        const members = await checkGroupForUsers(groupId);

        const userPostCounts = await calculateUserCounts(members, fetchUserPosts, (data) => data.response?.items.length || 0);

        return findUserWithMostCounts(userPostCounts);
    } catch (error) {
        console.error('Error in findMostPopularByPosts:', error);
        return null;
    }
}

// Main function to find the most popular user by reposts
async function findMostPopularByReposts(groupId: string): Promise<User | null> {
    try {
        const members = await checkGroupForUsers(groupId);

        const userRepostCounts = await calculateUserCounts(
            members,
            fetchUserPosts,
            (data) => {
                const posts = data.response?.items || [];
                return posts?.reduce((repostCount: any, post: { copy_history: string | any[]; }) => {
                    return repostCount + (post.copy_history?.length || 0);
                }, 0);
            }
        );

        return findUserWithMostCounts(userRepostCounts);
    } catch (error) {
        console.error('Error in findMostPopularByReposts:', error);
        return null;
    }
}

// Fetches all group members
async function fetchAllGroupUsers(groupId: string): Promise<number[]> {
    const members: number[] = [];
    let offset = 0;
    const count = 1000;
    while (true) {
        const data = await fetchGroupUsers(groupId, offset, count);
        if (!pushingMembers(data, members, count)) {
            offset += count;
            break;
        }
    }
    return members;
}

// Checks if there are users in the group
async function checkGroupForUsers(groupId: string): Promise<number[]> {
    const members = await fetchAllGroupUsers(groupId);
    if (!members.length) {
        console.log(groupId)
        throw new Error('No members found in the group');
    }
    return members;
}

// Helper function to push members from fetched data
function pushingMembers(data: { response: { items: string | any[]; }; }, members: any[], count: number): boolean {
    if (data.response) {
        // @ts-ignore
        members.push(...data.response.items);
        return data.response.items.length >= count;
    }
    return false;
}

export {
    findMostPopularByFriends,
    findMostPopularByPosts,
    findMostPopularByReposts
};
