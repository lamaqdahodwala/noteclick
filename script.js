let points = Number(localStorage.getItem('points'))
let staff = Array(localStorage.getItem('staff'))


if (points == null){
    points = 0
    staff = []
    
}

setInterval(() => {
    let e = document.getElementById('pointscarrier')
    e.innerHTML = "Points: " + points
    localStorage.setItem('points', points)
    localStorage.setItem('staff', staff)
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
    var worker = new Worker('load.js')
    worker.onmessage = function(event){
        localStorage.getItem('points') = points
    }
}
function choice(item) {
    console.log()
}

function ptsgen() { 
    points += 1

}

