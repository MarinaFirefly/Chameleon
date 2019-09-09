let sumHamelion = 0

let arrayGlasnie = []
data.sounds.forEach(sound => {
    if (sound.id < 11) {
        arrayGlasnie.push(sound)
    }
})

let arraySoglasnie = []
data.sounds.forEach(sound => {
    if (sound.id > 10) {
        arraySoglasnie.push(sound)
    }
})

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
        img.className = "bugs"
        img.src = image
        img.width = size
        img.style.position = 'absolute'
        img.style.top = `${rand(0, window.innerHeight - 55)}px`
        img.style.left = `${rand(0, window.innerWidth - 55)}px`
        return img
    }
    appendTo(divname) {
        divname.appendChild(this.bug)
    }

    flex() {
        let bug = this.bug
        function flexingBug() {
            bug.style.top = `${rand(0, (window.innerHeight - 55))}px`
            bug.style.left = `${rand(0, (window.innerWidth - 55))}px`
            bug.style.transition = '5s'
            setTimeout(flexingBug, rand(1000, 5000))
        }
        flexingBug()
    }
    rotation() {
        let bug = this.bug
        function bugRotate() {
            bug.style.transform = `rotate(${rand(90, 270)}deg)`
            bug.style.transition = '0.1s'
            setTimeout(bugRotate, 5000)
        }
        bugRotate()
    }
}

playbtn.onclick = () => {
    playbtn.remove()
    header.remove()
    msg = new SpeechSynthesisUtterance(`Найди букву!`)
    msg.lang = "ru"
    msg.pitch = 0.3
    speechSynthesis.speak(msg)
    setTimeout(() => {
        let newSheet = () => {
            console.log(sumHamelion)
            if (sumHamelion < 6) {
                arrayLetters = arrayGlasnie
            }
            else {
                arrayLetters = arraySoglasnie
            }

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
                        ham.src = "images/chameleon1.gif"
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
                        smile.src = "images/sad1.png"
                        smile.id = "sad"
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
                let bugTxt = ``
                for (let i = 0; i < sumHamelion; i++) {
                    bugTxt += `<i class="fas fa-bug"></i>`
                }
                document.body.innerHTML = `<div id="modal">\n<div id="modalHeader">\n<button id="btnTimes">
            \n<i class="fas fa-times fa-2x" style="color: white"></i>\n</button>\n</div>\n
            <div id="modalTxt">Результат ${sumHamelion} \n ${bugTxt}</div>\n</div>\n<div id="modalBack">\n
            <img id="chamBack" src="images/chameleon3.png">\n</div>\n
            <footer class="footer">\n<p class="text-in-block">Chameleon by Laktionova</p>\n</footer>`
            }
            result().then(element => {
                for (let i = 0; i < sumHamelion; i++) {
                    let bug = new Bug(`images/bug${rand(1, 6)}.png`, `${rand(70, 110)}`)
                    bug.appendTo(modalBack)
                    bug.rotation()
                    bug.flex()
                }
                btnTimes.onclick = () => window.location.href = "index.html"
            }).then(element => {
                setTimeout(function delBug() {
                    let bugDel = document.getElementsByClassName("bugs")[0]
                    bugDel.parentNode.removeChild(bugDel)
                    let i = 0
                    if (i < document.getElementsByClassName("bugs").length) {
                        setTimeout(() => delBug(), 5000)
                        i++
                    }
                }, 5000)
            })
        }, 60000)
    }, 2000)
}