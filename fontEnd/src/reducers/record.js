
import * as actionType from '../constants/index.js'


// 合并并初始化初始值。
let initRecordData = {
    // 看别人的和看自己的图文
    isHaveDate:'',
    personalRecord: []
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
                        [key]: [...recordList, ...state[key]]
                    }
                }
                console.log(state)
            } else {
                // 如果是上下拉刷新就在这里合并数组，最后再大合并
                // ...

                state = {
                    ...state,
                    ...{
                        [key]: recordList,
                        isHaveDate
                    }
                }
                console.log(state)
            }
            return state





        case actionType.STORE__CLEAR:
            state = initRecordData;
            console.log(state)
            return state

        default:
            return state
    }
}
