<template>
  <div></div>
</template>
<script setup name="lineChart">
import { init, GetEchart } from "@/static/js/DataChart";
import { onMounted, ref } from "vue";
// 使用 <script setup>
const propts = defineProps({
  ele: Object,
  option: Object,
});
let times = parseInt(new Date().getTime() / 1000);
let date = [];
let value = [];
onMounted(() => {
  // eslint-disable-next-line vue/no-mutating-props
  propts.ele.myChart = GetEchart(document.getElementById(propts.ele.eleId));
  init(propts.ele, propts.option);
  setInterval(function () {
    var time = parseInt(new Date().getTime() / 1000);
    date.push(time - times);
    value.push(Math.random() * 10 + 1);
    propts.ele.myChart.setOption({
      xAxis: {
        data: date,
      },
      series: [
        {
          data: value,
        },
      ],
    });
  }, 1000);
});
</script>

<style scoped></style>
