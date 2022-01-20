import React, { Component } from "react";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ECharts } from "react-native-echarts-wrapper";

export default function Chart(props) {
  
  // const DD = useSelector(state => state.sensorData[props.sensor])
  const chart = React.useRef(null);
  var option
  // chart.current.setOption(option);
  useEffect(()=>{
    // chart.current.setBackgroundColor('#eff0dd')
    chart.current.setOption(option);
    chart.current.setBackgroundColor('#f3f5e4')
    // console.log(props.sensor)
  },[props.data])
  
     option = {
      radius: "100%",
      // toolbox: {
      //   feature: {
      //     restore: {},
      //     saveAsImage: {},
      //   },
      // },
      series: [
        {
          // name: "Ammonia",
          type: "gauge",
          detail: { formatter: "{value} ppm" },
          data: [{ value: props.data, name:props.unit }],
          max: props.max,
          axisLabel: {
            fontSize: 11,
            distance: 8
          },
          detail: {
            formatter: "{value}",
            fontSize: 16,
            // backgroundColor: "rgba(227, 0, 0, 1)",
            offsetCenter: ["0", "78%"],
          },
          title: {
            fontSize: 11,
            offsetCenter: ["0", "110%"],
            color: "rgba(0, 0, 0, 1)",
          },
          splitNumber: 4,
          pointer:{
            length:'60%',
            width:4
          },
          axisLine: {
            lineStyle: {
              color: [
                [0.29, "rgb(15,164,100)"],
                [0.7, "rgb(235,137,52)"],
                [1, "rgb(219,58,55)"],
              ],
              shadowColor: "rgba(255, 255, 255, 0.7)",
              shadowBlur: 10,
              width: 15,
            },
          },
          splitLine: {
            show: true,
            length: "20%"}
          // startAngle: 190,
          // endAngle: -0,
          },
      ],
    };

    return (
      <View style={styles.chartContainer}>
        <View style={{backgroundColor:'#231d5e', padding:10}}>
          <Text style={{textAlign:'center', color:'white'}}>
            {props.title}
          </Text>
        </View>
        <ECharts
          option={option}
          backgroundColor="#eff0dd"
          ref={chart}
        />
      </View>
    );
  // }
}

const styles = StyleSheet.create({
  chartContainer: {
    width:'100%',
    height:180,
    borderRadius:15,
    overflow:'hidden',
  }
});

// export default Chart