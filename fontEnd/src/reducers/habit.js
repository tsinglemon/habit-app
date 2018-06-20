
import * as actionType from '../constants/index.js'


// 合并并初始化初始值。
let initHabitData = {
    searchResult: [],
    habitList: [],
    isUpdate: false,
    isDel: false,
};

export default (state, action) => {
    if (typeof state === "undefined") {
        state = initHabitData
    }
    let newData = action.data;

    switch (action.type) {
        case actionType.STORE__HABIT_DATA:

            let {
                searchResult = state.searchResult,
                habitList = state.habitList,
                isUpdate = state.isUpdate,
                isDel = state.isDel
            } = newData.data;
            // 创建、加入后替换对应的状态
            if (isUpdate) {
                if (searchResult[0] && state.searchResult[0]) {
                    searchResult = state.searchResult.map((item, index) => {
                        let update = searchResult.find(
                            (el) => {
                                return el.habitName === item.habitName ||
                                    el.habitId === item.habitId
                            });
                        return update ? { ...item, ...update } : item
                    })
                }
                // 展示个人习惯列表
                if (habitList && habitList.habits) {
                    habitList.habits = state.habitList.habits.map((item, index) => {
                        let update = habitList.habits.find(
                            (el) => {
                                return el.habitName === item.habit.habitName
                            });
                        return update ? { ...item, ...update } : item
                    })
                }
                // 展示签到状态
                if (habitList && habitList.book) {
                    habitList.habits = state.habitList.habits.map((item, index) => {
                        let update = habitList.book.find(
                            (el) => {
                                return el.habit._id === item.habit._id
                            });
                        return update ? { ...item, ...update } : item
                    })
                }
            }
            // 删除习惯
            if (isDel) {
                if (habitList[0]) {
                    let removeIndex = state.habitList.habits.findIndex((item) => {
                        return item.habit._id === habitList[0].habitId
                    })
                    if (removeIndex !== -1) {
                        state.habitList.habits.splice(removeIndex, 1)
                        habitList = state.habitList;
                    }
                }
            }
            state = {
                ...state,
                ...{
                    searchResult,
                    habitList
                }
            }
            return state


        case actionType.STORE__CLEAR:
            state = initHabitData;
            console.log(state)
            return state

        default:
            return state
    }
}

/**
 * 
 * 习惯创建、添加、删除相关的信息，
 */

 /**
  * 展示搜索结果：在服务器完成数据合并再返回客户端，
  *     1、拿到关键词对应结果（对结果进行分页，记住页数）和用户对应的所有习惯；
  *     2、然后把他们合并起来，要求把用户已添加的习惯以不同的方式区分开；
  *     3、在客户端根据不同的标记区分未创建、已创建未添加、已创建已添加；
  *     4、选择习惯后保留搜索结果以便用户继续选择加入其它展示中的习惯，并更新习惯添加的状态，允许在这里取消添加；
  *     5、当返回个人习惯列表后刷新整个列表；
  * 
  * 发起异步请求的actionType需要不一样，但发送给reducer的actionType可以是一样的，通过对象的合并功能就可以更新组件。
  * 搜索，saga1，reducer1，展示；
  * 加入，saga2，reducer1，合并第一次的搜索结果并展示；
  * 这样就实现了加入某个习惯后还能保留搜索结果并更新加入状态。
  * 
  * 需要合并的数据需要返回习惯名（用于定位第几个）和加入状态，然后替换
  * 
  * 
  */