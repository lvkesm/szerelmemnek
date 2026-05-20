const elso = document.getElementById("1")
const masodik = document.getElementById("2")
const harmadik = document.getElementById("3")

function checkCode(){
    if (elso.value === "4" && masodik.value === "1" && harmadik.value === "1") {
        alert("Szeretlek! ❤️")
    } else {
        alert("Ocseem hat ott van rajta")
    }
}

const inputs = document.querySelectorAll(".kod");

inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
        if (input.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && input.value === "" && index > 0) {
            inputs[index - 1].focus();
        }
    });
});
