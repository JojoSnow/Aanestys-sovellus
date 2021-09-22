const addVotingBtn = document.getElementById('add-voting-btn');

window.addEventListener('load', hideOnLoad);
document.addEventListener('keydown', adminModeKey);
addVotingBtn.addEventListener('click', makeForm);

let adminMode = false; // activate adminMode with ctrl key
let votingOptArray = [];
const votingArray = [];

function hideOnLoad() {
    document.getElementById('add-voting').style.display = 'none';
    addVotingBtn.style.display = 'none';
    document.querySelectorAll('.delete-btn').forEach(btn => btn.style.display = 'none');
}

let emailIndex = 0;
function addVotingContents(event) {
    const targetId = event.target.parentElement.getAttribute('id');
    const expandBtn = event.target;
    for (let x = 0; votingArray.length > x; x++) {
        if (votingArray[x].show === false && votingArray[x].id === targetId && votingArray[x].showed === 'create') {
            expandBtn.style.backgroundImage = 'url(../icons/minus-square-regular.svg)';
    
            for (let i = 0; votingArray.length > i; i++) {
                if (votingArray[i].id === targetId && votingArray[i].showed === 'create') {
                    const voting = document.getElementById(targetId);
    
                    const newDiv = document.createElement('div');
                    newDiv.id = 'expand-div' + i;
                    newDiv.className = 'expand-div';
                    voting.appendChild(newDiv);                    
    
                    for (let y = 0; votingArray[i].options.length > y; y++) {

                        const radioInput = document.createElement('input');
                        radioInput.className = 'vote-item';
                        radioInput.type = 'radio';
                        radioInput.name = 'vote-option';
                        radioInput.value = 'vote-option-' + y;
                        radioInput.id = votingArray[x].options[y].id;
                        newDiv.appendChild(radioInput);

                        const radioLabel = document.createElement('label');
                        radioLabel.htmlFor = 'vote-option-' + y;
                        radioLabel.innerHTML = votingArray[i].options[y].option + ' ' + votingArray[i].options[y].votes;
                        newDiv.appendChild(radioLabel);

                        const newBr1 = document.createElement('br');
                        newDiv.appendChild(newBr1);

                    }
    
                    const emailLabel = document.createElement('label');
                    emailLabel.className = 'email-labels';
                    emailLabel.htmlFor = 'email';
                    emailLabel.innerHTML = 'Sähköposti:';
                    newDiv.appendChild(emailLabel);

                    const newBr1 = document.createElement('br');
                    newDiv.appendChild(newBr1);

                    const emailInput = document.createElement('input');
                    emailInput.type = 'email';
                    emailInput.name = 'email';
                    emailInput.className = 'email-inputs';
                    newDiv.appendChild(emailInput);

                    const newBr2 = document.createElement('br');
                    newDiv.appendChild(newBr2);

                    const emailBtn = document.createElement('input');
                    emailBtn.type = 'button';
                    emailBtn.value = 'Äänestä';
                    emailBtn.className = 'email-btns'
                    emailBtn.id = 'email-btn-' + emailIndex;
                    newDiv.appendChild(emailBtn);
                    
                    votingArray[i].show = true;
                    votingArray[i].showed = 'hide';                    
                }
            }
        } else if (votingArray[x].show === false && votingArray[x].id === targetId && votingArray[x].showed === 'expand') {
            event.target.nextSibling.nextSibling.style.display = 'block';
            expandBtn.style.backgroundImage = 'url(../icons/minus-square-regular.svg)';
            votingArray[x].showed = 'hide';
            votingArray[x].show = true;
        } else if (votingArray[x].show === true && votingArray[x].id === targetId && votingArray[x].showed === 'hide') {
            event.target.nextSibling.nextSibling.style.display = 'none';
            expandBtn.style.backgroundImage = 'url(../icons/plus-square-regular.svg)';
            votingArray[x].showed = 'expand';
            votingArray[x].show = false;
        }
    }
    document.querySelectorAll('.email-btns').forEach(btn => btn.addEventListener('mouseup', addVote));
}

function addVote(event) {
    for (let x = 0; votingArray.length > x; x++) {
        for (let i = 0; votingArray[x].options.length > i; i++) {
            if (document.getElementById(votingArray[x].options[i].id).checked) {
                if (!event.target.previousElementSibling.previousElementSibling.checkValidity()) {
                    votingArray[x].options[i].votes++;
                    document.getElementById(votingArray[x].options[i].id).nextSibling.innerHTML = votingArray[x].options[i].option + ' ' + votingArray[x].options[i].votes;
                    event.target.previousElementSibling.previousElementSibling.style.borderColor = '#c88deb';
                } else {
                    event.target.previousElementSibling.previousElementSibling.style.borderColor = 'red';
                }
            }
        }
    }
        
}

function deleteVoting(event) {
    const targetId = event.target.parentElement.getAttribute('id');
    const voting = document.getElementById(targetId);
    voting.remove();
    for (let i = 0; votingArray.length > i; i++) {
        if (votingArray[i].id === targetId) {
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
    votingOptSubmit.type = 'button';
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

let voteIndex = 0;
function addVotingOption() {
    const votingOpt = document.getElementById('voting-options').value;
    if (votingOpt !== '') {
        const node = document.createTextNode(votingOpt);
        const radioInput = document.createElement('li');

        const newObject = {id: 'vote' + voteIndex, option: votingOpt, votes: 0, email: false};
        votingOptArray.push(newObject);
        radioInput.appendChild(node);
        radioInput.id = 'vote' + voteIndex;
        radioInput.className = 'voting-options-list-item';
        document.getElementById('voting-options-list').appendChild(radioInput);
        voteIndex++;
    }
}

let IDindex = 0;
function addVoting(event) {
    event.preventDefault();

    const votingList = document.getElementById('voting-list');
    const votingName = document.getElementById('voting-name').value;
    const nameNode = document.createTextNode(votingName);
    const newDiv = document.createElement('div');
    const delBtn = document.createElement('button');
    const moreBtn = document.createElement('button');

    if (votingName !== '') {
        newDiv.appendChild(nameNode);
        newDiv.id = 'voting' + IDindex;
        newDiv.className = 'voting-item';
        votingList.appendChild(newDiv);
        moreBtn.id = 'expand' + IDindex;
        moreBtn.className = 'more-btn';
        newDiv.appendChild(moreBtn);
        delBtn.id = 'delete' + IDindex;
        delBtn.className = 'delete-btn';
        newDiv.appendChild(delBtn);

        document.querySelectorAll('.voting-options-list-item').forEach(item => item.remove());

        document.getElementById('add-voting-form').remove();

        const newObject = {id: 'voting' + IDindex, options: votingOptArray, show: false, showed: 'create'};
        votingArray.push(newObject);

        votingOptArray = [];

        IDindex++;

        const deleteBtn = document.querySelectorAll('.delete-btn');
        const expandBtn = document.querySelectorAll('.more-btn');

        deleteBtn.forEach(btn => btn.addEventListener('click', deleteVoting));
        expandBtn.forEach(voting => voting.addEventListener('click', addVotingContents));
    }
}

function adminModeKey(event) {    
    if (event.ctrlKey === true && adminMode === false) {
        adminMode = true;
        if (adminMode === true) {
            document.getElementById('add-voting').style.display = 'block';
            addVotingBtn.style.display = 'block';
            document.querySelectorAll('.delete-btn').forEach(btn => btn.style.display = 'block');
        }
    } else if (event.ctrlKey === true && adminMode === true) {
        adminMode = false;
        if (adminMode === false) {
            document.getElementById('add-voting').style.display = 'none';
            addVotingBtn.style.display = 'none';
            document.querySelectorAll('.delete-btn').forEach(btn => btn.style.display = 'none');
        }
    }    
}
