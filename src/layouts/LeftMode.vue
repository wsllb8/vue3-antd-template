<script setup>
import Sidebar from './components/Sidebar/index.vue'
import UserAvatar from './components/UserAvatar.vue'
</script>
<template>
  <div class="app-wrapper">
    <div class="layout-left">
      <Sidebar />
    </div>
    <div class="layout-right">
      <div class="header">
        <UserAvatar class="mr-2" />
      </div>
      <div class="content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$header-height: 60px;
.app-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}
.layout-left {
  flex: 0 0 200px;
  background-color: #001529;
}

.layout-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  .header {
    height: $header-height;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .content {
    flex: 1;
    padding: 20px;
    overflow: auto;
  }
}
</style>
