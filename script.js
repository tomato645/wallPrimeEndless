let primes = [2, 3, 5, 7, 9, 11, 13];

async function makePrime(times) {
    let compositeNum = 1;
    for (let i = 0; i < times; i++) {
        let randIndex = getRandom(0, primes.length - 1);
        compositeNum *= primes[randIndex];
    }
    console.log(compositeNum);
    let wall = document.querySelector("#wall");
    wall.innerHTML = compositeNum;
    for (let i = 50; i <= 150; i += 10) {
        wall.style.fontSize = `${i}px`;
        await sleep(10);
    }
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

WAITTIME = 600;
COUNTER = 0;

async function go() {
    let goBtn = document.querySelector("#go");
    goBtn.disabled = true;
    let wall = document.querySelector("#wall");
    let wallNum = Number(wall.innerHTML);
    let length = primesQueue.length;
    for (i = 0; i < length; i++) {
        let divisionResult = wallNum / primesQueue[0];
        console.log(`${wallNum}を${primesQueue[0]}で割ります。`);
        console.log(`結果は${divisionResult}`);
        console.log("認められる演算かどうか判定します");
        let isInt = Number.isInteger(divisionResult);
        console.log(`整数: ${isInt}`);
        
        if (isInt) {
            console.warn("割った！")
            wallNum = divisionResult;
            document.querySelector("#wall").innerHTML = divisionResult;
            await sleep(WAITTIME);
        } else {
            console.warn("割れなかった。。。")
            document.querySelector("#wall").style.color = "red";
            await sleep(WAITTIME / 2);
            document.querySelector("#wall").style.color = "blue";
            await sleep(WAITTIME / 2);
        }
        
        if (wallNum == 1){
            console.error("Clear!!!");
            COUNTER++
            document.querySelector("#counter").innerHTML = COUNTER;
            makePrime(3);
        }
        
        primesQueue.shift();
        console.log(`現状のキューは${primesQueue}`);
    }
    goBtn.disabled = false;
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