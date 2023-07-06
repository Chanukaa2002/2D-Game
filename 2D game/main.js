//-------------||Idle Animation||-------------------------//
var boy = document.getElementById("boy");
var idleImageNumber = 1;
var idleAnimationNumber = 0;

function idleAnimation() {
    idleImageNumber = idleImageNumber + 1;
    if (idleImageNumber == 11) {
        idleImageNumber = 1;
    }
    boy.src = `sourses/idle (${idleImageNumber}).png`;
}

function idleAnimationStart() {
    idleAnimationNumber = setInterval(idleAnimation, 70);
}

//-------------||Run Animation||-------------------------//
var runImageNumber = 1;
var runAnimationNumber = 0;

function runAnimation() {
    runImageNumber += 1;
    if (runImageNumber == 11) {
        runImageNumber = 1;
    }
    boy.src = `sourses/run (${runImageNumber}).png`;
}

function runAnimationStart() {
    runAnimationNumber = setInterval(runAnimation, 70);
    clearInterval(idleAnimationNumber);
}

function keyCheck(event) {
    var keyCode = event.which;

    //--------------------------||what happens when hitting the enter button||--------------------------------//
    if (keyCode == 13) {
        if (runAnimationNumber == 0) {
            runAnimationStart();
        }
        if (moveBackgroundAnimationId == 0) {
            moveBackgroundAnimationId = setInterval(moveBackground, 50);
        }
        if (boxAnimationId == 0) {
            boxAnimationId = setInterval(boxAnimation, 100);
        }
    }

    //--------------------------||what happens when hitting the space button||--------------------------------//
    if (keyCode == 32) {
        if (jumpAnimationNumber == 0) {
            jumpAnimationStart();
        }
        if (moveBackgroundAnimationId == 0) {
            moveBackgroundAnimationId = setInterval(moveBackground, 50);
        }
    }

    if (boxAnimationId == 0) {
        boxAnimationId = setInterval(boxAnimation, 80);
    }
}

//--------------------------||Background Move Animation||--------------------------------//
var backgroundPositionX = 0;
var moveBackgroundAnimationId = 0;
var score = 0

function moveBackground() {
    backgroundPositionX -= 20;
    document.getElementById("background").style.backgroundPositionX = backgroundPositionX + "px";

    score += 1
    document.getElementById("score").innerHTML = score;
}

//--------------------------||Jump Animation||--------------------------------//
jumpAnimationNumber = 0;
jumpImageNumber = 0;
boyMarginTop = 490;

function jumpAnimation() {
    jumpImageNumber += 1;

    if (jumpImageNumber <= 6) {
        boyMarginTop -= 50;
        boy.style.marginTop = boyMarginTop + "px";
    }

    if (jumpImageNumber >= 7) {
        boyMarginTop += 65;
        boy.style.marginTop = boyMarginTop + "px";
    }

    boy.src = `sourses/jump (${jumpImageNumber}).png`;

    if (jumpImageNumber == 10) {
        jumpImageNumber = 1;
        clearInterval(jumpAnimationNumber);
        jumpAnimationNumber = 0;
        runImageNumber = 1;
        runAnimationStart();
    }
}

function jumpAnimationStart() {
    clearInterval(idleAnimationNumber);
    runImageNumber = 1;
    clearInterval(runAnimationNumber);
    jumpAnimationNumber = setInterval(jumpAnimation, 110);
}

//--------------------------||Road Blocks||--------------------------------//
var boxMarginLeft = 1940;

function createBoxes() {
    for (var i = 0; i <= 1000; i++) {
        var box = document.createElement("div");
        box.className = "box";
        document.getElementById("background").appendChild(box);
        box.style.marginLeft = boxMarginLeft + "px";
        box.id = "box" + i;

        if (i < 5) {
            boxMarginLeft += 1000;
        }
        if (i >= 5) {
            boxMarginLeft += 650;
        }
    }
}
//--------------------------------||boy dead animation||-----------------------------//
var boxAnimationId = 0;

function boxAnimation() {
    for (var i = 0; i < 1000; i++) {
        var box = document.getElementById("box" + i);
        var currentMarginLeft = getComputedStyle(box).marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 35;
        box.style.marginLeft = newMarginLeft + "px";

        if (newMarginLeft >= -110 && newMarginLeft <= 100) {
            if (boyMarginTop >= 400) { // Adjust the height of the barrier here//
                clearInterval(boxAnimationId);
                clearInterval(runAnimationNumber);
                runAnimationNumber = -1;
                clearInterval(jumpAnimationNumber);
                jumpAnimationNumber = -1;
                clearInterval(moveBackgroundAnimationId);
                moveBackgroundAnimationId = -1;
                deadAnimationNumber = setInterval(boyDeadAnimation, 100)
            }
        }
    }
}

deadImageNumber = 1
deadAnimationNumber = 0
function boyDeadAnimation() {
    deadImageNumber = deadImageNumber + 1;

    boy.src = `sourses/Dead (${deadImageNumber}).png`;

    if (deadImageNumber == 10) {
        deadImageNumber = 9;
        document.getElementById("end").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = score;
    }

}
//-------------start----------//

function startGame() {
    document.getElementById("start").style.visibility = "hidden";
}
//-------------try again----------//

function reload() {
    location.reload();
}


