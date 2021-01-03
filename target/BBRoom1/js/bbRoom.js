axios.defaults.withCredentials = true;
$(document).ready(function() {
	// 富文本编辑器

	var E = window.wangEditor
	const editor = new E('#box1')
	// 或者 const editor = new E( document.getElementById('div1') )
	editor.create()
	editor.config.uploadImgMaxSize = 2 * 1024 * 1024 // 2M
	editor.config.linkImgCallback = function(src) {
		console.log('图片 src ', src);
	}
	// 插入网络图片的回调
	editor.config.uploadImgServer = '/upload-img';
	editor.config.uploadImgMaxLength = 5; // 一次最多上传 5 个图片
	editor.config.placeholder = '请输入帖子正文（不超过3000字）';
	editor.config.showFullScreen = false;
	editor.config.pasteFilterStyle = false;

	var userId1 = localStorage.getItem("userId");
	var date = new Date();
	var year = date.getFullYear(); //获取完整的年份(4位,1970-???)
	var month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
	// var p = `<div class="iii">${year}</div>`
	// var iiis = document.getElementsByClassName("iiis")[0];
	// iiis.innerHTML = p;
	console.log(month);
	localStorage.setItem("month", month);
	qmonth = `${month}月`;
	var time = document.getElementsByClassName("time")[0]
	time.innerText = qmonth;
	// 年份
	axios({
		url: 'http://8.131.77.167:8888/BBRoom/diary/allYear',
		method: 'post',
		async: false,
		xhrFields: {
			withCredentials: true // 允许跨域携带cookie信息
		},
		data: {
			userId: userId1,
		},

	}).then(function(res) {
		console.log(res);
		var pp = "";
		for (i = 0; i < res.data.length; i++) {
			pp += `<div class="iii" id="year${res.data[i]}" onclick="years(this)">${res.data[i]}</div>`;
		}
		var iiis = document.getElementsByClassName("iiis")[0];
		iiis.innerHTML = pp;
	})
	// 查看日记信息
	axios({
		url: 'http://8.131.77.167:8888/BBRoom/diary/findExactDiaryByUserId',
		method: 'post',
		async: false,
		xhrFields: {
			withCredentials: true // 允许跨域携带cookie信息
		},
		data: {
			userId: userId1,
			year: year,
			month: month
		},

	}).then(function(res) {
		console.log(res);
		var lll = "";
		for (j = res.data.length - 1; j >= 0; j--) {
			console.log(res.data[j].time);
			// 具体时间
			var timee = res.data[j].time.slice(11, 16);
			// 日
			var timeee = res.data[j].time.slice(8, 10);
			lll +=
				`<div class="mes" id="diaryId${res.data[j].diaryId}">
							<div class="time1">
								${timee}
							</div>
							<div class="time2">
								${timeee}
							</div>
							<div class="nizaizheshuo" onclick="llllll(this)" id="diaryI${res.data[j].diaryId}">
								<i class="fa fa-trash"></i>
							</div>
							<div class="bubbles" onclick="chakandakuaid(this)" id="diary${res.data[j].diaryId}">
								<div class="mess">
									${res.data[j].info}
								</div>
							</div>
							<div class="clear">

							</div>
						</div>`;
		}
		var diarys = document.getElementsByClassName("diarys")[0];
		diarys.innerHTML = lll;
		// 中间白色条条
		var tiaotiao = 40 + 165 * res.data.length;
		var tiao = document.getElementsByClassName("tiao")[0];
		tiao.style.height = tiaotiao + "px";
	})

	// 发说说
	fss = function() {
		var a = editor.txt.html();
		var userId1 = localStorage.getItem("userId");
		axios({
			url: 'http://8.131.77.167:8888/BBRoom/diary/addDiary',
			method: 'post',
			async: false,
			xhrFields: {
				withCredentials: true // 允许跨域携带cookie信息
			},
			data: {
				userId: userId1,
				info: a
			},

		}).then(function(res) {
			var zhezhao3 = document.getElementsByClassName("zhezhao")[2];
			zhezhao3.style.display = "none";
			location.reload();
		})
	}

	// 说说列表
	// 当前登录人信息
	axios({
		url: 'http://8.131.77.167:8888/BBRoom/user/userStatusCheck',
		method: 'post',
		async: false,
		xhrFields: {
			withCredentials: true // 允许跨域携带cookie信息
		},
	}).then(function(res) {
		console.log(res);
		if (res.data.email == null) {
			window.location.href = '../pages/login.html'
		}
		if (res.data.perms == "user") {
			document.getElementsByClassName("manage")[0].style.display = "none";
		}
		else{
			document.getElementsByClassName("bubble2")[0].style.display = "none";
		}
		var name = document.getElementsByClassName("name")[0];
		var info12 = document.getElementsByClassName("info12")[0];
		var sexx = document.getElementById("sexx");
		var pro = document.getElementById("pro");
		var info11 = document.getElementsByClassName("info11")[0];
		qqqqq = `<img src="http://8.131.77.167:8888/BBRoom/headImage/${res.data.headImageUrl}">`
		info11.innerHTML = qqqqq;
		q = `${res.data.sex}`;
		qq = `${res.data.profession}`
		qqqq = res.data.userId;
		localStorage.setItem("userId", qqqq);
		sexx.innerText = q;
		pro.innerText = qq;
		// name.innerText = "res.data.username"
		if (res.data.username == null) {
			qqq = `用户${res.data.userId}`;
			info12.innerText = qqq;
			name.innerText = qqq;
		} else {
			qqq = `${res.data.username}`;
			info12.innerText = qqq;
			name.innerText = qqq;
		}


	})
});
// $(".gj").click(function(e){
//         var ev = e || window.event;
//         if(ev.stopPropagation){
//             ev.stopPropagation();
//         }
//         else if(window.event){
//             window.event.cancelBubble = true;//兼容IE
//         }
// })
// document.onclick = function(){
//         $(".bubble").hide();
//     }
// $(".gj").click(function(e){
//     var ev = e || window.event;
//         if(ev.stopPropagation){
//                 ev.stopPropagation();
//          }
//         else if(window.event){
//                 window.event.cancelBubble = true;//兼容IE
//         }
// })
function gj() {
	var obj = document.getElementsByClassName("bubble")[0];
	if (obj.style.display == "block") {
		obj.style.display = 'none';
	} else {
		obj.style.display = 'block';
	}
}


function show1() {
	document.getElementsByClassName("zhezhao")[0].style.display = "block";
	document.getElementsByClassName("bubble")[0].style.display = 'none';
}

function show2() {
	document.getElementsByClassName("zhezhao")[1].style.display = "block";
	document.getElementsByClassName("bubble")[0].style.display = 'none';
}

function hide1() {
	document.getElementsByClassName("zhezhao")[0].style.display = "none";
}

function hide2() {
	document.getElementsByClassName("zhezhao")[1].style.display = "none";
}

function hide6() {
	document.getElementsByClassName("zhezhao")[3].style.display = "none";
}
function tuichu() {
	axios({
		url: 'http://8.131.77.167:8888/BBRoom/user/logout',
		method: 'post',
		async: false,
		xhrFields: {
			withCredentials: true // 允许跨域携带cookie信息
		},
	}).then(function(res) {
		alert("成功退出登录");
		window.location.href = '../pages/login.html';
	})
}

function zhuxiao() {
	axios({
		url: 'http://8.131.77.167:8888/BBRoom/user/deleteUser',
		method: 'post',
		async: false,
		xhrFields: {
			withCredentials: true // 允许跨域携带cookie信息
		},
	}).then(function(res) {
		window.location.href = '../pages/login.html';
	})
}
// 跳转到个人资料
function ziliao() {
	window.location.href = '../pages/personalCenter.html';
}
// 跳转到管理
function guanli() {
	window.location.href = '../pages/manage.html';
}
// 年份
function years(e) {
	// e.style.backgorundColor = "#3b5369";
	// // e.style.color = "white";
	// var iii = document.getElementsByClassName("iii")[0];
	// iii.style.backgorundColor = "#3b5369"
	// e.style.backgorundColor = "#3b5369";
	// e.style.color = "white";
	var userId1 = localStorage.getItem("userId");
	var id = e.id;
	var idd = id.slice(4);
	localStorage.setItem("year", idd);
	var year1 = localStorage.getItem("year");
	var month1 = localStorage.getItem("month");
	console.log(idd);
	axios({
		url: 'http://8.131.77.167:8888/BBRoom/diary/findExactDiaryByUserId',
		method: 'post',
		async: false,
		xhrFields: {
			withCredentials: true // 允许跨域携带cookie信息
		},
		data: {
			userId: userId1,
			year: year1,
			month: month1
		},

	}).then(function(res) {
		console.log(res);
		var lll = "";
		for (j = res.data.length - 1; j >= 0; j--) {
			console.log(res.data[j].time);
			// 具体时间
			var timee = res.data[j].time.slice(11, 16);
			// 日
			var timeee = res.data[j].time.slice(8, 10);
			lll +=
			`<div class="mes" id="diaryId${res.data[j].diaryId}">
						<div class="time1">
							${timee}
						</div>
						<div class="time2">
							${timeee}
						</div>
						<div class="nizaizheshuo" onclick="llllll(this)" id="diaryI${res.data[j].diaryId}">
							<i class="fa fa-trash"></i>
						</div>
						<div class="bubbles" onclick="chakandakuaid(this)" id="diary${res.data[j].diaryId}">
							<div class="mess">
								${res.data[j].info}
							</div>
						</div>
						<div class="clear">
			
						</div>
					</div>`;
		}
		var diarys = document.getElementsByClassName("diarys")[0];
		diarys.innerHTML = lll;
		// 中间白色条条
		var tiaotiao = 40 + 165 * res.data.length;
		var tiao = document.getElementsByClassName("tiao")[0];
		tiao.style.height = tiaotiao + "px";
	})

}
// 月份
function months(e) {
	// e.style.backgorundColor = "#3b5369";
	// // e.style.color = "white";
	// var iii = document.getElementsByClassName("iii")[0];
	// iii.style.backgorundColor = "#3b5369"
	// e.style.backgorundColor = "#3b5369";
	// e.style.color = "white";
	var userId1 = localStorage.getItem("userId");
	var iddd = e.id;
	var idddd = iddd.slice(5);
	localStorage.setItem("month", idddd);
	var year1 = localStorage.getItem("year");
	var month1 = localStorage.getItem("month");
	qmonth = `${month1}月`;
	var time = document.getElementsByClassName("time")[0]
	time.innerText = qmonth;
	console.log(idddd);
	axios({
		url: 'http://8.131.77.167:8888/BBRoom/diary/findExactDiaryByUserId',
		method: 'post',
		async: false,
		xhrFields: {
			withCredentials: true // 允许跨域携带cookie信息
		},
		data: {
			userId: userId1,
			year: year1,
			month: month1
		},

	}).then(function(res) {
		console.log(res);
		var lll = "";
		for (j = res.data.length - 1; j >= 0; j--) {
			console.log(res.data[j].time);
			// 具体时间
			var timee = res.data[j].time.slice(11, 16);
			// 日
			var timeee = res.data[j].time.slice(8, 10);
			lll +=
			`<div class="mes" id="diaryId${res.data[j].diaryId}">
						<div class="time1">
							${timee}
						</div>
						<div class="time2">
							${timeee}
						</div>
						<div class="nizaizheshuo" onclick="llllll(this)" id="diaryI${res.data[j].diaryId}">
							<i class="fa fa-trash"></i>
						</div>
						<div class="bubbles" onclick="chakandakuaid(this)" id="diary${res.data[j].diaryId}">
							<div class="mess">
								${res.data[j].info}
							</div>
						</div>
						<div class="clear">
			
						</div>
					</div>`;
		}
		var diarys = document.getElementsByClassName("diarys")[0];
		diarys.innerHTML = lll;
		// 中间白色条条
		var tiaotiao = 40 + 165 * res.data.length;
		var tiao = document.getElementsByClassName("tiao")[0];
		tiao.style.height = tiaotiao + "px";
	})

}

function fariji() {
	var zhezhao3 = document.getElementsByClassName("zhezhao")[2];
	zhezhao3.style.display = "block";
}

function quxiao() {
	var zhezhao3 = document.getElementsByClassName("zhezhao")[2];
	zhezhao3.style.display = "none";
}

function chakandakuaid(e) {
	var id = e.id;
	var diaryId = id.slice(5);
	console.log(diaryId)
	document.getElementsByClassName("zhezhao")[3].style.display = "block";
	axios({
		url: '	http://8.131.77.167:8888/BBRoom/diary/selectDiary',
		method: 'post',
		async: false,
		xhrFields: {
			withCredentials: true // 允许跨域携带cookie信息
		},
		data: {
			diaryId: diaryId,
		},

	}).then(function(res) {
		var jia = document.getElementsByClassName("jiuhenbang")[0];
		var pp = `${res.data.info}`
		jia.innerHTML = pp;
	})
}
function llllll(e) {
	var id = e.id;
	var diaryId = id.slice(6);
	console.log(diaryId);
	axios({
		url: 'http://8.131.77.167:8888/BBRoom/diary/deleteDiary',
		method: 'post',
		async: false,
		xhrFields: {
			withCredentials: true // 允许跨域携带cookie信息
		},
		data: {
			diaryId: diaryId,
		},

	}).then(function(res) {
		alert("删除成功");
		location.reload();
	})
}
