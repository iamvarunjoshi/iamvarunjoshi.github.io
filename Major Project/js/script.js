/* navbar toggle*/
$(function () { 
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });
  $("#navbarToggle").click(function (event) {
    $(event.target).focus();
  });
});           

	    var i = 0 , prec;
            var degs = $("#prec").attr("class").split(' ')[1];
            var activeBorder = $("#activeBorder");

            setTimeout(function(){
                if($("#circle").is(":hover"))
                   loopit("c");
                else
                   loopit("nc");
            },1);

            function loopit(dir){
                if (dir == "c")
                    i++
                else
                    i--;
                if (i < 0)
                    i = 0;
                if (i > degs)
                    i = degs;
                prec = (100*i)/360;   
                $(".prec").html(Math.round(prec)+"%");

                if (i<=180){
                    activeBorder.css('background-image','linear-gradient(' + (90+i) + 'deg, transparent 50%, #A2ECFB 50%),linear-gradient(90deg, #A2ECFB 50%, transparent 50%)');
                }
                else{
                    activeBorder.css('background-image','linear-gradient(' + (i-90) + 'deg, transparent 50%, #39B4CC 50%),linear-gradient(90deg, #A2ECFB 50%, transparent 50%)');
                }

                setTimeout(function(){
                    if($("#circle").is(":hover"))
                        loopit("c");
                    else
                       loopit("nc");
                },1);
            }


/*Chart*/
window.onload = function () {

var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	theme: "light2",
	title:{
		text: "Power Consumption"
	},
	data: [{        
		type: "line",
      	indexLabelFontSize: 16,
		name: "Power Consumption",
		showInLegend: true,
		yValueFormatString: "#W",
		dataPoints: [
			{ x: new Date(2020, 0),y: 450 },
			{ x: new Date(2020, 1),y: 410},
			{ x: new Date(2020, 2),y: 520, indexLabel: "\u2191 highest",markerColor: "red", markerType: "triangle" },
			{ x: new Date(2020, 3),y: 460 },
			{ x: new Date(2020, 4),y: 450 },
			{ x: new Date(2020, 5),y: 500 },
			{ x: new Date(2020, 6),y: 480 },
			{ x: new Date(2020, 7),y: 480 },
			{ x: new Date(2020, 8),y: 410 , indexLabel: "\u2193 lowest",markerColor: "DarkSlateGrey", markerType: "cross" },
			{ x: new Date(2020, 9),y: 500 },
			{ x: new Date(2020, 10),y: 408 },
			{ x: new Date(2020, 11),y: 510 }
		]
	}]
});

/*Old Chart2 showing monthly sales.*/    
var chart1 = new CanvasJS.Chart("chartContainer2", {
	animationEnabled: true,
	theme: "light2",
	title: {
		text: "Past Savings"
	},
	axisX: {
		valueFormatString: "MMM"
	},
	axisY: {
		prefix: "$",
		labelFormatter: addSymbols
	},
	toolTip: {
		shared: true
	},
	legend: {
		cursor: "pointer",
		itemclick: toggleDataSeries
	},
	data: [
	{
		type: "column",
		name: "Actual Savings",
		showInLegend: true,
		xValueFormatString: "MMMM YYYY",
		yValueFormatString: "$#,##0",
		dataPoints: [
			{ x: new Date(2020, 0), y: 20000 },
			{ x: new Date(2020, 1), y: 30000 },
			{ x: new Date(2020, 2), y: 25000 },
			{ x: new Date(2020, 3), y: 70000, indexLabel: "High Renewals" },
			{ x: new Date(2020, 4), y: 50000 },
			{ x: new Date(2020, 5), y: 35000 },
			{ x: new Date(2020, 6), y: 30000 },
			{ x: new Date(2020, 7), y: 43000 },
			{ x: new Date(2020, 8), y: 35000 },
			{ x: new Date(2020, 9), y:  30000},
			{ x: new Date(2020, 10), y: 40000 },
			{ x: new Date(2020, 11), y: 50000 }
		]
	}, 
	{
		type: "line",
		name: "Expected Savings",
		showInLegend: true,
		yValueFormatString: "$#,##0",
		dataPoints: [
			{ x: new Date(2020, 0), y: 40000 },
			{ x: new Date(2020, 1), y: 42000 },
			{ x: new Date(2020, 2), y: 45000 },
			{ x: new Date(2020, 3), y: 45000 },
			{ x: new Date(2020, 4), y: 47000 },
			{ x: new Date(2020, 5), y: 43000 },
			{ x: new Date(2020, 6), y: 42000 },
			{ x: new Date(2020, 7), y: 43000 },
			{ x: new Date(2020, 8), y: 41000 },
			{ x: new Date(2020, 9), y: 45000 },
			{ x: new Date(2020, 10), y: 42000 },
			{ x: new Date(2020, 11), y: 50000 }
		]
	}]
});
chart.render();    
chart1.render();

function addSymbols(e) {
	var suffixes = ["", "K", "M", "B"];
	var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);

	if(order > suffixes.length - 1)                	
		order = suffixes.length - 1;

	var suffix = suffixes[order];      
	return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
}

function toggleDataSeries(e) {
	if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	} else {
		e.dataSeries.visible = true;
	}
	e.chart1.render();
}    
}
