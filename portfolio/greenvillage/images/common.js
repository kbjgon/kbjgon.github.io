$(document).ready(function() {

/* DKI Firefox에서는 window.event가 없음 그래서 리스너에서 해당 이벤트로 전달 하도록 처리 
 * 삭제 금지.
 * */
if(navigator.userAgent.indexOf('Firefox') >= 0){
	var events = ["mousedown", "mouseover", "mouseout", "mousemove", "mousedrag", "click", "dblclick"];
	for (var i = 0; i < events.length; i++){
		window.addEventListener(events[i], function(e){ window.event = e;}, true);
	}
}

	
/* 전체카테고리보기 팝업 이동(updated 2014.03.03) */
$('.header_scroll>div').append($('#popup_total'));

/* tab 변경시 fullCalendar 렌더링 처리 */
$( "#tabs" ).tabs({
	activate: function(event, ui) {
		if ($('#calendar').length > 0)$('#calendar').fullCalendar('render');
	}
});

var tabs = $("#tabs").tabs();
 if ($('#footer.cp').length > 0) {
     tabs.find('.ui-tabs-anchor').click(function () {
         $(window).trigger('scroll');
     });
 }


var tabs = $("#tabs").tabs();
if ($('#footer.cp').length > 0) {
     tabs.find('.ui-tabs-anchor').click(function () {
         $(window).trigger('scroll');
     });
 }

/* tab over jhk */
$(".tabOver .tab_con:not("+$(".tabOver ul.tab_type2 li a.selected").attr("href")+")").hide();
$(".tabOver ul.tab_type2 li a").mouseenter(function(){
	$(".tabOver ul.tab_type2 li a").removeClass("selected");
	$(this).addClass("selected");
	$(".tabOver .tab_con").hide();
	$($(this).attr("href")).show();
	return false;
});


/* 달력 */
$( ".calendar" ).datepicker({
	dateFormat : 'yy-mm-dd',
	beforeShowDay : function(day) {
		if (eval("typeof onBeforeShowDay == 'function'")) {
			return onBeforeShowDay(day);
		} 
		return [true, ""];
	},
	onSelect: function(dateText, inst) {
		if (eval("typeof onSelectDatepicker == 'function'") ) {
			onSelectDatepicker(dateText, inst);
		}
	}
});
$( "#month_select" ).buttonset();

$( ".snb" ).accordion({
  collapsible: true
});
$( ".lnb" ).accordion({
	heightStyle: "content",
	active: false,
	autoHeight: false,
	collapsible: true,
	/* DKI 추가 #a인 경우 재 로딩 막기 */
	activate: function( e, ui ) {
		if ($(ui.newHeader).attr('href') != '#a') {
				choroc.util.sendForm($(ui.newHeader).attr('href'));
		}
		e.preventdefault();
	}
});
// header fixed
jQuery(function(j$) {
// header fixed
var myHeader = j$('.header_scroll');
myHeader.data( 'position', myHeader.position() );
j$(window).scroll(function(){
    var hPos = myHeader.data('position'), scroll = getScroll();
    /* null check */
    if (hPos) {
        if ( hPos.top < scroll.top ){
            myHeader.addClass('fixed');
        }
        else {
            myHeader.removeClass('fixed');
        }
    }
});

function getScroll () {
    var b = document.body;
    var e = document.documentElement;
    return {
        left: parseFloat( window.pageXOffset || b.scrollLeft || e.scrollLeft ),
        top: parseFloat( window.pageYOffset || b.scrollTop || e.scrollTop )
    };
}
// header fixed
});

//footer company
jQuery(function (j$) {
    var $visual = $('#visual'),
		$num = Math.floor((Math.random()*3)+1);
        $visual.addClass('v0'+$num);
    
    j$(window).scroll(function () {
        var cpFooter = j$('#footer.cp'),
        windowH = j$(window).innerHeight(),
        contH = j$('#contents').outerHeight(),
        scrollTop = j$(window).scrollTop();
        if (contH - 30 <= windowH + scrollTop) {
            cpFooter.addClass('show');
        }
        else {
            cpFooter.removeClass('show');
        }
    });


    var $contentsImg = $('#contents img');
    var contentsImgTotal = $contentsImg.length;
    var contentsImgLoaded = 0;
    $contentsImg.on('load', function (e) {
        contentsImgLoaded++;

        if (contentsImgLoaded >= contentsImgTotal) {
            j$(window).trigger('scroll');
        }
    });
    
});


// text value 초기화
var _val = $(".vals");
$(_val).focus(function(){
		clearField(this);
	});
$(_val).blur(function(){
		checkField(this);
	});
// 초기값인 상태라면 텍스트박스 값 지우기 : 워터마크 지우기
function clearField(field)
{
	if (field.value == field.defaultValue)
	{
		field.value = '';
	}
}
// 아무값도 입력되지 않았다면, 초기값으로 다시 지정 : 아이디/비밀번호
function checkField(field)
{
	if (field.value == '')
	{
		field.value = field.defaultValue;
	}
}
/* 표호버 */

var _hover = $('.product_list2 tbody tr');
$(_hover).mouseover(function(){
	if($(this).hasClass('tdFirst')){
		$(this).parent().prev('thead').find('tr').addClass('thLine');
	}
	$(this).addClass('line');
	$(this).prev('tr').addClass('line2');

	});
$(_hover).mouseout(function(){
	if($(this).hasClass('tdFirst')){
		$(this).parent().prev('thead').find('tr').removeClass('thLine');
	}
	$(this).removeClass('line');
	$(this).prev('tr').removeClass('line2');

	});

/* 체크박스 */
if(!$("body").hasClass("lt_ie9")) {
	$( "#check" ).button();
	$( "#checks" ).buttonset();
	$( "#check_" ).button();
	$( "#check_s" ).buttonset();
	$( "#check0_s" ).buttonset();
	$( "#check1_s" ).buttonset();
	$( "#check2_" ).button();
	$( "#check2_s" ).buttonset();
	$( "#check3_" ).button();
	$( "#check3_s" ).buttonset();
	$( "#check4_" ).button();
	$( "#check4_s" ).buttonset();
	$( "#check5_" ).button();
	$( "#check5_s" ).buttonset();
	$( "#check6_" ).button();
	$( "#check6_s" ).buttonset();
	$( "#check7_" ).button();
	$( "#check7_s" ).buttonset();
	$( "#check8_" ).button();
	$( "#check8_s" ).buttonset();
	$( "#check9_" ).button();
	$( "#check9_s" ).buttonset();
	$( "#check10_" ).button();
	$( "#check10_s" ).buttonset();
	$( "#check11_" ).button();
	$( "#check11_s" ).buttonset();
	$( "#FRQ_GOODS_CATE_" ).button();
	$( "#FRQ_GOODS_CATE" ).buttonset();
	$( "#set3s" ).button();
	$( "#set3" ).buttonset();
	$( "#set2s" ).button();
	$( "#set2" ).buttonset();
	$( "#radio" ).buttonset();
	$( "#radio2_" ).buttonset();
	$( "#radio3_" ).buttonset();
	$( "#radio4_" ).buttonset();
	$( "#radio5_" ).buttonset();
	$( "#radio6_" ).buttonset();
	$( "#radio7_" ).buttonset();
	$( "#radio8_" ).buttonset();
	$( "#radio9_" ).buttonset();
	$( "#radio10_" ).buttonset();
	$('table.type1.check_hide').buttonset();
} else {
	var bgNone = {'background': 'none','text-indent': '0'};
	var bgNoTitle = {'background': 'none','display': 'none','text-indent': '0'};

	$( "#check label" ).css(bgNone);
	$( "#checks label" ).css(bgNone);
	$( "#check_ label" ).css(bgNone);
	$( "#check_s label" ).css(bgNone);
	$( "#check2_ label" ).css(bgNone);
	$( "#check2_s label" ).css(bgNone);
	$( "#check3_ label" ).css(bgNone);
	$( "#check3_s label" ).css(bgNone);
	$( "#check4_ label" ).css(bgNone);
	$( "#check4_s label" ).css(bgNone);
	$( "#FRQ_GOODS_CATE_ label" ).css(bgNone);
	$( "#FRQ_GOODS_CATE label" ).css(bgNone);
	$( "#set3s label" ).css(bgNone);
	$( "#set3 label" ).css(bgNone);
	$( "#set2s label" ).css(bgNone);
	$( "#set2 label" ).css(bgNone);
	$( "#radio label" ).css(bgNone);
	$( "#radio2_ label" ).css(bgNone);
	$( "#radio3_ label" ).css(bgNone);
	$( "#radio4_ label" ).css(bgNone);
	$( "#radio5_ label" ).css(bgNone);
	$( "#radio6_ label" ).css(bgNone);
	$( "#radio7_ label" ).css(bgNone);
	$( "#radio8_ label" ).css(bgNone);
	$( "#radio9_ label" ).css(bgNone);
	$( "#radio10_ label" ).css(bgNone); 
}

/* 상품리스트 접힘 */
/* DKI 주석 풀지 마세요. DKI 초기 장바구니 UI 접힘 처리 */
$('.kind_box .btn').mouseenter(function(e) {
	//$(this).toggleClass('close');
	$('.kind_box .cate').removeClass('on');
	$('.kind_box .cate').next().find('.btn').removeClass('close');
	//$('.kind_box .bottom-area').toggleClass('on')
	e.preventDefault();
});
$('.kind_box').mouseleave(function(e) {
	//$(this).toggleClass('close');
	$('.kind_box .cate').addClass('on');
	$('.kind_box .cate').next().find('.btn').addClass('close');
	//$('.kind_box .bottom-area').toggleClass('on')
	e.preventDefault();
});
$('.jsShowHide').mouseenter(function(e) {
	$('.lyListWrap').addClass('on');
	e.preventDefault();
});
$('.hgroup').mouseleave(function(e) {
	$('.lyListWrap').removeClass('on');
	e.preventDefault();
});

$('.cart_box .btn').click(function(e) {
	$(this).toggleClass('close');
	$('.cart_box .cate').toggleClass('on');
	$('.cart_box').prev().toggleClass('on');
	$('.cart_box .bottom-area').toggleClass('on');
	e.preventDefault();
});

/* 퀵메뉴 */
/* DKI choroc에서 처리 하도록 이동. 변경 하지 마세요 */
$('#quick .more').click(function(e) {
	
	if (window.choroc) {
		if (window.choroc.quick) {
			window.choroc.quick.toggle();
		}
		$('#popup_total').removeClass("on");
	}
	e.preventDefault();
});
/* 퀵 장바구니 아이콘 */
$('#quick_cart').click(function(e){$('#quick_tab').tabs('option', 'active', 0);$('#quick .more').trigger('click');});
$('#quick_cart_sum').click(function(e){$('#quick_tab').tabs('option', 'active', 0);$('#quick .more').trigger('click');});
$('#quick_cart_deliv').click(function(e){$('#quick_tab').tabs('option', 'active', 0);$('#quick .more').trigger('click');});
$('#quick_today_view').click(function(e){$('#quick_tab').tabs('option', 'active', 1);$('#quick .more').trigger('click');});

/* END DKI */

/* select title자동 */
	var store_select = $("#store_wrap .store_product select");
	store_select.each(function() {
		var _select = $(this);
		var _title = _select.find('>option:first').html();
		_select.attr('title', _title + " 선택");
	});



	/* 검색css */
	$( "#header_wrap .search input" ).before( "<div class='after'></div>" );
	$( ".header_scroll .fav_view" ).after( "<div class='after'></div>" );


	/* faq */
	 $("table.faq .a div").hide();
	 $("table.faq .q a").click(function(e) {
		$(this).parent().parent().next(".a").find('div').slideToggle(500);
		e.preventDefault();
	});
	 $("table.type1 .q a").click(function(e) {
		$(this).find('span').toggleClass('ico_on');
		e.preventDefault();
	});


	/* 헤더 */
	var interval = null;
	var intervaltime = 10000;
	var animatetime = 1000;

	interval = setInterval(function() {
		var currentimg = $(".safety li.on");
		currentimg.removeClass("on");

		var nextimg = $(currentimg.next().size() > 0 ? currentimg.next() : ".safety li:eq(0)");
		nextimg.addClass("on");
	},intervaltime );

	/* 헤더 */
	var interval2 = null;
	var intervaltime2 = 10000;
	var animatetime2 = 1000;

	$("#plan_roll li:not(.on)").css("opacity",0);

	interval2 = setInterval(function() {
		var currentimg = $("#plan_roll li.on");
		currentimg.removeClass("on");

		var nextimg = $(currentimg.next().size() > 0 ? currentimg.next() : "#plan_roll li:eq(0)");
		nextimg.addClass("on").animate({opacity:1},animatetime2 ,function() {
			currentimg.css("opacity",0);
		});
	},intervaltime2 );


	/* selectbox 	*/
	function selectBox(){
		$("select.type1").each(function(e){
		  $(this).wrap('<div class="selectWrap"></div>');
		  $(this).after('<span class="tricBox">&nbsp;</span>');
		  $(this).css({
			 "opacity":"0",
			 "padding-top":$(".tricBox").css('padding-top'),
			 "padding-bottom":$(".tricBox").css('padding-bottom')
		  });
		  $(".selectWrap").eq(e).width($(this).width() + 3);
		  $(".tricBox").eq(e).css({
		   "width":parseInt($(this).width()) - parseInt($(".tricBox").css('padding-left')),
		   "background":"url(/image/common/bu/bu_select1.gif) no-repeat right center"
		  });
		  $(".tricBox").eq(e).text($("option:selected",this).text());
		  $(this).change(function(){
		   $(this).next().text($("option:selected",this).text());
		  });
		});
	   };
	   if($("select.type1").size() != 0){
		  selectBox();
	   }

	$("select.type1").focus(function(){
	  $(this).parents(".selectWrap").css("outline","1px dotted black");
	  });
	$("select.type1").blur(function(){
	  $(this).parents(".selectWrap").css("outline","0");
	  });

	function selectBox2(){
		$("select.type2").each(function(e){
		  $(this).wrap('<a class="selectWrap2"></a>');
		  $(this).after('<span class="tricBox2">&nbsp;</span>');
		  $(this).css({
			 "opacity":"0",
			 "padding-top":$(".tricBox2").css('padding-top'),
			 "padding-bottom":$(".tricBox2").css('padding-bottom')
		  });
		  $(".selectWrap2").eq(e).width($(this).width());
		  $(".tricBox2").eq(e).css({
		   "width":parseInt($(this).width()) - parseInt($(".tricBox2").css('padding-left')),
		   "background":"url(../image/common/bu/bu_select2.gif) no-repeat right center"
		  });
		  $(".tricBox2").eq(e).text($("option:selected",this).text());
		  $(this).change(function(){
		   $(this).next().text($("option:selected",this).text());
		  });
		});
	   };
	   if($("select.type2").size() != 0){
		  selectBox2();
	   }

	$("select.type2").focus(function(){
	$(this).parents(".selectWrap2").css("outline","1px dotted black");
	});
	$("select.type2").blur(function(){
	$(this).parents(".selectWrap2").css("outline","0");
	});

	function selectBox3(){
		$("select.type3").each(function(e){
		  $(this).wrap('<a class="selectWrap3"></a>');
		  $(this).after('<span class="tricBox3">&nbsp;</span>');
		  $(this).css({
			 "opacity":"0",
			 "padding-top":$(".tricBox3").css('padding-top'),
			 "padding-bottom":$(".tricBox3").css('padding-bottom')
		  });
		  $(".selectWrap3").eq(e).width($(this).width());
		  $(".tricBox3").eq(e).css({
		   "width":parseInt($(this).width()) - parseInt($(".tricBox3").css('padding-left')),
		   "background":"url(/image/common/bu/bu_select3.gif) no-repeat right center"
		  });
		  $(".tricBox3").eq(e).text($("option:selected",this).text());
		  $(this).change(function(){
		   $(this).next().text($("option:selected",this).text());
		  });
		});
	   };
	   if($("select.type3").size() != 0){
		  selectBox3();
	   }

	$("select.type3").focus(function(){
	$(this).parents(".selectWrap3").css("outline","1px dotted black");
	});
	$("select.type3").blur(function(){
	$(this).parents(".selectWrap3").css("outline","0");
	});


	function selectBox4(){
		$("select.type4").each(function(e){
		  $(this).wrap('<a class="selectWrap4"></a>');
		  $(this).after('<span class="tricBox4">&nbsp;</span>');
		  $(this).css({
			 "opacity":"0",
			 "padding-top":$(".tricBox4").css('padding-top'),
			 "padding-bottom":$(".tricBox4").css('padding-bottom')
		  });
		  $(".selectWrap4").eq(e).width($(this).width());
		  $(".tricBox4").eq(e).css({
		   "width":parseInt($(this).width()) - parseInt($(".tricBox4").css('padding-left')),
		   // 2014.03.31 셀렉트박스 화살표 이미지 입니다. 경로 수정하지 마세요.
		   "background":"url(/image/common/bu/bu_select4.gif) no-repeat right center"
		  });
		  $(".tricBox4").eq(e).text($("option:selected",this).text());
		  $(this).change(function(){
		   $(this).next().text($("option:selected",this).text());
		  });
		});
	   };
	   if($("select.type4").size() != 0){
		  selectBox4();




	   }

	$("select.type4").focus(function(){
	$(this).parents(".selectWrap4").css("outline","1px dotted black");
	});
	$("select.type4").blur(function(){
	$(this).parents(".selectWrap4").css("outline","0");
	});

	/* DKI 탭처리 div 배열로 처리 */
	var tabs = ['#tabs', '#tabs1', '#tabs2', '#tabs3', '#tabs4', '#tabs_total', '#quick_tab', '#dlv_type_tabs'];
	for (var idx= 0; idx < tabs.length; idx++) {
		$(tabs[idx]).tabs();
	}

$('.url_list a').click(function(e){
	$(this).toggleClass('on');
	e.preventDefault();
});

$('.header_scroll .fav_view').click(function(e){
	$('#quick > div').addClass('off');
	$('#popup_total').removeClass("on");
	e.preventDefault();
});




$('h2.total').click(function(e){
	$('#popup_total').toggleClass('on');
	$('#quick > div').addClass('off');
	e.preventDefault();
});
$('#popup_total .more a').click(function(e){
	$('#popup_total').removeClass("on");
	e.preventDefault();
});

$(".slide a").toggle(
	function(){
		$("#slide").css("display","block");
	},
	function(){
		$("#slide").css("display","none");
	}
);
$(".slide a").click(function(e) {
	$(".slide em").toggle();
	e.preventDefault();
});


$(".smart_detail").click(	function(e){
	$("#quickview .main .section2 .best .con").toggle();
	e.preventDefault();
});




/*//메인 롤링
$('.eco-list li a').mouseenter(function(e) {
	$(this).parents('#eco_recipy').addClass('on');
	e.preventDefault();
});
$('#eco_recipy').mouseleave(function(e) {
	$(this).removeClass('on');
	e.preventDefault();
});*/

//메인 롤링
$('.eco-list li a').mouseenter(function(e) {
	//alert('dd');
	$(this).parents('#eco_recipy').addClass('on');

	var elList = $('#ecoList li').length;
				//alert(elList);

	if(elList == 1){
		$(this).parents('#eco_recipy').removeClass('on');
	}

	e.preventDefault();
});
$('#eco_recipy').mouseleave(function(e) {
	$(this).removeClass('on');
	e.preventDefault();
});

});


/* 갤러리
$('.gallery a').live('click', function() {
	var imgObj = $(this).find('img').clone();
	$('.gallery_view').html(imgObj);
	$('#srolling_area > div:first > a > img').clone();
});
$('.gallery.over a').live('mouseover', function() {
	var imgObj = $(this).find('img').clone();
	$('.gallery_view').html(imgObj);
	$('#srolling_area > div:first > a > img').clone();
});
 */

 /* select 디자인 */
 jQuery(function($){

	// Common
	var select_root = $('div.select');
	var select_value = $('.myValue');
	var select_a = $('div.select>ul>li>a');
	var select_input = $('div.select>ul>li>input[type=radio]');
	var select_label = $('div.select>ul>li>label');

	// Radio Default Value
	$('div.myValue').each(function(){
		var default_value = $(this).next('.iList').find('input[checked]').next('label').clone();
		$(this).append(default_value);
	});

	// Line
	select_value.bind('focusin',function(){$(this).addClass('outLine');});
	select_value.bind('focusout',function(){$(this).removeClass('outLine');});
	select_input.bind('focusin',function(){$(this).parents('div.select').children('div.myValue').addClass('outLine');});
	select_input.bind('focusout',function(){$(this).parents('div.select').children('div.myValue').removeClass('outLine');});

	// Show
	function show_option(){
		$(this).parents('div.select:first').toggleClass('open');
	}

	// Hover
	function i_hover(){
		$(this).parents('ul:first').children('li').removeClass('hover');
		$(this).parents('li:first').toggleClass('hover');
	}

	// Hide
	function hide_option(){
		var t = $(this);
		setTimeout(function(){
			t.parents('div.select:first').removeClass('open');
		}, 1);
	}

	// Set Input
	function set_label(){
		var v = $(this).next('label').clone();
		$(this).parents('ul:first').prev('.myValue').text('').append(v);
		$(this).parents('ul:first').prev('.myValue').addClass('selected');
	}

	// Set Anchor
	function set_anchor(){
		var v = $(this).text();
		$(this).parents('ul:first').prev('.myValue').text('').append(v);
		$(this).parents('ul:first').prev('.myValue').addClass('selected');
	}

	// Anchor Focus Out
	$('*:not("div.select a")').focus(function(){
		$('.aList').parent('.select').removeClass('open');
	});

	select_value.click(show_option);
	select_root.find('ul').css('position','absolute');
	select_root.removeClass('open');
	select_root.mouseleave(function(){$(this).removeClass('open');});
	select_a.click(set_anchor).click(hide_option).focus(i_hover).hover(i_hover);
	select_input.change(set_label).focus(set_label);
	select_label.hover(i_hover).click(hide_option);

	// Form Reset
	$('input[type="reset"], button[type="reset"]').click(function(){
		$(this).parents('form:first').find('.myValue').each(function(){
			var origin = $(this).next('ul:first').find('li:first label').clone();
			$(this).clone(origin).removeClass('selected');
		});
	});

	/*
	$(document).ajaxStart(function() {
		$('#popup_address_loading').show();
	}).ajaxStop(function(){
		$('#popup_address_loading').hide();
	});
	*/
	
	/* DKI SelectBox layout 재조정. 건들지 마세요  */
	$.fn.extend({
		relayoutSelectsWithRoot : function(tClass) {
			this.find('.'+tClass).each(function(i, e){
				var $e = $(e); 
//				$e.wrap('<a class="selectWrap4"></a>'); 
//				$e.after('<span class="tricBox4">&nbsp;</span>');
				$e.css({
					"opacity":"0",
					"padding-top":$(".tricBox4").css('padding-top'),
					"padding-bottom":$(".tricBox4").css('padding-bottom')
				});
				$e.parent().width($(e).width());
				$($e.parent().find('.tricBox4')[0]).css({
					 "width":parseInt($e.width()) - parseInt($e.after().css('padding-left')),
					  "background":"url(/image/common/bu/bu_select4.gif) no-repeat right center"
				});
				$($e.parent().find('.tricBox4')[0]).text($("option:selected",this).text());
			});
		},
		selectOption: function(tClass) {
			this.css({
				"opacity":"0",
				"padding-top":$(".tricBox4").css('padding-top'),
				"padding-bottom":$(".tricBox4").css('padding-bottom')
			});
			/* 기존 설정 사이즈가 틀어짐 */
			if (this.width() > 0) {
				this.parent().width(this.width());				
			}
			$(this.parent().find('.tricBox4')[0]).css({
				 "width":parseInt(this.width()) - parseInt(this.after().css('padding-left')),
				  "background":"url(/image/common/bu/bu_select4.gif) no-repeat right center"
			});
			$(this.parent().find('.tricBox4')[0]).text($("option:selected",this).text());
		},
		selectTitle: function() {
			$(this.parent().find('.tricBox4')[0]).text($("option:selected",this).text());			
		},
		setHint:function(text) {
			this.focus(function(){
			    if($(this).val() == text){
			        $(this).val('');
			    }
			}).blur(function(){
			    if($(this).val() == ''){
			        $(this).val(text);
			    }
			});
			
		}
    });
 }); 
(function(e){e.fn.raty=function(l){options=e.extend({},e.fn.raty.defaults,l);if(this.attr("id")===undefined){c("Invalid selector!");return;}$this=e(this);if(options.number>20){options.number=20;}if(options.path.substring(options.path.length-1,options.path.length)!="/"){options.path+="/";}var q=$this.attr("id"),x=options.path,v=options.cancelOff,t=options.cancelOn,r=options.showHalf,o=options.starHalf,h=options.starOff,n=options.starOn,s=options.onClick,g=0,m="";if(!isNaN(options.start)&&options.start>0){g=(options.start>options.number)?options.number:options.start;}for(var p=1;p<=options.number;p++){m=(options.number<=options.hintList.length&&options.hintList[p-1]!==null)?options.hintList[p-1]:p;starFile=(g>=p)?n:h;$this.append('<img id="'+q+"-"+p+'" src="'+x+starFile+'" alt="'+p+'" title="'+m+'" class="'+q+'"/>').append((p<options.number)?"&nbsp;":"");}$this.append('<input id="'+q+'-score" type="hidden" name="'+options.scoreName+'"/>');e("#"+q+"-score").val(g);if(r){var k=e("input#"+q+"-score").val(),j=Math.ceil(k),u=(j-k).toFixed(1);if(u>=0.3&&u<=0.7){j=j-0.5;e("img#"+q+"-"+Math.ceil(j)).attr("src",x+o);}else{if(u>=0.8){j--;}else{e("img#"+q+"-"+j).attr("src",x+n);}}}if(!options.readOnly){if(options.showCancel){var w='<img src="'+x+options.cancelOff+'" alt="x" title="'+options.cancelHint+'" class="button-cancel"/>';if(options.cancelPlace=="left"){$this.prepend(w+"&nbsp;");}else{$this.append("&nbsp;").append(w);}$this.css("width",options.number*20+20);e("#"+q+" img.button-cancel").live("mouseenter",function(){e(this).attr("src",x+t);e("img."+q).attr("src",x+h);}).live("mouseleave",function(){e(this).attr("src",x+v);e("img."+q).trigger("mouseout");}).live("click",function(){e("input#"+q+"-score").val(0);if(s){s(0);}});}else{$this.css("width",options.number*20);}e("img."+q).live("mouseenter",function(){var y=e("img."+q).length;for(var z=1;z<=y;z++){if(z<=this.alt){e("img#"+q+"-"+z).attr("src",x+n);}else{e("img#"+q+"-"+z).attr("src",x+h);}}}).live("click",function(){e("input#"+q+"-score").val(this.alt);if(s){s(this.alt);}});$this.live("mouseleave",function(){var D=e(this).attr("id"),z=e("img."+D).length,C=e("input#"+D+"-score").val();for(var A=1;A<=z;A++){if(A<=C){e("img#"+D+"-"+A).attr("src",x+n);}else{e("img#"+D+"-"+A).attr("src",x+h);}}if(r){var C=e("input#"+D+"-score").val(),y=Math.ceil(C),B=(y-C).toFixed(1);if(B>=0.3&&B<=0.7){y=y-0.5;e("img#"+D+"-"+Math.ceil(y)).attr("src",x+o);}else{if(B>=0.8){y--;}else{e("img#"+D+"-"+y).attr("src",x+n);}}}}).css("cursor","pointer");}else{$this.css("cursor","default");}return $this;};e.fn.raty.defaults={cancelHint:"cancel this rating!",cancelOff:"cancel-off.png",cancelOn:"cancel-on.png",cancelPlace:"left",hintList:["bad","poor","regular","good","gorgeous"],number:10,path:"../image/common/ico/",readOnly:false,scoreName:"score",showCancel:false,showHalf:false,starHalf:"star-half.png",start:0,starOff:"star-off.png",starOn:"star-on.png"};e.fn.raty.readOnly=function(g){if(g){e("img."+$this.attr("id")).die();$this.css("cursor","default").die();}else{d();f();b();$this.css("cursor","pointer");}return e.fn.raty;};e.fn.raty.start=function(g){a(g);return e.fn.raty;};e.fn.raty.click=function(h){var g=(h>=options.number)?options.number:h;a(g);if(options.onClick){options.onClick(g);}else{c('You should add the "onClick: function() {}" option.');}return e.fn.raty;};function d(){var g=$this.attr("id");e("img."+g).live("mouseenter",function(){var h=e("img."+g).length;for(var j=1;j<=h;j++){if(j<=this.alt){e("img#"+g+"-"+j).attr("src",options.path+options.starOn);}else{e("img#"+g+"-"+j).attr("src",options.path+options.starOff);}}});}function f(){$this.live("mouseleave",function(){var k=e(this).attr("id");var g=e("img."+k).length;var j=e("input#"+k+"-score").val();for(var h=1;h<=g;h++){if(h<=j){e("img#"+k+"-"+h).attr("src",options.path+options.starOn);}else{e("img#"+k+"-"+h).attr("src",options.path+options.starOff);}}});}function b(){var g=$this.attr("id");e("img."+g).live("click",function(){e("input#"+g+"-score").val(this.alt);});}function a(k){var j=$this.attr("id"),g=e("img."+j).length;e("input#"+j+"-score").val(k);for(var h=1;h<=g;h++){if(h<=k){e("img#"+j+"-"+h).attr("src",options.path+options.starOn);}else{e("img#"+j+"-"+h).attr("src",options.path+options.starOff);}}}function c(g){if(window.console&&window.console.log){window.console.log(g);}}})(jQuery);

/* ▶▶▶▶▶▶▶▶▶ 초록아이클럽쿠폰 START ◀◀◀◀◀◀◀◀◀ */
//console.log 에러 - 구버전에서..
var console = window.console || { log:function(){} }
/* ▶▶▶▶▶▶▶▶▶ 초록아이클럽쿠폰 END ◀◀◀◀◀◀◀◀◀ */