class Test {
    constructor(question, correctAnswer, incorrectAnswers) {
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.incorrectAnswers = incorrectAnswers;
        this.shuffledOptions = this.shuffleAnswers();
    }

    shuffleAnswers() {
        const options = [this.correctAnswer, ...this.incorrectAnswers];
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        return options;
    }

    isCorrect(answer) {
        return answer === this.correctAnswer;
    }
}

export default Test;