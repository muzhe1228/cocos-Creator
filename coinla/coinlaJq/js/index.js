$(document).ready(function () {
    var sortDom = function (flag, $domlist) {
        var $item = $domlist.find('.table_cont');
        var $newList = Array.prototype.sort.call($item, function (a, b) {
            return flag ? ($(a).find('.pric').html() - 0) - ($(b).find('.pric').html() - 0) : ($(b).find('.pric').html() - 0) - ($(a).find('.pric').html() - 0)
        });
        return $newList;
    }
    setSelect('.selectWrap1', function (attr, val) {

        var $domlist = $('.sorAll');
        var $result = sortDom(true, $domlist);
        $('.sorAll').html($result);

    })
    setSelect('.selectWrap2', function (attr, val) {

        var $domlist = $('.sorAll');
        var $result = sortDom(false, $domlist);
        $('.sorAll').html($result);
    })
})