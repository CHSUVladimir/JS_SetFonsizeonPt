function SetFontSizeOnPt(FontSize){
  var selection= window.getSelection().getRangeAt(0);
  if(selection.startContainer!=selection.endContainer){
    if(GetParentParagraph(selection.startContainer.parentElement)!=GetParentParagraph(selection.endContainer.parentElement)){

    }else{
      var elem = selection.startContainer.parentElement;

    }

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

function GetParentParagraph(element){
  var res =element;
  if(element.tagName){
    if(element.tagName!='P'){
      res = GetParentParagraph(element.parentElement);
    }
  }else{
    res = GetParentParagraph(element.parentElement);
  } 
  return res;
}

function setFontSizeStart(elementE, fontSize, startOffset){
  if(startOffset==0){

  }else{

  }
}
