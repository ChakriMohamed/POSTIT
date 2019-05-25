
var cpt = 0;
var x,y;
var corps = document.querySelector('#corps');


corps.addEventListener("dblclick",function(e){

			 x = e.clientX;
			 y = e.clientY;
		
			document.querySelector('.modal').style.display ='flex';
			
			
 });
document.querySelector("#sub").addEventListener('click',function(){
	
	var contenuNote = document.querySelector('#note').value
	
	createItem(x,y,contenuNote)

	document.querySelector('.modal').style.display='none';

	



   
    



    
    });		

		



 document.querySelector('.close').addEventListener('click',function(){

 		document.querySelector('.modal').style.display='none';
	// document.querySelector('.close').parentNode.style.display='none';


 });



function createItem(x,y,z){
	cpt+=1;

	var note = document.createElement("div");
	var txt = document.createTextNode(z);
	var croix = document.createTextNode("+")
	var close = document.createElement("H1");
	close.className= "close"

	close.appendChild(croix)
        note.appendChild(close)
        close.style.position= "relative"
        close.style.left = "110px"
        close.style.top = "15px"
        
	note.name = "post";
	note.maxLength = "5000";
	note.cols = "5";
	note.rows = "20";
	note.style.position = "absolute";
	note.style.top ="250px";
	note.style.width ="150px";
	note.style.height ="200px";
	note.style.background  ="blue";
	note.style.top = y+"px"
	note.style.left = x+"px"
	note.style.border = "solid"
	note.className= "note"+cpt
	
	corps.appendChild(note);
	note1 = document.querySelector('.note'+cpt+'')
	note1.appendChild(txt)
	}










document.querySelector('.close').addEventListener('click',function(e){
	
	 document.querySelector('.close').parentNode.style.display='none';
	
	alert('idElt')

	
//	document.querySelector('.note').style.display="none"


})









////////////////////////////////////////////////////////////////////
/*	function createPopUp(x,y){
			
				cpt+=1;
			if (x>=0 & y >= 130 ){
				var form = document.createElement("form")
				var note = document.createElement("textarea");
				var input = document.createElement("input");
				var submit = document.createElement("input");
				var txt = document.createTextNode("save");
				submit.appendChild(txt);
				
				note.className = "msg";

				note.name = "post";
				note.maxLength = "5000";
				note.cols = "30";
				note.rows = "20";
				input.className = "titreNote"
				input.type = "text"
				input.placeholder =" Titre"
        submit.className ="titreNote"
        submit.type = "submit"
				
				

				submit.className = "sendMsg"

       // var divc = document.createElement("div");
        //var croix = document.createTextNode("+")
       // divc.appendChild(croix)
       // divc.className= "close"
        
        
				//form.appendChild(divc);
				form.appendChild(note); //appendChild
				form.appendChild(submit);
				form.appendChild(input);
        corps.appendChild(form);
			document.querySelector(".msg").style.position = "absolute";
			document.querySelector(".msg").style.left = x+"px";
			document.querySelector(".msg").style.top = y+"px";
			document.querySelector(".sendMsg").style.position = "absolute";

			document.querySelector(".sendMsg").style.left = x+190+"px";
			document.querySelector(".sendMsg").style.top = y+310+"px";

			document.querySelector(".titreNote").style.position = "absolute";
			document.querySelector(".titreNote").style.left = x+ "px";
			document.querySelector(".titreNote").style.top = y-20 +"px";
			document.querySelector(".titreNote").style.width =232 +"px";
  
        
      
        document.querySelector(".close").style.left =x+190 +"px";
        document.querySelector(".close").style.top =y+10 +"px";

  
       
        
			}
			else {alert("veuillez cliquer dans la grille ")}

				if (cpt >=6) {alert("vous devez supprimer quelques unes sur l'écran")} 

			}*/

		
			
     // alert("x= "+x+"\n y= "+y)
//createPopUp(x,y);



