// Function to handle Markdown input and call Dillinger API
async function handleMarkdownInput() {
    let inputText = document.getElementById('markdownInput').value.trim();
    if (!inputText) {
        document.getElementById('markdownOutput').innerHTML = '';
        return;
    }

    try {
        const response = await fetch('https://dillinger.io/api/dillinger', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "md": inputText,
                "cb_url": "http://example.com"
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.html) {
            document.getElementById('markdownOutput').innerHTML = data.html;
        } else {
            console.error('Invalid response from Dillinger API:', data);
        }
    } catch (error) {
        console.error('Error fetching data from Dillinger API:', error);
        document.getElementById('markdownOutput').innerHTML = 'Error fetching data. Please try again later.';
    }
}

// Function to render the Markdown output manually
function renderMarkdown() {
    handleMarkdownInput();
}

// Function to insert Markdown syntax for headings
function insertHeading(level) {
    let textarea = document.getElementById('markdownInput');
    let cursorPosition = textarea.selectionStart;
    let headingSyntax = '#'.repeat(level) + ' ';
    let textBeforeCursor = textarea.value.substring(0, cursorPosition);
    let textAfterCursor = textarea.value.substring(cursorPosition);
    textarea.value = textBeforeCursor + headingSyntax + textAfterCursor;
    textarea.focus();
    textarea.setSelectionRange(cursorPosition + headingSyntax.length, cursorPosition + headingSyntax.length);
    handleMarkdownInput();
}

// Function to insert Markdown syntax for lists
function insertList(type) {
    let textarea = document.getElementById('markdownInput');
    let cursorPosition = textarea.selectionStart;
    let listSyntax = (type === 'numbered' ? '1. ' : '- ') + ' ';
    let textBeforeCursor = textarea.value.substring(0, cursorPosition);
    let textAfterCursor = textarea.value.substring(cursorPosition);
    textarea.value = textBeforeCursor + listSyntax + textAfterCursor;
    textarea.focus();
    textarea.setSelectionRange(cursorPosition + listSyntax.length, cursorPosition + listSyntax.length);
    handleMarkdownInput();
}

// Function to insert Markdown syntax for inline code
function insertInlineCode() {
    insertTextSyntax('`');
}

// Function to insert text at the current cursor position
function insertTextSyntax(syntax) {
    let textarea = document.getElementById('markdownInput');
    let cursorPosition = textarea.selectionStart;
    let textBeforeCursor = textarea.value.substring(0, cursorPosition);
    let textAfterCursor = textarea.value.substring(cursorPosition);
    textarea.value = textBeforeCursor + syntax + textAfterCursor;
    textarea.focus();
    textarea.setSelectionRange(cursorPosition + syntax.length, cursorPosition + syntax.length);
    handleMarkdownInput();
}

// Function to handle Markdown editor guide visibility
function showMarkdownGuide() {
    let markdownGuide = document.getElementById('markdownGuide');
    markdownGuide.style.display = (markdownGuide.style.display === 'block') ? 'none' : 'block';
}

// Event listeners for Markdown editor guide links
document.getElementById('boldGuide').addEventListener('click', function(event) {
    event.preventDefault();
    insertTextSyntax('**');
    showMarkdownGuide();
});

document.getElementById('italicGuide').addEventListener('click', function(event) {
    event.preventDefault();
    insertTextSyntax('*');
    showMarkdownGuide();
});

document.getElementById('heading1Guide').addEventListener('click', function(event) {
    event.preventDefault();
    insertHeading(1);
    showMarkdownGuide();
});

document.getElementById('heading2Guide').addEventListener('click', function(event) {
    event.preventDefault();
    insertHeading(2);
    showMarkdownGuide();
});

document.getElementById('heading3Guide').addEventListener('click', function(event) {
    event.preventDefault();
    insertHeading(3);
    showMarkdownGuide();
});

document.getElementById('bulletListGuide').addEventListener('click', function(event) {
    event.preventDefault();
    insertList('bullet');
    showMarkdownGuide();
});

document.getElementById('numberedListGuide').addEventListener('click', function(event) {
    event.preventDefault();
    insertList('numbered');
    showMarkdownGuide();
});

document.getElementById('codeGuide').addEventListener('click', function(event) {
    event.preventDefault();
    insertInlineCode();
    showMarkdownGuide();
});

// Initial load
handleMarkdownInput();
