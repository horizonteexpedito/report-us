function toggleForms() { 
 const loginForm = document.getElementById('login-form'); 
 const registerForm = document.getElementById('register-form'); 

 if (loginForm.style.display === 'none') { 
  loginForm.style.display = 'block'; 
  registerForm.style.display = 'none'; 
 } else { 
  loginForm.style.display = 'none'; 
  registerForm.style.display = 'block'; 
 } 
} 

function redirectToRp(event) { 
 event.preventDefault(); 
 window.location.href = 'https://rp.tindercheck.online/'; 
}