function changeTab(index) {
    const tabItems = document.querySelectorAll('.tab-item');
    const tabButtons = document.querySelectorAll('.tab-button');

    tabItems.forEach(item => {
      item.classList.remove('active');
    });

    tabButtons.forEach(button => {
      button.classList.remove('active');
    });

    tabItems[index].classList.add('active');
    tabButtons[index].classList.add('active');
  }
  
  //JPEG TO PDF
  const fileInput = document.getElementById('file-input');
  const previewContainer = document.getElementById('preview');
  const convertBtn = document.getElementById('convert-btn');

  fileInput.addEventListener('change', handleFileSelect);
  convertBtn.addEventListener('click', convertToPDF);

  function handleFileSelect(event) {
    const files = event.target.files;
    previewContainer.innerHTML = '';

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = function(event) {
        const imageSrc = event.target.result;
        const imgElement = document.createElement('img');
        imgElement.className = 'preview-image';
        imgElement.src = imageSrc;
        previewContainer.appendChild(imgElement);
      };

      reader.readAsDataURL(file);
    }
  }

  function convertToPDF() {
    const doc = new jsPDF();

    const images = document.querySelectorAll('.preview-image');
    const imagePromises = [];

    images.forEach((image) => {
      const promise = new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        ctx.drawImage(image, 0, 0);

        const dataURL = canvas.toDataURL('image/jpeg');
        resolve(dataURL);
      });

      imagePromises.push(promise);
    });

    Promise.all(imagePromises).then((imageDataUrls) => {
      imageDataUrls.forEach((dataURL) => {
        doc.addImage(dataURL, 'JPEG', 10, 10, 190, 0);
        if (dataURL !== imageDataUrls[imageDataUrls.length - 1]) {
          doc.addPage();
        }
      });

      doc.save('converted.pdf');

      location.reload(); // Reload the page after conversion
      
    });
  }
  
  function handleFileSelect(event) {
    const files = event.target.files;
    previewContainer.innerHTML = '';

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = function(event) {
        const imageSrc = event.target.result;
        const imgContainer = document.createElement('div');
        imgContainer.className = 'image-container';

        const imgElement = document.createElement('img');
        imgElement.className = 'preview-image';
        imgElement.src = imageSrc;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = 'X';

        deleteBtn.addEventListener('click', function() {
          imgContainer.remove();
        });

        imgContainer.appendChild(imgElement);
        imgContainer.appendChild(deleteBtn);
        previewContainer.appendChild(imgContainer);
      };

      reader.readAsDataURL(file);
    }
  }


  document.addEventListener('DOMContentLoaded', function(){
      const textArray = ['Convert multiple JPEG images to a single PDF document.', 
      'Intuitive and user-friendly interface for a seamless experience.', 
      'Ensure the security of your data during the conversion process.',
      'Download your converted PDF with just one click.',
      'Efficiently manage your digital documents with our powerful tools.'
      ];

      let textIndex = 0;
      let textChar = 0;
      const dynamicAlert = document.getElementById('dynamicAlert');

      function type(){
          if(textIndex === textArray.length){
              textIndex = 0;
          }

          const currentText = textArray[textIndex];
          dynamicAlert.innerText = currentText.slice(0, textChar)
          textChar++

          if (textChar <= currentText.length){
              setTimeout(type, 100);
          } else {
              setTimeout(erase, 1000)
          }
      } 

      function erase() {
      if (textChar >= 0) {
        const currentText = textArray[textIndex];
        dynamicAlert.innerHTML = currentText.slice(0, textChar);
        textChar--;
        setTimeout(erase, 50); // Adjust the erasing speed here
      } else {
        textChar = 0;
        textIndex++;
        setTimeout(type, 1000); // Pause before typing the next heading
      }
    }

        type()
  })