import store from '../../../store';

export default (to, from, next) => {
  if (store.getters['authenticated']) {
    if(to.path != "/verificar-email"){
      if(!store.getters['verified']){
        next();
      }else{
        console.log('verificar email');
        //next({ name: 'verificar-email' });
      }
    }else{
      next();
    }
  } else {
    next({ name: 'login', query: { redirect: to.fullPath } });
  }
}