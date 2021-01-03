axios.defaults.withCredentials = true;
function denglu(){
	var email= document.getElementById('email').value;
	var password= document.getElementById('password').value;
	axios({
		url: 'http://8.131.77.167:8888/BBRoom/user/login',
		method: 'post',
		xhrFields: {
			withCredentials: true // 允许跨域携带cookie信息
		},
		data: {
			email: email,
			password: password,
		},
	
	}).then(function(res) {
		if(res.data.code=="0"){
			alert("用户不存在");
		}
		if(res.data.code=="1"){
			// alert("您的账户存在安全问题，请重新设置密码");
			document.getElementsByClassName("zhezhao")[0].style.display = "block";
		}
		if(res.data.code=="3"){
			alert("密码正确，成功登陆");
			window.location.href = '../pages/bbRoom.html';
			
		}
		if(res.data.code=="4"){
			alert("密码错误");
			
		}
	})
}
// 安全问题
function hide1() {
	document.getElementsByClassName("zhezhao")[0].style.display = "none";
}
function anquan(){
	window.location.href = '../pages/resetPassword_1.html';
}