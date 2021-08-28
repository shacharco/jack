/**
 * The game
 */

import {changeState, changeStateVisibillity, getStateById, addState} from './engine.js';

/**
 * returns the state that connects states
 */
function createStateBridge(){
    var stateDiv = document.createElement("div");
    stateDiv.id = "bridge";
    var mainText = document.createElement("p");
    stateDiv.appendChild(mainText);
    return stateDiv;
}

/**
 * sets the bridge state text
 * @param {*} text 
 */
function setBridge(text){
    var bridge = getStateById("bridge");
    var mainText = bridge.getElementsByTagName("p")[0];
    mainText.innerText = text;
    changeStateVisibillity("bridge", true);
}

/**
 * returns the main starting state
 */
function createStateStart(){
    var stateDiv = document.createElement("div");
    stateDiv.id = "start";
    setBridge("You enter a forest, all  uou see is trees. Where do you go?");
    var mainText = document.createElement("p");
    mainText.innerText = '-> Choice between "Left", "Right", and "Forward"';
    stateDiv.appendChild(mainText);
    var forward = document.createElement("button");
    forward.innerText = "Forward";
    forward.onclick = function(event){changeState("start", "forward");
    changeStateVisibillity("bridge", false);};
    var right = document.createElement("button");
    right.innerText = "Right";
    right.onclick = function(event){setBridge("The path is blocked by trees and you are unable to move past them.\nBetween the trees you can see somehting that looks like a small village.\nWhat do you want to do?");};
    var left = document.createElement("button");
    left.innerText = "Left";
    left.onclick = function(event){changeState("start", "left");
    changeStateVisibillity("bridge", false);};
    stateDiv.appendChild(left);
    stateDiv.appendChild(forward);
    stateDiv.appendChild(right);
    return stateDiv;
}

/**
 * returns the state when moving forward
 */
function createStateForward(){
    var stateDiv = document.createElement("div");
    stateDiv.id = "forward";
    var mainText = document.createElement("p");
    mainText.innerText = 'You ran into a bear. Fight?\n-> Choice Yes/No'
    stateDiv.appendChild(mainText);
    var yes = document.createElement("button");
    yes.innerText = "Yes";
    yes.onclick = function(event){changeState("forward", "end"); setBridge("You were mauled by the bear.")}
    var no = document.createElement("button");
    no.innerText = "No";
    no.onclick = function(event){changeState("forward", "start"); setBridge("You ran away succefully.")}
    stateDiv.appendChild(yes);
    stateDiv.appendChild(no);
    return stateDiv;
}

/**
 * returns the state when moving left
 */
function createStateLeft(){
    var stateDiv = document.createElement("div");
    stateDiv.id = "left";
    var mainText = document.createElement("p");
    mainText.innerText = 'You bump into a travelleing salesman, which says he is selling apples. How many will you buy? 5$ each\n-> Number choice between 0 and '+window.player.money/5;
    stateDiv.appendChild(mainText);
    var input = document.createElement("input");
    input.setAttribute("type", "number");
    input.addEventListener("keyup", function(event){
        if(event.keyCode != 13){
            return;
        }
        var output = document.createElement("p");
        var val = Number(this.value);
        if(val > window.player.money/5){
            output.innerText = "You dont have enough money."
        }
        else{
            window.player.money -= val*5;
            window.player.apples += val;
            output.innerText = "You now have " + window.player.money + " money and " + window.player.apples + " apples." 
        }
        stateDiv.appendChild(output);
        var comment = document.createElement("p");    
        comment.innerText = "Do you have anything to say to the seller?"    
        stateDiv.appendChild(comment);
        var commentInput = document.createElement("input");
        commentInput.setAttribute("type", "text");
        commentInput.addEventListener("keyup", function(event){
            if(event.keyCode != 13){
                return;
            }
            stateDiv.removeChild(output);
            stateDiv.removeChild(comment);
            stateDiv.removeChild(commentInput);
            if(this.value.includes("thank")){
                setBridge("The seller says you're welcome.")
            }
            else{
                setBridge("That's very rude of you.")                
            }
            input.value = "";            
            changeState("left", "start");
        });
        stateDiv.appendChild(commentInput);
    
    });
    stateDiv.appendChild(input);
    return stateDiv;
}

/**
 * returns the ending state
 */
function createStateEnd(){
    var stateDiv = document.createElement("div");
    stateDiv.id = "end";
    var mainText = document.createElement("p");
    mainText.innerText = 'The adventure ends.';
    stateDiv.appendChild(mainText);
    return stateDiv;
}

/**
 * initializes the game states and info to the main div
 * @param {*} mainDiv 
 */
function boot(mainDiv){
    window.player = {"money": 100, "apples": 0}        
    addState(mainDiv, createStateBridge());
    changeStateVisibillity("bridge", false);
    addState(mainDiv, createStateStart());
    changeStateVisibillity("start", true);
    addState(mainDiv, createStateForward());
    changeStateVisibillity("forward", false);
    addState(mainDiv, createStateLeft());
    changeStateVisibillity("left", false);
    addState(mainDiv, createStateEnd());
    changeStateVisibillity("end", false);
}

/**
 * start the game
 */
var mainDiv = document.getElementById("MainDiv");
boot(mainDiv);
