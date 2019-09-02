let sumHamelion = 0

let arrayGlasnie = ["А", "О", "Е", "У", "И", "Я", "Э", "Ю", "Ы", "Ё"]
let arraySoglasnie = ["Б", "В", "Г", "Д", "Ж", "З", "К", "Л", "М", "Н", "П", "Р", "С", "Т", "Ф", "Х", "Ц", "Ш", "Щ", "Ь", "Ъ", "Ч"]
let arraySlogi = ["КОТ","ВОТ","ЖАР","МИГ","МАК","РАК","РЫК","КИТ","ЁЖ",]
                //"ВА-","ВО-","ВЕ","ВУ","ВИ","ВЫ","ВЮ","ВЯ","ВЭ",
              //  "ГА-","ГО-","ГЕ","ГУ","ГИ","ГЫ","ГЮ","ГЯ","ГЭ",]
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
        if(sumHamelion < 3){
            arrayLetters = arrayGlasnie
        }
        else if (sumHamelion > 2 && sumHamelion < 6){
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
                letterRand.style.fontSize = "250px"
                letterRand.style.left = `${Number(left)}%`
                letterdiv.appendChild(letterRand)
                return this.letter = letterRand
            }
        }
        let first = new Letter("10", "15")
        let second = new Letter("10", "65")
        let third = new Letter("50", "15")
        let fourth = new Letter("50", "65")

        let arrayForQuestion = [first, second, third, fourth]
        let letterForQuestion = arrayForQuestion[rand(0, arrayForQuestion.length - 1)]

        let msg = new SpeechSynthesisUtterance(`Найди букву ${letterForQuestion.letter.innerText}`)
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