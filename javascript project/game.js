window.addEventListener("load", function() {
    let Data = document.querySelectorAll("span");
    let playagain = document.querySelectorAll("div");
    let meassages = document.querySelectorAll("h1");
    let images = ["images/bird1.gif", "images/bird2.gif", "images/bird3.gif"];
    let gameBtn = document.querySelectorAll("button");
    let gameStarted = document.querySelector(".container");
    let gameimage = document.querySelector("img");
    let userValue = document.querySelectorAll(".name");
    let userName = new URLSearchParams(window.location.search);
    let birds = [];
    let kills = [];
    let score = 0;
    let numofKilledbirds = 0;
    /////// username 
    if (userName.get("username")) {
        userValue[0].innerHTML = ` ${userName.get("username")}`;
        userValue[1].innerHTML = ` : ${userName.get("username")}`;
    }
    /////////start game 
    function begingame() {
        Data[3].innerText = "Last Score : " + localStorage.getItem("lastScore");
        gameStarted.style.display = "none";
        startTimer();
        let movbird = setInterval(function() {
            movingbird();

            return movbird;
        }, 1000);
        let bombid = setInterval(function() {
            fallDown();

            return bombid;
        }, 2000);

        setTimeout(function() {
            clearInterval(bombid);
        }, 52000);
        setTimeout(function() {
            clearInterval(movbird);
        }, 52000);
        console.log(meassages);
        setTimeout(() => {
            if (score > 50) {

                meassages[1].innerHTML = "You Win";
                gameimage.src = "images/win.jpg";
            } else {
                meassages[1].innerHTML = "You Lose";
                gameimage.src = "images/lose.jfif";
            }
            console.log(playagain[1]);
            playagain[1].style.display = "block";

            meassages[2].innerHTML = "Your Score is : " + score;
            localStorage.setItem("lastScore", score);

            //localStorage.setItem("lastScore", score);
        }, 60000);

    }
    gameBtn[0].addEventListener("click", function() {
        begingame();


    })
    gameBtn[1].addEventListener("click", () => {
        playagain[1].style.display = "none";
        begingame();
        numofKilledbirds = 0;
        score = 0;
        Data[2].innerHTML = "score" + score;
        Data[5].innerHTML = "Birds killed" + numofKilledbirds;

    });

    /////timer function
    function startTimer() {

        let duration = 60;
        let timer = setInterval(function() {


            duration--;
            if (duration == 0) {
                clearInterval(timer);
            }
            Data[4].innerHTML = "Time left " + duration;
        }, 1000)
    };
    //////// create bird
    class Bird {
        constructor(top, src) {
            this.src = src;
            this.top = top;
            this.left = 0;
        }
        createbird() {
            let birdImg = document.createElement("img");
            birdImg.style.width = "100px"
            birdImg.style.height = "150px"
            birdImg.src = this.src;
            birdImg.style.top = this.top;
            birdImg.style.left = 0;
            birdImg.style.position = "absolute";
            birds.push(birdImg);
            return birdImg;
        }

        moveRight(birdImg) {
            let left = 0;
            let moveid = setInterval(function() {
                    if (left < window.innerWidth - birdImg.width) {
                        left += 15;
                        birdImg.style.left = left + "px";
                    } else {
                        clearInterval(moveid);
                        birdImg.remove();
                    }
                },
                100);
            return birdImg;
        }
    }

    function movingbird() {
        let bird = new Bird(Math.random() * (innerHeight - 150) + "px", images[parseInt((Math.random()) * images.length)]);

        let birdImg = document.querySelector(".img");
        let bird1 = bird.createbird();
        let bird2 = bird.moveRight(bird1);

        birdImg.append(bird2);

    }

    /////////create the bomb
    class Bomb {
        constructor(left) {
            this.left = left;
            this.top = 0;
            this.src = "images/5.jfif";
        }
        createbomb() {
            let bombImg = document.createElement("img");
            bombImg.style.width = "100px"
            bombImg.style.height = "100px"
            bombImg.src = "images/5.jfif";
            bombImg.style.top = 0;
            bombImg.style.left = this.left;
            bombImg.style.position = "absolute";
            return bombImg;
        }
        falldown(bombImg) {
            let top = 0;
            let moveid = setInterval(function() {
                    if (top < window.innerHeight - bombImg.height) {
                        top += 5;

                        bombImg.style.top = top + "px";
                    } else {
                        clearInterval(moveid);
                        bombImg.remove();
                    }
                },
                100);
            return bombImg;
        }
    }

    function fallDown() {
        let bomb = new Bomb(Math.random() * (innerWidth - 100) + "px");

        let bombImg = document.querySelector(".img");
        let bomb1 = bomb.createbomb();
        let bomb2 = bomb.falldown(bomb1);

        bombImg.append(bomb2);
        bomb2.addEventListener("click", function() {
            this.src = "images/R.png";
            this.style.width = "200px ";
            this.style.height = "300px";
            let bombLeft = +this.style.left.replace("px", "");
            let bombTop = +this.style.top.replace("px", "");
            let bombWidth = this.width;
            let bombHeight = this.height;
            birds.forEach(function(bird) {
                let birdLeft = +bird.style.left.replace("px", "");
                let birdTop = +bird.style.top.replace("px", "");
                let birdWidth = bird.width;
                let birdHeight = bird.height;
                if (birdLeft + birdWidth >= bombLeft &&
                    birdLeft <= bombLeft + bombWidth * 2 &&
                    birdTop + birdHeight >= bombTop &&
                    birdTop <= bombTop + bombHeight * 2) {
                    kills.push(bird);

                    bird.remove();
                }

            });

            kills.forEach(function(killedbird) {
                console.log(killedbird.src);
                if (killedbird.src == "file:///C:/Users/ADMIN/Desktop/javascript%20project/images/bird2.gif")
                    score += 10;
                else if (killedbird.src == "file:///C:/Users/ADMIN/Desktop/javascript%20project/images/bird1.gif")
                    score -= 10;
                else if (killedbird.src == "file:///C:/Users/ADMIN/Desktop/javascript%20project/images/bird3.gif")
                    score += 5;

            });
            numofKilledbirds += kills.length;
            Data[2].innerHTML = "score" + score;
            Data[5].innerHTML = "Birds killed" + numofKilledbirds;
            kills.length = 0;

        })
    }
})