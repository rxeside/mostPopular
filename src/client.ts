document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('groupForm') as HTMLFormElement;
    const resultDiv = document.getElementById('result') as HTMLDivElement;
    const loader = document.getElementById('loader') as HTMLDivElement;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Скрываем блок с результатом и показываем загрузчик
        resultDiv.hidden = true;
        loader.style.display = 'block';

        const groupId = (document.getElementById('groupId') as HTMLInputElement).value;
        const criterion = (document.querySelector('input[name="criterion"]:checked') as HTMLInputElement).value;

        try {
            const response = await fetch('/api/popular-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ groupId, criterion }),
            });

            if (!response.ok) {
                throw new Error('Error fetching data');
            }

            const data = await response.json();

            // Прячем загрузчик и показываем результат
            loader.style.display = 'none';
            resultDiv.hidden = false;
            resultDiv.innerHTML = `
                <p>Самый популярный пользователь:</p>
                <p>ID: <a href="https://vk.com/id${data.id}" target="_blank">vk.com/id${data.id}</a></p>
                <p>Количество единиц: ${data.count}</p>
            `;
        } catch (error) {
            loader.style.display = 'none';
            resultDiv.hidden = false;
            resultDiv.innerHTML = '<p>Ошибка при получении данных</p>';
            console.error('Error:', error);
        }
    });
});
