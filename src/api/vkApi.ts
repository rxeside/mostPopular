import axios from 'axios';

const token = '';
const apiVersion = '5.199';

async function fetchUserGroups(userId: string) {
    try {
        const response = await axios.get(`https://api.vk.com/method/groups.get`, {
            params: {
                user_id: userId,
                access_token: token,
                v: apiVersion
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function fetchGroupUsers(groupId: string) {
    try {
        const response = await axios.get(`https://api.vk.com/method/groups.getMembers`, {
            params: {
                group_id: groupId,
                access_token: token,
                v: apiVersion
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function fetchGroupInfo(groupIds: string[]) {
    try {
        const response = await axios.get(`https://api.vk.com/method/groups.getById`, {
            params: {
                group_ids: groupIds.join(','),
                access_token: token,
                v: apiVersion
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function fetchUserFriends(userId: string) {
    try {
        const response = await axios.get('https://api.vk.com/method/friends.get', {
            params: {
                user_id: userId,
                access_token: token,
                v: apiVersion
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error in fetchUserFriends:', error);
        throw error;
    }
}

async function fetchUserPosts(userId: string) {
    try {
        const response = await axios.get('https://api.vk.com/method/wall.get', {
            params: {
                owner_id: userId,
                access_token: token,
                v: apiVersion
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error in fetchUserPosts:', error);
        throw error;
    }
}

export {
    fetchUserGroups,
    fetchGroupUsers,
    fetchGroupInfo,
    fetchUserFriends,
    fetchUserPosts,
};
