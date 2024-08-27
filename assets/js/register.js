$(document).ready(function () {
    $('#form').submit(function (e) {
        e.preventDefault(); // Prevent the default form submission

        const formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
            profession: $('#profession').val(),
            password: $('#password').val(),
            confirmPassword: $('#confirmPassword').val()
        };

        $.ajax({
            url: '/api/register',
            type: 'POST',
            data: formData,
            success: function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: response.message
                }).then(() => {
                    window.location.href = '/login';
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
