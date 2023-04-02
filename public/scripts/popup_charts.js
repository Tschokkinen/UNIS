const hrvForm = document.getElementById("orange_img_mood");
const bpForm = document.getElementById("yellow_img_mood");
const sleepMoodForm = document.getElementById("green2_img_mood");
const commentsForm = document.getElementById("green1_img_mood");

function openHRVpopup() {
    hrvForm.style.display = "block";
}

function openBPpopup() {
    bpForm.style.display = "block";
}

function openSleepMoodpopup() {
    sleepMoodForm.style.display = "block";
}

function openCommentspopup() {
    commentsForm.style.display = "block";
}

function closeForm() {
    hrvForm.style.display = "none";
    bpForm.style.display = "none";
    sleepMoodForm.style.display = "none";
    commentsForm.style.display = "none";
}