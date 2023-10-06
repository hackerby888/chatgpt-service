module.exports.toHtmlFormat = function toHtmlFormat(message) {
    message = message
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    // wrap code block
    let html = "";
    let isCode = false;
    let isIgnoring = false;

    for (let char of message) {
        if (char === "\n") isIgnoring = false;

        if (html.endsWith("```")) {
            html = html.replace("```", "");
            isIgnoring = true;
            if (isCode) {
                html += "</code></pre>";
            } else {
                html += "<pre><code >";
            }
            isCode = !isCode;
        } else if (!isIgnoring) {
            html += char;
        }
    }

    //wrap content in ` ` into <pre><code></code></pre>
    html = html.replace(
        /`([^`]+)`/g,
        "<pre style='display : inline !important'><code style='display: inline; background: none; padding : 1px; font-style: italic;'>$1</code></pre>"
    );

    return `<div>${html}<div/>`;
}