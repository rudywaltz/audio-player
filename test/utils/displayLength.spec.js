import { displayLength } from '../../src/utils/displayLength'

describe('displayLength', () => {
  it('should display default if value not a number', () => {
    expect(displayLength('twentytwo')).toBe('--:--:--')
  })

  it('should display default if value is null', () => {
    expect(displayLength(null)).toBe('--:--:--')
  })

  it('should always display hour and minutes as well', () => {
    expect(displayLength(4)).toBe('00:00:04')
  })

  it('should parse string', () => {
    expect(displayLength('13325')).toBe('03:42:05')
  })
})
