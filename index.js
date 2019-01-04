$(document).ready(function (){
});

function searchRepositories() {
  const searchTerms = document.getElementById('searchTerms').value
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data){
    $("#results").html(displayRepositories(data));
  }).fail(error =>
    displayError()
  )
}

function displayRepositories(data) {
   return data.items.map( repo => renderRepositories(repo));
}

function showCommits(el) {
  const owner = el.dataset.owner;
  const repo  = el.dataset.repository;
  $.get(`https://api.github.com/repos/${owner}/${repo}/commits`).done(function(data) {
     $('#details').html(renderCommits(data));
   }).fail(function(error) {
     displayError(error);
  });
}

function displayError(error) {
  $('#errors').html("I'm sorry, there's been an error, please try again.");
}

function renderCommit(commit) {
  return `
    <li><h3>Sha: ${commit.sha}</h3>
    <p>Name: ${commit.commit.author.name}</p><br>
    <p>Login: ${commit.author.login}</p><br>
    <p>Message: ${commit.commit.message}</p></li>`;
}

function renderCommits(data) {
  const repo = data.map(commit => renderCommit(commit)).join('');
  return `<ul>${repo}</ul>`;
}