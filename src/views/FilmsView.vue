<template>
  <div class="films">
    Films
    <div>轮播</div>
    <nav>
      <router-link to="/films/nowplaying">正在上映</router-link>
      <router-link to="/films/comingsoon">即将上映</router-link>
    </nav>
    <hr/>
    <router-view/>
  </div>
</template>
