const inputElement = document.getElementById('guess');
const guessBtn = document.getElementById('btn');
const availableGuessElement = document.getElementById('limit');
const availableGuessElementPara = document.getElementById('availabe-guess-para')
const answerElement = document.getElementById('ans');
const resetBtn = document.getElementById('reset');
let showLevel = document.getElementById('level')
const showError = document.getElementById('error')
const showTipNo = document.getElementById('tip')
const tipBtn = document.getElementById('tip-btn')
const showOtherGuess_p = document.getElementById('show-guesses-p')
const showOtherGuess = document.getElementById('show-guesses')
const infoBox = document.getElementById('info')
const levelElement = document.getElementById('level');
const confirmText = document.getElementById('confirm-text')
const dispLevel_p = document.getElementById('disp-level-p')
const dispLevel = document.getElementById('disp-level')
const confirmBtn = document.getElementById('confirm-info')
const instruction = document.getElementById('instruction')
const mainScore = document.getElementById('main-score')
const clearAll = document.getElementById('clear')
const clearConfirmDiv = document.getElementById('confirm-clear-div')
const cancelClear = document.getElementById('cancel-clear')
const okClear = document.getElementById('ok-clear')
const showActive = document.getElementById('active')
const gameRule = document.getElementById('game-rule')
const closeRule = document.getElementById('close-rule')

// const toggleButton = document.getElementById('dlm')
// const body = document.body;

let defaultGuessLimit = 2
let defaultGuessrange = 5
let defaultLevelGuessLimit = 5


let level = localStorage.getItem('level') ? parseInt(localStorage.getItem('level')) : 1;
let tipNumber = localStorage.getItem('tipNo') ? parseInt(localStorage.getItem('tipNo')) : 0;
let guessLimit = localStorage.getItem('guessLimit') ? parseInt(localStorage.getItem('guessLimit')) : 2;
let showLimit = localStorage.getItem('showLimit') ? parseInt(localStorage.getItem('showLimit')) : guessLimit;
let levelNoOfGuess = localStorage.getItem('levelNoOfGuess') ? parseInt(localStorage.getItem('levelNoOfGuess')) : 5;

let playingStat = localStorage.getItem('playingStat') ? parseInt(localStorage.getItem('playingStat')) : 0;

let checkRule = localStorage.getItem('checkRule') ? parseInt(localStorage.getItem('checkRule')) : 1;

let randomNumber;


closeRule.addEventListener('click', () => {
  gameRule.style.display = 'none'

  checkRule = 0
  localStorage.setItem('checkRule', checkRule)

})

if(!checkRule) {
  gameRule.style.display = 'none'
}

showActive.addEventListener('click', () => {
  gameRule.style.display = 'flex'
})

instruction.innerHTML = levelNoOfGuess
levelElement.innerHTML = `${level}`;
availableGuessElement.innerHTML = showLimit;
randomNumber = Math.floor(Math.random() * levelNoOfGuess) + 1;


// toggleButton.addEventListener('click', () => {
//   body.classList.toggle('dm')
// })

guessBtn.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(randomNumber)
  if (inputElement.value) {
    const guessValue = Number(inputElement.value);
    if (guessValue >= 1 && guessValue <= levelNoOfGuess) {

      if (showLimit !== 0) {
        showLimit -= 1;
        localStorage.setItem('showLimit', showLimit)
        availableGuessElement.innerHTML =  showLimit;
      }
     
      answerElement.innerHTML = `Answer = ${randomNumber}`;
      showOtherGuess_p.style.display = 'flex'
      const guesssesPara = document.createElement('p')
      guesssesPara.innerHTML = guessValue
      guesssesPara.classList.add('guess-elem')
      showOtherGuess.appendChild(guesssesPara)

      guesssesPara.style.color = 'yellow'

      setTimeout(function() {
        guesssesPara.style.color = 'white'
      }, 1500)

      playingStat = 1
      localStorage.setItem('playingStat', playingStat)

      if(playingStat) {
        showActive.style.display = 'flex'
      }


      if (guessValue === randomNumber) {
        setTimeout(function() {
          showError.innerHTML = 'Do not choose the same number twice'
          showError.style.color = 'white'
        }, 2000)

        levelNoOfGuess += 2;
        localStorage.setItem('levelNoOfGuess', levelNoOfGuess)
        instruction.innerHTML = levelNoOfGuess

        level += 1;
        localStorage.setItem('level', level);
        levelElement.innerHTML = level;

        guessLimit += 1
        localStorage.setItem('guessLimit', guessLimit)
        availableGuessElement.innerHTML = guessLimit


        showLimit = guessLimit
        localStorage.setItem('showLimit', showLimit)
        availableGuessElement.innerHTML = showLimit

        confirmText.innerHTML = 'You win, Congrats! You have entered a new level'
        dispLevel.innerHTML = level
        dispLevel_p.style.display = 'initial'

        infoBox.style.display =  'flex'
        localStorage.setItem('tipNo', tipNumber)
        answerElement.innerHTML = `Answer = 0`;

         showOtherGuess.innerHTML = ''
        showOtherGuess_p.style.display = 'none'
        showLimit = guessLimit

        availableGuessElement.innerHTML = showLimit
        showTipNo.innerHTML = tipNumber

        randomNumber = Math.floor(Math.random() * levelNoOfGuess) + 1;

        if (tipNumber) {
          tipBtn.style.display = 'flex'
        }

        increaseTip()

        if (showLimit < 2) {
          availableGuessElementPara.style.color = 'red'
        }
        showTipNo.innerHTML = tipNumber
        playingStat = 0
        localStorage.setItem('playingStat', playingStat)

        if (!playingStat) {
          showActive.style.display = 'none'
        }
      }

      if (showLimit === 0) {
        if(playingStat) {
          playingStat = 0
          localStorage.setItem('playingStat', playingStat)
        }
        if (!playingStat) {
          showActive.style.display = 'none'
        }
        infoBox.style.display = 'flex'
        confirmText.innerHTML = 'You are out of Guesses'
        dispLevel_p.style.display = 'none'

        tipBtn.style.display = 'none'

        answerElement.style.display = 'flex'
        answerElement.innerHTML = `Answer: ${randomNumber}`
        showOtherGuess.innerHTML = ''
        showOtherGuess_p.style.display = 'none'
        showError.innerHTML = 'You are out of guesses'
        showError.style.color = 'red'

        setTimeout(function() {
          showLimit = guessLimit
          localStorage.setItem('showLimit', showLimit)
          availableGuessElement.innerHTML = guessLimit;
        },1000)

        setTimeout(function() {
          showError.innerHTML = 'Do not choose the same number twice'
          showError.style.color = 'white'
        }, 4000)
        randomNumber = Math.floor(Math.random() * levelNoOfGuess) + 1;
      }
      inputElement.value = '';
    } else {
      showError.innerHTML = `Please enter a number from 1 to ${levelNoOfGuess}!`
      showError.style.color = 'red'

      setTimeout(function() {
        showError.innerHTML = 'Do not choose the same number twice'
        showError.style.color = 'white'
      }, 3000)
    }
  }
});

// _____________________________________________

if(playingStat) {
    showActive.style.display = 'flex'
  }

if (!tipNumber) {
  tipBtn.style.display = 'none'
}

randomTip = Math.floor(Math.random() * 2) + 1;

// shows tips
tipBtn.addEventListener('click', () => {
  if (randomNumber !== 1) {
    if(tipNumber && showLimit < 2) {
      infoBox.style.display = 'flex'
      randomTip = Math.floor(Math.random() * 2) + 1;
      if (randomTip === 1) {
        confirmText.innerHTML = `Answer is either ${randomNumber - 1} or ${randomNumber}`
      } else if (randomTip === 2) {
        confirmText.innerHTML = `Answer is either ${randomNumber} or ${randomNumber - 1}`      
      }
      tipNumber -= 1
      localStorage.setItem('tipNo', tipNumber)
      showTipNo.innerHTML = tipNumber
      showTipNo.style.color = 'red'

      setTimeout(function() {
        showTipNo.style.color = 'white'
      },4500)
      if (!tipNumber) {
        setTimeout(function() {
          tipBtn.style.display = 'none'
        })
      }
    } else {
      alert('You can only use Tips when your guess limit is 1')
    }
  } else {
    alert ('You cant use Tips at this moment')
  }
  dispLevel_p.style.display = 'none'
})

confirmBtn.addEventListener('click', () => {
  infoBox.style.display =  'none'
  confirmText.innerHTML = ''
    
  if (tipNumber) {
    tipBtn.style.display = 'initial'
  }

  availableGuessElement.innerHTML = guessLimit;


  answerElement.innerHTML = `Answer = 0`;
  answerElement.style.display = 'none'
  showOtherGuess.innerHTML = ''
  showOtherGuess_p.style.display = 'none'
})


showTipNo.innerHTML = tipNumber

function increaseTip() {
  if (level === 3) {
    tipNumber += 1
    showTipNo.innerHTML = tipNumber
    localStorage.setItem('tipNo', tipNumber)
  } else if(level === 5) {
    tipNumber += 1
    localStorage.setItem('tipNo', tipNumber)
    showTipNo.innerHTML = tipNumber
  } else if (level === 10) {
    tipNumber += 1
    localStorage.setItem('tipNo', tipNumber)
    showTipNo.innerHTML = tipNumber
  } else if(level === 15) {
    tipNumber += 1
    localStorage.setItem('tipNo', tipNumber)
    showTipNo.innerHTML = tipNumber
  } else if(level === 20) {
    tipNumber += 1
    localStorage.setItem('tipNo', tipNumber)
    showTipNo.innerHTML = tipNumber
  } else if(level === 25) {
    tipNumber += 1
    localStorage.setItem('tipNo', tipNumber)
    showTipNo.innerHTML = tipNumber
  } else if(level === 30) {
    tipNumber += 1
    localStorage.setItem('tipNo', tipNumber)
    showTipNo.innerHTML = tipNumber
  } else if(level === 35) {
    tipNumber += 1
    localStorage.setItem('tipNo', tipNumber)
    showTipNo.innerHTML = tipNumber
  } else if(level === 40) {
    tipNumber += 1
    localStorage.setItem('tipNo', tipNumber)
    showTipNo.innerHTML = tipNumber
  } else if(level === 45) {
    tipNumber += 1
    localStorage.setItem('tipNo', tipNumber)
    showTipNo.innerHTML = tipNumber
  } else if(level === 50) {
    tipNumber += 1
    localStorage.setItem('tipNo', tipNumber)
    showTipNo.innerHTML = tipNumber
  } else if(level === 55) {
    tipNumber += 1
    localStorage.setItem('tipNo', tipNumber)
    showTipNo.innerHTML = tipNumber
  } else if(level === 60) {
    tipNumber += 1
    localStorage.setItem('tipNo', tipNumber)
    showTipNo.innerHTML = tipNumber
  } else if(level === 65) {
    tipNumber += 1
    localStorage.setItem('tipNo', tipNumber)
    showTipNo.innerHTML = tipNumber
  } else if(level === 70) {
    tipNumber += 1
    localStorage.setItem('tipNo', tipNumber)
    showTipNo.innerHTML = tipNumber
  } else if(level === 75) {
    tipNumber += 1
    localStorage.setItem('tipNo', tipNumber)
    showTipNo.innerHTML = tipNumber
  } else if(level === 80) {
    tipNumber += 1
    localStorage.setItem('tipNo', tipNumber)
    showTipNo.innerHTML = tipNumber
  } else if(level === 85) {
    tipNumber += 1
    localStorage.setItem('tipNo', tipNumber)
    showTipNo.innerHTML = tipNumber
  } else if(level === 90) {
    tipNumber += 1
    localStorage.setItem('tipNo', tipNumber)
    showTipNo.innerHTML = tipNumber
  } else if(level === 95) {
    tipNumber += 1
    localStorage.setItem('tipNo', tipNumber)
    showTipNo.innerHTML = tipNumber
  }
  
}

clearAll.addEventListener('click', () => {
  clearConfirmDiv.style.display = 'flex'
})

cancelClear.addEventListener('click', () => {
  clearConfirmDiv.style.display =  'none'
})

okClear.addEventListener('click', (e) => {
  e.preventDefault();
  level = 1;
  levelElement.innerHTML = `${level}`;
  localStorage.setItem('level', level);

  levelNoOfGuess = defaultGuessrange;
  showLimit = 2

  localStorage.setItem('levelNoOfGuess', levelNoOfGuess)
  localStorage.setItem('showLimit', showLimit)
  availableGuessElement.innerHTML = showLimit;

  instruction.innerHTML = levelNoOfGuess

  answerElement.innerHTML = `Answer = 0`;
  answerElement.style.display = 'none'
  showOtherGuess.innerHTML = ''
  showOtherGuess_p.style.display = 'none'

  tipNumber = 0
  localStorage.setItem('tipNo', tipNumber)
  showTipNo.innerHTML = tipNumber

  localStorage.removeItem('guessLimit')
  localStorage.removeItem('showLimit')

  randomNumber = Math.floor(Math.random() * 5) + 1;
  clearConfirmDiv.style.display =  'none'
})
