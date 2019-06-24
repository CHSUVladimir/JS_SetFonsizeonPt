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

//for text in only one container
function setFontSizeOlyOneContainer(element, fontSize, startOffset, endOffset){
  var osts =document.createTextNode(element.textContent.substring(0,startOffset));
  var spst =CreateSpan(selement.textContent.substring(startOffset,endOffset),fontSize);
  var oste =document.createTextNode(element.textContent.substring(endOffset));
  element.textContent='';
  element.parentElement.appendChild(osts);
  element.parentElement.appendChild(spst);
  element.parentElement.appendChild(oste);
}

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
    if(elementE.children.length>0){
       setFontSizeStart(elementE.children[0], fontSize, startOffset);

    }else{
       var ost =document.createTextNode(elementE.textContent.substring(0,startOffset));
       var spst =CreateSpan(elementE.textContent.substring(startOffset),fontSize);
       elementE.textContent='';
       elementE.parentElement.appendChild(ost);
       elementE.parentElement.appendChild( spst);
    }
  }
}

function CreateSpan(text, fs){
  var sp=document.createElement("span");
    sp.style.fontSize=fs+'pt';
    sp.innerHTML=text;
  return sp;
}

function setFontSize(element, fontSize){
  if(HasSpanElement(element)){
    if(element.children.length<1){
      element.style.fontSize=fontSize+'pt';
    }else{

    }
  }else{
    if(element.children.length>0){
      for(var i=0;i<element.children.length;i++){
				setFontSize(element.children[i], fontSize);
			}
    }else{
      var span= CreateSpan(element.textContent, fontSize);
			element.textContent='';
			element.parentElement.appendChild(span);
    }
  }
}

function HasSpanElement(element){
  var res = isElementSPAN(element);
  if(element.children.length>0){
     for(var i=0;i<element.children.length;i++){
       res= res||isElementSPAN(element.children[i]) || HasSpanElement(element.children[i]);
     }
    }
  return res;
}

function isElementSPAN(element){
  var res = false;
  try{
    res = element.tagName=='SPAN';
  }catch{}
  return res;
}
