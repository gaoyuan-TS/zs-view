export const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
    // ['blockquote', 'code-block'],     //引用，代码块
    [{ 'header': 1 }, { 'header': 2 }],        // 标题，键值对的形式；1、2表示字体大小
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],     //列表
    // [{ 'script': 'sub'}, { 'script': 'super' }],   // 上下标// superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],     // 缩进 // outdent/indent
    [{ 'direction': 'rtl' }],             // 文本方向
    [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题
    [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
    [{ 'font': [] }],     //字体
    [{ 'align': [] }],    //对齐方式
    ['clean'],    //清除字体样式
    ['image','video']    //上传图片、上传视频
];

export const titleConfig = {
  'ql-bold':'加粗',
  'ql-color':'颜色',
  'ql-font':'字体',
  'ql-code':'插入代码',
  'ql-italic':'斜体',
  'ql-link':'添加链接',
  'ql-background':'背景颜色',
  'ql-size':'字体大小',
  'ql-strike':'删除线',
  'ql-script':'上标/下标',
  'ql-underline':'下划线',
  'ql-blockquote':'引用',
  'ql-header':'标题',
  'ql-indent':'缩进',
  'ql-list':'列表',
  'ql-align':'文本对齐',
  'ql-direction':'文本方向',
  'ql-code-block':'代码块',
  'ql-formula':'公式',
  'ql-image':'图片',
  'ql-video':'视频',
  'ql-clean':'清除字体样式'
};