const notesContainer=document.getElementById("app");    //refers to div id='app' in html
const addbtn=notesContainer.querySelector(".add-note");    //refers to the button in the html document having class "add-note"

//Local storage is a mechanism to store data in the browser in JSON format

getNotes().forEach(note => {
    const notele=createNote(note.id,note.content);
    notesContainer.insertBefore(notele,addbtn);
});

addbtn.addEventListener("click",()=>addNote());
//function that gets all notes that currenty exist in local storage and add new note to existing array and resaves to storage using savenote()

function getNotes(){
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}


//notes parameter passed in the below array is an array that contains what is to be stored. that is saved in local storage. 

function saveNotes(notes){
    localStorage.setItem("stickynotes-notes",JSON.stringify(notes));
}


//below function creates a new html textarea to represent a new note. it APPEENDS to the DOM

function createNote(id,content){
    const element=document.createElement("textarea");

    element.classList.add("note");  //.note{} in css will be applicable
    element.value=content;
    element.placeholder="Enter text";

    element.addEventListener("change",()=>{    //whenever user changes something in the note
        editNote(id,element.value);
    });

    element.addEventListener("dblclick",()=>{
        const del=confirm("Are you sure you want to delete?");
        if(del){
            deleteNote(id,element);
        }
    });
    return element;
}

//add new note to existing array and resave it
function addNote(){
    const existing=getNotes();

    //creating new javascript object
    const noteobj={
        id: Math.floor(Math.random()*1000), //generating random id
        content: ""     //by default, content is empty
    };

    const notele=createNote(noteobj.id,noteobj.content);
    notesContainer.insertBefore(notele,addbtn);     //adding notes element to the page so it is visible to user.

    existing.push(noteobj); //add object to array
    saveNotes(existing);    //save to localstorage.

}

function editNote(id,newcontent){
    const notes=getNotes();
    const target=notes.filter(note=>note.id==id)[0];
    target.content=newcontent;
    saveNotes(notes);
}

function deleteNote(id,element){
    const notes=getNotes().filter(note=>note.id!=id);
    
    saveNotes(notes);
    notesContainer.removeChild(element);
}