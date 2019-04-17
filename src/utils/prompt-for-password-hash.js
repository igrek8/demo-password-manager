import { createHash } from './password-manager';
import { decryptDataSafe, INVALID_DATA } from './cipher';

const promptForPasswordHash = () => {
  // eslint-disable-next-line no-alert
  const pass = prompt('Enter your master password');
  const passwordHash = createHash(pass);
  const session = localStorage.getItem('session');
  return decryptDataSafe(passwordHash, session) === INVALID_DATA
    ? null
    : passwordHash;
};

export default promptForPasswordHash;
