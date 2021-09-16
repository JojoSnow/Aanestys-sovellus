const addVotingBtn = document.getElementById('add-voting-btn');
const addVotingOptBtn = document.getElementById('add-voting-option-btn');
const votingReadyBtn = document.getElementById('voting-ready-btn');
const voting = document.querySelectorAll('.voting-item');
const deleteBtn = document.querySelectorAll('.delete-btn');

window.addEventListener('load', hideOnLoad);
voting.forEach(vote => vote.addEventListener(('click'), showVoting));
addVotingBtn.addEventListener('click', addVotingVisible);
addVotingOptBtn.addEventListener('click', addVotingOption);
votingReadyBtn.addEventListener('click', addVoting);
deleteBtn.forEach(btn => btn.addEventListener(('click'), deleteVoting));

let devMode = true;
let votingOptArray = [];
let votingArray = [];

function showVoting(event) {
    const targetID = event.target.getAttribute('id');
    const voting = document.getElementById(targetID);
    

}

function deleteVoting(event) {
    const targetID = event.target.parentElement.getAttribute('id');
    const voting = document.getElementById(targetID);
    voting.remove();
    console.log(targetID);
}

function hideOnLoad() {
    if (devMode === false) {
        document.getElementById('add-voting').style.display = 'none';
        document.getElementById('add-voting-btn').style.display = 'none';
        document.querySelectorAll('.delete-btn').forEach(btn => btn.style.display = 'none');
    } else if (devMode === true) {
        document.getElementById('add-voting-btn').style.display = 'visible';
        document.getElementById('add-voting').style.display = 'visible';
        document.querySelectorAll('.delete-btn').forEach(btn => btn.style.display = 'visible');
    }
}

function addVotingVisible() {
    document.getElementById('add-voting').style.display = 'visible';
}

function addVotingOption(event) {
    event.preventDefault();

    const votingOpt = document.getElementById('voting-options').value;
    const node = document.createTextNode(votingOpt);
    const newLi = document.createElement('li');

    votingOptArray.push(votingOpt);
    newLi.appendChild(node);
    newLi.className = 'voting-options-list-item';
    document.getElementById('voting-options-list').appendChild(newLi);
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
    console.log(newObject);


    IDindex++;
}