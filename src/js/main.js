// js
import $ from 'jquery'
import CodeMirror from 'codemirror/lib/codemirror'
import marked from 'marked'
import malarkey from 'malarkey'

import 'codemirror/mode/markdown/markdown'

// css
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-dark.css'
import 'github-markdown-css/github-markdown.css'
import '../css/style.css'

// ok, begin

// content
var content = `
![avatar](http://wx3.sinaimg.cn/large/0072Njp2ly1foxjbc06mwj30go0b4751.jpg)

Hi! 我是SqMax 
===========================

## About Me

目前是刚入行的野生程序猿

- {C\\ , Java\\ }Programmer
- 专注于Java Web后端
- 会一点点前端

最近在搭建个人博客，一不小心就发现很多好玩的东西。

## Contact Me

你可以从下面这些地方找到我

- [GitHub](https://www.github.com/sqmax)
- [个人网站](http://www.sqmax.top)
- [新浪微博](http://weibo.com/sqmax)
- [网易云音乐](http://music.163.com/#/user/home?id=1375636217)
- [知乎](https://www.zhihu.com/people/sqmax)
- [给我发email](mailto: sqpolar@gmail.com)
`

// CodeMirror editor
var editor = CodeMirror.fromTextArea($('#editor').get(0), {
  mode: 'markdown',
  lineNumbers: true,
  lineWrapping: true,
  theme: "base16-dark",
});

// marked markdown render
var renderer = new marked.Renderer();

// override superlink
renderer.link = (href, title, text) => {
  return `<a href="${href}" target="_blank">${text}</a>`
}

marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

function editorOnChange(cm, co) {
  $('.markdown-body').html(marked(cm.getValue()));
  $('.preview-wrap').scrollTop($('.preview-wrap')[0].scrollHeight);
  cm.scrollTo(0, cm.getScrollInfo().height);
}

editor.on('change', editorOnChange);

// malarkey typing effect
var type_opts = {
  typeSpeed: 15,
  loop: false,
  getter: function(elem) {
    return editor.getValue();
  },
  setter: function(elem, val) {
    return editor.setValue(val);
  }
};

malarkey(editor, type_opts).type(content);
