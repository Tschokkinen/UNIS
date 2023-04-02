const hrvChart = document.getElementById("hrvChart");
const bpChart = document.getElementById("yellow_img_mood");
const sleepMoodChart = document.getElementById("green2_img_mood");
const commentsChart = document.getElementById("green1_img_mood");

function openHRVpopup() {
    hrvChart.style.display = "block";
}

function openBPpopup() {
    bpChart.style.display = "block";
}

function openSleepMoodpopup() {
    sleepMoodChart.style.display = "block";
}

function openCommentspopup() {
    commentsChart.style.display = "block";
}

function closeForm() {
    hrvChart.style.display = "none";
    bpChart.style.display = "none";
    sleepMoodChart.style.display = "none";
    commentsChart.style.display = "none";
}