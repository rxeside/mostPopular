import express from 'express';
import { findMostPopularByFriends, findMostPopularByPosts, findMostPopularByReposts } from './utils/findMostPopular';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/api/popular-user', async (req, res) => {
    const { groupId, criterion } = req.body;

    try {
        let result;

        if (criterion === 'friends') {
            result = await findMostPopularByFriends(groupId);
        } else if (criterion === 'posts') {
            result = await findMostPopularByPosts(groupId);
        } else if (criterion === 'reposts') {
            result = await findMostPopularByReposts(groupId);
        } else if (criterion === 'allMetrics') {
            // Получаем результаты для всех трёх метрик
            const mostPopularByFriends = await findMostPopularByFriends(groupId);
            const mostPopularByPosts = await findMostPopularByPosts(groupId);
            const mostPopularByReposts = await findMostPopularByReposts(groupId);

            // Подсчёт баллов по каждому пользователю
            const scoreMap: { [key: string]: number } = {};

            // Добавляем баллы за друзей
            if (mostPopularByFriends) {
                scoreMap[mostPopularByFriends.id] = (scoreMap[mostPopularByFriends.id] || 0) + mostPopularByFriends.count * 10;
            }

            // Добавляем баллы за посты
            if (mostPopularByPosts) {
                scoreMap[mostPopularByPosts.id] = (scoreMap[mostPopularByPosts.id] || 0) + mostPopularByPosts.count * 3;
            }

            // Добавляем баллы за репосты
            if (mostPopularByReposts) {
                scoreMap[mostPopularByReposts.id] = (scoreMap[mostPopularByReposts.id] || 0) + mostPopularByReposts.count * 2;
            }

            // Определение пользователя с наибольшим количеством баллов
            const mostPopularUser = Object.keys(scoreMap).reduce((maxUser, userId) => {
                const userScore = scoreMap[userId];
                if (!maxUser || userScore > maxUser.score) {
                    return { id: userId, score: userScore };
                }
                return maxUser;
            }, { id: '', score: 0 });

            result = {
                id: mostPopularUser.id,
                count: mostPopularUser.score,
            };
        }

        if (!result) {
            return res.status(404).json({ error: 'No popular user found.' });
        }

        res.json(result);
    } catch (error) {
        console.error('Error fetching popular user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
