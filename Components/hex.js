let currentUser = 0;
let currentPage = 0;
let loginError = 0;
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let Timeline = [0,0,0,0,0];
let bookBin = [], studentBin = [], teacherBin = [], adminBin = [], instBin = [], settingBin = [];
let voice=1;
let theme=1;
let mylib,calender,system;
function Mylib(port){
    this.port = port;
    this.loc = window.location;
}
function Calender(date){
	this.date = date;
}
function System(asset){
    this.asset = asset;
}
document.addEventListener("DOMContentLoaded",() =>{
    mylib = new Mylib(3000);
    calender = new Calender(new Date().getTime());
    system = new System(document);
    if(window.location.protocol!="file:"||window.location.hostname!=""||window.location.protocol=="https:"){
		mylib.StartBackend();
	}
});
Mylib.prototype.getCaptch = function(id){
    setTimeout(function onn(){
        var cap = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','/','@','&','!','#','*','?','%','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9');
        var i;
        for(i=0;i<6;i++){
            var a = cap[Math.floor(Math.random()*cap.length)];
            var b = cap[Math.floor(Math.random()*cap.length)];
            var c = cap[Math.floor(Math.random()*cap.length)];
            var d = cap[Math.floor(Math.random()*cap.length)];
            var e = cap[Math.floor(Math.random()*cap.length)];
            var f = cap[Math.floor(Math.random()*cap.length)];
        }
        var code = a+b+c+d+e+f;
        document.getElementById(id).value = code;
    },500);
}
Mylib.prototype.checkCaptch = function(id1,id2){
    var string1 = removeSpaces(document.getElementById(id1).value);
    var string2 = removeSpaces(document.getElementById(id2).value);
    if(string1 == string2){
        return true;
    }else{
        return false;
    }
}
function removeSpaces(string){
    return string.split(' ').join('');
}
Mylib.prototype.validUser = function(userid,password){
    let id = document.getElementById(userid).value;
    let pass = document.getElementById(password).value;
    for(let j=0; j<adminBin.length; j++){
	    if(((id==adminBin[j].userid) ||(id==adminBin[j].email)) &&(pass==adminBin[j].password)){
		    currentUser = adminBin[j];
		    return true;
	    }
    }
    return false;
}
Mylib.prototype.authentication = function(auth1, auth2){
    if(loginError > 3){
        voiceOver("Sorry, you are try to log more then 3 times, so your try is up, try later");
        return "Timeout";
    }
    if(auth1 == true && auth2 == true && loginError <= 3){
        return true;
    }else{
        loginError++;
        return false;
    }
}
Mylib.prototype.Bypass = function(){
    loginError = 1;
    adminBin = [{
        "userid": "BK-2408-01",
        "password": "@Mitra2003",
        "dp": "./images/unkown.png",
        "name": "Krish",
        "position": "HOD",
        "email": "krish@gmail.in",
        "year": ["2012-02-05","2402-09-05"],
        "gender": "Male",
        "color": "#0c8ff0",
        "roll": "Super Admin",
        "bin": []
    }];
    currentUser = adminBin[0];
    instBin = [{
        "name": "PKDV",
        "brunch": "Krishnapur",
        "address": "404 no road",
        "email": "pkdv@yahoo.com",
        "year": "2019"
    }];
    voiceOver("Once again, System bypass successful!");
}
Mylib.prototype.getUserDp = function(){
    if(currentUser!=0){
        return currentUser.dp;
    }else{
        return './images/avater-3.png';
    }
}
Mylib.prototype.getCalender = function(){
    let Time = new Date;
	let date = Time.getDate();
	let month = Time.getMonth()+1;
	let year = Time.getFullYear();
	Timeline = [date,month,year];
    const result = calender.cal1stdate(date, calender.getTodayDay());
    let calendar = mylib.calendarMaker(result,month,year);
    if(calendar!=undefined){
    	return calendar;
    }else{
    	return null;
    }
}
Calender.prototype.getTodayDay = function(){
    const today = new Date();
    const dayIndex = today.getDay();
    return daysOfWeek[dayIndex];
}
Calender.prototype.getCalenTime = function(){
	return `${Timeline[0]<10?'0'+Timeline[0]:Timeline[0]}/${Timeline[1]<10?'0'+Timeline[1]:Timeline[1]}/${Timeline[2]}`;
}
Calender.prototype.getCalenderTime = function(){
	const Month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	return `${Month[Timeline[1]-1]}, ${Timeline[2]}`;
}
Calender.prototype.cal1stdate = function(date, day){
    let days=daysOfWeek.indexOf(day);
    if(date == 1){
  	    return day;
    }
    for(let j=date; j>1; j--){
  	    if(days == 0){
  	        days=6;
        }else{
            days=days-1;
        }
    }
    return daysOfWeek[days];
}
Mylib.prototype.calendarMaker = function(day,month,year){
    let duration = calender.MonthLength(month,year);
    let line=[];
    let blank = daysOfWeek.indexOf(day);
    for(let j=0; j<blank; j++){
   	    line[j]=0;
    }
    let n = line.length;
    for(let j=0; j<duration; j++){
   	    line[n+j]=j+1;
        if(j==0){
            if(line.length==7){
                Timeline[4]=6;
            }else{
                Timeline[4]=(line.length%7)-1;
            }
        }
    }
    let list='<li>';
    for(let j=0; j<line.length; j++){
   	    if(j % 7 == 0 && j!=0){
   	        list+='</li><li>';
        }
        if(line[j]==0){
       	    list+='<div> </div>';
        }else{
       	    if(line[j]==(new Date).getDate()&&month==(new Date).getMonth()+1&&year==(new Date).getFullYear()){
       	        list+=`<div class="today">${line[j]}</div>`;
            }else{
                list+=`<div>${line[j]}</div>`;
            }
        }
        if(line[j]==duration){
            Timeline[3]=j%7;
        }
    }
    for(let j=0; j<6-Timeline[3]; j++){
   	    list+='<div> </div>';
    }
    list+='</li>';
    return `<ul>${list}</ul>`;
}
Calender.prototype.MonthLength = function(month,year){
	let leap=0,duration;
	if(year % 4 == 0 || year % 400 == 0){
		leap=1;
	}
	let bigM = [1,3,5,7,8,10,12];
	let smallM = [4,6,9,11];
	for(let j=0; j<bigM.length; j++){
		if(bigM[j]==month){
			duration = 31;
		}
	}
	for(let j=0; j<smallM.length; j++){
		if(smallM[j]==month){
			duration = 30;
		}
	}
	if(month == 2){
		duration = 28+leap;
	}
   return duration;
}
Calender.prototype.getNextMonth = function(){
    try{
	    if(Timeline[1]<12){
		    Timeline[1]=Timeline[1]+1;
	    }else{
		    Timeline[1]=1;
		    Timeline[2]=Timeline[2]+1;
	    }
	    const result = calender.cal1stdate(1, daysOfWeek[Timeline[3]+1]);
        let calendar = mylib.calendarMaker(result,Timeline[1],Timeline[2]);
        return calendar;
    }catch(e){
        return null;
    }
}
Calender.prototype.getPrevMonth = function(){
	let n=0;
	if(Timeline[1]<=1){
		Timeline[1]=12;
		Timeline[2]=Timeline[2]-1;
	}else{
		Timeline[1]=Timeline[1]-1;
	}
	if(Timeline[4]<=0){
		n=6;
	}else{
		n=Timeline[4]-1;
	}
	const result = calender.cal1stdate(calender.MonthLength(Timeline[1],Timeline[2]), daysOfWeek[n]);
    let calen = mylib.calendarMaker(result,Timeline[1],Timeline[2]);
    return calen;
}
Mylib.prototype.validateUserName = function(input){
    const namePattern = /^[a-zA-Z]+(?: [a-zA-Z]+)*(?: [a-zA-Z]+)?$/;
    if(namePattern.test(input)){
        if(input.length >= 3 && input.length <= 20){
        return true;
        }
    }
    return false;
}
Mylib.prototype.validateUserEmail = function(email){
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
Mylib.prototype.validateDepartment = function(input){
    const deptPattern = /^[a-zA-Z]+(?: [a-zA-Z]+)*(?: [a-zA-Z]+)?$/;
    if(deptPattern.test(input)){
        if(input.length >= 2 && input.length <= 30){
            return true;
        }
    }
    return false;
}
Mylib.prototype.checkPassword = function(id1,id2){
	return mylib.checkCaptch(id1,id2);
}
Mylib.prototype.validatePassword = function(input){
    const requirements = [
		{regex: /.{8,}/, index: 0},
		{regex: /[0-9]/, index: 1},
		{regex: /[a-z]/, index: 2},
		{regex: /[^A-Za-z0-9]/, index: 3},
		{regex: /[A-Z]/, index: 4}
	];
	let requirementItem=0;
	requirements.forEach((item)=>{
		let isValid = item.regex.test(input);
		if(isValid){
			requirementItem++;	
		}
	});
    if(requirementItem>=requirements.length){
        if(input.length >= 8 && input.length <= 16){
            return true;
        }
    }else{
        return false;
    }
}
Mylib.prototype.validateSelect = function(input){
    if(input!='--SELECT AN OPTION--'){
        return true;
    }else{
        return false;
    }
}
Calender.prototype.validateDate = function(date){
    let tuple = [];
    tuple[0] = (date[0]+date[1]+date[2]+date[3])/1;
    tuple[1] = (date[5]+date[6])/1;
    tuple[2] = (date[8]+date[9])/1;
    if(tuple[0]<=(((new Date).getFullYear())+60)&&(tuple[0]>=((new Date).getFullYear())-60)){
        return true;
    }else{
        return false;
    }
}
Calender.prototype.validateDateEnding = function(date1,date2){
    let tuple = [];
    tuple[0] = (date1[0]+date1[1]+date1[2]+date1[3])/1;
    tuple[1] = (date2[0]+date2[1]+date2[2]+date2[3])/1;
    if(tuple[1]<=tuple[0]+60&&tuple[1]>tuple[0]){
        if((tuple[1]==tuple[0]+1)&&(((date2[5]+date2[6])/1)<((date1[5]+date1[6])/1))){
        	return false;
        }
        return true;
    }else{
        return false;
    }
}
Mylib.prototype.validateUserId = function(input){
    if(adminBin.length!=0){
        for(let i=0; i<adminBin.length; i++){
            if(adminBin[i].userid==input){
                return true;
            }
        }
        return false;
    }else{
        return false;
    }
}
Mylib.prototype.idMaker = function(n,m){
	if(n==0){
		return system.bookid(m);
	}else if(n>0 && n<4){
		return system.entityid(n);
	}else{
		return false;
	}
}
System.prototype.bookid = function(type){
	//BK-230212-05-6
	let id='BK-';
	id += ((new Date).getFullYear())-2000;
	id += ((new Date).getMonth())+1<10?'0'+((new Date).getMonth())+1:((new Date).getMonth())+1;
	id += ((new Date).getDate())+1<10?'0'+((new Date).getDate())+1:((new Date).getDate())+1;
	id += '-'+(bookTypes.indexOf(type)<10?'0'+bookTypes.indexOf(type):bookTypes.indexOf(type));
	id += '-'+(Timeline.length<10?'0'+Timeline.length:Timeline.length);
	return id;
}
System.prototype.entityid = function(n){
	//LMA-2301-08
	let id='LMA-';
	id += ((new Date).getFullYear())-2000;
	id += '0'+n+'-';
	let m;
	if(n==1){
		m=studentBin.length;
	}else if(n==2){
		m=teacherBin.length;
	}else{
		m=adminBin.length;
	}
	id += m<10?'0'+m:m;
	return id;
}
Mylib.prototype.passwordMaker = function(){
	//@BookMyLib2401
	var special = new Array('/','@','&','!','#','@','*','?','%','@');
	let pass = special[Math.floor(Math.random()*special.length)];
	pass += 'BookMyLib';
	pass += ((new Date).getFullYear())-2000;
	pass += adminBin.length<10?'0'+adminBin.length:adminBin.length;
	return pass;
}
Mylib.prototype.avaterMaker = function(gender){
    try{
        let avater = Math.floor(Math.random()*avaterLib.length);
        if(gender=="Male"&&avater%2!=0){
            return mylib.avaterMaker(gender);
        }else if(gender=="Female"&&avater%2==0){
            return mylib.avaterMaker(gender);
        }else{
            return avaterLib[avater].src;
        }
    }catch(e){
        voiceOver("Sorry, user dp not found!");
    }
}
function pageRoute(id){
	// if(currentUser!=0&&loginError<3&&adminBin.length!=0){
	    try{
	        for(let j=0; j<pages.length; j++){
                if(id!=pages[j].button){
                    if(currentPage.button!=id&&currentPage!=0){
                        document.getElementById(pages[j].area).innerHTML = document.querySelector(".field").innerHTML;
                    }
                    if(j<10){
                        document.getElementById(pages[j].button).style.backgroundColor = "var(--white-cl)";
                    }
                }else{
                    document.querySelector(".field").innerHTML = document.getElementById(pages[j].area).innerHTML;
                    if(j<10){
                        document.getElementById(pages[j].button).style.backgroundColor = "var(--light-gry)";
                    }
                    currentPage = {area: pages[j].area,button: pages[j].button};
                }
	        }
            navToggle();
	    }catch(e){
		    console.error("Error 500!\nPage route is not possible due to the following error. \n",e);
	    }
	// }else{
	// 	voiceOver();
	// }
}
function pushData(){
    temp = [adminBin,studentBin,teacherBin,bookBin,instBin,settingBin];
    return storeDataBase('BookMyLibInfo',temp);
}
function clearData(){
    adminBin.length = 0;
    studentBin.length = 0;
    teacherBin.length = 0;
    bookBin.length = 0;
    instBin.length = 0;
    if(pushData()){
        voiceOver("Database is empty now.");
    }else{
        voiceOver("Not able to clear database.");
    }
}
function storeDataBase(key, arrayToStore){
    try{
        const arrayString = JSON.stringify(arrayToStore);
        localStorage.setItem(key, arrayString);
        return true;
    }catch(error){
        console.error('Error to storing data in local storage:', error);
        if(checkStorage()>=90){
            voiceOver("Sorry, but your storage is full, storing operation is going to fail..");
            console.log('Storage full...');
        }
        return false;
    }
}
function fetchDataBase(){
    try{
        const retrievedArrayString = localStorage.getItem('BookMyLibInfo');
        const retrievedArray = JSON.parse(retrievedArrayString);
        if(retrievedArray==undefined||retrievedArray==null){
           return true;
        }
        adminBin = retrievedArray[0];
        studentBin = retrievedArray[1];
        teacherBin = retrievedArray[2];
        bookBin = retrievedArray[3];
        instBin = retrievedArray[4];
        settingBin = retrievedArray[5];
        return true;
    }catch(error){
        console.log("Databse fetch is not possible due to \n",error);
        return false;
    }
}
function checkStorage(){
    const totalSpace = 5*1024*1024;
    let usedSpace = 0;
    for(const key in localStorage){
        if(localStorage.hasOwnProperty(key)){
            usedSpace += localStorage.getItem(key).length;
        }
    }
    const freeSpace = totalSpace - usedSpace;
    const total = usedSpace + freeSpace;
    const usedPercen = (usedSpace/total)*100;
    const roundPercen = Math.round(usedPercen*100)/100;
    return roundPercen; //5MB
}
Mylib.prototype.StartBackend = function(){
    if(fetchDataBase()!=true){
        voiceOver("Sorry to fetch data is not possible to your local database");
    }else{
        if(adminBin.length==0||adminBin==undefined){
            voiceOver("Welcome new user, this is book my lib, an online library manegment system, and i am your host");
        }else{
            voiceOver("Welcome back user");
        }
    }
    getLocalData(document.body.id);
}
function voiceOver(message){
    if(voice==1){
        if(message==''||message==undefined){
            message = "This feature is not available in this version, please try another options";
        }try{
            const speech = new SpeechSynthesisUtterance();
            speech.lang = "en";
            speech.text = message;
            // window.speechSynthesis.speak(speech);
        }catch(e){
            alert(message);
        }
    }
}
function download(id,name,exe){
	if(id==''||name==''){
		return false;
	}try{
        const textToDownload = document.getElementById(id).textContent;
        const fileName = `${name}.${exe}`;
        const blob = new Blob([textToDownload], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        return true;
    }catch(e){
    	voiceOver("Sorry download is not possible in this device");
        return false;
    }
}
System.prototype.getTheme = function(){
	try{
        if(settingBin.length!=0){
            theme = settingBin.theme;
        }
        for(let j=0; j<colorLib[theme].collist.length; j++){
		    document.documentElement.style.setProperty(colorLib[theme].collist[j][0], colorLib[theme].collist[j][1]);
        }
        return true;
	}catch(e){
        voiceOver();
        return false;
    }
}
System.prototype.toggleTheme = function(id){
    if(theme==0){
        theme=1;
        document.getElementById(id).className = "fa fa-moon-o";
        document.getElementById(id).title = "Change into dark theme";
    }else{
        theme=0;
        document.getElementById(id).className = "fa fa-sun-o";
        document.getElementById(id).title = "Change into light theme";
    }
    return true;
}
function displaySelectedImage(event, elementId){
    const selectedImage = document.getElementById(elementId);
    const fileInput = event.target;
    if(fileInput.files && fileInput.files[0]){
        if(fileInput.files[0].type.startsWith('image/')){
            const reader = new FileReader();
            reader.onload = function(e){
                selectedImage.src = e.target.result;
                profilePathDisplay(selectedImage.src);
            };
            reader.readAsDataURL(fileInput.files[0]);
        }else{
            voiceOver("Sorry, But selected file is not an image.");
        }
    }
}
System.prototype.isValidImageLink = function(id){
	const imageLinkInput = document.getElementById(id);
    if(imageLinkInput && imageLinkInput.value.trim() !== ""){
        const imageLink = imageLinkInput.value;
        const hostedImageRegex = /^(https?:\/\/).+\.(png|jpg|jpeg|gif|bmp|svg)$/i;
        const dataImageRegex = /^data:image\/(png|jpg|jpeg|gif|bmp|svg);base64,/;
        const localImageRegex = /^\.?\/(?:.+\/)*.+\.(png|jpg|jpeg|gif|bmp|svg)$/i;
        if(hostedImageRegex.test(imageLink) || dataImageRegex.test(imageLink) || localImageRegex.test(imageLink)){
            return true;
        }else{
            voiceOver("Invalid image link");
            return false;
        }
    }
}
System.prototype.checkAudioSupport = function(){
    const isAudioSupported = 'HTMLAudioElement' in window;
    const isWebAudioSupported = 'AudioContext' in window || 'webkitAudioContext' in window;
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        const isAudioPermissionGranted = true;
        console.log('Audio Supported:', isAudioSupported);
        console.log('Web Audio Supported:', isWebAudioSupported);
        console.log('Audio Permission Granted:', isAudioPermissionGranted);
    }).catch(error => {
        const isAudioPermissionGranted = false;
        //console.error('Audio Supported:', isAudioSupported,'Web Audio Supported:', isWebAudioSupported,'Audio Permission Granted:', isAudioPermissionGranted);
        if(isAudioSupported==false){
            alert("Your device not support audio, Please use any other device");
        }
        if(isWebAudioSupported==false){
            alert("Your web not support audio, Please use any other web");
        }
        if(isAudioPermissionGranted==false){
            alert("Please give audio permission to us\nGo to Settings -> Audio permission -> Allow.")
        }
    });
}
function popEntry(n,target){
	if(n==0){
		return deleteBook(target);
	}else if(n==1){
		deleteStudent(target);
	}else if(n==2){
		deleteTeacher(target);
	}else if(n==3){
		deleteAdmin(target);
	}else{
		return false;
	}
}
function deleteBook(target){
	for(let j=0; j<bookBin.length; j++){
		if(target==bookBin[j].name || target==bookBin[j].id){
			return true;
		}
	}
	return false;
}