function createPopup(popupText, diameter, PHO, closestapproach, approachdate, gifPath,) {
  const existingPopup = document.querySelector('.custom-popup');
  if (existingPopup) {
    document.body.removeChild(existingPopup);
  }

  // Create the popup element
  const popup = document.createElement('div');
  popup.classList.add('custom-popup'); // Add a class to easily identify this popup
  popup.style.position = 'absolute';
  popup.style.zIndex = '2000';
  popup.style.top = '50%';
  popup.style.left = '10%';
  popup.style.width = '300px';
  popup.style.height = '230px';
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.backgroundColor = 'rgba(15, 15, 17, 0.9)';
  popup.style.padding = '20px';
  popup.style.borderRadius = '7px';
  popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
  popup.style.display = 'flex';
  popup.style.flexDirection = 'column';
  popup.style.alignItems = 'center';  // Changed from 'centre' to 'center'
  popup.style.textAlign = 'left';  // Ensure text aligns to the left
  document.body.appendChild(popup);

  // Add popup text
  const popupTextElement = document.createElement('p');
  popupTextElement.textContent = popupText;
  popupTextElement.style.marginBottom = '10px';
  popupTextElement.style.color = 'white';
  popupTextElement.style.fontSize = '18px';
  popupTextElement.style.marginTop = '0';
  popup.appendChild(popupTextElement);

  // Add a GIF to the popup
  const gif = document.createElement('img');
  gif.src = gifPath;  // Path to the GIF image
  gif.style.height = '100px';
  gif.style.objectFit = 'contain';
  gif.style.marginBottom = '10px';
  popup.appendChild(gif);

  // Add PHO text
  const PHOElement = document.createElement('p');
  PHOElement.innerHTML = 'Diameter: ' + diameter + '<br>Chance of Impact: ' + PHO + '<br>Closest Approach: ' + closestapproach + '<br>Approach Date: ' + approachdate;
  PHOElement.style.marginBottom = '10px';
  PHOElement.style.color = 'white';
  PHOElement.style.fontSize = '18px';
  PHOElement.style.marginTop = '0';
  PHOElement.style.font = 'Arial';
  popup.appendChild(PHOElement);

  // Add the close button as an image
  const closeButton = document.createElement('img');
  closeButton.src = './gif/cross.png'; 
  closeButton.alt = 'Close'; 
  closeButton.style.position = 'absolute';
  closeButton.style.top = '10px';
  closeButton.style.right = '10px';
  closeButton.style.width = '20px'; 
  closeButton.style.height = '20px';
  closeButton.style.cursor = 'pointer';
  closeButton.onclick = () => {
    document.body.removeChild(popup);
  };
  popup.appendChild(closeButton);
}

export default createPopup;
