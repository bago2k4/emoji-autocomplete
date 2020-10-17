
import {emojiIndex} from "emoji-mart";

import { Textcomplete } from "@textcomplete/core";

import { ContenteditableEditor } from "@textcomplete/contenteditable";

import { TextareaEditor } from "@textcomplete/textarea";

// import { Textcomplete as textcompletecore } from "@textcomplete/core";
// import { ContenteditableEditor as txtccontenteditor } from "@textcomplete/contenteditable";
// import { TextareaEditor as txtctextarea } from "@textcomplete/textarea";

// function createHTMLUnicode(unicode){
//   return "&#x"+unicode+";";
// }

// function unicodeChar(unicode){
//   if (unicode.indexOf("-") > -1){
//     var unicodes = unicode.split("-");
//     return encodeURI(unicodes.map(createHTMLUnicode).join(""));
//   } else {
//     return encodeURI(createHTMLUnicode(unicode));
//   }
// }

function emojiAutocompleteInner(editors) {
  return editors.map(editor => {
    var txtComp = new Textcomplete(editor, [{
      match: /\B:([\-+\w]{1,30})$/,
      search: function (term, callback) {
        callback(emojiIndex.search(term));
      },
      // unicodeFromShortname: function(shortname){
      //   return emojiIndex.emojis[shortname].unified;
      // },
      // imageTemplate: function(unicode){
      //   return unicodeChar(unicode);
      // },
      // SVGImageFromShortname: function(shortname){
      //   return emojiIndex.emojis[shortname].unified;
      // },
      // PNGImageFromShortname: function(shortname){
      //   var unicode = this.unicodeFromShortname(shortname);
      //   return this.imageTemplate(unicode);
      // },
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