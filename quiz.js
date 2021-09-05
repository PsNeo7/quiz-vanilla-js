questions = [
    {
        id: 1,
        question: "Whats 1+1?",
        options: [{ option: '2', correct: true }, { option: '1', correct: false }, { option: '3', correct: false }, { option: '0', correct: false }]
    },
    {
        id: 2,
        question: "Whats 1+2?",
        options: [{ option: '2', correct: false }, { option: '13', correct: false }, { option: '3', correct: true }, { option: '0', correct: false }]
    },
    {
        id: 3,
        question: "Whats 1-1?",
        options: [{ option: '2', correct: false }, { option: '1', correct: false }, { option: '3', correct: false }, { option: '0', correct: true }]
    },
    {
        id: 4,
        question: "Whats 1-1?",
        options: [{ option: '11', correct: false }, { option: '1', correct: false }, { option: '23', correct: false }, { option: '0', correct: true }]
    },
    {
        id: 5,
        question: "Whats 1*1?",
        options: [{ option: '111', correct: false }, { option: '1', correct: true }, { option: '333', correct: false }, { option: '0', correct: false }]
    },
    {
        id: 6,
        question: "Whats 1%1?",
        options: [{ option: '2', correct: false }, { option: '1', correct: true }, { option: '3', correct: false }, { option: '0', correct: false }]
    },
    {
        id: 7,
        question: "Whats 10-1?",
        options: [{ option: '2', correct: false }, { option: '1', correct: false }, { option: '3', correct: false }, { option: '9', correct: true }]
    },
    {
        id: 8,
        question: "Whats 11-1?",
        options: [{ option: '10', correct: true }, { option: '111', correct: false }, { option: '3', correct: false }, { option: '1', correct: false }]
    }
    ,
    {
        id: 9,
        question: "Whats 1-1?",
        options: [{ option: '2', correct: false }, { option: '1', correct: false }, { option: '3', correct: false }, { option: '0', correct: true }]
    },
    {
        id: 10,
        question: "Whats 10+1?",
        options: [{ option: '2', correct: false }, { option: '11', correct: true }, { option: '3', correct: false }, { option: '0', correct: false }]
    }
]


currentQuestion = sessionStorageQuestionNumber()

answers = sessionStoragegetAnswers()

function sessionStorageQuestionNumber() {
    if (window.sessionStorage.getItem('currentQuestion')) {
        // console.log('questions item found', window.sessionStorage.getItem('currentQuestion'));
        return Number(window.sessionStorage.getItem('currentQuestion'))
    } else {
        // console.log('no session exists, creating session')
        window.sessionStorage.setItem('currentQuestion', 0);
        return 0
    }
}

function sessionStoragegetAnswers() {
    if (window.sessionStorage.getItem('answers')) {
        // console.log('answers item found', window.sessionStorage.getItem('answers'));
        return JSON.parse(window.sessionStorage.getItem('answers'))
    } else {
        // console.log('no session exists, creating session')
        window.sessionStorage.setItem('answers', JSON.stringify({}));
        return {}
    }
}

current_answer = ''

question_ele = document.getElementById('question')
question_area = document.getElementById('question-form')

options_ele = document.getElementById('options')

document.getElementById('total-questions').innerText = questions.length

setQuestion()

function setQuestion() {
    current_answer = ''
    document.getElementById('current-question-no').innerText = currentQuestion + 1
    options_ele.innerHTML = ''
    // console.log("setquestion called")
    question_ele.innerText = questions[currentQuestion].question
    for (let i = 0; i < questions[currentQuestion].options.length; i++) {
        let options_render = document.createElement('input')
        options_render.type = 'radio'
        options_render.id = 'option-' + questions[currentQuestion].id + '-' + i
        options_render.name = 'queston' + currentQuestion
        options_render.value = questions[currentQuestion].options[i].option
        options_render.dataset.value = 'answer-element'
        // console.log(answers[questions[currentQuestion].id], options_render.value, answers[questions[currentQuestion].id] == options_render.value)
        if (answers[questions[currentQuestion].id] == options_render.value) {
            options_render.checked = true
        }
        let options_lable = document.createElement('label')
        options_lable.for = 'option-' + questions[currentQuestion].id + '-' + i
        options_lable.innerText = questions[currentQuestion].options[i].option
        options_ele.appendChild(options_render)
        options_ele.appendChild(options_lable)
        options_ele.appendChild(document.createElement('br'))
    }
    checkForNextPermission()
}


document.getElementById('options').addEventListener('click', (e) => {
    if (e.target.value) {
        // console.log(e.target.value, "click event fired")
        current_answer = e.target.value
    }
})


submitBtn = document.getElementById('submitBtn')

submitBtn.addEventListener('click', () => {
    answers[questions[currentQuestion].id] = current_answer
    window.sessionStorage.setItem('answers', JSON.stringify(answers));
    // console.log(answers)
    checkForNextPermission()
})

prevBtn = document.getElementById('prevBtn')

prevBtn.addEventListener('click', () => {
    if (currentQuestion === 0) {

    } else {
        // console.log(answers, answers.length)
        question_area.classList.add('slide-question-reverse')
        question_area.addEventListener('animationend', () => { question_area.classList.remove('slide-question-reverse') })
        currentQuestion -= 1
        setQuestion()
        window.sessionStorage.setItem('currentQuestion', currentQuestion);
    }
    checkForLastQuestion()

})

nextBtn = document.getElementById('nextBtn')

nextBtn.addEventListener('click', () => {
    // if (nextBtn.innerText == 'Review') {
    //     reviewSection.style.display = 'Block'
    //     generateReview()
    // }
    // if (currentQuestion === questions.length - 1) {
    //     nextBtn.innerText = 'Review'
    //     reviewSection.style.display = 'Block'
    //     generateReview()
    // } else {
    //     nextBtn.innerText = 'Next'
    //     question_area.classList.add('slide-question-forward')
    //     question_area.addEventListener('animationend', () => { question_area.classList.remove('slide-question-forward') })
    //     currentQuestion += 1
    //     setQuestion()
    //     window.sessionStorage.setItem('currentQuestion', currentQuestion);

    // }
    if (currentQuestion < questions.length - 1) {
        nextBtn.innerText = 'Next'
        question_area.classList.add('slide-question-forward')
        question_area.addEventListener('animationend', () => { question_area.classList.remove('slide-question-forward') })
        currentQuestion += 1
        setQuestion()
        window.sessionStorage.setItem('currentQuestion', currentQuestion);
    }
    if(nextBtn.innerText == 'Review'){
        generateReview()
    } 
    // else {
    //     window.sessionStorage.setItem('currentQuestion', currentQuestion);
    //     nextBtn.innerText = 'Review'
    //     reviewSection.style.display = 'Block'
    //     generateReview()
    // }
    checkForLastQuestion()

    // console.log('current question', currentQuestion, questions.length - 1)
})

function checkForNextPermission(){
    if(!answers[questions[currentQuestion].id]){
        nextBtn.disabled = true
    }else{
        nextBtn.disabled = false
    }
}

function checkForLastQuestion(){
    if (currentQuestion === questions.length - 1) {
        nextBtn.innerText = 'Review'
        // generateReview()
    }else{
        nextBtn.innerText = 'Next'
        resetReview()
    }
}

const form_ele = document.querySelector('form');
form_ele.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log('Form submission cancelled.');
    // console.log(event)
})

form_ele.addEventListener('reset', () => {
    delete answers[questions[currentQuestion].id]
    window.sessionStorage.setItem('answers', JSON.stringify(answers));
    checkForNextPermission()
    // answers[questions[currentQuestion].id] = null
})


submitExamBtn = document.getElementById('submitExamBtn')
submitExamBtn.addEventListener('click', () => {
    evaluateScore()
    currentQuestion = 0
    answers = {}
    resetReview()
    setQuestion()
    window.sessionStorage.clear()
})

reviewSection = document.getElementById('review-section')
reviewSection.style.display = 'None'

function resetReview() {
    reviewSection.style.display = 'None'

}

function generateReview() {
    reviewSection.style.display = 'Block'
    reviewList = document.getElementById('review-list')
    reviewList.innerText = ''
    for (let i = 0; i < questions.length; i++) {
        let listItem = document.createElement('LI')
        listItem.innerText = i+1 + ')' + questions[i].question + ' : ' + (answers[questions[i].id] || 'No answer')
        reviewList.appendChild(listItem)
    }
}

function evaluateScore(){
    let score = 0
    // console.log('entered eval score');
    for(i in answers){
        for(j of questions){
            if(i == j.id){
                for(option of j.options){
                    // console.log(option.option,answers[i],option.correct)
                    if(option.option == answers[i] && option.correct === true){
                        // console.log(option.option,answers[i],option.correct)
                        score+=1;
                        break
                    }
                }
            }
        }
    }
    // console.log(score, 'score calcuated');
    // window.alert("You've scored ", score, "/", questions.length)
    window.alert(`You've scored ${score}/${questions.length}`)
}