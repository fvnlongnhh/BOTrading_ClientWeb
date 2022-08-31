import React, { useState, useEffect } from 'react';
import moment from "moment"
import Chart from "chart.js/auto"
import "chartjs-adapter-luxon";
import AnnotationPlugin from 'chartjs-plugin-annotation';
import Service from './../../services/request'
import ChartStreaming from "chartjs-plugin-streaming";
Chart.register(ChartStreaming, AnnotationPlugin);
let payLoadData = null

const Connection = ({ payload, betRecordChange, typeMoney }) => {
 const [chart, setChart] = useState()
 let myTimeout= null
 
  const onRefresh = (chart) => {
    if(payLoadData && +payLoadData.price){
      const now = new Date(payLoadData._id);
 
      const c = chart.scales.y._range.max -  chart.scales.y._range.min  ;
      const d = chart.scales.y._range.max -  (+payLoadData.price)  ;
      const r = d * chart.scales.y.maxHeight / c
      
      if(d < 0){
        window.jQuery(".now-data").css("top","-100%")
      }else{
        window.jQuery(".now-data").css("top", `${r > chart.scales.y.maxHeight ? chart.scales.y.maxHeight -10 : r}px`)
      }
   
      window.jQuery(".now-data b").text(payLoadData.price)
  
     
      
      chart.data.datasets.forEach((dataset) => {
        dataset.data.push({
          x: now,
          y: +payLoadData.price,
        });
      });
    }
  };


  useEffect(()=>{
    const data = {
      datasets: [
        {
          // label: "chart",
          backgroundColor: "",
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 1)",
          pointRadius: 0,
          lineTension: .1,
          fill: !0,
          cubicInterpolationMode: "monotone",
          data: [],
        },
      ],
    };

    const ctx = window.jQuery('#test');
    ctx.height(320);

   const chartTmp = new Chart(ctx, {
      type: "line",
      data: data,
      options: {
        title: {
          display: !1
        },
        maintainAspectRatio: !1,
        legend: {
            display: !1
        },
        tooltips: {
            enabled: !1
        },
        hover: {
            intersect: !1,
            enabled: !0,
            mode: "index",
            animationDuration: 0
        },
        plugins: {
          legend: {
            display: false
          },
          datalabels: {
            display: false
          },
          annotation: {
            annotations: [
              {
                type: 'line',
                yMin: 0,
                yMax: 0,
                
                borderWidth: 0,
              },
              {
                type: 'line',
                yMin: 0,
                yMax: 0,
                
                borderWidth: 0,
              },
              {
                type: 'line',
                yMin: 0,
                yMax: 0,
                
                borderWidth: 0,
              }
            ]
           
             
            
    
        },
          // annotation: {
          //   annotations: {
          //     line1: {
          //       type: 'line',
          //       yMin: 60,
          //       yMax: 6000000,
          //       borderColor: 'rgb(255, 99, 132)',
          //       borderWidth: 2,
          //     }
          //   }
          // }
      
        },      
        scales: {
          x: {
            type: "realtime",
            realtime: {
              duration: 75000,
              refresh: 3000,
              delay: 2000,
              onRefresh: onRefresh,
            },
            time: {
              minUnit: "millisecond",
              displayFormats: {
                  millisecond: "HH:mm:ss.SSS",
                  second: "HH:mm:ss",
                  minute: "HH:mm:ss",
                  hour: "hA",
                  day: "MMM D",
                  week: "ll",
                  month: "MMM YYYY",
                  quarter: "[Q]Q - YYYY",
                  year: "YYYY"
              }
          },
          gridLines: {
              color: "rgba(102, 175, 218, 0.3)",
              zeroLineColor: "rgba(47, 48, 53, 1)",
              drawBorder: !0,
              lineWidth: 1
          },
          ticks: {
              fontColor: "rgba(199, 199, 199, 1)"
          }
          },
          y: {
            type: "linear",
            display: !0,
            position: "right",
            gridLines: {
                color: "rgba(102, 175, 218, 0.3)",
                zeroLineColor: "rgba(47, 48, 53, 1)",
                drawBorder: !0,
                lineWidth: 1,
                offsetGridLines: !0
            },
            scaleLabel: {
                display: !1
            },
            ticks: {
                fontColor: "rgba(199, 199, 199, 1)"
            }
          },

        },
        pan: {
          enabled: !0,
            mode: "x",
        },
        zoom: {
            enabled: !1
        },
        annotation: {
            events: ["click"],
            dblClickSpeed: 350,
            annotations: []
    
        },
        interaction: {
          intersect: false,
        },
      },
    });
    const l = window.jQuery("#test").get(0).getContext("2d");
    let a = window.jQuery("#test").height();
    a = l.createLinearGradient(0, 0, 0, a - 50);
    a.addColorStop(0, "rgba(39, 144, 210, 0.5)");
    a.addColorStop(.8, "rgba(39, 144, 210, 0.1)");
    a.addColorStop(.95, "rgba(39, 144, 210, 0.025)");
    a.addColorStop(1, "rgba(39, 144, 210, 0)");
    chartTmp.data.datasets[0].backgroundColor = a
    setChart(chartTmp)

    Service.send({
      method: 'post', path: 'Game/gameChartRecordList',data: {
        cryptoCurrency: `${typeMoney}`
      },
    }).then(result => {
      if (result) {
        const { statusCode, data: newData } = result 
        if (statusCode === 200) {
        
          const tmpNewData = []
          
          newData.data.forEach((item, index)=>{
            if(+item.gameRecordPrice){
              
              tmpNewData.push({
                x: new Date(item.gameRecordSection),
                y: +item.gameRecordPrice,
              })
            }
           
          })
     
        
          chartTmp.data.datasets[0].data = tmpNewData
          
         
         
        }
      } 
    })
  
  },[])


  useEffect(()=>{
    if(chart){
      if(payload.message){
   
        if(typeMoney === payload.topic){
           payLoadData = JSON.parse(`${payload.message}`)
        }   
      }
    }
   }, [payload])

  useEffect(()=>{
    if(betRecordChange){
      
      if(chart, payLoadData){    
        if(myTimeout){
          clearTimeout(myTimeout)
        }
        const tmp  = new Date(payLoadData._id)
        chart.config._config.options.plugins.annotation.annotations[3] =  {
          type: "line",
          drawTime: "afterDraw",
          mode: "vertical",
          scaleID: "x",
          value:  tmp,
          borderColor: "rgba(116, 116, 116, 1)",
          borderWidth: 1,
          label: {
              backgroundColor: "rgba(40,145,189,0.5)",
              content: `Giải quyết tại ${payLoadData.price}`,
              fontStyle: "normal",
              fonnColor: "#8ba4c2",
              fontSize: 11,
              xAdjust: 29,
              cornerRadius: 0,
              position: "end",
              enabled: true,
              font: { size: 8 , xAdjust: 29, fontStyle: "normal",}
          }
       }

       setTimeout(()=>{
         chart.config._config.options.plugins.annotation.annotations[3] ={
          type: "line",
          drawTime: "afterDraw",
          mode: "vertical",
          scaleID: "x",
          value:  tmp,
          borderColor: "rgba(116, 116, 116, 1)",
          display: false,
          borderWidth: 1,
          enabled: false,
          label: {
            backgroundColor: "rgba(40,145,189,0.5)",
            content: `Giải quyết tại ${payLoadData.price}`,
            fontStyle: "normal",
            fonnColor: "#8ba4c2",
            fontSize: 11,
            xAdjust: 29,
            cornerRadius: 0,
            position: "end",
            enabled: false,
            font: { size: 8 , xAdjust: 29, fontStyle: "normal",}
        }
         }
       }, 40000)
      
      }
       
    }
  }, [betRecordChange])

  useEffect(()=>{
    if(chart){
      const checkTime = 60 - (+moment(payLoadData._id).format("ss"))
      if( checkTime === 15 || checkTime ===16){
        let time = new Date();
        time.setSeconds(time.getSeconds() + 15);
        chart.config._config.options.plugins.annotation.annotations[0] = {
               
          type: "box",
          drawTime: "afterDraw",
          xScaleID: "x",
          xMin: new Date()  ,
          xMax: time,
          backgroundColor: "rgba(33, 95, 158, 0.1)",
          borderWidth: 0
                  
         }
         chart.config._config.options.plugins.annotation.annotations[1] = {
           
             type: "line",
             drawTime: "beforeDraw",
             mode: "vertical",
             scaleID: "x",
             value: new Date(),
            
             borderColor: "white",
             borderWidth: 1,
             label: {
                 adjustScaleRange: true,
                 backgroundColor: "rgba(0, 0, 0, 0.6)",
                 content: "Kết thúc mua hàng",
                 marginRight: "20px",
                 fonnColor: "#8ba4c2",
                 fontSize: 8,
                 xAdjust: -44,
                 cornerRadius: 0,
                 position: "start",
                 enabled: !0,
                 font: { size: 8 , xAdjust: 29, fontStyle: "normal",}
             }
            
         }
         setTimeout(()=>{
          chart.config._config.options.plugins.annotation.annotations[2] = {
            type: "line",
            drawTime: "beforeDraw",
            mode: "vertical",
            scaleID: "x",
            value: time,
            borderColor: "white",
            borderWidth: 1,
            label: {
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                content: `Đếm ngược ${checkTime}s chia ra`,
                fontStyle: "normal",
                fonnColor: "#8ba4c2",
                fontSize: 8,
                xAdjust: 32,
                cornerRadius: 0,
                adjustScaleRange: true,
                position: "start",
                enabled: !0,
                marginLeft: "20px",
                font: { size: 8 , xAdjust: 29, fontStyle: "normal",}
            }
           
        }
         },10000)
      }
      if(chart.config._config.options.plugins.annotation.annotations[2].label){
        chart.config._config.options.plugins.annotation.annotations[2].label.content =  `Đếm ngược ${checkTime}s chia ra`
      }
      
      
    }

    
  
  },[payload])
  

 

  return (
    <>
      <div className="chartData" styles={{position: "relative"}} >
      
           <div className="drawing-content"> <canvas id="test"></canvas></div>
    
          <span class="now-data"><b></b></span>
        
     
      </div>
    </>
  );
}

export default Connection;