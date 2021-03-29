
import {emojiIndex} from "emoji-mart";

import { Textcomplete } from "@textcomplete/core";

import { ContenteditableEditor } from "@textcomplete/contenteditable";

import { TextareaEditor } from "@textcomplete/textarea";

function emojiAutocompleteInner(editors) {
  return editors.map(editor => {
    let txtComp = new Textcomplete(editor, [{
        match: /\B:([\-+\w]{1,30})$/,
        search: (term, callback) => callback(emojiIndex.search(term)),
        template: emoji => `${emoji.native} ${emoji.colons}`,
        replace: emoji => emoji.native,
        index: 1
      }],
      {dropdown: {
       className: "emoji-autocomplete-menu textcomplete-dropdown dropdown-menu",
       style: {zIndex: 1136},
       maxCount: 20
    }});

    txtComp.on("select", (inEvent) => {
      console.debug(`TextComplete did select`, inEvent.target);
      let outEvent = new Event("input", {bubbles: true});
      editor.el.dispatchEvent(outEvent);
    });
    return txtComp;
  });
}

function setupEditorWithElement(el) {
  console.debug(`Setup TextComplete on element:`, el);
  let editor;
  if (!el) {
    console.error(`Can't initialize EmojiAutocopmlete on undefined element: ${el}`)
    return editor;
  }
  if (el.getAttribute("contenteditable")) {
    console.debug(`Initializing EmojiAutocomplete on ${el.tagName} element:`, el);
    editor = new ContenteditableEditor(el);
  } else if (el.nodeName.toLowerCase() === "textarea") {
    console.debug(`Initializing EmojiAutocomplete on TEXTAREA element:`, el);
    editor = new TextareaEditor(el);
  } else {
    console.warn(`Element of type ${el.tagName} not supported`)
  }
  return editor;
}

function emojiAutocomplete(elementOrSelector) {
  console.debug(`emojiAutocomplete called:`, elementOrSelector);
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
}

function destroy(txtEditors) {
  if (txtEditors) {
    if ()
    txtEditor.destroy();
  }

  if (txtEditors.destroy) {
    txtEditors.destroy();
  } else {
    for (let i = 0; i < txtEditors.length; i++) {
      txtEditors[i].destroy();
    }
  }
  return true;
}

export default emojiAutocomplete;