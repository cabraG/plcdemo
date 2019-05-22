<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 标签表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="filterTableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="pLCTag.tagName" label="标签名" sortable width="150">
                </el-table-column>
                <el-table-column prop="pLCTag.dataType" label="数据类型"
                                 sortable
                                 width="120">
                </el-table-column>
                <el-table-column prop="pLCTag.address"
                                 sortable
                                 label="数据地址">
                </el-table-column>
                <el-table-column prop="pLCTag.arrLength" label="数组长度">
                </el-table-column>
                <el-table-column prop="value" label="最近值">
                </el-table-column>
                <el-table-column prop="dataTimeStamp"
                                 sortable
                                 label="时间戳">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="80px" >
                <el-form-item label="标签名">
                    <el-input v-model="form.tagName"></el-input>
                </el-form-item>
                <el-form-item label="数据地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="数据类型">
                    <el-input v-model="form.dataType"></el-input>
                </el-form-item>
                <el-form-item label="数组长度">
                    <el-input v-model="form.arrLength"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {HistoryAllLastValueSelect} from "../../api/myapi"
    import moment from 'moment'
    export default {
        name: 'basetable',
        data() {
            return {
                url: './vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    tagName: '',
                    dataType: '',
                    address: '',
                    arrLength:''
                },
                idx: -1,
                websocket:''
            }
        },
        created() {
            var _this=this
            if ('WebSocket' in window) {
                // 不带参数的写法
                this.websocket = new WebSocket("ws://192.168.1.117:8080/websocket");
                // 通过路径传递参数的方法（服务端采用第一种方法"@ServerEndpoint"实现）
            }
            else {
                alert('当前浏览器 Not support websocket')
            }
            this.websocket.onopen = function () {
                console.log("WebSocket连接成功");
            }
            this.websocket.onmessage = function (evt)
            {
                if(evt.data==="连接成功"){
                    console.log(evt.data)
                }
                else
                    _this.tableData=JSON.parse(evt.data)
            };
        },beforeDestroy(){
            this.websocket.close();
        },
        mounted() {
            //this.search();
        }
        ,
        computed: {
            filterTableData() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    d.dataTimeStamp=moment(d.dataTimeStamp).format('YYYY-MM-DD HH:mm:ss.SSS')
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.pLCTag.tagName === this.del_list[i].pLCTag.tagName) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.pLCTag.address.indexOf(this.select_cate) > -1 &&
                            (d.pLCTag.tagName.indexOf(this.select_word) > -1 ||
                                d.pLCTag.address.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            search() {
                var _this=this
                HistoryAllLastValueSelect().then(function (res) {
                    console.log(res)
                    _this.tableData=res
                })
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    tagName: item.pLCTag.tagName,
                    dataType: item.pLCTag.dataType,
                    address: item.pLCTag.address,
                    arrLength:item.pLCTag.arrLength
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },
            // 确定删除
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }

</style>
