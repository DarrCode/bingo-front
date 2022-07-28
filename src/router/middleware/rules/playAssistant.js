import store from '../../../store';

export default (to, from, next) => {
  if (store.getters['role'] == 4) {
    next();
  } else {
    next({ name: 'home' });
  }
}