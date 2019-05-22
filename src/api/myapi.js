import request from '@/utils/request'


/*
功能:获得分页的plctag列表
发送参数:
params: {
	page: 1, //请求页数
	rows: 10 //一页行数
}
返回格式:
{
	"tid": 10,
	"tagName": "tag10",
	"dataType": "Interger",
	"address": "M100",
	"arrLength": 0,
	"historyValuesList": null
}
*/
export function PLCTagSelect(params) {
    return request({
        url: '/PLCTagSelect',
        method: 'get',
        params
    })
}
/*功能:多条件查询获得历史数据
* */
export function HistoryValueSelect(data) {
    return request({
        url: '/HistoryValueSelect',
        method: 'post',
        data
    })
}/*功能:返回全部历史数据的最近值
* */
export function HistoryAllLastValueSelect() {
    return request({
        url: '/HistoryAllLastValueSelect',
        method: 'get'
    })
}
/*功能:修改目标值
* */
export function dateUpdate(data) {
    return request({
        url: '/dateUpdate',
        method: 'post',
        data
    })


}

