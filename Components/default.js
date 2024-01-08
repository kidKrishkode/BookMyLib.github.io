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
	// try{getLocalData(document.body.id);}catch(e){console.error(e);}
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
function loginNameCheck(id){
	if(document.getElementById(id).value!=''){
		if(validateUserName(document.getElementById(id).value)){
			document.getElementById(id).style.border='3px solid #28a745';
		}else{
			document.getElementById(id).style.border='3px solid #dc3545';
		}
	}else{
		document.getElementById(id).style.border='1px solid #ced4da';
	}
}
function loginEmailCheck(id){
	if(document.getElementById(id).value!=''){
		if(validateUserEmail(document.getElementById(id).value)){
			document.getElementById(id).style.border='3px solid #28a745';
		}else{
			document.getElementById(id).style.border='3px solid #dc3545';
		}
	}else{
		document.getElementById(id).style.border='1px solid #ced4da';
	}
}
function loginPasswordCheck(id){
	if(document.getElementById(id).value!=''){
		if(validatePassword(document.getElementById(id).value)){
			document.getElementById(id).style.border='3px solid #28a745';
		}else{
			document.getElementById(id).style.border='3px solid #dc3545';
		}
	}else{
		document.getElementById(id).style.border='1px solid #ced4da';
	}
}
function loginCPasswordCheck(id1,id2){
	if(document.getElementById(id1).value!=''&&document.getElementById(id2).value!=''){
		if(checkPassword(id1,id2)){
			document.getElementById(id2).style.border='3px solid #28a745';
		}else{
			document.getElementById(id2).style.border='3px solid #dc3545';
		}
	}else{
		document.getElementById(id2).style.border='1px solid #ced4da';
	}
}
function loginSelectionCheck(id){
	if(validateSelect(document.getElementById(id).value)){
		document.getElementById(id).style.border='3px solid #28a745';
	}else{
		document.getElementById(id).style.border='3px solid #dc3545';
	}
}
function loginJoinCheck(id){
	if(document.getElementById(id).value!=''){
		if(validateDate(document.getElementById(id).value)){
			document.getElementById(id).style.border='3px solid #28a745';
		}else{
			document.getElementById(id).style.border='3px solid #dc3545';
		}
	}else{
		document.getElementById(id).style.border='1px solid #ced4da';
	}
}
function loginEndingCheck(id1,id2){
	if(document.getElementById(id2).value!=''){
		if(validateDate(document.getElementById(id2).value)&&validateDateEnding(document.getElementById(id1).value,document.getElementById(id2).value)){
			document.getElementById(id2).style.border='3px solid #28a745';
		}else{
			document.getElementById(id2).style.border='3px solid #dc3545';
		}
	}else{
		document.getElementById(id2).style.border='1px solid #ced4da';
	}
}
function loginColorCheck(id){
	if(document.getElementById(id).value!=''){
		document.getElementById(id).style.border='3px solid #28a745';
	}else{
		document.getElementById(id).style.border='3px solid #dc3545';
	}
}
function submitSignUP(name,gender,email,position,start,end,pass,cpass,color){
	if(
		validateUserName(document.getElementById(name).value) &&
		validateSelect(document.getElementById(gender).value) &&
		validateUserEmail(document.getElementById(email).value) &&
		validateSelect(document.getElementById(position).value) &&
		validateDate(document.getElementById(start).value) &&
		validateDateEnding(document.getElementById(start).value,document.getElementById(end).value) &&
		validatePassword(document.getElementById(pass).value) &&
		checkPassword(pass,cpass)
	){
		blbg('signupPage',1);
		blbg('successLogin',0);
	}else{
		loginNameCheck(name);
		loginSelectionCheck(gender);
		loginEmailCheck(email);
		loginSelectionCheck(position);
		loginJoinCheck(start);
		loginEndingCheck(start,end);
		loginPasswordCheck(pass);
		loginCPasswordCheck(pass,cpass);
		loginColorCheck(color);
		voiceOver("Sorry, but your filed data in signup form is not correct, please check once.");
	}
}