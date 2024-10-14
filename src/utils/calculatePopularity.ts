import { findAllByFriends, findAllByTotalFriends, findAllByFollowers } from './findMostPopular';

// Основная функция для нахождения самого популярного пользователя по трем метрикам
export async function getMostPopularByAllMetrics(groupId: string) {
    const friendsData = await findAllByFriends(groupId);
    const totalFriendsData = await findAllByTotalFriends(groupId);
    const followersData = await findAllByFollowers(groupId);

    const userScores: { [key: string]: { friends: number, totalFriends: number, followers: number } } = {};

    // Собираем данные по друзьям в группе
    for (const user of friendsData) {
        userScores[user.id] = { friends: user.count, totalFriends: 0, followers: 0 };
    }

    // Добавляем данные по общим друзьям
    for (const user of totalFriendsData) {
        if (!userScores[user.id]) {
            userScores[user.id] = { friends: 0, totalFriends: user.count, followers: 0 };
        } else {
            userScores[user.id].totalFriends = user.count;
        }
    }

    // Добавляем данные по подписчикам
    for (const user of followersData) {
        if (!userScores[user.id]) {
            userScores[user.id] = { friends: 0, totalFriends: 0, followers: user.count };
        } else {
            userScores[user.id].followers = user.count;
        }
    }

    // Нормализуем значения
    const normalizedScores = normalizeScores(userScores);

    // Возвращаем самого популярного
    return determineMostPopularUser(normalizedScores);
}

// Нормализация данных
function normalizeScores(userScores: { [key: string]: { friends: number, totalFriends: number, followers: number } }) {
    const normalizedScores: { [key: string]: number } = {};

    const friendsMinMax = getMinMax(userScores, 'friends');
    const totalFriendsMinMax = getMinMax(userScores, 'totalFriends');
    const followersMinMax = getMinMax(userScores, 'followers');

    for (const userId in userScores) {
        const { friends, totalFriends, followers } = userScores[userId];
        const normalizedFriends = normalize(friends, friendsMinMax.min, friendsMinMax.max);
        const normalizedTotalFriends = normalize(totalFriends, totalFriendsMinMax.min, totalFriendsMinMax.max);
        const normalizedFollowers = normalize(followers, followersMinMax.min, followersMinMax.max);

        // Итоговый балл пользователя - сумма нормализованных метрик
        normalizedScores[userId] = normalizedFriends + normalizedTotalFriends + normalizedFollowers;
    }

    return normalizedScores;
}

// Получаем минимум и максимум по каждой метрике
function getMinMax(userScores: { [key: string]: { friends: number, totalFriends: number, followers: number } }, metric: 'friends' | 'totalFriends' | 'followers') {
    let min = Infinity;
    let max = -Infinity;

    for (const userId in userScores) {
        const value = userScores[userId][metric];
        if (value < min) min = value;
        if (value > max) max = value;
    }

    return { min, max };
}

// Нормализация значения (мин-макс)
function normalize(value: number, min: number, max: number): number {
    if (max === min) return 0; // Чтобы избежать деления на 0
    return (value - min) / (max - min);
}

// Определяем самого популярного пользователя по суммарному результату
function determineMostPopularUser(normalizedScores: { [key: string]: number }) {
    let mostPopularUser = { id: '', score: 0 };

    for (const userId in normalizedScores) {
        if (normalizedScores[userId] > mostPopularUser.score) {
            mostPopularUser = { id: userId, score: normalizedScores[userId] };
        }
    }
    return mostPopularUser;
}
