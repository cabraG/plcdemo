<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>钢卷信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container basefrom">


                    <el-form ref="form" :model="form" label-width="100px">
                        <el-card class="box-card-one">
                        <el-row :gutter="10" v-for="rowdata in myformdata">
                            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></el-col>
                            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" v-for="fdata in rowdata" :key="fdata">
                                <el-form-item :label="fdata.name">
                                    <el-input v-model="fdata.value"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></el-col>
                        </el-row>
                    </el-card>
                        <el-card class="box-card-two" style="margin-top: 20px;padding-bottom: 20px">
                            <el-col :span=12  class="cardtwo-left" >
                                <el-row class="zhangfrow">
                                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                                        <label style="visibility: hidden">测试值</label>
                                    </el-col>
                                    <el-col style="padding: 5px" :xs="5" :sm="5" :md="5" :lg="5" :xl="5" v-for="zfdata in zhangformdata" :key="zfdata">
                                      <span>{{zfdata.name}}</span>
                                    </el-col>
                                </el-row>
                            <el-row class="zhangsrow">
                                <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                                    <span>设定值</span>
                                </el-col>
                                <el-col style="padding: 5px" :xs="5" :sm="5" :md="5" :lg="5" :xl="5" v-for="zfdata in zhangformdata" :key="zfdata">
                                <el-input :value="zfdata.setvalue"></el-input>
                                </el-col>
                            </el-row>
                                <el-row class="zhangtrow">
                                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                                        <span>实际值</span>
                                    </el-col>
                                    <el-col style="padding: 5px" :xs="5" :sm="5" :md="5" :lg="5" :xl="5" v-for="zfdata in zhangformdata" :key="zfdata">
                                        <el-input :value="zfdata.realvalue"></el-input>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span=12  class="cardtwo-right" >
                                <el-col :span=14>
                                <el-card class="box-card-yuando" >
                                    <el-row class="yuandoheader">
                                        <h3 style="text-align: center">圆盘剪操作侧</h3>
                                    </el-row>
                                    <el-row class="yuanfrow">
                                        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                                            <label style="visibility: hidden">测试值</label>
                                        </el-col>
                                        <el-col style="padding: 5px" :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                                            <span>设定值</span>
                                        </el-col>
                                        <el-col style="padding: 5px" :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                                            <span>实际值</span>
                                        </el-col>
                                    </el-row>
                                    <el-row v-for="yfdata in yuanformdata[0]" :key="yfdata" class="yuanothrow" style="margin: 5px">
                                        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                                            <span>{{yfdata.name}}</span>
                                        </el-col>
                                        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" style="margin: 5px">
                                            <el-input  :value="yfdata.setvalue"></el-input>
                                        </el-col>
                                        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" style="margin: 5px">
                                            <el-input  :value="yfdata.realvalue" class="yellow"></el-input>
                                        </el-col>
                                    </el-row>
                                </el-card>
                                </el-col>
                                <el-col :span=10>
                                    <el-card class="box-card-yuanmo">
                                        <el-row class="yuanmoheader">
                                            <h3 style="text-align: center">圆盘剪传动侧</h3>
                                        </el-row>
                                        <el-row class="yuanmofrow">
                                            <el-col style="padding: 5px" :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                                                <span>设定值</span>
                                            </el-col>
                                            <el-col style="padding: 5px" :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                                                <span>实际值</span>
                                            </el-col>
                                        </el-row>
                                        <el-row v-for="yfdata in yuanformdata[1]" :key="yfdata" style="margin: 5px" class="yuanmoothrow">
                                            <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10" style="margin: 5px">
                                                <el-input  :value="yfdata.setvalue"></el-input>
                                            </el-col>
                                            <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10" style="margin: 5px">
                                                <el-input  :value="yfdata.realvalue" class="yellow"></el-input>
                                            </el-col>
                                        </el-row>
                                    </el-card>
                                </el-col>
                            </el-col>
                        </el-card>
                        <el-card class="box-card-three" style="margin-top: 20px;padding-bottom: 20px">
                            <el-row :gutter="10">
                                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" v-for="cfdata in chengformdata" :key="cfdata">
                                    <el-form-item :label="cfdata.name">
                                        <el-input v-model="cfdata.value"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-card>
                        <el-card class="box-card-four" style="margin-top: 20px;padding-bottom: 20px">
                            <el-row :gutter="10">
                                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" v-for="ffdata in feiformdata" :key="ffdata">
                                    <el-form-item :label="ffdata.name">
                                        <el-input v-model="ffdata.value"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-card>
                        <div class="button-upload">
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">表单提交</el-button>
                                <el-button>取消</el-button>
                            </el-form-item>
                        </div>
                    </el-form>
        </div>

    </div>
</template>

<script>
    import {HistoryValueSelect} from "../../api/myapi"
    import moment from 'moment'
    import MytagValue from "../../components/page/MytagValue"

    export default {
        name: 'baseform',
        components: {
            MytagValue
        },
        data: function(){
            return {
                options:[
                    {
                        value: 'guangdong',
                        label: '广东省',
                        children: [
                            {
                                value: 'guangzhou',
                                label: '广州市',
                                children: [
                                    {
                                        value: 'tianhe',
                                        label: '天河区'
                                    },
                                    {
                                        value: 'haizhu',
                                        label: '海珠区'
                                    }
                                ]
                            },
                            {
                                value: 'dongguan',
                                label: '东莞市',
                                children: [
                                    {
                                        value: 'changan',
                                        label: '长安镇'
                                    },
                                    {
                                        value: 'humen',
                                        label: '虎门镇'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        value: 'hunan',
                        label: '湖南省',
                        children: [
                            {
                                value: 'changsha',
                                label: '长沙市',
                                children: [
                                    {
                                        value: 'yuelu',
                                        label: '岳麓区'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                form: {
                    name: '',
                    region: '',
                    date1: null,
                    date2: null,
                    delivery: true,
                    type: ['步步高'],
                    resource: '小天才',
                    desc: '',
                    options: []
                },
                myformdata:[
                    [{
                        name:'计划号',
                        value:'3710710'
                    },
                    {
                        name:'来料钢卷号',
                        value:'9307214702'
                    },
                    {
                        name:'产出钢卷号',
                        value:'930721470201'
                    },
                    {
                        name:'班别',
                        value:'乙'
                    },
                    {
                        name:'班次',
                        value:'早'
                    }],

                    [
                        {
                        name:'钢种号牌',
                        value:'DC03'
                    },
                        {
                            name:'产品大类',
                            value:'L'
                        },
                        {
                            name:'原料厚度',
                            value:0.900
                        },
                        {
                            name:'原料宽度',
                            value:955.00
                        },
                        {
                            name:'原料重量',
                            value:8870
                        },

                    ]
                ],
                zhangformdata:[
                        { name:'张力',
                        setvalue:'0',
                        realvalue:'0',
                    },
                        { name:'速度',
                            setvalue:'0',
                            realvalue:'0',
                        },
                        { name:'上表面涂油量',
                            setvalue:'1000',
                            realvalue:'0',
                        },
                        { name:'下表面涂油量',
                            setvalue:'1000',
                            realvalue:'0',
                        }
                ],
                yuanformdata:[
                    [
                        {
                            name:'GAP',
                            setvalue:'0.090',
                            realvalue:'0.12',

                        },
                        {
                            name:'LAP',
                            setvalue:'0.45',
                            realvalue:'0.3999676',

                        },
                        {
                            name:'宽度',
                            setvalue:'478.50',
                            realvalue:'1000',

                        }
                    ],
                    [
                        {
                            name:'GAP',
                            setvalue:'0.090',
                            realvalue:'0.12',

                        },
                        {
                            name:'LAP',
                            setvalue:'0.45',
                            realvalue:'0.3997907',

                        },
                        {
                            name:'宽度',
                            setvalue:'478.50',
                            realvalue:'1000',

                        }
                    ]
                ],
                chengformdata:[
                    {
                        name:'称重钢卷号',
                        value:'9307214702'

                    },
                    {
                        name:'称重准备好',
                        value:'false'

                    },
                    {
                        name:'称重重量',
                        value:'0'

                    },
                    {
                        name:'班别',
                        value:'乙'

                    },
                    {
                        name:'班次',
                        value:'白'

                    }
                ],
                feiformdata:[
                    {
                        name:'废卷重量',
                        value:'801'

                    },
                    {
                        name:'涂油偏量',
                        value:'0'

                    },

                ]
            }
        },
        methods: {
            onSubmit() {
                var _this=this
                var data={
                    startDate:moment(_this.form.date1).utc(),
                    endDate:moment(_this.form.date2).utc(false)
                }
                console.log(data.startDate)
                console.log(data.endDate)
                HistoryValueSelect(data).then(function (res) {
                    console.log(res)
                })
                this.$message.success('提交成功！');
            }
        }
    }
</script>
<style>

    .basefrom span{
        font-size: 14px;
        display:block;
        widht:18px;
        text-align:center;
        margin-top: 15px;
        margin-right: 0px;
    }

    .box-card-yuanmo{
        margin-left: 10px;
    }

    .yellow .el-input__inner{
        background-color: yellow;
    }
    .button-upload{
        margin: 20px;
    }



</style>