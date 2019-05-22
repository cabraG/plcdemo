<template>
    <div class="tagbox">
        <el-row>
        <el-col  style="margin: 10px" :span=6><label class="tag-lab">{{name}}</label></el-col>
        <el-col :span=14> <el-input class="tag-inp" :value="value"></el-input></el-col>
        </el-row>
    </div>
    
</template>

<script>
    export default {
        name: "MytagValue",props:['name','value']
    }
</script>

<style scoped>
    .tagbox{
        padding: 10px;
    }
    .tag-lab{
        text-align: center;

    }

</style>