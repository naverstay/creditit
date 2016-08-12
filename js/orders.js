$(function ($) {

    addMultiEditable();

    $('.editBtn').on ('click', function () {
        var firedEl = $(this), infoBox = firedEl.closest('.infoBox');

        if (infoBox.hasClass('edit_mode')) {
            infoBox.removeClass('edit_mode').find('form').submit();

            setTimeout(function () {
                infoBox.find('.orderTableRow').each(function (ind) {
                    rowToggler($(this));
                });
            }, 1);

        } else {
            infoBox.addClass('edit_mode').find('.edit, .edit_select').dblclick();
            infoBox.find('.orderTableRow').show();
        }

        return false;
    });

    $('.openOrderRow').on ('click', function () {
        var firedEl = $(this);

        firedEl.toggleClass('opened').next().slideToggle();

        return false;
    });

    $('.edit').editable(function (value, settings) {
        return value;
    }, {
        indicator: 'Saving...',
        select: true,
        width: '100px',
        height: '22px',
        onblur: 'ignore',
        event: "dblclick",
        placeholder: '',
        cssclass: 'edit_v1',
        callback: function (value, settings) {
            console.log(value, settings);
        },
        onreset: function (settings, el) {

        }
    });


    $('.edit_select').each(function (ind) {
        var el = $(this);

        el.editable(function (value, settings) {
            var ret = '', el = $(this), json = JSON.parse(el.attr('data-option')), selectedVals = [];

            if (value) {
                for (var i = 0; i < value.length; i++) {
                    ret += value[i] + ", ";
                    selectedVals.push(value[i]);
                }
            } else {
                selectedVals.push('');
            }

            json['selected'] = selectedVals;

            el.attr('data-option', JSON.stringify(json));

            return ret.replace(/, $/, '');
        }, {
            indicator: 'Saving...',
            type: 'multi',
            placeholder: '',
            onblur: 'ignore',
            containerCssClass: 'select_v3',
            dropdownCssClass: 'select_d3',
            event: "dblclick",
            cssclass: 'edit_v1',
            callback: function (value, settings) {

            },
            onreset: function (settings, el) {

            }

        })

    });

});


function rowToggler(row) {
    var vis = false;

    row.find('.order_info_val').each(function (ind) {
        if ($(this).text().length > 0) {
            vis = true;
        }
    });

    row.toggle(vis);

}

function addMultiEditable() {

    $.editable.addInputType('multi', {

        content: function (data, settings, original) {

            data = $(original).attr('data-option');

            var selectedVals = [];
            /* If it is string assume it is json. */
            if (String == data.constructor) {
                eval('var json = ' + data);
            } else {
                /* Otherwise assume it is a hash already. */
                var json = data;
            }

            $('select', this).append($('<option disabled />').val(''));

            for (var key in json) {
                if (!json.hasOwnProperty(key)) {
                    continue;
                }
                if ('selected' == key) {
                    if (typeof json[key] == 'string') {
                        selectedVals.push(json[key]);
                    } else if (typeof json[key] == 'object') {
                        for (var i = 0; i < json[key].length; i++) {
                            selectedVals.push(json[key][i]);
                        }
                    }
                    continue;
                }
                var option = $('<option />').val(key).append(json[key]);
                $('select', this).append(option);
            }
            /* Loop option again to set selected. IE needed this... */
            for (var i = 0; i < selectedVals.length; i++) {
                $('select', this).children().each(function () {
                    if ($(this).val() == selectedVals[i] ||
                        $(this).text() == $.trim(original.revert)) {
                        $(this).attr('selected', 'selected');
                    }
                });
            }
        },
        element: function (settings, original) {
            var input = $('<select multiple>');
            $(this).append(input);
            return (input);
        },
        plugin: function (settings, original) {

            $('select', this)
                .on("select2:close", function (e) {
                    $(e.target).select2("open");
                })
                .select2({
                    //allowClear: true,
                    closeOnSelect: false,
                    preventClosing: true,
                    placeholder: '',
                    minimumResultsForSearch: Infinity,
                    width: '100%',
                    dropdownParent: $(this),
                    containerCssClass: settings.containerCssClass,
                    adaptDropdownCssClass: function (c) {
                        console.log(settings.dropdownCssClass);
                        return settings.dropdownCssClass;
                    }
                }).select2("open");
        }
    });
}