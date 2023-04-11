const sleepMeterLight = document.getElementById('sleep_meter_light');
const moodMeterLight = document.getElementById('mood_meter_light');
const bloodpressureMeterLight = document.getElementById('bloodpressure_meter_light');

const setMeterLights = async () => {
    const response = await fetch ('/main/meterValues');
    const data = await response.json();
    console.log("Data: ", data);

    if (data.sleep === true) {
        sleepMeterLight.src = "assets/img/green_light.png"
    } else {
        sleepMeterLight.src = "assets/img/red_light.png"
    }

    if (data.mood === true) {
        moodMeterLight.src = "assets/img/green_light.png"
    } else {
        moodMeterLight.src = "assets/img/red_light.png"
    }

    if (data.bloodpressure === true) {
        bloodpressureMeterLight.src = "assets/img/green_light.png"
    } else {
        bloodpressureMeterLight.src = "assets/img/red_light.png"
    }
};

setMeterLights();