// ==========================================
// CSV Generator - Full Client-Side Application
// ==========================================

import { DATA_TYPES } from './constants/dataTypes.js';
import { FIRST_NAMES } from './constants/firstNames.js';
import { LAST_NAMES } from './constants/lastNames.js';
import { CITIES } from './constants/cities.js';
import { COUNTRIES } from './constants/countries.js';
import { COMPANIES } from './constants/companies.js';
import { STREET_NAMES } from './constants/streetNames.js';
import { DOMAINS } from './constants/domains.js';
import { LOREM_WORDS } from './constants/loremWords.js';

// ==========================================
// Helper Functions
// ==========================================

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function generateFullName() {
    return getRandomItem(FIRST_NAMES) + ' ' + getRandomItem(LAST_NAMES);
}

function generateEmail() {
    const firstName = getRandomItem(FIRST_NAMES).toLowerCase();
    const lastName = getRandomItem(LAST_NAMES).toLowerCase();
    const domain = getRandomItem(DOMAINS);
    const separator = getRandomItem(['.', '_', '']);
    const number = Math.random() > 0.5 ? getRandomInt(1, 99) : '';
    return firstName + separator + lastName + number + '@' + domain;
}

function generatePhone() {
    const formats = [
        '+1-XXX-XXX-XXXX',
        '+62-XXX-XXXX-XXXX',
        '(XXX) XXX-XXXX',
        'XXX-XXX-XXXX'
    ];
    let format = getRandomItem(formats);
    return format.replace(/X/g, () => getRandomInt(0, 9));
}

function generateDate(format) {
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

function generateDateTime() {
    const date = generateDate('YYYY-MM-DD');
    const time = generateTime();
    return `${date} ${time}:${String(getRandomInt(0, 59)).padStart(2, '0')}`;
}

function generateTime() {
    const hour = String(getRandomInt(0, 23)).padStart(2, '0');
    const minute = String(getRandomInt(0, 59)).padStart(2, '0');
    return `${hour}:${minute}`;
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function generateAddress() {
    const number = getRandomInt(1, 999);
    const street = getRandomItem(STREET_NAMES);
    const city = getRandomItem(CITIES);
    return `${number} ${street}, ${city}`;
}

function generateURL() {
    const protocols = ['https://'];
    const tlds = ['.com', '.org', '.net', '.io', '.co'];
    const words = ['example', 'demo', 'test', 'sample', 'mysite', 'website', 'app', 'portal'];
    return protocols[0] + 'www.' + getRandomItem(words) + getRandomItem(tlds);
}

function generateIPv4() {
    return `${getRandomInt(1, 255)}.${getRandomInt(0, 255)}.${getRandomInt(0, 255)}.${getRandomInt(1, 254)}`;
}

function generateHexColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

function generateLoremIpsum() {
    const wordCount = getRandomInt(5, 12);
    let words = [];
    for (let i = 0; i < wordCount; i++) {
        words.push(getRandomItem(LOREM_WORDS));
    }
    return words.join(' ');
}

function generateUsername() {
    const adjectives = ['cool', 'super', 'mega', 'ultra', 'pro', 'epic', 'awesome'];
    const nouns = ['user', 'gamer', 'coder', 'ninja', 'wizard', 'master', 'hero'];
    return getRandomItem(adjectives) + getRandomItem(nouns) + getRandomInt(1, 999);
}

function generatePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

// ==========================================
// Column Management
// ==========================================

let columnCounter = 0;

function createColumnHTML(id, name = '', type = 'string') {
    const typeOptions = Object.entries(DATA_TYPES)
        .map(([key, value]) => `<option value="${key}" ${key === type ? 'selected' : ''}>${value.label}</option>`)
        .join('');

    return `
        <div class="column-item" data-id="${id}">
            <div class="column-inputs">
                <div class="column-field">
                    <label class="form-label">Column Name</label>
                    <input type="text" class="form-input column-name" value="${name}" placeholder="Enter column name">
                </div>
                <div class="column-field">
                    <label class="form-label">Data Type</label>
                    <select class="form-input column-type">
                        ${typeOptions}
                    </select>
                </div>
            </div>
            <button type="button" class="btn btn-remove" onclick="removeColumn(${id})" title="Remove column">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    `;
}

function addColumn(name = '', type = 'string') {
    const container = document.getElementById('columnsContainer');
    const id = columnCounter++;
    container.insertAdjacentHTML('beforeend', createColumnHTML(id, name, type));
}

function removeColumn(id) {
    const column = document.querySelector(`.column-item[data-id="${id}"]`);
    if (column) {
        column.remove();
    }
}

window.addColumn = addColumn;
window.removeColumn = removeColumn;
window.copyOutput = copyOutput;
window.downloadCSV = downloadCSV;
window.generateCSV = generateCSV;

function getColumns() {
    const columns = [];
    document.querySelectorAll('.column-item').forEach(item => {
        const name = item.querySelector('.column-name').value.trim();
        const type = item.querySelector('.column-type').value;
        if (name) {
            columns.push({ name, type });
        }
    });
    return columns;
}

// ==========================================
// CSV Generation
// ==========================================

function escapeCSVValue(value, separator) {
    const stringValue = String(value);
    // Check if value needs quoting
    if (stringValue.includes(separator) || stringValue.includes('"') || stringValue.includes('\n') || stringValue.includes('\r')) {
        // Escape quotes by doubling them
        return '"' + stringValue.replace(/"/g, '""') + '"';
    }
    return stringValue;
}

function getSeparator() {
    const separatorSelect = document.getElementById('separator');
    if (separatorSelect.value === 'custom') {
        const custom = document.getElementById('customSeparator').value;
        return custom || ',';
    }
    return separatorSelect.value;
}

// Tampilkan input custom separator jika opsi custom dipilih
function handleSeparatorChange() {
    const separatorSelect = document.getElementById('separator');
    const customInput = document.getElementById('customSeparator');
    if (separatorSelect.value === 'custom') {
        customInput.style.display = '';
    } else {
        customInput.style.display = 'none';
    }
}

function generateCSV() {
    const columns = getColumns();

    if (columns.length === 0) {
        alert('Please add at least one column with a name.');
        return;
    }

    const rowCount = parseInt(document.getElementById('rowCount').value) || 10;
    const includeHeader = document.getElementById('includeHeader').checked;
    const separator = getSeparator();

    const rows = [];

    // Add header row if enabled
    if (includeHeader) {
        const headerRow = columns.map(col => escapeCSVValue(col.name, separator));
        rows.push(headerRow.join(separator));
    }

    // Generate data rows
    for (let i = 0; i < rowCount; i++) {
        const row = columns.map(col => {
            const generator = DATA_TYPES[col.type];
            if (generator) {
                const value = generator.generate(i);
                return escapeCSVValue(value, separator);
            }
            return '';
        });
        rows.push(row.join(separator));
    }

    const output = rows.join('\n');
    document.getElementById('output').value = output;

    // Reset copy button text
    document.getElementById('copyButton').textContent = 'Copy';
}

// ==========================================
// Copy & Download Functions
// ==========================================

function copyOutput() {
    const output = document.getElementById('output');
    const text = output.value;

    if (!text) {
        alert('No CSV data to copy. Please generate CSV first.');
        return;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
            document.getElementById('copyButton').textContent = 'Copied!';
            setTimeout(() => {
                document.getElementById('copyButton').textContent = 'Copy';
            }, 2000);
        }).catch(function() {
            fallbackCopy(output);
        });
    } else {
        fallbackCopy(output);
    }
}

function fallbackCopy(output) {
    output.select();
    output.setSelectionRange(0, 99999);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    output.blur();
    document.getElementById('copyButton').textContent = 'Copied!';
    setTimeout(() => {
        document.getElementById('copyButton').textContent = 'Copy';
    }, 2000);
}

function downloadCSV() {
    const output = document.getElementById('output').value;

    if (!output) {
        alert('No CSV data to download. Please generate CSV first.');
        return;
    }

    const blob = new Blob([output], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', 'generated_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// ==========================================
// Theme Toggle
// ==========================================

const themeSwitchBtn = document.getElementById('theme-switch');
const themeIcon = document.getElementById('theme-icon');

function setTheme(dark) {
    if (dark) {
        document.documentElement.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
        themeIcon.innerHTML = `<svg class="moon-icon" viewBox="0 0 24 24"><path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"></path></svg>`;
    } else {
        document.documentElement.classList.remove('dark-mode');
        document.body.classList.remove('dark-mode');
        themeIcon.innerHTML = `<svg class="sun-icon" viewBox="0 0 24 24"><path d="M12 7a5 5 0 100 10 5 5 0 000-10zM2 13h2a1 1 0 100-2H2a1 1 0 100 2zm18 0h2a1 1 0 100-2h-2a1 1 0 100 2zM11 2v2a1 1 0 102 0V2a1 1 0 10-2 0zm0 18v2a1 1 0 102 0v-2a1 1 0 10-2 0zM5.99 4.58a1 1 0 10-1.41 1.41l1.06 1.06a1 1 0 101.41-1.41L5.99 4.58zm12.37 12.37a1 1 0 10-1.41 1.41l1.06 1.06a1 1 0 101.41-1.41l-1.06-1.06zm1.06-10.96a1 1 0 10-1.41-1.41l-1.06 1.06a1 1 0 101.41 1.41l1.06-1.06zM7.05 18.36a1 1 0 10-1.41-1.41l-1.06 1.06a1 1 0 101.41 1.41l1.06-1.06z"></path></svg>`;
    }
}

function getThemePref() {
    return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

function applyTheme() {
    const dark = getThemePref() === 'dark';
    setTheme(dark);
}

if (themeSwitchBtn && themeIcon) {
    applyTheme();
    themeSwitchBtn.addEventListener('click', function() {
        const dark = !document.documentElement.classList.contains('dark-mode');
        setTheme(dark);
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    });
}

// ==========================================
// Event Listeners & Initialization
// ==========================================


// Initialize with default columns
window.addEventListener('DOMContentLoaded', function() {
    // Add some default columns
    addColumn('id', 'sequence');
    addColumn('name', 'fullName');
    addColumn('email', 'email');
    addColumn('phone', 'phone');
    addColumn('city', 'city');

    // Generate initial CSV
    generateCSV();

    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    setupAutoGenerateEvents();
    handleSeparatorChange();
});

// === AUTO GENERATE CSV ON INPUT ===
function setupAutoGenerateEvents() {
    // Static inputs
    document.getElementById('rowCount').addEventListener('input', generateCSV);
    document.getElementById('separator').addEventListener('change', function() {
        handleSeparatorChange();
        generateCSV();
    });
    document.getElementById('customSeparator').addEventListener('input', generateCSV);
    document.getElementById('includeHeader').addEventListener('change', generateCSV);
    // Dynamic columns
    function addColumnInputEvents(columnElem) {
        const nameInput = columnElem.querySelector('.column-name');
        const typeSelect = columnElem.querySelector('.column-type');
        if (nameInput) nameInput.addEventListener('input', generateCSV);
        if (typeSelect) typeSelect.addEventListener('change', generateCSV);
    }
    // For existing columns
    document.querySelectorAll('.column-item').forEach(addColumnInputEvents);
    // Patch addColumn to auto-attach events
    const origAddColumn = window.addColumn;
    window.addColumn = function(name, type) {
        origAddColumn(name, type);
        // Attach events to the last column
        const columns = document.querySelectorAll('.column-item');
        if (columns.length > 0) {
            addColumnInputEvents(columns[columns.length - 1]);
        }
        generateCSV();
    };
    // Patch removeColumn to auto-generate
    const origRemoveColumn = window.removeColumn;
    window.removeColumn = function(id) {
        origRemoveColumn(id);
        generateCSV();
    };
}
