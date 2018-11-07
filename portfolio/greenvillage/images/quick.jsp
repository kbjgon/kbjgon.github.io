



















function initQuick() {
	var $cTab = $('#quick_close_tab');
	var $oTab = $('#quick_tab');
	
	/* 카트 및 주문 부분 초기화 장바구니가 기등록 상태이면 초기화 하지 않는다. */
	var order = choroc.cart.order;
	if (order.cartShp.length == 0) {
	}
	$('#quick_cart_all_select').change(function(e) {
		var checked = $(e.target).prop('checked');
		var $l = $('#quickCartList');
		$l.find('input[type="checkbox"]').each(function(i,e){
			$(e).prop('checked', checked);
		});
//		quick.sync();//20140414 입점몰 장바구니 배송비로 인한sync()맞춤 /* 여기는 js부분임 */
		
	});
	
	$('#quickCartList').change(function(e) {
		var allChecked = true;
		$('#quickCartList').find('input[type="checkbox"]').each(function(i, e){
			if (!$(e).prop('checked')) allChecked = false;
		});
		$('#quick_cart_all_select').prop('checked', allChecked);
//		quick.sync();//20140414 입점몰 장바구니 배송비로 인한sync()맞춤 /* 여기는 js부분임 */
	});
	
	if (order.cartShp.length > 0) {
		/* 역순으로 등록 */
		loadCartByShp(order.cartShp.length-1);
	}
}

/**
 * 초기 로딩시 cart Item 추가. 
 **/
function loadCartByShp(shpIdx) {
	var shp = choroc.cart.order.cartShp[shpIdx];
	var goods = shp.good;
	var len = goods.length-1;
	for (var i = len; i > -1; i--) {
		loadTempalteQuickCartItem( goods[i]);
	}
	
	if (choroc.cart.order.cartShp[--shpIdx]) {setTimeout(function() {loadCartByShp(shpIdx);}, 400);};
}

/*
 * Quick Cart Item 추가.
 */
function loadTempalteQuickCartItem(o) {
	var $li = $('<li></li>');
	var data = {};
	data.dms_cd = o.DMS_CD | o.DMS_CUST_CD;
	data.quick_check_id = 'quick_goods-' + o.GOODS_CD;
	data.goods_cd = o.GOODS_CD;
	data.mall_cd = '1';
	data.store_cd = '9002';
	if(o.GOT_CD_NM != '' && o.GOP_CD_NM != ''){
		data.name = o.GOODS_NM + ' / ' + o.GOT_CD_NM + ' : ' + o.GOP_CD_NM;
	}else{
		data.name = o.GOODS_NM;
	}
	data.detail_link = o.LINK;
	data.image_uri = o.IMG_URL;
	data.sum_price = fnSetComma(o.SALE_PRC * o.QTY, '1') + '원';
	data.qty = o.QTY;
	data.dtl_no = o.DTL_NO;
	data.ic_modify = '/image/common/quick_mail.gif';
	data.ic_delete = '/image/common/quick_del.gif';
	/* 2015.05.28 판매 단위 추가 */
	data.sale_unit_qty = o.SALE_UNIT_QTY;
	$li.loadTemplate('/green/webpage/quick/templates/quick_cart_item.html', data,
		{ success : function() {
	    		updateQuickSummery();
	    	
	    	}
	    }
	).prependTo('#quickCartList');	

}

/**
 * 구매 수량 변경.
 **/
function changeQtyWithQuick(e){
	var cart = choroc.cart;
	if (cart) {
		/* find target */
		var $li = $(choroc.util.getTarget(e||window.event)).parents('li').first();
		var dmsCd = $li.find('input[type="hidden"][name="quick_dms_cd"]').first().val();
		var goodsCd = $li.find('input[type="checkbox"][name="sel_goods"]').first().val();
		var mallCd = $li.find('input[type="hidden"][name="quick_mall_cd"]').first().val();
		var storeCd = $li.find('input[type="hidden"][name="quick_store_cd"]').first().val();
		var qty = $li.find('input[type="text"].spinner').first().val();
		var dtlNo = $li.find('input[type="hidden"][name="quick_dtl_no"]').first().val();
		var $sum = $li.find('#sum_price');
		
		/* 2015.05.28 판매 단위 추가 */
		var saleUnitQty = $li.find('input[type="hidden"][name="quick_sale_unit_qty"]').first().val();
		
		if(qty % saleUnitQty != 0){
			if(qty - saleUnitQty > 0){
				qty = parseInt(qty / saleUnitQty) * saleUnitQty;
			}else{
				qty = parseInt(saleUnitQty);
			}
		}
		
		cart.changeQty({ 
			goodsCd : goodsCd,
			mallCd : mallCd,
			storeCd : storeCd,
			qty:qty,
			dtl_no : dtlNo
			},
			function(data) {
				if (data) {
					if (data.result) {
						updateQuickUi({change: data});
					}				
				}
		});
	}
}

/**
 * 상품 삭제 
 **/ 
function remove_cart_one(e){
	var cart = choroc.cart;
	if (cart) {
		/* find target */
		var $li = $(choroc.util.getTarget(e||window.event)).parents('li').first();
		var dmsCd = $li.find('input[type="hidden"][name="quick_dms_cd"]').first().val();
		var goodsCd = $li.find('input[type="checkbox"][name="sel_goods"]').first().val();
		var mallCd = $li.find('input[type="hidden"][name="quick_mall_cd"]').first().val();
		var storeCd = $li.find('input[type="hidden"][name="quick_store_cd"]').first().val();
		var qty = $li.find('input[type="text"].spinner').first().val();
		var dtlNo = $li.find('input[type="hidden"][name="quick_dtl_no"]').first().val();
		var $sum = $li.find('#sum_price');
		var list = new Array();
		var goods = {};
		goods.cd = goodsCd;
		goods.dtl_no = dtlNo;
		list.push(goods);
		cart.removeCart(storeCd, list, function(data) {
			if (data) {
				if (data.result) {
					if (data.result > 0 ) {
						updateQuickUi({remove: data.list});
					}
				}				
			}
		});
	}
}

/**
 * 선택 상품 비우기 
 **/
function remove_cart_selected() {
	var $l = $('#quickCartList');
	var list = new Array();
	var cart = choroc.cart;
	var storeCd = $l.find('input[type="hidden"][name="quick_store_cd"]').first().val();
	$l.find('input[type="checkbox"]').each(function(i, e) {
	 	var $e = $(e);
	 	if ($e.prop('checked')) {
	 		var goods = {};
	 		goods.cd = $e.val();
	 		goods.dtl_no = $e.prev().val();
	 		list.push(goods);
	 	}
	 });
	if (cart) {	
		cart.removeCart(storeCd, list, function(data) {
			if (data) {
				if (data.result) {
					if (data.result > 0 ) {
						updateQuickUi({remove: data.list});
					}
				}				
			}
		});
	}

}

/*function removeCartItem(pStoreCd, pCd, pCb) {
	var cart = choroc.cart;
	if (cart) {
		var goods = {};
		goods.cd = pCd;
		var list = new Array();
		list.push(goods);
		cart.removeCart(pStoreCd, list, pCb);
	}
}*/

function removeCartItem(pStoreCd, pCd, pCb) {
	var cart = choroc.cart;
	
	var pCd1 = pCd.split(",");
	var list = new Array();
	
	if (cart) {
		var goods = {};
		
		for(var i=0; i < pCd1.length; i++){
			goods.cd = pCd1[i];
			list.push(goods);
			cart.removeCart(pStoreCd, list, pCb);
		}
	}
}


/**
 * total 계산.
 **/
function updateQuickSummery() {
	var $q = $('#quick');
//	var $t = $('#quick_title_cart_sum');
//	var $d = $('#quick_title_dlv_sum');
//	var $f = $('#quick_amt_freeze_pack');
	/* 상품금액 계산 */
	var tp = 0;
	var dl = 0;
	var fz = 0;
	var cartShp = choroc.cart.order.cartShp;
	var csl = cartShp.length;
	var cnt = 0;
	
	for (var i = 0; i < csl; i++) {
		var shp = cartShp[i];
		cnt += shp.good.length;
		tp += shp.getShpAmt(false, CGood.SALE_PRC);
		dl += shp.calcDelivFee();
		fz += shp.getFreezePackFee();
	}
	$('#quick_title_cart_cnt').text(cnt);
	$('#quick_summery_cart_cnt').text(cnt);
	$('#quick_title_cart_sum').text(fnSetComma(tp, '1') +'원');
	$('#quick_summery_cart_sum').text(fnSetComma(tp, '1') +'원');
	$('#quick_title_dlv_sum').text(fnSetComma(dl, '1') +'원');
	$('#quick_summery_dlv_sum').text(fnSetComma(dl+fz, '1') +'원');/* FIX 20140419-007 */
	$('#quick_titile_freeze_pack').text(fnSetComma(fz, '1') +'원');
}

var opened_type = "";
var webURL = "/green/webpage/";
		
/**
 * 복수의 상품을 장바구니에 등록.
 * arguments : 
 * type1 : Array   array [{data: String, ea : Number}, {data: String, ea: Number}, ...]
 * type2 : String, Number 기존과 동일
 */
function addcart(cartAr){
	//2011.05.20.ho3270 추가
	var list = null;
	var sendList = new Array();
	var cb = null;
	
	if (arguments.length == 0 ) {
		return;
	}
	if (typeof arguments[0] === 'string') { /* param : data, ea | data */
		list = new Array();
		var item = {};
		item.data = arguments[0];
		/* 20140420 check callback function type */ 
		item.ea = arguments.length > 1 && (typeof arguments[1] != 'function') ? arguments[1] : 1;
		item.sold = arguments.length > 2 && (typeof arguments[2] != 'function') ? arguments[2] : 0;
		list.push(item);
		if (arguments.length == 3) {
			cb = arguments[2];
		};
	} else if (typeof arguments[0] === 'object' && arguments[0] instanceof Array) {
		list = arguments[0];
		if (arguments.length == 2) {
			cb = arguments[1];
		};
	}
	
	/* vaild check */
	for (var idx in list) {
		var item = list[idx];
		var send = {};
		if (item.ea <= 0) {
			choroc.alert({message:'구매수량을 확인해주세요.'});
			return;				
		}
		if(item.sold == 1){
			choroc.alert({message:'품절 상품입니다.'});
			return;				
		}
		
		var data = item.data.split(',');
		var media_cd    = data[0];
		var category_id = data[1];
		var goodsCd=data[4];		/* 커뮤니티 소스와 맞물리기 때문에 어쩔수 없이 상품 코드 위치 현상태 유지 */
		var ea = item.ea;
		var mall = item.mall;
		var store = item.store;
		var gop = item.gop;
		var got = item.got;
		// 2015.08.18 옵션명 값 추가
		var gop_cd_nm = item.gop_cd_nm;
		var got_cd_nm = item.got_cd_nm;
		
		//////////세트상품
		var dc = getToDay();
		if(Number(dc)>20130908 && Number(dc)<20130923){
			var chkList = ["WG010641" ,"WG000130","WG000132","WG010653","WG000255","WG000257","WG010643","WG005388","WG005795","WG006836"
							,"WG007831","WG010678","WG010638","WG010650","WG010639","WG010651","WG010979","WG013992","WG003194","WG000206"
							,"WG000128","WG000133","WG010645"];
			for(var z = 0;z<chkList.length;z++){
				if(chkList[z]==goodsCd){
					choroc.confirm({message: "선택하신 상품은 매장배송 전용상품입니다.\n매장배송 전용상품은 장바구니 이용이 불가합니다. \n바로구매를 하시겠습니까?",
						onclick : function(which) {
							switch (which) {
							case 'postive': {
								var sel_goods =goodsCd+'/'+1;
								location.href = "/green/webpage/order/login_check.jsp?sel_goods="+sel_goods;
								break;
							}
							default: break;
							}
						}
					});
					return;
				}
			}
		}
		
		send.media_cd = media_cd;
		send.category_id = category_id;
		send.goodsCd = goodsCd;
		send.ynflag = 1;
		send.ea = ea;
		if (gop) { send.gop_list = gop;}
		if (got) { send.got_list = got;}
		if (mall) {
			send.mall = mall;
		}
		if (store) {
			send.store = store;
		}
		send.gop_cd_nm = gop_cd_nm;
		send.got_cd_nm = got_cd_nm;

		sendList.push(send);
		
		/* send to cart */
		if (choroc) {
			var cart = choroc.cart;
			cart.addCart(sendList, function(data) {
				if (data) {
					if (data.success) {
						if (choroc) {
							updateQuickUi({
								add: data,
								toggle: 400
							});
							if (cb) {
								cb(data);
							}
						}
					} else if (data.url) {
						window.location.reload(true);
						//login();
					} else if (data.message) {
						choroc.alert({message: data.message});
					} else {
						if(null == sendList || "" == sendList){
							choroc.alert({message: '상품을 선택해 주세요'});
						}else{
							choroc.alert({message: '이미 담긴 상품입니다'});
						}
					}
	
				} else {
				}
			});
		}
		
		//2015.06.11 퀵 장바구니에 상품 등록 전에 상품구분이 매장인지 아닌지 체크
		choroc.cart.chkAckYn(goodsCd, function(data){
			if(data){
				if(data.ackYn == "0"){
					choroc.alert({message:'이 상품은 매장전용 상품입니다.', onclick: function() {
							$("#quick_goods-"+goodsCd).attr("checked", true);
							remove_cart_selected();
						}
					});
				}
			}
		});
	}
 }
 
/*
 * Quick UI update
 * { add: addItemData,
 *   remove: removeItemData, 
 *   change: changeItemData,
 *   toggle: 400ms (open 400ms)
 * }
 * */
function updateQuickUi(p) {
	var add = p.add ? p.add : null;
	var remove = p.remove ? p.remove : null;
	var change = p.change ? p.change : null;
	var toggle = p.toggle ? p.toggle : 0;

	/*
	cart: {list:[,…], total_price:30900, total_price_comma:30,900}
	list: [,…]
	0: {tax_flg:0, item_cd:005748, freeze_pack_fee:0.0, qty:1.0, fst_nm:, goods_cd:WG005748, cust_cd:101492,…}
	1: {tax_flg:0, item_cd:007201, freeze_pack_fee:0.0, qty:1.0, fst_nm:, goods_cd:WG007201, cust_cd:101492,…}
	total_price: 30900
	total_price_comma: "30,900"
	dlv: {,…}
	list: [{dms_cust_nm:한겨레플러스, dlv_fee:3000.0, dlv_free_amt:40000.0, dms_cust_cd:1, freeze_pack_fee:0.0}]
	0: {dms_cust_nm:한겨레플러스, dlv_fee:3000.0, dlv_free_amt:40000.0, dms_cust_cd:1, freeze_pack_fee:0.0}
	total_price: 3000
	total_price_comma: "3,000"
	*/
	
	/* add item */
	var $l = $('#quickCartList');
	var order = choroc.cart.order;
	if (add) {
		var addedList = order.addGoodsToCart(add);
		if (addedList) {
			var len = addedList.length;
			for (var i = 0; i < len; i++) {
				var item = addedList[i];
				loadTempalteQuickCartItem(item);
			};
		};
	}
	if (remove) {
		var len = remove.length;
		var shps = order.getShps(COrd.TAG_CART);
		for (var i = 0; i < shps.length; i++) {
			var shp = shps[i];
			for (var j = 0; j < len; j++) {
				var item = remove[j];
				shp.removeGoodByCd(item.cd, item.dtl_no);
				var finder = 'li input[type="checkbox"][value="' + item.cd + '"]';
				$l.find(finder).each(function(i,e){
					//2015.07.30 삭제 이미지 클릭 시 삭제가 되지 않는 현상으로 주석처리
					//if (parseInt($(e).prev().val()) == item.dtl_no) {
						$(e).parents('li').first().remove();
					//}
				});
				
			};
		}
		updateQuickSummery();
		if (order.getQtySum() ==0) {
			$('#quick_cart_all_select').prop('checked', false);
		}
	}
	if (change) {
		var shps = order.getShps(COrd.TAG_CART);
		for (var i = 0; i < shps.length; i++) {
			var shp = shps[i];
			var len = change.list.length;
			for (var j = 0; j < len; j++) {
				
				var item = change.list[j];
				var g = shp.getGoodByCd(item.goods_cd);
				if (g) {
					g.setQty(item.qty);
					var finder = 'li input[type="checkbox"][value="' + item.goods_cd + '"]';
					var $li = $(finder).parents('li').first();
//					var dmsCd = $li.find('input[type="hidden"][name="quick_dms_cd"]').first().val();
//					var goodsCd = $li.find('input[type="checkbox"][name="sel_goods"]').first().val();
//					var mallCd = $li.find('input[type="hidden"][name="quick_mall_cd"]').first().val();
//					var storeCd = $li.find('input[type="hidden"][name="quick_store_cd"]').first().val();
					var qty = $li.find('input[type="text"].spinner').first().val(g.getQty());
					var $sum = $li.find('#sum_price');
					$sum.text(fnSetComma(g.SALE_PRC * g.QTY, '1') + '원');
					//2015.05.29 판매단위 추가
					var saleUnitQty = $li.find('input[type="hidden"][name="quick_sale_unit_qty"]').first().val(g.SALE_UNIT_QTY);
				}
			};
		}
		updateQuickSummery();
	}
	
	/* all check ui update */
	
	
	if (toggle > 0) {
		if (!choroc.quick.isOpen()) {
			choroc.quick.toggle();
			setTimeout(function() {
				choroc.quick.toggle();
			}, toggle);				
		};
	};
};
