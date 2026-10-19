const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "Which programming language is used for web development?",
        options: ["Python", "Java", "JavaScript", "C++"],
        answer: "JavaScript"
    },
    {
        question: "Who developed the theory of relativity?",
        options: ["Isaac Newton", "Nikola Tesla", "Albert Einstein", "Galileo Galilei"],
        answer: "Albert Einstein"
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').innerText = question.question;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    question.options.forEach(option => {
        const optionElement = document.createElement('button');
        optionElement.classList.add('list-group-item', 'list-group-item-action', 'quiz-option');
        optionElement.innerText = option;
        optionElement.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(optionElement);
    });
}

function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
        score++;
    }

    document.querySelectorAll('.quiz-option').forEach(option => {
        option.disabled = true;
        if (option.innerText === correctAnswer) {
            option.classList.add('list-group-item-success');
        } else if (option.innerText === selectedOption) {
            option.classList.add('list-group-item-danger');
        }
    });

    if (currentQuestionIndex < questions.length - 1) {
        document.getElementById('next-button').disabled = false;
    } else {
        document.getElementById('next-button').innerText = "Show Results";
        document.getElementById('next-button').disabled = false;
    }
}

function showResult() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('score').innerText = score;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        document.getElementById('next-button').disabled = true;
    } else {
        showResult();
    }
}

document.getElementById('next-button').addEventListener('click', nextQuestion);
document.getElementById('retry-button').addEventListener('click', () => location.reload());

loadQuestion();