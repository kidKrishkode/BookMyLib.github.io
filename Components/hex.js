let currentUser = 0;
let loginError = 0;
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let Timeline = [0,0,0,0,0];
let bookBin = [], studentBin = [], teacherBin = [], adminBin = [], instBin = [];
let voice=1;
function getCaptch(id){
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
function checkCaptch(id1,id2){
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
function validUser(userid,password){
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
function authentication(auth1, auth2){
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
function Bypass(){ //not completed
   /* loginError = 1;
    authentication(true,true);*/
    voiceOver();
}
function getUserDp(){
    if(currentUser!=0){
        return currentUser.dp;
    }else{
        return './images/default.png';
    }
}
function getCalender(){
    let Time = new Date;
	let date = Time.getDate();
	let month = Time.getMonth()+1;
	let year = Time.getFullYear();
	Timeline = [date,month,year];
    const result = cal1stdate(date, getTodayDay());
    let calendar = calendarMaker(result,month,year);
    if(calendar!=undefined){
    	return calendar;
    }else{
    	return null;
    }
}
function getTodayDay(){
    const today = new Date();
    const dayIndex = today.getDay();
    return daysOfWeek[dayIndex];
}
function getCalenTime(){
	return `${Timeline[0]<10?'0'+Timeline[0]:Timeline[0]}/${Timeline[1]<10?'0'+Timeline[1]:Timeline[1]}/${Timeline[2]}`;
}
function getCalenderTime(){
	const Month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	return `${Month[Timeline[1]-1]}, ${Timeline[2]}`;
}
function cal1stdate(date, day){
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
function calendarMaker(day,month,year){
    let duration = MonthLength(month,year);
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
function MonthLength(month,year){
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
function getNextMonth(){
    try{
	    if(Timeline[1]<12){
		    Timeline[1]=Timeline[1]+1;
	    }else{
		    Timeline[1]=1;
		    Timeline[2]=Timeline[2]+1;
	    }
	    const result = cal1stdate(1, daysOfWeek[Timeline[3]+1]);
        let calendar = calendarMaker(result,Timeline[1],Timeline[2]);
        return calendar;
    }catch(e){
        return null;
    }
}
function getPrevMonth(){
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
	const result = cal1stdate(MonthLength(Timeline[1],Timeline[2]), daysOfWeek[n]);
    let calendar = calendarMaker(result,Timeline[1],Timeline[2]);
    return calendar;
}
function validateUserName(input){
  const namePattern = /^[a-zA-Z]+(?: [a-zA-Z]+)*(?: [a-zA-Z]+)?$/;
  if(namePattern.test(input)){
    if(input.length >= 3 && input.length <= 20){
      return true;
    }
  }
  return false;
}
function validateUserEmail(email){
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
function validateDepartment(input){
  const deptPattern = /^[a-zA-Z]+(?: [a-zA-Z]+)*(?: [a-zA-Z]+)?$/;
  if(deptPattern.test(input)){
    if(input.length >= 2 && input.length <= 30){
      return true;
    }
  }
  return false;
}
function checkPassword(id1,id2){
	return checkCaptch(id1,id2);
}
function validatePassword(input){
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
function validateSelect(input){
    if(input!='--SELECT AN OPTION--'){
        return true;
    }else{
        return false;
    }
}
function validateDate(date){
    let tuple = [];
    tuple[0] = (date[0]+date[1]+date[2]+date[3])/1;
    tuple[1] = (date[5]+date[6])/1;
    tuple[2] = (date[8]+date[9])/1;
    //year-> 1974 - 2074 (2024+-50)
    if(tuple[0]<=(((new Date).getFullYear())+60)&&(tuple[0]>=((new Date).getFullYear())-60)){
        return true;
    }else{
        return false;
    }
}
function validateDateEnding(date1,date2){
    let tuple = [];
    tuple[0] = (date1[0]+date1[1]+date1[2]+date1[3])/1;
    tuple[1] = (date2[0]+date2[1]+date2[2]+date2[3])/1;
    if(tuple[1]<=tuple[0]+60&&tuple[1]>tuple[0]){
        return true;
    }else{
        return false;
    }
}
function idMaker(n,m){
	if(n==0){
		return bookid(m);
	}else if(n>0 && n<4){
		return entityid(n);
	}else{
		return false;
	}
}
function bookid(type){
	//BK-230212-05-6
	let id='BK-';
	id += ((new Date).getFullYear())-2000;
	id += ((new Date).getMonth())+1<10?'0'+((new Date).getMonth())+1:((new Date).getMonth())+1;
	id += ((new Date).getDate())+1<10?'0'+((new Date).getDate())+1:((new Date).getDate())+1;
	id += '-'+(bookTypes.indexOf(type)<10?'0'+bookTypes.indexOf(type):bookTypes.indexOf(type));
	id += '-'+(Timeline.length<10?'0'+Timeline.length:Timeline.length);
	return id;
}
function entityid(n){
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
function passwordMaker(){
	//@BookMyLib2401
	var special = new Array('/','@','&','!','#','@','*','?','%','@');
	let pass = special[Math.floor(Math.random()*special.length)];
	pass += 'BookMyLib';
	pass += ((new Date).getFullYear())-2000;
	pass += adminBin.length<10?'0'+adminBin.length:adminBin.length;
	return pass;
}
function pageRoute(id){
	if(currentUser!=0&&loginError<3&&adminBin.length!=0){
	    try{
	        for(let j=0; j<pages.length; j++){
		        document.getElementById(pages[j]).style.display = "none";
	        }
	       document.getElementById(id).style.display = "block";
	    }catch(e){
		    alert("Error 500!\nPage route is not possible due to the following error. \n",e);
	    }
	}else{
		voiceOver();
	}
}
// if(validateStudentEntry("krish","Male","demo@12gmail.in","HOD",[2021,2025],"#0c8ff0;","@mitra23")==true){
//     console.log("call");
// }else{
//     console.log("...");
// }
function pushData(){
    temp = [adminBin,studentBin,teacherBin,bookBin,instBin];
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
function StartBackend(){
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
// StartBackend();
function voiceOver(message){
    if(voice==1){
        try{
            const speech = new SpeechSynthesisUtterance();
            if(message==''||message==undefined){
                message = "This feature is not available in this version, please try another options";
            }
            speech.lang = "en";
            speech.text = message;
            window.speechSynthesis.speak(speech);
        }catch(e){
            alert(message);
        }
    }
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
	for(let j=0; j<BookBin.length; j++){
		if(target==BookBin[j].name || target==BookBin[j].id){
			return true;
		}
	}
	return false;
}