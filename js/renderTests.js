function renderTests(tests){
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.style.cssText = `
        font-family: 'Inter', sans-serif;
        background:  #e2e8f0;
        padding: 40px;
        border-radius: 20px;
        max-width: 700px;
        margin: 10px auto;
        box-shadow: 0 10px 25px rgba(0,0,0,0.05);
    `;

    tests.forEach((test, index) => {
        const container = document.createElement('div');
        container.style.marginBottom = '40px';

        const question = document.createElement('div');
        question.textContent = `${index + 1}. ${test.question}`;
        question.style.cssText = `
            font-size: 20px;
            font-weight: 600;
            color: #0f172a;
            margin-bottom: 20px;
        `;
        container.appendChild(question);

        const allOptions = [test.correctAnswer, ...test.incorrectAnswers];

        allOptions.forEach(opt => {
            const answer = document.createElement('div');
            answer.textContent = opt;
            const isCorrect = opt === test.correctAnswer;
            answer.style.cssText = `
                background-color: ${isCorrect ? '#dcfce7' : '#f1f5f9'};
                color: #0f172a;
                border: 1px solid ${isCorrect ? '#16a34a' : '#e2e8f0'};
                padding: 10px 16px;
                border-radius: 10px;
                font-size: 15px;
                margin-bottom: 10px;
            `;

            container.appendChild(answer);
        });

        app.appendChild(container);
    });
}

export default renderTests;