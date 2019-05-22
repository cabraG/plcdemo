<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-emoji"></i> 自定义图标</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <h2>使用方法</h2>
            <p style="line-height: 50px;">
                直接通过设置类名为 el-icon-lx-iconName 来使用即可。例如：（共{{iconList.length}}个图标）
            </p>
            <div>{{PLCTag}}</div>

            <el-button @click="search()" type="success" icon="el-icon-search" round>默认按钮</el-button>
            <i class="el-icon-lx-redpacket_fill"></i>
            <p class="example-p">
                <i class="el-icon-lx-redpacket_fill" style="font-size: 30px;color: #ff5900"></i>
                <span>&lt;i class=&quot;el-icon-lx-redpacket_fill&quot;&gt;&lt;/i&gt;</span>
            </p>
            <p class="example-p">
                <i class="el-icon-lx-weibo" style="font-size: 30px;color:#fd5656"></i>
                <span>&lt;i class=&quot;el-icon-lx-weibo&quot;&gt;&lt;/i&gt;</span>
            </p>
            <p class="example-p">
                <i class="el-icon-lx-time"></i>
                <span>&lt;i class=&quot;el-icon-lx-time&quot;&gt;&lt;/i&gt;</span>
            </p>
            <br>
            <h2>图标</h2>
            <div class="search-box">
                <el-input class="search" size="large" v-model="keyword" clearable placeholder="请输入图标名称"></el-input>
            </div>
            <ul>
                <li class="icon-li" v-for="(item,index) in list" :key="index">
                    <div class="icon-li-content">
                        <i :class="`el-icon-lx-${item}`"></i>
                        <span>{{item}}</span>
                    </div>
                </li>
            </ul>

        </div>

    </div>
</template>

<script>
    import {PLCTagSelect } from '../../api/myapi'

    export default {
        data: function () {
            return {
                keyword: '',
                PLCTag: {
                    tid: 10,
                    tagName: "tag10",
                    dataType: "Interger",
                    address: "M100",
                    arrLength: 0,
                    historyValuesList: null
                },
                iconList: [
                    'view',
                    'view_off',
                    'message',
                    'record',
                    'time',
                    'order',
                    'order_unread',
                    'search',
                    'edit',
                    'link',
                    'share',
                    'setting',
                    'download',
                    'lock',
                    'unlock',
                    'image',
                    'email',
                    'copy',
                    'user',
                    'list',
                    'refresh',
                    'close_filled',
                    'check',
                    'close',
                    'check_filled',
                    'forbidden',
                    'forbidden_filled',
                    'info_filled',
                    'info',
                    'help_filled',
                    'help',
                    'caution',
                    'caution_filled',
                    'like',
                    'like_filled',
                    'star',
                    'star_filled',
                    'shouye',
                    'biaoge'
                ],


            }
        },
        computed: {
            list() {
                return this.iconList.filter((item) => {
                    return item.indexOf(this.keyword) !== -1;
                })
            }
        },
        methods: {
            search() {
                var _this = this
                 PLCTagSelect({ "page":1,"rows":10}).then(function (response){
                     console.log(response);
                     _this.PLCTag=response.list[0];
                 })
            }
        }
    }
</script>

<style scoped>
    .example-p {
        height: 45px;
        display: flex;
        align-items: center;
    }

    .search-box {
        text-align: center;
        margin-top: 10px;
    }

    .search {
        width: 300px;
    }

    ul, li {
        list-style: none;
    }

    .icon-li {
        display: inline-block;
        padding: 10px;
        width: 120px;
        height: 120px;
    }

    .icon-li-content {
        display: flex;
        height: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .icon-li-content i {
        font-size: 36px;
        color: #606266;
    }

    .icon-li-content span {
        margin-top: 10px;
        color: #787878;
    }
</style>