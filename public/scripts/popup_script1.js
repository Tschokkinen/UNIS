const redSmiley = document.getElementById("red_img");
const orangeSmiley = document.getElementById("orange_img");
const yellowSmiley = document.getElementById("yellow_img");
const green2Smiley = document.getElementById("green2_img");
const green1Smiley = document.getElementById("green1_img");

function openForm() {
    document.getElementById("sleepMeterForm").style.display = "block";
}

function closeForm() {
    document.getElementById("sleepMeterForm").style.display = "none";
}

function redMark() {
    redSmiley.style.border = "4px dotted black";
    redSmiley.style.borderRadius = "20px";
    orangeSmiley.style.border = "none";
    yellowSmiley.style.border = "none";
    green2Smiley.style.border = "none";
    green1Smiley.style.border = "none";
}

function orangeMark() {
    redSmiley.style.border = "none";
    orangeSmiley.style.border = "4px dotted black";
    orangeSmiley.style.borderRadius = "20px";
    yellowSmiley.style.border = "none";
    green2Smiley.style.border = "none";
    green1Smiley.style.border = "none";
}

function yellowMark() {
    redSmiley.style.border = "none";
    orangeSmiley.style.border = "none";
    yellowSmiley.style.border = "4px dotted black";
    yellowSmiley.style.borderRadius = "20px";
    green2Smiley.style.border = "none";
    green1Smiley.style.border = "none";
}

function green2Mark() {
    redSmiley.style.border = "none";
    orangeSmiley.style.border = "none";
    yellowSmiley.style.border = "none";
    green2Smiley.style.border = "4px dotted black";
    green2Smiley.style.borderRadius = "20px";
    green1Smiley.style.border = "none";
}

function green1Mark() {
    redSmiley.style.border = "none";
    orangeSmiley.style.border = "none";
    yellowSmiley.style.border = "none";
    green2Smiley.style.border = "none";
    green1Smiley.style.border = "4px dotted black";
    green1Smiley.style.borderRadius = "20px";
}