
import {emojiIndex} from "emoji-mart";

import { Textcomplete } from "@textcomplete/core";

import { ContenteditableEditor } from "@textcomplete/contenteditable";

import { TextareaEditor } from "@textcomplete/textarea";

function emojiAutocompleteInner(editors) {
  console.log(`DBG emojiAutocompleteInner ${editors}`);
  return editors.map(editor => {
    console.log(`DBG setup editor ${editor}`);
    let txtComp = new Textcomplete(editor, [{
        match: /\B:([\-+\w]{1,30})$/,
        search: (term, callback) => {console.log(`DBG textComplete.search with term ${term} and callback ${callback}`); callback(emojiIndex.search(term))},
        template: emoji => {console.log(`DBG textComplete.template with emoji ${emoji} -> "${emoji.native} ${emoji.colons}"`); `${emoji.native} ${emoji.colons}`},
        replace: emoji => {console.log(`DBG textComplete.replace with emoji ${emoji} -> ${emoji.native}`); emoji.native},
        index: 1
      }],
      {dropdown: {
       className: "emoji-autocomplete-menu textcomplete-dropdown dropdown-menu",
       style: {zIndex: 1136},
       maxCount: 20
    }});

    txtComp.on("select", (inEvent) => {
      console.debug(`TextComplete did select ${inEvent.target}`)
      console.log(`DBG TextComplete.onSelect with event ${inEvent}`);
      let outEvent = new Event("input", {bubbles: true});
      console.log(`DBG    editor.el ${editor.el}`);
      console.log(`DBG    ret ${outEvent}`);
      editor.el.dispatchEvent(outEvent);
    });
    return txtComp;
  });
}

function setupEditorWithElement(el) {
  console.log(`DBG setupEditorWithElement ${el}`);
  let editor;
  if (!el) {
    console.error(`Can't initialize EmojiAutocopmlete on undefined element: ${el}`)
    return editor;
  }
  if (el.getAttribute("contenteditable")) {
    console.debug(`Initializing EmojiAutocomplete on ${el.tagName} element: ${el}`)
    editor = new ContenteditableEditor(el);
  } else if (el.nodeName.toLowerCase() === "textarea") {
    console.debug(`Initializing EmojiAutocomplete on TEXTAREA element: ${el}`)
    editor = new TextareaEditor(el);
  } else {
    console.warn(`Element of type ${el.tagName} not supported`)
  }
  console.log(`DBG ret ${editor}`);
  return editor;
}

function emojiAutocomplete(elementOrSelector) {
  console.log(`DBG emojiAutocomplete called with ${elementOrSelector}`);
  let textEditors = [];
  if (elementOrSelector.nodeType && elementOrSelector.nodeType === Node.ELEMENT_NODE) {
    textEditors.push(setupEditorWithElement(elementOrSelector));
  } else {
    const els = document.querySelectorAll(elementOrSelector);
    for (let i = 0; i < els.length; i++) {
      textEditors.push(setupEditorWithElement(els[i]));
    }
  }
  if (textEditors.length) {
    return emojiAutocompleteInner(textEditors);
  }
  console.log(`DBG initialized emojiAutocomplete, textEditors: ${textEditors}`);
}

export default emojiAutocomplete;