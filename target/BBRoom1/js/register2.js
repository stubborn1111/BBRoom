axios.defaults.withCredentials = true;
function next(){
	var password = document.getElementById('password').value;
	var password1 = document.getElementById('password1').value;
	var rule1 = /^[a-zA-Z]\w{5,10}$/;
	if (!rule1.test(password)) {
		alert("密码格式错误，请输入以字母开头的6~10位密码");
	}
	else{
		if(password==password1){
			var email = localStorage.getItem("lastname");
			axios({
					url: 'http://8.131.77.167:8888/BBRoom/user/register',
					method: 'post',
					async: false,
					xhrFields: {
						withCredentials: true // 允许跨域携带cookie信息
					},
					data: {
						password: password,
						email: email,
					},
			
				}).then(function(res) {
					alert("注册成功");
					window.location.href = '../pages/login.html';
					console.log(res);
				})
		}
		else{
			alert("两次输入的密码不同");
		}
	}
}