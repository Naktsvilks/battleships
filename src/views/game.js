function tableClick(event) {
    event = event || window.event;
    const target = event.target || event.srcElement;
    coords = target.id.split('_');

    fetch('', {
        method: 'POST',
        body: JSON.stringify({ x: coords[0], y: coords[1] }),
        headers: { 'content-type': 'application/json; charset=UTF-8' },
    })
        .then((data) => data.json())
        .then((res) => {
            console.log(res);
            if (res.status === 'miss') {
                target.style.background = 'red';
            } else {
                target.style.background = 'green';
            }
        })
        .catch((error) => console.error(error));
}

var table = document.getElementById('game');
var cells = table.getElementsByTagName('td');
for (var i = 0; i < cells.length; i++) {
    cells[i].onclick = tableClick;
}
