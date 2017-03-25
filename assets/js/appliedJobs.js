var appliedJobsVue = new Vue({
  el :  '#selected-results' ,
  firebase: {
    jobs: jobsAppliedDB.limitToLast(25)
  },
  methods: {
    removeJob: function (job) {
      // remove current job
      var index = this.jobs.indexOf(job);
      var dbIndex = job[".key"];
      this.jobs.splice(index, 1);

      jobsAppliedDB.child(dbIndex).remove();
      //
      // put it into jobApplied array
    }, 
    updateJob: function (job) {
      console.log("job is >>>>", job);
      var dbIndex = job[".key"];
      console.log("dbIndex is>>>", dbIndex);
      console.log(job.location);
      jobsAppliedDB.child(dbIndex).update(_.omit(job, ".key"));
    }, 
  }, 
  mounted() {
  },
})
