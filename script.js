console.log('Hallo Im running');
let main_item = document.querySelector('.main_item');
let add_modal = document.querySelector('.add_modal');
let close = document.querySelector('#close');
let add_note = document.querySelector('#add_note');
// let update_modal = document.querySelector('.update_modal')
let title = document.querySelector('#title');
let desc = document.querySelector('#desc');
let alert = document.querySelector('.alert');
let closeupdate = document.querySelector('#closeupdate');
let update_modal = document.querySelector('.update_model');
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



let notes_container = document.querySelector('#notes_container .row');

function modalPopup() {
    console.log('hii');
    add_modal.style.display = 'block';
}
close.addEventListener('click', closeModal);
function closeModal() {
    add_modal.style.display = 'none';
    update_modal.style.display = 'none';
}
closeupdate.addEventListener('click',()=>{
    update_modal.style.display = 'none';
});
add_note.addEventListener('click', newNotes);

function newNotes() {
    if (title.value.trim() == "" && desc.value.trim() == "") {
        alert.style.display = 'block';
        setTimeout(() => {
            alert.style.display = 'none';
        }, 5000)
        add_modal.style.display = 'none';
    } else {
        let dt = new Date();
        let hour = dt.getHours();
        let min = dt.getMinutes();
        let date = dt.getDate();
        let month = months[dt.getMonth()];
        let year = dt.getFullYear();
         //Creat a Time Object For store all Time data
        
    
        







        let notesObj = {
            title: title.value,
            desc: desc.value,
            dateVal:date,
            monthVal:month,
            yearVal:year

        }
        let notes = JSON.parse(localStorage.getItem('note'));
        if (notes == null) {
            notes_arry = [];
        } else {
            notes_arry = notes;
        }
        notes_arry.push(notesObj);
        localStorage.setItem('note', JSON.stringify(notes_arry));
        title.value = "";
        desc.value = "";
        add_modal.style.display = 'none';
        showNote();
    }
}



showNote();
function showNote() {
    let notes = JSON.parse(localStorage.getItem('note'));
    if (notes == null) {
        notes_arry = [];
    } else {
        notes_arry = notes;
    }
    let html = `<div class="col-md-3 col-12 mb-3">
           <div class="card main_item note_item shadow d-flex justify-content-center align-items-center" onclick="modalPopup()">
          <div class="rounded_div rounded-circle d-flex justify-content-center align-items-start">
             <i class="fa-light fa-plus"></i>
         </div>
         <p>Add a Note</p>
      </div>
      </div>`;
    notes_arry.forEach((element, index) => {
        html += `<div class="col-md-3 col-12 mb-3" id="${index}">
       <div class="card  note_item shadow px-3 py-2">
           <h5 class="card-title px-3">${element.title}</h5>
           <div class="card-body" style="overflow-y: auto;">
                ${element.desc}
           </div>
           <div class="card-footer bg-white d-flex justify-content-between align-items-center">
               <p>${element.dateVal} ${element.monthVal} ${element.yearVal}</p>
               <div class="dot d-flex justify-content-center align-items-center" id="dot${index}" onclick="showdelModal(this.id)">
               <i class="fa-solid fa-ellipsis-vertical"></i>
               <div class="edit_del">
                   <li class="edit" onclick=editNote(this.parentElement.parentElement.parentElement.parentElement.parentElement.id)>
                       <p>Edit</p>
                   </li>
                   <li class="delete" onclick="deleteNote(this.parentElement.parentElement.parentElement.parentElement.parentElement.id)">
                       Delete
                   </li>
               </div>
           </div>
           </div>
           </div>
       </div>
   </div>`
    });
    notes_container.innerHTML = html;
    console.log(notes_arry);
}

function showdelModal(id) {
    let dot = document.querySelectorAll('.dot');
    Array.from(dot).forEach((element) => {
        if (element.getAttribute('id') != id) {
            element.children[1].style.transform = 'scale(0)';
        }
        else {
            // console.log(element.getAttribute('id'));


            // console.log(dot);
            let div = document.getElementById(`${id}`);
            div.children[1].style.transform = 'scale(1)';
            // console.log(id.children[1]);
            console.log('cliked');
        }

    })


}

function deleteNote(index) {
    // console.log(index);
    let yes = confirm('Are you sure to delete the note?');
    if(yes){
    let notes = JSON.parse(localStorage.getItem('note'));
    if (notes == null) {
        notes_arry = [];
    } else {
        notes_arry = notes;
    }
    notes_arry.splice(index, 1);
    localStorage.setItem('note', JSON.stringify(notes_arry));
    showNote();
    document.querySelector('.edit_del').display = 'none';
}

}

function editNote(index) {
    console.log(update_modal);
    console.log(index);
    let notes = JSON.parse(localStorage.getItem('note'));
    if (notes == null) {
        notes_arry = [];
    } else {
        notes_arry = notes;
    }
    update_modal.style.display = 'block';
    let update_input = document.querySelector('.update_modal');
    update_modal.children[1].children[1].className = index;
    update_modal.children[1].children[1].value = notes_arry[index].title;
    update_modal.children[1].children[3].value = notes_arry[index].desc;
    console.log(update_modal.children[1].children[1]);


}
let update_note = document.querySelector('#update_note');
update_note.addEventListener('click',()=>{
    let notes = JSON.parse(localStorage.getItem('note'));
    if (notes == null) {
        notes_arry = [];
    } else {
        notes_arry = notes;
    }
    let dt = new Date();
    let hour = dt.getHours();
    let min = dt.getMinutes();
    let date = dt.getDate();
    let month = months[dt.getMonth()];
    let year = dt.getFullYear();
    let index = update_modal.children[1].children[1].className;
    console.log(index);
    let updateObj = {
        title: update_modal.children[1].children[1].value,
        desc: update_modal.children[1].children[3].value,
        dateVal:date,
        monthVal:month,
        yearVal:year

    }
    notes_arry[index] = updateObj;
    localStorage.setItem('note',JSON.stringify(notes_arry));
    showNote();
    update_modal.style.display = 'none';
    
})

// search

let card_title = document.querySelectorAll('h5');
let search = document.querySelector('#search');
search.addEventListener('input',()=>{
  card_title.forEach((element)=>{
      console.log(element);
       if(element.textContent.includes(search.value)){
          element.parentElement.parentElement.style.display = 'block';
       }else{
          element.parentElement.parentElement.style.display = 'none';
       }
  });
})
// card_title.forEach(())