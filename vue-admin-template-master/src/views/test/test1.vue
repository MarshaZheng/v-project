<template>
<div>
 <el-button type="success" @click='show' >运行算法</el-button>
<div class="ooc" v-if="this.isVisible===true">
<p>1234</p>
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
    height:50px;
    width:50px;
    border-radius: 50%;
    background: none;
    border:5px solid;
    border-color: #000;
    margin:3px;
    transition: all 2s ease;
}
.ooc:hover{
    border-color:transparent #f00;
    transform:rotate(360deg);
}
.ooc p{
    height:34px;
    width:34px;
    border-radius: 50%;
    background: none;
    border:5px solid;
    border-color: #0ff #f00;
    margin:3px;
    transition: all 5s ease;
}
.ooc p:hover{
    border-color: tranparent #000;
    transform: rotate(360deg);
}
</style>