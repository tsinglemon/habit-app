
import * as actionType from '../constants/index.js'


// 合并并初始化初始值。
let initRecordData = {
    // 看别人的和看自己的图文
    isHaveDate: '1',
    tempRecord: []
    // 看发现那里的。。。
};

export default (state, action) => {
    if (typeof state === "undefined") {
        state = initRecordData
    }
    let newData = action.data;

    switch (action.type) {
        case actionType.STORE__RECORD_DATA:

            let {
                type,
                key,
                recordList,
                isHaveDate
            } = newData.data;

            if (type === 'issue') {
                state = {
                    ...state,
                    ...{
                        tempRecord: [...recordList, ...state.tempRecord]
                    }
                }
                console.log(state)
            } else if (type === 'update') {
                let updateRecordList = state.tempRecord.map((item) => {
                    let matchId = item._id === recordList[0]._id
                    return matchId ? {
                        ...item,
                        praiseCount: recordList[0].praiseCount,
                        praise: recordList[0].praise,
                        comment: [...recordList[0].comment],
                        commentCount: recordList[0].commentCount
                    } : item;
                })
                state = {
                    ...state,
                    ...{
                        tempRecord: updateRecordList
                    }
                }
            } else if (type === 'del') {
                let delIndex = state.tempRecord.findIndex((item) => {
                    return item._id === recordList[0]._id
                })

                state.tempRecord.splice(delIndex, 1)
                state = {
                    ...state
                }
            } else if (type === 'list') {
                console.log(recordList)
                state = {
                    ...state,
                    ...{
                        tempRecord: recordList,
                        isHaveDate
                    }
                }
            } else {
                state = {
                    ...state,
                    ...{
                        isHaveDate,
                        tempRecord: recordList
                    }
                }
            }

            return state
        // if (type === 'issue') {

        // } else if (type === 'update') {

        // } else {
        //     // 如果是上下拉刷新就在这里合并数组，最后再大合并
        //     // ...

        //     state = {
        //         ...state,
        //         ...{
        //             tempRecord: recordList,
        //             isHaveDate
        //         }
        //     }
        //     console.log(state)
        // }





        case actionType.STORE__CLEAR:
            state = initRecordData;
            console.log(state)
            return state

        default:
            return state
    }
}
