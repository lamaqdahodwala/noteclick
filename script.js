let points = Number(localStorage.getItem('points'))
let staff = Array(localStorage.getItem('staff'))
let clickpow = Number(localStorage.getItem('clickpow'))


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
        document.title = 'urmomguy'
    } else {
        document.title='Noteclick'
    }
}

if (typeof document.addEventListener === "undefined" || hidden === undefined) {
    console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
  } else {
    // Handle page visibility change
    document.addEventListener(visibilityChange, handlechange, false);
  
  }

if (points == null){
    points = 0
    staff = []
    clickpow = 1

}

setInterval(() => {
    let e = document.getElementById('pointscarrier')
    e.innerHTML = "Points: " + points
    localStorage.setItem('points', points)
    localStorage.setItem('staff', staff)
    localStorage.setItem('clickpow', clickpow)
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
            points += this.ptsper
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
        super([1,10, 10000])
    }
}
class BuyClassical extends BuyAuto{
    constructor(){
        super([0.5, 10, 22000])
    }
}
class BuySkrillexConcert extends BuyAuto{
    constructor(){
        super([0.25, 20, 75000])
    }
}

/*metronome, band, orchestra, classical, skrillex */
function confirmation(cls){
    let amount = (document.querySelector('input[name="amount"]:checked').value)
    if (confirm('Are you sure you want to buy ' + String(amount) + ' of this?')){
        if (points > cls.cost){
            return true;
        } else {
            alert("You cant buy this yet! You need " + ((cls.cost * amount) - points) + ' more points to buy!')
            return false;
        }
    }
    
}
function buyauto(name){
    var auto;
    switch (name){
        case ('metronome'):
            auto = new BuyMetronome()
            break
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
    }
    
    let auto1 = auto
    if (confirmation(auto)){
        alert('Thank you!')
        points -= auto.cost
        staff.push(auto)
        console.log(typeof(auto1))
        auto.start()
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

    metronome.play()
  const playeverything = async (ord) => {
    for (i of ord){
        console.log(i.id)
        i.play()

        await sleep(1000)
    }
  }
  let x = document.getElementById('instructions')
  x.innerHTML = "Find the correct sequence of notes to earn points!"

  document.body.appendChild(x)
  document.getElementById('container').hidden = false

  window.order = order
  window.playeverything = playeverything
  window.playeverything(window.order)
  window.metronome = metronome
  let correct = Math.floor(Math.random() * 3)
  window.correct = correct
}
function playagain() {
    window.metronome.play()
  window.playeverything(window.order)
}

function load(){
    alert('kok')
}
function choice(item) {
    console.log()
}

function ptsgen() { 
    let amount = clickpow
    points += clickpow

}


function purchase(){
    var value = Number(document.querySelector('#num').value)
    var price = 10000*value
    
    if (value > 100){
        alert("You can't buy that much at once! Max of 100 at a time")
    } else if (value <= 0){
        alert('You cant buy none!')
    } else{
        if (price > points){
            diff = (price-points).toString()
            alert("Grind up " + diff + " more points to buy this")
        } else {
            let x = confirm('You sure bro?')
            if (x){
                clickpow += value
            }
        }

    }
    
}
