let interval;
let nav = 0;
let currentCalen = 0;
let currentProfileVision = 0;
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
	},1000);
	setTimeout(()=>{
		if(interval!=0){
			document.getElementById("loading").style.display = "none";
			document.getElementById("loginPage").style.display = "block";
			clearInterval(interval);
		}
		getCaptch("mainCaptcha");
	},2000);
	setTimeout(() => {
        document.querySelector('.loader').classList.add('restart-animation');
        setTimeout(() => {
            document.querySelector('.loader').classList.remove('restart-animation');
        }, 500);
    }, 3000);
	document.getElementById("privacyData").innerHTML = legalCall("Privacy Policy");
	document.getElementById("licenseData").innerHTML = legalCall("License");
	if(window.location.protocol!="file:"||window.location.hostname!=""||window.location.protocol=="https:"){
		StartBackend();
	}
	Bypass();
}
function newCaptcha(id1,id2){
	getCaptch(id1);
	let spin = document.getElementById(id2);
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
	//enterToMain(captchaIn);
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
function enterToMain(data){
	document.getElementById("loginPage").style.display = "none";
	document.getElementById("loading").style.display = "block";
	document.getElementById("eventId").innerText = document.getElementById(data).value;
	document.getElementById("navUserDp").src=getUserDp();
	interval = setInterval(()=>{
		document.getElementById('navUserDp').onload = function(){
			document.getElementById("loading").style.display = "none";
			document.getElementById("main").style.display = "block";
			clearInterval(interval);
			interval = 0;
		};
	},1000);
	setTimeout(()=>{
		if(interval!=0){
			document.getElementById("loading").style.display = "none";
			document.getElementById("main").style.display = "block";
			clearInterval(interval);
		}
		pageRoute('homeBtn');
	},2000);
}
function navToggle(){
	let x = window.matchMedia("(max-width: 900px)");
	if(x.matches){
		setTimeout(()=>{
			if(nav==0){
				document.querySelector(".sidenav").style.display = "block";
				document.querySelector(".sidenavFade").style.display = "block";
				unwantedCalenOff();
				nav=1;
			}else{
				document.querySelector(".sidenav").style.display = "none";
				document.querySelector(".sidenavFade").style.display = "none";
				nav=0
			}
		},500);
	}
}
function ChangeTheme(id){
	if(toggleTheme(id)){
		if(!getTheme()){
			voiceOver("Theme change not possible");
		}
	}
}
function toggleCalender(){
	if(currentCalen==0){
		document.getElementById("CalenderPage").style.display = "block";
		document.getElementById("calenderBody").innerHTML = getCalender();
		document.getElementById("calenderHead").innerText = getCalenderTime();
		unwantedNavOff();
		dropdownMenu('aboutMenu',1);
		currentCalen=1;
	}else{
		document.getElementById("CalenderPage").style.display = "none";
		currentCalen=0;
	}
}
function previousMonth(){
	temp = getPrevMonth();
	if(temp!=null){
		document.getElementById("calenderBody").innerHTML = temp;
		document.getElementById("calenderHead").innerText = getCalenderTime();
	}else{
		document.getElementById("calenderBody").innerHTML = "&times; No reponse come for this defected request!";
		voiceOver("Sorry, Calender not support this request!");
	}
	unwantedNavOff();
	dropdownMenu('aboutMenu',1);
}
function NextMonth(){
	temp = getNextMonth();
	if(temp!=null){
		document.getElementById("calenderBody").innerHTML = temp;
		document.getElementById("calenderHead").innerText = getCalenderTime();
	}else{
		document.getElementById("calenderBody").innerHTML = "&times; No reponse come for this defected request!";
		voiceOver("Sorry, Calender not support this request!");
	}
	unwantedNavOff();
	dropdownMenu('aboutMenu',1);
}
function unwantedNavOff(){
	if(nav==1){
		navToggle();
	}
}
function unwantedCalenOff(){
	if(currentCalen==1){
		toggleCalender();
	}
}
function viewPrivateProfile(id){
	unwantedCalenOff();
	unwantedNavOff();
	dropdownMenu('aboutMenu',1);
	if(currentProfileVision==0){
		authRecheck(0,`varlidateViewPrivateProfile('${id}')`);
	}else{
		voiceOver("Request accepted, Private profile is open!");
		togglePrivateProfile(id);
	}
}
function varlidateViewPrivateProfile(id){
	if(crossProfileCheck()&&currentUser!=0){
		voiceOver("Request accepted, Private profile is open!");
		authRecheck(1);
		togglePrivateProfile(id);
	}else{
		voiceOver("Sorry, But your given details is not matched");
	}
}
function crossProfileCheck(){
	if(
		document.getElementById('recipient-pass').value == currentUser.password &&
		document.getElementById('recipient-captcha-in').value == document.getElementById('recipient-captcha-out').value
	){
		document.getElementById('recipient-pass').style.border = "2px solid #28a745";
		document.getElementById('recipient-captcha-out').style.border = "2px solid #28a745";
		return true;
	}else{
		document.getElementById('recipient-pass').style.border = "2px solid #dc3545";
		document.getElementById('recipient-captcha-out').style.border = "2px solid #dc3545";
		return false;
	}
}
function togglePrivateProfile(id){
	if(currentProfileVision==0){
		document.getElementById(id).className = "btn btn-danger reset";
		document.getElementById(id).innerHTML = "<i class='fa fa-eye-slash'></i> Close Private Profile";
		document.getElementById(id).title = "Close private profile";
		document.querySelector(".hiddenProfile").style.display = "block";
		currentProfileVision=1;
	}else{
		document.getElementById(id).className = "btn btn-success reset";
		document.getElementById(id).innerHTML = "<i class='fa fa-eye'></i> View Private Profile";
		document.getElementById(id).title = "Preview private profile";
		document.querySelector(".hiddenProfile").style.display = "none";
		currentProfileVision=0;
	}
}
function profileSetUp(){
	if(currentUser!=0&&instBin.length!=0){
		temp = [
			'prev-profile-userId',
			'prev-profile-password',
			'prev-profile-img',
			'prev-profile-name',
			'prev-profile-position',
			'prev-profile-email',
			['prev-profile-year-start','prev-profile-year-end'],
			'prev-profile-gender',
			'prev-profile-color',//0 to 8, 1 to 9
			'prev-profile-roll',
			'prev-profile-inst',
			'prev-profile-branch',
			'prev-profile-address',
			'prev-profile-contact',
			'prev-profile-estd'
		];
		let j=0;
		for(const value of Object.values(currentUser)){
			if(j==2){
				document.getElementById(temp[j]).src = value;
			}else if(j==6){
				document.getElementById(temp[6][0]).value = value[0];
				document.getElementById(temp[6][1]).value = value[1];
				document.getElementById(temp[6][0]).style.border = "1px solid #ced4da";
				document.getElementById(temp[6][1]).style.border = "1px solid #ced4da";
			}else if(j==10){
				//History 
			}else{
				document.getElementById(temp[j]).value = value;
				document.getElementById(temp[j]).style.border = "1px solid #ced4da";
			}
			j++;
		}
		j=10;
		for(const value of Object.values(instBin[0])){
			document.getElementById(temp[j]).value=value;
			j++;
		}
	}else{
		voiceOver("Sorry, your details not founded");
	}
}
function editProfile(){
	unwantedCalenOff();
	unwantedNavOff();
	dropdownMenu('aboutMenu',1);
	authRecheck(0,'varlidateEditProfile()');
}
function varlidateEditProfile(){
	if(crossProfileCheck()&&currentUser!=0){
		voiceOver("Request accepted, Edit mode is on now!");
		authRecheck(1);
		togglePrivateProfile('privateProfileBtn');
		toggleProfileMode(0);
		document.querySelector(".rec-btn").innerHTML = 
		`<button class="btn btn-success reset" onclick="voiceOver();" title="Save the profile information" id="editProfileBtn" data-toggle="modal" data-target="#authenticateModal" data-whatever="@"><i class="fa fa-upload"></i> Save Change</button>
		<button class="btn btn-danger reset" onclick="discardProfileChange();" id="privateProfileBtn" title="Cancel all changes"><i class="fa fa-times"></i> Discard Changes</button>`;
	}else{
		voiceOver("Sorry, But your given details is not matched");
	}
}
function toggleProfileMode(data){
	temp = [
		'prev-profile-password',
		'prev-profile-name',
		'prev-profile-position',
		'prev-profile-email',
		'prev-profile-year-start',
		'prev-profile-year-end',
		'prev-profile-gender',
		'prev-profile-color',
		'prev-profile-inst',
		'prev-profile-branch',
		'prev-profile-address',
		'prev-profile-contact',
		'prev-profile-estd'
	];
	if(data==0){
		for(let i=0; i<temp.length; i++){
			if(i>=(temp.length-5)){
				if(currentUser.roll=='Super Admin'){
					document.getElementById(temp[i]).readOnly=false;
				}else{
					document.getElementById(temp[i]).readOnly=true;
				}
			}else{
				document.getElementById(temp[i]).readOnly=false;
			}
		}
		document.getElementById(temp[2]).disabled=false;
		document.getElementById(temp[6]).disabled=false;
	}else{
		for(let i=0; i<temp.length; i++){
			document.getElementById(temp[i]).readOnly=true;
		}
		document.getElementById(temp[2]).disabled=true;
		document.getElementById(temp[6]).disabled=true;
	}
}
function discardProfileChange(){
	toggleProfileMode(1);
	profileSetUp();
	document.querySelector(".rec-btn").innerHTML = 
	`<button class="btn btn-primary reset" onclick="editProfile();" title="Edit profile information" id="editProfileBtn" data-toggle="modal" data-target="#authenticateModal" data-whatever="@"><i class="fa fa-edit"></i> Edit My Profile</button>
	<button class="btn btn-success reset" onclick="viewPrivateProfile('privateProfileBtn');" id="privateProfileBtn" title="Preview private profile"><i class="fa fa-eye"></i> View Private Profile</button>`;
	togglePrivateProfile('privateProfileBtn');
	voiceOver("Apologies accepted, cancel change");
}
function authRecheck(data,fun){
	if(data==0){
		document.querySelector(".modal").style.display = "block";
		document.querySelector(".modal-dialog").style.display = "block";
		document.querySelector(".modal-content").style.display = "block";
		document.getElementById("authenticateModal").style.opacity = "1";
		newCaptcha('recipient-captcha-in','newSpiner');
		document.getElementById("model-btn").innerHTML=`<button type="button" class="btn btn-success" title="Submit the above details" onclick=${fun}>Submit</button>`;
	}else{
		document.querySelector(".modal").style.display = "none";
		document.querySelector(".modal-dialog").style.display = "none";
		document.querySelector(".modal-content").style.display = "none";
		document.getElementById("authenticateModal").style.opacity = "0";
		document.getElementById('recipient-pass').value = "";
		document.getElementById('recipient-captcha-out').value = "";
		document.getElementById('recipient-pass').style.border = " 1px solid #ced4da";
		document.getElementById('recipient-captcha-out').style.border = " 1px solid #ced4da";
	}
}
function dropdownMenu(id,data){
	if(data==0){
		document.getElementById(id).style.display = "block";
	}else{
		document.getElementById(id).style.display = "none";
	}
}
function profileChange(id){
	if(document.getElementById('privateProfileBtn').innerHTML=='<i class="fa fa-times"></i> Discard Changes'){
		blbg('dpSelectPage',0);
		profilePathDisplay(currentUser.dp);
	}
}
function profilePathDisplay(path){
	document.getElementById('dpPath').value = path;
}
function dpSelected(id){
	let m = document.getElementById(id).value;
	if(isValidImageLink(id)&&m!=""){
		document.getElementById('prev-profile-img').src = m;
		blbg('dpSelectPage',1);
	}else{
		voiceOver("Please select an image");
	}
}
