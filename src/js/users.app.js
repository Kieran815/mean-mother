var usersApp = (function() {
  // function to call api for data
  function viewUsers() {
    // assign var to api location
    let uri = `${window.location.origin}/api/users`;
    let xhr = new XMLHttpRequest();
    // set up `GET` request to api location
    xhr.open('GET', uri);
    // add request headers
    xhr.setRequestHeader(
      "Content-Type",
      "application/json; charset=UTF-8"
    );
    // SEND GET REQUEST
    xhr.send();
    // on load (when request returns)
    xhr.onload = function() {
      let app = document.getElementById('app');
      let data = JSON.parse(xhr.response);
      let users = data.users;
      let table = '';
      let rows = '';

      for (let i = 0; i < users.length; i++) {
        rows = rows + `<tr>
          <td>
            <a href="#view-${users[i]['_id']}">${users[i]["last_name"]}, ${users[i]["first_name"]}</a>
          </td>
          <td>${users[i]["username"]}</td>
          <td>${users[i]["email"]}</td>
        </tr>`;
      }

      table = `
        <div class="card">
          <div class="card-header clearfix">
            <h2 class="h3 float-left">Users</h2>
            <div class="float-right">
              <a href="#create" class="btn btn-primary">New User</a>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Username</td>
                  <td>Email</td>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>
      `;
      
      app.innerHTML = table;
    }
  }
  return {
    load: function() {
      // alert('LOADED')
      viewUsers();
    }
  }
})();

usersApp.load();