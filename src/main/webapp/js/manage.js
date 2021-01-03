axios.defaults.withCredentials = true;

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

function hide1() {
	document.getElementsByClassName("zhezhao")[0].style.display = "none";
}

function hide2() {
	document.getElementsByClassName("zhezhao")[1].style.display = "none";
}

function hide3() {
	document.getElementsByClassName("zhezhao")[2].style.display = "none";
}

function hide4() {
	document.getElementsByClassName("zhezhao")[3].style.display = "none";
}

function hide5() {
	document.getElementsByClassName("zhezhao")[4].style.display = "none";
}

function hide6() {
	document.getElementsByClassName("zhezhao")[5].style.display = "none";
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
// 跳转到个人空间
function room() {
	window.location.href = '../pages/bbRoom.html';
}
// 跳转到个人资料
function ziliao() {
	window.location.href = '../pages/personalCenter.html';
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
		if (res.data.perms == "user") {
			window.location.href = '../pages/bbRoom.html';
		} else {
			document.getElementsByClassName("bubble2")[0].style.display = "none";
		}
		console.log(res);
		if (res.data.email == null) {
			window.location.href = '../pages/login.html'
		}
		var name = document.getElementsByClassName("name")[0];
		if (res.data.username == null) {
			qqq = `用户${res.data.userId}`;
			name.innerText = qqq;
		} else {
			qqq = `${res.data.username}`;
			name.innerText = qqq;
		}
	})
	document.getElementsByClassName("fenye")[0].style.display = "block";
	document.getElementsByClassName("fenye")[1].style.display = "none";
	localStorage.setItem("currentPage", "1");
	var currentPage = localStorage.getItem("currentPage");
	axios({
		url: 'http://8.131.77.167:8888/BBRoom/manage/findAllUser',
		method: 'post',
		async: false,
		xhrFields: {
			withCredentials: true // 允许跨域携带cookie信息
		},
		data: {
			currentPage: currentPage,
		},

	}).then(function(res) {
		bbb = "";
		console.log(res);
		for (i = 0; i < res.data.list.length; i++) {
			var sf;
			if (res.data.list[i].perms == "user") {
				sf = 1;
			}
			if (res.data.list[i].perms == "admin") {
				sf = 0;
			}
			bbb +=
				`<tr>
							<td class="userName"><strong>${res.data.list[i].email}</strong></td>
							<td>${res.data.list[i].sex}</td>
							<td>${res.data.list[i].profession}</td>
							<td>${res.data.list[i].perms}</td>
							<td>
								<button type="button" class="xg" id="${sf}renyuan${res.data.list[i].userId}" onclick="xiugaigai(this)"><span class="fa fa-eye"></span></button>
								<button type="button" class="sc" id="${sf}renyuan1${res.data.list[i].userId}" onclick="shanchuchu(this)"><span class="fa fa-times"></span></button>
								<button type="button" class="qx" id="${sf}renyuan2${res.data.list[i].userId}" onclick="quanxianxian(this)">修改权限</button>
							</td>
						</tr>`;


		}
		var table = document.getElementById("tbodyy");
		table.innerHTML = bbb;
		var dangqianye = document.getElementsByClassName("dangqianye")[0];
		var currentPage = localStorage.getItem("currentPage");
		var totalPage = res.data.totalPage;
		var zongyeshu = document.getElementsByClassName("zongyeshu")[0];
		localStorage.setItem("totalPage", totalPage);
		bbss = `共${totalPage}页`;
		bbs = `第${currentPage}页`;
		zongyeshu.innerHTML = bbss;
		dangqianye.innerHTML = bbs;
	})
});
// 跳转到第一页
function diyiye() {
	localStorage.setItem("currentPage", "1");
	var currentPage = localStorage.getItem("currentPage");
	axios({
		url: 'http://8.131.77.167:8888/BBRoom/manage/findAllUser',
		method: 'post',
		async: false,
		xhrFields: {
			withCredentials: true // 允许跨域携带cookie信息
		},
		data: {
			currentPage: currentPage,
		},

	}).then(function(res) {
		var totalCount = res.data.totalCount;
		localStorage.setItem("totalCount", totalCount);
		bbb = "";
		console.log(res);
		for (i = 0; i < res.data.list.length; i++) {
			var sf;
			if (res.data.list[i].perms == "user") {
				sf = 1;
			}
			if (res.data.list[i].perms == "admin") {
				sf = 0;
			}
			bbb +=
				`<tr>
								<td class="userName"><strong>${res.data.list[i].email}</strong></td>
								<td>${res.data.list[i].sex}</td>
								<td>${res.data.list[i].profession}</td>
								<td>${res.data.list[i].perms}</td>
								<td>
									<button type="button" class="xg" id="${sf}renyuan${res.data.list[i].userId}" onclick="xiugaigai(this)"><span class="fa fa-eye"></span></button>
									<button type="button" class="sc" id="${sf}renyuan1${res.data.list[i].userId}" onclick="shanchuchu(this)"><span class="fa fa-times"></span></button>
									<button type="button" class="qx" id="${sf}renyuan2${res.data.list[i].userId}" onclick="quanxianxian(this)">修改权限</button>
								</td>
							</tr>`;

		}
		var table = document.getElementById("tbodyy");
		table.innerHTML = bbb;
		var dangqianye = document.getElementsByClassName("dangqianye")[0];
		var currentPage = localStorage.getItem("currentPage");
		var totalPage = res.data.totalPage;
		var zongyeshu = document.getElementsByClassName("zongyeshu")[0];
		localStorage.setItem("totalPage", totalPage);
		bbss = `共${totalPage}页`;
		bbs = `第${currentPage}页`;
		zongyeshu.innerHTML = bbss;
		dangqianye.innerHTML = bbs;
	})
}
// 跳转到最后一页
function zuihouyiye() {
	var totalPage = localStorage.getItem("totalPage");
	localStorage.setItem("currentPage", totalPage);
	var currentPage = localStorage.getItem("currentPage");
	axios({
		url: 'http://8.131.77.167:8888/BBRoom/manage/findAllUser',
		method: 'post',
		async: false,
		xhrFields: {
			withCredentials: true // 允许跨域携带cookie信息
		},
		data: {
			currentPage: currentPage,
		},

	}).then(function(res) {
		bbb = "";
		console.log(res);
		for (i = 0; i < res.data.list.length; i++) {
			var sf;
			if (res.data.list[i].perms == "user") {
				sf = 1;
			}
			if (res.data.list[i].perms == "admin") {
				sf = 0;
			}
			bbb +=
				`<tr>
								<td class="userName"><strong>${res.data.list[i].email}</strong></td>
								<td>${res.data.list[i].sex}</td>
								<td>${res.data.list[i].profession}</td>
								<td>${res.data.list[i].perms}</td>
								<td>
									<button type="button" class="xg" id="${sf}renyuan${res.data.list[i].userId}" onclick="xiugaigai(this)"><span class="fa fa-eye"></span></button>
									<button type="button" class="sc" id="${sf}renyuan1${res.data.list[i].userId}" onclick="shanchuchu(this)"><span class="fa fa-times"></span></button>
									<button type="button" class="qx" id="${sf}renyuan2${res.data.list[i].userId}" onclick="quanxianxian(this)">修改权限</button>
								</td>
							</tr>`;


		}
		var table = document.getElementById("tbodyy");
		table.innerHTML = bbb;
		var dangqianye = document.getElementsByClassName("dangqianye")[0];
		var currentPage = localStorage.getItem("currentPage");
		var totalPage = res.data.totalPage;
		var zongyeshu = document.getElementsByClassName("zongyeshu")[0];
		localStorage.setItem("totalPage", totalPage);
		bbss = `共${totalPage}页`;
		bbs = `第${currentPage}页`;
		zongyeshu.innerHTML = bbss;
		dangqianye.innerHTML = bbs;
	})
}
// 上一页
function shangyiye() {
	var currentPage = localStorage.getItem("currentPage") - 1;
	if (currentPage == 0) {
		currentPage = Number(currentPage) + 1;
	} else {
		localStorage.setItem("currentPage", currentPage);
	}
	axios({
		url: 'http://8.131.77.167:8888/BBRoom/manage/findAllUser',
		method: 'post',
		async: false,
		xhrFields: {
			withCredentials: true // 允许跨域携带cookie信息
		},
		data: {
			currentPage: currentPage,
		},

	}).then(function(res) {
		bbb = "";
		console.log(res);
		for (i = 0; i < res.data.list.length; i++) {
			var sf;
			if (res.data.list[i].perms == "user") {
				sf = 1;
			}
			if (res.data.list[i].perms == "admin") {
				sf = 0;
			}
			bbb +=
				`<tr>
								<td class="userName"><strong>${res.data.list[i].email}</strong></td>
								<td>${res.data.list[i].sex}</td>
								<td>${res.data.list[i].profession}</td>
								<td>${res.data.list[i].perms}</td>
								<td>
									<button type="button" class="xg" id="${sf}renyuan${res.data.list[i].userId}" onclick="xiugaigai(this)"><span class="fa fa-eye"></span></button>
									<button type="button" class="sc" id="${sf}renyuan1${res.data.list[i].userId}" onclick="shanchuchu(this)"><span class="fa fa-times"></span></button>
									<button type="button" class="qx" id="${sf}renyuan2${res.data.list[i].userId}" onclick="quanxianxian(this)">修改权限</button>
								</td>
							</tr>`;


		}
		var table = document.getElementById("tbodyy");
		table.innerHTML = bbb;
		var dangqianye = document.getElementsByClassName("dangqianye")[0];
		var currentPage = localStorage.getItem("currentPage");
		var totalPage = res.data.totalPage;
		var zongyeshu = document.getElementsByClassName("zongyeshu")[0];
		localStorage.setItem("totalPage", totalPage);
		bbss = `共${totalPage}页`;
		bbs = `第${currentPage}页`;
		zongyeshu.innerHTML = bbss;
		dangqianye.innerHTML = bbs;
	})
}
// 下一页
function xiayiye() {
	var totalPage = localStorage.getItem("totalPage");
	var currentPage = localStorage.getItem("currentPage");
	if (currentPage < totalPage) {
		console.log(currentPage);
		console.log(totalPage);
		currentPage = Number(currentPage) + 1;
		localStorage.setItem("currentPage", currentPage);
	}
	axios({
		url: 'http://8.131.77.167:8888/BBRoom/manage/findAllUser',
		method: 'post',
		async: false,
		xhrFields: {
			withCredentials: true // 允许跨域携带cookie信息
		},
		data: {
			currentPage: currentPage,
		},

	}).then(function(res) {
		bbb = "";
		console.log(res);
		for (i = 0; i < res.data.list.length; i++) {
			var sf;
			if (res.data.list[i].perms == "user") {
				sf = 1;
			}
			if (res.data.list[i].perms == "admin") {
				sf = 0;
			}
			bbb +=
				`<tr>
							<td class="userName"><strong>${res.data.list[i].email}</strong></td>
							<td>${res.data.list[i].sex}</td>
							<td>${res.data.list[i].profession}</td>
							<td>${res.data.list[i].perms}</td>
							<td>
								<button type="button" class="xg" id="${sf}renyuan${res.data.list[i].userId}" onclick="xiugaigai(this)"><span class="fa fa-eye"></span></button>
								<button type="button" class="sc" id="${sf}renyuan1${res.data.list[i].userId}" onclick="shanchuchu(this)"><span class="fa fa-times"></span></button>
								<button type="button" class="qx" id="${sf}renyuan2${res.data.list[i].userId}" onclick="quanxianxian(this)">修改权限</button>
							</td>
						</tr>`;



		}
		var table = document.getElementById("tbodyy");
		table.innerHTML = bbb;
		var dangqianye = document.getElementsByClassName("dangqianye")[0];
		var currentPage = localStorage.getItem("currentPage");
		var totalPage = res.data.totalPage;
		var zongyeshu = document.getElementsByClassName("zongyeshu")[0];
		localStorage.setItem("totalPage", totalPage);
		bbss = `共${totalPage}页`;
		bbs = `第${currentPage}页`;
		zongyeshu.innerHTML = bbss;
		dangqianye.innerHTML = bbs;
	})
}
// 模糊搜索
function searcha() {
	document.getElementsByClassName("fenye")[1].style.display = "block";
	document.getElementsByClassName("fenye")[0].style.display = "none";
	localStorage.setItem("currentPage", "1");
	var currentPage = localStorage.getItem("currentPage");
	var vagueName = document.getElementsByClassName("searchaa")[0].value;
	axios({
		url: 'http://8.131.77.167:8888/BBRoom/manage/findUser',
		method: 'post',
		async: false,
		xhrFields: {
			withCredentials: true // 允许跨域携带cookie信息
		},
		data: {
			currentPage: currentPage,
			vagueName: vagueName,
		},

	}).then(function(res) {
		bbb = "";
		console.log(res);
		if (Object.keys(res.data).length == 0) {
			console.log("hhhhh");
			var table = document.getElementById("tbodyy");
			table.innerHTML = bbb;
			var dangqianye = document.getElementsByClassName("dangqianye")[1];
			var zongyeshu = document.getElementsByClassName("zongyeshu")[1];
			localStorage.setItem("totalPage", "1");
			localStorage.setItem("currentPage", "1");
			bbss = `共1页`;
			bbs = `第1页`;
			zongyeshu.innerHTML = bbss;
			dangqianye.innerHTML = bbs;
		} else {
			for (i = 0; i < res.data.list.length; i++) {
				var sf;
				if (res.data.list[i].perms == "user") {
					sf = 1;
				}
				if (res.data.list[i].perms == "admin") {
					sf = 0;
				}
				bbb +=
					`<tr>
							<td class="userName"><strong>${res.data.list[i].email}</strong></td>
							<td>${res.data.list[i].sex}</td>
							<td>${res.data.list[i].profession}</td>
							<td>${res.data.list[i].perms}</td>
							<td>
								<button type="button" class="xg" id="${sf}renyuan${res.data.list[i].userId}" onclick="xiugaigai(this)"><span class="fa fa-eye"></span></button>
								<button type="button" class="sc" id="${sf}renyuan1${res.data.list[i].userId}" onclick="shanchuchu(this)"><span class="fa fa-times"></span></button>
								<button type="button" class="qx" id="${sf}renyuan2${res.data.list[i].userId}" onclick="quanxianxian(this)">修改权限</button>
							</td>
						</tr>`;


			}
			var table = document.getElementById("tbodyy");
			table.innerHTML = bbb;
			var dangqianye = document.getElementsByClassName("dangqianye")[1];
			var currentPage = localStorage.getItem("currentPage");
			var totalPage = res.data.totalPage;
			var zongyeshu = document.getElementsByClassName("zongyeshu")[1];
			localStorage.setItem("totalPage", totalPage);
			bbss = `共${totalPage}页`;
			bbs = `第${currentPage}页`;
			zongyeshu.innerHTML = bbss;
			dangqianye.innerHTML = bbs;

		}
	})
}
// 查看信息
function xiugaigai(e) {
	var id = e.id
	var sff = id.slice(0, 1);
	console.log(sff);
	var idd = id.slice(8);
	localStorage.setItem("caozuo", idd);
	var caozuo = localStorage.getItem("caozuo");
	console.log(idd);
	axios({
		url: 'http://8.131.77.167:8888/BBRoom/manage/findUserById',
		method: 'post',
		async: false,
		xhrFields: {
			withCredentials: true // 允许跨域携带cookie信息
		},
		data: {
			userId: caozuo,
		},

	}).then(function(res) {
		document.getElementsByClassName("zhezhao")[5].style.display = "block";
		var zhezhaola = document.getElementsByClassName("zhezhao")[5];
		lll =
			`			<div class="xiugaimima">
				<div class="xiugaimima1">
					查看信息
				</div>
				<div class="xx">
					<label>邮箱</label>
					<div class="">
						<input type="" value="${res.data.email}" disabled="">
					</div>
					<div class="clear">
					
					</div>
				</div>
				<div class="xx">
					<label>昵称</label>
					<div class="">
						<input type=""  value="${res.data.username}" disabled="">
					</div>
					<div class="clear">
					
					</div>
				</div>
				<div class="xx" id="xxz">
					<label>性别</label>
					<div class="">
						<input type="" value="${res.data.sex}" disabled="" >
					</div>
					<div class="clear">
					
					</div>
				</div>
				<div class="xx" id="xxz">
					<label>职业</label>
					<div class="">
						<input type="" value="${res.data.profession}" disabled="" >
					</div>
					<div class="clear">
					
					</div>
				</div>
				<div class="xiugaimima2">
					<div class="close" onclick="hide6()">
						关闭
					</div>
					<div class="clear">
						
					</div>
				</div>
			</div>`;
		console.log(lll);
		zhezhaola.innerHTML = lll;
	})
}
// 删除人员
function shanchuchu(e) {
	document.getElementsByClassName("zhezhao")[2].style.display = "block";
	var id = e.id
	var sff = id.slice(0, 1);
	console.log(sff);
	var idd = id.slice(9);
	localStorage.setItem("caozuo", idd);
	console.log(idd);

}


function quanxianxian(e) {
	var id = e.id
	var sff = id.slice(0, 1);
	if (sff == 1) {
		document.getElementsByClassName("zhezhao")[3].style.display = "block";
	} else {
		document.getElementsByClassName("zhezhao")[4].style.display = "block";
	}
	console.log(sff);
	var idd = id.slice(9);
	localStorage.setItem("caozuo", idd);
	console.log(idd);

}

function haolei() {
	var caozuo = localStorage.getItem("caozuo");
	axios({
		url: 'http://8.131.77.167:8888/BBRoom/manage/deleteUser',
		method: 'post',
		async: false,
		xhrFields: {
			withCredentials: true // 允许跨域携带cookie信息
		},
		data: {
			userId: caozuo,
		},

	}).then(function(res) {
		document.getElementsByClassName("zhezhao")[2].style.display = "none";
		alert("删除成功");
		location.reload();
	})
}

function haolei1() {
	var caozuo = localStorage.getItem("caozuo");
	axios({
		url: 'http://8.131.77.167:8888/BBRoom/manage/updatePerms',
		method: 'post',
		async: false,
		xhrFields: {
			withCredentials: true // 允许跨域携带cookie信息
		},
		data: {
			userId: caozuo,
		},

	}).then(function(res) {
		document.getElementsByClassName("zhezhao")[3].style.display = "none";
		document.getElementsByClassName("zhezhao")[4].style.display = "none";
		alert("修改成功");
		location.reload();
	})

}
// 输入页数跳转
function shuruys() {
	var yeshu = document.getElementById("shuruyeshu").value;
	var zongzong = localStorage.getItem("totalPage");
	if (yeshu > 0 && yeshu <= zongzong) {
		localStorage.setItem("currentPage", yeshu);
	} else {
		alert("请输入合法的数字")
	}
	var currentPage = localStorage.getItem("currentPage");
	axios({
		url: 'http://8.131.77.167:8888/BBRoom/manage/findAllUser',
		method: 'post',
		async: false,
		xhrFields: {
			withCredentials: true // 允许跨域携带cookie信息
		},
		data: {
			currentPage: currentPage,
		},

	}).then(function(res) {
		bbb = "";
		console.log(res);
		for (i = 0; i < res.data.list.length; i++) {
			var sf;
			if (res.data.list[i].perms == "user") {
				sf = 1;
			}
			if (res.data.list[i].perms == "admin") {
				sf = 0;
			}
			bbb +=
				`<tr>
								<td class="userName"><strong>${res.data.list[i].email}</strong></td>
								<td>${res.data.list[i].sex}</td>
								<td>${res.data.list[i].profession}</td>
								<td>${res.data.list[i].perms}</td>
								<td>
									<button type="button" class="xg" id="${sf}renyuan${res.data.list[i].userId}" onclick="xiugaigai(this)"><span class="fa fa-eye"></span></button>
									<button type="button" class="sc" id="${sf}renyuan1${res.data.list[i].userId}" onclick="shanchuchu(this)"><span class="fa fa-times"></span></button>
									<button type="button" class="qx" id="${sf}renyuan2${res.data.list[i].userId}" onclick="quanxianxian(this)">修改权限</button>
								</td>
							</tr>`;


		}
		var table = document.getElementById("tbodyy");
		table.innerHTML = bbb;
		var dangqianye = document.getElementsByClassName("dangqianye")[0];
		var currentPage = localStorage.getItem("currentPage");
		var totalPage = res.data.totalPage;
		var zongyeshu = document.getElementsByClassName("zongyeshu")[0];
		localStorage.setItem("totalPage", totalPage);
		bbss = `共${totalPage}页`;
		bbs = `第${currentPage}页`;
		zongyeshu.innerHTML = bbss;
		dangqianye.innerHTML = bbs;
	})
}
// =======================================================================================================================
// 跳转到第一页
function diyiye1() {
	var vagueName = document.getElementsByClassName("searchaa")[0].value;
	localStorage.setItem("currentPage", "1");
	var currentPage = localStorage.getItem("currentPage");
	axios({
		url: 'http://8.131.77.167:8888/BBRoom/manage/findUser',
		method: 'post',
		async: false,
		xhrFields: {
			withCredentials: true // 允许跨域携带cookie信息
		},
		data: {
			currentPage: currentPage,
			vagueName: vagueName,
		},

	}).then(function(res) {
		var totalCount = res.data.totalCount;
		localStorage.setItem("totalCount", totalCount);
		bbb = "";
		console.log(res);
		for (i = 0; i < res.data.list.length; i++) {
			var sf;
			if (res.data.list[i].perms == "user") {
				sf = 1;
			}
			if (res.data.list[i].perms == "admin") {
				sf = 0;
			}
			bbb +=
				`<tr>
								<td class="userName"><strong>${res.data.list[i].email}</strong></td>
								<td>${res.data.list[i].sex}</td>
								<td>${res.data.list[i].profession}</td>
								<td>${res.data.list[i].perms}</td>
								<td>
									<button type="button" class="xg" id="${sf}renyuan${res.data.list[i].userId}" onclick="xiugaigai(this)"><span class="fa fa-eye"></span></button>
									<button type="button" class="sc" id="${sf}renyuan1${res.data.list[i].userId}" onclick="shanchuchu(this)"><span class="fa fa-times"></span></button>
									<button type="button" class="qx" id="${sf}renyuan2${res.data.list[i].userId}" onclick="quanxianxian(this)">修改权限</button>
								</td>
							</tr>`;

		}
		var table = document.getElementById("tbodyy");
		table.innerHTML = bbb;
		var dangqianye = document.getElementsByClassName("dangqianye")[1];
		var currentPage = localStorage.getItem("currentPage");
		var totalPage = res.data.totalPage;
		var zongyeshu = document.getElementsByClassName("zongyeshu")[1];
		localStorage.setItem("totalPage", totalPage);
		bbss = `共${totalPage}页`;
		bbs = `第${currentPage}页`;
		zongyeshu.innerHTML = bbss;
		dangqianye.innerHTML = bbs;
	})
}
// 跳转到最后一页
function zuihouyiye1() {
	var vagueName = document.getElementsByClassName("searchaa")[0].value;
	var totalPage = localStorage.getItem("totalPage");
	localStorage.setItem("currentPage", totalPage);
	var currentPage = localStorage.getItem("currentPage");
	axios({
		url: 'http://8.131.77.167:8888/BBRoom/manage/findUser',
		method: 'post',
		async: false,
		xhrFields: {
			withCredentials: true // 允许跨域携带cookie信息
		},
		data: {
			currentPage: currentPage,
			vagueName: vagueName,
		},

	}).then(function(res) {
		bbb = "";
		console.log(res);
		for (i = 0; i < res.data.list.length; i++) {
			var sf;
			if (res.data.list[i].perms == "user") {
				sf = 1;
			}
			if (res.data.list[i].perms == "admin") {
				sf = 0;
			}
			bbb +=
				`<tr>
								<td class="userName"><strong>${res.data.list[i].email}</strong></td>
								<td>${res.data.list[i].sex}</td>
								<td>${res.data.list[i].profession}</td>
								<td>${res.data.list[i].perms}</td>
								<td>
									<button type="button" class="xg" id="${sf}renyuan${res.data.list[i].userId}" onclick="xiugaigai(this)"><span class="fa fa-eye"></span></button>
									<button type="button" class="sc" id="${sf}renyuan1${res.data.list[i].userId}" onclick="shanchuchu(this)"><span class="fa fa-times"></span></button>
									<button type="button" class="qx" id="${sf}renyuan2${res.data.list[i].userId}" onclick="quanxianxian(this)">修改权限</button>
								</td>
							</tr>`;


		}
		var table = document.getElementById("tbodyy");
		table.innerHTML = bbb;
		var dangqianye = document.getElementsByClassName("dangqianye")[1];
		var currentPage = localStorage.getItem("currentPage");
		var totalPage = res.data.totalPage;
		var zongyeshu = document.getElementsByClassName("zongyeshu")[1];
		localStorage.setItem("totalPage", totalPage);
		bbss = `共${totalPage}页`;
		bbs = `第${currentPage}页`;
		zongyeshu.innerHTML = bbss;
		dangqianye.innerHTML = bbs;
	})
}
// 上一页
function shangyiye1() {
	var vagueName = document.getElementsByClassName("searchaa")[0].value;
	var currentPage = localStorage.getItem("currentPage") - 1;
	if (currentPage == 0) {
		currentPage = Number(currentPage) + 1;
	} else {
		localStorage.setItem("currentPage", currentPage);
	}
	axios({
		url: 'http://8.131.77.167:8888/BBRoom/manage/findUser',
		method: 'post',
		async: false,
		xhrFields: {
			withCredentials: true // 允许跨域携带cookie信息
		},
		data: {
			currentPage: currentPage,
			vagueName: vagueName,
		},

	}).then(function(res) {
		bbb = "";
		console.log(res);
		for (i = 0; i < res.data.list.length; i++) {
			var sf;
			if (res.data.list[i].perms == "user") {
				sf = 1;
			}
			if (res.data.list[i].perms == "admin") {
				sf = 0;
			}
			bbb +=
				`<tr>
								<td class="userName"><strong>${res.data.list[i].email}</strong></td>
								<td>${res.data.list[i].sex}</td>
								<td>${res.data.list[i].profession}</td>
								<td>${res.data.list[i].perms}</td>
								<td>
									<button type="button" class="xg" id="${sf}renyuan${res.data.list[i].userId}" onclick="xiugaigai(this)"><span class="fa fa-eye"></span></button>
									<button type="button" class="sc" id="${sf}renyuan1${res.data.list[i].userId}" onclick="shanchuchu(this)"><span class="fa fa-times"></span></button>
									<button type="button" class="qx" id="${sf}renyuan2${res.data.list[i].userId}" onclick="quanxianxian(this)">修改权限</button>
								</td>
							</tr>`;


		}
		var table = document.getElementById("tbodyy");
		table.innerHTML = bbb;
		var dangqianye = document.getElementsByClassName("dangqianye")[1];
		var currentPage = localStorage.getItem("currentPage");
		var totalPage = res.data.totalPage;
		var zongyeshu = document.getElementsByClassName("zongyeshu")[1];
		localStorage.setItem("totalPage", totalPage);
		bbss = `共${totalPage}页`;
		bbs = `第${currentPage}页`;
		zongyeshu.innerHTML = bbss;
		dangqianye.innerHTML = bbs;
	})
}
// 下一页
function xiayiye1() {
	var vagueName = document.getElementsByClassName("searchaa")[0].value;
	var totalPage = localStorage.getItem("totalPage");
	var currentPage = localStorage.getItem("currentPage");
	if (currentPage < totalPage) {
		console.log(currentPage);
		console.log(totalPage);
		currentPage = Number(currentPage) + 1;
		localStorage.setItem("currentPage", currentPage);
	}
	axios({
		url: 'http://8.131.77.167:8888/BBRoom/manage/findUser',
		method: 'post',
		async: false,
		xhrFields: {
			withCredentials: true // 允许跨域携带cookie信息
		},
		data: {
			currentPage: currentPage,
			vagueName: vagueName,
		},

	}).then(function(res) {
		bbb = "";
		console.log(res);
		for (i = 0; i < res.data.list.length; i++) {
			var sf;
			if (res.data.list[i].perms == "user") {
				sf = 1;
			}
			if (res.data.list[i].perms == "admin") {
				sf = 0;
			}
			bbb +=
				`<tr>
							<td class="userName"><strong>${res.data.list[i].email}</strong></td>
							<td>${res.data.list[i].sex}</td>
							<td>${res.data.list[i].profession}</td>
							<td>${res.data.list[i].perms}</td>
							<td>
								<button type="button" class="xg" id="${sf}renyuan${res.data.list[i].userId}" onclick="xiugaigai(this)"><span class="fa fa-eye"></span></button>
								<button type="button" class="sc" id="${sf}renyuan1${res.data.list[i].userId}" onclick="shanchuchu(this)"><span class="fa fa-times"></span></button>
								<button type="button" class="qx" id="${sf}renyuan2${res.data.list[i].userId}" onclick="quanxianxian(this)">修改权限</button>
							</td>
						</tr>`;



		}
		var table = document.getElementById("tbodyy");
		table.innerHTML = bbb;
		var dangqianye = document.getElementsByClassName("dangqianye")[1];
		var currentPage = localStorage.getItem("currentPage");
		var totalPage = res.data.totalPage;
		var zongyeshu = document.getElementsByClassName("zongyeshu")[1];
		localStorage.setItem("totalPage", totalPage);
		bbss = `共${totalPage}页`;
		bbs = `第${currentPage}页`;
		zongyeshu.innerHTML = bbss;
		dangqianye.innerHTML = bbs;
	})
}
// 输入页数跳转
function shuruys1() {
	var vagueName = document.getElementsByClassName("searchaa")[0].value;
	var yeshu = document.getElementById("shuruyeshu1").value;
	var zongzong = localStorage.getItem("totalPage");
	if (yeshu > 0 && yeshu <= zongzong) {
		localStorage.setItem("currentPage", yeshu);
	} else {
		alert("请输入合法的数字")
	}
	var currentPage = localStorage.getItem("currentPage");
	axios({
		url: 'http://8.131.77.167:8888/BBRoom/manage/findAllUser',
		method: 'post',
		async: false,
		xhrFields: {
			withCredentials: true // 允许跨域携带cookie信息
		},
		data: {
			currentPage: currentPage,
			vagueName: vagueName,
		},

	}).then(function(res) {
		bbb = "";
		console.log(res);
		for (i = 0; i < res.data.list.length; i++) {
			var sf;
			if (res.data.list[i].perms == "user") {
				sf = 1;
			}
			if (res.data.list[i].perms == "admin") {
				sf = 0;
			}
			bbb +=
				`<tr>
								<td class="userName"><strong>${res.data.list[i].email}</strong></td>
								<td>${res.data.list[i].sex}</td>
								<td>${res.data.list[i].profession}</td>
								<td>${res.data.list[i].perms}</td>
								<td>
									<button type="button" class="xg" id="${sf}renyuan${res.data.list[i].userId}" onclick="xiugaigai(this)"><span class="fa fa-eye"></span></button>
									<button type="button" class="sc" id="${sf}renyuan1${res.data.list[i].userId}" onclick="shanchuchu(this)"><span class="fa fa-times"></span></button>
									<button type="button" class="qx" id="${sf}renyuan2${res.data.list[i].userId}" onclick="quanxianxian(this)">修改权限</button>
								</td>
							</tr>`;


		}
		var table = document.getElementById("tbodyy");
		table.innerHTML = bbb;
		var dangqianye = document.getElementsByClassName("dangqianye")[1];
		var currentPage = localStorage.getItem("currentPage");
		var totalPage = res.data.totalPage;
		var zongyeshu = document.getElementsByClassName("zongyeshu")[1];
		localStorage.setItem("totalPage", totalPage);
		bbss = `共${totalPage}页`;
		bbs = `第${currentPage}页`;
		zongyeshu.innerHTML = bbss;
		dangqianye.innerHTML = bbs;
	})
}
