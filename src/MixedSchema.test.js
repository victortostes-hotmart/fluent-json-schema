const { MixedSchema } = require('./MixedSchema')
const { FluentSchema, FORMATS, TYPES } = require('./FluentSchema')

describe('MixedSchema', () => {
  it('defined', () => {
    expect(MixedSchema).toBeDefined()
  })

  describe('constructor', () => {
    it('without params', () => {
      expect(MixedSchema().valueOf()).toEqual({})
    })
  })

  it('from FluentSchema', () => {
    const types = [
      TYPES.STRING,
      TYPES.NUMBER,
      TYPES.BOOLEAN,
      TYPES.INTEGER,
      TYPES.OBJECT,
      TYPES.ARRAY,
      TYPES.NULL,
    ]
    expect(
      FluentSchema()
        .mixed(types)
        .valueOf()
    ).toEqual({
      $schema: 'http://json-schema.org/draft-07/schema#',
      type: types,
    })
  })

  it('sets a type object to the prop', () => {
    expect(
      FluentSchema()
        .object()
        .prop(
          'prop',
          FluentSchema()
            .mixed([TYPES.STRING, TYPES.NUMBER])
            .minimum(10)
            .maxLength(5)
        )
        .valueOf()
    ).toEqual({
      $schema: 'http://json-schema.org/draft-07/schema#',
      properties: {
        prop: { maxLength: 5, minimum: 10, type: ['string', 'number'] },
      },
      type: 'object',
    })
  })
})