function extractTextAndDownload() {
  let markdownText = '';
  const title = document.querySelector('main .gap-1');
  if (title) markdownText += `# ${title.textContent.trim()}\n\n`;

  const elements = document.querySelectorAll('main .group .gap-3');
  elements.forEach((element, index) => {
      const role = (index % 2 === 0) ? '**User**' : '**ChatGPT**';
      let text = '';

      if (role === '**User**') {
          text = element.textContent.trim() + '\n\n';
      } else {
          const proseElement = element.querySelector('.markdown');

          proseElement.childNodes.forEach((node) => {
              console.log(node);
              console.log(node.nodeName);
              if (node.nodeName === 'PRE') {

                  const codeBlock = node.querySelector('code');
                  if (codeBlock) {
                      text += '```\n' + codeBlock.textContent.trim() + '\n```\n';
                  }
              } else if (node.nodeName === 'P') {
                  text += node.textContent.trim() + '\n\n';
              } else if (node.nodeName === 'OL' || node.nodeName === 'UL') {
                  node.querySelectorAll('li').forEach((li) => {
                      let liText = li.textContent.trim();
                      if (li.querySelector('strong')) {
                          liText = '**' + liText + '**';
                      }
                      text += '- ' + liText + '\n';
                  });
                  text += '\n';
              }
          });
      }
      markdownText += `${role}:\n${text}\n`;
  });

  chrome.runtime.sendMessage({action: "download", text: markdownText});
}

extractTextAndDownload();
