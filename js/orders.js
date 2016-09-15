$(function ($) {

    addMultiEditable();

    $('.orderStepBtn').on ('click', function () {
        $($(this).attr('href')).addClass('active').siblings().removeClass('active');
        return false;
    });

    $('.bankProgSelect').on ('change', function () {
        $(this).closest('.bankProgRow').find('.bankProgCheck').prop('checked', 'checked')
    });

    $('.editBtn').on('click', function () {
        var firedEl = $(this), infoBox = firedEl.closest('.infoBox');

        if (infoBox.hasClass('edit_mode')) {
            infoBox.removeClass('edit_mode').find('form').submit();

            setTimeout(function () {
                infoBox.find('.orderTableRow').each(function (ind) {
                    rowToggler($(this));
                });
            }, 1);

        } else {
            infoBox.addClass('edit_mode').find('.edit, .edit_select, .edit_select_attach, .edit_select_multi, .edit_textarea').dblclick();
            infoBox.find('.orderTableRow').show();
        }

        return false;
    });

    $("input").filter(function (i, el) {
        return $(el).attr('data-inputmask') != void 0;
    }).inputmask();
    
    $('.select2').each(function (ind) {
        var slct = $(this);

        slct.select2({
            allowClear: false,
            //closeOnSelect: true,
            preventClosing: true,
            placeholder: '',
            minimumResultsForSearch: Infinity,
            width: '100%',
            dropdownParent: slct.parent(),
            //containerCssClass: settings.containerCssClass,
            adaptDropdownCssClass: function (c) {

            }
        })

    });

    $('.file_name').on('change', function () {
        var el = $(this);
        el.next().text(el.val())
    });

    $('.autogrow', this).autogrow({
        lineHeight: 14,
        minHeight: 22
    });

    $('.openOrderRow').on('click', function () {
        var firedEl = $(this);

        firedEl.toggleClass('opened').next().slideToggle();

        return false;
    });

    $('.orderCollapseBtn').on('click', function () {
        var firedEl = $(this);

        firedEl.parent().toggleClass('summary_opened').find('.orderSummary').slideToggle();

        return false;
    });

    $('.edit').editable(function (value, settings) {
        return value;
    }, {
        indicator: 'Saving...',
        select: true,
        width: '100px',
        height: '22px',
        cssclass: 'edit_v1',
        onblur: 'ignore',
        event: "dblclick",
        placeholder: '',
        callback: function (value, settings) {

        },
        onreset: function (settings, el) {

        }
    });


    $('.edit_select').each(function (ind) {
        var el = $(this);

        el.editable(function (value, settings) {
            var ret = '', el = $(this), json = JSON.parse(el.attr('data-option')), selectedVals = [];

            json['selected'] = value;

            el.attr('data-option', JSON.stringify(json));

            return value;
        }, {
            indicator: 'Saving...',
            type: 'single',
            placeholder: '',
            onblur: 'ignore',
            containerCssClass: 'select_v4',
            dropdownCssClass: 'select_d4',
            event: "dblclick",
            cssclass: 'edit_v3',
            callback: function (value, settings) {

            },
            onreset: function (settings, el) {

            }
        });
    });

    $('.edit_textarea').each(function (ind) {
        var el = $(this);

        el.editable(function (value, settings) {
            return value;
        }, {
            indicator: 'Saving...',
            type: 'textarea',
            placeholder: '',
            onblur: 'ignore',
            event: "dblclick",
            cssclass: 'edit_v3',
            autogrow: {
                lineHeight: 14,
                minHeight: 22
            },
            callback: function (value, settings) {

            },
            onreset: function (settings, el) {

            }
        });
    });

    $('.edit_select_attach').each(function (ind) {
        var el = $(this);

        el.editable(function (value, settings) {
            var ret = '', el = $(this), json = JSON.parse(el.attr('data-option')), selectedVals = [];

            json['selected'] = value.replace(/:.*/, '');

            el.attr('data-option', JSON.stringify(json));

            return value;
        }, {
            indicator: 'Saving...',
            type: 'single_attach',
            placeholder: '',
            onblur: 'ignore',
            containerCssClass: 'select_v4',
            dropdownCssClass: 'select_d4',
            event: "dblclick",
            cssclass: 'edit_v2',
            labelclass: 'file_label',
            labeltext: 'Выбрать файлы',
            callback: function (value, settings) {

            },
            onreset: function (settings, el) {

            }

        })

    });

    $('.edit_select_multi').each(function (ind) {
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

    $.editable.addInputType('textarea', {
        element: function (settings, original) {
            var textarea = $('<textarea />');
            if (settings.rows) {
                textarea.attr('rows', settings.rows);
            } else {
                textarea.height(settings.height);
            }
            if (settings.cols) {
                textarea.attr('cols', settings.cols);
            } else {
                textarea.width(settings.width);
            }
            $(this).append(textarea);
            return (textarea);
        },
        plugin: function (settings, original) {
            $('textarea', this).autogrow(settings.autogrow);
        }
    });
    
    $.editable.addInputType('single', {

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
            var input = $('<select>');
            $(this).append(input);
            return (input);
        },
        plugin: function (settings, original) {

            $('select', this)
                .on("select2:close", function (e) {

                })
                .select2({
                    //allowClear: true,
                    //closeOnSelect: false,
                    preventClosing: true,
                    placeholder: '',
                    minimumResultsForSearch: Infinity,
                    width: '100%',
                    dropdownParent: $(this),
                    containerCssClass: settings.containerCssClass,
                    adaptDropdownCssClass: function (c) {
                        //console.log(settings.dropdownCssClass);
                        return settings.dropdownCssClass;
                    }
                });
        }
    });

    $.editable.addInputType('single_attach', {

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
            var input = $('<input class="hidden_input submit_val">'), select = $('<select />'), 
                attach = $('<label />')
                    .addClass(settings.labelclass)
                    .append($('<input class="hidden_input file_name" type="file">'))
                    .append($('<span />').text(settings.labeltext));

            $('.file_name', attach).on('change', function () {
                var el = $(this);
                el.next().text(el.val())
            });

            $(this).append(input).append(select).append(attach);

            return (input);
        },
        submit: function (settings, original) {
            var file = $('.file_name', this), select = $('select option:selected', this).text();

            $('.submit_val', this).val(file[0].files ? select + ': ' + file.val() : '');

        },

        plugin: function (settings, original) {

            $('select', this)
                .on("select2:close", function (e) {

                })
                .select2({
                    //allowClear: true,
                    //closeOnSelect: false,
                    preventClosing: true,
                    placeholder: '',
                    minimumResultsForSearch: Infinity,
                    width: '100%',
                    dropdownParent: $(this),
                    containerCssClass: settings.containerCssClass,
                    adaptDropdownCssClass: function (c) {
                        //console.log(settings.dropdownCssClass);
                        return settings.dropdownCssClass;
                    }
                });
        }
    });

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
                        //console.log(settings.dropdownCssClass);
                        return settings.dropdownCssClass;
                    }
                }).select2("open");
        }
    });
}