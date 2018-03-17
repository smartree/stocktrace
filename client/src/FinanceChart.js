import React, {Component} from "react";
import Highcharts from 'highcharts';

export default class FinanceChart extends Component {
      constructor(props) {
        super(props);
        this.state = {
            chartType: 'equity',
            options: null,
            code: this.props.code,
        };
        // This binding is necessary to make `this` work in the callback
        this.handleChange  = this.handleChange .bind(this);
        console.log("***constructor***");
      }
        handleChange (e) {
            console.log("***handleChange***"+e.target.value);
            this.setState({
              code: e.target.value
            })
      }
    getUrl(){
        var url = '';
        let chartType = this.props.chartType;
      if(chartType === 'equity'){
          url = 'http://localhost:8000/api/equity?code='+this.state.code;
      } else if (chartType === 'industry'){
          url = 'http://localhost:8000/api/industry?code='+this.state.code
      }else if (chartType === 'index'){
          url = 'http://localhost:8000/api/csi?code='+this.state.code
      }else if (chartType === 'sw'){
          url = 'http://localhost:8000/api/sw?code='+this.state.code
      }else if (chartType === 'sh'){
          url = 'http://localhost:8000/api/sh'
      }
      return url;
    }
    
  componentDidMount() {
          console.log("componentDidMount***");
          //remember the outer "this"
      var that = this;
      var url = this.getUrl();
      //only works for CH and FF
      // let url = new URL(this.props.url);
      // let params = new URLSearchParams(url.search.slice(1));
      // console.log(params);
      // //Iterate the search parameters.
      //   for (let p of params) {
      //     console.log(p);
      //   }
      //   let code = params.get('code');

      fetch(url).then(function(response){
          return response.json();
      }).then(function (data) {
          console.log(data);
        var averagePB = data['PB_avg'];
        var averagePE = data['PE_avg'];
        var options2 = {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Finance chart over time '+that.state.code
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                        'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: [
                {
                    title: {
                        text: 'PB'
                    },
                    plotLines: [{
                    color: '#000',
                    dashStyle: 'Solid', //Dash,Dot,Solid,默认Solid
                    width: 1.5,
                    value: averagePB,
                    zIndex: 5,
                    label: {
                        text: 'PB:'+averagePB,
                        align: 'center',
                        style: {
                            color: 'blue'
                        }
                    }
                }]
                },
                {
                    title: {
                        text: 'PE'
                    },
                    plotLines: [{
                    color: 'black',
                    dashStyle: 'Dash', //Dash,Dot,Solid,默认Solid
                    width: 1.5,
                    value: averagePE,
                    zIndex: 5,
                    label: {
                        text: 'PE:'+averagePE,
                        align: 'center',
                        style: {
                            color: 'black'
                        }
                    }
                }],
                    opposite: true //right-side y-axis
                }],
            legend: {
                layout: 'vertical',
                align: 'left',
                x: 80,
                verticalAlign: 'top',
                y: 55,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                },
                series:{
                    turboThreshold:5000//set it to a larger threshold, it is by default to render 1000 points
                }
            },
            series: [{
                type: 'line',
                name: 'PB',
                data: data['PB']
            },{
                type: 'line',
                name: 'PE',
                yAxis: 1,
                data: data['PE']
            }]
        }
        that.setState({options: options2});
        console.log(that.state.options);
        //create highcharts chart
        that.chart = new Highcharts[that.props.type || 'Chart'](
          that.chartEl,
          that.state.options
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  componentDidUpdate(){
          console.log("componentDidUpdate with code:"+this.state.code);
          // console.log(this.chart);
          //get highcharts instance
          let chart = this.chart;
          if(this.chart && this.state.code.length === 6) {
              chart.setTitle({ text: 'Finance chart over time ' + this.state.code });
              // console.log(this.chart.series);
              var url = this.getUrl();
              console.log(url);
              fetch(url).then(function (response) {
                  return response.json();
              }).then(function (data) {
                  console.log(data);
                  chart.series[0].setData(data['PB']);
                  chart.series[1].setData(data['PE']);
              }).catch(function (error) {
              });
          }
  }

  render() {
    console.log("render***"+this.state.code);
    // Use the `ref` callback to store a reference to the text input DOM
      //     // element in an instance field (for example, this.chartEl).
    return (
        <div>
          <div>
              <label htmlFor="code">Input equity code</label>
              <input id="code" name="code" placeholder="Input equity code" value={this.state.code}
                onChange={this.handleChange} ref={input => (this.codeInput = input)}/>
          </div>
            <div ref={el => (this.chartEl = el)} />
        </div>
    );

  }
}