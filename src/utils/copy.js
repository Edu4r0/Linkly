const copyclipboard = (element) => {
  element.select();
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
};

export default copyclipboard;

