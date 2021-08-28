/**
 * Engine for creating games.
 */

/**
 * adding game stated
 * return the added state
 * @param {*} mainElement to add to
 * @param {*} stateDiv to add
 */
function addState(mainElement, stateDiv){
    stateDiv.classList.add("state");
    mainElement.appendChild(stateDiv);
    return stateDiv;
}

/**
 * return the state by id
 * @param {*} stateId 
 */
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

/**
 * changes the visibillity of a state
 * @param {*} stateId 
 * @param {*} visibillity 
 */
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

/**
 * changes from state to state
 * @param {*} fromState 
 * @param {*} toState 
 */
function changeState(fromState, toState){
    changeStateVisibillity(fromState, false);
    changeStateVisibillity(toState, true);
}

export {changeState, changeStateVisibillity, getStateById, addState};