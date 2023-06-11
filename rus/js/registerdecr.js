$(document).ready(function() {
    const teamSizeInput = $('#teamSize');
    const teamMembersInput = $('#teamMembers').parent();
    
    teamSizeInput.on('change', function() {
      if (teamSizeInput.val() == 1) {
        teamMembersInput.hide();
      } else {
        teamMembersInput.show();
      }
    });
    
    if (teamSizeInput.val() == 1) {
      teamMembersInput.hide();
    }
  });
  
  const teamSizeInput = document.getElementById('teamSize');
  const teamMembersTextarea = document.getElementById('teamMembers');
  
  teamSizeInput.addEventListener('change', function() {
    if (teamSizeInput.value == '1') {
      teamMembersTextarea.removeAttribute('required');
    } else {
      teamMembersTextarea.setAttribute('required', '');
    }
  });
  
  const registrationForm = document.getElementById('registrationForm');
  
  registrationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const nameInput = document.getElementById('firstName');
    const firstName = nameInput.value;
  
    const surnameInput = document.getElementById('lastName');
    const lastName = surnameInput.value;
  
    const ageInput = document.getElementById('age');
    const age = ageInput.value;
  
    const teamnameInput = document.getElementById('teamName');
    const team = teamnameInput.value;
  
    const phoneInput = document.getElementById('phone');
    const phone = phoneInput.value;
  
    const emailInput = document.getElementById('email');
    const email = emailInput.value;
  
    const teamsizeInput = document.getElementById('teamSize');
    const teamSize = teamsizeInput.value;
  
    const teammembersInput = document.getElementById('teamMembers');
    const teamMembers = teammembersInput.value;
  
    const descInput = document.getElementById('startupDescription');
    const desc = descInput.value;
  
  
      // Создаем объект FormData для отправки данных формы
  
    const formData = new FormData(registrationForm);
     formData.append('name', firstName);
    formData.append('lastname', lastName);
    formData.append('age', age);
    formData.append('team', team);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('teamSize', teamSize);
    formData.append('teamMembers', teamMembers);
    formData.append('desc', desc);
  
    fetch('php/registerdec.php', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
          return response.text();
      } else {
          throw new Error("Server error: " + response.status);
      }
  })
  
    .then(result => {
      console.log(result);
      window.location.href = "success.html";
    })
    .catch(error => {
      console.error('Error:', error);
      // Здесь вы можете добавить обработку ошибок, например, вывод сообщения об ошибке
      alert('Error occurred while submitting the form. Please try again.');
    });
  });