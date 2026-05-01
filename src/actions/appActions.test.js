import { RESIZE_APP, resizeApp } from './appActions';

describe('app actions', () => {
  it('should create an action to resize the app', () => {
    const contentRect = {
      x: 0, y: 0, width: 100, height: 100,
    };
    const expectedAction = {
      type: RESIZE_APP,
      contentRect,
    };
    expect(resizeApp(contentRect)).to.deep.equal(expectedAction);
  });
});
