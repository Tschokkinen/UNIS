
const sleepForm = document.getElementById("sleepMeterForm");
const moodForm = document.getElementById("moodMeterForm");
const bloodpressureForm = document.getElementById("bloodpressureForm");

const redSmiley_sleep = document.getElementById("red_img_sleep");
const orangeSmiley_sleep = document.getElementById("orange_img_sleep");
const yellowSmiley_sleep = document.getElementById("yellow_img_sleep");
const green2Smiley_sleep = document.getElementById("green2_img_sleep");
const green1Smiley_sleep = document.getElementById("green1_img_sleep");

const redSmiley_mood = document.getElementById("red_img_mood");
const orangeSmiley_mood = document.getElementById("orange_img_mood");
const yellowSmiley_mood = document.getElementById("yellow_img_mood");
const green2Smiley_mood = document.getElementById("green2_img_mood");
const green1Smiley_mood = document.getElementById("green1_img_mood");

function openFormSleep() {
    sleepForm.style.display = "block";
}

function openFormMood() {
    moodForm.style.display = "block";
}

function openFormBP() {
    bloodpressureForm.style.display = "block";
}

function closeForm() {
    sleepForm.style.display = "none";
    moodForm.style.display = "none";
    bloodpressureForm.style.display = "none";
}

function redMarkSleep() {
    redSmiley_sleep.style.border = "4px dotted black";
    redSmiley_sleep.style.borderRadius = "20px";
    orangeSmiley_sleep.style.border = "none";
    yellowSmiley_sleep.style.border = "none";
    green2Smiley_sleep.style.border = "none";
    green1Smiley_sleep.style.border = "none";
}

function orangeMarkSleep() {
    redSmiley_sleep.style.border = "none";
    orangeSmiley_sleep.style.border = "4px dotted black";
    orangeSmiley_sleep.style.borderRadius = "20px";
    yellowSmiley_sleep.style.border = "none";
    green2Smiley_sleep.style.border = "none";
    green1Smiley_sleep.style.border = "none";
}

function yellowMarkSleep() {
    redSmiley_sleep.style.border = "none";
    orangeSmiley_sleep.style.border = "none";
    yellowSmiley_sleep.style.border = "4px dotted black";
    yellowSmiley_sleep.style.borderRadius = "20px";
    green2Smiley_sleep.style.border = "none";
    green1Smiley_sleep.style.border = "none";
}

function green2MarkSleep() {
    redSmiley_sleep.style.border = "none";
    orangeSmiley_sleep.style.border = "none";
    yellowSmiley_sleep.style.border = "none";
    green2Smiley_sleep.style.border = "4px dotted black";
    green2Smiley_sleep.style.borderRadius = "20px";
    green1Smiley_sleep.style.border = "none";
}

function green1MarkSleep() {
    redSmiley_sleep.style.border = "none";
    orangeSmiley_sleep.style.border = "none";
    yellowSmiley_sleep.style.border = "none";
    green2Smiley_sleep.style.border = "none";
    green1Smiley_sleep.style.border = "4px dotted black";
    green1Smiley_sleep.style.borderRadius = "20px";
}

function redMarkMood() {
    redSmiley_mood.style.border = "4px dotted black";
    redSmiley_mood.style.borderRadius = "20px";
    orangeSmiley_mood.style.border = "none";
    yellowSmiley_mood.style.border = "none";
    green2Smiley_mood.style.border = "none";
    green1Smiley_mood.style.border = "none";
}

function orangeMarkMood() {
    redSmiley_mood.style.border = "none";
    orangeSmiley_mood.style.border = "4px dotted black";
    orangeSmiley_mood.style.borderRadius = "20px";
    yellowSmiley_mood.style.border = "none";
    green2Smiley_mood.style.border = "none";
    green1Smiley_mood.style.border = "none";
}

function yellowMarkMood() {
    redSmiley_mood.style.border = "none";
    orangeSmiley_mood.style.border = "none";
    yellowSmiley_mood.style.border = "4px dotted black";
    yellowSmiley_mood.style.borderRadius = "20px";
    green2Smiley_mood.style.border = "none";
    green1Smiley_mood.style.border = "none";
}

function green2MarkMood() {
    redSmiley_mood.style.border = "none";
    orangeSmiley_mood.style.border = "none";
    yellowSmiley_mood.style.border = "none";
    green2Smiley_mood.style.border = "4px dotted black";
    green2Smiley_mood.style.borderRadius = "20px";
    green1Smiley_mood.style.border = "none";
}

function green1MarkMood() {
    redSmiley_mood.style.border = "none";
    orangeSmiley_mood.style.border = "none";
    yellowSmiley_mood.style.border = "none";
    green2Smiley_mood.style.border = "none";
    green1Smiley_mood.style.border = "4px dotted black";
    green1Smiley_mood.style.borderRadius = "20px";
}