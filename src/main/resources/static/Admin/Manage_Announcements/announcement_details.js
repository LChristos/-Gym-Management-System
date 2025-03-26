let parameters = new URLSearchParams(window.location.search);
let id = parameters.get('id');

let announcement_title = document.getElementById('title');
let announcement_body = document.getElementById('body');

fetch('http://localhost:8080/managearticles/' + id, { method: 'GET' })
.then(response => response.json())
.then(data => {
    announcement_title.value = data.title;
    announcement_body.value = data.body;
})
.catch(error => console.error('Error fetching announcement:', error));

document.getElementById('announcement_info').addEventListener('submit' , function(event) {
    event.preventDefault();
    let announcement_data = {
        id: id,
        title: document.getElementById('title').value,
        body: document.getElementById('body').value
    }

    fetch('http://localhost:8080/managearticles/change' , {
        method: 'POST' ,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(announcement_data)
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
        document.location.href = "/API/static/Admin/Manage_Announcements/announcement.html";
    })
    .catch(error => {
        alert(error.message);
        console.log('Error:' , error);
    })
})