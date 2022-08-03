
let newElement,count = 1;
function DragStart(e){
   let style;
   if(e.target.innerText === 'A' || e.target.innerText === 'B' || e.target.innerText === 'C' || e.target.innerText === 'E' || e.target.innerText === 'F' || e.target.innerText === 'D'){
     style = 'empty';
   }
   else {
     style = 'operand'
   }

   e.target.classList.add('hold');
   newElement = document.createElement("div");

   //   set innertext
   newElement.innerHTML = `<p>${e.target.innerText}</p>`;
   newElement.setAttribute("data-value" , e.target.getAttribute("data-value"));
   let span = document.createElement("span");
 
 
   span.innerText = "X";    // add inner text
 
   // add classes
   span.classList.add("close");
   newElement.classList.add(`${style}`);
   newElement.setAttribute("id", `empty-${count++}`);
   newElement.append(span);  // append create new element

}


function DragEnd(e){
  e.target.classList.remove("hold");
}

function DragOver(e){
  e.preventDefault();
}

function DragEnter(e){
   e.target.classList.add("hovered");
}

function DragLeave(e){
  e.target.classList.remove("hovered");
}

function DragDrop(e){
    e.target.classList.remove("hovered");
  e.target.appendChild(newElement);
  const closeBtns = document.querySelectorAll(".close");
  removeElements(closeBtns);
}

// dragDrop
function removeElements(closeBtns) {
    if(closeBtns) {
    closeBtns.forEach(close => {
        close.addEventListener("click" , removeDraggedElement);
    })
    }
}

// remove Dragged element functoin
function removeDraggedElement(e) {
    let parentNode = e.target.parentNode;
    parentNode.style.transform = "scale(0)";
    parentNode.style.transition = "all .1s ease";
    setTimeout(() => {
    e.target.parentNode.remove();
    }, 500);
}

export {
    DragStart,
    DragEnd,
    DragOver,
    DragEnter,
    DragLeave,
    DragDrop
}