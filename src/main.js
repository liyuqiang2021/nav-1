const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last');
const x = localStorage.getItem('x')
// console.log('x')
// console.log(x)
const xObject = JSON.parse(x)
// console.log('xObject')
// console.log(xObject)
const hashMap = xObject || [
    { logo: 'S', url: 'http://hao.shejidaren.com/' },
    { logo: 'U', url: 'http://so.uigreat.com/' }
];

const simplifyUrl = (url) => {
    //simplifyUrl会把url变成新字符串，原字符串不变
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') //删除/开头的内容
};


const render = () => {
    $siteList.find('li:not(.last)').remove()  //render之前清空
    hashMap.forEach((node, index) => {
        // console.log(index)
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo[0]}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-del"></use>
                    </svg>
                </div>
            </div>
        </li>` ).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()  //阻止冒泡
            // console.log(hashMap)
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()

$('.addButton').on('click', () => {
    let url = window.prompt('请输入要添加的网址');
    if (url.indexOf('http') !== 0) {
        url = 'http://' + url;
    }
    console.log(url);
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url
    });
    render()
});

window.onbeforeunload = () => {
    // console.log('界面关闭')
    const string = JSON.stringify(hashMap)
    // console.log(typeof hashMap)
    // console.log(hashMap)
    // console.log(typeof string)
    // console.log(string)
    localStorage.setItem('x', string)
}

$(document).on('keypress', (e) => {
    // console.log(e.key)
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})