import React, { Component } from "react";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ECharts } from "react-native-echarts-wrapper";


export default function lineChart(props) {
  // console.log(props.data)
//  const DD = useSelector(state => state.trends)
  // console.log(DD)
  const chart = React.useRef(null);
  var option

  useEffect(()=>{

    chart.current.setOption(option);
    // console.log('here')
  })

 option={
   legend: {
     data: ["Current"],
     textStyle: {
       fontSize: 12,
     },
   },
   xAxis: {
     name: 'x',
     offset: 20,
     nameLocation: "center",
     nameTextStyle: {
       fontSize: 12,
     },
     axisLabel: {
       fontSize: 12,
       verticalAlign: "bottom",
     },
     type: "category",
     data: 10,
   },
   yAxis: {
     nameTextStyle: {
       fontSize: 12,
     },
     name: 'y',
     type: "value",
     min: 0,
     max: 40,
     axisLabel: {
       // formatter: "{value} cm",
       fontSize: 12,
     },
   },

   series: [
     {
       //min data set
       name: "Current",
       data: props.data,
       type: "line",
       fontSize: 30,
       color: "#36c25b",
       areaStyle: {color:'rgba(135, 211, 124, 1)'},  
       label: {
         color: "black",
         fontSize: 15,
         formatter: function (d) {
           return d.name + d.data;
         },
       },
     },
   ],       
 }

    return (
      <View style={styles.chartContainer}>
        <View style={{backgroundColor:'#2c234a', padding:10}}>
          <Text style={{textAlign:'center', color:'white'}}>
            {props.title}
          </Text>
        </View>
        <ECharts
          option={option}
          backgroundColor="transparent"
          ref={chart}
        />
      </View>
    );
  // }
}

const styles = StyleSheet.create({
  chartContainer: {
    // flex: 1,
    width:'100%',
    height:200,
    borderRadius:10,
    overflow:'hidden',
  }
});

// export default LineChart