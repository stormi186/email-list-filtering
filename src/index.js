import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let content1, content2, content;

const ImportFromFileBodyComponent = () => {
  let fileReader;

  const handleFileRead1 = (e) => {
      content1 = fileReader.result.split("\n");
  };

  const handleFileRead2 = (e) => {
    content2 = fileReader.result.split("\n");
    content = content1.filter(f => !content2.includes(f));
    let newList = content.map((item) => item + "\n");
    const superBuffer = new Blob(newList, {type : 'text/html'});
    let objUrl = window.URL.createObjectURL(superBuffer);
    let anchor = document.createElement('a');
    anchor.href = objUrl;
    anchor.setAttribute('download', 'newlist.txt');
    anchor.click();
};

  const handleFileChosen1 = (file) => {
      fileReader = new FileReader();
      fileReader.onloadend = handleFileRead1;
      fileReader.readAsText(file);
  };

  const handleFileChosen2 = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead2;
    fileReader.readAsText(file);
};

  return (
  <div>
    <div className='upload-list1'>
    <h1>Main email list in .txt format</h1>
      <input type='file'
             id='list1'
             className='input-list1'
             accept='.txt'
             onChange={e => handleFileChosen1(e.target.files[0])}
      />
    </div>
    <div className='upload-list2'>
    <h1>List of emails to be deleted in .txt format</h1>
      <input type='file'
             id='list2'
             className='input-list2'
             accept='.txt'
             onChange={e => handleFileChosen2(e.target.files[0])}
      />
    </div>     
  </div>);

};

const App = () => {

  return (
    <div>
      <ImportFromFileBodyComponent />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)


