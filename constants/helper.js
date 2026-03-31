import { FIRST_NAMES } from './firstNames.js';
import { LAST_NAMES } from './lastNames.js';
import { CITIES } from './cities.js';
import { COUNTRIES } from './countries.js';
import { COMPANIES } from './companies.js';
import { STREET_NAMES } from './streetNames.js';
import { DOMAINS } from './domains.js';
import { LOREM_WORDS } from './loremWords.js';

export function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export function generateFullName() {
    return getRandomItem(FIRST_NAMES) + ' ' + getRandomItem(LAST_NAMES);
}

export function generateEmail() {
    const firstName = getRandomItem(FIRST_NAMES).toLowerCase();
    const lastName = getRandomItem(LAST_NAMES).toLowerCase();
    const domain = getRandomItem(DOMAINS);
    const separator = getRandomItem(['.', '_', '']);
    const number = Math.random() > 0.5 ? getRandomInt(1, 99) : '';
    return firstName + separator + lastName + number + '@' + domain;
}

export function generatePhone() {
    const formats = [
        '+1-XXX-XXX-XXXX',
        '+62-XXX-XXXX-XXXX',
        '(XXX) XXX-XXXX',
        'XXX-XXX-XXXX'
    ];
    let format = getRandomItem(formats);
    return format.replace(/X/g, () => getRandomInt(0, 9));
}

export function generateDate(format) {
    const start = new Date(2000, 0, 1);
    const end = new Date();
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    switch (format) {
        case 'YYYY-MM-DD':
            return `${year}-${month}-${day}`;
        case 'MM/DD/YYYY':
            return `${month}/${day}/${year}`;
        case 'DD/MM/YYYY':
            return `${day}/${month}/${year}`;
        default:
            return `${year}-${month}-${day}`;
    }
}

export function generateDateTime() {
    const date = generateDate('YYYY-MM-DD');
    const time = generateTime();
    return `${date} ${time}:${String(getRandomInt(0, 59)).padStart(2, '0')}`;
}

export function generateTime() {
    const hour = String(getRandomInt(0, 23)).padStart(2, '0');
    const minute = String(getRandomInt(0, 59)).padStart(2, '0');
    return `${hour}:${minute}`;
}

export function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function generateAddress() {
    const number = getRandomInt(1, 999);
    const street = getRandomItem(STREET_NAMES);
    const city = getRandomItem(CITIES);
    return `${number} ${street}, ${city}`;
}

export function generateURL() {
    const protocols = ['https://'];
    const tlds = ['.com', '.org', '.net', '.io', '.co'];
    const words = ['example', 'demo', 'test', 'sample', 'mysite', 'website', 'app', 'portal'];
    return protocols[0] + 'www.' + getRandomItem(words) + getRandomItem(tlds);
}

export function generateIPv4() {
    return `${getRandomInt(1, 255)}.${getRandomInt(0, 255)}.${getRandomInt(0, 255)}.${getRandomInt(1, 254)}`;
}

export function generateHexColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

export function generateLoremIpsum() {
    const wordCount = getRandomInt(5, 12);
    let words = [];
    for (let i = 0; i < wordCount; i++) {
        words.push(getRandomItem(LOREM_WORDS));
    }
    return words.join(' ');
}

export function generateUsername() {
    const adjectives = ['cool', 'super', 'mega', 'ultra', 'pro', 'epic', 'awesome'];
    const nouns = ['user', 'gamer', 'coder', 'ninja', 'wizard', 'master', 'hero'];
    return getRandomItem(adjectives) + getRandomItem(nouns) + getRandomInt(1, 999);
}

export function generatePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

