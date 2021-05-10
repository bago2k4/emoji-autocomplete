
import {emojiIndex} from "emoji-mart";

import { Textcomplete } from "@textcomplete/core";

import { ContenteditableEditor } from "@textcomplete/contenteditable";

import { TextareaEditor } from "@textcomplete/textarea";

function editorWithAutocomplete(editor) {
  let txtComp = new Textcomplete(editor, [{
      match: /\B:([\-+\w]{1,30})$/,
      search: (term, callback) => callback(emojiIndex.search(term)),
      template: emoji => `${emoji.native} ${emoji.colons}`,
      replace: emoji => emoji.native,
      index: 1
    }],
    {
      dropdown: {
        className: "emoji-autocomplete-menu textcomplete-dropdown dropdown-menu",
        style: {zIndex: 1136},
        maxCount: 20,
        rotate: true
      }
    }
  );

  txtComp.on("select", (inEvent) => {
    let outEvent = new Event("input", {bubbles: true});
    editor.el.dispatchEvent(outEvent);
  });

  // On click out of the dropdown listener
  window.addEventListener("click", (event) => {
    if ( txtComp.dropdown.isShown() && !txtComp.dropdown.el.contains(event.target) ) {
      txtComp.hide();
    }
  });

  return txtComp;
}

function setupEditorWithElement(el) {
  let editor;
  if (!el) {
    console.error(`Can't initialize EmojiAutocopmlete on undefined element: ${el}`)
  } else if (el.getAttribute("contenteditable")) {
    console.debug("Init ContenteditableEditor on", el);
    editor = new ContenteditableEditor(el);
  } else if (el.nodeName.toLowerCase() === "textarea") {
    console.debug("Init TextareaEditor on", el);
    editor = new TextareaEditor(el);
  } else {
    console.warn(`Element of type ${el.tagName} not supported`)
  }
  return editorWithAutocomplete(editor);
}

function initializeTextCompleteEditors(elementOrSelector) {
  if (elementOrSelector.nodeType && elementOrSelector.nodeType === Node.ELEMENT_NODE) {
    return setupEditorWithElement(elementOrSelector);
  } else if (typeof elementOrSelector === "string") {
    let els = document.querySelectorAll(elementOrSelector);
    return initializeTextCompleteEditors(els);
  } else {
    let editors = [];
    for (let i = 0; i < elementOrSelector.length; i++) {
      editors.push(setupEditorWithElement(elementOrSelector[i]));
    }
    return editors;
  }
}

export function setupAutocomplete(elementOrSelector) {
  console.debug("Initializing emojiAutocomplete with", elementOrSelector);
  let textEditors = initializeTextCompleteEditors(elementOrSelector);
  console.debug(`Initialized ${textEditors.length} editors`);
  return textEditors;
}

export function destroyAutocomplete(txtEditors) {
  console.debug("Destroying emojiAutocomplete:", txtEditors);
  if (txtEditors.destroy) {
    txtEditors.destroy();
  } else {
    for (let i = 0; i < txtEditors.length; i++) {
      if (txtEditors[i].destroy) {
        txtEditors[i].destroy();
      }
    }
  }
  return true;
}