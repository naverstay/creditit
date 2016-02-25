var body_var,
    global_window_Height,
    popupOrderItem,
    controlPanelBtn,
    order_tabs,
    popupBtn;

$(function ($) {

    body_var = $('body');
    global_window_Height = $(window).height();
    popupOrderItem = $('.popup_order_item');
    controlPanelBtn = $('.controlPanelBtn');
    popupBtn = $('.popupBtn');

    $('.select2').select2({
        placeholder: "Выберите из списка",
        allowClear: true,
        minimumResultsForSearch: 20,
        width: '100%'
    });

    order_tabs = $('.tabBlock').tabs({
        active: 0,
        activate: function (e, u) {

        }
    });

    $('.openOrderBtn').on('click', function () {
        var firedEl = $(this);
        firedEl.find('.sort_order').toggleClass('opened').closest('.orderRowMain').toggleClass('opened').next('.orderRowInfo').toggle().toggleClass('opened');

        return false;
    });

    all_dialog_close();

});

function all_dialog_close() {
    body_var.on('click', '.ui-widget-overlay', all_dialog_close_gl);
}

function all_dialog_close_gl() {
    $(".ui-dialog-content").each(function () {
        var $this = $(this);
        if (!$this.parent().hasClass('always_open')) {
            $this.dialog("close");
        }
    });
}