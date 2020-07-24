(function() {
  const inputTextarea = document.querySelector('#textarea_input');
  const startButton = document.querySelector('#button-start');
  const outputTree = document.querySelector('#output__tree');
  let inputData = '';

  inputTextarea.addEventListener('click', function() {
    inputTextarea.textContent = '';
  })

  startButton.addEventListener('click', function() {
    let inputParsedData = '';

    inputData = inputTextarea.value;
    inputParsedData = JSON.parse(inputData);

    for (let [key, value] of Object.entries(inputParsedData)) {
      const treeItem = document.createElement('li');
      treeItem.classList.add('output__tree-item');
      treeItem.textContent = `"${key}": "${value}"`;
      outputTree.appendChild(treeItem);
    }
  })

}());