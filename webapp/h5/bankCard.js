function formatMoney(money) {
	if (!money) {
		return "0";
	}
	if (money > 10000) {
		return money / 10000 + "万";
	}
	if (money > 1000) {
		return money / 1000 + "千";
	}
	return money;
}
var BankCardVerifyTool = {
	init : function(callback) {
		// BankCardVerifyTool
		$.post("bank_pay_way_list.htm", {
			t : new Date()
		}, function(data) {
			var bankList = [ {
				name : "请选择银行",
				cardType : "借记卡",
				code : "no_bank",
				singleTip : "0万",
				singleMoney : 0,
				dayTip : "0万",
				monthTip : "0万"
			} ];
			try {

				for ( var i in data) {
					var row = data[i];
					if (row.way == "closed") {
						continue;
					}
					bankList.push({
						name : row.name,
						cardType : row.cardType,
						code : row.code,
						singleTip : formatMoney(row.way == "fuiou" ? row.fuiou_s : row.baofoo_s),
						singleMoney : row.way == "fuiou" ? row.fuiou_s : row.baofoo_s,
						way : row.way,
						dayTip : formatMoney(row.way == "fuiou" ? row.fuiou_d : row.baofoo_d),
						monthTip : formatMoney(row.way == "fuiou" ? row.fuiou_m : row.baofoo_m)
					});
				}
			} catch (e) {
				alert("加载银行通道出错:" + e);
			}
			if(bankList&&bankList.length>1){
				BankCardVerifyTool.bankList = bankList;
			}
			callback();
		}, "json");
	},
	theCardIsTheBank : function(cardNo, bankCode) {
		if (!cardNo || !bankCode) {
			return false;
		}
		if (!this.bankNo[bankCode]) {
			return false;
		}
		var ruleList = this.bankNo[bankCode];
		for ( var i in ruleList) {
			if (cardNo.indexOf(ruleList[i]) == 0) {
				return true;
			}
		}
		return false;
	},
	bankNo : {
		"0801020000" : [ "370246", "370248", "370249", "427010", "427018", "427019", "427020", "427029", "427030", "427039", "370247", "438125", "438126", "451804", "451810", "451811", "45806",
				"458071", "489734", "489735", "489736", "510529", "427062", "524091", "427064", "530970", "53098", "530990", "558360", "620200", "620302", "620402", "620403", "620404", "524047",
				"620406", "620407", "525498", "620409", "620410", "620411", "620412", "620502", "620503", "620405", "620408", "620512", "620602", "620604", "620607", "620611", "620612", "620704",
				"620706", "620707", "620708", "620709", "620710", "620609", "620712", "620713", "620714", "620802", "620711", "620904", "620905", "621001", "620902", "621103", "621105", "621106",
				"621107", "621102", "621203", "621204", "621205", "621206", "621207", "621208", "621209", "621210", "621302", "621303", "621202", "621305", "621306", "621307", "621309", "621311",
				"621313", "621211", "621315", "621304", "621402", "621404", "621405", "621406", "621407", "621408", "621409", "621410", "621502", "621317", "621511", "621602", "621603", "621604",
				"621605", "621608", "621609", "621610", "621611", "621612", "621613", "621614", "621615", "621616", "621617", "621607", "621606", "621804", "621807", "621813", "621814", "621817",
				"621901", "621904", "621905", "621906", "621907", "621908", "621909", "621910", "621911", "621912", "621913", "621915", "622002", "621903", "622004", "622005", "622006", "622007",
				"622008", "622010", "622011", "622012", "621914", "622015", "622016", "622003", "622018", "622019", "622020", "622102", "622103", "622104", "622105", "622013", "622111", "622114",
				"622200", "622017", "622202", "622203", "622208", "622210", "622211", "622212", "622213", "622214", "622110", "622220", "622223", "622225", "622229", "622230", "622231", "622232",
				"622233", "622234", "622235", "622237", "622215", "622239", "622240", "622245", "622224", "622303", "622304", "622305", "622306", "622307", "622308", "622309", "622238", "622314",
				"622315", "622317", "622302", "622402", "622403", "622404", "622313", "622504", "622505", "622509", "622513", "622517", "622502", "622604", "622605", "622606", "622510", "622703",
				"622715", "622806", "622902", "622903", "622706", "623002", "623006", "623008", "623011", "623012", "622904", "623015", "623100", "623202", "623301", "623400", "623500", "623602",
				"623803", "623901", "623014", "624100", "624200", "624301", "624402", "62451804", "62451810", "62451811", "6245806", "62458071", "6253098", "623700", "628288", "624000", "9558",
				"628286", "622206", "621225", "526836", "513685", "543098", "458441", "620058", "621281", "622246", "900000", "544210", "548943", "370267", "621558", "621559", "621722", "621723",
				"620086", "621226", "402791", "427028", "427038", "548259", "356879", "356880", "356881", "356882", "528856", "621618", "620516", "621227", "621288", "621721", "900010", "625330",
				"625331", "625332", "623062", "622236", "374738", "374739", "621670", "524374", "550213" ],
		"0801030000" : [ "103", "403361", "404117", "404118", "404119", "404120", "404121", "463758", "519412", "519413", "520082", "520083", "53591", "552599", "558730", "49102", "514027", "622836",
				"622837", "622841", "622824", "622826", "628268", "6349102", "6353591", "95595", "95596", "95597", "95598", "95599", "622848", "620059", "621282", "622828", "625996", "625998",
				"622823", "621336", "621619", "622821", "622822", "622825", "622827", "622845", "622849", "623018", "625997", "623206", "621671", "622840", "622843", "622844", "622846", "622847" ],
		"0801040000" : [ "621660", "621661", "621662", "621663", "621665", "621667", "621668", "621669", "621666", "625908", "625910", "625909", "356833", "356835", "409665", "409666", "409668",
				"409669", "409670", "409671", "409672", "456351", "512315", "512316", "512411", "512412", "514957", "409667", "518378", "518379", "518474", "518475", "518476", "438088", "524865",
				"525745", "525746", "547766", "552742", "553131", "558868", "514958", "622752", "622753", "622755", "524864", "622757", "622758", "622759", "622760", "622761", "622762", "622763",
				"601382", "622756", "628388", "621256", "621212", "620514", "622754", "622764", "518377", "622765", "622788", "621283", "620061", "621725", "620040", "558869", "621330", "621331",
				"621332", "621333", "621297", "377677", "621568", "621569", "625905", "625906", "625907", "628313", "625333", "621672", "628312", "623208", "621620", "621756", "621757", "621758",
				"621759", "621785", "621786", "621787", "621788", "621789", "621790", "621785", "6015696", "62166062" ],
		"0801050000" : [ "5453242", "5491031", "5544033", "622725", "622728", "621284", "421349", "434061", "434062", "436728", "436742", "453242", "491031", "524094", "526410", "53242", "53243",
				"544033", "552245", "589970", "620060", "621080", "621081", "621082", "621466", "621467", "621488", "621499", "621598", "621621", "621700", "622280", "622700", "622707", "622966",
				"622988", "625955", "625956", "553242", "623668", "623094", "623211" ],
		"0801000000" : [ "621096", "621098", "622150", "622151", "622181", "622188", "622199", "955100", "621095", "620062", "621285", "621798", "621799", "621797", "620529" ],
		"0803050000" : [ "622615", "622616", "622618", "622622", "622617", "622619", "415599", "421393", "421865", "427570", "427571", "472067", "472068", "622620", "621691" ],
		"0803030000" : [ "303", "356837", "356838", "486497", "620085", "622660", "622662", "622663", "622664", "622665", "622666", "622667", "622669", "622670", "622671", "622672", "622668",
				"622661", "622674", "90030", "622673", "620518", "621489", "621492", "620535", "623156" ],
		"0803060000" : [ "406365", "406366", "428911", "436768", "436769", "436770", "487013", "491032", "491033", "491034", "491035", "491036", "491037", "491038", "436771", "518364", "520152",
				"520382", "541709", "541710", "548844", "552794", "493427", "622555", "622556", "622557", "622558", "622559", "622560", "622568", "528931", "685800", "6858000", "6858001", "6858009",
				"9111", "558894", "625072", "625071", "628260", "628259", "621462", "625805", "625806", "625807", "625808", "625809", "625810" ],
		"0803020000" : [ "433670", "433680", "442729", "442730", "620082", "622690", "622691", "622692", "622696", "622698", "622998", "622999", "433671", "968807", "968808", "968809", "621771",
				"621767", "621768", "621770", "621772", "621773" ],
		"0803090000" : [ "438589", "90592", "966666", "622909", "438588", "622908" ],
		"0803040000" : [ "622630", "622631", "622632", "622633", "999999", "621222", "623020", "623021", "623022", "623023" ],
		"0803010000" : [ "620021", "620521", "00405512", "0049104", "0053783", "00601428", "405512", "434910", "458123", "458124", "49104", "520169", "522964", "53783", "552853", "601428", "622250",
				"622251", "521899", "622254", "622255", "622256", "622257", "622258", "622259", "622253", "622261", "622284", "622656", "628216", "622252", "66405512", "6649104", "622260",
				"66601428", "955590", "955591", "955592", "955593", "6653783", "628218", "622262" ],
		"0803080000" : [ "356885", "356886", "356887", "356888", "356890", "402658", "410062", "439188", "439227", "468203", "479228", "479229", "512425", "521302", "524011", "356889", "545620",
				"545621", "545947", "545948", "552534", "552587", "622575", "622576", "622577", "622578", "622579", "622580", "545619", "622581", "622582", "622588", "622598", "622609", "690755",
				"690755", "95555", "545623", "621286", "620520", "621483", "621485", "621486", "628290", "057155" ],
		"0803100000" : [ "356851", "356852", "404738", "404739", "456418", "498451", "515672", "356850", "517650", "525998", "622177", "622277", "622516", "622517", "622518", "622520", "622521",
				"622522", "622523", "628222", "84301", "84336", "622500", "84373", "628221", "84385", "84390", "87000", "87010", "87030", "87040", "84380", "984301", "984303", "84361", "87050",
				"622176", "622276", "622228", "621352", "621793", "621795", "621796", "621351", "621390", "621792", "625957", "625958", "621791", "84342", "620530", "625993", "622519", "625831" ],
		"0804100000" : [ "621626", "623058", "623058", "622986", "622989", "622298", "622538" ]
	},
	bankList : [ {
		name : "请选择银行",
		cardType : "借记卡",
		code : "no_bank",
		singleTip : "0万",
		singleMoney : 0,
		dayTip : "0万",
		monthTip : "0万"
	}, {
		name : "工商银行",
		cardType : "借记卡",
		code : "0801020000",
		singleTip : "5万",
		singleMoney : 50000,
		dayTip : "5万",
		monthTip : "50万"
	}, {
		name : "农业银行",
		cardType : "借记卡",
		code : "0801030000",
		singleTip : "5万",
		singleMoney : 50000,
		dayTip : "10万",
		monthTip : "50万"
	}, {
		name : "中国银行",
		cardType : "借记卡",
		code : "0801040000",
		singleTip : "5万",
		singleMoney : 50000,
		dayTip : "20万",
		monthTip : "50万"
	}, {
		name : "建设银行",
		cardType : "借记卡",
		code : "0801050000",
		singleTip : "5万",
		singleMoney : 50000,
		dayTip : "10万",
		monthTip : "50万"
	}, {
		name : "邮政储蓄银行",
		cardType : "借记卡",
		code : "0801000000",
		singleTip : "20万",
		singleMoney : 200000,
		dayTip : "50万",
		monthTip : "50万"
	}, {
		name : "平安银行",
		cardType : "借记卡",
		code : "0804100000",
		singleTip : "20万",
		singleMoney : 200000,
		dayTip : "50万",
		monthTip : "50万"
	}, {
		name : "民生银行",
		cardType : "借记卡",
		code : "0803050000",
		singleTip : "20万",
		singleMoney : 200000,
		dayTip : "50万",
		monthTip : "50万"
	}, {
		name : "光大银行",
		cardType : "借记卡",
		code : "0803030000",
		singleTip : "20万",
		singleMoney : 200000,
		dayTip : "50万",
		monthTip : "50万"
	}, {
		name : "广发银行",
		cardType : "借记卡",
		code : "0803060000",
		singleTip : "20万",
		singleMoney : 200000,
		dayTip : "50万",
		monthTip : "50万"
	}, {
		name : "中信银行",
		cardType : "借记卡",
		code : "0803020000",
		singleTip : "20万",
		singleMoney : 200000,
		dayTip : "50万",
		monthTip : "50万"
	}, {
		name : "兴业银行",
		cardType : "借记卡",
		code : "0803090000",
		singleTip : "5万",
		singleMoney : 50000,
		dayTip : "5万",
		monthTip : "50万"
	}, {
		name : "华夏银行",
		cardType : "借记卡",
		code : "0803040000",
		singleTip : "20万",
		singleMoney : 200000,
		dayTip : "50万",
		monthTip : "50万"
	}, {
		name : "交通银行",
		cardType : "借记卡",
		code : "0803010000",
		singleTip : "5万",
		singleMoney : 50000,
		dayTip : "10万",
		monthTip : "50万"
	}, {
		name : "招商银行",
		cardType : "借记卡",
		code : "0803080000",
		singleTip : "5万",
		singleMoney : 50000,
		dayTip : "20万",
		monthTip : "20万"
	}, {
		name : "浦发银行",
		cardType : "借记卡",
		code : "0803100000",
		singleTip : "49999元",
		singleMoney : 49999,
		dayTip : "49999元",
		monthTip : "50万"
	} ],
	findBank : function(code) {
		for ( var i in this.bankList) {
			var bank = this.bankList[i];
			if (bank.code == code) {
				return bank;
			}
		}
		return null;
	}
};