(function() {
  const inputTextarea = document.querySelector('#textarea_input');
  const startButton = document.querySelector('#button-start');
  const outputTree = document.querySelector('#output');
  

  inputTextarea.addEventListener('click', function() {
    inputTextarea.textContent = '';
  })

  startButton.addEventListener('click', function() {
    const inputData = inputTextarea.value;
    const inputParsedData = parseData(inputData);

    createTreeBranch(inputParsedData, outputTree);

    let treeItemsCollection = document.querySelectorAll('.output__tree-item');
    console.log(treeItemsCollection);
    
    treeItemsCollection.forEach((item, index) => {
      item.onmousedown = function(event) {
        event.stopPropagation();

        let shiftX = event.clientX - item.getBoundingClientRect().left;
        let shiftY = event.clientY - item.getBoundingClientRect().top;

        item.style.position = 'absolute';
        item.style.zIndex = 1000;

        function moveAt(pageX, pageY) {
          item.style.left = pageX - shiftX + 'px';
          item.style.top = pageY - shiftY + 'px';
        }

        let currentDroppable = null;

        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);

          item.hidden = true;
          let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
          item.hidden = false;

          if (!elemBelow) return;

          let droppableBelow = elemBelow.closest('.output__tree-item');

          if (currentDroppable != droppableBelow) {
            if (currentDroppable) {
              // логика обработки процесса "вылета" из droppable (удаляем подсветку)
              leaveDroppable(currentDroppable);
            }
            currentDroppable = droppableBelow;
            
            if (currentDroppable) {
              // логика обработки процесса, когда мы "влетаем" в элемент droppable
              enterDroppable(currentDroppable);
            }
          }
        }

        document.addEventListener('mousemove', onMouseMove);

        item.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          item.onmouseup = null;
        };
      };

      function enterDroppable(elem) {
        elem.style.borderBottom = '2px solid #0000FF';
      }
  
      function leaveDroppable(elem) {
        elem.style.borderBottom = '2px solid transparent';
      }

      item.ondragstart = function() {
        return false;
      };
    })

  })

  

  function parseData(string) {
    return JSON.parse(string);
  }

  function createTreeBranch(obj, container) {
    const treeBranch = document.createElement('ul');
    treeBranch.classList.add('output__tree');
    container.appendChild(treeBranch);
    
    for (let [key, value] of Object.entries(obj)) {
      
      const treeItem = document.createElement('li');
      treeItem.classList.add('output__tree-item');
      treeItem.textContent = `"${key}": "${value}"`;
      treeBranch.appendChild(treeItem);

      if (typeof value === 'object') {
        treeItem.textContent = `"${key}":`;
        createTreeBranch(value, treeItem);
      } 
    }
  }

}());