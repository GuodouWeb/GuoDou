import * as echarts from "echarts/core";
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

export { init, GetEchart };

//注册引入的组件
echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

/**
 *
 *
 * @param {Object} proptsEle html Ele
 * @param {Object} option  Echart设置
 */
function init(proptsEle, option) {
  let myChartObj = proptsEle.myChart;
  const optionObj = option;
  //设置折线图title
  optionObj.title.text = proptsEle.name;
  //设置折线图个性化颜色
  // optionObj.series[0].areaStyle.color = EchartColor();

  optionObj && myChartObj.setOption(optionObj);

  window.onresize = function () {
    myChartObj.resize();
  };
}

/**
 * 返回填充颜色设置
 * @returns
 */
function EchartColor() {
  //LinearGradient(上，左，右，下, arr[])
  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //offset: 位置0~1, color:颜色
    //设置过渡色
    {
      offset: 0,
      color: "rgb(77, 100, 255)",
    },
    {
      offset: 0.3,
      color: "rgba(57, 80, 255, 0.7)",
    },
    {
      offset: 0.95,
      color: "rgb(255, 255, 255)",
    },
  ]);
}

function GetEchart(ele) {
  return echarts.init(ele, {});
}
