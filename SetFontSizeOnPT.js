function SetFontSizeOnPt(fontSize){
  var selection= window.getSelection().getRangeAt(0);
  if(selection.startContainer!=selection.endContainer){
    if(GetParentParagraph(selection.startContainer.parentElement)!=GetParentParagraph(selection.endContainer.parentElement)){

    }else{
       //console.log(selection.startContainer);
      var elem = selection.startContainer.parentElement;
      setFontSize(elem, fontSize, selection.startOffset, null);
      //console.log(elem);
      elem = elem.nextSibling;
      //console.log(elem);
      while(elem!=selection.endContainer){
        console.log(elem);
        console.log(elem.nextSibling);
      setFontSize(elem, fontSize, null, null);
        if(elem.nextSibling!=null){
          elem = elem.nextSibling;
        }else{
          console.log(elem);
          elem=elem.parentElement;
        }
       /* if(elem.nodeName!='#text'){
          elem = elem.nextSibling;
        }else{
          elem=elem.parentElement;
        }   */

        if(elem.nodeName=='#text'){
           console.log(elem.nodeName);
           console.log(elem);
        }
      }
      setFontSize(elem, fontSize, null, selection.endOffset);
    }
  }else{
    setFontSizeOnlyOneContainer(selection.startContainer, fontSize, selection.startOffset, selection.endOffset);
  }
}

function setFontSizeOnlyOneContainer(element, fontSize, startOffset, endOffset){
	var eSpan =isElementSPAN(element)||isElementSPAN(element.parentElement);
	var allE =startOffset==0 && endOffset==element.textContent.length;
	if(eSpan&&allE){
		if(isElementSPAN(element)){
			element.style.fontSize=fontSize+'pt';
		}else{
			element.parentElement.style.fontSize=fontSize+'pt';
		}
	}else{

		var ostn =document.createTextNode(element.textContent.substring(0,startOffset));
		var spst =CreateSpan(element.textContent.substring(startOffset, endOffset),fontSize);
		var ostk=document.createTextNode(element.textContent.substring(endOffset));
		element.textContent=null;
		if(isElementSPAN(element)){
			element.appendChild(ostn);
			element.appendChild(spst);
			element.appendChild(ostk);
		}else{
			element.parentElement.appendChild(ostn);
			element.parentElement.appendChild(spst);
			element.parentElement.appendChild(ostk);
      element.remove();//it need thats no null text element
		}

	}
}//for text in only one

function setFontSize(element, fontSize, startOffset, endOffset){
  if(element!=null){
    var startT=0;
  var endT =element.textContent.length;
  if(startOffset!=null){
    startT=startOffset;
  }
  if(endOffset!=null){
    endT=endOffset;
  }
  removeFontSize(element);
  setFontSizeOnlyOneContainer(element, fontSize, startT, endT);
  }


}//for all elements

function removeFontSize(element){
  try{
    if(element.children){
      var chiS=getChildSpans(element);
      for(var i=0;i<chiS.length;i++){
        if(chiS[i].style.fontSize && chiS[i].style.length==1){
          if(chiS[i].children>0||chiS[i].textContent.length>0){
              var tC =document.createTextNode(chiS[i].textContent);
              element.parentElement.insertBefore(tC,chiS[i]);
              chiS[i].remove();
          }else{
            chiS[i].remove();
          }

        }else{
          chiS[i].style.fontSize='';
        }
      }
    }
  }catch{}
}

function getChildSpans(element){
  try{
    if(element.children){
      var res =[];
      for(var i=0; i<element.children.length;i++){
        if(isElementSPAN(element.children[i])){
          res.push(element.children[i]);
          var cha =getChildSpans(element.children[i]);
          for(var j=0;j<cha.length;j++){
            res.push(cha[j]);
          }

        }
      }
      return res;
    }
  }catch{}
}

function setFontSizeForChildsSpans(element){
  try{}catch{}
}

function HasSpanElement(element){
  var res = isElementSPAN(element);
  if(element!=null&&element.children&&element.children.length>0){
     for(var i=0;i<element.children.length;i++){
       res= res||isElementSPAN(element.children[i]) || HasSpanElement(element.children[i]);
     }
    }
  return res;
}

function CreateSpan(text, fs){
  var sp=document.createElement("span");
    sp.style.fontSize=fs+'pt';
    sp.innerHTML=text;
  return sp;
}

function isElementSPAN(element){
  var res = false;
  try{
    res = element.tagName=='SPAN';
  }catch{}
  return res;
}

function GetParentParagraph(element){
 // console.log('who find');
  //console.log(element);
  var res =element;
  if(element.tagName){
    if(element.tagName!='P'){
      //console.log('wehre find');
     // console.log(element.parentElement);
      res = GetParentParagraph(element.parentElement);

    }
  }else{
    res = GetParentParagraph(element.parentElement);
  }
  return res;
}

function ContainsChild(parentE, child){
  var res = parentE==child;
  if(!res&&parentE.children){
    for(var i=0; i<parentE.children.length;i++){
      res=res||ContainsChild(parentE.children[i],child);
      if(res){
        break;
      }
    }
  }

  return res;
}

function getNextElementInParent(element){
  var res=null;
  try{
    for(var i=0;i<element.parentElement.children.length;i++){
      if(element.parentElement.children[i]==element){
        if(element.parentElement.children[i+1]!=null){
          return element.parentElement.children[i+1];
        }else{
          var mayGo =GetParentParagraph(element)!=null &&GetParentParagraph(element.parentElement)!=null&&GetParentParagraph(element)==GetParentParagraph(element.parentElement);
          if(mayGo ){
            return getNextElementInParent(element.parentElement);
          }else{
            return null;
          }
        }
      }
    }
  }catch{}
  return res;
}
