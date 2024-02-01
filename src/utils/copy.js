const copyToClipboard = async (text, toast) => {
  try {
    const clipboardItem = new ClipboardItem({
      "text/plain": new Blob([txt], { type: "text/plain" }),
    });
    await navigator.clipboard.write([clipboardItem]);
  } catch (error) {
    await navigator.clipboard.writeText(text);
  }
  toast({
    title: `🚀 ${text}`,
    description: "Copy To Clipboard",
  });
};

export default copyToClipboard;
