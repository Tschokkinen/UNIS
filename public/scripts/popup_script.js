
const sleepForm = document.getElementById("sleepMeterForm");
const moodForm = document.getElementById("moodMeterForm");
const bloodpressureForm = document.getElementById("bloodpressureForm");
const sendMsgToPro = document.getElementById("messageToProForm");
const sendMsgToSupport = document.getElementById("messageSupportForm");
const changeUserInfo = document.getElementById("changeUserInfoForm");

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

const body = document.body;
const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');

function openFormSleep() {
    sleepForm.style.display = "block";
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}`;
}

function openFormMood() {
    moodForm.style.display = "block";
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}`;
}

function openFormBP() {
    bloodpressureForm.style.display = "block";
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}`;
}

function openFormSendMsgToPro() {
    sendMsgToPro.style.display = "block";
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}`;
}

function openFormSendMsgSupport() {
    sendMsgToSupport.style.display = "block";
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}`;
}

function openFormChangeUserInfo() {
    changeUserInfo.style.display = "block";
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}`;
}

function closeForm() {
    sleepForm.style.display = "none";
    moodForm.style.display = "none";
    bloodpressureForm.style.display = "none";
    sendMsgToSupport.style.display = "none";
    sendMsgToPro.style.display = "none";
    sendMsgToSupport.style.display = "none";
    changeUserInfo.style.display = "none";

    body.style.position = 'initial';
    body.style.overflow = 'auto';
    body.style.paddingRight = '0 !important';
}

function redMarkSleep() {
    redSmiley_sleep.style.border = "4px dotted black";
    redSmiley_sleep.style.borderRadius = "20px";
    orangeSmiley_sleep.style.border = "4px dotted white";
    yellowSmiley_sleep.style.border = "4px dotted white";
    green2Smiley_sleep.style.border = "4px dotted white";
    green1Smiley_sleep.style.border = "4px dotted white";
}

function orangeMarkSleep() {
    redSmiley_sleep.style.border = "4px dotted white";
    orangeSmiley_sleep.style.border = "4px dotted black";
    orangeSmiley_sleep.style.borderRadius = "20px";
    yellowSmiley_sleep.style.border = "4px dotted white";
    green2Smiley_sleep.style.border = "4px dotted white";
    green1Smiley_sleep.style.border = "4px dotted white";
}

function yellowMarkSleep() {
    redSmiley_sleep.style.border = "4px dotted white";
    orangeSmiley_sleep.style.border = "4px dotted white";
    yellowSmiley_sleep.style.border = "4px dotted black";
    yellowSmiley_sleep.style.borderRadius = "20px";
    green2Smiley_sleep.style.border = "4px dotted white";
    green1Smiley_sleep.style.border = "4px dotted white";
}

function green2MarkSleep() {
    redSmiley_sleep.style.border = "4px dotted white";
    orangeSmiley_sleep.style.border = "4px dotted white";
    yellowSmiley_sleep.style.border = "4px dotted white";
    green2Smiley_sleep.style.border = "4px dotted black";
    green2Smiley_sleep.style.borderRadius = "20px";
    green1Smiley_sleep.style.border = "4px dotted white";
}

function green1MarkSleep() {
    redSmiley_sleep.style.border = "4px dotted white";
    orangeSmiley_sleep.style.border = "4px dotted white";
    yellowSmiley_sleep.style.border = "4px dotted white";
    green2Smiley_sleep.style.border = "4px dotted white";
    green1Smiley_sleep.style.border = "4px dotted black";
    green1Smiley_sleep.style.borderRadius = "20px";
}

function redMarkMood() {
    redSmiley_mood.style.border = "4px dotted black";
    redSmiley_mood.style.borderRadius = "20px";
    orangeSmiley_mood.style.border = "4px dotted white";
    yellowSmiley_mood.style.border = "4px dotted white";
    green2Smiley_mood.style.border = "4px dotted white";
    green1Smiley_mood.style.border = "4px dotted white";
}

function orangeMarkMood() {
    redSmiley_mood.style.border = "4px dotted white";
    orangeSmiley_mood.style.border = "4px dotted black";
    orangeSmiley_mood.style.borderRadius = "20px";
    yellowSmiley_mood.style.border = "4px dotted white";
    green2Smiley_mood.style.border = "4px dotted white";
    green1Smiley_mood.style.border = "4px dotted white";
}

function yellowMarkMood() {
    redSmiley_mood.style.border = "4px dotted white";
    orangeSmiley_mood.style.border = "4px dotted white";
    yellowSmiley_mood.style.border = "4px dotted black";
    yellowSmiley_mood.style.borderRadius = "20px";
    green2Smiley_mood.style.border = "4px dotted white";
    green1Smiley_mood.style.border = "4px dotted white";
}

function green2MarkMood() {
    redSmiley_mood.style.border = "4px dotted white";
    orangeSmiley_mood.style.border = "4px dotted white";
    yellowSmiley_mood.style.border = "4px dotted white";
    green2Smiley_mood.style.border = "4px dotted black";
    green2Smiley_mood.style.borderRadius = "20px";
    green1Smiley_mood.style.border = "4px dotted white";
}

function green1MarkMood() {
    redSmiley_mood.style.border = "4px dotted white";
    orangeSmiley_mood.style.border = "4px dotted white";
    yellowSmiley_mood.style.border = "4px dotted white";
    green2Smiley_mood.style.border = "4px dotted white";
    green1Smiley_mood.style.border = "4px dotted black";
    green1Smiley_mood.style.borderRadius = "20px";
}