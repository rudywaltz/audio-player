import { expect } from '@esm-bundle/chai';
import { displayLength } from './displayLength'

describe('displayLength', () => {
  it('should display default if value not a number', () => {
    expect(displayLength('twentytwo')).to.be.eq('--:--:--')
  })

  it('should display default if value is null', () => {
    expect(displayLength(null)).to.be.eq('--:--:--')
  })

  it('should always display hour and minutes as well', () => {
    expect(displayLength(4)).to.be.eq('00:00:04')
  })

  it('should parse string', () => {
    expect(displayLength('13325')).to.be.eq('03:42:05')
  })
})
