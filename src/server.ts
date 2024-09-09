import express from 'express';
import path from 'path';
import { findMostPopularByFriends, findMostPopularByPosts, findMostPopularByReposts } from './utils/findMostPopular';

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());

app.post('/api/popular-user', async (req, res) => {
    const { groupId, criterion } = req.body;
    try {
        let result;
        switch (criterion) {
            case 'friends':
                result = await findMostPopularByFriends(groupId);
                break;
            case 'posts':
                result = await findMostPopularByPosts(groupId);
                break;
            case 'reposts':
                result = await findMostPopularByReposts(groupId);
                break;
            default:
                return res.status(400).json({ error: 'Invalid criterion' });
        }

        if (result) {
            return res.json(result);
        } else {
            return res.status(404).json({ error: 'No popular user found' });
        }
    } catch (error) {
        console.error('Error in API:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});




/*
{
    "name": "vk-popular-user",
    "version": "1.0.0",
    "main": "dist/index.js",
    "scripts": {
    "build": "tsc",
        "start": "node dist/index.js"
},
    "dependencies": {
    "axios": "^1.7.1",
        "express": "^4.19.2"
},
    "devDependencies": {
    "@types/axios": "^0.14.0",
        "@types/express": "^4.17.21",
        "@types/node": "^14.18.63",
        "typescript": "^4.9.5"
},
    "keywords": [],
    "author": "",
    "license": "ISC",
    "description": ""
}*/
