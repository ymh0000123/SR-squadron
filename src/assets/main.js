import './fadeOut.css'
document.addEventListener("DOMContentLoaded", function () {
    function set() {
        const leftmenuElement = document.getElementById("left-menu");
        if (!leftmenuElement) return;
        const mainElement = document.getElementById("main");
        if (!mainElement) return;
        mainElement.style.marginLeft = leftmenuElement.offsetWidth + "px";
    }

    // 初始化时调用
    set();

    window.addEventListener("resize", set);
});
document.title = import.meta.env.VITE_NAME;
