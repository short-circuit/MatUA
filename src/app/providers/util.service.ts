import { GuiObject, GraphType } from '../shared/classes';
import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

    RandomNumber(): number {
      return Math.random() * 100;
    }

    GetGraphType(graph: GuiObject) {
      if (graph.name.includes('lineargauge')) {
        graph.type = GraphType.LinearGauge;
        return;
      }
      if (graph.name.includes('gauge')) {
        graph.type = GraphType.Gauge;
        graph.options = {
          tooltip : {
              formatter: '{a} <br/>{b} : {c}%'
          },
          toolbox: {
              feature: {
                  restore: {},
                  saveAsImage: {}
              }
          },
          series: [
              {
                  name: 'Gauge',
                  type: 'gauge',
                  detail: {formatter: '{value}%'},
                  data: [{value: 50, name: ''}]
              }
          ]
        };
        // graph.component = GaugeComponent;
        return;
      }
      if (graph.name.includes('horizontalbar')) {
        graph.type = GraphType.HorizontalBar;
        return;
      }
      if (graph.name.includes('verticalbar')) {
        graph.type = GraphType.VerticalBar;
        graph.options = {
          xAxis: {
              type: 'value'
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: [
                [1, 2, 3, 4, 5, 6, 7],
                [120, 200, 150, 80, 70, 110, 130]
              ],
              type: 'bar'
          }]
      };
        return;
      }
      if (graph.name.includes('pie')) {
        graph.type = GraphType.Pie;
        graph.options = {
          title : {
              x: 'center'
          },
          tooltip : {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          series : [
              {
                  name: 'value',
                  type: 'pie',
                  radius : '70%',
                  center: ['50%', '50%'],
                  data: [],
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
      };
      return;
      }
      if (graph.name.includes('radar')) {
        graph.type = GraphType.Radar;
        graph.options = {
          title: {
          },
          tooltip: {},
          legend: {
              data: ['']
          },
          radar: {
              // shape: 'circle',
              name: {
                  textStyle: {
                      color: '#fff',
                      backgroundColor: '#999',
                      borderRadius: 3,
                      padding: [3, 5]
                 }
              },
              indicator: [
                 { name: '（sales）', max: 6500},
                 { name: '（Administration）', max: 16000},
                 { name: '（Information Techology）', max: 30000},
                 { name: '（Customer Support）', max: 38000},
                 { name: '（Development）', max: 52000},
                 { name: '（Marketing）', max: 25000}
              ]
          },
          series: [{
              type: 'radar',
              // areaStyle: {normal: {}},
              data : [
                  {
                      value : [4300, 10000, 28000, 35000, 50000, 19000],
                      name : '（Allocated Budget）'
                  },
                   {
                      value : [5000, 14000, 28000, 31000, 42000, 21000],
                      name : '（Actual Spending）'
                  }
              ]
          }]
      };
        return;
      }
      if (graph.name.includes('line')) {
        graph.type = GraphType.Line;
        graph.options = {
          title: {
            text: 'Line'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false
            }
          },
          xAxis: {
            data: [1, 2, 3, 4, 5, 6, 7],
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: 'data',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }]
        };
        return;
      }
      graph.type = -1;
    }

}
