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

    $('.calendarInput').each(function () {
        var datePckr = $(this);

        datePckr.datepicker({
            firstDay: 1,
            dateFormat: datePckr.attr('data-format') || 'dd/mm/yy',
            //changeMonth: true,
            changeYear: true,
            showOtherMonths: true,
            buttonText: '',
            defaultDate: +1,
            showOn: "both",
            nextText: '',
            prevText: '',
            monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
            monthNamesShort: ["Янв", "Фев", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сен", "Окт", "Ноя", "Дек"],
            dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
            dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
            beforeShow: function (input, inst) {
                $(inst.dpDiv).addClass("datepicker_v1 select_v2");
            }
        });
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

    $('.disableChecker').on('change', function () {
        var firedEl = $(this), checked = firedEl.is(':checked');

        if (firedEl.attr('data-disable-invert') == 'true') {
            checked = !checked;
        }

        $(".disableToggle[data-disable='" + firedEl.attr('data-disable') + "']").toggleClass('cell_disabled', !checked).each(function (ind) {
            if (checked) {
                $(this).find('input').removeAttr('disabled');
            } else {
                $(this).find('input').attr('disabled', 'disabled');
            }
        });

    });

    var updateDatepickerOriginal = $.datepicker._updateDatepicker;
    $.datepicker._updateDatepicker = function () {
        var response = updateDatepickerOriginal.apply(this, arguments);
        this.dpDiv.find('.ui-datepicker-year').select2({
            minimumResultsForSearch: 10,
            width: '5.4em'
        });
        return response;
    };

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