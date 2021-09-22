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

let voteIdIndex = 0;
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
                    const newUl = document.createElement('ul');
                    const newP = document.createElement('p');
                    const node = document.createTextNode('Äänestä klikkaamalla!');

                    newDiv.id = 'expand-div' + i;
                    newDiv.className = 'expand-div';
                    voting.appendChild(newDiv);
                    newUl.id = 'vote-list';
                    newDiv.appendChild(newUl);
                    newP.id = 'vote-info';
                    newP.className = 'vote-info';
                    newP.appendChild(node);
                    newDiv.appendChild(newP);
    
                    for (let y = 0; votingArray[i].options.length > y; y++) {
                        const newLi = document.createElement('li');
                        const newP = document.createElement('p');
                        const option = document.createTextNode(votingArray[i].options[y].option);
                        const votes = document.createTextNode(votingArray[i].options[y].votes);

                        newLi.className = 'vote-item';
                        newLi.id = votingArray[i].options[y].id;
                        newLi.appendChild(option);
                        newP.className = 'votes';
                        newP.id = 'votes' + voteIdIndex;
                        newP.appendChild(votes);
                        newLi.appendChild(newP);
                        newUl.appendChild(newLi);
                        voteIdIndex++;
                    }
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
    const voteOption = document.querySelectorAll('.vote-item');

    voteOption.forEach(option => option.addEventListener('click', addVote));
}

function addVote(event) {
    const targetId = event.target.getAttribute('id');
    const parentId = event.target.parentElement.getAttribute('id');

    for (let x = 0; votingArray.length > x; x++) {
        for (let i = 0; votingArray[x].options.length > i; i++) {
            if (votingArray[x].options[i].id === parentId) {
                votingArray[x].options[i].votes++;
                if (parentId === votingArray[x].options[i].id) {
                    document.getElementById(targetId).innerHTML = votingArray[x].options[i].votes;
                } 
            } else if (targetId === votingArray[x].options[i].id) {
                votingArray[x].options[i].votes++;
                if (targetId === votingArray[x].options[i].id) {
                    document.getElementById(targetId).firstElementChild.innerHTML = votingArray[x].options[i].votes;
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
        const newLi = document.createElement('li');

        const newObject = {id: 'vote' + voteIndex, option: votingOpt, votes: 0};
        votingOptArray.push(newObject);
        newLi.appendChild(node);
        newLi.id = 'vote' + voteIndex;
        newLi.className = 'voting-options-list-item';
        document.getElementById('voting-options-list').appendChild(newLi);
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
