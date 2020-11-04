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
		text: "Your Charging History"
	},
	data: [{        
		type: "line",
      	indexLabelFontSize: 16,
		dataPoints: [
			{ y: 45 },
			{ y: 41},
			{ y: 52, indexLabel: "\u2191 highest",markerColor: "red", markerType: "triangle" },
			{ y: 46 },
			{ y: 45 },
			{ y: 50 },
			{ y: 48 },
			{ y: 48 },
			{ y: 41 , indexLabel: "\u2193 lowest",markerColor: "DarkSlateGrey", markerType: "cross" },
			{ y: 50 },
			{ y: 48 },
			{ y: 51 }
		]
	}]
});
chart.render();
}
