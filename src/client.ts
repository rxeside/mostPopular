document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('groupForm') as HTMLFormElement;
    const resultDiv = document.getElementById('result') as HTMLDivElement;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

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
            resultDiv.innerHTML = `
                <p>Самый популярный пользователь:</p>
                <p>ID: ${data.id}</p>
                <p>Количество единиц: ${data.count}</p>
            `;
        } catch (error) {
            resultDiv.innerHTML = '<p>Ошибка при получении данных</p>';
            console.error('Error:', error);
        }
    });
});
