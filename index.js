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

function displayRepositories() {
  return data.items.map(repo => renderRepositories(repo));
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

