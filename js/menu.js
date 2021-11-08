document.onclick = hideMenu;
window.oncontextmenu = rightClick;

function hideMenu() {
    document.getElementById("contextMenu")
        .style.transform = "scale(0)"
    setTimeout(() => {
        document.getElementById("contextMenu")
            .style.display = 'none'
    }, 200)
}

function rightClick(e) {
    e.preventDefault();
    var menu = document.getElementById("contextMenu")
    if (window.innerWidth - e.clientX <= menu.getBoundingClientRect().width) {
        if (e.clientY >= menu.getBoundingClientRect().height) {

            menu.style.display = 'block';
            menu.style.transform = 'scale(1)';
            menu.style.left = e.pageX - menu.getBoundingClientRect().width + "px";
            menu.style.top = e.pageY - menu.getBoundingClientRect().height + "px";
        } else {
            menu.style.display = 'block';
            menu.style.transform = 'scale(1)';
            menu.style.left = e.pageX - menu.getBoundingClientRect().width + "px";
            menu.style.top = e.pageY + "px";
        }
    } else if (window.innerHeight - e.clientY <= menu.getBoundingClientRect().height) {
        menu.style.display = 'block';
        menu.style.transform = 'scale(1)';
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY - menu.getBoundingClientRect().height + "px";
    } else {
        menu.style.display = 'block';
        menu.style.transform = 'scale(1)';
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
    }
}