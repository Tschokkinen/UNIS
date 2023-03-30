// https://www.amcharts.com/demos/comparing-different-date-values-google-analytics-style/

am5.ready(function () {

    // Fetch data from database
    const fetchData = async () => {
        // Bloodpressure data
        const response_bloodpressureData = await fetch('/charts/data/getBloodpressureData');
        const jsonBloodpressureData = await response_bloodpressureData.json();

        // console.log("jsonBloodpressureData", jsonBloodpressureData);
        const bloodpressureData = [];
        for (var i = 0; i < jsonBloodpressureData.length; i++) {
            const newData = {
                value1: jsonBloodpressureData[i].systolicPressure,
                value2: jsonBloodpressureData[i].diastolicPressure,
                comments: jsonBloodpressureData[i].comments,
                date: new Date(jsonBloodpressureData[i].date).getTime()
            }
            bloodpressureData.push(newData);
        }

        console.log("bloodpressureData: ", bloodpressureData);

        // Send data to Bloodpressure chart
        generateData(bloodpressureData);
    };

    fetchData();


    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    const root = am5.Root.new("chartdiv2");

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
                labelText: "Date: {valueX}\nSystolic pressure: {valueY}\nComments: {comments}"
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
            labelText: "Date: {valueX}\nDiastolic pressure: {value2}\nComments: {comments}"
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


    function generateData(bloodpressureData) {
        // var data = generateDatas(50);
        // var data = generateDatas(testData);
        // series.data.setAll(data);
        series.data.setAll(bloodpressureData); // Systolic
        series2.data.setAll(bloodpressureData); // Diastolic
    }
}); // end am5.ready()
