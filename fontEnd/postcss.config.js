

const Autoprefixer = require('autoprefixer')
const PostcssPresetEnv = require('postcss-preset-env')


const Oldie = require('oldie')
const PostcssColorRgbaFallback = require('postcss-color-rgba-fallback')
const PostcssOpacity = require('postcss-opacity')
const PostcssPseudoelements = require('postcss-pseudoelements')
const PostcssVmin = require('postcss-vmin')
const Pixrem = require('pixrem')
const PostcssWillChange = require('postcss-will-change')
const PostcssColorAlpha= require('postcss-color-alpha')



module.exports = {
    plugins: [
        // 添加浏览器前缀
        Autoprefixer({
            // 指定加前缀的浏览器  配置项：https://github.com/browserslist/browserslist
            // browsers:[""]
        }),
        // 支持新特性
        PostcssPresetEnv(),
        // 兼容ie8（目前有7个）
        Oldie(),
        PostcssColorRgbaFallback(),
        PostcssOpacity(),
        PostcssPseudoelements(),
        PostcssVmin(),
        Pixrem(),
        PostcssWillChange(),
        PostcssColorAlpha()
    ]
}