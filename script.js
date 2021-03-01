let points = Number(localStorage.getItem('points'))
let staff = Array(localStorage.getItem('staff'))
let clickpow = Number(localStorage.getItem('clickpow'))
let __name = String(localStorage.getItem('name'))
let rbonus = Number(localStorage.getItem('rbonus'))
let rprice = Number(localStorage.getItem('rprice'))

if (rprice == 'null'){
    rprice = 100000000
}
console.log('Heads up!')
console.log('If you are trying to paste code in here, please don\'t. You are just going to ruin the fun for yourself.')


function getItem(type, key){
    return type(localStorage.getItem(key))
}



function resetAll(){
    metronomes = 0
    bands = 0
    orchestras = 0
    classicals = 0
    guitars = 0
    concerts = 0 
    earthquakes = 0
    clickpow = 1
    points = 0 
    
    window.location.reload(true)
    points = 0
    
}
let metronomes = getItem(Number, 'metronomes')
let bands = getItem(Number, 'bands')
let orchestras = getItem(Number, 'orchestras')
let classicals = getItem(Number, 'classicals')
let concerts = getItem(Number, 'concerts')
let guitars = getItem(Number, "guitars")
let earthquakes = getItem(Number, "earthquakes")



if (__name == 'null') {
    let __name = prompt('What is your name? First and last', '')
    while (__name.length < 3){
        alert('Please don\'t use your initials. Type your full first and last name')
    }
    localStorage.setItem('name', __name)
    
}


if (points == "null"){
    points = 0
    staff = []
    clickpow = 1
    metronomes, bands, orchestras, classicals, concerts, guitars, earthquakes = 0
    rbonus = 1
    rprice = 100000000
}


$(document).on("mouseleave", function(e) {
    fetch('https://mod-server.lamaqdahodwala.repl.co/offline/' + __name)
});

$(document).on('mouseenter', function(e) {
    fetch('https://mod-server.lamaqdahodwala.repl.co/online/' + __name)
});

var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
  hidden = "hidden";
  visibilityChange = "visibilitychange";

} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";

} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

function handlechange(){
    if (document[hidden]){
        fetch('https://mod-server.lamaqdahodwala.repl.co/offline/' + __name)
    } else {
        fetch('https://mod-server.lamaqdahodwala.repl.co/online/' + __name)
    }
}

if (typeof document.addEventListener === "undefined" || hidden === undefined) {
    console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
  } else {
    // Handle page visibility change
    document.addEventListener(visibilityChange, handlechange, false);
}


setInterval(() => {
    let e = document.getElementById('pointscarrier')
    e.innerHTML = 'Points: ' + points + ', Rebirth bonus: ' + rbonus
    
    e.innerHTML = "Points: " + points
    localStorage.setItem('points', points)
    localStorage.setItem('staff', staff)
    localStorage.setItem('clickpow', clickpow)
    localStorage.setItem('metronomes', metronomes)
    localStorage.setItem('bands', bands)
    localStorage.setItem('orchestras', orchestras)
    localStorage.setItem('classicals', classicals)
    localStorage.setItem('concerts', concerts)
    localStorage.setItem('guitars', guitars)
    localStorage.setItem('earthquakes', earthquakes)
    localStorage.setItem('rbonus', rbonus)
    localStorage.setItem('rprice', rprice)
    document.getElementById('current').innerHTML = 'Currently have ' + metronomes + ' metronomes, ' + bands + ' bands, ' + orchestras + ' orchestras, ' + classicals + ' classical composers, ' + concerts + ' concerts,  ' + guitars + ' guitars, and ' + earthquakes + ' 20-foot tall speakers'
    document.getElementById('currentclickpow').innerHTML = 'Current points per click: ' + (clickpow*rbonus)
}, 3)




class BuyAuto{
    constructor(data){

            this.interval = data[0] * 1000
            this.ptsper = data[1]
            let cost = data[2]
            this.cost = cost
    }
    start(){
        let promise = Promise.resolve()
        promise.then(setInterval(() => {
            points += (this.ptsper)*rbonus
        }, this.interval))
    }
}


//interval, cpi
class BuyMetronome extends BuyAuto{
    constructor(){
        super([1,2, 100])   
    }
}
class BuyBand extends BuyAuto{
    constructor(){
        super([0.5,3, 1000])
    }
}
class BuyOrchestra extends BuyAuto{
    constructor(){
        super([0.8 ,10, 10000])
    }
}
class BuyClassical extends BuyAuto{
    constructor(){
        super([0.5, 15, 22000])
    }
}
class BuySkrillexConcert extends BuyAuto{
    constructor(){
        super([0.25, 20, 75000])
    }
}

class ElectricGuitarShred extends BuyAuto{
    constructor(){
        super([0.1, 50, 200000])
    }
}

class EarthquakeBass extends BuyAuto{
    constructor(){
        super([0.05, 250, 10000000])
    }
}


function start(amount, cls){
    for (var i = 0; i < amount; i++ ){
        let auto = new cls()
        auto.start()
    }
}

start(metronomes, BuyMetronome)
start(bands, BuyBand)
start(orchestras, BuyOrchestra)
start(classicals, BuyClassical)
start(concerts, BuySkrillexConcert)
start(guitars, ElectricGuitarShred)
start(earthquakes, EarthquakeBass)

/*metronome, band, orchestra, classical, skrillex */
function confirmation(cls){
    let amount = (document.querySelector('input[name="amount"]:checked').value)
    if (true){
        if (points > (cls.cost*amount)){

            return true;
        } else if (amount == 'all'){
            return true;
        }
        } else {
            alert("You cant buy this yet! You need " + ((cls.cost * amount) - points) + ' more points to buy!')
            return false;
        }
    }
    

function buyauto(name){
    
    var auto;
    switch (name){
        case ('metronome'):
            auto = new BuyMetronome()
            
            break;
        case ('band'):
            auto = new BuyBand()
            
            break;
        case ('orchestra'):
            auto = new BuyOrchestra()
            
            break;
        case ('classical'):
            auto = new BuyClassical()
            
            break;
        case ("skrillex"):
            auto = new BuySkrillexConcert()
            
            break;
        case ('guitar'):
            auto = new ElectricGuitarShred()
            
            break;

        case ('earthquake'):
            auto = new EarthquakeBass()
            break;

    }
    
    let auto1 = auto
    if (confirmation(auto)){
        let amount = (document.querySelector('input[name="amount"]:checked').value)
        if (amount == 'all'){
            while (points > auto.cost){
                switch (auto.constructor.name){
                case "BuyMetronome":
                    metronomes ++
                    break;
                case "BuyBand":
                    bands ++
                    break;
                case "BuyClassical":
                    classicals ++
                    break;
                case "BuyOrchestra":
                    orchestras ++
                    break;
                case "BuySkrillexConcert":
                    
                    concerts ++
                    break;
                case "ElectricGuitarShred":
                    guitars ++
                    break;
                
                case "EarthquakeBass":
                    earthquakes ++
                    break;
                
            }
            auto.start()
            points -= auto.cost
            }

        } else {

        
        for (var i = 0; i < amount; i++){
            points -= auto.cost
            staff.push(auto)
            switch (auto.constructor.name){
                case "BuyMetronome":
                    metronomes ++
                    break;
                case "BuyBand":
                    bands ++
                    break;
                case "BuyClassical":
                    classicals ++
                    break;
                case "BuyOrchestra":
                    orchestras ++
                    break;
                case "BuySkrillexConcert":
                    
                    concerts ++
                    break;
                case "ElectricGuitarShred":
                    guitars ++
                    break;
                case 'EarthquakeBass':
                    earthquakes ++
                    break;
            }
            auto.start()
        }
        
        }
    }
}



function unhide(elementname){
    let q = document.getElementById(elementname)
    q.hidden=false
}


function hide(elementname){
    let q = document.getElementById(elementname)
    q.hidden = true
}

function work() {


  let btn = document.getElementById('btn')
  btn.hidden = true

  let note8 = document.getElementById('8note')
  let note1 = document.getElementById('1note')
  let note16 = document.getElementById('16note')
  let metronome = document.getElementById('metronome')

  let arr = [note1, note8, note16]
  let order = []

  var i = 0
  while (i < 4) {
    var randomItem = arr[Math.floor(Math.random() * arr.length)]
    order.push(randomItem)
    

    i++
  }

  const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
  let correctseq = []
  const playeverything = async (ord) => {
      let temp = []
    for (i of ord){
        i.play()
        temp.push(i.id)
        await sleep(750)
    }
    correctseq = temp
  }
  let x = document.getElementById('instructions')

  x.innerHTML = "Find the correct sequence of notes to earn points!"

  document.getElementById('container').hidden = false

  window.order = order
  window.playeverything = playeverything
  
  window.metronome = metronome
  window.correctseq = correctseq

  let correct = Math.floor(Math.random() * 3)
  if (correct == 0){
      correct = 1
  }
  window.correct = correct
  


}



function playagain() {
    window.metronome.play()
    window.playeverything(window.order)
}


function checkifcorrect(num) {
    if (num == window.correct) {
        alert("nice! You got it correct!")
    } else {
        alert('That was incorrect... The correct answer was ' + window.correct)
    }
}

function choice(item) {
    hide('container')
    unhide('btn')
    checkifcorrect(item)
}

function ptsgen() { 
    let amount = clickpow
    points += (clickpow*rbonus)

}


function purchase(){
    var value = Number(document.querySelector('#num').value)
    var price = 10000*value
    
    if (value <= 0){
        alert('You cant buy none!')
    } else{
        if (price > points){
            diff = (price-points).toString()
            alert("Grind up " + diff + " more points to buy this")
        } else {
            let x = true;
            if (x){
                clickpow += value
                points -= price
            }
        }

    }
    
}

function purchaseall(){
    while (points > 10000){
        clickpow += 1
        points -= 10000
    }
}

function rebirth(){
    if (rprice > points){
        alert('You need ' + (rprice-points) + ' more points to rebirth')
    } else {
        if (confirm('This WILL reset everything you have. All your autos, points, and points per click will be lost.')){
            if (confirm('Last chance to go back. This is irreversable.')){
                resetAll()
                rbonus += 0.5
                rprice *= 1.5
            }
        }
    }
}

