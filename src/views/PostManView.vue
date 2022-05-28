<template>
  <div class="route-search-box">
    <div class="request-methods-box">
      <el-dropdown split-button type="primary" size="small">
        Dropdown
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item>Action 4</el-dropdown-item>
            <el-dropdown-item>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-input></el-input>
  </div>
</template>

<script>
export default {
  name: "PostManView"
}
</script>

<style scoped>
.route-search-box{
  align-items: center;
  justify-content: center;
  display: grid;
  grid-template-columns: 10% 90%;
}
.request-methods-box{
  height: 100%;
  border: 5px black;

}
.request-methods-box >>>.el-dropdown{
  height: 100%;
  margin-top: 4px;
}
.request-methods-box >>>.el-dropdown button{
  color: black;
  background: #909090;
  border: none;
}


</style>
