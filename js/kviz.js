const questions = [
    {
        question: "Melyik a világ legnagyobb esőerdeje?",
        options: ["Kongói esőerdő", "Amazonasi esőerdő", "Délkelet-ázsiai esőerdő", "Daintree esőerdő"],
        answer: "Amazonasi esőerdő"
    },
    {
        question: "Melyik kontinensen található az Amazonas esőerdejének legnagyobb része?",
        options: ["Afrika", "Ázsia", "Dél-Amerika", "Ausztrália"],
        answer: "Dél-Amerika"
    },
    {
        question: "Melyik állat él az esőerdőkben?",
        options: ["Jegesmedve", "Jaguár", "Pingvin", "Sarki róka"],
        answer: "Jaguár"
    },
    {
        question: "Milyen az éghajlat a trópusi esőerdőkben?",
        options: ["Hideg és száraz", "Meleg és csapadékos", "Hűvös és szeles", "Forró és csapadékmentes"],
        answer: "Meleg és csapadékos"
    },
    {
        question: "Melyik növény jellemző a trópusi esőerdőkre?",
        options: ["Kaktusz", "Lucfenyő", "Orchidea", "Levendula"],
        answer: "Orchidea"
    },
    {
        question: "Mi az egyik legfontosabb szerepe az esőerdőknek a Földön?",
        options: ["A sivatagok növelése", "A biológiai sokféleség megőrzése", "A vulkánkitörések megakadályozása", "A tengerek sótartalmának csökkentése"],
        answer: "A biológiai sokféleség megőrzése"
    },
    {
        question: "Melyik veszélyezteti leginkább az esőerdőket?",
        options: ["Az erdőirtás", "A holdfény", "A szivárványok", "A dagály"],
        answer: "Az erdőirtás"
    },
    {
        question: "Melyik állat híres arról, hogy lassan mozog, és gyakran a fákon él az esőerdőkben?",
        options: ["Gepárd", "Lajhár", "Zebra", "Kenguru"],
        answer: "Lajhár"
    },
    {
        question: "Az esőerdők melyik szintjén található a legtöbb lombkorona?",
        options: ["A talaj alatt", "A lombkoronaszintben", "A folyók medrében", "A sziklák belsejében"],
        answer: "A lombkoronaszintben"
    },
    {
        question: "Miért fontos megóvni az esőerdőket?",
        options: ["Mert csak dísznövények élnek bennük", "Mert nincs bennük állati élet", "Mert élőhelyet biztosítanak sok fajnak és segítenek szabályozni a klímát", "Mert megakadályozzák az összes vihart"],
        answer: "Mert élőhelyet biztosítanak sok fajnak és segítenek szabályozni a klímát"
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