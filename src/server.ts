import express from 'express';
import { Response } from 'express-serve-static-core';
import {findMostPopularByFriends, findMostPopularByPosts, findMostPopularByReposts} from './utils/findMostPopular';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.static('public'));

app.post('/api/popular-user', async (req, res) => {
    const {groupId, criterion} = req.body;

    try {
        const result = await getPopularUserByCriterion(groupId, criterion);

        if (!result) {
            return res.status(404).json({error: 'No popular user found.'});
        }

        res.json(result);
    } catch (error) {
        handleError(res, error);
    }
});

function handleError(res: Response<any, Record<string, any>, number>, error: unknown) {
    console.error('Error fetching popular user:', error);
    res.status(500).json({ error: 'Internal server error' });
}

async function getPopularUserByCriterion(groupId: string, criterion: string) {
    if (criterion === 'friends') {
        return await findMostPopularByFriends(groupId);
    } else if (criterion === 'posts') {
        return await findMostPopularByPosts(groupId);
    } else if (criterion === 'reposts') {
        return await findMostPopularByReposts(groupId);
    } else if (criterion === 'allMetrics') {
        return await getMostPopularByAllMetrics(groupId);
    }
    return null;
}

async function getMostPopularByAllMetrics(groupId: string) {
    const mostPopularByFriends = await findMostPopularByFriends(groupId);
    const mostPopularByPosts = await findMostPopularByPosts(groupId);
    const mostPopularByReposts = await findMostPopularByReposts(groupId);

    const scoreMap: { [key: string]: number } = {};
    conversionToPoints(mostPopularByFriends, mostPopularByPosts, mostPopularByReposts, scoreMap);

    return determineMostPopularUser(scoreMap);
}

// @ts-ignore
function conversionToPoints(mostPopularByFriends, mostPopularByPosts, mostPopularByReposts, scoreMap: { [x: string]: any; }) {
    const friendsIndex = 51;
    const postsIndex = 21;
    const repostsIndex = 28;

    if (mostPopularByFriends) {
        scoreMap[mostPopularByFriends.id] = (scoreMap[mostPopularByFriends.id] || 0) + mostPopularByFriends.count * friendsIndex;
    }
    if (mostPopularByPosts) {
        scoreMap[mostPopularByPosts.id] = (scoreMap[mostPopularByPosts.id] || 0) + mostPopularByPosts.count * postsIndex;
    }
    if (mostPopularByReposts) {
        scoreMap[mostPopularByReposts.id] = (scoreMap[mostPopularByReposts.id] || 0) + mostPopularByReposts.count * repostsIndex;
    }
}

function determineMostPopularUser(scoreMap: { [x: string]: any; }) {
    const mostPopularUser = Object.keys(scoreMap).reduce((maxUser, userId) => {
        const userScore = scoreMap[userId];
        if (!maxUser || userScore > maxUser.score) {
            return { id: userId, score: userScore };
        }
        return maxUser;
    }, { id: '', score: 0 });

    return {
        id: mostPopularUser.id,
        count: mostPopularUser.score,
    };
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
