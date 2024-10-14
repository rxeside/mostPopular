import express from 'express';
import { Response } from 'express-serve-static-core';
import { getMostPopularByAllMetrics } from './utils/calculatePopularity';
import { findMostPopularByFriends, findMostPopularByTotalFriends, findMostPopularByFollowers } from './utils/findMostPopular';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.static('public'));

app.post('/api/popular-user', async (req, res) => {
    const { groupId, criterion } = req.body;

    try {
        const result = await getPopularUserByCriterion(groupId, criterion);

        if (!result) {
            return res.status(404).json({ error: 'No popular user found.' });
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
    } else if (criterion === 'totalFriends') {
        return await findMostPopularByTotalFriends(groupId);
    } else if (criterion === 'followers') {
        return await findMostPopularByFollowers(groupId);
    } else if (criterion === 'allMetrics') {
        return await getMostPopularByAllMetrics(groupId);
    }
    return null;
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
