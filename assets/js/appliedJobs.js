var appliedJobsVue = new Vue({
  el :  '#selected-results' ,
  firebase: {
    jobs: jobsAppliedDB.limitToLast(25)
  },
  methods: {
    noop: function () {
      
    }
  }
})
