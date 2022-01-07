<template>
<div>
 <el-button type="success" @click='show' >运行算法</el-button>
<div class="ooc" v-if="this.isVisible===true">
<p1><font size='2px'>患者</font></p1>
<p2><font size='2px'>医生</font></p2>
<p3><font size='2px'>医院</font></p3>
<p4><font size='2px'>科室</font></p4>
</div>
</div>
</template>

<script>
export default {
    data(){
        return{
            isVisible:false,
        }
    },
    methods: {
        show(){
            this.isVisible = !this.isVisible
        }
    },
}
</script>

<style>
.ooc{
    height:120px;
    width:120px;
    position:absolute;
    border-radius: 50%;
    background: none;
    border:30px solid;
    border-color: rgb(236, 236, 236) rgb(221, 221, 221);
    margin:5px;
}
.ooc p1{
    left:-30px;
    top:15px;
    position:absolute;
    height:34px;
    width:34px;
    border-radius: 50%;
    background: none;
    margin:3px;
}
.ooc p2{
    left:60px;
    top:15px;
    position:absolute;
    height:35px;
    width:35px;
    border-radius: 50%;
    background: none;
    margin:3px;
}
.ooc p3{
    top:60px;
    left:15px;
    position:absolute;
    height:34px;
    width:34px;
    border-radius: 50%;
    background: none;
    margin:3px;
}
.ooc p4{
    top:-25px;
    left:15px;
    position:absolute;
    height:34px;
    width:34px;
    border-radius: 50%;
    background: none;
    margin:3px;
}
</style>