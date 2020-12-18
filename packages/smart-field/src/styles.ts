import { css } from 'emotion';
import tokens from '@contentful/forma-36-tokens';

export const wrapper = css({
  padding: 20,

  minHeight: 200,

  borderRadius: 6,
  backgroundColor: '#fafafa',
})

export const validationRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: tokens.fontSizeM,
  marginTop: tokens.spacingXs,
  color: tokens.colorTextMid
});

export const rightToLeft = css({
  direction: 'rtl'
});
