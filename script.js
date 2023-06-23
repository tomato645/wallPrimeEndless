let primes = [2, 3, 5, 7, 9, 11, 13];

function makePrime(times) {
    let compositeNum = 1;
    for (let i = 0; i < times; i++) {
        let randIndex = getRandom(0, primes.length - 1);
        compositeNum *= primes[randIndex];
    }
    console.log(compositeNum);
    document.querySelector("#wall").innerHTML = compositeNum;
}

function getRandom(min, max) {
    var random = Math.floor(Math.random() * (max + 1 - min)) + min;
    return random;
}

function makeButtons() {
    let btnPlace = document.querySelector(".primeBtn");
    for (const i of primes) {
        let btn = document.createElement("button");
        btn.innerHTML = i;
        btn.setAttribute("onClick", `storePrime(${i})`);
        btnPlace.appendChild(btn);
    }
}
makeButtons();

let primesQueue = [];
function storePrime(prime) {
    primesQueue.push(prime);
    document.querySelector("#primesQueue").innerHTML = primesQueue;
}

WAITTIME = 800;

async function go() {
    let wall = document.querySelector("#wall")
    let wallNum = Number(wall.innerHTML);
    let length = primesQueue.length;
    for (i = 0; i <= length; i++) {
        let isNan = (wallNum /= primesQueue[i]) !== NaN;
        let isInt = Number.isInteger(wallNum /= primesQueue[0]);
        
        console.log(primesQueue);
        console.log(isNan);
        console.log(`isInt: ${isInt}`);
        if (wallNum == 1){
            wallNum = "clear";
            makePrime(3);
        }else if (isNan && isInt) {
            console.log(`${wallNum}/${primesQueue[0]} = ${wallNum /= primesQueue[0]}`)
            console.log(`${wallNum} を ${primesQueue[0]} で割ります`)
            wallNum /= primesQueue[0];
            primesQueue.shift();
            document.querySelector("#primesQueue").innerHTML = primesQueue;
            document.querySelector("#wall").innerHTML = wallNum;
            await sleep(WAITTIME);
        } else {
            primesQueue.shift();
            document.querySelector("#primesQueue").innerHTML = primesQueue;
            wall.style.color = "red";
            await sleep(WAITTIME / 2);
            wall.style.color = "blue";
            await sleep(WAITTIME / 2);
        }
    }
    console.warn(primesQueue)
}

document.querySelector("#delete").addEventListener("click",
    function () {
        primesQueue.pop();
        document.querySelector("#primesQueue").innerHTML = primesQueue;
    });

window.onload = makePrime(3);

// Sleep関数
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  };