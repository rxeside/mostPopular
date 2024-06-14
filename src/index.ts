import { findMostPopular } from './utils/findMostPopular';

async function main() {
    const groupId = '220321079';  //   210114453
    const mostPopularUser = await findMostPopular(groupId);

    if (mostPopularUser) {
        console.log(`Самый популярный пользователь: ID = ${mostPopularUser.id}, Количество друзей = ${mostPopularUser.count}`);
    } else {
        console.log('Не удалось найти самого популярного пользователя.');
    }
}

main();

// индексы хирша (используется для статей)
// по количеству постов, анализ каждого поста, количесто репостов