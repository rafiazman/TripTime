/** @format */

module.exports = {
  withRouter: component => {
    component.defaultProps = {
      ...component.defaultProps,
      router: {
        pathname: 'mocked-path',
        push: function() {
          jest.fn();
        },
      },
    };
    return component;
  },
};
