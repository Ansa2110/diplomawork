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

  const formData = new FormData(registrationForm);

  fetch('php/register1.php', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      return response.text();
    } else {
      throw new Error('Network error');
    }
  })
  .then(result => {
    console.log(result);
    window.location.href = "success.html";
  })
  .catch(error => {
    console.error('Error:', error);
    
  });
});