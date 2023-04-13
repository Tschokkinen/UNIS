const sleepMeterLight = document.getElementById('sleep_meter_light');
const moodMeterLight = document.getElementById('mood_meter_light');
const bloodpressureMeterLight = document.getElementById('bloodpressure_meter_light');

const setMeterLights = async () => {
    const response = await fetch ('/main/meterValues');
    const data = await response.json();
    console.log("Data: ", data);

    if (data.sleep === true) {
        sleepMeterLight.title = "You have saved results for today."
        sleepMeterLight.src = "assets/img/green_light.png"
        sleepMeterLight.alt = "Sleep meter. Green light. Measured today."
    } else {
        sleepMeterLight.title = "No saved results for today."
        sleepMeterLight.src = "assets/img/red_light.png"
        sleepMeterLight.alt = "Sleep meter. Red light. Not measured today."
    }

    if (data.mood === true) {
        moodMeterLight.title = "You have saved results for today."
        moodMeterLight.src = "assets/img/green_light.png"
        moodMeterLight.alt = "Mood meter. Green light. Measured today."
    } else {
        moodMeterLight.title = "No saved results for today."
        moodMeterLight.src = "assets/img/red_light.png"
        moodMeterLight.alt = "Mood meter. Red light. Not measured today."
    }

    if (data.bloodpressure === true) {
        bloodpressureMeterLight.title = "You have saved results for today."
        bloodpressureMeterLight.src = "assets/img/green_light.png"
        bloodpressureMeterLight.alt = "Bloodpressure. Green light. Measured today."
    } else {
        bloodpressureMeterLight.title = "No saved results for today."
        bloodpressureMeterLight.src = "assets/img/red_light.png"
        bloodpressureMeterLight.alt = "Bloodpressure. Red light. Not measured today."
    }
};

setMeterLights();