


const a = () => {

    require.ensure(
        [],
        ()=>{
            // 成功
            require('./zujian.jsx')
        },
        ()=>{
            // 失败
        },
        "name"
    )
}
a()
