
// Trash localStorage and force the browser to reload at '/'
export default function logout() {
  localStorage.removeItem('samsara-user');
  window.location.pathname = '/';
}
