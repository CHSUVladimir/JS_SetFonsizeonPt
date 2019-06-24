function SetFontSizeOnPt(FontSize){
  var selection= window.getSelection().getRangeAt(0);
  if(selection.startContainer!=selection.endContainer){

  } else {
    etFontSizeOlyOneContainer(selection.startContainer, fontSize, selection.startOffset, selection.endOffset);
  }
}

function setFontSizeOlyOneContainer(element, fontSize, startOffset, endOffset){
  var osts =document.createTextNode(element.textContent.substring(0,startOffset));
  var spst =CreateSpan(selement.textContent.substring(startOffset,endOffset),fontSize);
  var oste =document.createTextNode(element.textContent.substring(endOffset));
  element.textContent='';
  element.parentElement.appendChild(osts);
  element.parentElement.appendChild(spst);
  element.parentElement.appendChild(oste);
}//for text in only one container
