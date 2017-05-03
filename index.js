const gitHubUrl = 'https://api.github.com'

function handlebarsSetup() {
  let repoTemplate = document.getElementById('repo-template').innerHTML
  let repoTemplateScript = Handlebars.compile(repoTemplate)

  let issuesTemplate = document.getElementById('issues-template').innerHTML
  let issuesTemplateScript = Handlebars.compile(issuesTemplate)

  let templates = {
    repo: repoTemplateScript,
    issues: issuesTemplateScript
  }

  return templates
}

function getIssues() {
  const owner = 'szrharrison'
  const repo = 'javascript-fetch-lab'
  const url = `${gitHubUrl}/repos/${owner}/${repo}/issues`

  fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      Authorization: `token ${getToken()}`
    }
  }).then((response) => {
    return response.json()
  }).then(showIssues)
}

function showIssues(json) {
  let $issues = document.getElementById('issues')
  let context = {
    issues: json
  }
  html = handlebarsSetup().issues(context)

  $issues.innerHTML = html

}

function createIssue() {
  const owner = 'szrharrison'
  const repo = 'javascript-fetch-lab'
  const url = `${gitHubUrl}/repos/${owner}/${repo}/issues`
  const issueTitle = document.getElementById('title').value
  const issueBody = document.getElementById('body').value
  const body = JSON.stringify( { 'title': issueTitle, 'body': issueBody } )
  fetch(url, {
    method: 'post',
    mode: 'cors',
    headers: {
      Authorization: `token ${getToken()}`
    },
    body: body,
  }).then(getIssues)
}

function showResults(json) {
  let $results = document.getElementById('results')
  let context = json

  let html = handlebarsSetup().repo(context)
  $results.innerHTML = html
}

function forkRepo() {
  const repo = 'learn-co-curriculum/javascript-fetch-lab'
  //use fetch to fork it!
  fetch(`${gitHubUrl}/repos/${repo}/forks`, {
    method: 'post',
    mode: 'cors',
    headers: {
      Authorization: `token ${getToken()}`
    }
  }).then((response) => {
    return response.json()
  }).then(showResults)
}

function getToken() {
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
  // return 'c66c8fc0cf7adb24a8f71d5eb4aeefc613125a24'
  return ''
}
