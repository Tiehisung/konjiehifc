/**
 *Timeout is used because the component might not have been created yet.
 * @param elementId Element id of the component to scroll to.
 */

export function scrollToElement(elementId: string) {
  setTimeout(() => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, 10)
}
export const toggleClick = (id?: string) => {
  setTimeout(() => {
    const doc = document.getElementById(id as string);
    if (doc) doc.click();
  }, 1);
};

export const markupToPlainText = (text: string): string => {
  if (!text) return '';

  try {
    // Sanitize first
    const sanitizedHTML = DOMPurify.sanitize(text, {
      ALLOWED_TAGS: [
        'p',
        'br',
        'ul',
        'ol',
        'li',
        'strong',
        'em',
        'span',
        'div',
      ],
      ALLOWED_ATTR: [],
    });

    // Create temporary element and extract only text content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = sanitizedHTML;

    // Get plain text and clean up
    const plainText = tempDiv.textContent || tempDiv.innerText || '';

    return plainText
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();
  } catch (error) {
    console.error('Error processing markup:', error);
    return text
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }
};
