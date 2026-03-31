import {
  getRandomItem,
  getRandomInt,
  generateRandomString,
  generateFullName,
  generateEmail,
  generatePhone,
  generateDate,
  generateDateTime,
  generateTime,
  generateUUID,
  generateAddress,
  generateURL,
  generateIPv4,
  generateHexColor,
  generateLoremIpsum,
  generateUsername,
  generatePassword
} from './helper.js';
import { FIRST_NAMES } from './firstNames.js';
import { LAST_NAMES } from './lastNames.js';
import { CITIES } from './cities.js';
import { COUNTRIES } from './countries.js';
import { COMPANIES } from './companies.js';

export const DATA_TYPES = {
    string: {
        label: 'Random String',
        generate: () => generateRandomString(8)
    },
    fullName: {
        label: 'Full Name',
        generate: () => generateFullName()
    },
    firstName: {
        label: 'First Name',
        generate: () => getRandomItem(FIRST_NAMES)
    },
    lastName: {
        label: 'Last Name',
        generate: () => getRandomItem(LAST_NAMES)
    },
    email: {
        label: 'Email',
        generate: () => generateEmail()
    },
    phone: {
        label: 'Phone Number',
        generate: () => generatePhone()
    },
    number: {
        label: 'Number (1-1000)',
        generate: () => getRandomInt(1, 1000)
    },
    numberSmall: {
        label: 'Number (1-100)',
        generate: () => getRandomInt(1, 100)
    },
    decimal: {
        label: 'Decimal',
        generate: () => (Math.random() * 1000).toFixed(2)
    },
    boolean: {
        label: 'Boolean',
        generate: () => Math.random() > 0.5 ? 'true' : 'false'
    },
    yesNo: {
        label: 'Yes/No',
        generate: () => Math.random() > 0.5 ? 'Yes' : 'No'
    },
    date: {
        label: 'Date (YYYY-MM-DD)',
        generate: () => generateDate('YYYY-MM-DD')
    },
    dateUS: {
        label: 'Date (MM/DD/YYYY)',
        generate: () => generateDate('MM/DD/YYYY')
    },
    dateEU: {
        label: 'Date (DD/MM/YYYY)',
        generate: () => generateDate('DD/MM/YYYY')
    },
    datetime: {
        label: 'DateTime',
        generate: () => generateDateTime()
    },
    time: {
        label: 'Time (HH:MM)',
        generate: () => generateTime()
    },
    uuid: {
        label: 'UUID',
        generate: () => generateUUID()
    },
    city: {
        label: 'City',
        generate: () => getRandomItem(CITIES)
    },
    country: {
        label: 'Country',
        generate: () => getRandomItem(COUNTRIES)
    },
    address: {
        label: 'Address',
        generate: () => generateAddress()
    },
    company: {
        label: 'Company Name',
        generate: () => getRandomItem(COMPANIES)
    },
    url: {
        label: 'URL',
        generate: () => generateURL()
    },
    ipv4: {
        label: 'IPv4 Address',
        generate: () => generateIPv4()
    },
    color: {
        label: 'Color (Hex)',
        generate: () => generateHexColor()
    },
    gender: {
        label: 'Gender',
        generate: () => getRandomItem(['Male', 'Female'])
    },
    age: {
        label: 'Age (18-80)',
        generate: () => getRandomInt(18, 80)
    },
    percentage: {
        label: 'Percentage',
        generate: () => getRandomInt(0, 100) + '%'
    },
    currency: {
        label: 'Currency (USD)',
        generate: () => '$' + (Math.random() * 10000).toFixed(2)
    },
    lorem: {
        label: 'Lorem Ipsum',
        generate: () => generateLoremIpsum()
    },
    username: {
        label: 'Username',
        generate: () => generateUsername()
    },
    password: {
        label: 'Password',
        generate: () => generatePassword()
    },
    sequence: {
        label: 'Sequence (1,2,3...)',
        generate: (index) => index + 1
    }
};
