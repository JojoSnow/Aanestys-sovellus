const addVotingBtn = document.getElementById('add-voting-btn');


// window.addEventListener('load', hideOnLoad);
document.addEventListener('keydown', adminModeKey);
addVotingBtn.addEventListener('click', makeForm);


let adminMode = true;
let votingOptArray = [];
let votingArray = [];

function hideOnLoad() {
    document.getElementById('add-voting').style.display = 'none';
    addVotingBtn.style.display = 'none';
    document.querySelectorAll('.delete-btn').forEach(btn => btn.style.display = 'none');
}

function showVoting(event) {
    const targetID = event.target.getAttribute('id');
    const voting = document.getElementById(targetID);
    

}

function deleteVoting(event) {
    const targetID = event.target.parentElement.getAttribute('id');
    const voting = document.getElementById(targetID);
    voting.remove();
    for (let i = 0; votingArray.length > i; i++) {
        if (votingArray[i].id === targetID) {
            votingArray.splice(i, 1);
        }
    }
}

function makeForm() {
    const addVotingDiv = document.getElementById('add-voting');
    const votingForm = document.createElement('form');
    votingForm.id = 'add-voting-form';
    addVotingDiv.appendChild(votingForm);

    const nameLabel = document.createElement('label');
    nameLabel.htmlFor = 'voting-name';
    nameLabel.innerHTML = 'Nimi:';
    votingForm.appendChild(nameLabel);

    const newBr1 = document.createElement('br');
    votingForm.appendChild(newBr1);
    
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'voting-name';
    nameInput.id = 'voting-name';
    nameInput.className = 'voting-text-field';
    votingForm.appendChild(nameInput);

    const newBr2 = document.createElement('br');
    votingForm.appendChild(newBr2);

    const optionsLabel = document.createElement('label');
    optionsLabel.htmlFor = 'voting-options';
    optionsLabel.innerHTML = 'Vaihtoehdot:';
    votingForm.appendChild(optionsLabel);

    const newBr3 = document.createElement('br');
    votingForm.appendChild(newBr3);
    
    const optionsInput = document.createElement('input');
    optionsInput.type = 'text';
    optionsInput.name = 'voting-options';
    optionsInput.id = 'voting-options';
    optionsInput.className = 'voting-text-field';
    votingForm.appendChild(optionsInput);

    const votingOptSubmit = document.createElement('input');
    votingOptSubmit.type = 'submit';
    votingOptSubmit.value = 'Lisää';
    votingOptSubmit.id = 'add-voting-option-btn';
    votingForm.appendChild(votingOptSubmit);

    const optionsList = document.createElement('ol');
    optionsList.id = 'voting-options-list';
    votingForm.appendChild(optionsList);

    const readyBtn = document.createElement('input');
    readyBtn.type = 'submit';
    readyBtn.value = 'Valmis';
    readyBtn.id = 'voting-ready-btn';
    votingForm.appendChild(readyBtn);

    const addVotingOptBtn = document.getElementById('add-voting-option-btn');
    const votingReadyBtn = document.getElementById('voting-ready-btn');

    addVotingOptBtn.addEventListener('click', addVotingOption);
    votingReadyBtn.addEventListener('click', addVoting);
}

function addVotingOption(event) {
    event.preventDefault();
    const votingOpt = document.getElementById('voting-options').value;

    if(votingOpt !== '') {
        const node = document.createTextNode(votingOpt);
        const newLi = document.createElement('li');

        votingOptArray.push(votingOpt);
        newLi.appendChild(node);
        newLi.className = 'voting-options-list-item';
        document.getElementById('voting-options-list').appendChild(newLi);
    }
    
}

let IDindex = 0;
function addVoting(event) {
    event.preventDefault();

    const votingList = document.getElementById('voting-list');
    const votingName = document.getElementById('voting-name').value;
    const nameNode = document.createTextNode(votingName);
    const newDiv = document.createElement('div');
    const newBtn = document.createElement('button');

    newDiv.appendChild(nameNode);
    newDiv.id = 'voting' + IDindex;
    newDiv.className = 'voting-item';
    votingList.appendChild(newDiv);
    newBtn.id = 'delete' + IDindex;
    newBtn.className = 'delete-btn';
    newDiv.appendChild(newBtn);

    document.querySelectorAll('.voting-options-list-item').forEach(item => item.remove());

    const newObject = {id: 'voting' + IDindex, options: votingOptArray};
    votingArray.push(newObject);

    votingOptArray = [];

    IDindex++;

    const deleteBtn = document.querySelectorAll('.delete-btn');
    const voting = document.querySelectorAll('.voting-item');

    deleteBtn.forEach(btn => btn.addEventListener('click', deleteVoting));
    voting.forEach(vote => vote.addEventListener(('click'), showVoting));
}

function adminModeKey(event) {    
    if (event.key === 'p' && adminMode === false) {
        adminMode = true;
        if (adminMode === true) {
            makeForm();
        }
    } else if (event.key === 'p' && adminMode === true) {
        adminMode = false;
        if (adminMode === false) {
            document.getElementById('add-voting').style.display = 'none';
            addVotingBtn.style.display = 'none';
            document.querySelectorAll('.delete-btn').forEach(btn => btn.style.display = 'none');
        }
    }    
}
