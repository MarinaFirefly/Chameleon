let sumHamelion = 0

let arrayGlasnie = []
data.sounds.forEach(sound => {
    if (sound.id < 11) {
        arrayGlasnie.push(sound)
    }
})
console.log(arrayGlasnie)

let arraySoglasnie = []
data.sounds.forEach(sound => {
    if (sound.id > 10) {
        arraySoglasnie.push(sound)
    }
})
console.log(arraySoglasnie)

let arraySlova = ["акт", "бак", "бас", "бег", "боб", "бок", "бор", "бук", "бык", "век", "вес", "вид", "вол", "вор", "все"]
let arrayLetters = []
let arrayColors = ["red", "green", "blue", "brown", "white", "yellow", "pink", "violet", "orange", "gray"]

function rand(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function create(tag) {
    return document.createElement(tag)
}

class Bug {
    constructor(image, size) {
        this.bug = this.create(image, size)
    }

    create(image, size) {
        var img = document.createElement("img")
        img.src = image
        img.width = size
        img.style.position = 'absolute'
        img.style.top = `${rand(0, window.innerHeight)}px`
        img.style.left = `${rand(0, window.innerWidth)}px`
        img.style.transition = '2s all'
        return img
    }
    appendTo(divname) {
        divname.appendChild(this.bug)
    }
    flex() {
        var bug = this.bug
        function flexingBug() {
            bug.style.top = `${rand(0, (window.innerHeight-100))}px`
            bug.style.left = `${rand(0, (window.innerWidth-100))}px`
            setTimeout(flexingBug, rand(500, 3000))
        }

        flexingBug()
    }
}

playbtn.onclick = () => {
    playbtn.remove()
    header.remove()
    msg = new SpeechSynthesisUtterance(`Найди букву или слово!`)
    msg.lang = "ru"
    msg.pitch = 0.3
    speechSynthesis.speak(msg)
    setTimeout(() => {
        let newSheet = () => {
            console.log(sumHamelion)
            if (sumHamelion < 3) {
                arrayLetters = arrayGlasnie
            }
            else if (sumHamelion > 2 && sumHamelion < 16) {
                arrayLetters = arraySoglasnie
            }
            /*       else {
                       arrayLetters = arraySlova
                   }*/

            class Letter {
                constructor(top, left) {
                    this.letter = this.createLetter(top, left)
                }

                createLetter(top, left) {
                    let letterRand = create('div')
                    let rLetter = arrayLetters[rand(0, arrayLetters.length - 1)]
                    letterRand.innerText = rLetter.name
                    letterRand.href = rLetter.value
                    letterRand.style = `position:absolute; width: 50%; text-align: center; color: ${arrayColors[rand(0, arrayColors.length - 1)]}`
                    letterRand.style.top = `${Number(top)}%`
                    letterRand.style.fontSize = "200px"
                    letterRand.style.left = `${Number(left)}%`
                    letterdiv.appendChild(letterRand)
                    return this.letter = letterRand
                }
            }
            let first = new Letter("10", "0")
            let second = new Letter("10", "50")
            let third = new Letter("50", "0")
            let fourth = new Letter("50", "50")

            let arrayForQuestion = [first, second, third, fourth]
            let letterForQuestion = arrayForQuestion[rand(0, arrayForQuestion.length - 1)]

            let msg = ""
            if (letterForQuestion.letter.href.indexOf("s") !== -1) {
                var audio = new Audio(letterForQuestion.letter.href)
                audio.play()
            }
            else {
                msg = new SpeechSynthesisUtterance(`${letterForQuestion.letter.innerText}`)
                msg.lang = "ru"
                speechSynthesis.speak(msg)
            }

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
                else {
                    element.letter.onclick = () => {
                        letterdiv.innerText = ""
                        let smile = create("img")
                        smile.src = "images/facepalm.jpg"
                        smile.id = "chameleon"
                        document.body.appendChild(smile)
                        setTimeout(() => {
                            smile.remove()
                            newSheet()
                        }, 1000)

                    }
                }
            })
        }
        newSheet()
        setTimeout(() => {
            let result = async () => {
                document.body.innerHTML = `<div id="modal">\n<div id="modalHeader">\n<button id="btnTimes">
            \n<i class="fas fa-times fa-2x" style="color: white"></i>\n</button>\n</div>\n
            <div id="modalTxt">Результат ${sumHamelion}</div>\n</div>\n<div id="modalBack">\n
            <img id="chamBack" src="images/chameleon3.png">\n</div>\n
            <footer class="footer">\n<p class="text-in-block">Chameleon by Laktionova</p>\n</footer>`
            }
            result().then(element => {
                for (let i = 0; i < sumHamelion; i++) {
                    let bug = new Bug("images/bug2.gif", "100")
                    bug.appendTo(modalBack)
                    bug.flex()
                    console.log(bug)
                }
                btnTimes.onclick = () => window.location.href = "index.html"
            })
        }, 60000)
    }, 2000);
}