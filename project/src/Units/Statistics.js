import React from "react";
import Chart from "react-apexcharts";

class Statistics extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            options: {
                colors:['#F44336'],
                plotOptions: {
                    bar: {
                        dataLabels: {
                            position: 'top', // top, center, bottom
                        },
                    }
                },
                dataLabels: {
                    enabled: true,
                    offsetY: -20,
                    style: {
                        fontSize: '12px',
                        colors: ["#304758"]
                    }
                },
                xaxis: {
                    categories: [],
                    position: 'bottom',
                    axisBorder: {
                        show: true
                    },
                    axisTicks: {
                        show: false
                    },
                    crosshairs: {
                        fill: {
                            type: 'gradient',
                            gradient: {
                                colorFrom: '#D8E3F0',
                                colorTo: '#BED1E6',
                                stops: [0, 100],
                                opacityFrom: 0.4,
                                opacityTo: 0.5,
                            }
                        }
                    },
                    tooltip: {
                        enabled: false,
                        offsetY: -35,
                    }
                },
                fill: {
                    gradient: {
                        shade: 'light',
                        type: "horizontal",
                        shadeIntensity: 0.25,
                        gradientToColors: undefined,
                        inverseColors: true,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [50, 0, 100, 100]
                    },
                },
                yaxis: {
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false,
                    },
                    labels: {
                        show: false,
                        formatter: function (val) {
                            return val + "%";
                        }
                    }
                },
                title: {
                    text: 'Hospital ratings',
                    floating: true,
                    offsetY: 320,
                    align: 'center',
                    style: {
                        color: '#000',
                    }
                }
            },
            series: [{
                name: 'Average',
                data: []
            }],
        };

        this.units = {};
        this.data = [];
        this.labels = [];
        this.unitsRating = [];
    }


    async componentDidMount() {
        const response = await fetch('http://localhost:8000/api/units',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        this.units = await response.json();
        this.units.forEach((unit) => {
            const average = this.getUnitAverage(unit.medics);
            this.unitsRating = [...this.unitsRating, {id: unit.id, name: unit.name, rating: average}];
            this.data = [...this.data, average];
            this.labels = [...this.labels, unit.name];
        });
        this.setState(state => {
            return ({
                options: {
                    ...state.options,
                    xaxis:{
                        ...state.options.xaxis,
                        categories: this.labels
                    }
                },
                series: [{
                    ...state.series,
                    data: this.data
                }]
            });
        })
    }

    getUnitAverage(medics) {
        if (!medics.length) return 0;
        let average = 0;
        medics.forEach((medic) => {
            average += medic.rating.average;
        });
        return (average / medics.length).toFixed(2);
    }

    render() {
        return (
            <div className={'container'}>
                {/*<div id="chart">*/}
                    <Chart options={this.state.options} series={this.state.series} type="bar" height="350" />
                {/*</div>*/}
            </div>
        );
    }
}

export default Statistics;
