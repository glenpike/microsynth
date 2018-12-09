export const RESIZE_APP = 'RESIZE_APP';

export const resizeApp = contentRect => ({
  type: RESIZE_APP,
  contentRect,
});