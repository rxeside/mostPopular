import { fetchGroupUsers, fetchUserFriends, fetchUserFollowers } from '../api/vkApi';

interface User {
    id: string;
    count: number;
}

async function calculateUserCounts<T>(
    members: number[],
    fetchFunction: (userId: string) => Promise<T>,
    processFunction: (data: T, members?: number[]) => number
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

function findUserWithMostCounts(userCounts: { [key: string]: number }): User | null {
    let mostPopularUser: User | null = null;

    for (const userId in userCounts) {
        if (!mostPopularUser || userCounts[userId] > mostPopularUser.count) {
            mostPopularUser = { id: userId, count: userCounts[userId] };
        }
    }

    return mostPopularUser;
}

async function findMostPopularByFriends(groupId: string): Promise<User | null> {
    try {
        const members = await checkGroupForUsers(groupId);

        const userFriendCounts = await calculateUserCounts(members, fetchUserFriends, (data, members) => {
            const friends = data.response?.items || [];
            // @ts-ignore
            return friends?.filter((friend: number) => members.includes(Number(String(friend)))).length;
        });

        return findUserWithMostCounts(userFriendCounts);
    } catch (error) {
        console.error('Error in findMostPopularByFriends:', error);
        return null;
    }
}

async function findMostPopularByTotalFriends(groupId: string): Promise<User | null> {
    try {
        const members = await checkGroupForUsers(groupId);

        const userTotalFriendCounts = await calculateUserCounts(members, fetchUserFriends, (data) => {
            return data.response?.items?.length || 0;
        });

        return findUserWithMostCounts(userTotalFriendCounts);
    } catch (error) {
        console.error('Error in findMostPopularByTotalFriends:', error);
        return null;
    }
}

async function findMostPopularByFollowers(groupId: string): Promise<User | null> {
    try {
        const members = await checkGroupForUsers(groupId);

        const userFollowerCounts = await calculateUserCounts(members, fetchUserFollowers, (data) => data.response?.count || 0);

        return findUserWithMostCounts(userFollowerCounts);
    } catch (error) {
        console.error('Error in findMostPopularByFollowers:', error);
        return null;
    }
}

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

async function checkGroupForUsers(groupId: string): Promise<number[]> {
    const members = await fetchAllGroupUsers(groupId);
    if (!members.length) {
        throw new Error('No members found in the group');
    }
    return members;
}

function pushingMembers(data: { response: { items: string | any[] } }, members: any[], count: number): boolean {
    if (data.response) {
        // @ts-ignore
        members.push(...data.response.items);
        return data.response.items.length >= count;
    }
    return false;
}

async function findAllByFriends(groupId: string): Promise<{ id: string, count: number }[]> {
    try {
        const members = await checkGroupForUsers(groupId);

        const userFriendCounts = await calculateUserCounts(members, fetchUserFriends, (data, members) => {
            const friends = data.response?.items || [];
            // @ts-ignore
            return friends?.filter((friend: number) => members.includes(Number(String(friend)))).length;
        });

        // Преобразуем объект с количеством друзей в массив с объектами
        return Object.keys(userFriendCounts).map(userId => ({
            id: userId,
            count: userFriendCounts[userId]
        }));
    } catch (error) {
        console.error('Error in findAllByFriends:', error);
        return [];
    }
}


async function findAllByTotalFriends(groupId: string): Promise<{ id: string, count: number }[]> {
    try {
        const members = await checkGroupForUsers(groupId);

        const userTotalFriendCounts = await calculateUserCounts(members, fetchUserFriends, (data) => {
            return data.response?.items?.length || 0;
        });

        // Преобразуем объект с общим количеством друзей в массив с объектами
        return Object.keys(userTotalFriendCounts).map(userId => ({
            id: userId,
            count: userTotalFriendCounts[userId]
        }));
    } catch (error) {
        console.error('Error in findAllByTotalFriends:', error);
        return [];
    }
}


async function findAllByFollowers(groupId: string): Promise<{ id: string, count: number }[]> {
    try {
        const members = await checkGroupForUsers(groupId);

        const userFollowerCounts = await calculateUserCounts(members, fetchUserFollowers, (data) => data.response?.count || 0);

        // Преобразуем объект с количеством подписчиков в массив с объектами
        return Object.keys(userFollowerCounts).map(userId => ({
            id: userId,
            count: userFollowerCounts[userId]
        }));
    } catch (error) {
        console.error('Error in findAllByFollowers:', error);
        return [];
    }
}


export {
    findMostPopularByFriends,
    findMostPopularByTotalFriends,
    findMostPopularByFollowers,
    findAllByFriends,
    findAllByTotalFriends,
    findAllByFollowers
};
