import axios from "axios";

let returnButton = document.getElementById('return-button');
let applyButton = document.getElementById('apply-button');
let taskTextField = document.getElementById('task-text-field');
let completeCheckbox = document.getElementById('complete-checkbox')


returnButton.addEventListener('click', () => {
    window.location.href = '/';
})

applyButton.addEventListener('click', async () => {
    let taskID = applyButton.parentNode.parentNode.id;
    let taskText = taskTextField.value;
    let complete = completeCheckbox.checked;
    
    if(taskText.length < 1) {
        applyButton.innerText = 'No Content';
        applyButton.style.color = '#ff2e2e';
        setTimeout(() => {
            applyButton.innerText = 'Apply Changes';
            applyButton.style.color = 'white';
        }, 1500)
    }
    else if(taskText.length > 200) {
        applyButton.innerText = 'Too Long';
        applyButton.style.color = '#ff2e2e';
        setTimeout(() => {
            applyButton.innerText = 'Apply Changes';
            applyButton.style.color = 'white';
        }, 1500)
    }
    else {
        try {
            let payload = {complete, taskText}
            let res = await axios.patch(`/task=${taskID}`, payload);
            if(res.status === 204) {
                window.location.href = '/';
            }
        } catch (error) {
            
        }
    }
})