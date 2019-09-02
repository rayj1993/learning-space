let cssInfo = [
    [
        'asdasdasd',
        'asdasd'
    ]
]
let domInfo = [
    [
        'asdasdasd',
        'asdasd'
    ]
]
let jsInfo = [
    [
        'asdasdasd',
        'asdasd'
    ]
]
// 1. 关于HTML语义：article用在非常大段的完整的描述内容上。header是表示非常完整的整页的头部，不是具体某一两个标题头。对于一个文字列表的标题，级别h3~h6之间，通常是h3, h4（概率更大）。链接，一定要使用<a>元素。
// 2. 还是关于HTML语义：dl>dt+dd这里也是不合适的，虽然也是列表，但是这个是“定义列表(define list)>定义标题+定义描述”，这个一般用在对特定描述的解释上。比方说JS API解释。
// 3. 就是关于<a>链接的区域，应该wrap整个列表。为了和移动端的交互体验保持一致（方便胡萝卜一样的粗的手指可以精准点击）。a元素里面是可以放置块状元素的。比较好的HTML语义结构应该是：section>h4+ul>li>a
// 4. 两栏自适应布局，之前有小测，这里就不重复展开，但是，要介绍一个比较有意思的实现：liyongleihf2006，使用text-indent负值，这个场景是相当合适的。
// 5. 多行打点：display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; 多行打点 overflow:hidden不是必需的，和单行ellipsis不一样。然后可能有些小伙伴不知道的是：Firefox目前也支持了-webkit-box打点。
// 6. 关于固有宽度，固有比例。这个《CSS世界》有介绍，在content内容生成那里url(xxx.png)。list-style-image: url(icon.svg)也是一样的，CSS的width/height是无法控制图片的尺寸的。