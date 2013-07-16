var github = new OAuth2('github', {
  client_id: '9fb178606aae0448d3ec',
  client_secret: '7f37be04cb0e0dd5ff0956a1a729c8801a2db6f4'
});

github.authorize(function() {
  var GET_REPOS_URL = 'https://api.github.com/users/:user/repos'
  var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(event) {
      if (xhr.readyState == 4) {
        if(xhr.status == 200) {
          // Great success: parse response with JSON
          var parsed = JSON.parse(xhr.responseText);
          var html = '';
          parsed.data.forEach(function(item, index) {
            html += '<li>' + item.name + '</li>';
          });
          document.querySelector('#repos').innerHTML = html;
          return;

        } else {
          // Request failure: something bad happened
        }
      }
    };

    xhr.open('GET', GET_REPOS_URL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('User-Agent', 'Pull Request Status');
    xhr.setRequestHeader('Authorization', 'OAuth ' + github.getAccessToken());

    xhr.send();

});
