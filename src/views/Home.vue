<template>
<div>
  <div class="home">
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="3">
          <SideHome />
        </b-col>
        <b-col cols="9">
          <Cardboards />
        </b-col>
      </b-row>
    </b-container>
  </div>
</div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    SideHome: () => import('@/components/ui/SidebarHome'),
    Cardboards: () => import('@/components/cardboardsHome')
  },
}
</script>

<style>
.home {
  margin-top: 60px;
}
</style>
