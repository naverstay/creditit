var body_var,
    global_window_Height,
    popupOrderItem,
    controlPanelBtn,
    popupBtn,
    $completed_orders_form,
    $send_confirmation,
    $send_to_client,
    $cart_orders_form,
    $postpone_orders_form,
    $contacts_form;

$(function ($) {

    body_var = $('body'),
        global_window_Height = $(window).height(),
        popupOrderItem = $('.popup_order_item'),
        controlPanelBtn = $('.controlPanelBtn'),
        popupBtn = $('.popupBtn');

    var header = $('.header'), doc = $(document),
        browserWindow = $(window);

    browserWindow.on('scroll', function () {
        var scrollLeft = doc.scrollLeft();
        header.css('marginLeft', (scrollLeft > 0 ? -scrollLeft : 0));
    });

    $('.select2').select2({
        placeholder: "Выберите из списка",
        allowClear: true,
        minimumResultsForSearch: 20,
        width: '100%'
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