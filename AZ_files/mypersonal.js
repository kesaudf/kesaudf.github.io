    function passwd() {

            var password = prompt('Enter the password to download the file:');
            if (password.toLowerCase() == "teacher") {
        window.open("AZ_files/AZ_CV.pdf")
                return true;
            } else {
        alert("Incorrect password!! please try again");
                return false;
            }
        }
