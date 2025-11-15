
const showResult = document.querySelector('.result span')
const showUser = document.querySelector('.user-choice span')
const showComputer = document.querySelector('.computer-choice span')
const choicesList = document.querySelector('.choices')
const choices = ['rock', 'paper', 'scissors']

const getResults =(userChoice, computerChoice) => {
    switch (userChoice + computerChoice){
        case 'rockscissors':
        case 'scissorspaper':
        case 'paperrock':
             resultDisplay = 'You Win!'
             break
        case 'scissorsrock':
        case 'paperscissors':
        case 'rockpaper':
            resultDisplay = 'You Lose!'
            break
        case 'scissorsscissors':
        case 'rockrock':
        case 'paperpaper':
                resultDisplay = 'Neither Side Wins'
                break
    }

    console.log(resultDisplay)

}



const commitChoose = (e) =>{
    
    const userChoice = e.target.innerText
    const computerChoice = choices[Math.floor(Math.random()* choices.length)]
    getResults(userChoice, computerChoice,)
    showResult.innerHTML = resultDisplay
    showUser.innerHTML = userChoice
    showComputer.innerHTML = computerChoice
}

choices.forEach(choice => {
    const button = document.createElement('button')
    button.innerText = choice
    button.addEventListener('click', commitChoose)
    choicesList.appendChild(button)
});


