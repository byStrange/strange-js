let play = document.querySelector(`.play`);
let output = document.querySelector(`.output`);
let clear = document.querySelector(`.reset`);
const setting = settings.app.settings
clear.onclick = __trueCleaner
window.onload = function() {
    console.log('Editor started... ');
    editor.setOption('tabSize', setting.tab_size);
    editor.setOption('mode', 'htmlmixed');
    if (setting.color_scheme.name == 'Mariana') {
        st = document.createElement('style');
        st.innerText = setting.color_scheme.style;
        document.head.appendChild(st)
    }
}

function __trueCleaner() {
    editor.setValue('')
}

document.querySelector('#holder').onmousedown = function() {
    window.onmousemove = function(e) {
        if (!(e.clientX >= 200)) {
            document.querySelector('.text-control').style.width = e.clientX + 'px';
            if (e.clientX <= 50) {
                document.querySelector('.text-control').style.width = 0;
                setTimeout(() => {
                    document.querySelector('.text-control').style.display = 'none';
                    document.querySelector('#holder').style.display = 'none'
                }, 200)
            }
        } else {
            document.querySelector('.text-control').style.width = 200 + 'px'
        }
    }
}
document.querySelector('#holder').onmouseup = function() {
    window.onmousemove = null
}
window.onmouseup = function() {
        window.onmousemove = null
    }
    // let iswindOpened = false 
    // let a
    // play.onclick = function() {
    // 	if(!iswindOpened) {
    // 		iswindOpened = true
    // 		let  wind = window.open('','',`width=${window.innerWidth},height=${window.innerHeight},navbar=false`);
    // 		a = wind
    // 		wind.document.documentElement.innerHTML = ''
    // 		wind.document.documentElement.innerHTML = editor.getValue();
    // 	}
    // 	else {
    // 		a.focus()
    // 	}


// }
let counter = 0
play.onclick = live

function live() {
    if (counter != 1) {
        op()
    }
    if (win.closed) {
        counter = 0;
        op()
    } else {
        win.focus();
        win.document.body.innerHTML = editor.getValue();
    }
}

function op() {
    win = window.open('', '', 'width: 450px; height: 500px');
    win.name = "Programm"
    win.document.body.innerHTML = editor.getValue();
    counter += 1
}

let fileHandle;
async function button() {
    [fileHandle] = await window.showOpenFilePicker();
    let fileData = await fileHandle.getFile();
    if (fileData.name.split('.')[1] == 'html') {
        editor.setOption('mode', 'htmlmixed')
    } else if (fileData.name.split('.')[1] == 'js') {
        editor.setOption('mode', 'javascript')
    } else if (fileData.name.split('.')[1] == 'css') {
        editor.setOption('mode', 'css')
    } else {
        editor.setOption('mode', 'text')
    }
    // document.querySelector('.text-control').style.display = 'none'
    // document.querySelector('#holder').style.display = 'none'
    document.querySelector('.save').style.display = 'inline-block'
    let text = await fileData.text()
    editor.setValue(text)
}

function loadSettingsText() {
    document.querySelector('#footer-tabsize').innerText = editor.options.tabSize
    document.querySelector('#footer-line').innerText = editor.getCursor().line + 1
    document.querySelector('#footer-column').innerText = editor.getCursor().ch;
    document.querySelector('#footer-syntax').innerText = editor.options.mode.replace('mixed', '');
}
setInterval(loadSettingsText, 100)
async function save() {
    let stream = await fileHandle.createWritable();
    await stream.write(editor.getValue())
    await stream.close()
}
async function saveAs() {
    fileHandle = await window.showSaveFilePicker();
    save()
}
window.onresize = function() {
    document.querySelector('footer.abs').style.top = window.innerHeight - 25 + 'px'
}
window.onresize()

function clearr() {
    editor.setValue('');
}
// const tabs = document.querySelectorAll('.tabs #tab');
// function tabs() {
// 	for(let c = 0; c < workers.length; c++) {
// 		const tab = `<div id="tab" class="tab">
// 		<span id="tab-name"> 
// 			${} 
// 		</span>
// 		<span id="close" class="close">&times</span>
// 	</div>`
// 	}
// }
document.querySelector('[data-work=new_file]').onclick = function() {
    document.querySelector('.modal-choose').style.transform = 'translate(-50%,-50%) scale(1)';
    setTimeout(() => {
        document.querySelector('.st-bg').style.display = 'block';
        document.querySelector('.st-bg').style.transform = 'scale(1)'
    }, 100)
}
od = -1
co = 0
document.querySelector('[data-type=html]').onclick = function() {
    od += 1
    if (od == 0) {
        const int = document.createElement('input');
        int.id = 'htmlInput';
        int.className = 'form-control';
        int.placeholder = 'Enter name';
        this.appendChild(int);
    }
    document.querySelector('#htmlInput').onkeyup = function(e) {
        if (e.which == 13) {
            var tk = document.querySelectorAll(
                'div.tabs div.tab'
            )
            for (a of tk) {
                a.classList.remove('active-tab')
            }
            const tabInner = `<div id="tab" class="tab active-tab" data-tab="${co}" data-lang="htmlmixed">
 		<i class="fa-brands fa-html5" style="color: rgb(213,104,47);"></i>
        <span id="tab-name"> 
 			${this.value}.html 
 		</span>
 		<span id="close" class="close">&times</span>
	</div>`
            co += 1
            document.querySelector('.tabs').innerHTML += tabInner;
            editor.focus();
            // editor.setOption('mode', 'htmlmixed');
            document.querySelector('.st-bg').style.transform = 'scale(0)'
            let close = document.querySelectorAll('#close');
            for (let kn = 0; kn < close.length; kn++) {
                close[kn].onclick = function() {
                    this.parentNode.remove();
                    editor.setValue(bvb['codeHtml0'])
                }
            }
            let elem = document.querySelectorAll('#tab');
            for (let i = 0; i < elem.length; i++) {
                elem[i].onclick = function() {
                    let j = 0;
                    while (j < elem.length) {
                        elem[j].className = 'tab';
                        j++
                    }
                    // this.classList.add('active-tab')
                    this.className = 'tab active-tab'
                    let nt = this.getAttribute('data-tab')
                    editor.setValue(bvb['codeHtml' + nt]);
                    let lang = this.getAttribute('data-lang');
                    editor.setOption('mode','htmlmixed')
                    editor.focus()
                }
            }
        }
    }
}

const bvb = {}
document.onkeyup = function(e) {
    const el = document.querySelectorAll('.tabs .tab');
    if (el) {
        for (let i = 0; i < el.length; i++) {
            if (
                el[i].classList.value.includes('active-tab')
            ) {
                bvb['codeHtml' + i] = editor.getValue()
            }
        }
    }
}
om = -1
document.querySelector('[data-type=css]').onclick = function() {
    om += 1
    if (om == 0) {
        const intCss = document.createElement('input');
        intCss.className = 'form-control';
        intCss.id = 'cssInput';
        intCss.className = 'form-control';
        intCss.placeholder = 'Enter name'
        this.appendChild(intCss)
    }
    document.querySelector('#cssInput').onkeyup = function(e) {
        if (e.which == 13) {
            var tk = document.querySelectorAll(
                'div.tabs div.tab'
            )
            for (a of tk) {
                a.classList.remove('active-tab')
            }
            const tabInner = `<div id="tab" class="tab active-tab" data-tab="${co}" data-lang="css">
        <i class="fa-brands fa-css3-alt" style="color: rgb(68,114,207);"></i>
        <span id="tab-name"> 
            ${this.value}.css 
        </span>
        <span id="close" class="close">&times</span>
    </div>`
            co += 1
            document.querySelector('.tabs').innerHTML += tabInner;
            editor.focus();
            // editor.setOption('mode', 'css');
            document.querySelector('.st-bg').style.transform = 'scale(0)'
            let close = document.querySelectorAll('#close');
            for (let kn = 0; kn < close.length; kn++) {
                close[kn].onclick = function() {
                    this.parentNode.remove();
                    editor.setValue(bvb['codeHtml0'])
                }
            }
            let elem = document.querySelectorAll('#tab');
            for (let i = 0; i < elem.length; i++) {
                elem[i].onclick = function() {
                    let j = 0;
                    while (j < elem.length) {
                        elem[j].className = 'tab';
                        j++
                    }
                    // this.classList.add('active-tab')
                    this.className = 'tab active-tab'
                    let nt = this.getAttribute('data-tab')
                    editor.setValue(bvb['codeHtml' + nt]);
                   let lang = this.getAttribute('data-lang');
                    editor.setOption('mode',lang)
                    editor.focus()
                }
            }
        }
    }
}
oj = -1
document.querySelector('[data-type=js]').onclick = function() {
    oj += 1
    if (oj == 0) {
        const intJs = document.createElement('input');
        intJs.className = 'form-control';
        intJs.id = 'jsInput';
        intJs.className = 'form-control';
        intJs.placeholder = 'Enter name'
        this.appendChild(intJs);
    }
    document.querySelector('#jsInput').onkeyup = function(e) {
        if (e.which == 13) {
            var tk = document.querySelectorAll(
                'div.tabs div.tab'
            )
            for (a of tk) {
                a.classList.remove('active-tab')
            }
            const tabInner = `<div id="tab" class="tab active-tab" data-tab="${co}" data-lang="javascript">
        <i class="fa-brands fa-js-square" style="color: rgb(240, 219, 79);"></i>
        <span id="tab-name"> 
            ${this.value}.js 
        </span>
        <span id="close" class="close">&times</span>
    </div>`
            co += 1
            document.querySelector('.tabs').innerHTML += tabInner;
            editor.focus();
            // editor.setOption('mode', 'js');
            document.querySelector('.st-bg').style.transform = 'scale(0)'
            let close = document.querySelectorAll('#close');
            for (let kn = 0; kn < close.length; kn++) {
                close[kn].onclick = function() {
                    this.parentNode.remove();
                    editor.setValue(bvb['codeHtml0'])
                }
            }
            let elem = document.querySelectorAll('#tab');
            for (let i = 0; i < elem.length; i++) {
                elem[i].onclick = function() {
                    let j = 0;
                    while (j < elem.length) {
                        elem[j].className = 'tab';
                        j++
                    }
                    this.className = 'tab active-tab'
                    let nt = this.getAttribute('data-tab')
                    editor.setValue(bvb['codeHtml' + nt]);
                    let lang = this.getAttribute('data-lang');
                    editor.setOption('mode',lang)
                    editor.focus()
                }
            }
        }
    }
}


// document.querySelector('.first-kbd').innerText = `<div class=className>...</div>
// `;
// document.querySelector('.k-2').innerText = `<div class="">...</div>`;
// document.querySelector('.k-3').innerText = `<div id="">...</div>`;
// document.querySelector('.k-4').innerText = `<link>`;
// document
//     .querySelector('.k-5')
//     .innerText = ` <style></style>`
var counterResult = new Date().getDate() + ':' + new Date().getMonth() + ':' + new Date().getYear()

function saveTo() {
    var text = editor.getValue();
    var name = `Resut ${counterResult}`;
    var a = document.getElementById("a");
    if (editor.getOption('mode') == 'htmlmixed') {
        var type = 'text/html'
    } else if (editor.getOption('mode') == 'javascript') {
        var type = 'text/javascript'
    } else if (editor.getOption('mode') == 'css') {
        var type = 'text/css'
    } else {
        var type = 'text/text';
    }
    var file = new Blob([text], {
        type: type
    });
    a.href = URL.createObjectURL(file);
    a.download = name;
}

// function that() {
//     document.querySelector('.modal-content')
//         .style
//         .top = `30px`
// }

CodeMirror.replace = function(element) {
    if (typeof element == "string")
        element = document.getElementById(element);
    return function(newElement) {
        element.parentNode.replaceChild(newElement, element);
    };
};
// setTimeout(that, 2000);
var editor = CodeMirror.fromTextArea(document.querySelector('textarea.form-control'), {
    lineNumbers: true,
    tabSize: 4,
    mode: 'htmlmixed',
    lineWrapping: true,
    smartIndent: true,
    addModeClass: true,
    matchBrackets: true
});
emmetCodeMirror(editor);
window.onclick = function(e) {
    // if (e.clientX > document.querySelector('.text-control').getBoundingClientRect().width && e.clientY <= window.innerHeight - 20) {
    //     editor.focus()
    // }
}