jest.dontMock('../js/components/IssueView.js');
describe('IssueView', function() {
  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var $ = require('jquery');
  var IssueView;
 

  beforeEach(function() {
     console.log('IssueView',IssueView)
    IssueView = require('../js/components/IssueView.js');
  
  });

  it('should exists', function() {
    // Render into document
    var issueView = TestUtils.renderIntoDocument( <IssueView></IssueView> );
    expect(TestUtils.isCompositeComponent(issueView)).toBeTruthy();
  });
});