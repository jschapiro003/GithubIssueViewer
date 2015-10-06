const ISSUES_URL = 'https://api.github.com/repos/npm/npm/issues';
let _issues = {}
let _changeListeners = []
let _initCalled = false

let IssueStore = module.exports = {

  init: function () {
    if (_initCalled)
      return

    _initCalled = true

    getJSON(ISSUES_URL, function (err, res) {
   
      res.forEach(function (issue) {
        console.log(issue)
        _issues[issue.number] = issue;
      })

      IssueStore.notifyChange()
    })
  },

 
  getIssues: function () {
    var array = []

    for (var number in _issues)
      array.push(_issues[number])

    return array
  },

  getIssue: function (number) {
    return _issues[number]
  },

  notifyChange: function () {
    _changeListeners.forEach(function (listener) {
      listener()
    })
  },

  addChangeListener: function (listener) {
    _changeListeners.push(listener)
  },

  removeChangeListener: function (listener) {
    _changeListeners = _changeListeners.filter(function (l) {
      return listener !== l
    })
  }

}

function getJSON(url, cb) {
  var req = new XMLHttpRequest()
  req.onload = function () {
    if (req.status === 404) {
      cb(new Error('not found'))
    } else {
      cb(null, JSON.parse(req.response))
    }
  }
  req.open('GET', url)
  req.send()
}

