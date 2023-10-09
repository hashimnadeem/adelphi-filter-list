// Call the Adelphi API and pass the received data onto the filterDirectoryDataList function
function getApi() {
  const url = "https://corsproxy.io/?https%3A%2F%2Fapi.adelphi.edu%2Fv1%2Fdepartments%2F";
  axios.get(url).then((response) => {
    filterDirectoryDataList(response);
    });
}

// Create and display the list of filtered directory data
function filterDirectoryDataList(apiInfo) {
  // Copy the API 'results' array to the directoryData variable to avoid repeated use of 'apiInfo.data.results'
  const directoryData = [...apiInfo.data.results];

  // Filter out the elements which have a number as their parent and store the results in filterParent
  const filterParent = directoryData.filter(data => data.parent === null);
  
  // Create a numbered list to organize each set of data
  const mainList = document.createElement("ol");

  // Travel through the filtered array and create lists to accommodate the data
  for (let i = 0; i < filterParent.length; i++) {
    const tList = document.createElement("li");
    
    // Create space between each set of data for better organization and readability
    tList.style.marginBottom = "20px";
    
    const uList = document.createElement("ul");
    
    // Search each element of the array; create and append its properties to the unordered list 
    for (let p in filterParent[i]) {
      const property = document.createElement("li");
      property.textContent = p + ": " + filterParent[i][p];
      uList.appendChild(property);
    }
    
    // Append the unordered list containing property data to its container
    tList.appendChild(uList);
    
    // Append the list to the main list, making it ready to be displayed onto the screen
    mainList.appendChild(tList);
  }
  
  // Append all of the main list and its contents to the body
  document.body.appendChild(mainList);
}

getApi();