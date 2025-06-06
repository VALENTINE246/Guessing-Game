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

let defaultGuessLimit = 2
let defaultGuessrange = 5
let defaultLevelGuessLimit = 5


let level = localStorage.getItem('level') ? parseInt(localStorage.getItem('level')) : 1;
let tipNumber = localStorage.getItem('tipNo') ? parseInt(localStorage.getItem('tipNo')) : 0;
let guessLimit = localStorage.getItem('guessLimit') ? parseInt(localStorage.getItem('guessLimit')) : 2;
let showLimit = localStorage.getItem('showLimit') ? parseInt(localStorage.getItem('showLimit')) : guessLimit;
let levelNoOfGuess = localStorage.getItem('levelNoOfGuess') ? parseInt(localStorage.getItem('levelNoOfGuess')) : 5;
let randomNumber;




instruction.innerHTML = levelNoOfGuess
levelElement.innerHTML = `${level}`;
availableGuessElement.innerHTML = showLimit;
randomNumber = Math.floor(Math.random() * levelNoOfGuess) + 1;



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
     
      // if(showLimit !== 0) {
      //   showGuessElement.innerHTML = `Guess = ${guessValue}`;
      // }
      answerElement.innerHTML = `Answer = ${randomNumber}`;
      showOtherGuess_p.style.display = 'flex'
      const guesssesPara = document.createElement('p')
      guesssesPara.innerHTML = guessValue
      guesssesPara.classList.add('guess-elem')
      showOtherGuess.appendChild(guesssesPara)


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

        console.log(typeof(guessLimit))

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
      }
      if (showLimit === 0) {
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
        console.log(guessLimit)

        setTimeout(function() {
          showLimit = guessLimit
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


if (!tipNumber) {
  tipBtn.style.display = 'none'
}

randomTip = Math.floor(Math.random() * 2) + 1;

// shows tips
tipBtn.addEventListener('click', () => {
  console.log(randomTip)
  if (randomNumber !== 1) {
    if(tipNumber) {
      infoBox.style.display = 'flex'
      randomTip = Math.floor(Math.random() * 2) + 1;
      if (randomTip === 1) {
        confirmText.innerHTML = `Answer is either ${randomNumber - 1} or ${randomNumber}`
      } else if (randomTip === 2) {
        confirmText.innerHTML = `Answer is either ${randomNumber} or ${randomNumber - 1}`      
      }
      tipNumber -= 1
      localStorage.setItem('tipNo', tipNumber)
      console.log(tipNumber)
      showTipNo.innerHTML = tipNumber
      if (!tipNumber) {
        setTimeout(function() {
          tipBtn.style.display = 'none'
        })
      }
    }
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


// clears all data
clearAll.addEventListener('click', () => {
  
})

function clearAllData() {
  level = 1;
  levelElement.innerHTML = `${level}`;
  localStorage.setItem('level', level);

  levelNoOfGuess = defaultGuessrange;
  showLimit = defaultGuessLimit

  localStorage.setItem('levelNoOfGuess', levelNoOfGuess)
  localStorage.setItem('showLimit', showLimit)
  availableGuessElement.innerHTML = showLimit;

  instruction.innerHTML = levelNoOfGuess


  answerElement.innerHTML = `Answer = 0`;
  answerElement.style.display = 'none'
  showOtherGuess.innerHTML = ''
  showOtherGuess_p.style.display = 'none'
  tipNumber = 0
  showTipNo.innerHTML = tipNumber

  localStorage.removeItem('guessLimit')
  localStorage.removeItem('showLimit')

  randomNumber = Math.floor(Math.random() * 5) + 1;
}


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
  showLimit = defaultGuessLimit

  localStorage.setItem('levelNoOfGuess', levelNoOfGuess)
  localStorage.setItem('showLimit', showLimit)
  availableGuessElement.innerHTML = showLimit;

  instruction.innerHTML = levelNoOfGuess


  answerElement.innerHTML = `Answer = 0`;
  answerElement.style.display = 'none'
  showOtherGuess.innerHTML = ''
  showOtherGuess_p.style.display = 'none'
  tipNumber = 0
  showTipNo.innerHTML = tipNumber

  localStorage.removeItem('guessLimit')
  localStorage.removeItem('showLimit')

  randomNumber = Math.floor(Math.random() * 5) + 1;
  clearConfirmDiv.style.display =  'none'
})
