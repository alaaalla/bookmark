var siteName = document.querySelector("#siteName");
var siteURL = document.querySelector("#siteURL");
var error = document.querySelector(".boxContainer");
var closeBox = document.querySelector("#closeBtn");
var errorBox = document.querySelector(".box-content")
var sitesList;
siteName.addEventListener("input", validateName);
siteURL.addEventListener("input", validateURL);
localStorage.getItem("sitesList") == null ? sitesList = [] : sitesList = JSON.parse(localStorage.getItem("sitesList"));
displaySite(sitesList);
var submit = document.querySelector("#submit");
submit.addEventListener("click", submitData);
function submitData() {
    site = {
        name: siteName.value,
        url: siteURL.value
    }
    if (validateName() && validateURL()) {
        sitesList.push(site);
        localStorage.setItem("sitesList", JSON.stringify(sitesList));
        displaySite(sitesList);
        validateName();
        clearInput();
    }
    else {
        error.classList.replace("d-none", "d-flex");
    }
}
function clearInput() {
    siteName.value = '',
        siteURL.value = ''
}
function displaySite(data) {
    var cartona = '';
    for (var i = 0; i < data.length; i++) {
        cartona += `<tr><td>${i + 1}</td>
    <td>${data[i].name}</td>
    <td><button id="visit" class="btn text-light" onclick="visit(${i})"><i class="fa-solid fa-eye"></i> Visit</button></td>
    <td><button class="btn delete btn-danger" onclick="Delete(${i})"><i class="fa-solid fa-trash"></i> Delete</button></td></td>`;
    }
    document.getElementById("content").innerHTML = cartona;
}
function visit(i) {
    window.open(sitesList[i].url);
}
function Delete(index) {
    sitesList.splice(index, 1)
    localStorage.setItem("sitesList", JSON.stringify(sitesList));
    displaySite(sitesList);
}
function validateName() {
    var regex = /^[a-z]{3,}/ig
    if (regex.test(siteName.value)) {
        siteName.classList.replace("is-invalid", "is-valid");
        return true;
    }
    else {
        document.querySelector("#siteName").classList.add("is-invalid")
        return false;
    }
}
function validateURL() {
    var regex =
        /^(http(s):\/\/.)[\w\W]{2,256}\.[a-z]{2,6}\b([\w@:%_\+.~#?&\/\/=]*)$/
    // var link = /(https:\/\www\.|http:\/\/www\.|https:\/\/|http:\/\/)\w{2,}\.\w{2,}\.\w{2,}(\.\w{2,})?

    if (regex.test(siteURL.value)) {
        siteURL.classList.replace("is-invalid", "is-valid");
        return true;
    }
    else {
        siteURL.classList.add("is-invalid")
        return false;
    }
}
closeBox.addEventListener("click", close);
function close() {
    error.classList.replace("d-flex", "d-none")
}
error.addEventListener("click", function (event) {
    if (event.target != errorBox) {
        close();
    }
})
document.addEventListener("keyup", function (event) {
    if (error.classList.contains("d-flex")) {
        if (event.key = "Escape") close()
    }
})