
if (window.choroc == null) {
	window.choroc = {};
	var c = window.choroc;
	
	c.context = '/green';
	c.href = 'http://www.choroc.com:81';
	/* Quick Menu 처리 */
	c.Quick = function() {
		this.mOpen = false;
		/* 세션 설정에 따른 처리*/
		this.init = function(pIsOpen) {
			if (isOpen) {
				this.mOpen = true;
				$('#quick a.more').toggleClass('close');
				$('#quick > div').toggleClass('off');
			}
		};
		this.toggle = function() {
			$('#quick a.more').toggleClass('close');
			$('#quick > div').toggleClass('off');
			$('#popup_total').removeClass();
			if (this.mOpen) {
				this.mOpen = false;
			} else {
				this.mOpen = true;	
			}
			c.util.setSession('open_quick', this.mOpen);
		};
		this.isOpen = function(){return this.mOpen;};
	};
	c.quick = new c.Quick();
	
	/* ajax TODO add not jquery */
	c.Ajax = function() {
		this.ajax = function(pType, pUrl, pDataType, pData, pCb) {$.ajax({
	    		type		: pType,
	    		url			: pUrl,
	    		dataType	: pDataType,
	    		data		: pData,
        		success		: function( data ) {pCb(data);},
		        complete    : function( jqXHR, textStatus){pCb(null,jqXHR, textStatus);}
	    	});			
		};
		this.postAjax = function(pUrl, pDataType, pData, pCb) {
			this.ajax('POST', pUrl, pDataType, pData, pCb);
		};
		this.getAjax = function(pUrl, pDataType, pData, pCb) {
			this.ajax('GET', pUrl, pDataType, pData, pCb);
		};
		this.schedule = function(pOpt, pCb){this.postAjax(this.mUrl, 'json', {method:'schedule', options: pOpt}, pCb);};
	};
	/* return errorMsg if return value is null, success to callback fnc */
	c.Member = function(){
		this.mUrl = c.context + '/webpage/ajax/member.json';
		this.mGift = c.context + '/webpage/ajax/gift_proc.json';
		this.checkId = 	function(pId, pCb){
			if (!pId) {return '아이디를 입력하십시오.';}
			var wP = /[\s]/g;
			if (wP.test(pId)) {return '아이디에 공백문자는 사용하실 수 없습니다.';}
			if (pId.length < 6 ) {return '아이디는 6자 이상이어야 합니다.';}
			var vaildP = /[a-z]|[0-9]/g;
			if (!vaildP.test(pId)) {return 'ID에는 영문 소문자, 숫자만 사용하실 수 있습니다.';}
			this.postAjax(this.mUrl, 'json', {method : 'check', options : {id:pId}}, pCb);
		};
		this.checkUser = function(p, pCb) {this.postAjax(this.mUrl, 'json', {method: 'check', options: p}, pCb);};
		this.sendCell = function(pCn, pSeed, pCb) {this.postAjax(this.mUrl, 'json', {method: 'sendSeed', cell: pCn, seed: pSeed}, pCb);};
		this.getInfo = function(pMCode, pSCode, pCb) {this.postAjax(this.mUrl, 'json', {method: 'getOfflineInfo', mbrid: pMCode, stcd: pSCode}, pCb);};
		this.changePass = function(p, pCb) {this.postAjax(this.mUrl, 'json', {method: 'changePass', to: p}, pCb);};
		this.receiveId = function(p, pCb) {this.postAjax(this.mUrl, 'json', {method: 'receiveId', to : p}, pCb);};
		this.getUserInfo = function(pCb){this.postAjax(this.mUrl, 'json', {method: 'user_info'}, pCb);};
		this.procRefundAcc = function(p, pCb){this.postAjax(this.mUrl, 'json', {method: 'procRefundAcc', options: p}, pCb);};
		// 2015.06.19 초록아이클럽 탈퇴 추가
		this.deleteChorokiClub = function(p, pCb) {this.postAjax(this.mUrl, 'json', {method: 'deleteChorokiClub', options: p}, pCb);};
		// 2015.07.08 온라인 오프라인 회원정보 조회
		this.chorokiClubStoreChk = function(p, pCb) {this.postAjax(this.mUrl, 'json', {method: 'chorokiClubStoreChk', options: p}, pCb);};
		// 2018.06.05 구회원 비밀번호 초기화 조회
		this.checkResetPwd = function(p, pCb) {this.postAjax(this.mUrl, 'json', {method: 'checkResetPwd', options: p}, pCb);};
		// 2015.08.07 휴먼고객 조회
		this.checkHumanUser = function(p, pCb) {this.postAjax(this.mUrl, 'json', {method: 'checkHumanUser', options: p}, pCb);};
		//2016.06.30 휴대폰인증 저장
		this.confirmDi = function(pDi, pCellNo, pBirYMD, pMbrId, pCb) {this.postAjax(this.mUrl, 'json', {method: 'confirmDi', di: pDi, cellNo: pCellNo, birYMD: pBirYMD, mbrId: pMbrId}, pCb);};
		/* gift */
		this.listGift = function(pIsPossible, pCb){this.postAjax(this.mGift, 'json', {method: 'listGift', possible : pIsPossible}, pCb);};
	};
	c.Member.prototype = new c.Ajax();
	c.member = new c.Member();
	
	/* Store storeGuide.json*/
	c.Store = function() {
		this.mUrl = '/green/webpage/ajax/storeGuide.json';
		this.getStoreList = function(pOpt, pCb){this.postAjax(this.mUrl, 'json', {method : 'offline-store', options: pOpt}, pCb);};
		this.findMileage = function(pStcd, pName, pTelNo, pCb){this.postAjax(this.mUrl, 'json', {method : 'findMileage', stcd:pStcd, name:pName, telno:pTelNo}, pCb);};
		this.getStoreInfo = function(pOpt, pCb){this.postAjax(this.mUrl, 'json', {method : 'offline-store-info', options: pOpt}, pCb);};
		this.getProductInfo = function(pOpt, pCb){this.postAjax(this.mUrl, 'json', {method:'product_info', options: pOpt}, pCb);};
		this.getProductCompare = function(pOpt, pCb){this.postAjax(this.mUrl, 'json', {method:'product_compare', options: pOpt}, pCb);};
		this.getBriefingSchedule = function(pStart, pEnd, pCb){this.schedule({uri:'biz/briefing', start:pStart, end:pEnd}, pCb);};
		this.getArea = function(pCb){this.postAjax(this.mUrl, 'json', {method:'area'}, pCb);};
		this.getSubArea = function(pArea, pCb){this.postAjax(this.mUrl, 'json', {method:'sub_area', area:pArea}, pCb);};
		this.getStoreWithArea = function(pOpt, pCb){this.postAjax(this.mUrl, 'json', {method:'store_with_area', options: pOpt}, pCb);};
	};
	c.Store.prototype = new c.Ajax();
	c.store = new c.Store();
	
	/* Address address.json */
	c.Address = function() {
		this.mUrl = '/green/webpage/ajax/address.json';
		this.getSido = function(pCb){this.postAjax(this.mUrl, 'json', {method:'sido'}, pCb);};
		this.getSigu = function(pSido, pCb){this.postAjax(this.mUrl, 'json', {method:'sigu', sido: pSido}, pCb);};
		this.getDong = function(pGugun, pCb){this.postAjax(this.mUrl, 'json', {method:'dong', gugun: pGugun}, pCb);}; // 동 가져오기
		this.findPost = function(pMode, pWord, pCb){this.postAjax(this.mUrl, 'json', {method:'findPost', options : {mode :pMode, word: pWord}}, pCb);};
		this.getSidoByRoad = function(pCb){this.postAjax(this.mUrl, 'json', {method:'sidoWithRoad'}, pCb);};
		this.getGugunByRoad = function(pCode,pCb){this.postAjax(this.mUrl, 'json', {method:'gugunWithRoad', code:pCode}, pCb);};
		this.findPostWithRoad = function(pCode,pSearch,pCb){this.postAjax(this.mUrl, 'json', {method:'findPostWithRoad', code:pCode, search:pSearch}, pCb);};
	};
	c.Address.prototype = new c.Ajax();
	c.address = new c.Address();
	
	/* Cart cart.json */
	c.Cart = function() {
		this.mUrl = '/green/webpage/ajax/cart.json';
		this.addCart = function(pList, pCb) {this.postAjax(this.mUrl, 'json', {method:'add', list: pList}, pCb);};
		this.removeCart = function(pStore, pList, pCb) {this.postAjax(this.mUrl, 'json', {method:'remove', storeCd:pStore, list : pList}, pCb);};
		this.changeQtyAll = function(pGoodsCd, pMall, pStore, pqty, pCb) {this.postAjax(this.mUrl, 'json', {method:'changeQtyAll', goodsCd: pGoodsCd, mall_cd:pMall, store_cd:pStore, qty:pqty}, pCb);};
		this.getDlvFreeGoods = function(pPay, pSize, pMall, pStore, pCb) {this.postAjax(this.mUrl, 'json', {method:'dlvSaveGoods', options : {pay:pPay, size:pSize, mall_cd:pMall, store_cd:pStore}}, pCb);};
		this.changeQty = function(pOpt, pCb) {this.postAjax(this.mUrl, 'json', {method:'changeQty', options: pOpt}, pCb);};
		this.getItem = function(pGoodsCd, pMallCd, pStoreCd, pCb) {this.postAjax(this.mUrl, 'json', {method:'getItem', options: {goodsCd: pGoodsCd, mallCd:pMallCd, storeCd:pStoreCd}}, pCb);};
		this.getQuickInfo = function(pMode,pCb){this.postAjax(this.mUrl, 'json', {method:'quickInfo', mode :pMode}, pCb);};
		this.onsuCartLog = function(pGoodsCd, pBeforeStoreCd, pDelGb, pCb){this.postAjax(this.mUrl, 'json', {method:'onsuCartLog', goodsCd: pGoodsCd, beforeStoreCd: pBeforeStoreCd, delGb: pDelGb}, pCb);};
		this.chkAckYn = function(pGoodsCd, pCb) {this.postAjax(this.mUrl, 'json', {method:'chkAckYn', goodsCd: pGoodsCd}, pCb);};
	};
	c.Cart.prototype = new c.Ajax();
	c.cart = new c.Cart();
	
	/* Concern concer.json */
	c.Concern = function() {
		this.mUrl = '/green/webpage/ajax/concern.json';
		this.getGroup = function(pCb){this.postAjax(this.mUrl, 'json', {method:'getGroup'}, pCb);};
		this.addGroup = function(pName, pCb){this.postAjax(this.mUrl, 'json', {method:'addGroup', cgr_nm: pName}, pCb);};
		this.add = function(p, pCb){this.postAjax(this.mUrl, 'json', {method:'add', options: p}, pCb);};
	};
	c.Concern.prototype = new c.Ajax();
	c.concern = new c.Concern();
	
	/* Coupon coupon.json */
	c.Coupon = function() {
		this.mUrl = '/green/webpage/ajax/coupon.json';
		this.getCoupon = function(pOpt, pCb){this.postAjax(this.mUrl, 'json', {method:'getCoupon', options:pOpt}, pCb);};
		this.useCoupon = function(pOpt, pCb){this.postAjax(this.mUrl, 'json', {method:'useCoupon', options:pOpt}, pCb);};
		this.listCoupon = function(pOpt, pCb){this.postAjax(this.mUrl, 'json', {method:'listCoupon', options:pOpt}, pCb);};
		this.itemCoupon = function(pOpt, pCb){this.postAjax(this.mUrl, 'json', {method:'itemCoupon', options:pOpt}, pCb);};
		this.calcCoupon = function(pOpt, pCb){this.postAjax(this.mUrl, 'json', {method:'calcCoupon', options:pOpt}, pCb);};
	};
	c.Coupon.prototype = new c.Ajax();
	c.coupon = new c.Coupon();
	
	/* Coupon outalram.json */
	c.Outalram = function() {
		this.mUrl = '/green/webpage/ajax/outalram.json';
		this.getGoodsInfo = function(pOpt, pCb){this.postAjax(this.mUrl, 'json', {method:'getGoodsInfo', options:pOpt}, pCb);};
		this.alramRegist = function(pOpt, pCb){this.postAjax(this.mUrl, 'json', {method:'alramRegist', options:pOpt}, pCb);};
	};
	c.Outalram.prototype = new c.Ajax();
	c.outalram = new c.Outalram();
	
	try {
		c.cart.order = new COrd();		
	} catch (e) {
		
	}
	
	c.Order = function(){
		this.mUrl = '/green/webpage/ajax/order.json';
		this.dlvOfflineStoreUrl = '/green/webpage/order/order_delv_offline_store_check.jsp';
		this.offlinenumberUrl = '/green/webpage/order/delv_offline_store_phone_number_check.jsp';
		this.checkDlvInfoUrl = '/green/webpage/order/chk_dlvinfo_ajax.jsp';
		this.checkSelexInfoUrl = '/green/webpage/order/chk_selexinfo_ajax.jsp';
		/* */
		this.sendOrderGoods = function(pGoods, pCb) {this.postAjax(this.mUrl, 'json', {method:'sendOrderGoods', goods:pGoods}, pCb);};
		this.checkOrderList = function(pOpt, pCb) {this.postAjax(this.mUrl, 'json', {method:'checkOrderList', options:pOpt}, pCb);};
		this.checkDlvOfflineStore = function(pPost, pGoods, pIsEmployee, pCb) {this.postAjax(this.dlvOfflineStoreUrl, 'json', {zipCode:pPost, allGoodsCd:pGoods, isEmployee:pIsEmployee}, pCb);};
		this.offflineInfo = function(pStoreCd, pGCl, pCb) {this.postAjax(this.offlinenumberUrl, 'json', {storeCd:pStoreCd, gCl:pGCl}, pCb);};
		this.checkDlvInfo = function(pPost, pGoods, pCb) {this.postAjax(this.checkDlvInfoUrl, 'json', {post: pPost, goods_list:pGoods}, pCb);};
		this.checkSelexInfo = function(pPost, pGoods, pCb) {this.postAjax(this.checkSelexInfoUrl, 'json', {post:pPost, goods_list:pGoods}, pCb);};
		this.checkSoldOutGoods = function(pAllGoodsCd, pCb) {this.postAjax(this.mUrl, 'json', {method:'checkSoldOutGoods', goodsCdList:pAllGoodsCd}, pCb);};
		//2016.01.21 주문하기 클릭 시 우편번호와 주소1 일치여부 체크
		this.checkZipCodeAddr1 = function(pZipCode, pAddr1, pDeliveryCnt, pCb) {this.postAjax(this.mUrl, 'json', {method:'checkZipCodeAddr1', zipCode:pZipCode, addr1:pAddr1, deliveryCnt:pDeliveryCnt}, pCb);};
		//2016.07.20 매장배송 및 매장픽업 여부 체크
		this.checkDelivYnPickupYn = function(pStoreCd, pCb) {this.postAjax(this.mUrl, 'json', {method:'checkDelivYnPickupYn', storeCd:pStoreCd}, pCb);};
		//2016.09.21 매장픽업 혜택
		this.checkPickupBenefit = function(pTime, pCb) {this.postAjax(this.mUrl, 'json', {method:'checkPickupBenefit', time:pTime}, pCb);};
		/*기본주소지정 후 내용이 상이할때 저장여부 묻고 저장하기 SJL 20180615*/
		this.checkBasicAddress = function(pOpt, pCb) {this.postAjax(this.mUrl, 'json', {method:'checkBasicAddress', options:pOpt}, pCb);};
		this.insertBasicAddress = function(pOpt, pCb) {this.postAjax(this.mUrl, 'json', {method:'insertBasicAddress', options:pOpt}, pCb);};
	};
	c.Order.prototype = new c.Ajax();
	c.order = new c.Order();
	
	c.Community = function() {
		this.mUrl = '/green/webpage/ajax/community.json';
		/* goods seach */
		this.getGoodsCategorys = function(pCb) {this.postAjax(this.mUrl, 'json', {method:'categorys'}, pCb);};
		this.searchByCategorys = function(p,pCb) {this.postAjax(this.mUrl, 'json', {method:'searchByCategorys', options:p}, pCb);};
		this.insertEventTail = function(p,pCb) {
			var contents  = p.contents;
            var muid = p.muid ;
            var newP = {
				mode : 'xmlInsertTailDB',
				muid : muid,
				contents : contents,
				options : {}
			};
          	this.postAjax('/green/webpage/community/event/preview.jsp', 'json', newP , function(data) {
          		pCb({ result : true });
			});
		//	this.postAjax(this.mUrl, 'json', {method:'insertEventTail', options:p}, pCb);
		};
		this.deleteEventTail = function(p,pCb) {this.postAjax(this.mUrl, 'json', {method:'deleteEventTail', options:p}, pCb);};
		this.btnHandlerMessage = function(p,pCb) {this.postAjax(this.mUrl, 'json', {method:'btnHandlerMessage', options:p}, pCb);};
		this.deleteEventReview = function(p,pCb) {this.postAjax(this.mUrl, 'json', {method:'deleteEventReview', options:p}, pCb);};
		this.getMonthOrderList = function(p,pCb) {this.postAjax(this.mUrl, 'json', {method:'getMonthOrderList', options:p}, pCb);};
		this.getOrderList      = function(p,pCb) {this.postAjax(this.mUrl, 'json', {method:'getOrderList', options:p}, pCb);};
	};
	c.Community.prototype = new c.Ajax();
	c.community = new c.Community();
	
	/* oneonequs seach */
	c.OneoneSeach = function() {
		this.mUrl = '/green/webpage/ajax/oneonequsSeach.json';
		this.searchOneOneBySearch = function(p,pCb) {this.postAjax(this.mUrl, 'json', {method:'searchOneOneBySearch', options:p}, pCb);};
	};
	c.OneoneSeach.prototype = new c.Ajax();
	c.oneoneseach = new c.OneoneSeach();
	
	/* DeleteFavStore */
	c.DeleteFavStore = function() {
		this.mUrl = '/green/webpage/ajax/deletefavstore.json';
		this.selectFavStores = function(p, pCb) {this.postAjax(this.mUrl, 'json', {method:'seleteFavStore', options:p}, pCb);};
		this.deleteFavStores = function(p, pCb) {this.postAjax(this.mUrl, 'json', {method:'deleteFavStore', options:p}, pCb);};
	};
	c.DeleteFavStore.prototype = new c.Ajax();
	c.deleteFavStore = new c.DeleteFavStore();
	
	/* point */
	c.Point = function() {
		this.mUrl = '/green/webpage/ajax/point.json';
		this.getPoint = function(p,pCb) {this.postAjax(this.mUrl, 'json', {method:'getPointList'}, pCb);};
	};
	c.Point.prototype = new c.Ajax();
	c.point = new c.Point();
	
	/* EntrGoodsList */
	c.EntrGoods = function() {
		this.mUrl = '/green/webpage/ajax/entrgoods.json';
		this.getList = function(pCb) {this.postAjax(this.mUrl, 'json', {method:'getList'}, pCb);};
	};
	c.EntrGoods.prototype = new c.Ajax();
	c.entrgoods = new c.EntrGoods();
	/* SmartView */
	c.SmartView = function() {
		this.mUrl = '/green/webpage/ajax/smart_view_data.json';
		this.saveFrqView = function(p,pCb) {this.postAjax(this.mUrl, 'json', {method:'saveFrqView', options:p}, pCb);};
		this.getNewSaveFrqView = function(pCb) {this.postAjax(this.mUrl, 'json', {method:'getNewSaveFrqView'}, pCb);};
		this.getMyContentsInfo = function(p,pCb) {this.postAjax(this.mUrl, 'json', {method:'getMyContentsInfo', options:p}, pCb);};
		this.getLatestEvnetInfo = function(pCb) {this.postAjax(this.mUrl, 'json', {method:'getLatestEvnetInfo'}, pCb);};
		this.getFrqGoodsInfo  = function(p, pCb) {this.postAjax(this.mUrl, 'json', {method:'getFrqGoodsInfo', options:p}, pCb);};
		this.getRecentPurchaseInfo = function(pCb) {this.postAjax(this.mUrl, 'json', {method:'getRecentPurchaseInfo'}, pCb);};
		this.getSmartStoreInfo = function(p, pCb) {this.postAjax(this.mUrl, 'json', {method:'getStoreInfo', options:p}, pCb);};
	};
	c.SmartView.prototype = new c.Ajax();
	c.smartview = new c.SmartView();
	
	/* Event event.json */
	c.Event = function() {
		this.mUrl = '/green/webpage/ajax/roulette.json';
		this.mUrl2 = '/green/webpage/ajax/rockPaperScissors.json';
		this.mUrl3 = '/green/webpage/ajax/attendanceStamp.json';
		//2017.03.28 쇼핑보드
		this.mUrl4 = '/green/webpage/ajax/shoppingBoard.json';
		//2017.08.02 매장 배송 이벤트
		this.mUrl5 = '/green/webpage/ajax/storeDelivery.json';
		this.checkRouletteCnt = function(pMbrId, pEvtSdate, pEvtEdate, pEvtEndDay, pCb){this.postAjax(this.mUrl, 'json', {method:'checkRouletteCnt', mbrId:pMbrId, evtSdate:pEvtSdate, evtEdate:pEvtEdate, evtEndDay:pEvtEndDay}, pCb);};
		this.rouletteProc = function(pMbrId, pOnlineId, pEvtSdate, pEvtEdate, pEvtEndDay, pCb){this.postAjax(this.mUrl, 'json', {method:'rouletteProc', mbrId:pMbrId, onlineId:pOnlineId, evtSdate:pEvtSdate, evtEdate:pEvtEdate, evtEndDay:pEvtEndDay}, pCb);};
		this.checkRockPaperScissorsCnt = function(pMbrId, pCb){this.postAjax(this.mUrl2, 'json', {method:'checkRockPaperScissorsCnt', mbrId:pMbrId}, pCb);};
		this.rockPaperScissorsProc = function(pMbrId, pOnlineId, pEvtSdate, pEvtEdate, pRadioSelecteValue, pCb){this.postAjax(this.mUrl2, 'json', {method:'rockPaperScissorsProc', mbrId:pMbrId, onlineId:pOnlineId, evtSdate:pEvtSdate, evtEdate:pEvtEdate, radioSelecteValue:pRadioSelecteValue}, pCb);};
		this.insertAttendanceStamp = function(pMbrId, pMuId, pYyyymm, pCb){this.postAjax(this.mUrl3, 'json', {method:'insertAttendanceStamp', mbrId:pMbrId, muId:pMuId, yyyymm:pYyyymm}, pCb);};
		this.insertAttendanceStampHst = function(pMbrId, pMuId, pSeq, pBenefitFlg, pDtlBenefitType, pDtlPointPay, pDtlCpnId, pCb){this.postAjax(this.mUrl3, 'json', {method:'insertAttendanceStampHst', mbrId:pMbrId, muId:pMuId, seq:pSeq, benefitFlg:pBenefitFlg, dtlBenefitType:pDtlBenefitType, dtlPointPay:pDtlPointPay, dtlCpnId:pDtlCpnId}, pCb);};
		//2017.03.28 쇼핑보드 후기 삭제
		this.deleteEventReview2 = function(p,pCb) {this.postAjax(this.mUrl4, 'json', {method:'deleteEventReview', options:p}, pCb);};
		//2017.03.29 후기 첨부 파일 삭제
		this.deleteAttachfiles = function(p,pCb) {this.postAjax(this.mUrl4, 'json', {method:'deleteAttachfiles', options:p}, pCb);};
		//2017.04.12 이벤트 댓글 등록
		this.insertEventTail2 = function(p,pCb) {this.postAjax(this.mUrl4, 'json', {method:'insertEventTail', options:p}, pCb);};
		//2017.04.19 이벤트 댓글 삭제
		this.deleteEventTails = function(p,pCb) {this.postAjax(this.mUrl4, 'json', {method:'deleteEventTails', options:p}, pCb);};
		//2017.04.21 이벤트 신청 가능여부 체크
		this.selectEventSubChk = function(p,pCb) {this.postAjax(this.mUrl4, 'json', {method:'selectEventSubChk', options:p}, pCb);};
		//2017.04.24 이벤트 신청
		this.insertEventSub = function(p,pCb) {this.postAjax(this.mUrl4, 'json', {method:'insertEventSub', options:p}, pCb);};
		//2017.05.23 이벤트 댓글 수정
		this.modifyEventTails = function(p,pCb) {this.postAjax(this.mUrl4, 'json', {method:'modifyEventTails', options:p}, pCb);};
		//2017.08.02 우편번호로 매장검색
		this.selectStoreSearch = function(pPostCode, pCb) {this.postAjax(this.mUrl5, 'json', {method:'selectStoreSearch', postcode:pPostCode}, pCb);};
		//2017.08.07 매장 쿠폰 지급
		this.storeCouponDown = function(pMbrId, pStoreCd, pStoreGb, pCb) {this.postAjax(this.mUrl5, 'json', {method:'storeCouponDown', mbrId:pMbrId, storeCd:pStoreCd, storeGb:pStoreGb}, pCb);};
		//2017.08.08 응모 횟수 가지고 오기
		this.storeEntryCnt = function(pMbrId, pCb) {this.postAjax(this.mUrl5, 'json', {method:'storeEntryCnt', mbrId:pMbrId}, pCb);};
		//2017.08.09 응모하기
		this.storeEntryWin = function(pMbrId, pCb) {this.postAjax(this.mUrl5, 'json', {method:'storeEntryWin', mbrId:pMbrId}, pCb);};
	};
	c.Event.prototype = new c.Ajax();
	c.event = new c.Event();
	
	/* Util func */
	c.Util = function() {
		this.mBaseurl = '/green';
		this.mSearchUrl = '/green/webpage/ajax/search.json';
		this.getTarget = function(e) {
			var t = null;
			if (e) {t = e.target ? e.target : e.srcElement;}
			return t;
		};
		this.getSession = function(key, callback) {this.session('get', key, '', callback);};
		this.setSession = function(key, value, callback) {this.session('set', key, value, callback);};
		this.session = function (method, key, value, callback) {
			var url = this.mBaseurl + '/webpage/ajax/session.json';
	    	$.ajax({type: 'POST', url: url, dataType: 'json', data: {method: method, key: key, value: value}, success: function( data ) {if(callback) { callback(data);}}});		
		};
		this.autocomplete = function(pKeyword, pLimit, pCb){this.postAjax(this.mSearchUrl, 'json', {method:'autocomplete', keyword:pKeyword, limit:pLimit}, pCb);};
		this.sendForm = function(pAction, pParam, pTarget) {
		     var $form = $('<form style="display: none;" name="TEMP_FORM"></form>');
		     var method = pParam && pParam.method ? pParam.method : 'post'; // sendForm으로 들어온 방식을 체크하기 위해 추가
		     $form.attr('action', pAction);
		     if (pTarget) {
		    	 $form.attr('target', pTarget);
		     }
		     $form.attr('method', method);
		     if (pParam) {
			     var keys = new Array();
			     for (var key in pParam) {keys.push(key);}
			     var len = keys.length;
			     for (var i = 0; i < len;i++) {
			    	 if(keys[i] == 'method') continue; // sendForm으로 들어온 방식을 체크하기 위해 추가
			    		 $form.append($('<input id="'+ keys[i]+'" name="' +keys[i] +'" type="hidden" value="' + pParam[keys[i]]+ '">'));
			     }
		     }
		     $form.appendTo('body');
		     $form.submit();
		};
	};
	c.Util.prototype = new c.Ajax();
	c.util = new c.Util();

	c.alert = function (obj) {
		var pTitle = (obj) && (obj.title) ? obj.title : '';
		var pHtmlMsg = (obj) && (obj.message) ? obj.message : '';
		var pBtnCb = (obj) && (obj.onclick) ? obj.onclick : null;
		var pProgress = (obj) && (obj.progress) ? obj.progress : false;
		var pModal = (obj) && (obj.modal) ? obj.modal : false;
		var pClass = (obj) && (obj.popClass) ? obj.popClass : ''; /*Jin 140430*/
		var $d = $('#popup_alert');
		var $msgCxt = $d.children('#popup_alert_message');
		$d.prop('title', pTitle);
		$msgCxt.html(pHtmlMsg);
		$d.dialog({
			modal : pModal,
			title : pTitle,
			dialogClass : pClass, 
			buttons	: pProgress ? {} : {"확인": function() {
				   if (pBtnCb) {pBtnCb();}; 
				   $( this ).dialog( "close" );
				   if(pClass != '' ){
					   if(pClass== 'dialog-second'){
							$('.dialog-first').css( 'zIndex', 1000 );
					   }  else {
							 $('.dialog-second').css( 'zIndex', 1000 );   
					   }
					   $('.ui-widget-overlay').css('opacity', '1');
				   }
			    }
			}
		});
		$d.dialog('open');
		if(pClass != '' ){
			if(pClass== 'dialog-second'){
				$('.dialog-first').css( 'zIndex', 500 );
				$('.dialog-second').css('zIndex' , 2000);
			}else{
				$('.dialog-second').css( 'zIndex', 500 );
				$('.dialog-last').css('zIndex' , 2000);
			}
			$('.ui-widget-overlay').css('opacity', '0.5');
			
		}
		
	};
	
	c.confirm = function (obj) {
		var pTitle = (obj) && (obj.title) ? obj.title : '';
		var pHtmlMsg = (obj) && (obj.message) ? obj.message : '';
		var pBtnCb = (obj) && (obj.onclick) ? obj.onclick : null;
		var pModal = (obj) && (obj.modal) ? obj.modal : false;
		var $d = $('#popup_confirm');
		var $msgCxt = $d.children('#popup_confirm_message');
		$d.prop('title', pTitle);
		$msgCxt.html(pHtmlMsg);
		$d.dialog({
			title : pTitle,
			modal : pModal,
			//open : function(){ $('.ui-dialog').css({ zIndex: 1000 });},
			buttons: {
				"확인": function() {if (pBtnCb) {pBtnCb('positive');}; $(this).dialog("close");},
				"취소": function() {if (pBtnCb) {pBtnCb('negative');}; $(this).dialog("close");}
			}
		});
		$d.dialog('open');
	};
	
	
};

Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};
//
Date.prototype.isValidDay = function(yyyy,mm,dd){
	
	var m = parseInt(mm,10)-1;
	var d = parseInt(dd,10);
	var last_mon = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
	
	if( (yyyy % 4 == 0 && yyyy % 100 != 0) || (yyyy % 400) == 0){
		last_mon[1] = 29;
	}
	
	return (d >=1 && d <= last_mon[m]);
	
};

Date.prototype.toTimeObj = function(time){
	
	var year = parseInt(time[0],10);
	var month = parseInt(time[1],10);
	var day = parseInt(time[2],10);
	return new Date(year, (month -1), day);
	
};
Date.prototype.parseISO8601 = function(dateStringInRange) {
    var isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/,
    date = new Date(NaN), month,
    parts = isoExp.exec(dateStringInRange);

	if(parts) {
	  month = +parts[2];
	  date.setFullYear(parts[1], month - 1, parts[3]);
	  if(month != date.getMonth() + 1) {
	    date.setTime(NaN);
	  }
	}
	return date;
};

//화면의 끝날짜에서 1,3,6 개월 전의 날짜를 계산해서..셋팅 
function makeStartDate( startDay, flg ) {
	
	var tempDate = startDay.split("-") ;
	var date = new Date();
	var sDate = date.toTimeObj(tempDate);
	var tempDate = new Date();
	var year = sDate.getFullYear();
	var month = sDate.getMonth() +1;
	var day = sDate.getDate();
	var result = {};
		//sDate.setMonth();
	tempDate.setFullYear(sDate.getFullYear(), (sDate.getMonth()+flg),  sDate.getDate());
	var yyyy = tempDate.getFullYear() ;
	var mm ;
	if(sDate.getFullYear() == yyyy){
	    mm = tempDate.getMonth() + 1;
	}else {
		mm = tempDate.getMonth() + 1;
		if(mm > 12){
		    mm = mm-1;
		}
	}
	if(date.isValidDay(year, month, day)== false){
		dd = dd+1;
	}
	var dd =  tempDate.getDate();
	result[0] = yyyy;
	result[1] = mm;
	result[2] = dd;
    return 	result;
}

String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};
// LTRIM
String.prototype.ltrim = function(){var re = /\s*((\S+\s*)*)/;return this.replace(re, "$1");};
// RTRIM
String.prototype.rtrim = function(){var re = /((\s*\S+)*)\s*/;return this.replace(re, "$1");};
// TRIM
String.prototype.trim = function(){return this.ltrim().rtrim();};

//replaceALL
String.prototype.replaceAll = function(str1, str2){
 var temp = this;
/*
 * 무한루프의심으로 임시변경
 while(1){
  if( temp.indexOf(str1) != -1 )
   temp = temp.replace(str1, str2);
  else
  break;
 }
 */
 if( temp.indexOf(str1) != -1 )
	   temp = temp.replace(str1, str2);
 return temp;
};

//플래시 파일 로드 함수
function loadFlash(objSrc, width, height, wmode) {
	var obj = '';
	obj += '<object type="application/x-shockwave-flash" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="'+width+'" height="'+height+'">';
	obj += '<param name="movie" value="'+objSrc+'">';
	obj += '<param name="quality" value="high">';
	obj += '<param name="bgcolor" value="#000000">';
	obj += '<param name="wmode" value="'+wmode+'">';
	obj += '<param name="menu" value="false">';
	obj += '<param name="Command" value="Close">';
	obj += '<param name="swliveconnect" value="true">';
	obj += '<embed src="'+objSrc+'" quality=high bgcolor="#000000" width="'+width+'" height="'+height+'" swliveconnect="true" id="param" name="param" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"><\/embed>';
	obj += '<\/object>';
	document.write(obj);
}


// 새창띄우기
function fncOpenPanel(strUrl, inrWidth, intHeight) {
	var newp = "width=" + inrWidth + ", height=" + intHeight + ", directories=no, scrollbars=no, resizable=yes";
	window.open(strUrl, "new", newp);
}


// 새창띄우기 스크롤
function fncOpenPanel_SC(strUrl, inrWidth, intHeight) {
	var newp = "width=" + inrWidth + ", height=" + intHeight + ", directories=no, scrollbars=yes, resizable=no";
	window.open(strUrl, "new", newp);
}


// 숫자만 입력
function onlyNumber() {

		if((event.keyCode<48)||(event.keyCode>57))
	{
		alert('숫자만 입력 가능합니다');
		event.returnValue=false;
	}
}

function onlyNum(e){
	if(!window.event&&!e) return;
	var keyCode = window.event ? window.event.keyCode:e.which;

	if((48<= keyCode && keyCode <= 57) || keyCode==0 || keyCode==45 || keyCode==8){
		return;
	}else{
		if(window.event) window.event.returnValue = false;
		else e.preventDefault();
	}
}

function checkZero(e) {
	var t = choroc.util.getTarget(e||window.event);
	if (t.value === '0') {
		t.value = '1';
	}
	
}

//yyyyMMdd 형식의 오늘 날짜 구하기
function getToDay(){
    var today = new Date();
    var year = today.getFullYear();//년을얻을땐 getFullYear()를 써야한다는 점! 주의
    var month = today.getMonth();
    var day = today.getDate();
    if((month+1) < 10){
        month =  "0" + (month + 1);
    }else{
        month = month + 1;
    }

    if(day < 10){
        day = "0" + day;
    }
    return year +""+ month +""+ day;
}

// 자릿수확인(최소글자수)
function fncMinCheck(strFrmName, strFieldName, strFieldNickName, intMin) {

	var strCheckObj = eval("document."+strFrmName+"."+strFieldName);

	if (strCheckObj.value.length < intMin) {
		alert(strFieldNickName+" 항목을 확인하세요.\n"+strFieldNickName+" 항목은 "+intMin+"글자 이상이어야 합니다.");
		strCheckObj.focus();
		return false;
	}
	else { return true; }

}


// 자릿수확인(최대글자수)
function fncMinMaxCheck(strFrmName, strFieldName, strFieldNickName, intMin, intMax) {

	var strCheckObj = eval("document."+strFrmName+"."+strFieldName);
	if (strCheckObj.value.length < intMin || strCheckObj.value.length>intMax) {
		alert(strFieldNickName+" 항목을 확인하세요.\n"+strFieldNickName+" 항목을 "+intMin+"글자 이상 "+intMax+"글자 이하이어야 합니다.");
		strCheckObj.focus();
		return false;
	}
	else { return true; }

}


// 공란체크
function fncNullCheck(strFrmName, strFieldName, strFieldNickName) {

	var strCheckObj = eval("document."+strFrmName+"."+strFieldName);
	if (strCheckObj.value.indexOf(" ")>0) {
		alert(strFieldNickName+" 항목을 확인하세요.\n"+strFieldNickName+" 항목에 공란은 허용되지 않습니다.");
		strCheckObj.focus();
		return false;
	}
	else { return true; }
}


// 숫자만 등록되도록 체크
function fncValidString09Check (strFrmName, strFieldName, strFieldNickName) {

    var ValidString="0123456789";
	var strCheckObj = eval("document."+strFrmName+"."+strFieldName);
	for (var i = 0; i < strCheckObj.value.length; i++) {
		if(ValidString.indexOf(strCheckObj.value.substring(i,i+1))<0) {
			alert(strFieldNickName+" 항목에 허용할 수 없는 문자가 입력되었습니다.\n"+strFieldNickName+" 항목은 숫자로만 등록하실 수 있습니다.");
			strCheckObj.focus();
 			return false;
		}
    }
    return true;
}


// 숫자와 알파벳만 등록되도록 체크
function fncValidString09AZCheck (strFrmName, strFieldName, strFieldNickName) {

    var ValidString="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var strCheckObj = eval("document."+strFrmName+"."+strFieldName);
	
        for (var i = 0; i < strCheckObj.value.length; i++) {
                if(ValidString.indexOf(strCheckObj.value.substring(i,i+1))<0) {
                        alert(strFieldNickName+" 항목에 허용할 수 없는 문자가 입력되었습니다.\n"+strFieldNickName+" 항목은 영문자와 숫자로만 등록하실 수 있습니다.");
						strCheckObj.value="";
                        strCheckObj.focus();
                        return false;
                }
        }
        return true;
        
}


// 숫자와 알파벳 및 '-'만 등록되도록 체크
function fncValidString09AZDashCheck (strFrmName, strFieldName, strFieldNickName) {

    var ValidString="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-";
	var strCheckObj = eval("document."+strFrmName+"."+strFieldName);
	
        for (var i = 0; i < strCheckObj.value.length; i++) {
                if(ValidString.indexOf(strCheckObj.value.substring(i,i+1))<0) {
                        alert(strFieldNickName+" 항목에 허용할 수 없는 문자가 입력되었습니다.\n"+strFieldNickName+" 항목은 영문자와 숫자로만 등록하실 수 있습니다.");
						strCheckObj.value="";
                        strCheckObj.focus();
                        return false;
                }
        }
        return true;
        
}


function fncValidPasswordCheck (strFrmName, strFieldName, strFieldNickName) {
	return true;
}


// 숫자만입력되게처리
function checkNumberKey(str)
	{
		if (event.keyCode != 8)
		{
			if (event.keyCode < 45 || event.keyCode > 57 || ((event.keyCode > 32 && event.keyCode < 48) || (event.keyCode > 57 && event.keyCode < 65) || (event.keyCode > 90 && event.keyCode < 97)))
		    	event.returnValue = false;
		}
	}


// 이메일 유효체크
function fncValidEmailCheck(frm,fieldname)
{
	reg = new RegExp("^[\\w\\-]+(\\.[\\w\\-_]+)*@[\\w\\-]+(\\.[\\w\\-]+)*(\\.[a-zA-Z]{2,3})$", "gi");
	var emailobj = eval("document"+"."+frm+"."+fieldname);
	if (!reg.test(emailobj.value))
	{
		alert("잘못된 형식의 이메일 주소입니다.\n다시 입력해주세요.");
		emailobj.focus();
		return false;
	}
	else
		return true;
}



// 다음객체로 포커스이동
function funcNextFocus(frm,str,length,nextstr){

	var strCheckObj=eval("document"+"."+frm+"."+str);
	var strNextObj =eval("document"+"."+frm+"."+nextstr);

	if(length==strCheckObj.value.length){
		strNextObj.focus();
	}
}


// 체크박스 값변경
function chkval(frm,str){
	var strCheckObj=eval("document"+"."+frm+"."+str);
	if(strCheckObj.value=='Y'){
		strCheckObj.value='N';
	}
	else{
		strCheckObj.value='Y';
	}
}	


// check 한 개수를 리턴한다. 
function getCheckedCount( aElem )
{ 
	var elem = document.all; 
	var cnt = 0; 

	for ( var i=0; i < document.all.length; i++ )
	{ 
		if ( ( elem[i].type == "checkbox" ) && ( elem[i].checked ) && ( elem[i].name == aElem ) )
			cnt = cnt + 1; 
	} 
	return cnt; 
} 


// 지정된 이름을 가진 모든 checkbox를 check한다
function checkAll( aElem )
{ 
	var elem = document.all; 
	var cnt = 0; 
    
	for ( var i = 0; i < document.all.length; i++ ){ 
		if ( ( elem[i].type == "checkbox" ) && ( elem[i].name == aElem ) ) elem[i].checked = true; 
	} 
} 


// 지정된 이름을 가진 모든 checkbox를 check 해제한다
function uncheckAll( aElem )
{ 
	var elem = document.all; 
	var cnt = 0; 
    
	for ( var i=0; i < document.all.length; i++ ){ 
		if ( ( elem[i].type == "checkbox" ) && ( elem[i].name == aElem ) ) elem[i].checked = false; 
	} 
} 


// 지정한 이름을 가진 모든 checkbox의 checked 값을 반전 한다. 
function invertCheck( aElem )
{ 
	var elem = document.all; 
	var cnt = 0; 

	for ( var i=0; i < document.all.length; i++ )
	{ 
		if ( ( elem[i].type == "checkbox" ) && ( elem[i].name == aElem ) )
		{ 
			if ( elem[i].checked )
			{ 
				elem[i].checked = false; 
			} 
			else
			{
				elem[i].checked = true; 
			} 
		} 
	} 
}  


// Radio에서 check 한 개수를 리턴한다. 
function getRadioCheckedCount( aElem )
{ 
	var elem = document.all; 
	var cnt = 0; 

	for ( var i=0; i < document.all.length; i++ )
	{ 
		if ( ( elem[i].type == "radio" ) && ( elem[i].checked ) && ( elem[i].name == aElem ) )
			cnt = cnt + 1; 
	} 
	return cnt; 
} 


//지정된 이름을 가진 radio 폼의 선택 값을 리턴하다.
function getCheckedValue(radioObj) {
	if(!radioObj)
		return "";
	var radioLength = radioObj.length;
	if(radioLength == undefined)
		if(radioObj.checked)
			return radioObj.value;
		else
			return "";
	for(var i = 0; i < radioLength; i++) {
		if(radioObj[i].checked) {
			return radioObj[i].value;
		}
	}
	return "";
}

/** 
// get 방식의 파라미터를 해당폼에 input hidden 객체로 생성한다. 
*/
function get2post(frm,sSearch)
{ 
	if (sSearch.length > 0)
	{ 
		var asKeyValues = sSearch.split('&');
		var asKeyValue  = '';

		for (var i = 0; i < asKeyValues.length; i++)
		{
			asKeyValue = asKeyValues[i].split('=');
			var e = document.createElement("input");
			e.setAttribute("type","hidden");
			e.setAttribute("name",asKeyValue[0]);
			e.setAttribute("value",asKeyValue[1]);
			e.setAttribute("_temp","true");
			//  alert("[" + e.name +"]:[" + e.value +"]"); 
			frm.appendChild(e);
		}
	}
	//  alert("form 객체 갯수" + frm.elements.length);
}  


// get2post로 생성한 임시 객체를 파괴한다.  
function removeTempAttribute(frm)
{
	var idx=0;
	while (idx < frm.elements.length)
	{
		var obj = frm.elements[idx];

		if( obj.getAttribute("_temp") != null && obj.getAttribute("_temp") == "true")
		{
			frm.removeChild(obj);
			continue;
		}
		idx++;
	}
}


//--- 페이징에서 쓸 함수
function goPage(pageUrl,tmpParam,tmppage)
{
	var ttFrm = document.temporaryFrm;
	ttFrm.method = "post";
	ttFrm.action = pageUrl ;
	get2post(ttFrm,tmpParam+"&page="+tmppage);
	ttFrm.submit();
	removeTempAttribute(ttFrm);
}


//이미지 크기에 맞는 새창 띄우기
//<a href="#" onClick="popimage('img01.jpg',250,167);return false">이미지 팝업 1</a>
function popimage(imagesrc,winwidth,winheight,wintitle)
{
	var look='width='+winwidth+',height='+winheight+',' ;
	popwin=window.open("","",look);
	popwin.document.open();
	popwin.document.write('<title>'+wintitle+'</title><body topmargin=0 leftmargin=0><img style=cursor:hand; onclick="self.close()" src="'+imagesrc+'"></body>');
	popwin.document.close();
}
function replace_pop(goods_cd){
	var winleft = (screen.width - 350) / 2;
	 var wintop = (screen.height - 450) / 2;
	 window.open("../popup/replace_goods.jsp?goods_cd="+goods_cd,"","scrollbars=no, width=532, height=283 left="+winleft+" top="+wintop+"");
}


/**
*/
function getZipOpen(webUrl, fname, zip1, addr1, addr2){
	var zipWin = window.open(webUrl + "zipcode/search_Addr_b.jsp?form="+fname+"&zip1="+zip1 +"&addr1="+addr1+"&addr2="+addr2 , 'winZipOpen', 'toolbar=no,width=388,height=365,screenX=150,screenY=150,status=no,scrollbars=no,resize=yes');
	if(zipWin) zipWin.focus();
}

// 숫자만 입력
function fnCheckNum(objInput) { 
  var szBuff = "";
  var chBuff = '';
  var szTemp = "";
  var i = 0;

  szBuff = objInput.value;
  for(var i=0; i < szBuff.length; i++) {
    chBuff = szBuff.charAt(i);
    if( (chBuff < '0' || chBuff > '9') ) {
      for(var j=0; j < szBuff.length; j++) {
        chBuff = szBuff.charAt(j);
        if( (chBuff < '0' || chBuff > '9') ) {
          continue;
        } else {
          szTemp = szTemp + chBuff;
        }
      }
      objInput.value = szTemp;

      return;
    }
  }
}

/*************************************
| 숫자체크
| 인자 : 체크할 문자열
| return : true/false
*************************************/
function _fnNumberOnlyByString(szBuff) {
	var chBuff = '';
	//szBuff = objInput.value;
	for( var i = 0; i < szBuff.length; i++ ) {
	    chBuff = szBuff.charAt(i);
	    if( (("0123456789").indexOf(chBuff) > -1) ) {
	    	continue;
	    } else 
	    	return false;
	}
	return true;
}


function fnSetComma(val, flag) {
	
	return ('' + val).numberFormat();
	//src.value = newVal;
//	return newVal;
	/*
	return;

	if(flag == 1) {
		return fnComma1000(src, flag);
	}
	*/
}

//26_1. 0값일때 값 비우기
function setZeroToEmpty(obj) {
	if(obj.value.replace(/ /gi, '0') ==  '0') {			
		obj.value = "";
		return true;
	}
	return false;
}

String.prototype.toInt = function() { 
    if(/^-/.test(this)) { 
        return this.replace(/\..*$/g, '').replace(/[^\d]/g, '') * -1; 
    } else { 
        return this.replace(/\..*$/g, '').replace(/[^\d]/g, '') * 1; 
    } 
};
String.prototype.toNum = function() { 
    if(/^-/.test(this)) { 
        return this.replace(/(\.[^\.]+)\..*$/g, '$1').replace(/[^\d\.]/g, '') * -1.0; 
    } else { 
        return this.replace(/(\.[^\.]+)\..*$/g, '$1').replace(/[^\d\.]/g, '') * 1.0; 
    } 
};
String.prototype.numberFormat = function() { 
    var num = (this.toNum() + '').split(/\./);
    var commal = function(text) { 
        var ret = text.replace(/(\d)(\d{3},)/g, '$1,$2'); 
        if(ret == text) return ret; 
        return commal(ret); 
};
//if (!String.prototype.trim) {
	String.prototype.trim = function() {
		var buffer ="";
		var c = ' ';
		for (var i = 0; i < this.length; i++){
			c = this.charAt(i);
			if (c != ' ' && c != '\t')
				buffer += c;
		}
		return buffer;
	};
//}
var commar = function(text) { 
	var ret = text.replace(/(,\d{3})(\d)/g, '$1,$2'); 
	if(ret == text) return ret; 
	return commar(ret); 
};
var ret = commal(num[0].replace(/(\d)(\d{3})$/g, '$1,$2')); 
    if(num.length > 1) { 
        ret += '.' + commar(num[1].replace(/^(\d{3})(\d)/g, '$1,$2')); 
    } 
    return ret; 
};

function len_check(data){
	var temp_estr = escape(data);
	var s_index   = 0;
	var e_index   = 0;
	var temp_str  = "";
	var cnt       = 0;
	while ((e_index = temp_estr.indexOf("%u", s_index)) >= 0){
	 temp_str += temp_estr.substring(s_index, e_index);
	 s_index = e_index + 6;
	   cnt ++;
	}
	temp_str += temp_estr.substring(s_index);
	temp_str = unescape(temp_str);  // 원래 문자열로 바꾼다.

	rslt_val = (cnt * 2) + temp_str.length;

	if(rslt_val > 1000){
	 alert("제목은 1000Byte를 초과할 수 없습니다.");
	 frm.title.focus();
	 return; 
	}
}


//community view link
function viewCommunity(homeurl, bid, muid) {
	window.location.href = homeurl + "/board/"+bid+"/"+muid;
}

function viewMyPageEvent(url, bid,muid) {
	window.location.href = 'http://localhost:8080/green'+ url + '?mode=VIEW&muid='+muid;
}
// 20. 입력값의 바이트 길이를 리턴/글자수 체크 함수, 경고창포함 (return 값 )

function getByteLengthWithAlt(fform,maxlength) {
	var msgtext, msglen;
	msgtext = fform.value;
	var i=0,l=0;
	var temp,lastl;

	
	//길이를 구한다.
	while(i < msgtext.length)
	{
		temp = msgtext.charAt(i);
		if (escape(temp).length > 4)
			l+=2;
		else if (temp!='\r')
			l++;
		// OverFlow
		if(l>maxlength)
		{
			alert("허용 길이 이상의 글을 쓰셨습니다.\n한글 "+ parseInt(maxlength/3) +"자, 영문"+ maxlength +"자까지만 쓰실 수 있습니다.");
			temp = fform.value.substr(0,i);
			fform.value = temp;
			l = lastl;
			return false;
			//break;
		}
		lastl = l;
		i++;
	}
	return true;
}


function _GoPayment1(webURL, goods_cd, media_cd, category_id){
	//2015.06.11 장바구니 등록 전에 상품구분이 매장인지 아닌지 체크
	choroc.cart.chkAckYn(goods_cd, function(data){
		if(data){
			if(data.ackYn == "0"){
				choroc.alert({message:'이 상품은 매장전용 상품입니다.'});
				choroc = false;
				return;
			}else{
				var confirm = choroc.confirm;
				confirm({message:"정기구매, 예약상품 또는 상품권은 장바구니 이용이 불가합니다. \n 바로구매를 하시겠습니까?",
					onclick : function(which) {
						switch(which) {
						case 'positive': {
							var sel_goods =goods_cd+'/'+1;
				//			location.href = webURL + "order/login_check.jsp?media_cd="+media_cd+"&category_id="+category_id+"&sel_goods="+sel_goods;
							location.href = webURL + "shoppingcart/cart.jsp?media_cd="+media_cd+"&category_id="+category_id+"&sel_goods="+sel_goods;
							break;
						}
						}
					}
				});
			}
		}
	});
}

function _GoPayment2(webURL, data){

	if(!data || data == '') return;

	var arrData = data.split("^"); //상품코드^수량^미디어^카테고리	
	var sel_goods = arrData[0]+"/"+arrData[1];
//	location.href = webURL + "order/login_check.jsp?media_cd="+arrData[2]+"&category_id="+arrData[3]+"&sel_goods="+sel_goods;
	location.href = webURL + "shoppingcart/cart.jsp?media_cd="+arrData[2]+"&category_id="+arrData[3]+"&sel_goods="+sel_goods;
}

// PNG파일 처리
function setPng24(obj) {
	obj.width = obj.height = 1;
	obj.className = obj.className.replace(/\bpng24\b/i,'');
	obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ obj.src + "',sizingMethod='image');";
	obj.src = '';
	return '';
}
function chkText(str)//문자막기
{
	 if(   event.keyCode == 8 
		     || event.keyCode == 9 
		     || event.keyCode == 35 
		        || event.keyCode == 36 
		     || event.keyCode == 37 
		        || event.keyCode == 38
		        || event.keyCode == 39
		     || event.keyCode == 46 
		       || event.keyCode == 15 
		     || event.keyCode == 13){
		   // event.keyCode == 189 || 
		     
		  }else if ((event.keyCode >= 48 && event.keyCode <= 57)||(event.keyCode >= 96 && event.keyCode <= 105)) { //숫자키만 입력
		   return true;
		  } else {
		   event.returnValue = false;
		  }
}
function chkNumber(str)//숫자막기
{
	if (event.keyCode != 8 || event.keyCode !=16 || event.keyCode != 9 || event.keyCode != 21)
	{
		if (event.keyCode < 65 || event.keyCode > 90)
			window.event.returnValue = false;
	}
}

function moveGoodsDetail(goodsCd){
	var prefixUrl = ( goodsCd.indexOf("ER") > -1) ? "nEntr_" : "";
	var storeCd = ( goodsCd.indexOf("ER") > -1) ? 9005 : 9002;
	var mallCd = ( goodsCd.indexOf("ER") > -1) ? 4 : 1;
	
	choroc.util.sendForm("/green/webpage/goods/"+prefixUrl+"goodsDetail.jsp" 
			     , {mall_cd : mallCd ,
			    	store_cd : storeCd,
			    	goods_cd : goodsCd
			    	
			     }, "_blank");
	
}

//facebook
function goFacebook(title){  
	var url_encode = getUrl(); 
    window.open("http://www.facebook.com/sharer.php?u="+url_encode,"fb_pop", "width=560,height=480,scrollbars=no,resizable=no");
}

// twitter
 function goTwitter(title){  
     var text = gettext(title); 
     var url_encode = getUrl();
  	 window.open("http://twitter.com/share?original_referer="+url_encode+"&text="+text + "&url="+url_encode,"recom_icon_popup", "width=560,height=480,scrollbars=no,resizable=no"); 
 }

function gettext(title)
{
	var text = encodeURIComponent("#초록마을[" + title + "]"); 
	return text;
}


function trim(str)
{
    str = str.replace(/\s/g, "");
    return str;
}
 
function special (str) {
    var regid =  /^[-0-9_a-zA-Z.]/;    //["-","_", 0~9, 알파?]이것들만 허용
 
    for (var i=0; i < str .length; i++) { 
        if (str.charAt(i).match(regid)) {       
            //return true;
        } else {
            return false;
        }
    }
}  
 function number(num) {
  var regid =  /^[$0-9]*$/;    //["-","$",0~9]이것들만 허용
  var price = num.match(regid);
  if(num.match(regid)){
   return true;
  }else{
   return false;
  }
 }
function getUrl(){
	return encodeURIComponent(window.location.href); 
	//return encodeURIComponent("http://www.choroc.com/green/webpage/goods/goodsDetail.jsp?&mall_cd=1&store_cd=9002&media_cd=11&category_id=&sort_l=&goods_cd=WG009451");
}
