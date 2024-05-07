const DEFAULT_TYPING_SPEED = 0.15 * 1000;
const DEFAULT_ERASING_SPEED = 0.1 * 1000;
const DEFAULT_STILL_TIME = 2 * 1000;
const DEFAULT_ERASED_STILL_TIME = 1 * 1000;

function write_typewriting(element, words, typingSpeed, stillTime, erasingSpeed, erasedStillTime) {
    return new Promise(async resolve => {
        for(let i = 0; i < words.length; i++) {
            await singleWord_typewriting(element, words[i], typingSpeed);
            if(stillTime != -1) 
            {
                await waitFor(stillTime);
                await erase_typewriting(element, erasingSpeed);    
            }
        }
        resolve();
        if(stillTime != -1) {
            await waitFor(DEFAULT_ERASED_STILL_TIME);
            write_typewriting(element, words, typingSpeed, stillTime, erasingSpeed);
        } 
    });
}

async function singleWord_typewriting(element, finalText, typingSpeed) {
    return new Promise(async resolve => {
        for(let i = 0; i < finalText.length; i++) {
            element.innerText = finalText.substring(0, i + 1);
            await waitFor(typingSpeed);
        }
        resolve();
    });
}

async function erase_typewriting(element, erasingSpeed) {
    return new Promise(async resolve => {
        let initialLength = element.innerText.length;
        for(let i = 0; i < initialLength; i++) {
            element.innerText = element.innerText.substring(0, element.innerText.length - 1);
            await waitFor(erasingSpeed);
        }
        resolve();
    });
}

function waitFor(time) {
    return new Promise(resolve => setTimeout(resolve, time));
} 

window.addEventListener("DOMContentLoaded", async function() {
    const element = document.querySelector(".title");
    this.setInterval(write_typewriting(element, ["lorenzoarlo.it"], DEFAULT_TYPING_SPEED, DEFAULT_STILL_TIME, DEFAULT_ERASING_SPEED, DEFAULT_ERASED_STILL_TIME));
});