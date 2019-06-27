function SetFontSizeOnPt(fontSize){
  var selection= window.getSelection().getRangeAt(0);
  var tcon = getTextContainersInRange(selection);
  var scon =getSpansInRange(selection);

  if(tcon.length>0){
    if(tcon.length==1){
       setFontSizeOnlyOneContainer(tcon[0], fontSize, selection.startOffset, selection.endOffset);
    }else{
      for(var i=0;i<tcon.length;i++){
       // console.log(tcon[i]);
       // console.log(getParentSpan(selection,tcon[i]));
        if(i==0){
          setFontSizeOnlyOneContainer(tcon[0], fontSize, selection.startOffset, null);
        }else if(i==tcon.length-1){
          setFontSizeOnlyOneContainer(tcon[i], fontSize, null, selection.endOffset);
        }else{
           setFontSizeOnlyOneContainer(tcon[i], fontSize, null, null);
        }
      }
    }
  }

  for(var i=0;i<scon.length;i++){
    //console.log(scon[i]);
    if(scon[i].textContent.length==0){
      scon[i].remove();
    }
    if(getParentSpan(selection,scon[i])!=null){
      console.log(getParentSpan(selection,scon[i]));
    }
    if(scon[i].childNodes.length>0){

      for(var j=0;j<scon[i].childNodes.length;j++){
        if(scon[i].childNodes[j].textContent.length==0){
          scon[i].childNodes[j].remove();
        }else{
          if(isElementSPAN(scon[i].childNodes[j])){
            //console.log(scon[i].childNodes[j].innerHTML)
          }

        }
      }
    }
  }

}

function setFontSizeOnlyOneContainer(element, fontSize, startOffset, endOffset){
  var startT=0;
  var endT =element.textContent.length;
  if(startOffset!=null){
    startT=startOffset;
  }
  if(endOffset!=null){
    endT=endOffset;
  }

  RemoveAnotherSpan(element, fontSize, startT, endT);

	var eSpan =isElementSPAN(element)||isElementSPAN(element.parentElement);
	var allE =startT==0 && endT==element.parentElement.textContent.length;
	if(eSpan&&allE){
		if(isElementSPAN(element)){
			element.style.fontSize=fontSize+'pt';
		}else{
			element.parentElement.style.fontSize=fontSize+'pt';
		}
	}else{
		var ostn =document.createTextNode(element.textContent.substring(0,startT));
		var spst =CreateSpan(element.textContent.substring(startT, endT),fontSize);
		var ostk=document.createTextNode(element.textContent.substring(endT));
		if(isElementSPAN(element)){
      element.insertBefore(ostk,element);
      element.insertBefore(spst,ostk);
			element.insertBefore(ostn,spst);
		}else{
       element.parentElement.insertBefore(ostk,element);
       element.parentElement.insertBefore(spst,ostk);
			 element.parentElement.insertBefore(ostn,spst);

      try{
      element.textContent=null;
        if(elem.nodeName=='#text'){
        element.remove();//it need thats no null text element
      }
      }catch{}


		}

	}

}//for text in only one

function RemoveAnotherSpan(element, fontSize, startOffset, endOffset){
  if(startOffset==0&&endOffset==element.textContent.length){
    if(isElementSPAN(element)){

       }else if(isElementSPAN(element.parentElement)&&isElementSPAN(element.parentElement.parentElement)){
          //&&element.parentElement.parentElement.style.fontSize==fontSize+'pt'
    //console.log(element.parentElement);
  }
}
}

function isElementSPAN(element){
  var res = false;
  try{
    res = element.tagName=='SPAN';
  }catch{}
  return res;
}

function CreateSpan(text, fs){
  var sp=document.createElement("span");
    sp.style.fontSize=fs+'pt';
    sp.innerHTML=text;
  return sp;
}

function getNextNode(node){
    if (node.firstChild)
        return node.firstChild;
    while (node)
    {
        if (node.nextSibling)
            return node.nextSibling;
        node = node.parentNode;
    }
}

function getNodesInRange(range){
    var start = range.startContainer;
    var end = range.endContainer;
    var commonAncestor = range.commonAncestorContainer;
    var nodes = [];
    var node;

    for (node = start; node; node = getNextNode(node))
    {
        nodes.push(node);
        if (node == end)
            break;
    }

    return nodes;
}

function getTextContainersInRange(range){
  var res=[];
  var arrR=getNodesInRange(range);
   for(var i=0;i<arrR.length;i++){
     if(arrR[i].nodeName=='#text' && arrR[i].textContent.length>0){
       res.push(arrR[i]);
     }
   }
  return res;
}

function getSpansInRange(range){
   var res=[];
   var arrR=getNodesInRange(range);
  for(var i=0;i<arrR.length;i++){
    if(isElementSPAN(arrR[i])){
      res.push(arrR[i]);
    }
  }

  return res;
}

function getParentSpan(range,element){
  var res=null;
  var start = range.startContainer;
  var end = range.commonAncestorContainer;
  var commonAncestor = range.commonAncestorContainer;
  var node;
  var i=0;
  for (node = element; node; node = node.parentNode){
    if (node == end){break;}else{
      if(isElementSPAN(node)&&i>0){
        res=node;
        break;
      }
    }
    i++;
  }


  return res;
}
