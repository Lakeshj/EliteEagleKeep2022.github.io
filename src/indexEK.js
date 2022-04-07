const AddNoteBtn = document.querySelector('#add');
const UpdateLSData = () => {

    const textAreaData = document.querySelectorAll('textarea');

    const notes = [];
    textAreaData.forEach( (note) => {
        return notes.push(note.value)
    } );
    
    // console.log(notes);

    localStorage.setItem('notes',JSON.stringify(notes));
}

const AddNote = ( text = '' ) => {

    // for creating new Dynamic Element
    const AddNote = document.createElement('div');
    AddNote.classList.add('note');

    const htmlData = `
        <div class="operations">
            <button class="remind"><i class="fa-solid fa-bell"></i></button>
            <button class="edit"> <i class="fas fa-edit"></i></button>
            <button class="delete"> <i class="fas fa-trash-alt"></i></button>
        </div>
        <div class = " main ${text ? "":"hidden"}"> </div>
        <textarea class = " ${ text ? "hidden" : "" }" ></textarea>
        <div class="clockbox">
            <div class="boxcont">
                <button class="closebtn"><span ><i class="fa fa-close"></i></span></button>
                <div class="datebox"></div>
                <div class="clockset">
                    <input type="text" name="time" id="clocktime" placeholder="yyyy-mm-dd hh:mm:ss">  
                    <button id="SetAlarm">set Alarm</button>
                </div>
            </div>
        </div> `;

    
    AddNote.insertAdjacentHTML('afterbegin', htmlData);

    // for getting References
    const editBtn = AddNote.querySelector('.edit');
    const deleteBtn = AddNote.querySelector('.delete');
    
    const Main = AddNote.querySelector('.main');
    const textArea = AddNote.querySelector('textarea');


    // for editing and toggling in the node

    Main.innerHTML = text;
    textArea.value = text;

    editBtn.addEventListener('click', () => {
        textArea.classList.toggle('hidden');
        Main.classList.toggle('hidden');
    });

    // for delete the node
    deleteBtn.addEventListener('click', () => {
        AddNote.remove();
        UpdateLSData();
    });

    // visible textarea value in div
    textArea.addEventListener('change', (event) => {
        const value = event.target.value;
        Main.innerHTML = value;
        UpdateLSData();
    });


    // for setting an alarm 
    const closeBtn = AddNote.querySelector('.closebtn');
    const remindBtn = AddNote.querySelector('.remind');  
    
    // input for date time
    const clocktime = AddNote.querySelector('#clocktime');
    
    // clock div's
    const clockBox = AddNote.querySelector('.clockbox');
    const dateboxcont = AddNote.querySelector('.datebox');
 
    // set alarm Button 
    const SetAlarm = AddNote.querySelector('#SetAlarm');


    const AlarmRing = () => {
        alert("ring ingggg")
        let audio = new Audio('./src/alarm-clock.mp3');
        audio.play()
        console.log();
    }


    SetAlarm.addEventListener('click', () => {
        
        const cloock = clocktime.value;
        const date = new Date(cloock);
        const CurDate = new Date();

        let setalarmtime = date - CurDate;
        if( setalarmtime >= 0){
            setTimeout( () => {
                AlarmRing();
            }, setalarmtime);
        }
    });
    
    remindBtn.addEventListener('click', () => {
        
        clockBox.style.display = 'block';
        
        setInterval( () => {
            dateboxcont.innerHTML = new Date().toLocaleString();
        },1000)
        
        // setalarm();
        
        console.log('alarm');
    });

    closeBtn.addEventListener('click', () => {
        clockBox.style.display = 'none';    
        console.log('close');
        UpdateLSData();
    });



    document.body.appendChild(AddNote);
    console.log("working");

}

// for getting data back from local storage
const Notedata = JSON.parse( localStorage.getItem('notes') );

if(Notedata){ Notedata.forEach( (note) => AddNote(note) ) }

AddNoteBtn.addEventListener('click', () => AddNote() );







    
