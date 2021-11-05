	let input = document.querySelector(`[type=text]`);
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
	input.oninput = function() {
	    editor.setValue(this.value)
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
  	if(editor.getOption('mode') == 'htmlmixed') {
  		var type = 'text/html'
  	}
  	else if(editor.getOption('mode') == 'javascript') {
  		var type = 'text/javascript'
  	}
  	else if(editor.getOption('mode') == 'css') {
  		var type = 'text/css'
  	}
  	else {
  		var type = 'text/text';
  	}
  	var file = new Blob([text], {type: type});
  	a.href =  URL.createObjectURL(file);
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
	    if (e.clientX > document.querySelector('.text-control').getBoundingClientRect().width && e.clientY <= window.innerHeight - 20) {
	        editor.focus()
	    }
	}