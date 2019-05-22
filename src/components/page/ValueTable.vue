<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 标签表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量修改</el-button>
                <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-date-picker  class="handle-input mr10" type="datetime" placeholder="开始时间" v-model="timeStamp.date1" ></el-date-picker>
                <el-date-picker  class="handle-input mr10" type="datetime" placeholder="结束时间" v-model="timeStamp.date2" ></el-date-picker>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <el-button type="primary" icon="search" @click="searchByTime">时间搜索</el-button>
            </div>
            <el-table :data="filterTableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="pLCTag.tagName"
                                 label="标签名"
                                 sortable
                                 width="150">
                </el-table-column>
                <el-table-column prop="pLCTag.dataType"
                                 label="数据类型"
                                 sortable
                                 width="120">
                </el-table-column>
                <el-table-column prop="pLCTag.address"   label="数据地址" sortable>
                </el-table-column>
                <el-table-column prop="pLCTag.arrLength" label="数组长度">
                </el-table-column>
                <el-table-column prop="value" label="最近值">
                    <template scope="scope">
                        <div >
                            <el-input size="small" v-model="scope.row.value" placeholder="请输入修改值"
                            ></el-input>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="timeFormatByme"   label="时间戳" sortable>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
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
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width:100%"></el-date-picker>
                </el-form-item>
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
    import {HistoryAllLastValueSelect,dateUpdate,HistoryValueSelect} from "../../api/myapi"
    import moment from 'moment'
    export default {
        name: 'valuetable',
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
                timeStamp:{
                    date1:'',
                    date2:''
                },
            }
        },
        created() {
                this.search()
        },
        computed: {
            filterTableData() {
                return this.tableData.filter((d) => {
                    d.pLCTag=d.plctag;
                    d.timeFormatByme=moment(d.dataTimeStamp).format('YYYY-MM-DD HH:mm:ss.SSS')
                    return d;
                })
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.searchByTime();
            },
            search() {
                var _this=this
                HistoryAllLastValueSelect().then(function (res) {
                    _this.tableData=res
                })

            },
            searchByTime(){
                var _this=this
                var data={
                    page:_this.cur_page,
                    rows:10,
                    startDate:moment(_this.timeStamp.date1).utc(),
                    endDate:moment(_this.timeStamp.date2).utc(false)
                }
                console.log(data.startDate)
                console.log(data.endDate)

                HistoryValueSelect(data).then(function (res) {
                    console.log(res)
                    _this.tableData=res.list
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
                    tagName: item.tagName,
                    dataType: item.dataType,
                    address: item.address,
                    arrLength:item.arrLength
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            delAll() {
                console.log(this.multipleSelection)
                dateUpdate(this.multipleSelection).then(function (res) {
                    console.log(res)
                })

            },
            handleSelectionChange(val) {
                console.log(val)
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
