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

$(function($){

	body_var = $('body'),
			global_window_Height = $(window).height(),
			popupOrderItem = $('.popup_order_item'),
			controlPanelBtn = $('.controlPanelBtn'),
			popupBtn = $('.popupBtn');

	var header = $('.header'), doc = $(document),
			browserWindow = $(window);

	browserWindow.on('scroll', function(){
		var scrollLeft = doc.scrollLeft();
		header.css('marginLeft', (scrollLeft > 0 ? -scrollLeft : 0));
	});

	if(popupOrderItem.length){
		popupOrderItem.on('click', function(){
			$(this).toggleClass('popup_order_i_active');
			return false;
		});
	}

	if(controlPanelBtn.length){
		controlPanelBtn.on('click', function(){
			var firedEl = $(this);
			firedEl.toggleClass('control_panel_close_mod');
			$('.searchControlPanel').slideToggle(600);

			$('.pageWrapper').animate({paddingTop: firedEl.hasClass('control_panel_close_mod') ? 44 : 200}, 600);

			return false;
		});
	}

	if($('.chosen-select').length){
		$('.chosen-select').chosen({width: "100%", className: "form_o_b_item form_o_b_value_edit_mode"});
	}

	if($("#completed_orders_form").length){
		$completed_orders_form = new dialog('#completed_orders_form', 'dialog_global dialog_g_size_1 dialog_close_butt_mod_1', 'popupForm', false, '752', false, true);

		popupBtn.on('click', function(){

			$completed_orders_form.openDialog();
			return false;
		});

	}

	if($("#send_confirmation").length){
		$send_confirmation = new dialog('#send_confirmation', 'dialog_global dialog_g_size_1 dialog_close_butt_mod_1 no_close_mod title_center_mod dialog_butt_v1 dialog_color_schem_1', 'popupForm', false, '380', false, true);
	}

	if($("#send_to_client").length){
		$send_to_client = new dialog('#send_to_client', 'dialog_global dialog_g_size_1 dialog_close_butt_mod_1', 'popupForm', false, '752', false, true);
	}
	if($("#cart_orders_form").length){
		$cart_orders_form = new dialog('#cart_orders_form', 'dialog_global dialog_g_size_1 dialog_close_butt_mod_1', 'popupForm', false, '360', false, true);
//		$cart_orders_form.openDialog();
	}

	if($("#postpone_orders_form").length){
		$postpone_orders_form = new dialog('#postpone_orders_form', 'dialog_global dialog_g_size_1 dialog_close_butt_mod_1', 'popupForm', false, '360', false, true);
//		$postpone_orders_form.openDialog();
	}



	if($("#contacts_form").length){
		$contacts_form = new dialog('#contacts_form', 'dialog_global dialog_g_size_1 dialog_close_butt_mod_1', 'popupForm', false, '340', false, true);
//		$contacts_form.openDialog();
	}
	

	all_dialog_close();

});

function all_dialog_close() {
    body_var.on('click', '.ui-widget-overlay', all_dialog_close_gl);
}

function all_dialog_close_gl(){
	$(".ui-dialog-content").each(function () {
		var $this = $(this);
		if (!$this.parent().hasClass('always_open')) {
			$this.dialog("close");
		}
	});
}