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
	interval = setInterval(()=>{
		document.getElementById('sideImg').onload = function(){
			document.getElementById("loading").style.display = "none";
			document.getElementById("loginPage").style.display = "block";
			clearInterval(interval);
			interval = 0;
		};
	},2000);
	setTimeout(()=>{
		if(interval!=0){
			document.getElementById("loading").style.display = "none";
			document.getElementById("loginPage").style.display = "block";
			clearInterval(interval);
		}
	},4000);
	setTimeout(() => {
        document.querySelector('.loader').classList.add('restart-animation');
        setTimeout(() => {
            document.querySelector('.loader').classList.remove('restart-animation');
        }, 500);
    }, 3000);
    getCaptch("mainCaptcha");
	document.getElementById("privacyData").innerHTML = legalCall("Privacy Policy");
	document.getElementById("licenseData").innerHTML = legalCall("License");
	if(window.location.protocol!="file:"||window.location.hostname!=""){
		StartBackend();
	}
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
function login(email,password,captchaIn,captchaOut){
	if(adminBin.length!=0){
		if(document.getElementById(email).value!=''&&document.getElementById(password).value!=''&&document.getElementById(captchaOut).value!=''){
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
		}else{
			voiceOver("Sorry, but your filed data in login form is not completed, please check once.")
		}
	}else{
		voiceOver("Please make your account first!,then login");
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
	document.getElementById(id).type = "password";
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
		document.getElementById('submitId').textContent = idMaker(3);
		document.getElementById('submitPassword').textContent = document.getElementById(cpass).value;
		document.getElementById('submitColor').textContent = document.getElementById(color).value;
		try{
			/*validateAdminEntry(
				document.getElementById(name).value,
				document.getElementById(gender).value,
				document.getElementById(email).value,
				document.getElementById(position).value,
				[document.getElementById(start).value,document.getElementById(end).value],
				document.getElementById(color).value,
				document.getElementById(pass).value
			);*/
			setTimeout(()=>{
				if(adminBin.length==0){
					voiceOver("Sorry, your account making is not possible,for unwanted data");
				}else{
					blbg('signupPage',1);
					blbg('successSignUp',0);
				}
			},500);
		}catch(e){
			voiceOver("An error occure to make your account, sorry");
			console.error(e);
		}
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
		redFiled([name,gender,email,position,start,end,pass,cpass,color]);
		voiceOver("Sorry, but your filed data in signup form is not completed, please check once.");
	}
}
function redFiled(list){
	for(let i=0; i<list.length; i++){
		if(document.getElementById(list[i]).value==''||document.getElementById(list[i]).value==undefined){
			document.getElementById(list[i]).style.border='3px solid #dc3545';
		}
	}
}
function userIdEmailCheck(id){
	if(document.getElementById(id).value!=''){
		if(validateUserEmail(document.getElementById(id).value)||validateUserId(document.getElementById(id).value)){
			document.getElementById(id).style.border='3px solid #28a745';
		}else{
			document.getElementById(id).style.border='3px solid #dc3545';
		}
	}else{
		document.getElementById(id).style.border='1px solid #ced4da';
	}
}
function submitForgot(name,gender,email,color){
	if(adminBin.length!=0){
		if(	
			validateUserName(document.getElementById(name).value) &&
			validateSelect(document.getElementById(gender).value) &&
			(validateUserEmail(document.getElementById(email).value)||validateUserId(document.getElementById(email).value))
		){
			for(let i=0; i<adminBin.length; i++){
				if((adminBin[i].name==name)&&(adminBin[i].gender==gender)&&((adminBin[i].userid==email)||(adminBin[i].email==email))&&(adminBin[i].color==color)){
					voiceOver("I found your account, congratulation");
					return true;
				}
				voiceOver("Sorry, i am not found your account");
			}
		}else{
			redFiled([name,gender,email,color]);
			voiceOver("Sorry, but your filed data in forgot form is not completed, please check once.");
		}
	}else{
		voiceOver("Sorry at first make your account then use this feature, if required.");
	}
}
function defaultPassword(id){
	document.getElementById(id).value = passwordMaker();
	document.getElementById(id).type = "text";
}