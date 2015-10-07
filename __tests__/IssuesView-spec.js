jest.dontMock('../js/components/IssuesView.js');


describe('IssuesView', function() {
  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var $ = require('jquery');
  var IssuesView;
 

  beforeEach(function() {
    IssuesView = require('../js/components/IssuesView.js');
   
  });

  it('should exists', function() {
    // Render into document
    var issuesView = TestUtils.renderIntoDocument( <IssuesView></IssuesView> );
    expect(TestUtils.isCompositeComponent(issuesView)).toBeTruthy();
  });
});

