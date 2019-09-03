let sumHamelion = 0

let arrayGlasnie = ["А а", "О о", "Е е", "У у", "И и", "Я я", "Э э", "Ю ю", "Ы ы", "Ё ё"]
let arraySoglasnie = ["Б", "В", "Г", "Д", "Ж", "З", "К", "Л", "М", "Н", "П", "Р", "С", "Т", "Ф", "Х", "Ц", "Ш", "Щ", "Ь", "Ъ", "Ч"]
let arraySlogi = ["акт", "бак", "бас", "бег", "боб", "бок", "бор", "бук", "бык", "век", "вес", "вид", "вол", "вор", "все"]
let arrayLetters = []
let arrayColors = ["red", "green", "blue", "brown", "white", "yellow", "pink", "violet", "orange", "gray"]

function rand(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function create(tag) {
    return document.createElement(tag)
}


playbtn.onclick = () => {
    playbtn.remove()
    header.remove()
    let newSheet = () => {
        console.log(sumHamelion)
        if (sumHamelion < 3) {
            arrayLetters = arrayGlasnie
        }
        else if (sumHamelion > 2 && sumHamelion < 6) {
            arrayLetters = arraySoglasnie
        }
        else {
            arrayLetters = arraySlogi
        }
        class Letter {
            constructor(top, left) {
                this.letter = this.createLetter(top, left)
            }
            createLetter(top, left) {
                let letterRand = create('div')
                letterRand.innerText = arrayLetters[rand(0, arrayLetters.length - 1)]
                letterRand.style.color = arrayColors[rand(0, arrayColors.length - 1)]
                letterRand.style.position = "absolute"
                letterRand.style.top = `${Number(top)}%`
                letterRand.style.fontSize = "220px"
                letterRand.style.left = `${Number(left)}%`
                letterdiv.appendChild(letterRand)
                return this.letter = letterRand
            }
        }
        let first = new Letter("10", "5")
        let second = new Letter("10", "50")
        let third = new Letter("50", "5")
        let fourth = new Letter("50", "50")

        let arrayForQuestion = [first, second, third, fourth]
        let letterForQuestion = arrayForQuestion[rand(0, arrayForQuestion.length - 1)]

        let msg = ""
        if (letterForQuestion.letter.innerText.length === 1) {
            msg = new SpeechSynthesisUtterance(`Найди букву ${letterForQuestion.letter.innerText}`)
        }
        else {
            msg = new SpeechSynthesisUtterance(`Найди слово ${letterForQuestion.letter.innerText}`)
        }
        msg.lang = "ru"
        speechSynthesis.speak(msg)

        arrayForQuestion.forEach(element => {
            if (String(element.letter.innerText) == String(letterForQuestion.letter.innerText)) {
                element.letter.onclick = () => {
                    ++sumHamelion
                    letterdiv.innerText = ""
                    let ham = create("img")
                    ham.src = "images/hamelion1.gif"
                    ham.id = "chameleon"
                    document.body.appendChild(ham)
                    setTimeout(() => {
                        ham.remove()
                        newSheet()
                    }, 1500)

                }
            }
        })
    }
    newSheet()
    setTimeout(() => {
        alert("Сумма очков " + sumHamelion)
        window.location.href = "index.html"

    }, 60000)
}