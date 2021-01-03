axios.defaults.withCredentials = true;
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
			if (res.data.exist == "yes") {
				alert("此邮箱已注册");
			}
			else {
				console.log("123");
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
					if (res.data.emailExist == "no") {
						alert("邮箱有效，验证码已发送");
					}
					if (res.data.emailExist == "yes") {
						alert("此邮箱已注册过");
					}
				})
			}
		})
	}
}

function next() {
	var email = document.getElementById('email').value;
	var emailCode = document.getElementById('verIn').value;
	var rule1 = /^[a-zA-Z]\w{5,10}$/;
	localStorage.setItem("lastname", email);
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
			alert("验证码正确");
			window.location.href = '../pages/register_2.html';
		}
	})
}
