var authApp = (function() {

  function loginForm(){
    let app = document.getElementById('app');

    let form =  `
      <div class="card login-form">
        <form id="loginForm" class="card-body">
          <h1 class="card-title text-center">Please Sign In</h1>
          <div id="formMsg" class="alert alert-danger text-center">Invalid username or password</div>
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" class="form-control">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" class="form-control">
          </div>
          <div>
            <input type="submit" value="Sign In" class="btn btn-lg btn-primary btn-block">
          </div>
        </form>
      </div>
    `;

    app.innerHTML=form;
  }

  // Add a return statement to your closure. This
  // statement will return a JSON object that is
  // accessible outside of the closure and will have
  // access to everything that is outside of the return
  // statement.
  return {
    load: function() {
      loginForm();
    }
  }

})();

// Calling authApp.load(); from outside the closure
// will execute the `loginForm()` logic.
authApp.load();