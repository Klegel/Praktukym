import axios from 'axios';

describe('API Testing with JSONPlaceholder', () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';

    // 1. GET: Отримання списку всіх записів
    test('GET /posts - should return list of posts with status 200', async () => {
        const response = await axios.get(`${baseURL}/posts`);
        expect(response.status).toBe(200);
        expect(response.data).toBeInstanceOf(Array);
    });

    // 2. GET: Отримання конкретного запису за ID
    test('GET /posts/1 - should return a specific post details', async () => {
        const response = await axios.get(`${baseURL}/posts/1`);
        expect(response.status).toBe(200);
        expect(response.data.id).toBe(1);
        expect(response.data.title).toBeDefined();
    });

    // 3. POST: Створення нового запису
    test('POST /posts - should create a new post and return status 201', async () => {
        const newPost = { title: 'Lab 4 Test', body: 'Testing POST method', userId: 1 };
        const response = await axios.post(`${baseURL}/posts`, newPost);
        expect(response.status).toBe(201);
        expect(response.data.title).toBe('Lab 4 Test');
    });

    // 4. PUT: Оновлення існуючого запису
    test('PUT /posts/1 - should update post details and return status 200', async () => {
        const updatedPost = { id: 1, title: 'Updated Title', body: 'Updated Body', userId: 1 };
        const response = await axios.put(`${baseURL}/posts/1`, updatedPost);
        expect(response.status).toBe(200);
        expect(response.data.title).toBe('Updated Title');
    });

    // 5. DELETE: Видалення запису
    test('DELETE /posts/1 - should delete the post and return status 200', async () => {
        const response = await axios.delete(`${baseURL}/posts/1`);
        expect(response.status).toBe(200);
    });
});