/////////////////////////////////////// change this link to ensure correct domain is used ///////////////////////////////////////////////////////
//var newPathname = "https://nickgmvp.github.io/dfv1/editordependencies"
var pathName2 = opener.location.href
var pathArray = pathName2.split('/')
var newPathname = "";
for (i = 0; i < 4; i++) {
  newPathname += pathArray[i];
	newPathname += "/";
	console.log(newPathname);
}



//called in editor.js to add javascript to the editor window/
// there are 1 links that will need refactoring in this file
!function restore_edittable(){
	var divs = document.getElementsByClassName('editable');
	for(let i = 0; i<divs.length;i++){
	divs[i].setAttribute("contenteditable", true);
	}}();


// this listens for psoition updates from the tracker pixels embedded in the 
//presentation and scrolls the window to view the corresponding section in the editor
window.addEventListener('storage',function(){
  var position = localStorage.position;
 if(position){ 
  console.log("current speaker note position is " + position);
  document.getElementById(position).scrollIntoView({block:'end' ,behavior: 'smooth'})}
 }
	);

// this function creates the reminders for when speaker notes are being used
function add_reminder(el){
  var content = prompt('set you reminder, it will pop up in speaker notes when you reach the slide');
  if(content){
  var parentID = el.parentNode.id;
 el.parentNode.innerHTML += ' <img title="' + content + '" id = "' + parentID + 'reminder"  height ="10" width="10" src="' + newPathname + 'editordependencies/alarm.svg" class = "reminder" ondblclick="this.remove();" onload ="if(this.parentNode.classList.contains(\'value\')){window.alert(\''+ content + '\')};">';                                                
  }	
};

//This function will clear all the user editted sections, and save.
// *****Consider adding instant save here.***
  function reset_notes(){
         var to_reset = document.getElementsByClassName('editable');
	  for(let i = 0; i<to_reset.length;i++){
	  to_reset[i].innerHTML = " ";
	  //save();
	  }
  }
// selects and destroys all the reminders in the editor window, saves afterwards
//*** consider adding instant save here *** 
  function reset_reminders(){
    
       var del = document.getElementsByClassName('reminder');
    while(del.length!=0){
	    del[0].remove();
	   // save();
            }
  };
  
// this function ensures no "add reminder buttons" are added to the presentation 
//notes as they only work in the editor window
  function strip_reminder_buttons(){
  var to_strip = document.getElementsByClassName('reminder_button');
  while(to_strip.length!=0){
  to_strip[0].remove();
  }
  };

// function ot save and close the editor window.
// split in to two one for save on for save and close

  function save_and_close() {
	  //generates and formats a save id using path
    var saveLocation = window.opener.location.pathname + "save_data"; 
    saveLocation = JSON.stringify(saveLocation);
    console.log("location data is being saved is ..." + saveLocation);
    //reformat elements to be reintegrated with presentation
    strip_reminder_buttons();
	  //check if this is needed
   // remove_edittable2();
    // create array for elements to be stored in and fill it
    var to_save = []; 
    var new_notes = document.getElementsByClassName('notes');
    for(let i=0; i< new_notes.length ;i++){
      to_save[i]= new_notes[i].innerHTML 
    } 
    //format savedata so it can be regathered at load by the presentation.  
    save_data = JSON.stringify(to_save); 
    // put in to browser storage
    localStorage.setItem(saveLocation,save_data);
    console.log("the save data has ..." + to_save.length + "entries"); 
    var save = localStorage.getItem(saveLocation); 
    console.log("saved data is ...." + save);
	  window.close();
	 
  };


 function save() {
	  //generates and formats a save id using path
    var saveLocation = window.opener.location.pathname + "save_data"; 
    saveLocation = JSON.stringify(saveLocation);
    console.log("location data is being saved is ..." + saveLocation);
    //reformat elements to be reintegrated with presentation
    //strip_reminder_buttons();
	  //check if this is needed
   // remove_edittable2();
    // create array for elements to be stored in and fill it
    var to_save = []; 
    var new_notes = document.getElementsByClassName('notes');
    for(let i=0; i< new_notes.length ;i++){
      to_save[i]= new_notes[i].innerHTML 
    } 
    //format savedata to it can be regathered at load by the presentation.  
    save_data = JSON.stringify(to_save); 
    // put in to browser storage
    localStorage.setItem(saveLocation,save_data);
    console.log("the save data has ..." + to_save.length + "entries"); 
    var save = localStorage.getItem(saveLocation); 
    console.log("saved data is ...." + save);
  };

// This function completely wipes browser of ALL user data
//** add user verification here also colour the button red
  function nuke(){
	  var sure = confirm("this will wipe *#!# ALL stored session data from your browser !#?! are you sure?, if you want to reset THIS presentation use the reset buttons then save and close")
	  if (sure){
        console.log('wipe this presentation first');
	reset_reminders();
        reset_notes();
        // add save and second confirmation
    console.log('total wipe is imminent...'); 
    console.log('3');
    console.log('2');
    console.log('1'); 
    console.log('BOOM'); 
    localStorage.clear();
	  }
  };
