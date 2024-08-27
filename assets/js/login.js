$(document).ready(function () {
    $('#form').submit(function (e) {
        e.preventDefault(); // Prevent the default form submission

        const formData = {
            email: $('#email').val(),
            password: $('#password').val()
        };

        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: formData,
            success: function (response) {
                console.log("resss",response);
                
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: response.message
                }).then(() => {
                    window.location.href = '/';
                });
            },
            error: function (xhr) {
                const response = xhr.responseJSON;
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.message
                });
            }
        });
    });
});
