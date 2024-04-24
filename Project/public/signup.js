async function handleSubmit(e) {
    e.preventDefault();
  
    // Access form input values using refs
    const name = document.getElementById('name').value;
    const email = document.getElementById('floatingInput').value;
    const password = document.getElementById('floatingPassword').value;
    const confirmPassword = document.getElementById('confpassword').value;
  
    // Check if passwords match
    if (password !== confirmPassword) {
      return alert('Passwords do not match');
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/User/signupUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }) // Send name, email, password in JSON format
      });
  
      if (response.ok) {
        alert('User Registered. Head to Login');
        // Handle successful registration (e.g., redirect to login page)
        window.location.href = '/login';
      } else {
        const json = await response.json();
        // Handle registration error
        alert(json.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
      alert('Error during signup. Please try again.');
    }
  }
  

  async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('ID').value;
    const password = document.getElementById('floatingPassword').value;

    try {
        const response = await fetch("http://localhost:5000/api/User/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({email, password })
        });
  
        if (response.ok) {
            alert("Correct credentials")
        } else {
          alert("Email or Password incorrect")
        }
    } catch {
        alert('Failed to sign in');
    }
}