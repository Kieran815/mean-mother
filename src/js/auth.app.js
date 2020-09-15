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

  // write a method that allows us to make a post
  // request via AJAX.
  function postRequest(formId, url) {
    // select form and add listener
    let form = document.getElementById(formId);
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // assign form to new `FormData` object
      let formData = new FormData(form);
      // generic route to make form reusable
      let uri = `${window.location.origin}${url}`;
      let xhr = new XMLHttpRequest();
      // Post to db via XHR
      xhr.open('POST', uri);
      // post meta-headers
      xhr.setRequestHeader(
        'Content-Type',
        'application/json; charset=UTF-8'
      );
      // push `formData` key/value pairs to blank object
      let object = {};
      formData.forEach(function(value, key) {
        object[key] = value;
      });
      // convert and send object to JSON string
      xhr.send(JSON.stringify(object));
      xhr.onload = function() {
        // change XHR res to a JSON object
        let data = JSON.parse(xhr.response);
        console.log(data);
      }
    });
  }


  // Add a return statement to your closure. This
  // statement will return a JSON object that is
  // accessible outside of the closure and will have
  // access to everything that is outside of the return
  // statement.
  return {
    load: function() {
      loginForm();
      postRequest('loginForm', '/api/auth/login');
    }
  }

})();

// Calling authApp.load(); from outside the closure
// will execute the `loginForm()` logic.
authApp.load();