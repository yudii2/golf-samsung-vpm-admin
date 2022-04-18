import moment from 'moment';

function commitNowTime(commit){
  commit('setNowTime', moment().startOf('seconds'));
  setTimeout(()=> commitNowTime(commit),1000);
}

const nowTimeModule = {
  state : {
    nowTime : moment()
  },
  mutations :{
    setNowTime(state, time){
      state.nowTime = time;
    }
  },
  getters:{
    nowTime: ({nowTime}) => nowTime
  },
  actions : {
    intervalNowTime({commit}){
      commitNowTime(commit);
    }
  }
}

export default nowTimeModule;
