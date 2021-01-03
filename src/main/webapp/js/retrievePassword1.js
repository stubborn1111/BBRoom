axios.defaults.withCredentials = true;

function tiaozhuan() {
	window.location.href = '../pages/login.html';
}

function fayoujian() {
	var email = document.getElementById('email').value;
	var rule = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	if (!rule.test(email)) {
		alert("邮箱格式错误");
	} else {
		axios({
			url: 'http://8.131.77.167:8888/BBRoom/user/emailExist',
			method: 'post',
			async: false,
			xhrFields: {
				withCredentials: true // 允许跨域携带cookie信息
			},
			data: {
				email: email,
			},
		}).then(function(res) {
			console.log(res);
			if (res.data.exist == "no") {
				alert("此邮箱未注册");
			} else {
				axios({
					url: 'http://8.131.77.167:8888/BBRoom/user/sendMail',
					method: 'post',
					async: false,
					xhrFields: {
						withCredentials: true // 允许跨域携带cookie信息
					},
					data: {
						email: email,
					},

				}).then(function(res) {
					if (res.data.emailExist == "yes") {
						alert("验证码已发送，请输入验证码验证");
					}
				})
			}
		})
	}
}

function next() {
	var email = document.getElementById('email').value;
	var emailCode = document.getElementById('verIn').value;
	axios({
		url: 'http://8.131.77.167:8888/BBRoom/user/checkMail',
		method: 'post',
		async: false,
		xhrFields: {
			withCredentials: true // 允许跨域携带cookie信息
		},
		data: {
			email: email,
			emailCode: emailCode,
		},

	}).then(function(res) {
		if (res.data.flag == "no") {
			alert("验证码错误");
		}
		if (res.data.flag == "yes") {
			alert("验证码成功");
			window.location.href = '../pages/retrievePassword_2.html';
		}
	})
}
