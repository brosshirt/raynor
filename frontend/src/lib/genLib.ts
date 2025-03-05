export function copyToClipboard(item: string){
    const clipboardItem = new ClipboardItem({
        'text/html': new Blob([item], { type: 'text/html' }),
        'text/plain': new Blob([item], { type: 'text/plain' }),
      });
      navigator.clipboard.write([clipboardItem]);
}