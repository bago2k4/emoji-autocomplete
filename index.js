
import {emojiIndex} from "emoji-mart";

// import {default as TextArea} from "@textcomplete/contenteditable";
import { Textcomplete as textcompletecore } from "@textcomplete/core";
import { ContenteditableEditor as txtccontenteditor } from "@textcomplete/contenteditable";
import { TextareaEditor as txtctextarea } from "@textcomplete/textarea";
console.log("DBG @textcomplete/core", textcompletecore);
console.log("DBG    Textcomplete", Textcomplete);
console.log("DBG  @textcomplete/textarea", txtctextarea);
console.log("DBG   TextareaEditor", TextareaEditor);
console.log("DBG  @textcomplete/contenteditable", txtccontenteditor);
console.log("DBG   ContenteditableEditor", ContenteditableEditor);

function createHTMLUnicode(unicode){
  return "&#x"+unicode+";"
}
function unicodeChar(unicode){
  if (unicode.indexOf("-") > -1){
    var unicodes = unicode.split("-");
    return encodeURI(unicodes.map(createHTMLUnicode).join(""));
  }else{
    return encodeURI(createHTMLUnicode(unicode));
  }
}

function emojiAutocompleteInner(editors) {
  console.log("DBG emojiAutocompleteInner", editors);
  editors.forEach(editor => {
    console.log("DBG   editor", editor);
    var textComplete = new Textcomplete(editor, [{
      match: /\B:([\-+\w]{1,30})$/,
      search: function (term, callback) {
        callback(emojiIndex.search(term));
      },
      unicodeFromShortname: function(shortname){
        return emojiIndex.emojis[shortname].unified;
      },
      imageTemplate: function(unicode){
        return unicodeChar(unicode);
      },
      SVGImageFromShortname: function(shortname){
        return emojiIndex.emojis[shortname].unified;
      },
      PNGImageFromShortname: function(shortname){
        var unicode = this.unicodeFromShortname(shortname);
        return this.imageTemplate(unicode);
      },
      template: function (emoji) {
        // Load emoji images one by one
        return emoji.native +' '+emoji.colons;
      },
      replace: function (emoji) {
        var unicode = emoji.unified;
        return this.imageTemplate(unicode);
      },
      index: 1
    }],
    {
      zIndex: 1136,
      maxCount: 20
    });
  });


  // if (typeof elementOrSelectorel === "string" ||
  //     (elementOrSelector && elementOrSelector.nodeType && elementOrSelector.nodeType === Node.ELEMENT_NODE)) {
  //   $(elementOrSelector).textcomplete([ {
  //       match: /\B:([\-+\w]{1,30})$/,
  //       search: function (term, callback) {
  //         callback(emojiIndex.search(term));
  //       },
  //       unicodeFromShortname: function(shortname){
  //         return emojiIndex.emojis[shortname].unified;
  //       },
  //       imageTemplate: function(unicode){
  //         return unicodeChar(unicode);
  //       },
  //       SVGImageFromShortname: function(shortname){
  //         return emojiIndex.emojis[shortname].unified;
  //       },
  //       PNGImageFromShortname: function(shortname){
  //         var unicode = this.unicodeFromShortname(shortname);
  //         return this.imageTemplate(unicode);
  //       },
  //       template: function (emoji) {
  //         // Load emoji images one by one
  //         return emoji.native +' '+emoji.colons;
  //       },
  //       replace: function (emoji) {
  //         var unicode = emoji.unified;
  //         return this.imageTemplate(unicode);
  //       },
  //       index: 1
  //     }
  //     ],{
  //       zIndex: 1136,
  //       maxCount: 20
  //     })
  //   .on({'textComplete:select': function (e, value, strategy) {
  //     // This will make sure React inputs receive a change event
  //     // after the textcompletion has inserted new contents
  //     var event = new Event('input', { bubbles: true });
  //     strategy.el.dispatchEvent(event);
  //     }
  //   })
  // }
};

function emojiAutocomplete(elementOrSelector) {
  let textEditors = [],
      ret = [];
  if (elementOrSelector.nodeType && elementOrSelector.nodeType === Node.ELEMENT_NODE) {
    if (elementOrSelector.getAttribute("contenteditable")) {
      textEditors.push(new ContenteditableEditor(els[i]));
    }else if (elementOrSelector.nodeName.toLowerCase() === "textarea") {
      textEditors.push(new TextareaEditor(els[i]));
    }
  } else {
    els = document.querySelectorAll(elementOrSelector);
    for (let i = 0; i < els.length; i++) {
      textEditors.push(new ContenteditableEditor(els[i]));
    }
  }
  if (textEditors.length) {
    return emojiAutocompleteInner(textEditors);
  }
}

export default emojiAutocomplete;