function addState(mainElement, stateDiv){
    stateDiv.classList.add("state");
    mainElement.appendChild(stateDiv);
    return stateDiv;
}

function getStateById(stateId){
    var mainDiv = document.getElementById("MainDiv");
    var states = mainDiv.getElementsByClassName("state");
    var state = null;
    for (let i = 0; i < states.length; i++) {
        if(states[i].id == stateId){
            state = states[i];
        }
    }
    return state;
}

function changeStateVisibillity(stateId, visibillity){
    var state = getStateById(stateId);
    if(!state){
        return;
    }
    if(visibillity){
        state.style.display = "block"; 
    }
    else{
        state.style.display = "none";        
    }
}
function changeState(fromState, toState){
    changeStateVisibillity(fromState, false);
    changeStateVisibillity(toState, true);
}

export {changeState, changeStateVisibillity, getStateById, addState};