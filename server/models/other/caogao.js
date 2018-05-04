
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
        user: user_security,
        thum: "url",
        habits: [{
            habit: habit_zao,
            createDate: "Date"
        }]
    }
]


// 一条文档记录一条图文的所有信息
var habit_Record = [
    {
        _id: jack_record,
        user: user_jack,
        habit: habit_zao,
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
