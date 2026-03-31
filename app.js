// ==========================================
// CSV Generator - Full Client-Side Application
// ==========================================

import { DATA_TYPES } from './constants/dataTypes.js';

// ==========================================
// Helper Functions
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

    document.getElementById('output').value = rows.join('\n');

    // Reset copy button text
    document.getElementById('copyButton').textContent = 'Copy';

    saveFormState();
}

// ==========================================
// Copy & Download Functions
// ==========================================

function copyOutput() {
    const output = document.getElementById('output');
    const text = output.value;

    if (!text) {
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
        themeIcon.innerHTML = `<svg class="sun-icon" viewBox="0 0 24 24"><path d="M12 7a5 5 0 100 10 5 5 0 000-10zM2 13h2a1 1 0 100-2H2a1 1 0 100 2zm18 0h2a1 1 0 100-2h-2a1 1 0 100 2zM11 2v2a1 1 0 102 0V2a1 1 0 10-2 0zm0 18v2a1 1 0 102 0v-2a1 1 0 10-2 0zM5.99 4.58a1 1 0 10-1.41 1.41l1.06 1.06a1 1 0 101.41-1.41L5.99 4.58zm12.37 12.37a1 1 0 10-1.41 1.41l1.06 1.06a1 1 0 101.41-1.41l-1.06-1.06zm1.06-10.96a1 1 0 10-1.41-1.41l-1.06 1.06a1 1 0 101.41 1.41l1.06-1.06zM7.05 18.36a1 1 0 10-1.41-1.41l-1.06 1.06a1 1 0 101.41 1.41l1.06-1.06z"></path></svg>`;
    } else {
        document.documentElement.classList.remove('dark-mode');
        document.body.classList.remove('dark-mode');
        themeIcon.innerHTML = `<svg class="moon-icon" viewBox="0 0 24 24"><path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"></path></svg>`;
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
    const stateStr = localStorage.getItem('csvGenFormState');
    if (stateStr) {
        try {
            const state = JSON.parse(stateStr);
            setFormState(state);
        } catch (e) {
            // Ignore restore errors
        }
    } else {
        // Add some default columns if no saved state
        addColumn('id', 'sequence');
        addColumn('name', 'fullName');
        addColumn('email', 'email');
        addColumn('phone', 'phone');
        addColumn('city', 'city');
        generateCSV();
    }
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

// ==========================================
// Save & Restore Form State
// ==========================================

function getFormState() {
    // Get columns
    const columns = [];
    document.querySelectorAll('.column-item').forEach(item => {
        const name = item.querySelector('.column-name').value.trim();
        const type = item.querySelector('.column-type').value;
        columns.push({ name, type });
    });
    // Get other form values
    return {
        columns,
        rowCount: document.getElementById('rowCount').value,
        separator: document.getElementById('separator').value,
        customSeparator: document.getElementById('customSeparator')?.value || '',
        includeHeader: document.getElementById('includeHeader').checked,
    };
}

function setFormState(state) {
    // Remove all columns
    document.getElementById('columnsContainer').innerHTML = '';
    columnCounter = 0;
    // Add columns
    if (Array.isArray(state.columns)) {
        state.columns.forEach(col => addColumn(col.name, col.type));
    }
    // Set other form values
    document.getElementById('rowCount').value = state.rowCount || 10;
    document.getElementById('separator').value = state.separator || ',';
    handleSeparatorChange();
    if (document.getElementById('customSeparator')) {
        document.getElementById('customSeparator').value = state.customSeparator || '';
    }
    document.getElementById('includeHeader').checked = !!state.includeHeader;
    // Re-attach events for new columns
    setupAutoGenerateEvents();
    // Regenerate CSV
    generateCSV();
}

function saveFormState() {
    const state = getFormState();
    localStorage.setItem('csvGenFormState', JSON.stringify(state));
}

function restoreFormState() {
    const stateStr = localStorage.getItem('csvGenFormState');
    if (!stateStr) {
        return;
    }
    try {
        const state = JSON.parse(stateStr);
        setFormState(state);
    } catch (e) {
    }
}

window.saveFormState = saveFormState;
window.restoreFormState = restoreFormState;

// ==========================================
// Save & Restore Form State (Auto)
// ==========================================

// Auto-save form state every time CSV is generated
const origGenerateCSV = window.generateCSV;
window.generateCSV = function() {
    origGenerateCSV();
    saveFormState();
};

// Auto-restore form state on page load (if available)
window.addEventListener('DOMContentLoaded', function() {
    const stateStr = localStorage.getItem('csvGenFormState');
    if (stateStr) {
        try {
            const state = JSON.parse(stateStr);
            setFormState(state);
        } catch (e) {
            // Ignore restore errors
        }
    } else {
        // Add some default columns if no saved state
        addColumn('id', 'sequence');
        addColumn('name', 'fullName');
        addColumn('email', 'email');
        addColumn('phone', 'phone');
        addColumn('city', 'city');
        generateCSV();
    }
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    setupAutoGenerateEvents();
    handleSeparatorChange();
});

