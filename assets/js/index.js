$('#add_user').on('submit', function (evt) {
    alert("data submitted successfully");
});


$('#update_user').on('submit', function (evt) {
    evt.preventDefault();
    var unindex_array = $(this).serializeArray();
    var data = {}
    $.map(unindex_array, (n, i) => {
        data[n['name']] = n['value']
    });
    console.log(data);

    var request = {
        "url": `http://localhost:8080/api/users/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function (response) {
        alert('Data updated successfully');
        location.href = "/";
    })
});

if (window.location.pathname == "/") {
    $onDelete = $('.table tbody td a.delete');
    $onDelete.click(function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var id = $(this).attr('data-id');
        var request = {
            "url": `http://localhost:8080/api/users/${id}`,
            "method": "DELETE"
        }
        if (confirm("Do you really want to delet the user data?")) {
            $.ajax(request).done(function (response) {
                alert("Data deleted successfully!")
            })
            location.reload();
        }
    })
}