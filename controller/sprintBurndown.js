angular.module("demo").controller("SprintBurndown", function($scope, sprintBurndown) {

	sprintBurndown.get().success(function(data) {
        var dias = [];
        var horas = [];	
        var horasEsperado = [];
        var aux = 0;
        var esperadoSub = 0;
        console.log(data);
        $.each(data,function(index, value){
        	dias[index] = "Dia " + value.dia;
        	horas[index] = value.estimativa;
        	if (index === 0) {
        		horasEsperado[index] = horas[index];
        		esperadoSub = horas[index] / ( data.length - 1);
        	}else{
	        	if (data[index - 1].estimativa < horas[index]) {
	        		// horasEsperado[index] = horas[index];
	        		horasEsperado[index] = (horas[index] - horas[index - 1]) + horasEsperado[index - 1] - esperadoSub;
	        		// esperadoSub = horas[index] / ( data.length - (index + 1));
	        		esperadoSub = horasEsperado[index] / ( data.length - (index + 1));
	        	}else{
	        		horasEsperado[index] = horasEsperado[index - 1] - esperadoSub;
	        		if (horasEsperado[index] < 0 ) {
	        			horasEsperado[index] = 0;
	        		}
	        	};

        	};
        });
  //       do {
  //       	if (horasEsperado.length === 0) {
  //       		horasEsperado[0] = horas[0];
  //       		esperadoSub = horas[0] / ( dias.length - 1);
  //       	}else{
  //       		horasEsperado[aux] = horasEsperado[aux - 1] - esperadoSub;
  //       		if (horasEsperado[aux] < 0 ) {
  //       			horasEsperado[aux] = 0;
  //       		}
  //       	};  
  //       	aux += 1;   	
		// }
		// while (horasEsperado.length < dias.length);
		$('#container').highcharts({
			title: {
				text: 'Sprint Burndown',
				  x: -20 //center
			},
			colors: ['blue', 'red'],
			plotOptions: {
				line: {
					lineWidth: 3
				},
				tooltip: {
					hideDelay: 200
				}
			},
			subtitle: {
				text: 'Sprint 1',
				x: -20
			},
			xAxis: {
				categories: dias
			},
			yAxis: {
				title: {
					text: 'Horas'
				},
				plotLines: [{
					value: 0,
					width: 1
				}]
			},
			tooltip: {
				valueSuffix: ' hrs',
				crosshairs: true,
				shared: true
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle',
				borderWidth: 2
			},
			series: [{
				name: 'Ideal',
				color: 'rgba(255,0,0,0.25)',
				lineWidth: 1,
				data: horasEsperado,
				dashStyle: 'longdash'
			}, {
				name: 'Atual',
				color: 'rgba(0,120,200,0.75)',
				marker: {
					radius: 6
				},
				data: horas
			}]
		});
    });
});
