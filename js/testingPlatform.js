import Test from './testClass.js';
import shuffleRange from './utility.js';

class TestPlatform {
    constructor(tests) {
        this.tests = tests;
        this.currentIndex = 0;
        this.rangeStart = 0;
        this.rangeEnd = tests.length - 1;
        this.app = document.getElementById('app');
        this.score = 0;

        this.app.style.cssText = `
            font-family: 'Inter', sans-serif;
            background:  #e2e8f0;
            padding: 40px;
            border-radius: 20px;
            max-width: 600px;
            margin: 10px auto;
            box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        `;
    }

    start() {
        this.askRange();
    }

    askRange() {
        this.app.innerHTML = '';

        const labelStart = document.createElement('label');
        labelStart.textContent = 'Начальный индекс: ';
        labelStart.style.cssText = `
            font-size: 16px;
            font-weight: 500;
            margin-right: 6px;
            color: #333;
        `;

        const inputStart = document.createElement('input');
        inputStart.type = 'number';
        inputStart.min = 0;
        inputStart.style.cssText = `
            padding: 10px 14px;
            border-radius: 10px;
            border: 1px solid #ccc;
            font-size: 16px;
            margin: 10px 8px 20px 0;
            width: 150px;
        `;

        const labelEnd = document.createElement('label');
        labelEnd.textContent = 'Конечный индекс: ';
        labelEnd.style.cssText = `
            font-size: 16px;
            font-weight: 500;
            margin-right: 6px;
            color: #333;
        `;

        const inputEnd = document.createElement('input');
        inputEnd.type = 'number';
        inputEnd.min = 0;
        inputEnd.style.cssText = `
            padding: 10px 14px;
            border-radius: 10px;
            border: 1px solid #ccc;
            font-size: 16px;
            margin: 10px 8px 20px 0;
            width: 150px;
        `;

        const message = document.createElement('div');
        message.style.cssText = `
            font-size: 14px;
            color: #e53935;
            margin-top: 10px;
        `;

        const btn = document.createElement('button');
        btn.textContent = 'Начать тест';
        btn.style.cssText = `
            background-color: #316BFF;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            cursor: pointer;
            margin-top: 12px;
            transition: background-color 0.3s;
        `;
        btn.onmouseover = () => btn.style.backgroundColor = '#1f51cc';
        btn.onmouseout = () => btn.style.backgroundColor = '#316BFF';
        btn.onclick = () => {
            let start = parseInt(inputStart.value);
            let end = parseInt(inputEnd.value);
            const max = this.tests.length - 1;

            if (isNaN(start) || isNaN(end)) {
                message.textContent = 'Введите корректные числа.';
                return;
            }

            if (start < 0) start = 0;
            if (end > max) end = max;

            if (start > end) {
                message.textContent = 'Начальный индекс не может быть больше конечного.';
                return;
            }

            this.rangeStart = start;
            this.rangeEnd = end;
            this.currentIndex = start;
            this.score = 0;

            shuffleRange(this.tests, this.rangeStart, this.rangeEnd);
            this.showQuestion();
        };

        this.app.appendChild(labelStart);
        this.app.appendChild(inputStart);
        this.app.appendChild(document.createElement('br'));
        this.app.appendChild(labelEnd);
        this.app.appendChild(inputEnd);
        this.app.appendChild(document.createElement('br'));
        this.app.appendChild(btn);
        this.app.appendChild(document.createElement('br'));
        this.app.appendChild(message);
    }

    showQuestion() {
        this.app.innerHTML = '';
        const test = this.tests[this.currentIndex];

        const question = document.createElement('div');
        question.textContent = this.currentIndex + '. ' + test.question;
        question.style.cssText = `
            font-size: 20px;
            font-weight: 600;
            color: #0f172a;
            margin-bottom: 20px;
        `;
        this.app.appendChild(question);
        this.app.appendChild(document.createElement('br'));

        const feedback = document.createElement('div');
        feedback.style.cssText = `
            font-size: 16px;
            font-weight: 500;
            margin-top: 9px;
        `;
        let answered = false;

        test.shuffledOptions.forEach((opt) => {
            const answerBtn = document.createElement('button');
            answerBtn.textContent = opt;
            answerBtn.style.cssText = `
                background-color: #f1f5f9;
                color: #0f172a;
                border: 1px solid #e2e8f0;
                padding: 10px 16px;
                border-radius: 10px;
                font-size: 15px;
                cursor: pointer;
                margin-bottom: 10px;
                transition: background-color 0.3s;
                width: 100%;
                text-align: left;
            `;
            answerBtn.onmouseover = () => answerBtn.style.backgroundColor = '#e2e8f0';
            answerBtn.onmouseout = () => answerBtn.style.backgroundColor = '#f1f5f9';

            answerBtn.onclick = () => {
                if (answered) return;
                answered = true;
                const correct = test.isCorrect(opt);
                if (correct) {
                    this.score++;
                    feedback.textContent = 'Правильно!';
                    
                    feedback.style.color = "#16a34a"
                    answerBtn.style.border = '2px solid #16a34a';
                    answerBtn.style.backgroundColor = '#dcfce7';
                } else {
                    feedback.textContent = `Неправильно. Правильный ответ: ${test.correctAnswer}`;
                    
                    feedback.style.color = "#ef4444"
                    answerBtn.style.border = '2px solid #ef4444';
                    answerBtn.style.backgroundColor = '#fee2e2';
                }

                const allButtons = this.app.querySelectorAll('button');
                allButtons.forEach(b => b.disabled = true);

                const nextBtn = document.createElement('button');
                nextBtn.textContent = 'Следующий';
                nextBtn.style.cssText = `
                    background-color: #316BFF;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 12px;
                    font-weight: 500;
                    font-size: 16px;
                    cursor: pointer;
                `;
                nextBtn.onmouseover = () => nextBtn.style.backgroundColor = '#1f51cc';
                nextBtn.onmouseout = () => nextBtn.style.backgroundColor = '#316BFF';
                nextBtn.onclick = () => this.nextQuestion();

                this.app.appendChild(document.createElement('br'));
                this.app.appendChild(nextBtn);
            };

            this.app.appendChild(answerBtn);
        });

        this.app.appendChild(document.createElement('br'));
        this.app.appendChild(feedback);
    }

    nextQuestion() {
        this.currentIndex++;
        if (this.currentIndex > this.rangeEnd) {
            this.showResult();
        } else {
            this.showQuestion();
        }
    }

    showResult() {
        this.app.innerHTML = `Результат: ${this.score} из ${this.rangeEnd - this.rangeStart + 1}<br>`;
        const btn = document.createElement('button');
        btn.textContent = 'Пройти другой диапазон';
        btn.style.cssText = `
            background-color: #316BFF;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            cursor: pointer;
            margin-top: 20px;
            transition: background-color 0.3s;
        `;
        btn.onmouseover = () => btn.style.backgroundColor = '#1f51cc';
        btn.onmouseout = () => btn.style.backgroundColor = '#316BFF';
        btn.onclick = () => this.askRange();
        this.app.appendChild(btn);
    }
}

export default TestPlatform;
