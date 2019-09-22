/**
 * @author wenjielei
 * @version 1.0.0
 * @created 19-09-22
 * @desc 希望配置完config中的unit之后，自动生成所有的步骤，而不是配置那么多东西还出错
 */

window.onload = function () {
    /**
     * 1. 根据unit生成父级btn
     */
    // 单元列表
    let menuList = document.getElementById('j-menu-list');
    // 题目列表
    let questions = document.getElementById('j-questions');
    // 临时容器
    let buttonNumber = 1;
    let unitTitleHtml = [];
    let unitContentHtml = [];
    let str = '';
    // 生成单元列表
    for (let i in unit) {
        if (buttonNumber === 1) {
            unitTitleHtml.push('<div class="btn-group">')
        }
        unitTitleHtml.push(`<button class="ui-button">${i}</button>`);
        buttonNumber++;
        if (buttonNumber === 4) {
            unitTitleHtml.push('</div>')
            buttonNumber = 1;
        }
        unitContentHtml.push('<div>');
        // 生成题目列表
        unit[i].forEach((element, index) => {
            // console.log(element);
            let number = ++index;
            if (i.match(/\d/g)) {
                str = '-'
            };
            unitContentHtml.push(`<button class="ui-button" 
                            title="${element}" 
                            data-unit="${i}" 
                            data-question="${i}${str}${number}">${element}</button>`);
        });
        unitContentHtml.push('</div>')
    };
    // 添加单元列表，题目列表
    menuList.innerHTML = unitTitleHtml.join('');
    questions.innerHTML = unitContentHtml.join('');

    // 为单元列表添加点击事件
    let menuListActive = menuList.childNodes[0].childNodes[0];
    let questionsActive = questions.childNodes[0];
    var questionsLists = Array.from(menuList.querySelectorAll('.ui-button'));
    menuList.addEventListener('click', function (event) {
        let element = event.target;
        // 需要一处
        if (element.className.includes('ui-button')) {
            // 添加active
            menuListActive.classList.remove('active');
            element.classList.add('active');
            menuListActive = element;
            // 对应题目列表的显隐
            let node = questions.childNodes[questionsLists.indexOf(element)];
            questionsActive.classList.remove('active');
            node.classList.add('active');
            questionsActive = node;
        }
    });

    // 本地html文件获取
    function loadXMLDoc(url) {
        var xmlhttp;
        if (window.XMLHttpRequest) {
            //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
            xmlhttp = new XMLHttpRequest();
        } else {
            // IE6, IE5 浏览器执行代码
            xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                // console.log(xmlhttp.responseText)
                editor.setValue(xmlhttp.responseText);
                return xmlhttp.responseText
            }
        }
        xmlhttp.open('GET', url, true);
        xmlhttp.send();
    }

    // url获取
    function getQueryStringArgs() {
        let qs = (location.search.length > 0 ? location.search.substring(1) : ""),
            args = {},
            items = qs.length ? qs.split('&') : [],
            item = null,
            name = null,
            value = null,
            i = 0,
            len = items.length;

        for (i = 0; i < len; i++) {
            item = items[i].split('=');
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            if (name.length) {
                args[name] = value;
            }
        }
        return args;
    };

    // 为题目列表添加点击事件

    let questionsBtnActive = questionsActive.childNodes[0];

    // frame
    let frame = document.getElementById('j-frame');

    let jQuestionImage = document.getElementById('j-question-image');


    questions.addEventListener('click', function (event, index) {
        let element = event.target;
        if (element.className.includes('ui-button')) {
            questionsBtnActive.classList.remove('active');
            element.classList.add('active');
            questionsBtnActive = element;
            // 移除数字
            let unit = element.getAttribute('data-unit');
            let question = element.getAttribute('data-question');
            // 获取数据，
            loadXMLDoc('pages/' + unit + '/' + question + '.html');
            frame.src = 'pages/' + unit + '/' + question + '.html';
            // 改变图片的地址
            jQuestionImage.setAttribute('src', 'images/' + unit + '/' + question + '.png');
            // 改变url地址
            history.pushState('', '', 'index.html?unit=' + unit + '&question=' + question);
        }
    });



    // 还要记录上次选中的状态
    let url = getQueryStringArgs().unit ? getQueryStringArgs() : {
        unit: 'css',
        question: 'css1'
    };

    // 加载本地html文件
    loadXMLDoc('pages/' + url.unit + '/' + url.question + '.html');

    // 初始image
    jQuestionImage.setAttribute('src', 'images/' + url.unit + '/' + url.question + '.png');

    // 初始化frame
    frame.src = 'pages/' + url.unit + '/' + url.question + '.html';

    // 初始化左侧栏active
    questionsLists.forEach(element => {
        if (element.innerText === url.unit) {
            element.classList.add('active');
            let node = questions.childNodes[questionsLists.indexOf(element)];
            node.classList.add('active');
            questionsActive = node;
            questionsActive.childNodes.forEach(element => {
                if (element.getAttribute('data-question') === url.question) {
                    // 第一次初始化
                    element.classList.add('active');
                    questionsBtnActive = element;
                    return;
                }
            });
            return;
        }
    });

    // 初始化textarea
    var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
        //实现javascript代码高亮
        mode: 'application/x-ejs',
        //显示行号
        lineNumbers: true,
        //设置主题
        theme: 'vscode-dark',
        //代码折叠
        lineWrapping: true,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        //括号匹配
        matchBrackets: true,
        //只读
        readOnly: true
    });
    editor.setSize('100%', '100%');



    // hover出现界面，点击界面之外地方，界面才会消失
    let menu = document.getElementById('j-menu');
    menu.addEventListener('mouseenter', function (event) {
        event.target.classList.add('active');
    });

    // 事件托管全局事件
    document.body.addEventListener('click', function (event) {
        if (event.target.closest('#j-menu')) {
            // console.log(event.target.closest('#j-menu'))
        } else {
            // 点击页面任意地方关闭左侧菜单
            menu.classList.remove('active');
        }
    });
}