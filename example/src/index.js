import {setupAutocomplete, destroyAutocomplete} from "@bago2k4/emoji-autocomplete";

let myCountLabel, myDivEditor, txtEditors, myBt;

function updateAutocompleteNum() {
  myCountLabel.innerHTML = `Number of ul.emoji-autocomplete-menu elements in page: ${document.querySelectorAll("ul.emoji-autocomplete-menu").length}`;
}

function start(el) {
  txtEditors = setupAutocomplete(el);
  myBt.innerHTML = "Stop!";
  myBt.onclick = (_)=> stop();
  updateAutocompleteNum();
}

function stop() {
  destroyAutocomplete(txtEditors);
  myBt.innerHTML = "Start!";
  myBt.onclick = (el)=> start(myDivEditor);
  updateAutocompleteNum();
}


document.addEventListener("DOMContentLoaded", function(_) {
  myDivEditor = document.querySelectorAll("div.my-editor");
  myBt = document.querySelector("button.my-bt");
  myCountLabel = document.querySelector("label.my-count-label");
  start(myDivEditor);
});