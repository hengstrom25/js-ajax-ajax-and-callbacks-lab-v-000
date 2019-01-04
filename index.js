$(document).ready(function (){
});

function searchRepositories() {
  const searchTerms = document.getElementsById('searchTerms').value
  $.get('https://api.github.com/search/repositories?q=${searchTerms}`, function(data)')
}
