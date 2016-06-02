angular.module("demo").controller("SprintBurndown", function($scope) {
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
			categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6',
			'Day 7', 'Day 8', 'Day 9', 'Day 10', 'Day 11', 
			'Day 12', 'Day 13', 'Day 14', 'Day 15', 'Day 16']
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
			data: [120, 112, 104, 96, 88, 80, 72, 64, 56, 48, 40, 32, 24, 16, 8, 0],
			dashStyle: 'longdash'
		}, {
			name: 'Atual',
			color: 'rgba(0,120,200,0.75)',
			marker: {
				radius: 6
			},
			data: [120, 115, 110, 93, 105, 100, 90, 80, 60, 60, 30, 32, 23, 15, 10, 5]
		}]
	});
});
