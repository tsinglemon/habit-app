
var allHabit = [
    {
        _id: habit_zao,
        habitName: "早起",
        userCount: "Number",
    }
]

// 一条文档记录一个用户一个习惯
var userInfo = [
    {
        _id: user_jack,
        name: "jack",
        thum: "url",
        habit: [jack_habit],
    }
]

// 一条文档记录一个用户一条图文
var userHabit = [
    {
        _id: jack_habit,
        habit:habit_zao,
        createTime: "Date",
        habitRecord: jack_record
    }
]

// 一条文档记录一条图文的所有信息
var habit_Record = [
    {
        _id: jack_record,
        image: ["url"],
        text: "早起习惯的文字记录",
        likes: [usersId],
        likeCount: "Number",
        comment: [
            {
                user: userId,
                content: "评论一"
            } 
        ]
    }
]

/**2 */

var habit = [
    {
        name: "早起",
        userCount: 200,
        thum: "url",
        user: [ userId, userId]
    }, {
        name: "跑步",
        thum: "url",
        user: [ userId, userId],
        userCount: 100
    }
]

var record = [
    {
        images: "url",
        text: "一些文字",
        likes: [ userId, userId],
        likeCount: 300,
        comment: [
            {
                user: userId,
                content: "评论内容一"
            },{
                user: userId,
                content: "评论内容一"
            }
        ]
    }
]

