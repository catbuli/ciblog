onload = function () {
    var click_cnt = 0;
    var html = document.getElementsByTagName("html")[0];
    var body = document.getElementsByTagName("body")[0];
    html.onclick = function (e) {
        var elem = document.createElement("b");
        elem.style.userSelect = "none";
        elem.style.color = "#E94F06";
        elem.style.zIndex = 9999;
        elem.style.position = "absolute";
        var x = e.pageX;
        var y = e.pageY;
        elem.style.left = (x - 10) + "px";
        elem.style.top = (y - 20) + "px";
        clearInterval(anim);
        switch (++click_cnt) {
            case 1:
                elem.innerText = "♠";
                break;
            case 2:
                elem.innerText = "♥";
                break;
            case 3:
                elem.innerText = "♦";
                break;
            case 4:
                elem.innerText = "♣";
                break;
            case 5:
                elem.innerText = "ヽ(•ω•。)ノ";
                break;
            case 6:
                elem.innerText = "ヽ(´•ω•`)､";
                break;
            case 7:
                elem.innerText = "(=ﾟωﾟ)ﾉ";
                break;
            case 8:
                elem.innerText = "ㄟ( ▔, ▔ )ㄏ ";
                break;
            case 9:
                elem.innerText = "∠( °ω°)／ ";
                break;
            case 10:
                elem.innerText = "OωO";
                break;
            case 15:
                elem.innerText = "(๑•́ ∀ •̀๑)";
                break;
            case 20:
                elem.innerText = "(๑•́ ₃ •̀๑)";
                break;
            case 25:
                elem.innerText = "(๑•̀_•́๑)";
                break;
            case 27:
                elem.innerText = "（￣へ￣）";
                break;
            case 29:
                elem.innerText = "(╯°口°)╯(┴—┴";
                break;
            case 33:
                elem.innerText = "૮( ᵒ̌皿ᵒ̌ )ა";
                break;
            case 37:
                elem.innerText = "╮(｡>口<｡)╭";
                break;
            case 40:
                elem.innerText = "ヾ(✿ﾟ▽ﾟ)ノ";
                break;
            case 41:
                elem.innerText = "ヽ(°▽、°)ﾉ";
                break;
            case 42:
                elem.innerText = "ヾ(o´∀｀o)ﾉ ";
                break;
            case 45:
                elem.innerText = "(ꐦ°᷄д°᷅)";
                break;
            default:
                elem.innerText = "☁";
                break;
        }
        if (click_cnt == 45) {
            click_cnt = 0;
        }
        elem.style.fontSize = Math.random() * 15 + 20 + "px";
        body.appendChild(elem);
        var increase = 0;
        var anim;
        setTimeout(function () {
            anim = setInterval(function () {
                if (++increase == 150) {
                    clearInterval(anim);
                    body.removeChild(elem);
                }
                elem.style.top = y - 20 - increase + "px";
                elem.style.opacity = (150 - increase) / 120;
            }, 8);
        }, 70);
    };
};