import axios from 'axios';

const token = 'vk1.a.R9tYXpqEHj1iN6VzVVcdKN0YOJeqMeIee7R1qiEYRnqZ1HHvH_lwiIbjdcukGS3w_MCE-VpkYmP5ncSN-FTmHXIoorE_nWTVVkFs-iRqKMVOKG4WoelYoyVL_NKlcSNrAOC2kVoAhTB7T1oKQxUpWv7AN9dGdKLucPbvH7eNNVSvj28_52Bm5hpx5OWFMEp09ENm44vmhUcGeJxJCudKyg';
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

async function fetchGroupUsers(groupId: string, offset: number = 0, count: number = 1000) {
    try {
        const response = await axios.get(`https://api.vk.com/method/groups.getMembers`, {
            params: {
                group_id: groupId,
                offset,
                count,
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
