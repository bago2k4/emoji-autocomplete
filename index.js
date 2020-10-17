
import {emojiIndex} from "emoji-mart";

import { Textcomplete } from "@textcomplete/core";

import { ContenteditableEditor } from "@textcomplete/contenteditable";

import { TextareaEditor } from "@textcomplete/textarea";

function emojiAutocompleteInner(editors) {
  return editors.map(editor => {
    var txtComp = new Textcomplete(editor, [{
      match: /\B:([\-+\w]{1,30})$/,
      search: function (term, callback) {
        callback(emojiIndex.search(term));
      },
      template: function (emoji) {
        return emoji.native +' '+emoji.colons;
      },
      replace: function (emoji) {
        return emoji.native;
      },
      index: 1
    }],
    {dropdown: {
      className: "emoji-autocomplete-menu textcomplete-dropdown dropdown-menu",
      style: {zIndex: 1136},
      maxCount: 20
    }});
    txtComp.on("select", (e)=>{
      let event = new Event("input", {bubbles: true});
      editor.el.dispatchEvent(event);
    });
    return txtComp;
  });
}

function setupEditorWithElement(el) {
  let editor;
  if (el.getAttribute("contenteditable")) {
    editor = new ContenteditableEditor(el);
  }else if (el.nodeName.toLowerCase() === "textarea") {
    editor = new TextareaEditor(el);
  }
  return editor;
}

function emojiAutocomplete(elementOrSelector) {
  let textEditors = [];
  if (elementOrSelector.nodeType && elementOrSelector.nodeType === Node.ELEMENT_NODE) {
    textEditors.push(setupEditorWithElement(elementOrSelector));
  } else {
    els = document.querySelectorAll(elementOrSelector);
    for (let i = 0; i < els.length; i++) {
      textEditors.push(setupEditorWithElement(els[i]));
    }
  }
  if (textEditors.length) {
    return emojiAutocompleteInner(textEditors);
  }
}

export default emojiAutocomplete;