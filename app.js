let myLeads = [];

const inputForm = document.querySelector("#input-form");

const inputUl = document.querySelector("#input-ul");

const saveBtn = document.querySelector("#input-btn");

const deleteBtn = document.querySelector("#delete-btn");

const saveTab = document.querySelector("#save-btn");

saveTab.addEventListener("click", function (tabs) {
  //get the link of the tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLists();
  });
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  renderLists();
});

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  renderLists();
}

saveBtn.addEventListener("click", function () {
  myLeads.push(inputForm.value);
  inputForm.value = "";

  localStorage.setItem("myLeads", JSON.stringify(myLeads));

  renderLists();

  console.log(localStorage.getItem("myLeads"));
});

function renderLists() {
  let listItems = "";
  for (let i = 0; i < myLeads.length; i++) {
    listItems += `<li>
    <a target='_blank' href='${myLeads[i]}'>
    ${myLeads[i]}
    </a>
    </li>`;
  }
  inputUl.innerHTML = listItems;
}
