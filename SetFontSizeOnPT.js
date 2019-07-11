function SetFontSizeOnPt(fontSize){
  var selection= window.getSelection().getRangeAt(0);
  var firstParagraph=getParentParagraph(selection.commonAncestorContainer, selection.startContainer);

  if(firstParagraph!=null){
    if(firstParagraph.textContent.trim()==selection.toString().trim()){
      console.log("only one");
      setFSParagraph(firstParagraph, fontSize);
    }else{
      setFSParagraphs(selection, fontSize)
    }
  }else{
    alert('Неправильно сформирован документ, попробуйте перезагрузить страницу!');
  }
}

function getParentParagraph(MaxParent, element){
  var res = null;
  var node;
  for (node = element; node; node = node.parentNode){
    if (node == MaxParent){
      if(isElementParagraph(node)){
        res=node;
      }
      break;
    }else{
      if(isElementParagraph(node)){
        res=node;
        break;
      }
    }
  }
  if(res==null){
    for(var i=0;i<10;i++){
      node = node.parentNode
      if(isElementParagraph(node)){
        res=node;
        break;
      }
    }
  }
  return res;
}

function removeFSInSpan(element){
  if(isElementSPAN(element)){
    element.style.fontSize='';
  }
  removeStyle(element);
  if(element.children.length){
    for(var i=0;i<element.children.length;i++)
      try{
      removeFSInSpan(element.children[i])
      }catch{

      }
  }
}

function removeStyle(element){
  try{
    if(element.style.length==0){
      element.removeAttribute('style');
    }
    var ena =!element.hasAttributes();
    if(isElementSPAN(element)&&ena){
      var ostn =document.createTextNode(element.textContent);
      element.parentElement.insertBefore(ostn,element);
      element.remove();
    }

  }catch{}
}

function setFSParagraph(par, fontSize){
  removeFSInSpan(par);
  par.style.fontSize=fontSize+'pt';
  console.log(par);
}

function getNextNode(node){
    if (node.firstChild)
        return node.firstChild;
    while (node){
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
    for (node = start; node; node = getNextNode(node)){
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

function getParagraphsInRange(range){
   var res=[];
  var fp =getParentParagraph(range.commonAncestorContainer, range.startContainer);
  if(fp!=null){
    res.push(fp);
  }
   var arrR=getNodesInRange(range);
  for(var i=0;i<arrR.length;i++){
    if(isElementParagraph(arrR[i])){
      res.push(arrR[i]);
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

function setFSParagraphs(range, fontSize){
  var phs = getParagraphsInRange(range);
  for(var i in phs){
    if(i==0){
      if(phs.length==1){
        setFSToContainers(getTextContainersInParagraph(range, phs[0]), fontSize, range.startOffset, range.endOffset);
      }else{
        setFSToContainers(getTextContainersInParagraph(range, phs[0]), fontSize, range.startOffset, null);
      }
    }else if(i==phs.length-1){
      setFSToContainers(getTextContainersInParagraph(range, phs[i]), fontSize, null, range.endOffset);
    }else{
      setFSParagraph(phs[i], fontSize);
    }
  }

}

function getTextContainersInParagraph(range, par){
  var res=[];
  var tc =getTextContainersInRange(range);
  for(var i in tc){
    if(getParentParagraph(range.commonAncestorContainer,tc[i])==par){
      res.push(tc[i]);
    }
  }
  return res;
}

function setFSToContainers(containers, fontSize, startOffset, endOffset ){
  for(var i in containers){
   if(i==0){
     if(containers.length==1){
       setFSWithOffsetContainer(containers[0], fontSize, startOffset, endOffset);
     }else{
       setFSWithOffsetContainer(containers[0], fontSize, startOffset, null);
     }
   }else if(i==containers.length-1){
     setFSWithOffsetContainer(containers[i], fontSize, null, endOffset);
   }else{
     setFSToAllContainer(containers[i], fontSize);
   }
  }
}

function setFSToAllContainer(container, fontSize){
  if(isElementSPAN(container.parentNode)){
    container.parentNode.style.fontSize= fontSize+'pt';
  }else{
    var sp=CreateSpan(container.textContent,fontSize);
    container.parentElement.insertBefore(sp,container);
    removetextContentContainer(container);

  }
}

function setFSWithOffsetContainer(container, fontSize, startOffset, endOffset){
  if(startOffset==null){
    startOffset=0;
  }
  if(endOffset==null){
    endOffset=container.textContent.length;
  }
  if(startOffset==0&&endOffset==container.textContent.length){
    setFSToAllContainer(container, fontSize);
  }else{
    if(startOffset==0){
      var spst =CreateSpan(container.textContent.substring(startOffset, endOffset),fontSize);
		  var ostk=document.createTextNode(container.textContent.substring(endOffset));
      container.parentElement.insertBefore(ostk,container);
      container.parentElement.insertBefore(spst,ostk);
      removetextContentContainer(container);
    }else if(endOffset==container.textContent.length){
      var ostn =document.createTextNode(container.textContent.substring(0,startOffset));
		  var spst =CreateSpan(container.textContent.substring(startOffset),fontSize);
      container.parentElement.insertBefore(spst,container);
			container.parentElement.insertBefore(ostn,spst);
      removetextContentContainer(container);
    }else{
      var ostn =document.createTextNode(container.textContent.substring(0,startOffset));
		  var spst =CreateSpan(container.textContent.substring(startOffset, endOffset),fontSize);
		  var ostk=document.createTextNode(container.textContent.substring(endOffset));
      container.parentElement.insertBefore(ostk,container);
      container.parentElement.insertBefore(spst,ostk);
			container.parentElement.insertBefore(ostn,spst);
      removetextContentContainer(container);
    }
  }
}

function removetextContentContainer(element){
  try{
      element.textContent=null;
        if(elem.nodeName=='#text'){
        element.remove();//it need thats no null text element
      }
      }catch{}
}
