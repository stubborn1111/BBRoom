axios.defaults.withCredentials = true;

function gj() {
	var obj = document.getElementsByClassName("bubble")[0];
	if (obj.style.display == "block") {
		obj.style.display = 'none';
	} else {
		obj.style.display = 'block';
	}
	stopPropagation(e);
}


function show1() {
	document.getElementsByClassName("zhezhao")[0].style.display = "block";
	document.getElementsByClassName("bubble")[0].style.display = 'none';
}

function show2() {
	document.getElementsByClassName("zhezhao")[1].style.display = "block";
	document.getElementsByClassName("bubble")[0].style.display = 'none';
}

function show3() {
	document.getElementsByClassName("zhezhao")[2].style.display = "block";
}

function show4() {
	document.getElementsByClassName("zhezhao")[3].style.display = "block";
}

function show5() {
	document.getElementsByClassName("zhezhao")[4].style.display = "block";
}

function hide1() {
	document.getElementsByClassName("zhezhao")[0].style.display = "none";
}

function hide2() {
	document.getElementsByClassName("zhezhao")[1].style.display = "none";
}

function hide3() {
	document.getElementsByClassName("zhezhao")[2].style.display = "none";
	location.reload();
}

function hide4() {
	document.getElementsByClassName("zhezhao")[3].style.display = "none";
}

function hide5() {
	document.getElementsByClassName("zhezhao")[4].style.display = "none";
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
function room() {
	window.location.href = '../pages/bbRoom.html';
}
// 跳转到管理
function guanli() {
	window.location.href = '../pages/manage.html';
}
$(document).ready(function() {
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
		var info11 = document.getElementsByClassName("headImg")[0];
		qqqqq = `<img src="http://8.131.77.167:8888/BBRoom/headImage/${res.data.headImageUrl}">`
		info11.innerHTML = qqqqq;
		var name = document.getElementsByClassName("name")[0];
		var m11 = document.getElementsByClassName("m11")[0];
		var nicheng1 = document.getElementsByClassName("nicheng1")[0];
		if (res.data.perms == "user") {
			document.getElementsByClassName("manage")[0].style.display = "none";
		} else {
			document.getElementsByClassName("bubble2")[0].style.display = "none";
		}
		// name.innerText = "res.data.username"
		if (res.data.username == null) {
			qqq = `用户${res.data.userId}`;
			name.innerText = qqq;
			mq = `<h3><span class="fa fa-user"></span> 用户${res.data.userId}</h3>`;
			mqq = `<input type="text" value="用户${res.data.userId}" id="wqqnl">`;
			m11.innerHTML = mq;
			nicheng1.innerHTML = mqq;
		} else {
			qqq = `${res.data.username}`;
			name.innerText = qqq;
			mq = `<h3><span class="fa fa-user"></span> ${res.data.username}</h3>`;
			mqq = `<input type="text" value="${res.data.username}" id="wqqnl">`;
			nicheng1.innerHTML = mqq;
			m11.innerHTML = mq;
		}
		var emaila = res.data.email;
		var youxiang = document.getElementById("youxiang");
		var youxiang1 = document.getElementById("youxiang1");
		var nn = document.getElementsByClassName("nn")[0];
		var sexx = document.getElementById("checkbox-1-1");
		var sexx1 = document.getElementById("checkbox-1-2");
		if (res.data.sex == "男") {
			sexx.checked = true;
		} else {
			sexx1.checked = true;
		}
		nnq = `<textarea id="text1">${res.data.profession}</textarea>`;
		nn.innerHTML = nnq;
		youxiang.value = emaila;
		youxiang1.value = emaila;
	})
	// 修改头像
	$('#upload_file').change(function(e) {
		//   var fd = new FormData();
		//               fd.append("headImage", blob,Date.now()+'.jpg');
		//               console.log(fd);

		let file = e.target.files[0];
		let fd = new FormData(); //创建form对象
		fd.append('headImage', file); //通过append向form对象添加数据
		// param.append('headImage', name);
		console.log(fd);
		console.log(fd.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
		//添加请求头
		nansil = function() {

			axios({
				url: 'http://8.131.77.167:8888/BBRoom/user/changeheadImage',
				method: 'post',
				async: false,
				headers: {
					'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryVCFSAonTuDbVCoAN',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				xhrFields: {
					withCredentials: true // 允许跨域携带cookie信息
				},
				data: fd,
			}).then(function(res) {
				console.log(res.data);
				document.getElementsByClassName("zhezhao")[4].style.display = "none";
				location.reload();
			})
		}
	});

});

// 修改资料
function qrxg() {
	var userId1 = localStorage.getItem("userId");
	var username = document.getElementById("wqqnl").value;
	var sexx = document.getElementById("checkbox-1-1");
	var sexx1 = document.getElementById("checkbox-1-2");
	if (sexx.checked == true) {
		sex = "男"
	} else {
		sex = "女"
	}
	var profession = document.getElementById("text1").value;
	axios({
		url: 'http://8.131.77.167:8888/BBRoom/user/userUpdate',
		method: 'post',
		async: false,
		xhrFields: {
			withCredentials: true // 允许跨域携带cookie信息
		},
		data: {
			userId: userId1,
			username: username,
			sex: sex,
			profession: profession
		},

	}).then(function(res) {
		document.getElementsByClassName("zhezhao")[0].style.display = "none";
		alert("修改成功");
		location.reload();
	})
}
// 修改密码
function xiugaia() {
	var old = document.getElementById("passold").value;
	var userId1 = localStorage.getItem("userId");
	var now = document.getElementById("passnow").value;
	var news = document.getElementById("passnew").value;
	var rule1 = /^[a-zA-Z]\w{5,10}$/;
	if (old.length != 0 && now.length != 0 && news.length != 0) {
		if (!rule1.test(now)) {
			alert("密码格式错误，请输入以字母开头的6~10位密码");
		} else {
			if (news != now) {
				alert("两次密码不同");
			} else {
				axios({
					url: 'http://8.131.77.167:8888/BBRoom/user/updatePassword',
					method: 'post',
					async: false,
					xhrFields: {
						withCredentials: true // 允许跨域携带cookie信息
					},
					data: {
						newPassword: news,
						password: old,
						userId: userId1
					},
				}).then(function(res) {
					if (res.data == 0) {
						alert("原密码输入错误,修改失败");
					} else {
						alert("修改成功");
						location.reload();
					}
				})
			}
		}
	} else {
		alert("输入不能为空");
	}
}
// 修改头像

// $('#upload_file').change(function(e) {
// 	let file = e.target.files[0];
// 	let param = new FormData(); //创建form对象
// 	param.append('id', 1);
// 	param.append('file1', file); //通过append向form对象添加数据
// 	console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
// 	//添加请求头
// 	nansil = function(){
// 		axios({
// 			url: '8.131.77.167:8888/BBRoom/user/changeheadImage',
// 			method: 'post',
// 			async: false,
// 			headers: {
// 				'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryVCFSAonTuDbVCoAN'
// 			},
// 			xhrFields: {
// 				withCredentials: true // 允许跨域携带cookie信息
// 			},
// 			data: param,
// 		}).then(function(res) {
// 			console.log(res.data);
// 		})
// 	}
// });
