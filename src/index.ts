import { findMostPopularByFriends, findMostPopularByTotalFriends, findMostPopularByFollowers } from './utils/findMostPopular';

async function main() {
    await findingMostPopular();
}

main();


function consoleLogsAboutStarting() {
    console.log('Starting to find the most popular user by friends...');

    console.log('Starting to find the most popular user by posts...');

    console.log('Starting to find the most popular user by reposts...');
}

// @ts-ignore
function consoleLogsAboutResults(mostPopularByFriends, mostPopularByPosts, mostPopularByReposts) {
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

async function findingMostPopular() {
    const groupId = '220321079'; // или '210114453'

    consoleLogsAboutStarting();

    const mostPopularByFriends = await findMostPopularByFriends(groupId);
    const mostPopularByPosts = await findMostPopularByTotalFriends(groupId);
    const mostPopularByReposts = await findMostPopularByFollowers(groupId);

    consoleLogsAboutResults(mostPopularByFriends, mostPopularByPosts, mostPopularByReposts);
}