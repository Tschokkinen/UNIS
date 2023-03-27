// https://www.amcharts.com/demos/comparing-different-date-values-google-analytics-style/

am5.ready(function () {

    // Defining async function
    const getapi = async () => {

        // Storing response
        const response1 = await fetch('/charts/data/getSleepData');
        const response2 = await fetch('/charts/data/getMoodData');

        // Storing data in form of JSON
        const responseSleepData = await response1.json();
        const responseMoodData = await response2.json();
        // console.log("testData", testData);
        // show(data);

        const sleepData = []
        for (var i = 0; i < responseSleepData.length; i++) {
            const newData = {
                value1: responseSleepData[i].sleepQuality,
                date: new Date(responseSleepData[i].date).getTime(),
            }
            sleepData.push(newData);
        }

        const moodData = []
        for (var i = 0; i < responseMoodData.length; i++) {
            const newData = {
                value2: responseMoodData[i].moodQuality,
                date: new Date(responseMoodData[i].date).getTime(),
            }
            moodData.push(newData);
        }

        generate(sleepData, moodData);
    };

    getapi();

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("chartdiv");


    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
        am5themes_Animated.new(root)
    ]);


    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true
    }));

    chart.get("colors").set("step", 3);


    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    // var date = new Date();
    // date.setHours(0, 0, 0, 0);
    // var value = 100;

    // function generateData(value) {
    //     // value = Math.round((Math.random() * 10 - 5) + value);
    //     am5.time.add(date, "day", 1);
    //     return {
    //         date: date.getTime(),
    //         value: value
    //     };
    // }

    // function generateDatas(testData) {
    //     var data = [];
    //     // for (var i = 0; i < count; ++i) {
    //     //     data.push(generateData());
    //     // }
    //     // console.log("generateDatas tata[0] ", testData[0]);
    //     for (var i = 0; i < testData.length; i++) {
    //         data.push(generateData(testData[i]));
    //     }
    //     // data.push(generateData(testData[0]));
    //     return data;
    // }


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
        maxDeviation: 0.3,
        baseInterval: {
            timeUnit: "day",
            count: 1
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
    }));

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {})
    }));


    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(am5xy.LineSeries.new(root,
        {
            name: "Series 1",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value1",
            valueXField: "date",
            tooltip: am5.Tooltip.new(root, {
                labelText: "{valueX}: {valueY}"
            })
        }));

    series.strokes.template.setAll({ strokeWidth: 2 })


    series.get("tooltip").get("background").set("fillOpacity", 0.5);

    var series2 = chart.series.push(am5xy.LineSeries.new(root, {
        name: "Series 2",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value2",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
            labelText: "{valueX}: {value2}"
        })
    }));
    series2.strokes.template.setAll({
        strokeDasharray: [2, 2],
        strokeWidth: 2
    });

    // Set date fields
    // https://www.amcharts.com/docs/v5/concepts/data/#Parsing_dates
    root.dateFormatter.setAll({
        dateFormat: "yyyy-MM-dd",
        dateFields: ["valueX"]
    });

    // Set data
    // var data = [{
    //     date: new Date(2019, 5, 12).getTime(),
    //     value1: 50,
    //     value2: 48,
    //     previousDate: new Date(2019, 5, 5)
    // }, {
    //     date: new Date(2019, 5, 13).getTime(),
    //     value1: 53,
    //     value2: 51,
    //     previousDate: "2019-05-06"
    // }, {
    //     date: new Date(2019, 5, 14).getTime(),
    //     value1: 56,
    //     value2: 58,
    //     previousDate: "2019-05-07"
    // }, {
    //     date: new Date(2019, 5, 15).getTime(),
    //     value1: 52,
    //     value2: 53,
    //     previousDate: "2019-05-08"
    // }, {
    //     date: new Date(2019, 5, 16).getTime(),
    //     value1: 48,
    //     value2: 44,
    //     previousDate: "2019-05-09"
    // }, {
    //     date: new Date(2019, 5, 17).getTime(),
    //     value1: 47,
    //     value2: 42,
    //     previousDate: "2019-05-10"
    // }, {
    //     date: new Date(2019, 5, 18).getTime(),
    //     value1: 59,
    //     value2: 55,
    //     previousDate: "2019-05-11"
    // }]

    // series.data.setAll(data);
    // series2.data.setAll(data);


    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    series2.appear(1000);
    chart.appear(1000, 100);


    function generate(sleepData, moodData) {
        // var data = generateDatas(50);
        // var data = generateDatas(testData);
        // series.data.setAll(data);
        series.data.setAll(sleepData);
        series2.data.setAll(moodData);
    }

}); // end am5.ready()