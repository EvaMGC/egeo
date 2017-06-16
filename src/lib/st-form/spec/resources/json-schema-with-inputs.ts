export const schemaWithInputs: any = {
   '$schema': 'http://json-schema.org/schema#',
   'properties': {
      'requiredNumber': {
         'description': 'Required input description',
         'type': 'number',
         'default': 5
      },
      'minNumber': {
         'description': 'Min number input description',
         'type': 'number',
         'default': 28017,
         'minimum': 6
      },
      'maxNumber': {
         'description': 'Max number input description',
         'type': 'number',
         'default': 28017,
         'maximum': 5
      },
      'minAndMaxNumber': {
         'description': 'This number has to be between 7 and 19',
         'type': 'number',
         'default': 28017,
         'minimum': 6,
         'maximum': 20,
         'exclusiveMinimum': true,
         'exclusiveMaximum': true
      },
      'requiredText': {
         'description': 'This is a required text',
         'type': 'string',
         'default': 5
      },
      'minLengthText': {
         'description': 'You have to type a text with 10 characters at least',
         'type': 'string',
         'default': '',
         'minLength': 10
      },
      'maxLengthText': {
         'description': 'You have to type a text with less than 20 characters',
         'type': 'string',
         'default': '',
         'maxLength': 20
      },
      'minAndMaxLengthText': {
         'description': 'You have to type a text with less than 20 and 10 characters at least',
         'type': 'string',
         'default': '',
         'minLength': 10,
         'maxLength': 20
      },
      'url': {
         'description': 'You have to type a valid url',
         'type': 'string',
         'pattern': '(https?:\\/\\/(?:www\\.|(?!www))[^\\s\\.]+\\.[^\\s]{2,}|www\\.[^\\s]+\\.[^\\s]{2,})'
      }
   },
   'required': [
      'requiredNumber', 'requiredText'
   ]
};
