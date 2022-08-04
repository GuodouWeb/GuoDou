import { reactive } from "vue";
import * as echarts from "echarts/core";
const option = reactive({
  title: {
    text: null,
  },
  //提示框
  tooltip: {
    trigger: "axis",
    axisPointer: {
      animation: false,
    },
  },

  //保存，框选
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: "none",
      },
      restore: {},
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    data: null,
  },
  yAxis: {
    type: "value",
  },

  //底部拉伸栏位
  dataZoom: [
    {
      type: "inside",
      start: 0,
      end: 10,
    },
    {
      start: 0,
      end: 10,
    },
  ],
  series: [
    {
      name: "Performance Data",
      type: "line",
      symbol: "none",
      sampling: "lttb",
      showSymbol: false,
      data: null,
      smooth: true, // 设置曲线
      lineStyle: {
        //自适应设置
        width: 0,
      },
      areaStyle: {
        opacity: 0.8, // 透明度
        color: null,
      },
      emphasis: {
        //emphasis设置高亮状态
        focus: "series", //在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。
      },
    },
  ],
});

const gracefulCurveOption = reactive({
  // backgroundColor: "#394056",
  title: {
    top: 5,
    text: "Requests",
    textStyle: {
      fontWeight: "normal",
      fontSize: 30,
      color: "#333",
    },
    left: "1%",
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    top: 5,
    icon: "rect",
    itemWidth: 14,
    itemHeight: 5,
    itemGap: 13,
    right: "4%",
    textStyle: {
      fontSize: 12,
      color: "#F1F1F3",
    },
  },
  grid: {
    top: 70,
    left: "2%",
    right: "2%",
    bottom: 50,
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: "#57617B",
        },
      },
      data: [
        "13:00",
        "13:05",
        "13:10",
        "13:15",
        "13:20",
        "13:25",
        "13:30",
        "13:35",
        "13:40",
        "13:45",
        "13:50",
        "13:55",
      ],
    },
  ],
  yAxis: [
    {
      type: "value",
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "#57617B",
        },
      },
      axisLabel: {
        margin: 10,
        fontSize: 14,
      },
    },
  ],
  //保存，框选
  toolbox: {
    top: 5,
    right: 10,
    feature: {
      dataZoom: {
        yAxisIndex: "none",
      },
      restore: {},
      saveAsImage: {},
    },
  },
  //底部拉伸栏位
  dataZoom: [
    {
      type: "inside",
      start: 0,
      end: 10,
    },
    {
      start: 0,
      end: 10,
    },
  ],
  series: [
    {
      name: "CMCC",
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 5,
      showSymbol: false,
      lineStyle: {
        width: 1,
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: "rgba(137, 189, 27, 0.3)",
            },
            {
              offset: 0.8,
              color: "rgba(137, 189, 27, 0)",
            },
          ],
          false
        ),
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowBlur: 10,
      },
      itemStyle: {
        color: "rgb(137,189,27)",
        borderColor: "rgba(137,189,2,0.27)",
        borderWidth: 12,
      },
      data: [],
    },
  ],
});
export { option, gracefulCurveOption };
