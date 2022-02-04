////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
// this file will set up and initialise the editor it must be added as a script tag to presentations
//newPathname is used to set all relative paths and must be updated at setup.
var pathName2 = window.location.href
var pathArray = pathName2.split('/')
var newPathname = "";
for (i = 0; i < 4; i++) {
newPathname += pathArray[i];
newPathname += "/";
	console.log(newPathname);
}
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

//run imediately on page load prep current asides for edited versions
!function set_up_ids(){
			
	               // checking ahead to see if domain problems will occurr with local storage
			var domain = window.location.hostname;
			console.log('the current domain is' + domain);
			
			//if notes exist find them and make sure they're stored
			//use saveId based on the pathname of presentations to allow multiple presentations to be saved without crossover	
			var saveId = window.location.pathname + "save_data";
			console.log('save location for this presentation is' + saveId);
   			saveId = JSON.stringify(saveId);
			//find any saved notes from previous sessions
			var saved_notes = localStorage.getItem(saveId);
      
                        // Use notes stored under this saveId or if blank will error out and create a saveId
			if(saved_notes){
			console.log('found some data');
			console.log("saved data is ..." + saved_notes);
        
                         //attempt to load saved content and add to log if success/failure
			try{
			//to_replace is the content held in asides [array]
			var to_replace = document.getElementsByTagName('aside');
			//parse the locally stored JSON string back in to HTML elements
			var saved_notes2 = JSON.parse(saved_notes);
			//cycle through the two lists replacing the HTML content of the asides with previously edited content
			for(let i = 0; i<saved_notes2.length;i++){
		             	to_replace[i].innerHTML = saved_notes2[i];
				//******** remove edittable may be unneeded as remove edittable 2 in other file works***
				remove_edittable(to_replace[i]);
			            }
			        console.log('editable tags have been stripped');
				console.log("data being added to presentation is" + to_replace);
			}	
                                // if an error occurs with any of the preload functions post in the log
				catch(err){
				console.log('issue with saved data use editor window to clear memory and try again');
				console.log('Unfortunately this will clear all other notes.')
				//****** could add code based on saveid to remove only that data?***
			
			}
			        
			}
			
			else{
                        //if no data found set up saveId to allow editting
			//window.alert('no local data saved');
			console.log('no local data found');
			//if no local data found create saveId
			saveId = window.location.pathname + "save_data";
				console.log('save location is ' + saveId);
				saveId = JSON.stringify(saveId);
				//pass the saveId to local storage so editor window can find it.
				// this method is defunct but keeps a log of where things are saved might remove this given time.
			localStorage.setItem('saveLocation',saveId);
				
			}
			
			// logic to add the required buttons and trackers to the speaker notes
			// edited notes would be loaded in the try block asides contain either saved data or if no save, base data.
			var to_tag = document.getElementsByTagName('aside');
				
			// get un adulterated copy of notes/editted notes(no edit mode buttons or tracker pixels)
			var rawNotes=[];
			for(let i = 0; i < to_tag.length; i++){
			rawNotes[i] = to_tag[i].innerHTML;	
			}
                        // notes can now be passed in to storage to be picked up by editor
			localStorage.rawNotes = JSON.stringify(rawNotes);
      
                        //add editor mode buttons and tracker pixels to notes in speaker notes window
			for(let i = 0; i < to_tag.length; i++){
			to_tag[i].innerHTML += "<p style='font-size:2vmin;border-style:solid;padding:1px;border-color:red;background-color:white;width:10vmin;'>aside " + i + "</p>";
			to_tag[i].innerHTML += "<div id = edit_button" + i + "> <button title = 'enable popups on the Multiverse domain to use this feature' onclick='opener.engage_edit_mode(); localStorage.position="+ i + "'>edit mode</button> </div>";	
			to_tag[i].innerHTML +=  "<img src='" + newPathname + "editordependencies/single_pixel_tracker.png'  onload='localStorage.position="+ i + "';>"
			}aside
			
		}()
		// everything is ready to go now that the start up function has portioned out and sent all data

// this function cycles through all returned/saved data and strips out editabilty
// this was done to stop users trying to edit in speaker notes which generates errors/triggers all kinds of keyboard events.
function remove_edittable(element){
	var divs = element.getElementsByClassName('editable');
	console.log(divs.length);
	for(let i = 0; i<divs.length;i++){
	divs[i].setAttribute("contenteditable", "false");
}}

function engage_edit_mode(){
	try{
		setup_edit_mode();
	   }
	catch(err){
	         let domain = window.location.hostname;
	         window.alert("Error 1 : Your browser is blocking pop-ups, go in to your browser settings and give this domain permissions to create pop ups copy this domain in to the permitted list ... "+domain);
	}};

function setup_edit_mode(){
		// start new window
		// would need to enable popups for github if want this to work.add a try except loop to advise 
		//users to enable popups for this domain or could use while loop to windowalert each attempt until fixed?
			
		var editorWindow = window.open("","editorWindow" + window.location.pathname ,"width=600,height=750");	
		editorWindow.document.head.innerHTML = "<title>"+ window.location.pathname   +" editor </title>"	
		//editorWindow.document.head.innerHTML += "<link rel='stylesheet' href='./editor.css'>";	
		editorWindow.document.body.innerHTML ="<div class = 'bottom'><p>Remember: Close speaker notes and refresh the presentation after you save to make your changes take effect</P></div>";
		editorWindow.document.body.innerHTML +="<div class ='top'> <img src = '" + newPathname + "editordependencies/Black_skull.svg.png' title = 'double click to wipe all user data' ondblclick='nuke();'><a href='"+ newPathname + "editordependencies/help.html' target='_blank'><img src = '" + newPathname + "editordependencies/qm.png' title = 'click to read help'></a></div>";
	        editorWindow.document.body.innerHTML += "<div id='buffer'></div>";
			
		//put rawnotes in to editor window edits will persist between sessions and be loaded at first start up 
		var editorNotes = JSON.parse(localStorage.getItem('rawNotes'));
	        
		//store each aside in a div to make presentation easier and to make scraping them back in to main presentation easier
		var edited = document.getElementsByClassName('editable');
		
		console.log(edited.length);
		
	        //checks if notes have previously been editted if so skips this part
		if(edited.length!=0)	{
		   
		for(let i = 0;i< editorNotes.length;i++){
		editorWindow.document.body.innerHTML+="<div class='notes' id="+ i +"><p class='asino'>aside " + i + "</p> <button class = 'reminder_button'  onclick = 'add_reminder(this)'>add reminder</button>" + editorNotes[i] + "</div>";
		}	
		}
	        // if presentation has no previous edits add edittable divs in so users can input text and buttons to generate reminders
		else{
		for(let i = 0;i< editorNotes.length;i++){
		editorWindow.document.body.innerHTML+="<div class='notes' id="+ i +"><p class='asino'>aside " + i + "</p> <button class = 'reminder_button'  onclick = 'add_reminder(this)'>add reminder</button> <div class = 'editable' contenteditable = 'true'></div>" + editorNotes[i] + " <div class = 'editable' contenteditable = 'true'></div></div>";
		}
	        }
                //pulling editor specific js in to the popup window.		
                var script = editorWindow.document.createElement("script");
	        // add js to editor window dynamically this link could probably be generate using the domain so that it doesn't have to be manually changed.
	
	
	    
	        
                script.setAttribute('src',newPathname + 'editordependencies/editorinternal.js');			
			
                editorWindow.document.head.appendChild(script);
			
		
		editorWindow.document.body.innerHTML += "<div id='user_controls'><button class='normal' onclick = 'save_and_close();'> save and close</button><button class='normal' onclick='reset_notes();'>reset notes</button><button class='normal' onclick='reset_reminders();'>reset reminders</button><button class='danger' id = 'clear_all' onclick = 'reset_reminders(); reset_notes();'> clear presentation </button></div>";
		editorWindow.document.body.innerHTML +="<div id='bottom_buffer'></div>";
		editorWindow.document.head.innerHTML += "<link rel='stylesheet' type='text/css' href='"+ newPathname +"editordependencies/editorstyles.css'>";
	        return true;
		}

// The whole of engage edit mode could potentially be put in a single try except loop to catch the permissions error + any other potential errors found in testing.
