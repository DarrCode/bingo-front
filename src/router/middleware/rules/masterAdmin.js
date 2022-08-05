import store from '../../../store';

export default (to, from, next) => {
  if (
    store.getters['role'] == 1 ||
    store.getters['role'] == 2 ||
    store.getters['role'] == 4 ||
    store.getters['role'] == 5
  ) {
    next();
  } else {
    next({ name: 'home' });
  }
}