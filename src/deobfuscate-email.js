import jQuery from 'jquery';

export default () => {
  function hex2a(hexx) {
    const hex = hexx.toString();

    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }

    return str;
  }

  const $email = jQuery('a.js-obfuscate-email');

  let hexaEmail = $email.data('email');
  hexaEmail = hexaEmail.replace(/%/g, '');

  $email.attr('href', `mailto:${hex2a(hexaEmail)}`);
};
