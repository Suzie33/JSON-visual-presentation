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