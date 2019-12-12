export default function (l) {
    var ret = '<img class="emptyTomato" src="../images/empty-tomato.svg" alt="empty-tomato">';

    for (let i = 0; i < l -1; i++) {
        ret = ret + '<img class="emptyTomato" src="../images/empty-tomato.svg" alt="empty-tomato">';
    }
    return ret
}