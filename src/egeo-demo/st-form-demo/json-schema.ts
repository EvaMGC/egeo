/*
 * Copyright (C) 2016 Stratio (http://stratio.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export const JSON_SCHEMA: any = {
   '$schema': 'http://json-schema.org/schema#',
   'properties': {
      'genericNumberInput': {
         'title': 'Generic number',
         'description': 'Generic input description',
         'type': 'number',
         'default': 5,
         'minimum': 6,
         'maximum': 10,
         'exclusiveMinimum': false,
         'exclusiveMaximum': true
      },
      'requiredNumber': {
         'title': 'Required number',
         'description': 'Required input description',
         'type': 'number',
         'default': 5
      },
      'minNumber': {
         'title': 'Min number',
         'description': 'Min number input description',
         'type': 'number',
         'default': 28017,
         'minimum': 6
      },
      'maxNumber': {
         'title': 'Max number',
         'description': 'Max number input description',
         'type': 'number',
         'default': 28017,
         'maximum': 5
      },
      'minAndMaxNumber': {
         'title': 'Number in a range',
         'description': 'This number has to be between 7 and 19',
         'type': 'number',
         'default': 28017,
         'minimum': 6,
         'maximum': 20,
         'exclusiveMinimum': true,
         'exclusiveMaximum': true
      },
      'requiredText': {
         'title': 'Required text',
         'description': 'This is a required text',
         'type': 'string',
         'default': 'required text'
      },
      'minLengthText': {
         'title': 'Text with a min length',
         'description': 'You have to type a text with 10 characters at least',
         'type': 'string',
         'default': '',
         'minLength': 10
      },
      'maxLengthText': {
         'title': 'Text with a max length',
         'description': 'You have to type a text with less than 20 characters',
         'type': 'string',
         'default': '',
         'maxLength': 20,
         'pattern': 'aa+'
      },
      'minAndMaxLengthText': {
         'title': 'Text with a min and max length',
         'description': 'You have to type a text with less than 20 and 10 characters at least',
         'type': 'string',
         'default': '',
         'minLength': 10,
         'maxLength': 20,

      },
      'url': {
         'title': 'URL',
         'description': 'You have to type a valid url',
         'type': 'string',
         'pattern': '(https?:\\/\\/(?:www\\.|(?!www))[^\\s\\.]+\\.[^\\s]{2,}|www\\.[^\\s]+\\.[^\\s]{2,})'
      }
   },
   'required': [
      'requiredNumber', 'requiredText'
   ]
};
