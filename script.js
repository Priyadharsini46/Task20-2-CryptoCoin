let jsonData;
async function getData() {
  jsonData = await fetch("https://api.coincap.io/v2/assets", {
    method: "GET",
  });
  jsonData = await jsonData.json();
  jsonData = jsonData.data;
  displayCrpto(jsonData);
  contentDisplay([jsonData[0]]);
}

getData();

async function displayCrpto(allData) {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  allData.forEach((data) => {
    container.innerHTML +=
      ` 
		  <div class="col-6">
		  <div class="row">
			<div class="col">
			<a href="#" onclick=singleCoin('` +
      data.id +
      `')>${data.id}</a>
			  
			</div>
			<div class="col">
			  ${data.name}
			</div>
			<div class="col">
			  ${data.priceUsd}
			</div>
		  </div>
		  
		</div>`;
  });
}

function contentDisplay(allData) {
  var content = document.querySelector(".content");
  content.innerHTML = "";
  allData.forEach((data) => {
    content.innerHTML += `<div class="col-sm">
		  <div class="content">
			<div class="col-6">
				<div><p>${data.id.toUpperCase()}</p></div>
			<div><span>Rank:</span> ${data.rank}</div>
			<div><span>symbol:</span>${data.symbol}</div>
			<div><span>name:</span> ${data.name}</div>
			<div><span>supply:</span> ${data.supply}</div>
			<div><span>maxSupply:</span> ${data.maxSupply}</div>
			<div><span>marketCapUsd:</span> ${data.marketCapUsd}</div>
			<div><span>volumeUsd24Hr:</span> ${data.volumeUsd24Hr}</div>
			<div><span>priceUsd:</span> ${data.priceUsd}</div>
			<div><span>changePercent24Hr:</span> ${data.changePercent24Hr}</div>
			<div><span>vwap24Hr:</span> ${data.vwap24Hr}</div>
			<div><span >explorer:</span><a href="${data.explorer}"> ${
      data.explorer
    } </a></div>
		</div>
		  </div>
		</div>`;
  });
}

async function singleCoin(id) {
  jsonData.forEach((single) => {
    if (single.id == id) {
      contentDisplay([single]);
    }
  });
}

async function searchTitle(searchVal) {
  try {
    searchVal = searchVal.value;
    if (searchVal.length > 0) {
      let foundData = [];
      for (var i = 0; i < jsonData.length; i++) {
        if (jsonData[i].id == searchVal) {
          foundData.push(jsonData[i]);
          console.log(jsonData[i]);
        }
      }
      if (foundData.length > 0) {
        displayCrpto(foundData);
      } else {
        let container = document.getElementsByClassName(".container");
        container.innerHTML = "<p class='text-center'>No result found</p>";
      }
    } else {
      displayCrpto(jsonData);
    }
  } catch (e) {
    console.log("err in searchTitle func", e);
  }
}

document.addEventListener("keyup", logKey);
function logKey(e) {
	var keyCode = e.which;
	var keyVal = e.key;
  
	if (keyCode == "187" || keyCode == "13") {
	  searchTitle(searchVal);
	} else {
	  getVal(keyVal);
	}
  }
  
