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

        const sleepData = []
        for (var i = 0; i < responseSleepData.length; i++) {
            const newData = {
                value1: responseSleepData[i].sleepQuality,
                date: new Date(responseSleepData[i].date).getTime(),
                comments: responseSleepData[i].comments
            }
            sleepData.push(newData);
        }

        const moodData = []
        for (var i = 0; i < responseMoodData.length; i++) {
            const newData = {
                value2: responseMoodData[i].moodQuality,
                date: new Date(responseMoodData[i].date).getTime(),
                comments: responseMoodData[i].comments
            }
            moodData.push(newData);
        }

        generate(sleepData, moodData);





        // Bloodpressure data

        const response3 = await fetch('/charts/data/getBloodpressureData');
        const responseBloodpressureData = await response3.json();


        console.log("responseBloodpressureData", responseBloodpressureData);
        const bloodpressureData = [];
        for (var i = 0; i < responseBloodpressureData.length; i++) {
            const newData = {
                value1: responseBloodpressureData[i].systolicPressure,
                value2: responseBloodpressureData[i].diastolicPressure,
                date: new Date(responseBloodpressureData[i].date).getTime()
            }
            bloodpressureData.push(newData);
        }

        console.log("bloodpressureData: ", bloodpressureData);

        generateBloodpressureData(bloodpressureData);
    };

    getapi();

    ////////////////////////////////////////////////////////////////
    // SLEEP AND MOOD CHART
    ////////////////////////////////////////////////////////////////

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    const root = am5.Root.new("chartdiv1");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
        am5themes_Animated.new(root)
    ]);


    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    const chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true
    }));

    chart.get("colors").set("step", 3);


    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
        maxDeviation: 0.3,
        baseInterval: {
            timeUnit: "day",
            count: 1
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
    }));

    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {})
    }));


    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const series = chart.series.push(am5xy.LineSeries.new(root,
        {
            name: "Series 1",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value1",
            valueXField: "date",
            tooltip: am5.Tooltip.new(root, {
                labelText: "{valueX}: {valueY}\n Comments: {comments}"
            })
        }));

    series.strokes.template.setAll({ strokeWidth: 2 })


    series.get("tooltip").get("background").set("fillOpacity", 0.5);

    const series2 = chart.series.push(am5xy.LineSeries.new(root, {
        name: "Series 2",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value2",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
            labelText: "{valueX}: {value2}\n Comments: {comments}"
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

    ////////////////////////////////////////////////////////////////
    // SLEEP AND MOOD CHART END
    ////////////////////////////////////////////////////////////////






    ////////////////////////////////////////////////////////////////
    // BLOODPRESSURE CHART
    ////////////////////////////////////////////////////////////////

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    const rootB = am5.Root.new("chartdiv2");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    rootB.setThemes([
        am5themes_Animated.new(rootB)
    ]);


    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    const chartB = rootB.container.children.push(am5xy.XYChart.new(rootB, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true
    }));

    chartB.get("colors").set("step", 3);


    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    const cursorB = chartB.set("cursor", am5xy.XYCursor.new(rootB, {}));
    cursorB.lineY.set("visible", false);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const xAxisB = chartB.xAxes.push(am5xy.DateAxis.new(rootB, {
        maxDeviation: 0.3,
        baseInterval: {
            timeUnit: "day",
            count: 1
        },
        renderer: am5xy.AxisRendererX.new(rootB, {}),
        tooltip: am5.Tooltip.new(rootB, {})
    }));

    const yAxisB = chartB.yAxes.push(am5xy.ValueAxis.new(rootB, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(rootB, {})
    }));


    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const seriesB = chartB.series.push(am5xy.LineSeries.new(rootB,
        {
            name: "Series 1",
            xAxis: xAxisB,
            yAxis: yAxisB,
            valueYField: "value1",
            valueXField: "date",
            tooltip: am5.Tooltip.new(rootB, {
                labelText: "{valueX}: {valueY}\nSystolic pressure"
            })
        }));

    seriesB.strokes.template.setAll({ strokeWidth: 2 })


    seriesB.get("tooltip").get("background").set("fillOpacity", 0.5);

    const series2B = chartB.series.push(am5xy.LineSeries.new(rootB, {
        name: "Series 2",
        xAxis: xAxisB,
        yAxis: yAxisB,
        valueYField: "value2",
        valueXField: "date",
        tooltip: am5.Tooltip.new(rootB, {
            labelText: "{valueX}: {value2}\nDiastolic pressure"
        })
    }));
    series2.strokes.template.setAll({
        strokeDasharray: [2, 2],
        strokeWidth: 2
    });

    // Set date fields
    // https://www.amcharts.com/docs/v5/concepts/data/#Parsing_dates
    rootB.dateFormatter.setAll({
        dateFormat: "yyyy-MM-dd",
        dateFields: ["valueX"]
    });


    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    seriesB.appear(1000);
    series2B.appear(1000);
    chartB.appear(1000, 100);


    function generateBloodpressureData(bloodpressureData) {
        // var data = generateDatas(50);
        // var data = generateDatas(testData);
        // series.data.setAll(data);
        seriesB.data.setAll(bloodpressureData);
        series2B.data.setAll(bloodpressureData);
    }

    ////////////////////////////////////////////////////////////////
    // BLOODPRESSURE CHART END
    ////////////////////////////////////////////////////////////////

}); // end am5.ready()