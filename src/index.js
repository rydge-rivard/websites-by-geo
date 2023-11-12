let map = "";
let service = "";
let infowindow = "";
const supermarkets = [];
const prospectList = [];

function initialize() {
  const simcoe = new google.maps.LatLng(42.8373, -80.304042);

  map = new google.maps.Map(document.getElementById("map"), {
    center: simcoe,
    zoom: 15,
  });

  let request = {
    // location: simcoe,
    // radius: "5",
    query: "butcher shop simcoe on canada",
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, createSupermarketList);
}

function createSupermarketList(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
      let place = results[i];
      supermarkets.push(place);
    }
  }
  getQueryData();
  console.log(prospectList);
}

function getQueryData() {
  getProspectIds(supermarkets).forEach((prospect) => {
    getProspectData(prospect);
  });
}

function getProspectIds(areaSearch) {
  prospectIds = [];

  supermarkets.forEach((prospect) => {
    prospectIds.push(prospect.place_id);
  });
  return prospectIds;
}

function getProspectData(placeId) {
  let request = {
    placeId: placeId,
    fields: [
      "name",
      "formatted_address",
      "website",
      "business_status",
      "international_phone_number",
      "type",
    ],
  };
  prospect = new google.maps.places.PlacesService(map);
  prospect.getDetails(request, createProspectList);
}

function createProspectList(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    prospectList.push(results);
    console.log(prospectList);
  }
}
