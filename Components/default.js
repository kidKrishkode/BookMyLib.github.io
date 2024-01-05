let interval;
const inputs = document.querySelectorAll(".input");
function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}
function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}
inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});
function user(){
	setTimeout(()=>{
		document.getElementById("loading").style.display = "none";
		document.getElementById("loginPage").style.display = "block";
	},3000);
	// interval = setInterval(()=>{
	// 	document.getElementById('sideImg').onload = function(){
	// 		document.getElementById("loading").style.display = "none";
	// 		document.getElementById("loginPage").style.display = "block";
	// 		clearInterval(interval);
	// 	};
	// 	console.log('1');
	// },3000);
	setTimeout(() => {
        document.querySelector('.loader').classList.add('restart-animation');
        setTimeout(() => {
            document.querySelector('.loader').classList.remove('restart-animation');
        }, 500);
    }, 3000);
    getCaptch("mainCaptcha");
}
function newCaptcha(){
	getCaptch("mainCaptcha");
	let spin = document.getElementById('spiner');
	if(!spin.classList.contains('animatedSpine')){
		spin.classList.add('animatedSpine');
		spin.addEventListener('animationend',()=>{
			spin.classList.remove('animatedSpine');
		},{once: true});
	}
}
function signupOn(){
	blbg("signupPage",0);
}
function blbg(id,value){
	if(value==0){
		document.getElementById('blbg').style.display = 'block';
		document.getElementById(id).style.display="block";
	}else{
		document.getElementById('blbg').style.display = 'none';
		document.getElementById(id).style.display="none";
	}
}
function submitSignUP(){
	blbg('successLogin',0);
}
function forgotOn(){
	blbg('forgotPassword',0);
}
function forgotOff(){
	blbg('forgotPassword',1);
}
function submitForgot(){
	// blbg('privacyPage',0);
}
function login(email,password,captchaIn,captchaOut){
	if(authentication(validUser(email,password), checkCaptch(captchaIn,captchaOut))){
		voiceOver("Your details is right, but i am not intersted to give access to your login");
	}else{
		if(!validUser(email,password)){
			voiceOver("Your given userid and password is not vaild!,please write the correct one");
		}
		if(!checkCaptch(captchaIn,captchaOut)){
			voiceOver("Your given captcha is wrong, write this correctly.");
		}
		if(loginError>3){
			voiceOver("Sorry but you are loged more then one time so i am not trust you.");
		}
	}
}