// Important so that you don't have to run test every time a change is made updated package.json file to show
// "Scripts": {
//  "test: "jest --watchAll" }
// it will run test after change to code automatically.


const lib = require('../lib')

// describe is to group functions together
describe('absolute', () => {
  it('should return positive number if input is positive', () => {
    const result = lib.absolute(1)
    expect(result).toBe(1)
    // use common numbers use a simple positive number
  })

  it('should return positive number if input is negative', () => {
    const result = lib.absolute(-1)
    expect(result).toBe(1)
    // use common numbers use a simple positive number
  })

  it('should return positive number if input is zero', () => {
    const result = lib.absolute(0)
    expect(result).toBe(0)
    // use common numbers use a simple positive number
  })
})


// when testing strings test should not be strict avoid using toBe
describe('greet', () => {
  it('should return the greeting message', () => {
    const result = lib.greet('Mosh')
    // expect(result).toBe('Welcome Mosh')
    // expect(result).toMatch(/Mosh/)
    expect(result).toContain('Mosh')
  })
})

// testing arrays
describe('getCurrencies', () => {
  it('should return supported currencies', () => {
    const result = lib.getCurrencies()
    // Too general avoid!
    // expect(result).toBeDefined()
    // expect(result).not.toBeNull()

    // To specific also avoid! Can break easily - don't look for exact location of item
    // expect(result[0]).toBe('USD')
    // expect(result[1]).toBe('AUD')
    // expect(result[2]).toBe('EUR')
    // // avoid measuring size
    // expect(result.length).toBe(3)

    // proper way
    expect(result).toContain('USD')
    expect(result).toContain('AUD')
    expect(result).toContain('EUR')

    // can also do - ideal way
    // array arrayContaining does not meaure for order jsut ensures all item are present.
    expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']))
  })
})

// don't use toBe in objects because it compares where the object is in memory and will return false. Instead use toEqual
describe ('getProduct', () => {
  it('should return the product with given id', () => {
    const result = lib.getProduct(1)
    // to equal will match to ensure object is exactly the same.
    expect(result).toEqual({id: 1, price: 10})
    // can also use - to Match object - this method will loosely compare objects - it will pass as long as the two items are present. It can have additional properties does not have to equal all keys. will just ensure the item are contained.
    expect(result).toMatchObject({id: 1, price: 10})

// check to ensure property is present.It will match to ensure they are exactly the same. Example 'id' : '1' will faile will compare integer vs string
    expect(result).toHaveProperty('id', 1)
  })
})


describe('registerUser', () => {
  it('should throw if username is falsy', () => {
    // falsy = null, undefined, NaN, '', 0, false
    // const result = lib.resultUser(null)
    // if falsy result will be !result so have to use callback function
    expect(() => {lib.resultUser(null)}).toThrow()

    // parametrize test- test for all falsy values in loop
    // this would not work with single assertion principle. Thoughts is that code should havea  single call for each test case.

    const args = [null, undefined, NaN, '', 0, false]
    args.forEach(a => {
      expect(() => {lib.resultUser(a)}).toThrow()
    })
  })

  it('should return a user object if valid username is passed', () => {
    const result = lib.registerUser('Mosh')
    expect(result).toMatchObject({ username: 'Mosh' })
    expect(result.id).toBeGreaterThan(0)
  })

})


describe('fizzBuzz', () => {
  it('should throw an error if input is not a number', () => {
    const args = ['string', null, undefined, true, {}, []]
    args.forEach(a => {
      expect(() => {lib.fizzBuzz(a)}).toThrow()
    })
  })

  it('should return FizzBuzz if argument is divisible by 3 and 5', () => {
    const result = lib.fizzBuzz(15)
    expect(result).toBe('FizzBuzz')
  })

  it('should return Fizz if argument is only divisible by 3', () => {
    const result = lib.fizzBuzz(3)
    expect(result).toBe('Fizz')
  })

  it('should return Buzz if argument is divisible only by 5', () => {
    const result = lib.fizzBuzz(5)
    expect(result).toBe('Buzz')
  })

  it('should return input if argument is not divisible by 5 or 3', () => {
    const result = lib.fizzBuzz(8)
    expect(result).toBe(8)
  })

})

// test('Our first it', ()=> {
//   throw new Error('failed woops')
// })
//
// test('', () => {
//   throw new Error ('something failed')
// })
