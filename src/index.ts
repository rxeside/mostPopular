import { findMostPopularByFriends, findMostPopularByPosts, findMostPopularByReposts } from './utils/findMostPopular';

async function main() {
    const groupId = '220321079';  // или '210114453'
    
    console.log('Starting to find the most popular user by friends...');
    const mostPopularByFriends = await findMostPopularByFriends(groupId);
    

    console.log('Starting to find the most popular user by posts...');
    const mostPopularByPosts = await findMostPopularByPosts(groupId);
   

    console.log('Starting to find the most popular user by reposts...');
    const mostPopularByReposts = await findMostPopularByReposts(groupId);

    if (mostPopularByFriends) {
        console.log(`Самый популярный по друзьям: ID = ${mostPopularByFriends.id}, Количество друзей = ${mostPopularByFriends.count}`);
    } else {
        console.log('Не удалось найти самого популярного пользователя по друзьям.');
    }

    if (mostPopularByPosts) {
        console.log(`Самый популярный по постам: ID = ${mostPopularByPosts.id}, Количество постов = ${mostPopularByPosts.count}`);
    } else {
        console.log('Не удалось найти самого популярного пользователя по постам.');
    }

    if (mostPopularByReposts) {
        console.log(`Самый популярный по репостам: ID = ${mostPopularByReposts.id}, Количество репостов = ${mostPopularByReposts.count}`);
    } else {
        console.log('Не удалось найти самого популярного пользователя по репостам.');
    }
}

main();


// индексы хирша (используется для статей)
// по количеству постов, анализ каждого поста, количесто репостов