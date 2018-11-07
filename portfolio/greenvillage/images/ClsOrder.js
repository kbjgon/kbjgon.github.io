var green_cust_cd='1';

var COpt = function() {
	this.GOODS_CD = "";					/* 상품코드 */
	this.GOT_CD = "";					/* 옵션코드 */
	this.GOT_NM = "";					/* 옵션명 */
	this.GOP_CD = "";					/* 옵션상세코드 */
	this.GOP_NM = "";					/* 옵션상세코드명 */
	this.CHOICE_YN = "0";				/* 필수체크여부 */
	
	this.opt_idx = 0;
};

COpt.prototype= {
		
	
	setGotCd:function(gotCd) {
		this.GOT_CD = gotCd;
	},
	setGotNm:function(gotNm) {
		this.GOT_NM = gotNm;
	},
	setGopCd:function(gopCd) {
		this.GOP_CD = gopCd;
	},
	setGopNm:function(gopNm) {
		this.GOP_NM = gopNm;
	},
	getChoiceYn:function() {
		this.CHOICE_YN;
	},
	setChoiceYn:function(yn) {
		this.CHOICE_YN = yn;
	}
};

var CCustomer = function(p) {
	var o = p;
	this.getName = function(){return o.MBR_NM;};
	this.getHomeTel = function() {var tel={}; tel.tel_1 = o.HOME_TEL_1;tel.tel_2 = o.HOME_TEL_2;tel.tel_3=o.HOME_TEL_3; return tel;};
	this.getCellNo = function() {var cell={}; cell.no_1 = o.CELL_NO_1;cell.no_2=o.CELL_NO_2;cell.no_3=o.CELL_NO_3;return cell;};
	this.getAddress = function() {var a={};a.post_ma=o.POST_MA;a.post_sl=o.POST_SL;a.addr_ma=o.ADDR_MA;a.addr_sl=o.ADDR_SL;return a;};
	this.getEMail = function() {return o.EMAIL;};
	this.isRoads = function() {return o.IS_ROADS;};
};

var CGiftCard = function(p) {
	var o = {};
	o.remainder = p.card_use_amt;
	o.amt = p.gift_card_amt;
	o.name = p.goods_nm;
	o.usedt = p.recent_card_use_dt;
	o.regdt = p.reg_dt;
	o.reg_num = p.reg_num;
	o.use = 0;
	this.getRemainder = function(){return o.remainder;};
	this.getAmt = function(){return o.amt;};
	this.getName = function(){return o.name;};
	this.getGubun = function(){return o.gubun;};
	this.getUsedt = function(){return o.usedt;};
	this.getRegdt = function(){return o.regdt;};
	this.getRegNumber = function(){return o.reg_num;};
	this.useAmt = function(){
		if (arguments.length == 1) { /* set */
			var amt = arguments[0];
			if (o.remainder > amt) {
				o.use = amt;
			} else {
				o.use = o.remainder;
			}
		}
		return o.use;
	};
};


var P_IS_PERIOD = false;
var P_PERIOD_TOT_STD_PRC;

var CGood = function(p){
	this.idx;
	this.GOODS_CD = "";					/* 상품코드 */
	this.DTL_NO = -1;					/* 장빠구니 등록 일련 번호 */
	this.ITEM_CD = "";					/* 기간계상품코드 */
	this.OUT_GOODS_CD = "";				/* 제휴상품코드  */ 
	this.GOODS_NM = "";					/* 상품명  */
	this.PACK_GUBUN = 3;				/* 포장구분 1냉동,2냉장,3상온 */
	this.VAT_GUBUN = 1;					/* 과세구분(10101) 0.면세 1.과세 2.영세 3.수입과세 */
	this.STD_PRC = 0;					/* 정상가 */
	this.SALE_PRC = 0;					/* 행사가 */
	this.ROYALTY_AMT = 0;				/* 로얄티할인액 */
	this.DC_PRC = 0;					/* 할인가 =행사가-로얄티할인액 */
	/* 2017.05.19 새로운 행사로 인한 추가 Start */
	this.MBR_LV_AMT = 0;				/* 회원등급별할인액 */
	this.MBR_LV_PRC = 0;				/* 회원등급별 할인가 = 행사가 - 등급별할인액 */
	this.MBR_LV_EVT_CD = "";			/* 회원등급별 행사코드 */
	/* 2017.05.19 새로운 행사로 인한 추가 End */
	this.CUPON_PRC = 0;					/* 쿠폰가 */ 
	this.QTY = 1;						/* 수량 */ 
	//by mhkim
	this.DcQty=0;                      /* 할인된 수량 */
	this.BUY_PRICE = 0;					/* 주문서 소계 */	
//	this.BUY_PRC = 0;					/* 구매가=쿠폰가*수량 */
	this.VAT = 0;						/* 부가세 (round처리) */
	this.VAT2 = 0;						/* 부가세 (round처리) */
	this.VAT3 = 0;						/* 부가세 (round처리) */
	this.EVT_CD = "";					/* 행사코드 (event_mst) */
//	this.SAVE_MLG = 0;					/* 적립마일리지 */
	this.USE_MLG = 0;					/* 사용마일리지 */
	this.CPN_TYPE = "";					/* 쿠폰구분(0:오프라인,1:온라인) */
	this.DISC_TYPE = 1;					/* 할인구분 (1.정액,2정율) */
	this.GOODS_CUPON_NO = "";			/* 상품쿠폰번호 */ 
	this.CPN_SEQ = "";					/* 쿠폰일련번호 ON_CPN_DOWN, CPN_MST */
	this.GOODS_CUPON_AMT = 0;			/* 상품쿠폰사용액 */ 
	this.ORD_CUPON_AMT = 0;				/* 일반쿠폰사용액 */
	this.CANCEL_GUBUN = 0;				/* 취소구분 0정상,1결제전취소,2출고전취소,3반품 */ 
	this.CANCEL_QTY_SUM = 0;			/* 반품누적수량 */
	this.DLV_CUST_YN = 0;				/* 배송구분 0.자사,1.업배 */ 
	this.CUST_CD = "";					/* 협력업체코드 */
	this.REPLACEMENT_GOODS_CD = '';		/* 대체 상품 코드 */
	this.REP_GOODS = {};				/* 대체 상품 정보 */
	this.ACK_YN = 0; 					/* 온라인 /매장상품 유무  0: 매장전용상품 1: 매장&온라인 2:온라인전용상품 */
	this.STOCK_NUM = -1;				/* 재고 수량 */
	this.DMS_CUST_CD = "";				/* DMS CODE*/
	this.unit_mileage = 0;				/* 적립마일리지 (1개당 단위 마일리지) */
	this.needFreezePack = false;
	this.is_free_dlv = false;
	this.is_free_gift = false;
	this.free_gift_item_cd = "";		/* 증정상품 */
	this.free_gift_basic_cnt = 1;		/* 증정상품 기준수량*/
	this.free_gift_cnt = 0;				/* 증정수량*/
	
	this.Cal_Prc=0; //장바구니에서 이벤트 계산 금액
	this.Cal_NOT_DC_Qty=0; //장바구니에서 남은 할인받지 않는 상품 갯수

	this.opt =  new Array(3);
	this.opt_idx = 0;
	this.GOPS = '';
	this.GOTS = '';
	
	/* 상품추가정보 */
	this.RSV_ITEM_YN = "0";
	this.SAVE_MLG_UNIT_QTY = 0;			/* 적립마일리지 기준수량 */
	this.RESV_FDATE = "";				/* 예약시작일 */
	this.RESV_TDATE = "";				/* 예약종료일 */
	this.RESV_CAN_DATE = "";			/* 취소가능일 */
	this.RSV_SET_CD = "";				/* 예약세트코드 */
	this.MEDIA_CD = "";					/* 미디어CD */
	this.CATEGORY_ID = "";
	this.COST_PRC = 0;					/* 원가 */
	//증정쿠폰
	this.EVT_CPN_EVT_CD = "";			/* 이벤트코드 */
	this.EVT_CPN_CPN_CD = "";			/* 쿠폰코드 */
	this.EVT_CPN_UNIT_QTY = 0;			/* 기준수량 */
	this.EVT_CPN_CPN_AMT = 0;			/* 쿠폰금액 */
	this.EVT_CPN_CPN_NM = "";			/* 쿠폰명 */
	//증정상품
	this.EVT_ADD_ITEM_CD = "";			/* 증정상품코드 */
	this.EVT_ADD_UNIT_QTY = 0;			/* 기준수량 */
	this.EVT_ADD_ADD_QTY = 0;			/* 증정수량 */
	
	this.M_EVT_PRC = 0;					/* 상품 멀티 행사 할인 금액 saleprc - evt_dc */
	this.M_ITEM_DC_AMT = 0;				/* 상품별 할인 금액 DC TYPE : 15, 16 */ 
	this.M_EVT_ITEM_CD = '';			/* 상품 멀티 행사 코드*/
	this.M_EVT_PUR_CD = '';				/* 총 구매 금액에 대한 행사 코드 */
	this.M_EVT_ADD_ITEM_CD = '';		/* 멀티 증정 행사 코드 */
//	this.M_EVT_ADD_UNIT_QTY = 0;		/* 멀티 증정 수량 */
    // by mhkim 추가 
	this.M_ADD_TYPE='';                 /* 멀티행사 처리 타입 */
	this.ADD_DC_PRC=0;                 /* 멀티행사 추가 할인 금액 */
	this.M_ADD_TYPE_ISPS='';                 /* 멀티행사 처리 타입 유형(true:정율  false:정액) */

	this.MEDIA_CD = "";
	this.CATEGORY_ID = "";
	
	/* 정기 구매 상품 */
	this.IS_PERIOD = false;				/* 정기 구매 상품 유무 */
	this.PERIOD_TOT_STD_PRC = 0;		/* 정기 구매 정상 가격 */
	this.PERIOD_TOT_SALE_PRC = 0;		/* 정기 구매 판매 가격 */
	
	this.SALE_UNIT_QTY = 0;				/* 2015.05.28 판매 단위 추가 */
	
	/* 2015.08.18 옵션명 추가 */
	this.GOT_CD_NM	= "";
	this.GOP_CD_NM	= "";
	
	if (p) {
		if (p.DLV_CUST_YN) this.DLV_CUST_YN = p.DLV_CUST_YN;
		if (p.DMS_CUST_CD) this.DMS_CUST_CD = p.DMS_CUST_CD;
		if (p.GOODS_CD) this.GOODS_CD = p.GOODS_CD;
		if (p.DTL_NO) this.DTL_NO = p.DTL_NO;
		if (p.ITEM_CD) this.ITEM_CD = p.ITEM_CD;
		if (p.OUT_GOODS_CD) this.OUT_GOODS_CD = p.OUT_GOODS_CD;
		if (p.GOODS_NM) this.GOODS_NM = p.GOODS_NM;
		if (p.PACK_GUBUN) this.PACK_GUBUN = p.PACK_GUBUN;
		if (p.VAT_GUBUN) this.VAT_GUBUN = p.VAT_GUBUN;
		if (p.STD_PRC) this.STD_PRC = p.STD_PRC;
		if (p.SALE_PRC) this.SALE_PRC = p.SALE_PRC;
		//장바구니에서 할인금액으 계산할 변수를 선언  mhkim
		if (this.SALE_PRC>0)this.Cal_Prc=this.SALE_PRC;
		if (this.SALE_PRC == 0) this.is_free_gift = true;
		if (p.ROYALTY_AMT) this.ROYALTY_AMT = p.ROYALTY_AMT;
		if (p.DC_PRC) this.DC_PRC = p.DC_PRC;
		/* 2017.05.19 새로운 행사로 인한 추가 Start */
		if (p.MBR_LV_AMT) this.MBR_LV_AMT = p.MBR_LV_AMT; //회원등급별
		if (p.MBR_LV_PRC) this.MBR_LV_PRC = p.MBR_LV_PRC; //회원등급별
		if (p.MBR_LV_EVT_CD) this.MBR_LV_EVT_CD = p.MBR_LV_EVT_CD;	//회원등급별
		/* 2017.05.19 새로운 행사로 인한 추가 End */
		if (p.QTY) this.QTY = p.QTY;
		if (p.DELIV_JUCHE) this.DELIV_JUCHE = p.DELIV_JUCHE;
		if (!p.DLV_FEE_YN) this.is_free_dlv = true;
		if (p.CUST_CD) this.CUST_CD = p.CUST_CD;
		if (p.UNIT_MILEAGE) this.unit_mileage = p.UNIT_MILEAGE;
		if (p.UNIT_QTY) this.unit_qty = p.UNIT_QTY;
		if (p.LINK) this.LINK = p.LINK;
		if (p.IMG_URL) this.IMG_URL = p.IMG_URL;
		if (p.REPLACEMENT_GOODS_CD) this.REPLACEMENT_GOODS_CD = p.REPLACEMENT_GOODS_CD;
		if (p.ACK_YN) this.ACK_YN = p.ACK_YN;
		if (p.STOCK_NUM) this.STOCK_NUM = p.STOCK_NUM;
		/* 멀티 행사 */
		if (p.M_EVT_PRC) this.M_EVT_PRC = p.M_EVT_PRC;
		if (p.M_EVT_ITEM_CD) this.M_EVT_ITEM_CD = p.M_EVT_ITEM_CD;
		if (p.M_EVT_ADD_ITEM_CD) this.M_EVT_ADD_ITEM_CD = p.M_EVT_ADD_ITEM_CD;
//		console.log("## p.M_ITEM_DC_AMT :"+ p.M_ITEM_DC_AMT);
		if (p.M_ITEM_DC_AMT) this.M_ITEM_DC_AMT = p.M_ITEM_DC_AMT;
		//mhkim
		if (p.M_ADD_TYPE) this.M_ADD_TYPE = p.M_ADD_TYPE;
		//mhkim
		if (p.DcQty) this.DcQty = p.DcQty;
		if (p.ADD_DC_PRC) this.ADD_DC_PRC = p.ADD_DC_PRC;
		if (p.M_ADD_TYPE_ISPS) this.M_ADD_TYPE_ISPS = p.M_ADD_TYPE_ISPS;
		/* 정기 구매 */
		if (p.IS_PERIOD) this.IS_PERIOD = p.IS_PERIOD;
		if (p.PERIOD_TOT_STD_PRC) this.PERIOD_TOT_STD_PRC = p.PERIOD_TOT_STD_PRC;
		if (p.PERIOD_TOT_SALE_PRC) this.PERIOD_TOT_SALE_PRC = p.PERIOD_TOT_SALE_PRC;
		
		
		if(this.IS_PERIOD){
			P_IS_PERIOD = this.IS_PERIOD;
			P_PERIOD_TOT_STD_PRC = this.PERIOD_TOT_STD_PRC;
		}
		
		/* 옵션 */
		if (p.GOTS) this.GOTS = p.GOTS;
		if (p.GOPS) this.GOPS = p.GOPS;
		
		/* 2014.08.12 이벤트코드 (멀티셋트상품 정액을 구하기위해 evt_cd코드값을 넘겨줌.) */
		if (p.EVT_CD) this.EVT_CD = p.EVT_CD;
		if (p.BUY_PRICE) this.BUY_PRICE = p.BUY_PRICE;
//		if (p.M_ADD_TYPE) this.EVT_CD = p.M_ADD_TYPE;
		
		/* 2015.05.28 판매 단위 추가 */
		if (p.SALE_UNIT_QTY) this.SALE_UNIT_QTY = p.SALE_UNIT_QTY;
		
		/* 2015.08.18 옵션명 추가 */
		if (p.GOT_CD_NM) this.GOT_CD_NM = p.GOT_CD_NM;
		if (p.GOP_CD_NM) this.GOP_CD_NM = p.GOP_CD_NM;
	}
	
};
CGood.STD_PRC = 'STD_PRC';
CGood.SALE_PRC = 'SALE_PRC';
CGood.ROYALTY_AMT = 'ROYALTY_AMT';
CGood.DC_PRC = 'DC_PRC';
CGood.CUPON_PRC = 'CUPON_PRC';
CGood.prototype= {

	getBuyPrice:function(type){
/*		return this.CUPON_PRC*this.QTY; 
	장바구니는 로얄티적용가(DC_PRC)로 계산
	주문은 쿠폰적용가로 계산
*/			
		console.log("getBuyPrice() M_ADD_TYPE::: "+this.M_ADD_TYPE);
		console.log("getBuyPrice() CUPON_PRC::: "+this.CUPON_PRC);
		console.log("getBuyPrice() DC_PRC::: "+this.DC_PRC);
//		console.log("getBuyPrice() DC_QTY::: "+this.DcQty);
		if (type) {
			return (this[type]*this.QTY)+this.ADD_DC_PRC;
		} else {
	
			if (this.IS_PERIOD) {
				if (this.is_free_gitf) {
					
				} else if (this.PERIOD_TOT_SALE_PRC > 0 ) {
					return (this.PERIOD_TOT_SALE_PRC * this.QTY)+this.ADD_DC_PRC;
				} else {
					return (this.PERIOD_TOT_STD_PRC* this.QTY)+this.ADD_DC_PRC;
				}
			} else {
				if(this.is_free_gift)
					return 0;
				else if(this.CUPON_PRC==0 && this.DC_PRC > 0){
				
					if ("08"==this.M_ADD_TYPE ||  "09"==this.M_ADD_TYPE||"12"==this.M_ADD_TYPE || "13"==this.M_ADD_TYPE|| "14"==this.M_ADD_TYPE|| "15"==this.M_ADD_TYPE){
					
						return (this.DC_PRC*this.DcQty + this.STD_PRC*(this.QTY-this.DcQty))+this.ADD_DC_PRC;	
					
					}else if ("16"==this.M_ADD_TYPE){
						console.log("1test:"+this.DC_PRC+"/"+this.QTY+"/"+this.M_ITEM_DC_AMT+"/"+this.ADD_DC_PRC);
//						return (this.DC_PRC*this.QTY-this.M_ITEM_DC_AMT*(this.QTY-1))+this.ADD_DC_PRC;
//						return ((this.DC_PRC-this.M_ITEM_DC_AMT)*this.QTY)+this.ADD_DC_PRC;
						return (((this.DC_PRC)*this.QTY)-(this.M_ITEM_DC_AMT))+this.ADD_DC_PRC;
						
					}else{
						console.log("1getBuyPrice() else 17?:"+this.DC_PRC+"/"+this.QTY+"/"+this.M_ITEM_DC_AMT+"/"+this.ADD_DC_PRC);
						return (this.DC_PRC*this.QTY)+this.ADD_DC_PRC;
					}
						
						
					
				}else if (this.CUPON_PRC > 0) {
				
					if ("08"==this.M_ADD_TYPE ||  "09"==this.M_ADD_TYPE||"12"==this.M_ADD_TYPE || "13"==this.M_ADD_TYPE|| "14"==this.M_ADD_TYPE|| "15"==this.M_ADD_TYPE){
						
						return (this.CUPON_PRC*this.DcQty + this.STD_PRC*(this.QTY-this.DcQty))+this.ADD_DC_PRC;	
					
					}else if ("16"==this.M_ADD_TYPE){
						console.log("2test:"+this.CUPON_PRC+"/"+this.QTY+"/"+this.M_ITEM_DC_AMT+"/"+this.ADD_DC_PRC);
//						return (this.CUPON_PRC*this.QTY-this.M_ITEM_DC_AMT*(this.QTY-1))+this.ADD_DC_PRC;
//						return ((this.CUPON_PRC-this.M_ITEM_DC_AMT)*this.QTY)+this.ADD_DC_PRC;
						return ((this.CUPON_PRC)*this.QTY)-(this.M_ITEM_DC_AMT)+this.ADD_DC_PRC;						
					}else{
						console.log("2getBuyPrice() else 17?"+this.M_ADD_TYPE+":"+this.CUPON_PRC+"/"+this.DC_PRC+"/"+this.QTY+"/"+this.M_ITEM_DC_AMT+"/"+this.ADD_DC_PRC+"/"+this.M_EVT_PRC);
						console.log("2getBuyPrice() else 17?:",this);
						if ("17"==this.M_ADD_TYPE){
							return ((this.CUPON_PRC-(this.DC_PRC-this.M_EVT_PRC))*this.QTY)+this.ADD_DC_PRC;
						}else{
							console.log("2getBuyPrice() else ?:");
							return (this.CUPON_PRC*this.QTY)+this.ADD_DC_PRC;
						}
					}
					
					
//				} else if (this.SALE_PRC > 0) {	/* Quick에서 사용 */
				} else if (this.M_EVT_PRC > 0){
					console.log("getBuyPrice() M_EVT_PRC::: "+this.M_EVT_PRC);
					console.log("getBuyPrice() ADD_DC_PRC::: "+this.ADD_DC_PRC);
					return (this.M_EVT_PRC * this.QTY)+this.ADD_DC_PRC;
//					return (this.M_EVT_PRC * this.QTY)-(this.M_EVT_PRC* this.QTY)+this.ADD_DC_PRC;
				} else {
					//console.log("getBuyPrice() else::: "+this.M_EVT_PRC);
					return (this.SALE_PRC * this.QTY)+this.ADD_DC_PRC;
				}
//				} else {
//					return this.STD_PRC * this.QTY;
//				}				
			}
		}
	},
	getYearBuyPrice:function() {	//년월간 상품의 경우 saleprc에 회차별 할인된 금액이 들어가므로 stdprc를 기준으로 한다.(배송비계산시 사용)		
		// TODO 확인 필요. 
//		if(this.is_free_gift)
//			return 0;
//		else if(this.CUPON_PRC==0)
//			return clsOrd.shp[0].getGood(0).DC_PRC * this.QTY;
//		else
//			return clsOrd.shp[0].getGood(0).CUPON_PRC * this.QTY; 

		return (this.STD_PRC * this.getQty()) - this.getRoyalty() - this.getCpnAmt();
	},
	getItemCd:function() {
		return this.ITEM_CD;
	},
	getAddDcPrc:function() {
		return this.ADD_DC_PRC;
	},
	setIsFreeDeliv:function(isFree){
		this.is_free_dlv = isFree;
	},
	getIsFreeDeliv:function(){
		return this.is_free_dlv;
	},
	setIsFreeGift:function(isFree){
		this.is_free_gift = isFree;
	},
	getIsFreeGift:function(){
		return this.is_free_gift;
	},
	setUnitMileage:function(unitMlg){
		if(this.is_free_gift) 
			return 0;
		else
			this.unit_mileage = unitMlg;
	},
	setUnitQty:function(unitQty) {
		this.unit_qty = unitQty;
	},
	

	getSaveMileage2:function(){
		var mlg = 0;
		if(this.is_free_gift) 
			return 0;
		else {
			if(this.unit_qty > 0) {
				//alert(parseInt(this.getQty() / this.unit_qty));
				mlg = this.unit_mileage * parseInt((this.getQty() / this.unit_qty));
			}
		}
		return mlg;
	},
	getSaveMileage:function(){
		if(this.is_free_gift) 
			return 0;
		else
			return this.unit_mileage*this.QTY;
	},
	getVAT:function(){
		if(this.VAT_GUBUN == 1) {
			//return Math.round(this.getBuyPrice()/11);
			//alert(Math.round(this.getBuyPrice()/11) + " / " + this.getBuyPrice());
			//return Math.round(this.getBuyPrice()/110)*10;
			return (Math.round(this.getCpnPrice()/110)*10) * this.getQty();
		}else {
			return 0;
		}
	},
	getVAT2:function(){
		if(this.VAT_GUBUN == 1) {
			return this.getCpnPrice() * this.getQty();
		}else {
			return 0;
		}
	},
	getVAT3:function(){
		if(this.VAT_GUBUN != 1) {
			//return Math.round(this.getBuyPrice()/11);
			//alert(Math.round(this.getBuyPrice()/11) + " / " + this.getBuyPrice());
			//return Math.round(this.getBuyPrice()/110)*10;
			return this.getCpnPrice() * this.getQty();
		}else {
			return 0;
		}
	},
	getUnitVAT:function() {
		return (this.VAT_GUBUN == 1)? (Math.round(this.getCpnPrice()/110)*10) : 0;
	},
	setQty:function(qty){
		this.QTY = qty;
	},
	getQty:function(){
		return this.QTY;
	},
	addQty:function(){
		this.QTY ++;
	},
	
	setDcQty:function(dcQty) {
		this.DcQty = dcQty;
	},
	
	getDcQty:function() {
		return this.DcQty;
	},
	removeQty:function(){
		if(this.QTY==1) 
			return;
		else
			this.QTY --;
	},
	
	getUnitPrice:function(){
		if(this.is_free_gift) {
			return 0;
//		else if(this.CUPON_PRC==0 && this.DC_PRC > 0)
//			return this.DC_PRC * 1;
//		else if (this.CUPON_PRC > 0) {
//			return this.CUPON_PRC*1;	
		} else if (this.DC_PRC > 0) {
			return this.DC_PRC *1;
		} else if (this.SALE_PRC > 0) {	/* Quick에서 사용 */
			return this.SALE_PRC*1;
		} else {
			return this.STD_PRC*1;
		}
	},	
	hasFreeGift:function(){
		if(this.free_gift_cnt>0) 
			return true;
		else
			return false;
	},	
	getFreeGiftItemCD:function(){
		if(this.free_gift_cnt>0) 
			return this.free_gift_item_cd;
		else
			return "";
	},	
	getFreeGiftCount:function(){
		if(this.free_gift_cnt>0) 
		{
			if(this.QTY > this.free_gift_basic_cnt )
			{
				return Math.floor(this.QTY*this.free_gift_cnt /this.free_gift_basic_cnt); 
			}
		}else
			return 0;
	},
	setSalePrice:function(prc){
	/* 행사가                                                 */ this.SALE_PRC                     = prc             ;
	/* 로얄티할인액                                           */ this.ROYALTY_AMT                  = 0               ;
	/* 할인가 =행사가-로얄티할인액                            */ this.DC_PRC                       = prc             ;
	/* 쿠폰가                                                 */ this.CUPON_PRC                    = prc             ;
	},
	setRoyalty:function(royalty_amt){
	/* 로얄티할인액                                           */ this.ROYALTY_AMT                  = royalty_amt     ;
	/* 할인가 =행사가-로얄티할인액                            */ this.DC_PRC                       = this.SALE_PRC-royalty_amt             ;
	/* 쿠폰가                                                 */ this.CUPON_PRC                    = this.DC_PRC             ;
	},
	getRoyalty:function(){
		return this.ROYALTY_AMT;
	},
	/* 2017.05.19 새로운 행사로 인한 추가 Start */
	getMbrLvAmt:function(){
		return this.MBR_LV_AMT;//회원등급별
	},
	getMbrLvPrc:function(){
		return this.MBR_LV_PRC;//회원등급별
	},
	getMbrLvEvtCd:function(){
		return this.MBR_LV_EVT_CD;//회원등급별
	},
	/* 2017.05.19 새로운 행사로 인한 추가 End */
	setDCPrice:function(prc, royalty_amt){
		if (prc) {
			/* 행사가  */ 
			if (this.royalty_amt) 
				this.SALE_PRC                     = prc-royalty_amt ;
			/* 로얄티할인액                                           */ this.ROYALTY_AMT                  = royalty_amt     ;
			/* 할인가 =행사가-로얄티할인액                            */ this.DC_PRC                       = prc             ;
			/* 쿠폰가                                                 */ this.CUPON_PRC                    = prc             ;			
		}
	}, 
	getDCPrice:function(){
		return this.DC_PRC;
	},
	//mhkim 
	getStdPrice:function(){
		return this.STD_PRC;
	},
	
	setCpnPrice:function(cpn_amt){
		/* 상품쿠폰금액                                           */ 
		this.GOODS_CUPON_AMT = cpn_amt  ;
		this.CUPON_PRC = this.DC_PRC - cpn_amt  ;
	}, 
	setGoodCpnCd:function(cpn_cd){
		this.GOODS_CUPON_NO = cpn_cd;
	}, 
	getGoodCpnCd:function(){
		return this.GOODS_CUPON_NO;
	}, 
	setGoodCpnSeq:function(cpn_seq){
		this.GOODS_CPN_SEQ = cpn_seq;
	}, 
	getGoodCpnSeq:function(){
		return this.GOODS_CPN_SEQ;
	},
	setGoodCpnType:function(cpn_type){
		this.DISC_TYPE = cpn_type;
	},
	getGoodCpnType:function(){
		return this.DISC_TYPE;
	}, 
	getCpnPrice:function(){
		/* 상품쿠폰적용금액  리턴                                         */ 
		return this.CUPON_PRC;
	}, 
	getCpnAmt:function(idx){
		/* 상품쿠폰할인금액  리턴                                         */ 
		return this.GOODS_CUPON_AMT;
	},
	//옵션 관련 prototype 추가
	addOpt:function(newOpt) {	//새옵션 추가		
		this.opt[this.opt_idx] = newOpt;
		this.opt_idx = this.opt_idx + 1;
	},
	getOpt:function(idx){
		return this.opt[idx];
	},
	getWorkId:function() {
		return this.WORK_ID;
	},
	setWorkId:function(id) {
		this.WORK_ID = id;
	},
	setRepGoods:function(p) {
		this.REP_GOODS = p;
	},
	getRepGoods:function() {
		return this.REP_GOODS;
	},
	getCal_Prc:function() {
//	--	this.Cal_Prc=this.SALE_PRC;
		return this.Cal_Prc;
	},
	getCal_NOT_DC_Qty:function() {
		return this.Cal_NOT_DC_Qty;
	},
	/* 멀티 행사 API */
	getMEvtSalePrice:function() {
		return this.M_EVT_PRC;
	},
	getMEvtItemCd:function() {
		return this.M_EVT_ITEM_CD;
	},
	getMEvtItemDcAmt:function() {
		return this.M_ITEM_DC_AMT;
	},
	getMAddEvtCd:function() {
		return this.M_EVT_ADD_ITEM_CD;
	},
	setMEvtItemDcAmt:function(amt) {
		this.M_ITEM_DC_AMT = amt;
	},
	//mhkim 추가 
	setMAddType:function(addType){
		this.M_ADD_TYPE = addType;
	},
	getMAddType:function(){
		return this.M_ADD_TYPE ;
	},
	setMAddTypeIsPS:function(isPs){
		this.M_ADD_TYPE_ISPS = isPs;
	},
	getMAddTypeIsPS:function(){
		return this.M_ADD_TYPE_ISPS ;
	},
	equalsGops:function(gops) {
		return !gops || this.GOPS === gops;
	}
};


var CShp = function(p){
	this.TRNS_NO = ""; 						/* 배송번호 */ 
	this.DELIV_DT = ""; 					/* 출고예정일 */ 
//	this.SHP_PAY = ""; 						/* 배송처 주문금액 */
//	this.SHP_VAT = "";						/* 배송처 부가세 */
//	this.DELIV_FEE = "";					/* 배송료 */
//	this.FREEZE_PACK_FEE = "";				/* 냉동포장료 */
//	this.DELIV_ATTACH_FEE = "";				/* 추가배송비 */
//	this.MLG_USE = "";						/* 사용마일리지 */
//	this.SAVE_MLG = "";						/* 적립마일리지 */
	this.SHOP_DELIV = "";					/* 온주가배구분 1온라인,2매장 */
	this.MALL_CD = "";
	this.STORE_CD = "";						/* 매장코드 */ 
//	this.MEMO = "";							/* 배송메모 */
	this.DMS_CUST_CD = 0;					/* dms_code 업체 코드 */
	this.DMS_CUST_NM = '';					/* 업체 명 */
	this.ADDED_DLVFEE_BY_POST = 0;			/* 우편번호에 따른 추가 배송료 */


	this.goods_amt =0;
	this.good =  new Array();
	this.goodIsSelected =  new Array();

//	this.dlvfee = null;
	this.dlvfee = new Array();
//	this.dlvfee_idx =0;

	

/*
	this.tot_goods_amt =0;
	this.dlv_fee=0;
	this.dlv_amt_basic=0;
	this.pack_amt_basic=0;
	this.dlv_amt_free=0;
	this.needFreezePack=false;
	this.dlv_amt_attch=0;
	this.mileage=0;
*/
	if (p) {
		if (p.DMS_CUST_CD) this.DMS_CUST_CD = p.DMS_CUST_CD;
		if (p.DMS_CUST_NM) this.DMS_CUST_NM = p.DMS_CUST_NM;
		if (p.STORE_CD) this.STORE_CD = p.STORE_CD;
	}
};

CShp.prototype= {
	addDlvFee:function(newDlvFee){
		this.dlvfee.push(newDlvFee);
	},
	clearDlvFee:function(){
		this.dlvfee = new Array();
	},
	goodsSize:function() {
		return this.good.length;
	},
	getSelectedCnt:function(){
		var cnt=0;
		for(var i=0; i<this.good.length; i++){
			if(this.goodIsSelected[i]) cnt++;
		}
		return cnt;
	},
	getSelectedGoodsCnt:function(newGood){
		var cnt=0;
		for(var i=0; i<this.good.length; i++){
			if(this.goodIsSelected[i]) {
				cnt +=this.good[i].QTY;			
			}
		}
		return cnt;	
	},
	/* 이벤트 조회용 API */
	listSelectedGoodCd:function() {
		var list = new Array();
		for(var i=0; i<this.good.length; i++){
			if(this.goodIsSelected[i]) {
				var item = {};
				item.GOODS_CD = this.getGood(i).GOODS_CD;
				item.QTY = this.getGood(i).QTY;
				list.push(item);
			}
		}
		return list;
	},
	addGood:function(newGood, isSelect){
		newGood.idx = this.good.length;

		this.good.push(newGood);
		if (isSelect) {
			this.goodIsSelected.push(true);
		} else {
			this.goodIsSelected.push(false);
		}
/*		this.calcDlvFee();*/
	},
	nextGoodsIdx:function() {
		return this.good.length;
	},
	removeGood:function(idx){
		if( idx<=this.good.length )
		{
			this.good.splice(idx, 1);
			this.goodIsSelected.splice(idx, 1);
			var len = this.good.length;
			for (var i = 0; i < len; i++) {
				this.good[i].idx = i;
			}
			/*
			this.good[idx]=null;
			this.goodIsSelected[idx]=null;
			for(var i=idx; i<this.goods_idx;i++)
			{
				this.good[idx]=this.good[idx+1];
				this.goodIsSelected[idx]=this.goodIsSelected[idx+1];
			}
				this.good[goods_idx]=null;
				this.goodIsSelected[goods_idx]=null;
				this.goods_idx = this.goods_idx-1;
			*/
		}

	},
	removeGoodByCd:function(cd, dtlNo) {
		var len = this.good.length;
		for (var i = 0; i < len; i++) {
			if (this.good[i].GOODS_CD == cd && (!dtlNo || dtlNo == this.good[i].DTL_NO)) {
				this.removeGood(i);
				return;
			}
		}
	},
	setGoodSelected:function(idx){
		this.goodIsSelected[idx]=true;
	},	
	setGoodUnSelected:function(idx){
		this.goodIsSelected[idx]=false;
	},
	isAllSelected:function() {
		var len = this.goodIsSelected.length;
		for (var i = 0; i < len; i++) {
			if (!this.goodIsSelected[i]) return false;
		}
		return true;
	},
	getGood:function(idx){
		return this.good[idx];
	},
	getGoodById:function(id){
		/* 추가 삭제시 실제 idx하고는 불일치 하다. 그래서 good.idx와 비교 하여 리턴 */
		for (var i = 0; i < this.good.length; i++) {
			if (this.good[i] && this.good[i].idx == id) {
				return this.good[i];
			} 
		}
		return null;
	},
	getGoodByCd:function(cd, dtlNo) {
		for (var i = 0; i < this.good.length; i++) {
			if (this.good[i].GOODS_CD == cd && ( !dtlNo || this.good[i].DTL_NO == Number(dtlNo))) {
				return this.good[i];
			}
		}
	},
	getDlvFee:function(){
		return this.dlvfee;
	},
	getItemCnt:function(){
		return this.good.length;
	},
	getFeeCnt:function(){
		return 1;
//		return this.dlvfee_idx;
	},
	getJasaGoodsAmt:function(){
		var amt = 0;
		for(var i=0;i<this.good.length;i++){
			if(this.goodIsSelected[i]==true){
				if(this.good[i].DLV_CUST_YN == 0){
					amt +=this.good[i].getBuyPrice();
				}
			}
	
		}
		return amt;
	},
	getCompGoodsAmt:function(){
		var amt = 0;
		for(var i=0;i<this.good.length;i++){
			if(this.goodIsSelected[i]==true){
				if(this.good[i].DLV_CUST_YN == 1){
					amt +=this.good[i].getBuyPrice();
				}
			}
	
		}
		return amt;
	},
	getShpAmt:function(isSelected, type){
		if (isSelected == undefined) {
			isSelected = true;
		}
		var amt = 0;
		for(var i=0;i<this.good.length;i++){
			if(this.goodIsSelected[i]==true || !isSelected){
				amt +=this.good[i].getBuyPrice(type);
			}

		}
		return amt;
	},
	getShpSaveMlg:function(){
		var amt = 0;

		for(var i=0;i<this.good.length;i++)
		{
			if(this.goodIsSelected[i]==true)
			{
				amt +=this.good[i].getSaveMileage();
			}
		}
		return amt;
	},	         
	getShpVAT:function(){
		var amt = 0;
		for(var i=0;i<this.good.length;i++)
		{
			if(this.goodIsSelected[i]==true)
			{
				amt +=this.good[i].getVAT();
			}
		}
		return amt;
	},
	getShpVAT2:function(){
		var amt = 0;
		for(var i=0;i<this.good.length;i++)
		{
			if(this.goodIsSelected[i]==true)
			{
				amt +=this.good[i].getVAT2();
			}
		}
		return amt;
	},
	getShpVAT3:function(){
		var amt = 0;
		for(var i=0;i<this.good.length;i++)
		{
			if(this.goodIsSelected[i]==true)
			{
				amt +=this.good[i].getVAT3();
			}
		}
		return amt;
	},
	getShpInitDcAmt:function() {
		var amt = 0;
		for(var i=0;i<this.good.length;i++)
		{
			if(this.goodIsSelected[i]==true)
			{
				amt +=this.good[i].getMEvtItemDcAmt();
			}
		}
		return amt;		
	},
	calcDelivFee:function(){
	/*
		var shp_amt=0;
		var dlv_amt=0;
	*/
		var chk_dlv_cust_cd=false;
		
		var size = this.dlvfee.length;
		for(var j=0; j<size; j++){
			this.dlvfee[j].ORD_AMT=0;
			this.dlvfee[j].YEAR_ORD_AMT=0;
			this.dlvfee[j].setHasFreezeGood(false);
			this.dlvfee[j].setIsFreeDeliv(false);
			this.dlvfee[j].item_cnt = 0;
			//증정상품만 포함된 경우인지 확인. - 주문금액이 0원으로 되기 때문에 증정상품만 선택된 경우를 구분하기 위함.
			this.dlvfee[j].free_item_cnt = 0;
		}

		for(var i=0;i<this.good.length;i++){
			//증정상품이 아니고 수량이 선택되었고 무료배송상품이 아닌경우
			//if(this.good[i].getIsFreeGift()==false && this.good[i].getQty() > 0){
			if(this.goodIsSelected[i] == true && this.good[i].getQty() > 0){
				if(this.good[i].DLV_CUST_YN==0)
				{
					/* 초록마을배송 */
					for(j=0; j<size; j++){
					if(this.dlvfee[j].CUST_CD==green_cust_cd){
						this.dlvfee[j].addItemCnt();	
						this.dlvfee[j].ORD_AMT +=this.good[i].getBuyPrice();
						this.dlvfee[j].YEAR_ORD_AMT += this.good[i].getYearBuyPrice();
						//alert(i + " : " + j + " " + this.dlvfee[j].YEAR_ORD_AMT);
						if(this.good[i].PACK_GUBUN==2){
							/*냉동포장*/
							this.dlvfee[j].setHasFreezeGood(true);
						}
						if(this.good[i].getIsFreeDeliv()) {
							this.dlvfee[j].setIsFreeDeliv(true);
						}
						if(this.good[i].getIsFreeGift()== true) { //증정상품이면								
							this.dlvfee[j].addFreeItemCnt();
						}
					}
					}

				//}else if(this.good[i].DLV_CUST_YN ==1){
				} else {
					/* 업체배송 */
					chk_dlv_cust_cd=false;
					for(j=0; j<size; j++){
						//alert(this.good[i].CUST_CD + " / " + this.dlvfee[j].CUST_CD);
					if(this.good[i].CUST_CD==this.dlvfee[j].CUST_CD){
						this.dlvfee[j].addItemCnt();
						this.dlvfee[j].ORD_AMT +=this.good[i].getBuyPrice();
						this.dlvfee[j].YEAR_ORD_AMT += this.good[i].getYearBuyPrice();
						if(this.good[i].PACK_GUBUN==2){
							/*냉동포장*/
							this.dlvfee[j].setHasFreezeGood(true);
						}
						if(this.good[i].getIsFreeDeliv()) {
							this.dlvfee[j].setIsFreeDeliv(true);
						}
						if(this.good[i].getIsFreeGift()== true) { //증정상품이면								
							this.dlvfee[j].addFreeItemCnt(); 
						}
						chk_dlv_cust_cd=true;
					}						
					}
					if(chk_dlv_cust_cd==false){
					/* 업배이나 deliv_mst 등록된 배송비가 없을 때 초록마을배송으로 계산  */
						for(j=0; j<size; j++){
						if(this.dlvfee[j].CUST_CD==green_cust_cd){
							this.dlvfee[j].addItemCnt();
							this.dlvfee[j].ORD_AMT +=this.good[i].getBuyPrice();
							this.dlvfee[j].YEAR_ORD_AMT += this.good[i].getYearBuyPrice();
							if(this.good[i].PACK_GUBUN==2){
								/*냉동포장*/
								this.dlvfee[j].setHasFreezeGood(true);
							}
							if(this.good[i].getIsFreeDeliv()){
								this.dlvfee[j].setIsFreeDeliv(true);
							}
							if(this.good[i].getIsFreeGift()== true) { //증정상품이면
								this.dlvfee[j].addFreeItemCnt();
							}
						}
						}
					}//if						
				}				
			}//end if(qty)
			
				
		}//end for
		//alert(this.dlvfee[0].ORD_AMT);
		return this.getDelivFee();
	},
	getDelivFreeAmt:function(custCd) {
		if (this.dlvfee) {
			for (var i = 0; i < this.dlvfee.length; i++) {
				if (this.dlvfee[i].CUST_CD == custCd) {
					return this.dlvfee[i].getDelivFreeAmt();	
				}
			}
		}
		return 0;			
	},
	getDelivFee:function(){
		var dlv_amt=0;
		if(COrd.DELIV_PICKUP == "1"){	//2016.09.13 매장 픽업인 경우 배송비 0원 처리
			var cust_cd = "";
			var chk_dlv_cust_cd=false;
			var isFree = false;
			var tmp_dlv_amt = 0;
			//this.calcDelivFee();
			var size = this.dlvfee.length;
			for(var j=0; j<size; j++){	
				tmp_dlv_amt = 0;
				//isFree = false;
				var gLen = this.good.length;
				for(var i=0; i<gLen; i++){
					//자사배송비 계산
					if(this.good[i].getQty() > 0) { //수량이 선택된 경우만 계산.
						if(this.good[i].DLV_CUST_YN==0){
							if(this.dlvfee[j].getIsFreeDeliv() == false){
								if(this.dlvfee[j].CUST_CD != cust_cd ){
									tmp_dlv_amt += this.dlvfee[j].getDelivFee();
									cust_cd = this.dlvfee[j].CUST_CD;
								}
							} else {
								//isFree = true;
								tmp_dlv_amt = 0; 
							}
						}else{						
							//if(this.good[i].getIsFreeDeliv()==false && isFree == false){
							if(this.dlvfee[j].getIsFreeDeliv() == false){
								if(this.dlvfee[j].CUST_CD != cust_cd ){
									if(this.good[i].CUST_CD==this.dlvfee[j].CUST_CD){
										tmp_dlv_amt += this.dlvfee[j].getDelivFee();
										cust_cd = this.dlvfee[j].CUST_CD;
									}
								}
							} else {
								//isFree = true;
								tmp_dlv_amt = 0; 
							}
						}
					}
					
				}
				dlv_amt += tmp_dlv_amt;			
			}
		}
		//alert("Quick 메뉴 배송비 : " + dlv_amt);
		return dlv_amt;
	},
	getDelivFee2:function() { //최종계산된 배송비 계산
		var dlv_amt=0;
		
		if(COrd.DELIV_PICKUP == "1"){	//2016.09.13 매장 픽업인 경우 배송비 0원 처리
			var size = this.dlvfee.length;
			for(var j = 0; j < size; j++) {			
				dlv_amt += parseInt(this.dlvfee[j].getDelivFee());
			}
		}
		
		return dlv_amt;
	},
	getDelivCuponAmt:function(){
		var dlv_amt=0;
		//this.calcDelivFee();
		var size = this.dlvfee.length;
		for(var j=0; j<size; j++){
			dlv_amt += parseInt(this.dlvfee[j].getCupon_Amt());
		}
		
		return dlv_amt;
	},	     
	getFreezePackFee:function(){
		var dlv_amt=0;

		//this.calcDelivFee();
		var size = this.dlvfee.length;
		for(var j=0; j<size; j++){
			if (this.dlvfee[j].getFreezePackFee()){
				dlv_amt += parseInt(this.dlvfee[j].getFreezePackFee());				
			}

		}
		return dlv_amt;
	},
	getDelivAttachFee:function(){
		var dlv_amt=0;

		//this.calcDelivFee();
		var size = this.dlvfee.length;
		for(var j=0; j<size; j++){
			if (this.dlvfee[j].CUST_CD == 1) {
				dlv_amt += parseInt(this.dlvfee[j].getDelivAttachFee()) + this.getAddedDlvFeeByPost();
			} else {
				dlv_amt += parseInt(this.dlvfee[j].getDelivAttachFee());				
			}

		}
		return dlv_amt;
	},
	setAddedDlvFeeByPost:function(dlvfee) {
		/*
		if (dlvfee < 0) this.setDlvAttachArea(false);
		else this.setDlvAttachArea(true);
		*/
		// this.ADDED_DLVFEE_BY_POST = dlvfee > 0 ? dlvfee : 0;
		this.ADDED_DLVFEE_BY_POST = 0;  // post_mst 테이블에서 추가배송비는 안 가져오도록 수정함 . 2014.05.24
		
	},
	getAddedDlvFeeByPost:function() {
		return this.ADDED_DLVFEE_BY_POST;
	},
	hasFreeGift:function(idx){
		return this.good[idx].hasFreeGift();
	},
	getFreeGiftItemIdx:function(idx){
		var gift_item_cd ="";
		if(this.good[idx].hasFreeGift())
		{
			gift_item_cd =this.good[idx].getFreeGiftItemCD();
			for(var i=0; i<this.good.length; i++)
			{
				if(i!=idx && this.good[i].ITEM_CD==gift_item_cd){
					return i;
				}
			}
		}
			
	},	
	getFreeGiftItemCD:function(idx){
		return this.good[idx].getFreeGiftItemCD();
	},
	getFreeGiftCount:function(idx){
		return this.good[idx].getFreeGiftCount();
	},
	
	/*
	checkGiftgoods:function(idx){
		if(this.getGood(idx).free_gift_item_cd != ""){
			if(this.getGood(idx).QTY >= this.getGood(idx).free_gift_basic_cnt){
				if(this.getGood(idx).QTY % this.getGood(idx).free_gift_basic_cnt == 0){
					giftAjaxcall(idx,this.getGood(idx).free_gift_item_cd, this.getGood(idx).QTY);
				}	
			}
			if(this.getGood(idx).QTY < this.getGood(idx).free_gift_basic_cnt){
				document.getElementById('giftgoods_v'+idx).innerHTML = "";
			}
		}
	}
	*/
	checkGiftgoods:function(idx){
		giftAjaxcall(idx,this.getGood(idx).getItemCd(), this.getGood(idx).QTY);
	},
	setDlvAttachArea:function(flag) {
		var size = this.dlvfee.length;
		for(var j=0; j<size; j++){
			this.dlvfee[j].setDvlAttachArea(flag);
		}
	},
	getNextWorkIdx:function() {
		var retIdx = 0;
		for (var i = 0; i < this.good.length; i++) {
			var array = this.good[i].getWorkId().split('_');
			var last = new Number(array[array.length-1]);
			if (last > retIdx) {
				retIdx = last;
			}
			
		}
		return  retIdx +1;
		/*
		var idx = '';
		for (var i = 0; i < array.length-1; i++) {
			idx = idx + array[i] + '_';
		}
		return idx + workIdx;
		*/
	},
	isEvent:function(){
		if (this.STORE_CD === '9005') {
			return false;
		}
		return true;
	}
};

var CDlvFee = function(pOrder){
	this.order = pOrder || choroc.cart.order;
	this.CUST_CD = "000000";					/* 협력업체코드 */ 
	this.DELIV_CUPON_NO = "0000000000000";		/* 배송쿠폰번호 */ 
	this.CPN_SEQ = "00000";						/* 쿠폰번호 */ 
	this.DELIV_FEE = 0;							/* 배송비 */ 
	this.FEE_FREE_RESON = "0";					/* 배송비무료기준  */ 
	this.FEE_FREE_AMT = 0;						/* 배송비무료기준  */ 
	this.CUPON_AMT = 0;							/* 배송비쿠폰금액  */ 
	this.FREEZE_PACK_FEE = 0;					/* 냉동포장비 */ 
	this.DELIV_ATTACH_FEE = 0;					/* 추가배송료 */ 
	this.ORD_AMT = 0; 							/* 결제금액 */ 


	this.item_cnt         = 0;
	this.isDvlAttachArea  = false;
	this.isFCOrder  = false;  // 매장배송여부 체크 08.22
	
	this.hasFreezeFeeGood = false;
	this.USE_MIN_AMT  = 0;
	
	//2010.08.25 추가
	this.CUST_NM = "";
	
	this.is_free_dlv = false;
	this.free_item_cnt = 0;	//증정상품수 ( 일반상품이 0이고 증정상품만 있는경우를 체크하기 위함)
	
	this.YEAR_ORD_AMT = 0;	//임시 주문금액( 년월간시 회차별 할인가격이 아닌 정상가격을 기준으로 처리하기 위함)
	
	this.PROMO_CD = "";	//2017.03.15 배송비행사번호 추가
};

CDlvFee.prototype={
	setFeeBasic:function(cust_cd, cust_nm, deliv_fee, fee_free_amt, attach_fee, freeze_pack_fee, isDlvAttachArea){
		this.CUST_CD              = cust_cd;
		this.CUST_NM			= cust_nm;
		this.DELIV_FEE            = deliv_fee;
		//this.FEE_FREE_RESON       = "";
		this.FEE_FREE_AMT         = fee_free_amt;
		this.FREEZE_PACK_FEE      = freeze_pack_fee;
		this.DELIV_ATTACH_FEE     = attach_fee;
		this.isDvlAttachArea      = isDlvAttachArea;	
	},
	setHasFreezeGood:function(isFreeze) {
		this.hasFreezeFeeGood=isFreeze;
		
	},
	setDvlAttachArea:function(isattache) {
		this.isDvlAttachArea = isattache;
	},
	setShpOrdAmt:function(shpAmt){
		this.ORD_AMT=shpAmt;
		
	},
	setIsFreeDeliv:function(flag){
		this.is_free_dlv = flag;
	},
	getIsFreeDeliv:function() {
		return this.is_free_dlv;
	},
	
	setIsFCOrder:function(flag){   // 매장배송여부용 변수설정 08.22
		this.isFCOrder = flag;
	},
	getIsFCOrder:function() {     // 매장배송여부용 변수설정 08.22
		return this.isFCOrder;
	},
	
	setDelivFreeReason:function(reason) {
		this.FEE_FREE_RESON = reason;
	},
	getShpOrdAmt:function() {
		return this.ORD_AMT;
		
	},	
	addItemCnt:function(){
		this.item_cnt++;
	},
	addFreeItemCnt:function() {
		this.free_item_cnt++;
	},
	getItemCnt:function() {
		return this.item_cnt;
	},
	getFreeItemCnt:function() {
		return this.free_item_cnt;
	},
	removeItemCnt:function() {
		this.item_cnt--;
	},
	getFreezePackFee:function() {
		if( this.ORD_AMT !=0 && this.hasFreezeFeeGood == true ){
			return this.FREEZE_PACK_FEE;
		}else{
			return 0;
		}
	},
	getDelivAttachFee:function() {   // 매장배송여부 체크 08.22
		//alert("test="+this.isDvlAttachArea); 
		if( this.ORD_AMT !=0 && this.isDvlAttachArea == true && this.isFCOrder == false ){
			return this.DELIV_ATTACH_FEE;
		}else{
			return 0;
		}
		
	},
	getDelivFee:function() {
		if(COrd.DELIV_PICKUP == "2"){
			return 0;
		}
		else if(this.getItemCnt() == this.getFreeItemCnt() 
				&& this.getFreeItemCnt() > 0 && this.ORD_AMT < this.FEE_FREE_AMT) {//증정상품만 있는 경우			
			return this.DELIV_FEE;
		}
		else if( this.getIsFreeDeliv() == true) {
			return 0;
		}	
		else if(this.order.isYearGood) {	//년월간 상품인 경우.
			if( this.YEAR_ORD_AMT !=0 && this.YEAR_ORD_AMT < this.FEE_FREE_AMT ){
				return this.DELIV_FEE;
			}		 		
			else {
				return 0;
			}
		}
		else if(P_IS_PERIOD == true){  //[2014.10.30] 정기구매 상품일경우.
			if(P_PERIOD_TOT_STD_PRC < this.FEE_FREE_AMT){
				return this.DELIV_FEE;
			}else{
				return 0;
			}
		}
		else if( this.ORD_AMT !=0 && this.ORD_AMT < this.FEE_FREE_AMT){
			return this.DELIV_FEE;
		}
		else {
			return 0;
		}
	},
	getDelivFee2:function() {	//배송비 합  	
		return this.getDelivFee() + this.getFreezePackFee() + this.getDelivAttachFee();
	},

	getCupon_Amt:function() {
		return this.CUPON_AMT;
	},
	getDelivFreeReson:function() {
		if(this.ORD_AMT > this.FEE_FREE_AMT) {	
			//this.setDelivFreeReason("M"); //
			return "M";
		} else if(this.CUPON_AMT > 0) {	//			
			//this.setDelivFreeReason("C"); //
			//return this.DELIV_FEE - this.getCupon_Amt();
			return "C";
		} else {
			//this.setDelivFreeReason("0"); //			
			//return this.DELIV_FEE;
			return "0";
		}
	},
	getDelivFreeAmt:function() {
		return this.FEE_FREE_AMT;	
	}
};

var COrd = function(){
	this.MDM_GB = "";				/* 매체구분 01:쇼핑몰, 02:estore, 03:제휴몰 04.입점몰					 */ 
	this.MDM_CD = "";				/* 매체코드 9001:통신판매, 9002:쇼핑몰, 9003:estore 					*/ 
	this.TOT_AMT = 0;				/* 주문금액 														*/ 
	this.FREEZE_PACK_FEE = 0;		/* 냉동포장비 														*/ 
	this.DELIV_FEE = 0;				/* 배송료_합계(추가배송비포함) 										*/ 
	this.ORD_PAYVAT = 0;			/* 부가세_합계														*/ 
	this.MLG_USE = 0;				/* 사용마일리지 													*/ 
	this.SAVE_MLG = 0;				/* 적립마일리지(상품 마일리지) 											*/ 
	this.ADD_MLG = 0;				/* 추가마일리지=결제액*add_mlg_basis/100 								*/ 
	this.CASH_USE = 0;				/* 초록케쉬 사용액 													*/ 
	this.ORD_PAYTYPE = "";			/* 결재형태 (51001) 1.무통장, 2.계좌(실시간) 3.신용 4.외상 5.가상계좌		*/ 
	this.ORD_PAYTOT = 0;			/* 결재액 															*/ 
	this.ADD_MLG_BASIS = 0;			/* 추가 마일리지 부여기준 (%) 											*/ 
	/* 결제 쿠폰 */
	this.CPN_TYPE = "";				/* 쿠폰구분(0:오프라인,1:온라인) 										*/ 
	this.DISC_TYPE = "";			/* 할인구분 (1.정액,2정율) 											*/ 
	this.CUPON_TOT = 0;				/* 일반쿠폰사용금액 													*/ 
	this.ORD_CUPON_NO = "";			/* 일반쿠폰번호(오프라인:CPN_MST.CPN_YYMM, 온라인:ON_CPN_DOWN.CPN_ID) 	*/ 
	this.CPN_SEQ = "";				/* 쿠폰일련번호 ON_CPN_DOWN, CPN_MST 								*/ 
	this.PROMO_CD = "";   			/* 2011.03.17. ho3270 											*/
	this.CUPON_FLAG= "";
	/* 중복 쿠폰 */
	this.DUP_CPN_TYPE = "";			/* 쿠폰구분(0:오프라인,1:온라인) 										*/ 
	this.DUP_DISC_TYPE = "";		/* 할인구분 (1.정액,2정율) 											*/ 
	this.DUP_CUPON_TOT = 0;			/* 일반쿠폰사용금액 													*/ 
	this.DUP_ORD_CUPON_NO = "";		/* 일반쿠폰번호(오프라인:CPN_MST.CPN_YYMM, 온라인:ON_CPN_DOWN.CPN_ID) 	*/ 
	this.DUP_CPN_SEQ = "";			/* 쿠폰일련번호 ON_CPN_DOWN, CPN_MST 								*/ 
	this.DUP_PROMO_CD = "";   		/* 																*/

	this.cartShp = new Array();		/* 카트에서 사용 													*/
//	this.cartShp_idx = 0;
	this.orderShp = new Array();	/* 주문서에서 사용													*/
//	this.orderShp_idx = 0;
	this.dlvs = new Array();
	this.dlvShp = new Array();		/* 배송지별 상품 정보 												*/
	this.USE_MIN_AMT = 0;
	this.isYearGood = false;
	this.DELIV_DT = "";				/*원 출고일자 														*/
	
	var CUSTOMER;	
	this.setCustomer = function(c) {CUSTOMER = c;};
	this.getCustomer = function() {return CUSTOMER;};
		
	/* 증정 상품 */
	var GIFTS = new Array();
	this.addGift = function(g) {GIFTS.push(g);};
	this.listGift = function() {return GIFTS;};
	this.emptyGift = function() {GIFTS = new Array();};

	var DCS = new Array();
	this.DCS_USE_SUM_AMT = 0;
	this.addDC = function(d) {DCS.push(d);};
	this.listDC = function() {return DCS;};
	this.emptyDC = function() {DCS = new Array();};
	
	this.DC_EVENT_TOT_AMT = 0;
	
	/* 상품권 */
	var GIFT_CARDS = new Array();
	this.GIFT_TOT_USE_AMT = 0;
	this.addGiftCard = function(g) {GIFT_CARDS.push(g);};
	this.listGiftCard = function() {return GIFT_CARDS;};
	this.getGiftCard = function(num){
		var size = GIFT_CARDS.length;
		for (var i = 0; i < size; i++) {
			if (GIFT_CARDS[i].getRegNumber() == num) {
				return GIFT_CARDS[i];
			}
		}
	};
	this.emptyGiftCpn = function() {GIFTS = new Array();};
	this.getGiftCardSumAmt = function() {
		var size = GIFT_CARDS.length;
		var amt = 0;
		for (var i = 0; i < size; i++) {
			amt += GIFT_CARDS[i].getRemainder();
		}
		return amt;
	};
		
};

COrd.TAG_CART = "cart";
COrd.TAG_ORDER = "order";
COrd.TAG_DLV = "dlv";
COrd.DELIV_PICKUP = "1";
COrd.prototype = {
	findGoodsWithShp:function(pShpTag, pGoodCd, dtlNo) {
		var shps = this.getShps(pShpTag);
		var len = shps.length;
		for (var i = 0; i <len; i++) {
			var shp = shps[i];
			var good = shp.getGoodByCd(pGoodCd, dtlNo);
			if (good) return good;
		}
		return null;
	},
	getGoodsQtyWithShp:function(pShpTag, pGoodCd) {
		var shps = this.getShps(pShpTag);
		var len = shps.length;
		var qty =0;
		for (var i = 0; i <len; i++) {
			var shp = shps[i];
			var cnt = shp.goodsSize();
			for (var j = 0; j < cnt; j++) {
				var good = shp.getGood(j);
				if (good.GOODS_CD == pGoodCd) qty += good.QTY;
			}
		}
		return qty;
	},
	/* 사용하지 않음 Order.cartShp, orderShp, dlvShp으로 구분 지음*/
	addShp:function(newShp) {
		this.shp[this.shp_idx] = newShp;
		this.shp_idx = this.shp_idx + 1;
	},
	addCartShp:function(newShp) {
		this.cartShp.push(newShp);
	},
	addDlvShp:function(nShp) {
		this.dlvShp.push(nShp);
	},
	getCartShpByDmsCd:function(cd) {
		for (var i = 0; i < this.cartShp.length; i++) {
			if (this.cartShp[i].DMS_CUST_CD == cd) {
				return this.cartShp[i];
			}
		}
		return null;
	},
	getOrderShpByDmsCd:function(cd) {
		for (var i = 0; i < this.orderShp.length; i++) {
			if (this.orderShp[i].DMS_CUST_CD == cd) {
				return this.orderShp[i];
			}
		}
		return null;
	},
	addOrderShp:function(newShp) {
		this.orderShp.push(newShp);
	},
	getOrderShpByCustCd:function(id) {
		for (var i = 0; i < this.orderShp.length; i++) {
			if (this.orderShp[i].dms_cust_cd == id) {
				return this.orderShp[i];
			}
		}
	},
	/* 장바구니에 상품 추가 */
	addGoodsToCart:function(p) {
		var l = p.goods;
		var ds = p.dlvs;
		var len = l.length;
		var ret = new Array();
		for (var i = 0; i <len; i++) {
			var g = l[i];
			var shp = this.getCartShpByDmsCd(g.dms_cd | g.dms_cust_cd);
			if (!shp) {
				var d = ds[g.dms_cd|g.dms_cust_cd];
				shp = new CShp();
				shp.DMS_CUST_CD = g.dms_cd | g.dms_cust_cd;
				shp.DMS_CUST_NM = g.dms_cust_nm;
				if (d) {
					var dlvFee = new CDlvFee();
					dlvFee.setFeeBasic(d.dms_cust_cd, d.dms_cust_nm, Math.floor(d.dlv_fee), Math.floor(d.dlv_free_amt), Math.floor(d.dlv_attach_fee), Math.floor(d.freeze_pack_fee), false);
					shp.addDlvFee(dlvFee);					
				}
				this.addCartShp(shp);
			}
			if (g.goods_cd && !shp.getGoodByCd(g.goods_cd, g.dtl_no)) {
				var cg = new CGood();
				cg.idx = shp.nextGoodsIdx();
				cg.DMS_CUST_CD = g.dms_cust_cd;
				cg.GOODS_CD = g.goods_cd;
				cg.EVT_CD = g.evt_cd;
				cg.ITEM_CD = g.item_cd;
				cg.GOODS_NM = g.goods_nm;
				cg.PACK_GUBUN = Math.floor(g.logi_tmpr_flg);
				cg.VAT_GUBUN = Math.floor(g.tax_flg);
				cg.STD_PRC = Math.floor(g.std_prc);
				cg.SALE_PRC = Math.floor(g.sale_prc);
				cg.ROYALTY_AMT = Math.floor(g.royalty_amt);
				cg.DC_PRC = Math.floor(g.dc_prc) | 0;	// 퀵에서는 사용하지 않음 
				cg.QTY = Math.floor(g.qty);
				cg.DLV_CUST_YN = g.dlv_cust_yn;
				cg.setIsFreeDeliv(!Boolean(parseInt(g.dlv_fee_yn)));
				cg.CUST_CD = g.cust_cd;
				cg.LINK = g.detail_link;
				cg.IMG_URL = g.image_url;
				cg.setUnitMileage(g.evt_mlg);
				cg.DTL_NO = g.dtl_no;
				/* 2015.05.29 판매단위 추가 */
				cg.SALE_UNIT_QTY = g.sale_unit_qty;
				/* 2015.08.18 옵션명 추가 */
				cg.GOT_CD_NM = g.got_cd_nm;
				cg.GOP_CD_NM = g.gop_cd_nm;
				shp.addGood(cg);
				shp.setGoodSelected(cg.idx);
				ret.push(cg);
				shp.calcDelivFee();
			}
		}
		
		return ret;
		
	},
	/* cartShp만 삭제 가능 */
	removeGood:function(idx){
		var shps = this.getShps(COrd.TAG_CART);
		if (shps) {
			shps.splice(idx, 1);
		}
	},
	reset:function(tag) {
		this.orderShp = new Array();
	},
	getShps:function(tag) {
		switch (tag) {
		case COrd.TAG_CART:
			return this.cartShp;
		case COrd.TAG_ORDER:
			return this.orderShp;
		case COrd.TAG_DLV:
			return this.dlvShp;
		default: return null;
		}
		return null;
	},
	getDelivFee:function(tag){
		var  amt=0;	
		var shps = this.getShps(tag);
		
		if(COrd.DELIV_PICKUP == "1"){	//2016.09.13 매장 픽업인 경우 0원 처리
			if (shps) {
				var size = shps.length;
				for(var i = 0; i < size; i++){
					amt+=(shps[i].getDelivFee2() + shps[i].getDelivAttachFee() - shps[i].getDelivCuponAmt());
				}
			}
		}
		
		return amt;
	},
	/*
	 * 배송비 계산 
	 */
	getDelivFee2:function(tag){
		var  amt=0;
		var shps = this.getShps(tag);
		
		if(COrd.DELIV_PICKUP){	//2016.09.13 매장 픽업인 경우 0원 처리
			if (shps) {
				var size = shps.length;
				for(var i = 0; i < size; i++){
					//alert(this.shp[i].getDelivFee());
					amt+=( shps[i].getDelivFee2() + shps[i].getFreezePackFee() + shps[i].getDelivAttachFee());
				}
			}
		}
		
		return amt;
	},
	getDelivFee3:function(tag){ //일반배송비
		var  amt=0;
		var shps = this.getShps(tag);
		
		if(COrd.DELIV_PICKUP == "1"){	//2016.09.13 매장 픽업인 경우 0원 처리
			if (shps) {
				var size = shps.length;
				for(var i = 0; i < size; i++){
					amt += shps[i].getDelivFee2();
				}	
			}
		}
		
		return amt;
	},
	getFreezePackFee:function(tag){
		var  amt=0;
		var shps = this.getShps(tag);
		
		if (shps) {
			var size = shps.length;
			for(var i = 0; i < size; i++){
				amt+= shps[i].getFreezePackFee();
			}
		}		
		return amt;
	},
	getDelivAttachFee:function(tag){
		var  amt=0;
		var shps = this.getShps(tag);
		
		if (shps) {
			var size = shps.length;
			for(var i = 0; i < size; i++){
				amt+= shps[i].getDelivAttachFee();
			}
		}
		return amt;
	},
	/* 
	 * 총 주문 상품 금액금 액 
	 */
	getTotAmt:function(tag){
		var  amt=0;
		var shps = this.getShps(tag);
		if (shps) {
			var size = shps.length;
			for(var i=0;i<size;i++){			
				amt+= shps[i].getShpAmt();
			}			
		}
		console.log("====getTotAmt("+tag+") :::===="+amt);
		return amt;
	},
	getTotAmtWithDlv:function(tag) {
		var  amt=0;
		var shps = this.getShps(tag);
		
		if (shps) {
			var size = shps.length;
			console.log("shps[i].getShpAmt():::::::",shps);
			
			for(var i = 0; i < size; i++){
				amt += shps[i].getShpAmt() 
					+ shps[i].getDelivAttachFee() 
					+ shps[i].getFreezePackFee() 
					+ shps[i].getDelivFee2() 
					- shps[i].getDelivCuponAmt();
			}
		}
		return amt;
	},
	getPaymentAmt:function(tag){
		return this.getTotAmtWithDlv(tag) - this.MLG_USE - this.CUPON_TOT - this.DUP_CUPON_TOT - eval($("#clubCpnTotAmt").val());/* ▶▶▶▶▶▶▶▶▶ 초록아이클럽쿠폰  총 할인 금액 차감 ◀◀◀◀◀◀◀◀◀ */
	},
	getPaymentAmtBalance:function(tag){
		return this.getPaymentAmt(tag);
	},
	getPaymentAmt8:function(tag){
		return this.getTotAmt(tag) - this.CUPON_TOT - this.DUP_CUPON_TOT;
	},
	getPaymentAmt9:function(tag){
		return this.getTotAmtWithDlv(tag) - this.CUPON_TOT - this.DUP_CUPON_TOT - eval($("#clubCpnTotAmt").val());/* ▶▶▶▶▶▶▶▶▶ 초록아이클럽쿠폰 총 할인 금액  차감◀◀◀◀◀◀◀◀◀ */
	},
	getPaymentAmtWithEvent:function(tag) {
		return this.getPaymentAmt(tag) - this.DC_EVENT_TOT_AMT;
	},
	
	getPaymentAmt2:function(tag){	//전액마일리지 사용가능한 금액 산정. - 상품금액합계(쿠폰적용금액) - 결제쿠폰금액 - 사용마일리지
		var  amt=0;
		var shps = this.getShps(tag);
		
		if (shps) {
			var size = shps.length;
			for(var i = 0; i < size; i++){
				amt+=shps[i].getShpAmt() - this.CUPON_TOT - this.DUP_CUPON_TOT;
			}
		}
		return amt;
	},
	getPaymentAmtNoDlv:function(tag){	//전액마일리지사용금액 - 배송비제외 - 쿠폰가 제외 
		var  amt=0;
		var shps = this.getShps(tag);
		
		if (shps) {
			var size = shps.length;
			for(var i = 0; i < size; i++){
				amt+=shps[i].getShpAmt();
			}
		}
		return amt - order.CUPON_TOT - this.DUP_CUPON_TOT;
	},
	getUseMinAmt:function() {
		return this.USE_MIN_AMT;
	},
	getSaveMlg:function(tag) {
		var  amt=0;
		var shps = this.getShps(tag);
		
		if (shps) {
			var size = shps.length;
			for(var i = 0; i < size; i++){
				amt += shps[i].getShpSaveMlg();
			}
		}
		
		/* ▶▶▶▶▶▶▶▶▶ 초록아이클럽쿠폰 -상품별 총합 초록아이클럽쿠폰 마일리지 합산 START◀◀◀◀◀◀◀◀◀ */
		amt += eval( $("#clubCpnItemMlg").val() );
		/* ▶▶▶▶▶▶▶▶▶ 초록아이클럽쿠폰 -상품별 총합 초록아이클럽쿠폰 마일리지 합산 END◀◀◀◀◀◀◀◀◀ */	
		
		return amt;
	},
	setPayCpnInit:function() {
	
		this.ORD_CUPON_NO = "";						
		this.DISC_TYPE = "";						
		this.CPN_SEQ =  "";							 
		this.USE_MIN_AMT = 0;					
		this.CUPON_TOT = 0;
		this.PROMO_CD = "9002"; //2011.03.17 ho3270
		
	},
	setDupCpnInit:function() {
		this.DUP_ORD_CUPON_NO = "";						
		this.DUP_DISC_TYPE = "";						
		this.DUP_CPN_SEQ =  "";							 
		this.DUP_USE_MIN_AMT = 0;					
		this.DUP_CUPON_TOT = 0;
		this.DUP_PROMO_CD = "9002"; //2011.03.17 ho3270
		
	},
	setDlvAttachArea:function(shp_idx, flag, addDlvfee) {
		this.dlvShp[shp_idx].setDlvAttachArea(flag);
		if (flag) {
			this.dlvShp[shp_idx].setAddedDlvFeeByPost(addDlvfee);
		} else {
			this.dlvShp[shp_idx].setAddedDlvFeeByPost(0);
		}
	},
	getQtySum:function(tag) {
		var sum = 0;
		var shps = this.getShps(tag);
		if (shps) {
			var size = shps.length;
			for(var i = 0; i < size; i++) {
				var goodsLen = shps[i].good.length;
				var shp = shps[i];
				for (var j = 0; j < goodsLen; j++) {
					//alert("aaa : " + this.shp[j].getGood(good_idx).getQty());
					sum += parseInt(shp.getGood(j).getQty());					
				}
			}			
		}
		return sum;
	},
	getQtySumByCd:function(tag, cd) {
		var sum = 0;
		var shps = this.getShps(tag);
		if (shps) {
			var size = shps.length;
			for(var i = 0; i < size; i++) {
				var goodsLen = shps[i].good.length;
				var shp = shps[i];
				sum += parseInt(shp.getGoodByCd(cd).getQty());					
			}			
		}
		return sum;
	},
	getVAT:function(tag) {
		var  vat=0;
		var shps = this.getShps(tag);
		if (shps) {
			var size = shps.length;
			for(var i = 0; i < size; i++) {
				vat += parseInt(shps[i].getShpVAT());
			}			
		}
		return vat;
	},
	getVAT2:function(tag) {
		var  vat=0;
		var shps = this.getShps(tag);
		if (shps) {
			var size = shps.length;
			for(var i = 0; i < size; i++) {
				vat += parseInt(shps[i].getShpVAT2());
			}			
		}
		return vat;
	},
	getVAT3:function(tag) {
		var  vat=0;
		var shps = this.getShps(tag);
		if (shps) {
			var size = shps.length;
			for(var i = 0; i < size; i++) {
				vat += parseInt(shps[i].getShpVAT3());
			}			
		}
		return vat;
	},
	getCashUseAmt:function() {
		return this.CASH_USE;
	},
	setCashUseAmt:function(pAmt) {
		return this.CASH_USE = pAmt;
	},
	getGiftUseAmt:function() {
		return this.GIFT_TOT_USE_AMT;
	},
	setGiftUseAmt:function(pAmt) {
		return this.GIFT_TOT_USE_AMT = pAmt;
	},
	setDcEventTotAmt:function(pAmt) {
		this.DC_EVENT_TOT_AMT = pAmt;
	},
	getDcEventTotAmt:function() {
		return this.DC_EVENT_TOT_AMT;
	},
	getInitDcAmt:function() {
		/* OrderShp 만 확인 한다. */
		var dc = 0;
		var shps = this.getShps(COrd.TAG_ORDER);
//		console.log("getInitDcAmt [COrd.TAG_ORDER]:"+COrd.TAG_ORDER);
//		console.log("getInitDcAmt [this.getShps(COrd.TAG_ORDER)]:"+this.getShps(COrd.TAG_ORDER));
		if (shps) {
			var size = shps.length;
			for(var i = 0; i < size; i++) {
//				console.log("getInitDcAmt ShpInitDcAmt:"+shps[i].getShpInitDcAmt());
				dc += shps[i].getShpInitDcAmt();
			}			
		}
		return dc;
	},
	/**
	 * 상품 객체 복사
	 */
	copyGoodsObj:function(src, targ) {
//		console.log("##### copyGoodsObj start ");
		targ.DLV_CUST_YN	= src.DLV_CUST_YN;
		targ.GOODS_CD		= src.GOODS_CD;
		targ.DTL_NO			= src.DTL_NO
		targ.GOODS_NM		= src.GOODS_NM;
		targ.ITEM_CD        = src.ITEM_CD;
		targ.PACK_GUBUN		= src.PACK_GUBUN;
		targ.VAT_GUBUN     	= src.VAT_GUBUN;
		targ.STD_PRC        = src.STD_PRC;
		targ.setSalePrice(src.SALE_PRC);
		targ.setIsFreeDeliv(src.getIsFreeDeliv());
		targ.setRoyalty(src.getRoyalty());
		targ.setDCPrice(src.getDCPrice());
		targ.setQty(0);	
		targ.DELIV_JUCHE    = src.DELIV_JUCHE;
		targ.CUST_CD        = src.CUST_CD;
		targ.setUnitMileage(src.unit_mileage);
		targ.setUnitQty(src.unit_qty);	
		targ.RSV_ITEM_YN	= src.RSV_ITEM_YN;
		targ.EVT_CD			= src.EVT_CD;//이벤트코드
		targ.RESV_FDATE		= src.RESV_FDATE;	//예약시작일
		targ.COST_PRC		= src.COST_PRC;//매입원가
		targ.QTY			= src.QTY;
		targ.ROYALTY_AMT	= src.ROYALTY_AMT;
		
		/* 2017.05.19 새로운 행사로 인한 추가 Start */
		targ.MBR_LV_AMT	= src.MBR_LV_AMT;//회원등급별
		targ.MBR_LV_PRC	= src.MBR_LV_PRC;//회원등급별
		targ.MBR_LV_EVT_CD	= src.MBR_LV_EVT_CD;//회원등급별
		/* 2017.05.19 새로운 행사로 인한 추가 End */
		
		targ.EVT_CPN_UNIT_QTY = src.EVT_CPN_UNIT_QTY; 
		
		targ.M_EVT_PRC	 		= src.M_EVT_PRC;				/* 상품 멀티 행사 할인 금액 saleprc - evt_dc */
		targ.M_ITEM_DC_AMT 		= src.M_ITEM_DC_AMT;			/* 상품별 할인 금액 DC TYPE : 15, 16 */ 
		targ.M_ADD_TYPE 		= src.M_ADD_TYPE;			    /* 상품별 처리타입  */ 
		targ.M_ADD_TYPE_ISPS 	= src.M_ADD_TYPE_ISPS;			    /* 상품별 처리타입 유형 true:정율 false:정액 */ 
		targ.DcQty 				= src.DcQty;			        /* 상품별 할인 수량 */ 
		targ.M_EVT_ITEM_CD 		= src.M_EVT_ITEM_CD;			/* 상품 멀티 행사 코드*/
		targ.M_EVT_PUR_CD 		= src.M_EVT_PUR_CD;				/* 총 구매 금액에 대한 행사 코드 */
		targ.M_EVT_ADD_ITEM_CD 	= src.M_EVT_ADD_ITEM_CD;		/* 멀티 증정 행사 코드 */
//		targ.M_EVT_ADD_UNIT_QTY = src.M_EVT_ADD_UNIT_QTY;		/* 멀티 증정 수량 */
		targ.ADD_DC_PRC 	= src.ADD_DC_PRC;					/* 추가 할인 금액 */
		
		targ.setIsFreeGift(src.getIsFreeGift());	//증정상품여부	
		return targ;
	},
	/**
	 * 업체 객체 복사
	 */
	copyDlvFeeObj:function(src, targ) {
		targ.CUST_CD              = src.CUST_CD;
		targ.CUST_NM				= src.CUST_NM;
		targ.DELIV_FEE            = src.DELIV_FEE;
		//targ.FEE_FREE_RESON       = "";
		targ.FEE_FREE_AMT         = src.FEE_FREE_AMT;
		targ.FREEZE_PACK_FEE      = src.FREEZE_PACK_FEE;
		targ.DELIV_ATTACH_FEE     = src.DELIV_ATTACH_FEE;
		targ.isDvlAttachArea      = src.isDvlAttachArea;
		targ.CUPON_AMT			= 0;
		targ.ORD_AMT			= 0;
		targ.DELIV_CUPON_NO		= "";
		targ.CPN_SEQ		= "";
		return targ;
	},
	/**
	 * 주문 상품 배송으로 복사. clsOrder에 있어야 할듯 하긴함 
	 * @param pZeroQty : Qty를 0으로 설정.
	 */
	pushDlv:function(pZeroQty) {
		var dlvShp = new CShp();
		this.addDlvShp(dlvShp);
		var orderShps = this.getShps(COrd.TAG_ORDER);
		var len = orderShps.length;
		for (var i = 0; i < len; i++) {
			var shp = orderShps[i];
			var size = shp.goodsSize();
			for (var g = 0; g < size; g++) {
				var goods = shp.getGood(g);
				var cGoods = this.copyGoodsObj(goods, new CGood());
				if (pZeroQty) {
					cGoods.setQty(0);
					cGoods.setMEvtItemDcAmt(0);
				}
				dlvShp.addGood(cGoods, true);
			}
			var dlvs = shp.getDlvFee();
			var dlvLen = dlvs.length;
			for (var d = 0; d < dlvLen; d++) {
				dlvShp.addDlvFee(this.copyDlvFeeObj(dlvs[d], new CDlvFee()));			
			}
		}
	},
	popDlv:function() {
		this.dlvShp.pop();
	}
};