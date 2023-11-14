document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('Download_Button').addEventListener('click', fetchData);
});

function fetchData() {
    clearUserBlocks();

    const fetchPromises = [];

    for (let i = 0; i < 5; i++) {
        fetchPromises.push(fetchUserData());
    }


    Promise.all(fetchPromises)
        .then(userDataArray => {

            userDataArray.forEach(userData => {
                createUserBlock(userData);
            });
        })
        .catch(error => {
            console.error('There was an error:', error);
        });
}

function fetchUserData() {

    return new Promise((resolve, reject) => {
        fetch('https://randomuser.me/api')
            .then(response => {
                if (!response.ok) {
                    reject(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(`There was a problem with the fetch operation: ${error}`);
            });
    });
}

function createUserBlock(userData) {
    const userBlock = document.createElement('div');
    userBlock.classList.add('userBlock');

    const userImage = document.createElement('img');
    userImage.classList.add('userImage');
    userBlock.appendChild(userImage);

    const userName = document.createElement('p');
    userName.id = 'userName';
    userBlock.appendChild(userName);

    const userCity = document.createElement('p');
    userCity.id = 'userCity';
    userBlock.appendChild(userCity);

    const userCountry = document.createElement('p');
    userCountry.id = 'userCountry';
    userBlock.appendChild(userCountry);

    const userPostcode = document.createElement('p');
    userPostcode.id = 'userPostcode';
    userBlock.appendChild(userPostcode);

    document.getElementById('userContainer').appendChild(userBlock);


    displayData(userData, userImage, userName, userCity, userCountry, userPostcode);
}

function displayData(data, userImage, userName, userCity, userCountry, userPostcode) {
    const user = data.results[0];
    const fullName = `${user.name.first} ${user.name.last}`;
    const city = user.location.city;
    const country = user.location.country;
    const postcode = user.location.postcode;
    const imageSrc = user.picture.thumbnail;

    userImage.src = imageSrc;
    userImage.alt = fullName;

    userName.innerHTML = `<strong>Name:</strong> ${fullName}`;
    userCity.innerHTML = `<strong>City:</strong> ${city}`;
    userCountry.innerHTML = `<strong>Country:</strong> ${country}`;
    userPostcode.innerHTML = `<strong>Postcode:</strong> ${postcode}`;
}

function clearUserBlocks() {
    const userContainer = document.getElementById('userContainer');
    while (userContainer.firstChild) {
        userContainer.removeChild(userContainer.firstChild);
    }
}
